import { isEmpty } from 'lodash';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../notification/action';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import {
  fetchChannelList,
  fetchNotificationMediumList,
} from '../../../services/notification-medium-service';
import {
  createPolicy,
} from '../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  warningNotificationDuration,
  warningNotificationType,
  successNotificationType
} from '../../../utils/common-constants';
import {
  recursiveApprovalChannelListFail,
  recursiveApprovalChannelListLoadingDisable,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListSuccess,
  approvalNotificationMediumListFail,
  approvalNotificationMediumListLoading,
  approvalNotificationMediumListSuccess,
  createPolicyLoading,
  createPolicySuccess,
  createPolicyFailure,
} from './actions';
import {
  AddPolicyType,
  approvalChannelListType,
  approvalNotificationMediumListType,
  translatedStrings,
} from './constants';

function* addPolicyWatcher() {
  yield takeLatest(AddPolicyType.POLICY_CREATE_REQUEST, addPolicyWorker);
}

function* addPolicyWorker(action) {
  const { history, data, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put(createPolicyLoading());
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.addingPolicy })
    );
    const response = yield call(createPolicy, { data, consumer, consumerEntityId });
    yield put(createPolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.policyCreatedSuccessMessage,
        type: successNotificationType,
        time: 'normal',
      }
    });
  } catch (e) {
    console.log(e)
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    const reason = e.response?.data?.message || '';
    yield put(createPolicyFailure(reason));
  }
}

function* notificationMediumListWatcher() {
  yield takeLatest(
    approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST,
    notificationMediumListWorker
  );
}

function* notificationMediumListWorker() {
  try {
    yield put(approvalNotificationMediumListLoading());
    const data = yield call(fetchNotificationMediumList);
    yield put(approvalNotificationMediumListSuccess(data?.result || []));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(approvalNotificationMediumListFail(reason));
  }
}

function* channelListWatcher() {
  yield takeLatest(
    approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST,
    channelListWorker
  );
}

function* channelListWorker({ payload = {} }) {
  const { notificationMediumId, next } = payload;
  try {
    const response = yield call(fetchChannelList, { notificationMediumId, next });
    yield put(recursiveApprovalChannelListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(
        recursiveApprovalChannelListRequest({
          notificationMediumId,
          next: response?.pagination?.next,
        })
      );
    } else {
      yield put(recursiveApprovalChannelListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.policyReducer?.add?.channelList?.data)) {
      yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    } else {
      yield put(
        openNotification(
          warningNotificationType,
          translatedStrings.warningGetChannelList(reason),
          true,
          warningNotificationDuration
        )
      );
    }
    yield put(recursiveApprovalChannelListFail(reason));
  }
}

export default all([
  fork(addPolicyWatcher),
  fork(notificationMediumListWatcher),
  fork(channelListWatcher),
]);
