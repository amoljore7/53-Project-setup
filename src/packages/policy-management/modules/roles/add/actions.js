import { AddRoleTypes, GetAllPermissionsTypes } from './constants';

export const addRoleRequest = ({ roleData, history }) => ({
  type: AddRoleTypes.ADD_ROLE_REQUEST,
  payload: { roleData, history },
});

export const addRoleLoading = () => ({
  type: AddRoleTypes.ADD_ROLE_LOADING,
});

export const addRoleReset = () => ({
  type: AddRoleTypes.ADD_ROLE_RESET,
});

export const addRoleSuccess = (payload) => ({
  type: AddRoleTypes.ADD_ROLE_SUCCESS,
  payload,
});

export const addRoleFail = (payload) => ({
  type: AddRoleTypes.ADD_ROLE_FAILURE,
  payload,
});

export const recursivePermissionListRequest = (payload) => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_REQUEST,
  payload,
});

export const recursivePermissionListLoading = () => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING,
});

export const recursivePermissionListDisableLoading = () => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE,
});

export const recursivePermissionListSuccess = (payload) => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_SUCCESS,
  payload,
});

export const recursivePermissionListFail = (payload) => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_FAILURE,
  payload,
});

export const recursivePermissionListReset = () => ({
  type: GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_RESET,
});
