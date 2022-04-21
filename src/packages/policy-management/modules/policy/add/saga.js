import { isEmpty } from 'lodash';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import {
  fetchChannelList,
  fetchNotificationMediumList,
} from '../../../../../services/notification-medium-service';
import {
  createPolicy,
  getPermissionActions,
  getPermissionById,
  getPermissionsList,
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
import {
  recursiveApprovalChannelListFail,
  recursiveApprovalChannelListLoadingDisable,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListSuccess,
  approvalNotificationMediumListFail,
  approvalNotificationMediumListLoading,
  approvalNotificationMediumListSuccess,
  recursivePermissionListDisableLoading,
  recursivePermissionListFail,
  recursivePermissionListRequest,
  recursivePermissionListSuccess,
  recursiveRoleListFail,
  recursiveRoleListLoadingDisable,
  recursiveRoleListRequest,
  recursiveRoleListSuccess,
  createPolicyLoading,
  createPolicySuccess,
  createPolicyFailure,
} from './actions';
import {
  AddPolicyType,
  approvalChannelListType,
  approvalNotificationMediumListType,
  PermissionActionsType,
  PermissionDetailsType,
  permissionsListType,
  RolesDetailsType,
  rolesListType,
  translatedStrings,
} from './constants';

function* addPolicyWatcher() {
  yield takeLatest(AddPolicyType.POLICY_CREATE_REQUEST, addPolicyWorker);
}

function* addPolicyWorker(action) {
  const { history, data } = action.payload;
  try {
    yield put(createPolicyLoading());
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.addingPolicy })
    );
    const response = yield call(createPolicy, { data });
    yield put(createPolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    history.push(policyListingPath);
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
    const reason = response?.data?.message || '';
    yield put(createPolicyFailure(reason));
  }
}

function* permissionDetailsWatcher() {
  yield takeLatest(PermissionDetailsType.PERMISSION_DETAILS_REQUEST, permissionDetailsWorker);
}

function* permissionDetailsWorker(action) {
  try {
    yield put({ type: PermissionDetailsType.PERMISSION_DETAILS_LOADING });
    const response = yield call(getPermissionById, action.payload.id);
    yield put({
      type: PermissionDetailsType.PERMISSION_DETAILS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: PermissionDetailsType.PERMISSION_DETAILS_FAILURE,
      payload: reason,
    });
  }
}

function* permissionActionsWatcher() {
  yield takeLatest(PermissionActionsType.PERMISSION_ACTIONS_REQUEST, permissionActionsWorker);
}

function* permissionActionsWorker(action) {
  try {
    yield put({ type: PermissionActionsType.PERMISSION_ACTIONS_LOADING });
    const response = yield call(getPermissionActions, action.payload.consumer);
    yield put({
      type: PermissionActionsType.PERMISSION_ACTIONS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: PermissionActionsType.PERMISSION_ACTIONS_FAILURE,
      payload: reason,
    });
  }
}

function* permissionsListWatcher() {
  yield takeLatest(permissionsListType.RECURSIVE_PERMISSIONS_LIST_REQUEST, permissionsListWorker);
}

function* permissionsListWorker({ payload = {} }) {
  try {
    const response = yield call(getPermissionsList, payload);
    yield put(recursivePermissionListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursivePermissionListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursivePermissionListDisableLoading());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.add?.permissionList?.data)) {
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
    yield put(recursivePermissionListFail(reason));
  }
}

function* rolesListWatcher() {
  yield takeLatest(rolesListType.RECURSIVE_ROLES_LIST_REQUEST, rolesListWorker);
}

function* rolesListWorker({ payload = {} }) {
  try {
    const response = yield call(getRolesList, payload);
    yield put(recursiveRoleListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursiveRoleListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursiveRoleListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.add?.rolesList?.data)) {
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
    yield put(recursiveRoleListFail(reason));
  }
}

function* roleDetailsWatcher() {
  yield takeLatest(RolesDetailsType.ROLES_DETAILS_REQUEST, roleDetailsWorker);
}

function* roleDetailsWorker(action) {
  try {
    yield put({ type: RolesDetailsType.ROLES_DETAILS_LOADING });
    const response = yield call(getRoleById, { roleId: action.payload.id });
    yield put({
      type: RolesDetailsType.ROLES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: RolesDetailsType.ROLES_DETAILS_FAILURE,
      payload: reason,
    });
  }
}

function* notificationMediumListWatcher() {
  yield takeLatest(
    approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST,
    notificationMediumListWorker
  );
}

function* notificationMediumListWorker() {
  try {
    yield put(approvalNotificationMediumListLoading());
    const data = yield call(fetchNotificationMediumList);
    yield put(approvalNotificationMediumListSuccess(data?.result || []));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(approvalNotificationMediumListFail(reason));
  }
}

function* channelListWatcher() {
  yield takeLatest(
    approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST,
    channelListWorker
  );
}

function* channelListWorker({ payload = {} }) {
  const { notificationMediumId, next } = payload;
  try {
    const response = yield call(fetchChannelList, { notificationMediumId, next });
    yield put(recursiveApprovalChannelListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(
        recursiveApprovalChannelListRequest({
          notificationMediumId,
          next: response?.pagination?.next,
        })
      );
    } else {
      yield put(recursiveApprovalChannelListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.add?.channelList?.data)) {
      yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    } else {
      yield put(
        openNotification(
          warningNotificationType,
          translatedStrings.warningGetChannelList(reason),
          true,
          warningNotificationDuration
        )
      );
    }
    yield put(recursiveApprovalChannelListFail(reason));
  }
}

export default all([
  fork(addPolicyWatcher),
  fork(permissionDetailsWatcher),
  fork(permissionActionsWatcher),
  fork(permissionsListWatcher),
  fork(rolesListWatcher),
  fork(roleDetailsWatcher),
  fork(notificationMediumListWatcher),
  fork(channelListWatcher),
]);
