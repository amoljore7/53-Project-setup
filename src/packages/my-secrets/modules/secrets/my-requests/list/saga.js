import { put, takeLatest, call, all, fork, select } from 'redux-saga/effects';
import {
  failureMyRequestsListLoadMore,
  loadingMyRequestsListLoadMore,
  successMyRequestsListLoadMore,
  loadingUsersList,
  successUsersList,
  failureUsersList,
  loadingTagsList,
  successTagsList,
  failureTagsList,
} from './action';
import { MyRequestsDataTypes, UsersType, TagsType, active } from './constants';
import {
  fetchMyRequestsList,
  fetchUsers,
  fetchTags,
} from '../../../../../../services/user-service';
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
  const searchTerm = (state) =>
    state?.userSecretsReducer?.myRequestReducer?.myRequestsList?.searchTerm;
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
  const searchTerm = (state) =>
    state?.userSecretsReducer?.myRequestReducer?.myRequestsList?.searchTerm;
  const nextPageToken = (state) =>
    state?.userSecretsReducer?.myRequestReducer?.myRequestsList?.pagination?.next;
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
  yield takeLatest(UsersType.USERS_REQUEST, usersDataWorker);
}

function* usersDataWorker() {
  try {
    yield put(loadingUsersList());
    const response = yield call(fetchUsers);

    yield put(
      successUsersList((response || []).filter((user) => user?.status?.toLowerCase() === active))
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureUsersList(reason));
  }
}

function* tagsDataWatcher() {
  yield takeLatest(TagsType.USER_TAGS_REQUEST, tagsDataWorker);
}

function* tagsDataWorker() {
  try {
    yield put(loadingTagsList());
    const response = yield call(fetchTags);

    yield put(
      successTagsList((response || []).filter((tag) => tag.status.toLowerCase() === active))
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureTagsList(reason));
  }
}

export default all([
  fork(myRequestsListWatcher),
  fork(myRequestsListLoadMoreWatcher),
  fork(usersDataWatcher),
  fork(tagsDataWatcher),
]);
