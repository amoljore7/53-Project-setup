import { RoleDeleteDataTypes, RoleViewDataTypes } from './constants';

export const viewRoleByIdRequest = ({ roleId, history }) => ({
  type: RoleViewDataTypes.ROLE_VIEW_DATA_REQUEST,
  payload: { roleId, history },
});

export const viewRoleByIdLoading = () => ({
  type: RoleViewDataTypes.ROLE_VIEW_DATA_LOADING,
});

export const viewRoleByIdSuccess = (payload) => ({
  type: RoleViewDataTypes.ROLE_VIEW_DATA_SUCCESS,
  payload,
});

export const viewRoleByIdFail = (payload) => ({
  type: RoleViewDataTypes.ROLE_VIEW_DATA_FAILURE,
  payload,
});

export const viewRoleByIdReset = () => ({
  type: RoleViewDataTypes.ROLE_VIEW_DATA_RESET,
});

export const deleteRoleRequest = ({ roleId, history }) => ({
  type: RoleDeleteDataTypes.ROLE_DELETE_DATA_REQUEST,
  payload: { roleId, history },
});

export const deleteRoleLoading = () => ({
  type: RoleDeleteDataTypes.ROLE_DELETE_DATA_LOADING,
});

export const deleteRoleSuccess = (payload) => ({
  type: RoleDeleteDataTypes.ROLE_DELETE_DATA_SUCCESS,
  payload,
});

export const deleteRoleFail = (payload) => ({
  type: RoleDeleteDataTypes.ROLE_DELETE_DATA_FAILURE,
  payload,
});
