import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import {
  MyApprovalsDetailsDataTypes,
  ApproveRequestDataTypes,
  RejectRequestDataTypes,
} from './constants';
import { fetchMyApprovalsDetails } from './service';
import { approveRejectRequest } from '../../../../../../services/user-service';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';

import { translate } from '../../../../externalization';

function* myApprovalsDetailsWatcher() {
  yield takeLatest(
    MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_REQUEST,
    myApprovalsDetailsWorker
  );
}

export function* myApprovalsDetailsWorker({ payload = {} }) {
  try {
    yield put({ type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_LOADING });

    const response = yield call(fetchMyApprovalsDetails, payload);
    const { data } = response;

    yield put({
      type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put(openNotification('error', reason, true, null));
    yield put({ type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_FAILURE, payload: reason });
  }
}

function* approveRequestWatcher() {
  yield takeLatest(ApproveRequestDataTypes.APPROVE_REQUEST_DETAILS_REQUEST, approveRequestWorker);
}

export function* approveRequestWorker({ payload = {} }) {
  const { history } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(openNotification('success', 'The Request is approved', true, null));
    // redirect to approvals list on reject request success
    history.push('/admin/secret-manager/vault/secrets/my-approvals');
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
        null
      )
    );
  }
}

function* rejectRequestWatcher() {
  yield takeLatest(RejectRequestDataTypes.REJECT_REQUEST_DETAILS_REQUEST, rejectRequestWorker);
}

export function* rejectRequestWorker({ payload = {} }) {
  const { history } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(openNotification('success', 'The Request is rejected', true, null));
    // redirect to approvals list on reject request success
    history.push('/admin/secret-manager/vault/secrets/my-approvals');
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
        null
      )
    );
  }
}

export default all([
  fork(myApprovalsDetailsWatcher),
  fork(approveRequestWatcher),
  fork(rejectRequestWatcher),
]);
