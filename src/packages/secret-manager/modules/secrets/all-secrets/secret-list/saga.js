import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import {
  secretListTypes,
  secretDeleteTypes,
  translatedStrings,
  fetchUsersType,
  fetchAdminGroupsType,
} from './constants';
import {
  loadingAdminSecretDetails,
  successAdminSecretDetails,
  failureAdminSecretDetails,
  loadingAdminGroupsDetails,
  successAdminGroupsDetails,
  failureAdminGroupsDetails,
} from './action';
import { fetchSecretList, deleteSecret, fetchNodeList, fetchUsers, fetchGroups } from './service';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import { translate } from '../../../../externalization';
import {
  failureSecretList,
  failureSecretListLoadMore,
  loadingSecretList,
  loadingSecretListLoadMore,
  requestSecretList,
  successSecretList,
  successSecretListLoadMore,
} from './action';
import {
  errorNotificationDuration,
  errorNotificationType,
  PAGE_TOKEN,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../../utils/common-constants';
import { intersectionWith } from 'lodash';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';

function* secretListWatcher() {
  yield takeLatest(secretListTypes.SECRET_LIST_REQUEST, secretListWorker);
}

function* secretListWorker({ payload }) {
  const state = yield select();
  try {
    yield put(loadingSecretList());
    const vaultId = (state) => state.vaultLanding.data.id;
    const searchTerm = (state) => state?.secretsReducer?.secretList?.searchTerm;
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
      listData = yield call(fetchSecretList, payload);
      totalSecretList = [...totalSecretList, ...listData?.result];
      secretListPagination = listData?.pagination;
      if (listData?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(listData?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    const secretListData = totalSecretList;

    let selectedNodeMetadata;
    if (payload.parents.length === 0) {
      selectedNodeMetadata = yield select((state) => state?.vaultLanding?.data?.metadata);
    } else {
      const selectedNodeName = payload.parents[payload.parents.length - 1].label;
      const parentsSelectedNode = [...payload.parents];
      parentsSelectedNode.splice(-1, 1);
      let allResults = [];
      let pageToken = '';
      const secretListDataParents = yield call(fetchNodeList, {
        parents: parentsSelectedNode,
        vaultId: vaultId(state),
      });
      allResults = secretListDataParents?.result;
      if (secretListDataParents?.pagination?.next)
        pageToken = getQueryParamsFromUrl(secretListDataParents?.pagination?.next, PAGE_TOKEN);
      while (pageToken) {
        const secretListDataParents = yield call(fetchNodeList, {
          parents: parentsSelectedNode,
          vaultId: vaultId(state),
          pageToken,
        });
        allResults = [...allResults, ...secretListDataParents?.result];
        if (secretListDataParents?.pagination?.next) {
          pageToken = getQueryParamsFromUrl(secretListDataParents?.pagination?.next, PAGE_TOKEN);
        } else {
          pageToken = '';
        }
      }
      for (let i = 0; i < secretListDataParents?.result?.length; i++) {
        if (allResults[i].name === selectedNodeName) {
          selectedNodeMetadata = allResults[i]?.metadata;
          break;
        }
      }
    }
    yield put(successSecretList(secretListData, selectedNodeMetadata, secretListPagination));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failureSecretList(reason));
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.ERROR_LOADING_SECRETS_LIST', { reason }),
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
    const searchTerm = (state) => state?.secretsReducer?.secretList?.searchTerm;
    const nextURL = (state) => state?.secretsReducer?.secretList?.pagination?.next;
    const pageToken = getQueryParamsFromUrl(nextURL, PAGE_TOKEN);
    payload.vaultId = vaultId(state);
    payload.search = searchTerm(state);
    payload.pageToken = pageToken;
    const secretListData = yield call(fetchSecretList, payload);
    yield put(successSecretListLoadMore(secretListData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.ERROR_LOADING_SECRETS_LIST', { reason }),
        true,
        errorNotificationDuration
      )
    );
    yield put(failureSecretListLoadMore(reason));
  }
}

function* deleteSecretWatcher() {
  yield takeLatest(secretDeleteTypes.SECRET_DELETE_REQUEST, deleteSecretWorker);
}

function* deleteSecretWorker({ payload }) {
  try {
    yield put({ type: secretDeleteTypes.SECRET_DELETE_LOADING });
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));
    const vaultId = yield select((state) => state.vaultLanding.data?.id);
    yield call(deleteSecret, { ...payload, vaultId });
    yield put({
      type: secretDeleteTypes.SECRET_DELETE_SUCCESS,
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.deleteSecretSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    // fetch secret list on delete success
    yield put(requestSecretList());
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: secretDeleteTypes.SECRET_DELETE_FAILURE,
      payload: reason,
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.DELETE_SECRET_FAILURE_MESSAGE', { reason }),
        true,
        errorNotificationDuration
      )
    );
  }
}
function* fetchUsersWatcher() {
  yield takeLatest(fetchUsersType.FETCH_ADMIN_REQUEST_VIEW_SECRET, fetchUsersWorker);
}

function* fetchUsersWorker({ payload: userIdList }) {
  try {
    yield put(loadingAdminSecretDetails());
    const usersData = yield call(fetchUsers);
    const filterUserData = intersectionWith(
      usersData,
      userIdList,
      (user, id) => user.userId === id
    );
    yield put(successAdminSecretDetails(filterUserData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureAdminSecretDetails(reason));
  }
}
function* fetchGroupsWatcher() {
  yield takeLatest(fetchAdminGroupsType.FETCH_ADMIN_GROUPS_REQUEST_VIEW_SECRET, fetchGroupsWorker);
}

function* fetchGroupsWorker({ payload: groupIdList }) {
  try {
    yield put(loadingAdminGroupsDetails());
    const groupsData = yield call(fetchGroups);
    const filterGroupData = intersectionWith(
      groupsData,
      groupIdList,
      (group, id) => group.userTagId === id
    );
    yield put(successAdminGroupsDetails(filterGroupData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureAdminGroupsDetails(reason));
  }
}
export default all([
  fork(secretListWatcher),
  fork(deleteSecretWatcher),
  fork(secretListLoadMoreWatcher),
  fork(fetchUsersWatcher),
  fork(fetchGroupsWatcher),
]);
