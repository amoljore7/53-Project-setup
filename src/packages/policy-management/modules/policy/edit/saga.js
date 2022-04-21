import { isEmpty } from 'lodash';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import {
  editPolicyByEntity,
  getPermissionActions,
  getPermissionById,
  getPermissionsList,
  getPolicyByEntity,
  getRoleById,
  getRolesList,
} from '../../../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  policyListingPath,
  successNotificationDuration,
  successNotificationType,
  warningNotificationDuration,
  warningNotificationType,
} from '../../../../../utils/common-constants';
import { approvalNotificationMediumDetailsRequest } from '../view/actions';
import {
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
  recursiveEditPermissionListFail,
  recursiveEditPermissionListLoadingDisable,
  recursiveEditPermissionListRequest,
  recursiveEditPermissionListSuccess,
  recursiveEditRoleListFail,
  recursiveEditRoleListLoadingDisable,
  recursiveEditRoleListRequest,
  recursiveEditRoleListSuccess,
  updatePolicyFailure,
  updatePolicyLoading,
  updatePolicySuccess,
} from './actions';
import {
  EditPermissionActionsType,
  EditPermissionDetailsType,
  editPermissionsListType,
  EditPolicyType,
  EditRolesDetailsType,
  editRolesListType,
  LoadPolicyDataType,
  translatedStrings,
} from './constants';

function* editPolicyWatcher() {
  yield takeLatest(EditPolicyType.EDIT_POLICY_REQUEST, editPolicyWorker);
}

function* editPolicyWorker(action) {
  const { data: modifiedPolicy, history, policyEntity } = action.payload;
  try {
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.editingPolicy })
    );
    yield put(updatePolicyLoading());
    const response = yield call(editPolicyByEntity, modifiedPolicy, policyEntity);
    yield put(updatePolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    if (!modifiedPolicy?.isDraft) {
      history.push(policyListingPath);
    }

    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.policyUpdateSuccess,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    const reason = response?.data?.message || '';
    yield put(updatePolicyFailure(reason));
  }
}

function* editPermissionWatcher() {
  yield takeLatest(EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_REQUEST, editPermissionWorker);
}

function* editPermissionWorker(action) {
  try {
    yield put({ type: EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_LOADING });
    const response = yield call(getPermissionById, action.payload.id);
    yield put({
      type: EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_FAILURE,
      payload: reason,
    });
  }
}

function* editPermissionActionsWatcher() {
  yield takeLatest(
    EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_REQUEST,
    editPermissionActionsWorker
  );
}

function* editPermissionActionsWorker(action) {
  try {
    yield put({ type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_LOADING });
    const response = yield call(getPermissionActions, action.payload.consumer);
    yield put({
      type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_FAILURE,
      payload: reason,
    });
  }
}

function* editPermissionsListWatcher() {
  yield takeLatest(
    editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_REQUEST,
    editPermissionsListWorker
  );
}

function* editPermissionsListWorker({ payload = {} }) {
  try {
    const response = yield call(getPermissionsList, payload);
    yield put(recursiveEditPermissionListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursiveEditPermissionListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursiveEditPermissionListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.edit?.permissionList?.data)) {
      yield put(
        openNotification(
          errorNotificationType,
          translatedStrings?.errorGetPermissionsList(reason),
          true,
          errorNotificationDuration
        )
      );
    } else {
      yield put(
        openNotification(
          warningNotificationType,
          translatedStrings?.warningGetPermissionsList(reason),
          true,
          warningNotificationDuration
        )
      );
    }
    yield put(recursiveEditPermissionListFail(reason));
  }
}

function* editRolesListWatcher() {
  yield takeLatest(editRolesListType.RECURSIVE_EDIT_ROLES_LIST_REQUEST, editRolesListWorker);
}

function* editRolesListWorker({ payload = {} }) {
  try {
    const response = yield call(getRolesList, payload);
    yield put(recursiveEditRoleListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursiveEditRoleListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursiveEditRoleListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.edit?.rolesList?.data)) {
      yield put(
        openNotification(
          errorNotificationType,
          translatedStrings?.errorGetRolesList(reason),
          true,
          errorNotificationDuration
        )
      );
    } else {
      yield put(
        openNotification(
          warningNotificationType,
          translatedStrings?.warningGetRolesList(reason),
          true,
          warningNotificationDuration
        )
      );
    }
    yield put(recursiveEditRoleListFail(reason));
  }
}

function* editRoleDetailsWatcher() {
  yield takeLatest(EditRolesDetailsType.EDIT_ROLES_DETAILS_REQUEST, editRoleDetailsWorker);
}

function* editRoleDetailsWorker(action) {
  try {
    yield put({ type: EditRolesDetailsType.EDIT_ROLES_DETAILS_LOADING });
    const response = yield call(getRoleById, { roleId: action.payload.id });
    yield put({
      type: EditRolesDetailsType.EDIT_ROLES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: EditRolesDetailsType.EDIT_ROLES_DETAILS_FAILURE,
      payload: reason,
    });
  }
}

function* LoadPolicyDataWatcher() {
  yield takeLatest(LoadPolicyDataType.EDIT_LOAD_POLICY_REQUEST, LoadPolicyDataWorker);
}

function* LoadPolicyDataWorker(action) {
  if (action.payload === null) {
    yield put({
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_SUCCESS,
      payload: null,
    });
  }
  const { id, history } = action.payload;
  try {
    yield put({ type: LoadPolicyDataType.EDIT_LOAD_POLICY_LOADING });
    const EditPolicyData = yield call(getPolicyByEntity, id);
    yield put({
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_SUCCESS,
      payload: EditPolicyData,
    });
    if (!isEmpty(EditPolicyData?.condition)) {
      const approver = JSON.parse(EditPolicyData.condition);
      if (!isEmpty(approver?.approval)) {
        yield put(
          approvalNotificationMediumDetailsRequest({
            channelId: approver?.approval?.notificationMedium,
            history,
          })
        );
      }
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_FAILURE,
      payload: { error: reason },
    });
    history?.push(policyListingPath);
    yield put(
      openNotification(
        errorNotificationType,
        translatedStrings.errorGetPolicyData(reason),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* LoadPolicyJSONDataWatcher() {
  yield takeLatest(LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_REQUEST, LoadPolicyJSONDataWorker);
}

function* LoadPolicyJSONDataWorker(action) {
  if (action.payload === null) {
    yield put(getPolicyByNameSuccess(null));
  }
  const { name, history } = action.payload;
  try {
    yield put(getPolicyByNameLoading());
    const EditPolicyData = yield call(getPolicyByEntity, name);
    yield put(getPolicyByNameSuccess(EditPolicyData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getPolicyByNameFailure(reason));
    history?.push(policyListingPath);
    yield put(
      openNotification(
        errorNotificationType,
        translatedStrings.errorGetPolicyData(reason),
        true,
        errorNotificationDuration
      )
    );
  }
}
export default all([
  fork(editPolicyWatcher),
  fork(editPermissionWatcher),
  fork(editPermissionActionsWatcher),
  fork(editPermissionsListWatcher),
  fork(editRolesListWatcher),
  fork(editRoleDetailsWatcher),
  fork(LoadPolicyDataWatcher),
  fork(LoadPolicyJSONDataWatcher),
]);
