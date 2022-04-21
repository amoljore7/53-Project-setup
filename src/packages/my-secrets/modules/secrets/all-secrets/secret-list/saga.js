import { intersectionWith, isEmpty } from 'lodash';
import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  PAGE_TOKEN,
} from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';
import { translate } from '../../../../externalization';
import {
  failureGroupsDetails,
  failureSecretDetails,
  failureSecretList,
  failureSecretListLoadMore,
  failureSecretTemplateDetails,
  failureUserDetails,
  loadingGroupsDetails,
  loadingSecretDetails,
  loadingSecretList,
  loadingSecretListLoadMore,
  loadingSecretTemplateDetails,
  loadingUserDetails,
  requestSecretTemplateDetails,
  resetGroupsDetails,
  resetUserDetails,
  successGroupsDetails,
  successSecretDetails,
  successSecretList,
  successSecretListLoadMore,
  successSecretTemplateDetails,
  successUserDetails,
} from './action';
import {
  fetchUsersType,
  SecretDetailsTypes,
  secretListTypes,
  secretTemplateDetailsTypes,
  fetchGroupsType,
} from './constants';
import {
  fetchGroups,
  fetchSecretDetails,
  fetchSecretList,
  fetchSecretTemplateDetails,
  fetchUsers,
} from './service';

const getVaultDetails = (state) => state.vaultLanding.data;

function* secretListWatcher() {
  yield takeLatest(secretListTypes.SECRET_LIST_REQUEST, secretListWorker);
}

function* secretListWorker({ payload }) {
  const state = yield select();
  try {
    yield put(loadingSecretList());
    const vaultId = (state) => state.vaultLanding.data.id;
    const searchTerm = (state) =>
      state?.userSecretsReducer?.allSecretsReducer?.secretList?.searchTerm;
    payload.vaultId = vaultId(state);
    payload.search = searchTerm(state);

    let totalSecretList = [];
    let pageToken = '';
    let secretListPagination = {};
    let listData = yield call(fetchSecretList, payload);
    totalSecretList = [...listData?.result];
    secretListPagination = listData?.pagination;
    if (listData?.pagination?.next) {
      pageToken = getQueryParamsFromUrl(listData?.pagination?.next, PAGE_TOKEN);
    }
    while (pageToken) {
      listData = yield call(fetchSecretList, { ...payload, pageToken: pageToken });
      totalSecretList = [...totalSecretList, ...listData?.result];
      secretListPagination = listData?.pagination;
      if (listData?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(listData?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    const secretListData = totalSecretList;
    yield put(successSecretList(secretListData, secretListPagination));
  } catch (error) {
    const reason = error?.response?.data?.message ?? '';
    yield put(failureSecretList(reason));
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.ERROR_LOADING_SECRETS_LIST', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* secretListLoadMoreWatcher() {
  yield takeLatest(secretListTypes.SECRET_LIST_LOAD_MORE_REQUEST, secretListLoadMoreWorker);
}

function* secretListLoadMoreWorker({ payload }) {
  const state = yield select();
  try {
    yield put(loadingSecretListLoadMore());
    const vaultId = (state) => state.vaultLanding.data.id;
    const searchTerm = (state) =>
      state?.userSecretsReducer?.allSecretsReducer?.secretList?.searchTerm;
    const nextPageToken = (state) =>
      state?.userSecretsReducer?.allSecretsReducer?.secretList?.pagination?.next;
    payload.vaultId = vaultId(state);
    payload.search = searchTerm(state);
    payload.next = nextPageToken(state);
    const secretListData = yield call(fetchSecretList, payload);
    yield put(successSecretListLoadMore(secretListData));
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(failureSecretListLoadMore(reason));
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.ERROR_LOADING_SECRETS_LIST', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* secretDetailsWatcher() {
  yield takeLatest(SecretDetailsTypes.SECRET_DETAILS_REQUEST, secretDetailsWorker);
}

function* secretDetailsWorker({ payload }) {
  const { path, data } = payload;
  try {
    yield put(loadingSecretDetails());
    const { id: vaultId } = yield select(getVaultDetails);
    if (isEmpty(data)) {
      yield put(resetUserDetails());
      yield put(resetGroupsDetails());
    }
    yield put(
      initSpinnerOverlay({
        open: true,
        size: 'medium',
        message: translate('SECRETS_MODULE.SECRET_DETAILS_LOADING_MESSAGE'),
      })
    );
    const secretData = yield call(fetchSecretDetails, path, data, vaultId);
    yield put(successSecretDetails(secretData));
    yield put(
      initSpinnerOverlay({
        open: false,
        size: 'medium',
      })
    );
    yield put(requestSecretTemplateDetails(secretData?.staticSecretTemplateId));
  } catch (error) {
    const { response } = error;
    yield put(failureSecretDetails({ data: response?.data, status: response?.status }));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
  }
}

function* secretTemplateDetailsWatcher() {
  yield takeLatest(
    secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_REQUEST,
    secretTemplateDetailsWorker
  );
}

function* secretTemplateDetailsWorker({ payload }) {
  try {
    yield put(loadingSecretTemplateDetails());
    const secretTemplateData = yield call(fetchSecretTemplateDetails, payload);
    yield put(successSecretTemplateDetails(secretTemplateData));
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(failureSecretTemplateDetails(error));
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.ERROR_LOADING_SECRET', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* fetchUsersWatcher() {
  yield takeLatest(fetchUsersType.FETCH_USERS_REQUEST_VIEW_SECRET, fetchUsersWorker);
}

function* fetchUsersWorker({ payload: userIdList }) {
  try {
    yield put(loadingUserDetails());
    const usersData = yield call(fetchUsers);
    const filterUserData = intersectionWith(
      usersData,
      userIdList,
      (user, id) => user.userId === id
    );
    yield put(successUserDetails(filterUserData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureUserDetails(reason));
  }
}

function* fetchGroupsWatcher() {
  yield takeLatest(fetchGroupsType.FETCH_GROUPS_REQUEST_VIEW_SECRET, fetchGroupsWorker);
}

function* fetchGroupsWorker({ payload: groupIdList }) {
  try {
    yield put(loadingGroupsDetails());
    const groupsData = yield call(fetchGroups);
    const filterGroupData = intersectionWith(
      groupsData,
      groupIdList,
      (group, id) => group.userTagId === id
    );
    yield put(successGroupsDetails(filterGroupData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureGroupsDetails(reason));
  }
}

export default all([
  fork(secretListWatcher),
  fork(secretDetailsWatcher),
  fork(secretTemplateDetailsWatcher),
  fork(secretListLoadMoreWatcher),
  fork(fetchUsersWatcher),
  fork(fetchGroupsWatcher),
]);
