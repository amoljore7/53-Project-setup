import { AddPolicyType, SecretDetailsTypes } from './constants';

export const secretDetailsRequest = (path, vaultId, history) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_REQUEST,
    payload: {
      parentPath: path,
      vaultId,
      history,
    },
  };
};

export const secretDetailsRequestLoading = () => {
  return { type: SecretDetailsTypes.SECRET_DETAILS_LOADING };
};
export const secretDetailsRequestSuccess = (response) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_SUCCESS,
    payload: response,
  };
};
export const secretDetailsRequestError = (response) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_FAILURE,
    payload: response.data,
  };
};
export const createPolicyRequest = (data, history, resource) => {
  return { type: AddPolicyType.POLICY_CREATE_REQUEST, payload: data, history, resource };
};

export const createPolicyRequestLoading = () => {
  return { type: AddPolicyType.POLICY_CREATE_LOADING };
};
export const createPolicyRequestSuccess = (response) => {
  return {
    type: AddPolicyType.POLICY_CREATE_SUCCESS,
    payload: response,
  };
};
export const createPolicyRequestError = (reason) => {
  return {
    type: AddPolicyType.POLICY_CREATE_FAILURE,
    payload: reason,
  };
};

import { recursiveApprovalChannelListType, approvalNotificationMediumListType } from './constants';

export const approvalNotificationMediumListRequest = () => ({
  type: approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST,
});

export const approvalNotificationMediumListLoading = () => ({
  type: approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING,
});

export const approvalNotificationMediumListSuccess = (payload) => ({
  type: approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS,
  payload,
});

export const approvalNotificationMediumListFail = (payload) => ({
  type: approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE,
  payload,
});

export const approvalNotificationMediumListReset = () => ({
  type: approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET,
});

export const recursiveApprovalChannelListRequest = ({ notificationMediumId, next }) => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST,
  payload: { notificationMediumId, next },
});

export const recursiveApprovalChannelListLoading = () => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING,
});

export const recursiveApprovalChannelListLoadingDisable = () => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE,
});

export const recursiveApprovalChannelListSuccess = (payload) => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS,
  payload,
});

export const recursiveApprovalChannelListFail = (payload) => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE,
  payload,
});

export const recursiveApprovalChannelListReset = () => ({
  type: recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_RESET,
});
