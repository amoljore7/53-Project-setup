import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { errorNotificationDuration, errorNotificationType } from '../../../utils/common-constants';
import { openNotification } from '../../notification/action';
import {
  getGroupsRequestFailure,
  getGroupsRequestLoading,
  getGroupsRequestSuccess,
  getServiceIdentitiesRequestFailure,
  getServiceIdentitiesRequestLoading,
  getServiceIdentitiesRequestSuccess,
  getTokensRequestFailure,
  getTokensRequestLoading,
  getTokensRequestSuccess,
  getUsersRequestFailure,
  getUsersRequestLoading,
  getUsersRequestSuccess,
} from './actions';
import { GroupsType, ServiceIdentitiesType, TokensType, UsersType } from './constants';
import { fetchGroups, fetchServiceIdentities, fetchTokens, fetchUsers } from './service';

function* usersDataWatcher() {
  yield takeLatest(UsersType.USERS_REQUEST, usersDataWorker);
}

function* usersDataWorker() {
  try {
    yield put(getUsersRequestLoading());
    const response = yield call(fetchUsers);
    yield put(getUsersRequestSuccess(response));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(getUsersRequestFailure(reason));
  }
}

function* groupsDataWatcher() {
  yield takeLatest(GroupsType.GROUPS_REQUEST, groupsDataWorker);
}

function* groupsDataWorker() {
  try {
    yield put(getGroupsRequestLoading());
    const response = yield call(fetchGroups);
    yield put(getGroupsRequestSuccess(response));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(getGroupsRequestFailure(reason));
  }
}

function* serviceIdentitiesDataWatcher() {
  yield takeLatest(ServiceIdentitiesType.SERVICE_IDENTITY_REQUEST, serviceIdentitiesDataWorker);
}

function* serviceIdentitiesDataWorker() {
  try {
    yield put(getServiceIdentitiesRequestLoading());
    const response = yield call(fetchServiceIdentities);
    yield put(getServiceIdentitiesRequestSuccess(response));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(getServiceIdentitiesRequestFailure(reason));
  }
}

function* tokensDataWatcher() {
  yield takeLatest(TokensType.TOKENS_REQUEST, tokensDataWorker);
}

function* tokensDataWorker() {
  try {
    yield put(getTokensRequestLoading());
    const response = yield call(fetchTokens);
    yield put(getTokensRequestSuccess(response));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(getTokensRequestFailure(reason));
  }
}

export default all([
  fork(usersDataWatcher),
  fork(groupsDataWatcher),
  fork(tokensDataWatcher),
  fork(serviceIdentitiesDataWatcher),
]);
