import { isEmpty } from 'lodash';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { createRole } from '../../../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  medium,
  roleListingPath,
  successNotificationDuration,
  successNotificationType,
  warningNotificationDuration,
  warningNotificationType,
} from '../../../../../utils/common-constants';
import {
  addRoleFail,
  addRoleLoading,
  addRoleSuccess,
  recursivePermissionListDisableLoading,
  recursivePermissionListFail,
  recursivePermissionListLoading,
  recursivePermissionListRequest,
  recursivePermissionListSuccess,
} from './actions';
import {
  addRoleSuccessMessage,
  AddRoleTypes,
  GetActionTypes,
  GetAllPermissionsTypes,
  GetPermissionDataTypes,
  translatedString,
} from './constants';
import { translatedStrings } from './input/constants';
import { getActionByConsumer, getAllPermissions, getPermissionById } from './service';

const { creatingRoleSpinnerMessage } = translatedString;

function* addRoleDataWatcher() {
  yield takeLatest(AddRoleTypes.ADD_ROLE_REQUEST, addRoleDataWorker);
}

function* addRoleDataWorker({ payload }) {
  const { roleData: data, history } = payload;
  try {
    yield put(
      initSpinnerOverlay({ open: true, size: medium, message: creatingRoleSpinnerMessage })
    );
    yield put(addRoleLoading());
    const addRoleData = yield call(createRole, { data });
    yield put(addRoleSuccess(addRoleData));
    yield put(
      openNotification(
        successNotificationType,
        addRoleSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    history?.push(roleListingPath);
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(addRoleFail(reason));
  } finally {
    yield put(initSpinnerOverlay({ open: false, size: medium }));
  }
}

function* getActionDataWatcher() {
  yield takeLatest(GetActionTypes.GET_ACTION_REQUEST, getActionDataWorker);
}

function* getActionDataWorker({ payload }) {
  try {
    yield put({ type: GetActionTypes.GET_ACTION_LOADING });
    const actionData = yield call(getActionByConsumer, payload?.consumerName);
    yield put({
      type: GetActionTypes.GET_ACTION_SUCCESS,
      payload: actionData,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: GetActionTypes.GET_ACTION_FAILURE,
      payload: reason,
    });
  }
}

function* getAllPermissionsDataWatcher() {
  yield takeLatest(
    GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_REQUEST,
    getAllPermissionsDataWorker
  );
}

function* getAllPermissionsDataWorker({ payload = {} }) {
  try {
    yield put(recursivePermissionListLoading());
    const response = yield call(getAllPermissions, payload);
    yield put(recursivePermissionListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(recursivePermissionListRequest({ next: response?.pagination?.next }));
    } else {
      yield put(recursivePermissionListDisableLoading());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.rolesReducer?.permissionList?.data)) {
      yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
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

function* getPermissionDataWatcher() {
  yield takeLatest(GetPermissionDataTypes.GET_PERMISSION_DATA_REQUEST, getPermissionDataWorker);
}

function* getPermissionDataWorker({ payload }) {
  try {
    yield put({ type: GetPermissionDataTypes.GET_PERMISSION_DATA_LOADING });
    const permissionData = yield call(getPermissionById, payload.permissionId);
    yield put({
      type: GetPermissionDataTypes.GET_PERMISSION_DATA_SUCCESS,
      payload: permissionData,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: GetPermissionDataTypes.GET_PERMISSION_DATA_FAILURE,
      payload: reason,
    });
  }
}

export default all([
  fork(addRoleDataWatcher),
  fork(getActionDataWatcher),
  fork(getAllPermissionsDataWatcher),
  fork(getPermissionDataWatcher),
]);
