import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { editRoleById } from '../../../../../services/policy-admin-service';
import {
  medium,
  roleListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { editRoleFail, editRoleLoading, editRoleSuccess } from './actions';
import { EditRoleTypes, translatedStrings } from './constants';

const { editRoleSuccessMessage, editingRoleLoaderMessage } = translatedStrings;

function* editRoleDataWatcher() {
  yield takeLatest(EditRoleTypes.EDIT_ROLE_REQUEST, editRoleDataWorker);
}

function* editRoleDataWorker({ payload }) {
  const { id: roleId, roleData: data, history } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: medium, message: editingRoleLoaderMessage }));
    yield put(editRoleLoading());
    const editRoleData = yield call(editRoleById, { roleId, data });
    yield put(editRoleSuccess(editRoleData));
    yield put(
      openNotification(
        successNotificationType,
        editRoleSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    history?.push(roleListingPath);
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(editRoleFail(reason));
  } finally {
    yield put(initSpinnerOverlay({ open: false, size: medium }));
  }
}

export default all([fork(editRoleDataWatcher)]);
