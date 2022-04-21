import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { deleteRoleById, getRoleById } from '../../../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  medium,
  roleDeleteCheckMsg,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import {
  deleteRoleFail,
  deleteRoleLoading,
  deleteRoleSuccess,
  viewRoleByIdFail,
  viewRoleByIdLoading,
  viewRoleByIdSuccess,
} from './actions';
import {
  deleteRoleSuccessMessage,
  RoleDeleteDataTypes,
  roleListingPath,
  RoleViewDataTypes,
  translatedStrings,
} from './constants';
const { getRoleError, deletingRoleLoaderMessage, deleteRoleError, deleteRoleWithReason } =
  translatedStrings;

function* roleViewDataWatcher() {
  yield takeLatest(RoleViewDataTypes.ROLE_VIEW_DATA_REQUEST, roleViewDataWorker);
}

function* roleViewDataWorker({ payload }) {
  const { roleId, history } = payload;
  try {
    yield put(viewRoleByIdLoading());
    const roleViewData = yield call(getRoleById, { roleId });
    yield put(viewRoleByIdSuccess(roleViewData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(viewRoleByIdFail({ error: reason }));
    history?.push(roleListingPath);
    yield put(
      openNotification(errorNotificationType, getRoleError(reason), true, errorNotificationDuration)
    );
  }
}

function* roleDeleteDataWatcher() {
  yield takeLatest(RoleDeleteDataTypes?.ROLE_DELETE_DATA_REQUEST, roleDeleteDataWorker);
}

export function* roleDeleteDataWorker({ payload }) {
  const { roleId, history } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: medium, message: deletingRoleLoaderMessage }));
    yield put(deleteRoleLoading());
    const deleteRoleStatus = yield call(deleteRoleById, { roleId });
    yield put(deleteRoleSuccess(deleteRoleStatus));
    history?.push(roleListingPath);
    yield put(
      openNotification(
        successNotificationType,
        deleteRoleSuccessMessage,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const checkReason = reason?.substring(0, 43).toLowerCase();
    let errorMessage;
    if (response.status === 400 && checkReason === roleDeleteCheckMsg) {
      errorMessage = deleteRoleError;
    } else {
      errorMessage = deleteRoleWithReason(reason);
    }
    yield put(
      openNotification(errorNotificationType, errorMessage, true, errorNotificationDuration)
    );
    yield put(deleteRoleFail({ error: reason }));
  } finally {
    yield put(initSpinnerOverlay({ open: false, size: medium }));
  }
}

export default all([fork(roleViewDataWatcher), fork(roleDeleteDataWatcher)]);
