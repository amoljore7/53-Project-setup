import {
  clonePermissionsListType,
  ClonePolicyType,
  cloneRolesListType,
  LoadPolicyDataType,
} from './constants';

export const recursiveCloneRoleListRequest = (payload) => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_REQUEST,
  payload,
});

export const recursiveCloneRoleListLoading = () => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_LOADING,
});

export const recursiveCloneRoleListDisableLoading = () => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_LOADING_DISABLE,
});

export const recursiveCloneRoleListSuccess = (payload) => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_SUCCESS,
  payload,
});

export const recursiveCloneRoleListFail = (payload) => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_FAILURE,
  payload,
});

export const recursiveCloneRoleListReset = () => ({
  type: cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_RESET,
});

export const recursiveClonePermissionListRequest = (payload) => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_REQUEST,
  payload,
});

export const recursiveClonePermissionListLoading = () => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_LOADING,
});

export const recursiveClonePermissionListLoadingDisable = () => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_LOADING_DISABLE,
});

export const recursiveClonePermissionListSuccess = (payload) => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_SUCCESS,
  payload,
});

export const recursiveClonePermissionListFail = (payload) => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_FAILURE,
  payload,
});

export const recursiveClonePermissionListReset = () => ({
  type: clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_RESET,
});

export const getPolicyByNameRequest = (name, history) => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_REQUEST,
  payload: { name, history },
});

export const getPolicyByNameLoading = () => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_LOADING,
});

export const getPolicyByNameSuccess = (ClonePolicyData) => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_SUCCESS,
  payload: ClonePolicyData,
});

export const getPolicyByNameFailure = (reason) => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_FAILURE,
  payload: { error: reason },
});

export const getPolicyByNameReset = () => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_RESET,
});

export const getPolicyByIdRequest = (id, history) => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_REQUEST,
  payload: { id, history },
});

export const getPolicyByIdReset = () => ({
  type: LoadPolicyDataType.CLONE_LOAD_POLICY_RESET,
});

export const createPolicyRequest = (data, history) => ({
  type: ClonePolicyType.CLONE_POLICY_REQUEST,
  payload: { data, history },
});

export const createPolicyLoading = () => ({ type: ClonePolicyType.CLONE_POLICY_LOADING });

export const createPolicySuccess = (response) => ({
  type: ClonePolicyType.CLONE_POLICY_SUCCESS,
  payload: response,
});

export const createPolicyFailure = (response) => ({
  type: ClonePolicyType.CLONE_POLICY_FAILURE,
  payload: response?.data?.message,
});
