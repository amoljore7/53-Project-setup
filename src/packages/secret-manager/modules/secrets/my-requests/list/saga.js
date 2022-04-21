import { put, takeLatest, call, all, fork, select } from 'redux-saga/effects';
import {
  failureMyRequestsListLoadMore,
  loadingMyRequestsListLoadMore,
  successMyRequestsListLoadMore,
  loadingUsersList,
  successUsersList,
  failureUsersList,
} from './action';
import { MyRequestsDataTypes, UsersType } from './constants';
import { fetchMyRequestsList, fetchUsers } from './service';
import { openNotification } from '../../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../../utils/common-constants';

function* myRequestsListWatcher() {
  yield takeLatest(MyRequestsDataTypes.MY_REQUESTS_LIST_REQUEST, myRequestsListWorker);
}

export function* myRequestsListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.secretsReducer?.myRequestsList?.searchTerm;
  payload.search = searchTerm(state);

  try {
    yield put({ type: MyRequestsDataTypes.MY_REQUESTS_LIST_LOADING });

    const response = yield call(fetchMyRequestsList, payload);
    const { data } = response;

    yield put({
      type: MyRequestsDataTypes.MY_REQUESTS_LIST_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put({ type: MyRequestsDataTypes.MY_REQUESTS_LIST_FAILURE, payload: reason });
  }
}

function* myRequestsListLoadMoreWatcher() {
  yield takeLatest(
    MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_REQUEST,
    myRequestsListLoadMoreWorker
  );
}

export function* myRequestsListLoadMoreWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.secretsReducer?.myRequestsList?.searchTerm;
  const nextPageToken = (state) => state?.secretsReducer?.myRequestsList?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);

  try {
    yield put(loadingMyRequestsListLoadMore());

    const response = yield call(fetchMyRequestsList, payload);
    const { data } = response;

    yield put(successMyRequestsListLoadMore(data));
  } catch ({ response }) {
    const reason = response?.data?.message ?? '';
    yield put(failureMyRequestsListLoadMore(reason));
  }
}

function* usersDataWatcher() {
  yield takeLatest(UsersType.MY_REQUEST_USERS_REQUEST, usersDataWorker);
}

function* usersDataWorker() {
  try {
    yield put(loadingUsersList());
    const response = yield call(fetchUsers);
    yield put(successUsersList(response));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureUsersList(reason));
  }
}

export default all([
  fork(myRequestsListWatcher),
  fork(myRequestsListLoadMoreWatcher),
  fork(usersDataWatcher),
]);
