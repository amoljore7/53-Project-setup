import { isEmpty } from 'lodash';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import {
  createPolicy,
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
  createPolicyFailure,
  createPolicyLoading,
  createPolicySuccess,
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
  recursiveClonePermissionListFail,
  recursiveClonePermissionListLoadingDisable,
  recursiveClonePermissionListRequest,
  recursiveClonePermissionListSuccess,
  recursiveCloneRoleListDisableLoading,
  recursiveCloneRoleListFail,
  recursiveCloneRoleListRequest,
  recursiveCloneRoleListSuccess,
} from './actions';
import {
  ClonePermissionActionsType,
  ClonePermissionDetailsType,
  clonePermissionsListType,
  ClonePolicyType,
  CloneRolesDetailsType,
  cloneRolesListType,
  LoadPolicyDataType,
  translatedStrings,
} from './constants';

function* clonePermissionWatcher() {
  yield takeLatest(
    ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_REQUEST,
    clonePermissionWorker
  );
}

function* clonePermissionWorker(action) {
  try {
    yield put({ type: ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_LOADING });
    const response = yield call(getPermissionById, action.payload.id);
    yield put({
      type: ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_FAILURE,
      payload: error,
    });
  }
}

function* clonePermissionActionsWatcher() {
  yield takeLatest(
    ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_REQUEST,
    clonePermissionActionsWorker
  );
}

function* clonePermissionActionsWorker(action) {
  try {
    yield put({ type: ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_LOADING });
    const response = yield call(getPermissionActions, action.payload.consumer);
    yield put({
      type: ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_FAILURE,
      payload: reason,
    });
  }
}

function* clonePermissionsListWatcher() {
  yield takeLatest(
    clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_REQUEST,
    clonePermissionsListWorker
  );
}

function* clonePermissionsListWorker({ payload = {} }) {
  try {
    const response = yield call(getPermissionsList, payload);
    yield put(recursiveClonePermissionListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursiveClonePermissionListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursiveClonePermissionListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.clone?.permissionList?.data)) {
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
    yield put(recursiveClonePermissionListFail(reason));
  }
}

function* cloneRolesListWatcher() {
  yield takeLatest(cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_REQUEST, cloneRolesListWorker);
}

function* cloneRolesListWorker({ payload = {} }) {
  try {
    const response = yield call(getRolesList, payload);
    yield put(recursiveCloneRoleListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursiveCloneRoleListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursiveCloneRoleListDisableLoading());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.clone?.rolesList?.data)) {
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
    yield put(recursiveCloneRoleListFail(reason));
  }
}

function* cloneRoleDetailsWatcher() {
  yield takeLatest(CloneRolesDetailsType.CLONE_ROLES_DETAILS_REQUEST, cloneRoleDetailsWorker);
}

function* cloneRoleDetailsWorker(action) {
  try {
    yield put({ type: CloneRolesDetailsType.CLONE_ROLES_DETAILS_LOADING });
    const response = yield call(getRoleById, { roleId: action.payload.id });
    yield put({
      type: CloneRolesDetailsType.CLONE_ROLES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: CloneRolesDetailsType.CLONE_ROLES_DETAILS_FAILURE,
      payload: reason,
    });
  }
}

function* LoadPolicyDataWatcher() {
  yield takeLatest(LoadPolicyDataType.CLONE_LOAD_POLICY_REQUEST, LoadPolicyDataWorker);
}

function* LoadPolicyDataWorker(action) {
  const { id, history } = action.payload;
  try {
    yield put({ type: LoadPolicyDataType.CLONE_LOAD_POLICY_LOADING });
    const ClonePolicyData = yield call(getPolicyByEntity, id);
    yield put({
      type: LoadPolicyDataType.CLONE_LOAD_POLICY_SUCCESS,
      payload: ClonePolicyData,
    });
    if (!isEmpty(ClonePolicyData?.condition)) {
      const approver = JSON.parse(ClonePolicyData.condition);
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
      type: LoadPolicyDataType.CLONE_LOAD_POLICY_FAILURE,
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
  yield takeLatest(LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_REQUEST, LoadPolicyJSONDataWorker);
}

function* LoadPolicyJSONDataWorker(action) {
  const { name, history } = action.payload;
  try {
    yield put(getPolicyByNameLoading());
    const ClonePolicyData = yield call(getPolicyByEntity, name);
    yield put(getPolicyByNameSuccess(ClonePolicyData));
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

function* addPolicyWatcher() {
  yield takeLatest(ClonePolicyType.CLONE_POLICY_REQUEST, addPolicyWorker);
}

function* addPolicyWorker(action) {
  const { history, data: policy } = action.payload;
  try {
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.addingPolicy })
    );
    yield put(createPolicyLoading());
    const response = yield call(createPolicy, { data: policy });
    yield put(createPolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    if (!policy?.isDraft) {
      history.push(policyListingPath);
    }

    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.policyCreatedSuccessMessage,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(createPolicyFailure(response));
  }
}

export default all([
  fork(addPolicyWatcher),
  fork(clonePermissionWatcher),
  fork(clonePermissionActionsWatcher),
  fork(clonePermissionsListWatcher),
  fork(cloneRolesListWatcher),
  fork(cloneRoleDetailsWatcher),
  fork(LoadPolicyDataWatcher),
  fork(LoadPolicyJSONDataWatcher),
]);
