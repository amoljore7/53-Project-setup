import { put, takeLatest, all, call, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../../../components/notification/action';
import {
  PolicyViewDataTypes,
  PolicyDeleteDataTypes,
  enabledPolicy,
  getTogglePolicySuccessMessage,
  getTogglePolicyErrorMessage,
  approvalNotificationMediumDetailsType,
  ApplicationsListTypes,
  translatedStrings,
} from './constants';
import { viewString } from '../../../all-secrets/constants';
import { translate } from '../../../../../externalization';
import {
  adminSecretListingPath,
  allSecretsPath,
  editSMPolicyPath,
  errorNotificationDuration,
  errorNotificationType,
  IS_SLACK,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../../../utils/common-constants';
import {
  approvalNotificationMediumDetailsFailure,
  approvalNotificationMediumDetailsLoading,
  approvalNotificationMediumDetailsRequest,
  approvalNotificationMediumDetailsReset,
  approvalNotificationMediumDetailsSuccess,
  failureApplicationList,
  failurePolicyDelete,
  failurePolicyView,
  failurePolicyViewToggle,
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
  loadingApplicationList,
  loadingPolicyDelete,
  loadingPolicyView,
  loadingPolicyViewToggle,
  requestPolicyView,
  successApplicationList,
  successPolicyDelete,
  successPolicyView,
  successPolicyViewToggle,
} from './action';
import { isEmpty } from 'lodash';
import {
  recursiveApprovalChannelListLoading,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListReset,
} from '../add/actions';
import {
  deletePolicySM,
  editPolicySM,
  getPolicyByEntity,
} from '../../../../../../../services/policy-admin-service';
import { fetchNotificationMediumById } from '../../../../../../../services/notification-medium-service';
import { fetchApplicationsList } from '../../../../../../../services/user-service';

function* policyViewDataWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_DATA_REQUEST, policyViewDataWorker);
}

function* policyViewDataWorker({ payload }) {
  const { policyId, history, resourcePath } = payload;
  const resourceData = { resourcePath, consumer: 'secretmanager' };
  try {
    yield put(loadingPolicyView());
    yield put(approvalNotificationMediumDetailsReset());
    yield put(recursiveApprovalChannelListReset());
    const policyViewData = yield call(getPolicyByEntity, policyId, resourceData);
    yield put(successPolicyView(policyViewData));
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
    yield put(failurePolicyView(reason));
    history.push({ pathname: adminSecretListingPath, state: { previousPath: viewString } });
    yield put(
      openNotification(
        errorNotificationType,
        translate('POLICIES_MODULE.VIEW_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
        true,
        null
      )
    );
  }
}
function* policyDeleteDataWatcher() {
  yield takeLatest(PolicyDeleteDataTypes.POLICY_DELETE_DATA_REQUEST, policyDeleteDataWorker);
}

export function* policyDeleteDataWorker({ payload }) {
  const { id, resource, history } = payload;
  yield put(loadingPolicyDelete());
  try {
    const deletePolicyStatus = yield call(deletePolicySM, { id, resource });
    yield put(successPolicyDelete(deletePolicyStatus));
    history.push({ pathname: allSecretsPath, state: { previousPath: viewString } });
    yield put(
      openNotification(
        successNotificationType,
        translate('POLICIES_MODULE.DELETE_POLICY_SUCCESS_MESSAGE'),
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failurePolicyDelete(reason));
    history?.push(adminSecretListingPath);
    yield put(
      openNotification(
        errorNotificationType,
        translate('POLICIES_MODULE.DELETE_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
        true,
        null
      )
    );
  }
}
export function* policyViewToggleWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_INIT, policyViewToggleWorker);
}

export function* policyViewToggleWorker({ payload }) {
  const { id, status, resource } = payload;
  yield put(loadingPolicyViewToggle());
  try {
    const togglePolicyStatus = yield call(
      editPolicySM,
      {
        id: id,
        isActive: !(status === enabledPolicy),
      },
      resource
    );
    yield put(successPolicyViewToggle(togglePolicyStatus));
    yield put(
      openNotification(successNotificationType, getTogglePolicySuccessMessage(status), true, null)
    );
    yield put(requestPolicyView({ policyId: id, history }));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failurePolicyViewToggle(reason));
    yield put(
      openNotification(
        errorNotificationType,
        getTogglePolicyErrorMessage(payload.status, reason),
        true,
        null
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

function* permissionsApplicationsListWatcher() {
  yield takeLatest(ApplicationsListTypes.APPLICATION_LIST_REQUEST, getApplicationsListWatcher);
}

function* getApplicationsListWatcher() {
  yield put(loadingApplicationList());
  try {
    const ApplicationsList = yield call(fetchApplicationsList);
    yield put(successApplicationList(ApplicationsList));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failureApplicationList(reason));
  }
}

function* policyViewDataJSONWatcher() {
  yield takeLatest(PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_REQUEST, policyViewDataJSONWorker);
}

function* policyViewDataJSONWorker({ payload }) {
  const { policyName, history } = payload;
  try {
    yield put(getPolicyByNameLoading());
    yield put(approvalNotificationMediumDetailsReset());
    yield put(recursiveApprovalChannelListReset());
    const policyViewData = yield call(getPolicyByEntity, policyName);
    yield put(getPolicyByNameSuccess(policyViewData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getPolicyByNameFailure(reason));
    yield put(
      openNotification(
        errorNotificationType,
        translatedStrings.errorPolicyViewData(reason),
        true,
        errorNotificationDuration
      )
    );
    history?.push(editSMPolicyPath);
  }
}

export default all([
  fork(policyViewDataWatcher),
  fork(policyDeleteDataWatcher),
  fork(policyViewToggleWatcher),
  fork(fetchNotificationMediumDetailsWatcher),
  fork(permissionsApplicationsListWatcher),
  fork(policyViewDataJSONWatcher),
]);
