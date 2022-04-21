import { put, takeLatest, call, all, fork, select } from 'redux-saga/effects';
import {
  MyApprovalsDataTypes,
  ApproveRequestDataTypes,
  RejectRequestDataTypes,
  UsersType,
} from './constants';
import { fetchMyApprovalsList, fetchUsers } from './service';
import { approveRejectRequest } from '../../../../../../services/user-service';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';

import { translate } from '../../../../externalization';
import {
  failureMyApprovalsListLoadMore,
  loadingMyApprovalsListLoadMore,
  successMyApprovalsListLoadMore,
  loadingUsersList,
  successUsersList,
  failureUsersList,
} from './action';
import {
  errorNotificationDuration,
  errorNotificationType,
  papServiceConsumer,
} from '../../../../../../utils/common-constants';

function* myApprovalsListWatcher() {
  yield takeLatest(MyApprovalsDataTypes.MY_APPROVALS_LIST_REQUEST, myApprovalsListWorker);
}

export function* myApprovalsListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) =>
    state?.userSecretsReducer?.myApprovalsReducer?.myApprovalsList?.searchTerm;
  payload.search = searchTerm(state);

  try {
    yield put({ type: MyApprovalsDataTypes.MY_APPROVALS_LIST_LOADING });

    const response = yield call(fetchMyApprovalsList, payload);
    const { data } = response;

    yield put({
      type: MyApprovalsDataTypes.MY_APPROVALS_LIST_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put({ type: MyApprovalsDataTypes.MY_APPROVALS_LIST_FAILURE, payload: reason });
  }
}

function* myApprovalsListLoadMoreWatcher() {
  yield takeLatest(
    MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_REQUEST,
    myApprovalsListLoadMoreWorker
  );
}

export function* myApprovalsListLoadMoreWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) =>
    state?.userSecretsReducer?.myApprovalsReducer?.myApprovalsList?.searchTerm;
  const nextPageToken = (state) =>
    state?.userSecretsReducer?.myApprovalsReducer?.myApprovalsList?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);

  try {
    yield put(loadingMyApprovalsListLoadMore());

    const response = yield call(fetchMyApprovalsList, payload);
    const { data } = response;

    yield put(successMyApprovalsListLoadMore(data));
  } catch ({ response }) {
    const reason = response?.data?.message ?? '';
    yield put(failureMyApprovalsListLoadMore(reason));
  }
}

function* approveRequestWatcher() {
  yield takeLatest(ApproveRequestDataTypes.APPROVE_REQUEST_REQUEST, approveRequestWorker);
}

export function* approveRequestWorker({ payload = {} }) {
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        'success',
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_APPROVED'),
        true,
        null,
        payload.consumer === papServiceConsumer
      )
    );
    // fetch approvals list on approve request success
    yield put({ type: MyApprovalsDataTypes.MY_APPROVALS_LIST_REQUEST });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        'error',
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_NOT_APPROVED', {
          reason,
        }),
        true,
        null,
        payload.consumer === papServiceConsumer
      )
    );
  }
}

function* rejectRequestWatcher() {
  yield takeLatest(RejectRequestDataTypes.REJECT_REQUEST_REQUEST, rejectRequestWorker);
}

export function* rejectRequestWorker({ payload = {} }) {
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        'success',
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_REJECTED'),
        true,
        null,
        payload.consumer === papServiceConsumer
      )
    );
    // fetch approvals list on reject request success
    yield put({ type: MyApprovalsDataTypes.MY_APPROVALS_LIST_REQUEST });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        'error',
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_NOT_REJECTED', {
          reason,
        }),
        true,
        null,
        payload.consumer === papServiceConsumer
      )
    );
  }
}

function* usersDataWatcher() {
  yield takeLatest(UsersType.APPROVALS_USERS_REQUEST, usersDataWorker);
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
  fork(myApprovalsListWatcher),
  fork(approveRequestWatcher),
  fork(rejectRequestWatcher),
  fork(myApprovalsListLoadMoreWatcher),
  fork(usersDataWatcher),
]);
