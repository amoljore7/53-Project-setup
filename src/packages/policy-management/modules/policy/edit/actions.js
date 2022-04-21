import {
  editPermissionsListType,
  EditPolicyType,
  editRolesListType,
  LoadPolicyDataType,
} from './constants';

export const recursiveEditRoleListRequest = (payload) => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_REQUEST,
  payload,
});

export const recursiveEditRoleListLoading = () => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_LOADING,
});

export const recursiveEditRoleListLoadingDisable = () => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_LOADING_DISABLE,
});

export const recursiveEditRoleListSuccess = (payload) => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_SUCCESS,
  payload,
});

export const recursiveEditRoleListFail = (payload) => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_FAILURE,
  payload,
});

export const recursiveEditRoleListReset = () => ({
  type: editRolesListType.RECURSIVE_EDIT_ROLES_LIST_RESET,
});

export const recursiveEditPermissionListRequest = (payload) => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_REQUEST,
  payload,
});

export const recursiveEditPermissionListLoading = () => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING,
});

export const recursiveEditPermissionListLoadingDisable = () => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING_DISABLE,
});

export const recursiveEditPermissionListSuccess = (payload) => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_SUCCESS,
  payload,
});

export const recursiveEditPermissionListFail = (payload) => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_FAILURE,
  payload,
});

export const recursiveEditPermissionListReset = () => ({
  type: editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_RESET,
});

export const getPolicyByNameRequest = (name, history) => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_REQUEST,
  payload: { name, history },
});

export const getPolicyByNameLoading = () => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_LOADING,
});

export const getPolicyByNameSuccess = (EditPolicyData) => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_SUCCESS,
  payload: EditPolicyData,
});

export const getPolicyByNameFailure = (reason) => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_FAILURE,
  payload: { error: reason },
});

export const getPolicyByNameReset = () => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_RESET,
});

export const getPolicyByIdRequest = (id, history) => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_REQUEST,
  payload: { id, history },
});

export const getPolicyByIdReset = () => ({
  type: LoadPolicyDataType.EDIT_LOAD_POLICY_RESET,
});

export const updatePolicyRequest = (data, history, policyEntity) => ({
  type: EditPolicyType.EDIT_POLICY_REQUEST,
  payload: { data, history, policyEntity },
});

export const updatePolicyLoading = () => ({ type: EditPolicyType.EDIT_POLICY_LOADING });

export const updatePolicySuccess = (response) => ({
  type: EditPolicyType.EDIT_POLICY_SUCCESS,
  payload: response,
});

export const updatePolicyFailure = (reason) => ({
  type: EditPolicyType.EDIT_POLICY_FAILURE,
  payload: reason,
});
