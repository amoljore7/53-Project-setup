import { EditRoleTypes } from './constants';

export const editRoleRequest = ({ id, roleData, history }) => ({
  type: EditRoleTypes.EDIT_ROLE_REQUEST,
  payload: { id, roleData, history },
});

export const editRoleLoading = () => ({
  type: EditRoleTypes.EDIT_ROLE_LOADING,
});

export const editRoleSuccess = (payload) => ({
  type: EditRoleTypes.EDIT_ROLE_SUCCESS,
  payload,
});

export const editRoleFail = (payload) => ({
  type: EditRoleTypes.EDIT_ROLE_FAILURE,
  payload,
});

export const editRoleReset = () => ({
  type: EditRoleTypes.EDIT_ROLE_RESET,
});
