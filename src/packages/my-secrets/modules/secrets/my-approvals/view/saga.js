import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import {
  MyApprovalsDetailsDataTypes,
  ApproveRequestDataTypes,
  RejectRequestDataTypes,
} from './constants';
import { fetchMyApprovalsDetailsList } from './service';
import { approveRejectRequest } from '../../../../../../services/user-service';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';

import { translate } from '../../../../externalization';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../../utils/common-constants';

function* myApprovalsDetailsWatcher() {
  yield takeLatest(
    MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_REQUEST,
    myApprovalsDetailsWorker
  );
}

export function* myApprovalsDetailsWorker({ payload = {} }) {
  try {
    yield put({ type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_LOADING });

    const response = yield call(fetchMyApprovalsDetailsList, payload);
    const { data } = response;

    yield put({
      type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({ type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_FAILURE, payload: reason });
  }
}

function* detailsApproveRequestWatcher() {
  yield takeLatest(
    ApproveRequestDataTypes.APPROVE_REQUEST_DETAILS_REQUEST,
    detailsAapproveRequestWorker
  );
}

export function* detailsAapproveRequestWorker({ payload = {} }) {
  const { history, redirectPath, showNotification } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));

    if (showNotification) {
      yield put(
        openNotification(
          successNotificationType,
          translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_APPROVED'),
          true,
          successNotificationDuration
        )
      );
    }
    // redirect to approvals list on reject request success
    history.push(redirectPath);
  } catch ({ response }) {
    const reason = (response && response?.data && response?.data?.message) || '';
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        errorNotificationType,
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_NOT_APPROVED', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* detailsRejectRequestWatcher() {
  yield takeLatest(
    RejectRequestDataTypes.REJECT_REQUEST_DETAILS_REQUEST,
    detailsRejectRequestWorker
  );
}

export function* detailsRejectRequestWorker({ payload = {} }) {
  const { history, redirectPath, showNotification } = payload;
  try {
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));

    yield call(approveRejectRequest, payload);

    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));

    if (showNotification) {
      yield put(
        openNotification(
          successNotificationType,
          translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_REJECTED'),
          true,
          successNotificationDuration
        )
      );
    }
    // redirect to approvals list on reject request success
    history.push(redirectPath);
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(
      openNotification(
        errorNotificationType,
        translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_NOT_REJECTED', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

export default all([
  fork(myApprovalsDetailsWatcher),
  fork(detailsApproveRequestWatcher),
  fork(detailsRejectRequestWatcher),
]);
