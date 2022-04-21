import {
  approvalNotificationMediumDetailsType,
  PolicyDeleteDataTypes,
  PolicyViewDataTypes,
  ApplicationsListTypes,
} from './constants';

export const requestPolicyView = (payload) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_DATA_REQUEST,
    payload: payload,
  };
};

export const loadingPolicyView = () => {
  return { type: PolicyViewDataTypes.POLICY_VIEW_DATA_LOADING };
};

export const successPolicyView = (policyViewData) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_DATA_SUCCESS,
    payload: policyViewData,
  };
};

export const failurePolicyView = (reason) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_DATA_FAILURE,
    payload: reason,
  };
};

export const resetPolicyView = () => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_DATA_RESET,
    payload: {},
  };
};

export const requestPolicyViewToggle = (payload) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_INIT,
    payload: payload,
  };
};

export const loadingPolicyViewToggle = () => {
  return { type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_LOADING };
};

export const successPolicyViewToggle = (togglePolicyStatus) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_COMPLETE,
    payload: togglePolicyStatus,
  };
};

export const failurePolicyViewToggle = (reason) => {
  return {
    type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_FAILURE,
    payload: reason,
  };
};

export const requestPolicyDelete = (payload) => {
  return {
    type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_REQUEST,
    payload: payload,
  };
};

export const loadingPolicyDelete = () => {
  return { type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_LOADING };
};

export const successPolicyDelete = (deletePolicyStatus) => {
  return {
    type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_SUCCESS,
    payload: deletePolicyStatus,
  };
};

export const failurePolicyDelete = (reason) => {
  return {
    type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_FAILURE,
    payload: { error: reason },
  };
};

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

export const requestApplicationList = () => ({
  type: ApplicationsListTypes.APPLICATION_LIST_REQUEST,
});

export const loadingApplicationList = () => ({
  type: ApplicationsListTypes.APPLICATION_LIST_LOADING,
});

export const successApplicationList = (ApplicationsList) => ({
  type: ApplicationsListTypes.APPLICATION_LIST_SUCCESS,
  payload: ApplicationsList,
});

export const failureApplicationList = (reason) => ({
  type: ApplicationsListTypes.APPLICATION_LIST_FAILURE,
  payload: { error: reason },
});

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
