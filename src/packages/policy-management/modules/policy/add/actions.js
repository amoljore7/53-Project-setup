import {
  AddPolicyType,
  approvalChannelListType,
  approvalNotificationMediumListType,
  permissionsListType,
  rolesListType,
} from './constants';

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

// here next is token which is user for pagination
export const recursiveApprovalChannelListRequest = ({ notificationMediumId, next }) => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST,
  payload: { notificationMediumId, next },
});

export const recursiveApprovalChannelListLoading = () => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING,
});

export const recursiveApprovalChannelListLoadingDisable = () => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE,
});

export const recursiveApprovalChannelListSuccess = (payload) => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS,
  payload,
});

export const recursiveApprovalChannelListFail = (payload) => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE,
  payload,
});

export const recursiveApprovalChannelListReset = () => ({
  type: approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_RESET,
});

export const recursiveRoleListRequest = (payload) => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_REQUEST,
  payload,
});

export const recursiveRoleListLoading = () => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_LOADING,
});

export const recursiveRoleListLoadingDisable = () => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_LOADING_DISABLE,
});

export const recursiveRoleListSuccess = (payload) => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_SUCCESS,
  payload,
});

export const recursiveRoleListFail = (payload) => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_FAILURE,
  payload,
});

export const recursiveRoleListReset = () => ({
  type: rolesListType.RECURSIVE_ROLES_LIST_RESET,
});

export const recursivePermissionListRequest = (payload) => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_REQUEST,
  payload,
});

export const recursivePermissionListLoading = () => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_LOADING,
});

export const recursivePermissionListDisableLoading = () => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE,
});

export const recursivePermissionListSuccess = (payload) => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_SUCCESS,
  payload,
});

export const recursivePermissionListFail = (payload) => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_FAILURE,
  payload,
});

export const recursivePermissionListReset = () => ({
  type: permissionsListType.RECURSIVE_PERMISSIONS_LIST_RESET,
});

export const createPolicyRequest = (data, history) => ({
  type: AddPolicyType.POLICY_CREATE_REQUEST,
  payload: { data, history },
});

export const createPolicyLoading = () => ({ type: AddPolicyType.POLICY_CREATE_LOADING });

export const createPolicySuccess = (response) => ({
  type: AddPolicyType.POLICY_CREATE_SUCCESS,
  payload: response,
});

export const createPolicyFailure = (reason) => ({
  type: AddPolicyType.POLICY_CREATE_FAILURE,
  payload: reason,
});
