import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { GetViewPermissionsTypes } from './constants';
import { fetchViewPermissions } from '../../../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  permissionListingPath,
} from '../../../../../utils/common-constants';
import { openNotification } from '../../../../../components/notification/action';

function* viewPermissionsWatcher() {
  yield takeLatest(GetViewPermissionsTypes.PERMISSIONS_VIEW_REQUEST, getViewPermissionsWorker);
}

function* getViewPermissionsWorker({ payload }) {
  const { ID, history } = payload;
  yield put({
    type: GetViewPermissionsTypes.PERMISSIONS_VIEW_LOADING,
  });

  try {
    const data = yield call(fetchViewPermissions, ID);
    yield put({
      type: GetViewPermissionsTypes.PERMISSIONS_VIEW_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: GetViewPermissionsTypes.PERMISSIONS_VIEW_FAILURE,
      payload: { error: reason },
    });
    history.push(permissionListingPath);
  }
}

export default all([fork(viewPermissionsWatcher)]);
