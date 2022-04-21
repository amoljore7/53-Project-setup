import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { PermissionsListingTypes, DeletePermissionsTypes } from './constants';
import {
  fetchPermissionTableList,
  deletePermissions,
} from '../../../../../services/policy-admin-service';
import { translate } from '../../../externalization';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  permissionListingPath,
  successNotificationDuration,
  successNotificationType,
  permissionDeleteCheckMsg,
} from '../../../../../utils/common-constants';

function* getPermissionsTableListWatcher() {
  yield takeLatest(
    PermissionsListingTypes.PERMISSIONS_LISTING_REQUEST,
    getPermissionsTableListWorker
  );
}

function* getPermissionsTableListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.permissionsReducer?.permissionsTableList?.searchTerm;
  payload.search = searchTerm(state);
  yield put({ type: PermissionsListingTypes.PERMISSIONS_LISTING_LOADING });

  try {
    const tableList = yield call(fetchPermissionTableList, payload);
    yield put({
      type: PermissionsListingTypes.PERMISSIONS_LISTING_SUCCESS,
      payload: tableList,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: PermissionsListingTypes.PERMISSIONS_LISTING_FAILURE,
      payload: { error: error },
    });
  }
}

function* getPermissionsTableLoadMoreListWatcher() {
  yield takeLatest(
    PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_REQUEST,
    getPermissionsTableLoadMoreListWorker
  );
}

function* getPermissionsTableLoadMoreListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.permissionsReducer?.permissionsTableList?.searchTerm;
  const nextPageToken = (state) =>
    state?.permissionsReducer?.permissionsTableList?.data?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  yield put({ type: PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_LOADING });

  try {
    const tableList = yield call(fetchPermissionTableList, payload);
    yield put({
      type: PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_SUCCESS,
      payload: tableList,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_FAILURE,
      payload: { error: error },
    });
  }
}

function* deletePermissionsWatcher() {
  yield takeLatest(DeletePermissionsTypes.PERMISSIONS_DELETE_REQUEST, deletePermissionsWorker);
}

function* deletePermissionsWorker({ payload }) {
  const { ID, history } = payload;
  yield put({
    type: DeletePermissionsTypes.PERMISSIONS_DELETE_LOADING,
  });
  try {
    const deletePermissionStatus = yield call(deletePermissions, ID);
    yield put({
      type: DeletePermissionsTypes.PERMISSIONS_DELETE_SUCCESS,
      payload: deletePermissionStatus,
    });
    history.push(permissionListingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('PERMISSION_MODULE.PERMISSION_DELETE_SUCCESS'),
        true,
        successNotificationDuration
      )
    );
    yield put({ type: PermissionsListingTypes.PERMISSIONS_LISTING_REQUEST });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const checkReason = reason?.substring(0, 49).toLowerCase();
    let errorMessage;
    if (response.status === 400 && checkReason === permissionDeleteCheckMsg) {
      errorMessage = translate('PERMISSION_MODULE.DELETE_PERMISSION_ERROR_MESSAGE');
    } else {
      errorMessage = translate('PERMISSION_MODULE.PERMISSION_DELETE_FAILURE', { reason });
    }
    yield put(
      openNotification(errorNotificationType, errorMessage, true, errorNotificationDuration)
    );
    yield put({
      type: DeletePermissionsTypes.PERMISSIONS_DELETE_FAILURE,
      payload: { error: reason },
    });
  }
}

export default all([
  fork(getPermissionsTableListWatcher),
  fork(deletePermissionsWatcher),
  fork(getPermissionsTableLoadMoreListWatcher),
]);
