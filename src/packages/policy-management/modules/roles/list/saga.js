import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationType,
  successNotificationDuration,
  roleDeleteCheckMsg,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { deleteRoleSuccessMessage, RolesListDataConstants } from './constants';
import { deleteRole, fetchRolesList } from './service';

function* rolesListDataWatcher() {
  yield takeLatest(RolesListDataConstants.ROLES_LIST_DATA_REQUEST, rolesListDataWorker);
}

function* rolesListDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.rolesReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  try {
    yield put({ type: RolesListDataConstants.ROLES_LIST_DATA_LOADING });
    const rolesListResponse = yield call(fetchRolesList, payload);
    const { data } = rolesListResponse;
    yield put({
      type: RolesListDataConstants.ROLES_LIST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: RolesListDataConstants.ROLES_LIST_DATA_FAILURE,
      payload: error,
    });
  }
}

function* rolesListLoadMoreDataWatcher() {
  yield takeLatest(
    RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_REQUEST,
    rolesListLoadMoreDataWorker
  );
}

function* rolesListLoadMoreDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.rolesReducer?.list?.searchTerm;
  const nextPageToken = (state) => state?.rolesReducer?.list?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  try {
    yield put({ type: RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_LOADING });
    const rolesListResponse = yield call(fetchRolesList, payload);
    const { data } = rolesListResponse;
    yield put({
      type: RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_FAILURE,
      payload: error,
    });
  }
}

function* roleDeleteWatcher() {
  yield takeLatest(RolesListDataConstants.ROLE_DELETE_REQUEST_INIT, roleDeleteWorker);
}

function* roleDeleteWorker({ payload }) {
  try {
    yield put({ type: RolesListDataConstants.ROLE_DELETE_REQUEST_LOADING });
    yield call(deleteRole, payload);
    yield put({ type: RolesListDataConstants.ROLE_DELETE_REQUEST_COMPLETE });
    yield put(
      openNotification(
        successNotificationType,
        deleteRoleSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    // fetch roles list on delete success
    yield put({ type: RolesListDataConstants.ROLES_LIST_DATA_REQUEST });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const checkReason = reason?.substring(0, 43).toLowerCase();
    yield put({ type: RolesListDataConstants.ROLE_DELETE_REQUEST_COMPLETE });
    let errorMessage;
    if (response.status === 400 && checkReason === roleDeleteCheckMsg) {
      errorMessage = translate('ROLES_MODULE.DELETE_ROLE_MESSAGE');
    } else {
      errorMessage = translate('ROLES_MODULE.DELETE_ROLE_ERROR_MESSAGE', { reason });
    }
    yield put(
      openNotification(errorNotificationType, errorMessage, true, errorNotificationDuration)
    );
  }
}

export default all([
  fork(rolesListDataWatcher),
  fork(roleDeleteWatcher),
  fork(rolesListLoadMoreDataWatcher),
]);
