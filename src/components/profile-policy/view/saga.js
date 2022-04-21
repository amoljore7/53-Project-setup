import { put, takeLatest, all, call, fork } from 'redux-saga/effects';
import { openNotification } from '../../notification/action';
import {
  recursiveApprovalChannelListLoading,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListReset,
} from '../add/actions';
import {
  PolicyViewDataTypes,
  PolicyDeleteDataTypes,
  enabledPolicy,
  getTogglePolicySuccessMessage,
  getTogglePolicyErrorMessage,
  approvalNotificationMediumDetailsType,
  translatedStrings,
} from './constants';
import { translate } from '../../../packages/policy-management/externalization';
import {
  approvalNotificationMediumDetailsFailure,
  approvalNotificationMediumDetailsLoading,
  approvalNotificationMediumDetailsRequest,
  approvalNotificationMediumDetailsReset,
  approvalNotificationMediumDetailsSuccess,
  getPolicyByIdFailure,
  getPolicyByIdLoading,
  getPolicyByIdSuccess,
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
} from './actions';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationDuration,
  successNotificationType,
} from '../../../utils/common-constants';
import { IS_SLACK } from '../add/constants';
import isEmpty from 'lodash/isEmpty';
import {
  deletePolicyId,
  editPolicyByEntity,
  getPolicyByEntity,
} from '../../../services/policy-admin-service';
import { fetchNotificationMediumById } from '../../../services/notification-medium-service';

function* policyViewDataWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_DATA_REQUEST, policyViewDataWorker);
}

function* policyViewDataWorker({ payload }) {
  const { policyId, history, consumer, consumerEntityId, redirectPath } = payload;
  try {
    yield put(getPolicyByIdLoading());
    yield put(approvalNotificationMediumDetailsReset());
    yield put(recursiveApprovalChannelListReset());
    const policyViewData = yield call(getPolicyByEntity, policyId,  null, consumer, consumerEntityId);
    yield put(getPolicyByIdSuccess(policyViewData));
    //NOTE: Below code will be executed if policy contains notification medium
    if (!isEmpty(policyViewData?.condition)) {
      const approver = JSON.parse(policyViewData.condition);
      if (!isEmpty(approver?.approval)) {
        yield put(
          approvalNotificationMediumDetailsRequest({
            channelId: approver?.approval?.notificationMedium,
            history,
          })
        );
      }
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getPolicyByIdFailure(reason));
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.errorPolicyViewData(reason),
        type: errorNotificationType,
        time: 'normal',
      }
    });
  }
}
function* policyViewDataJSONWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_REQUEST, policyViewDataJSONWorker);
}

function* policyViewDataJSONWorker({ payload }) {
  const { policyName, history, consumer, consumerEntityId, redirectPath } = payload;
  try {
    yield put(getPolicyByNameLoading());
    yield put(approvalNotificationMediumDetailsReset());
    yield put(recursiveApprovalChannelListReset());
    const policyViewData = yield call(getPolicyByEntity, policyName,  null, consumer, consumerEntityId);
    yield put(getPolicyByNameSuccess(policyViewData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getPolicyByNameFailure(reason));
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.errorPolicyViewData(reason),
        type: errorNotificationType,
        time: 'normal',
      }
    });
  }
}
function* policyDeleteDataWatcher() {
  yield takeLatest(PolicyDeleteDataTypes.POLICY_DELETE_DATA_REQUEST, policyDeleteDataWorker);
}

export function* policyDeleteDataWorker({ payload }) {
  const { policyId, history, consumer, consumerEntityId, redirectPath } = payload;
  yield put({
    type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_LOADING,
  });
  try {
    const deletePolicyStatus = yield call(deletePolicyId, { id: policyId, consumer, consumerEntityId });
    yield put({
      type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_SUCCESS,
      payload: deletePolicyStatus,
    });
    
    history.push({
      pathname: redirectPath,
      notification: {
        title: translate('POLICIES_MODULE.DELETE_POLICY_SUCCESS_MESSAGE'),
        type: successNotificationType,
        time: 'normal',
      }
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    
    yield put({
      type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_FAILURE,
      payload: { error: reason },
    });
    
    history.push({
      pathname: redirectPath,
      notification: {
        title: translate('POLICIES_MODULE.DELETE_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
        type: errorNotificationType,
        time: 'normal',
      }
    });
  }
}
export function* policyViewToggleWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_INIT, policyViewToggleWorker);
}

export function* policyViewToggleWorker({ payload }) {
  const { id, status, consumer, consumerEntityId } = payload;
  yield put({ type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_LOADING });
  try {
    const togglePolicyStatus = yield call(
      editPolicyByEntity,
      {
        isActive: !(status === enabledPolicy),
      },
      id,
      consumer,
      consumerEntityId
    );
    yield put({
      type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_COMPLETE,
      payload: togglePolicyStatus,
    });
    yield put(
      openNotification(
        successNotificationType,
        getTogglePolicySuccessMessage(status),
        true,
        successNotificationDuration
      )
    );
    yield put({
      type: PolicyViewDataTypes.POLICY_VIEW_DATA_REQUEST,
      payload: { policyId: id, history },
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_FAILURE,
      payload: reason,
    });
    yield put(
      openNotification(
        errorNotificationType,
        getTogglePolicyErrorMessage(payload.status, reason),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* fetchNotificationMediumDetailsWatcher() {
  yield takeLatest(
    approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_REQUEST,
    fetchNotificationMediumDetailsWorker
  );
}

function* fetchNotificationMediumDetailsWorker({ payload }) {
  const { channelId } = payload;
  try {
    yield put(approvalNotificationMediumDetailsLoading());
    const response = yield call(fetchNotificationMediumById, channelId);
    yield put(approvalNotificationMediumDetailsSuccess(response));
    if (response?.type === IS_SLACK) {
      yield put(recursiveApprovalChannelListReset());
      yield put(recursiveApprovalChannelListLoading());
      yield put(recursiveApprovalChannelListRequest({ notificationMediumId: response?.id }));
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(approvalNotificationMediumDetailsFailure(reason));
  }
}

export default all([
  fork(policyViewDataWatcher),
  fork(policyDeleteDataWatcher),
  fork(policyViewToggleWatcher),
  fork(fetchNotificationMediumDetailsWatcher),
  fork(policyViewDataJSONWatcher),
]);
