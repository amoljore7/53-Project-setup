import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { EditPermissionsTypes } from './constants';
import { editPermission } from '../../../../../services/policy-admin-service';
import { translate } from '../../../externalization';
import {
  permissionListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { openNotification } from '../../../../../components/notification/action';

function* editPermissionsWatcher() {
  yield takeLatest(EditPermissionsTypes.PERMISSIONS_EDIT_REQUEST, editPermissionsWorker);
}

function* editPermissionsWorker({ payload }) {
  const { formData, id, history } = payload;
  yield put({ type: EditPermissionsTypes.PERMISSIONS_EDIT_LOADING });
  try {
    const data = yield call(editPermission, formData, id);
    yield put({
      type: EditPermissionsTypes.PERMISSIONS_EDIT_SUCCESS,
      payload: data,
    });
    history.push(permissionListingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('PERMISSION_MODULE.PERMISSION_CHANGES_SAVED'),
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const errorObject = {
      title: translate('PERMISSION_MODULE.PERMISSION_CHANGES_NOT_SAVED'),
      errorList: reason.split('|').map((msg) => `- ${msg}`) || [],
    };
    yield put({
      type: EditPermissionsTypes.PERMISSIONS_EDIT_FAILURE,
      payload: { errorStatus: errorObject },
    });
  }
}

export default all([fork(editPermissionsWatcher)]);
