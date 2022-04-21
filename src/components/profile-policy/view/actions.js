import { approvalNotificationMediumDetailsType, PolicyViewDataTypes } from './constants';

export const approvalNotificationMediumDetailsRequest = ({ channelId, history }) => ({
  type: approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_REQUEST,
  payload: { channelId, history },
});

export const approvalNotificationMediumDetailsLoading = () => ({
  type: approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_LOADING,
});

export const approvalNotificationMediumDetailsReset = () => ({
  type: approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_RESET,
});

export const approvalNotificationMediumDetailsFailure = (payload) => ({
  type: approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_FAILURE,
  payload,
});

export const approvalNotificationMediumDetailsSuccess = (payload) => ({
  type: approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_SUCCESS,
  payload,
});

export const getPolicyByIdRequest = (payload) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_REQUEST,
  payload,
});

export const getPolicyByIdLoading = () => ({ type: PolicyViewDataTypes.POLICY_VIEW_DATA_LOADING });

export const getPolicyByIdSuccess = (policyViewData) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_SUCCESS,
  payload: policyViewData,
});

export const getPolicyByIdFailure = (reason) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_FAILURE,
  payload: reason,
});

export const getPolicyByIdReset = () => ({ type: PolicyViewDataTypes.POLICY_VIEW_DATA_RESET });

export const getPolicyByNameRequest = (payload) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_REQUEST,
  payload,
});

export const getPolicyByNameLoading = () => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_LOADING,
});

export const getPolicyByNameSuccess = (policyViewData) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_SUCCESS,
  payload: policyViewData,
});

export const getPolicyByNameFailure = (reason) => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_FAILURE,
  payload: reason,
});

export const getPolicyByNameReset = () => ({
  type: PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_RESET,
});
