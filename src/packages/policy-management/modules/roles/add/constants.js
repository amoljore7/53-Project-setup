import { translate } from '../../../externalization';

export const AddRoleTypes = {
  ADD_ROLE_REQUEST: 'ADD_ROLE_REQUEST',
  ADD_ROLE_LOADING: 'ADD_ROLE_LOADING',
  ADD_ROLE_SUCCESS: 'ADD_ROLE_SUCCESS',
  ADD_ROLE_FAILURE: 'ADD_ROLE_FAILURE',
  ADD_ROLE_RESET: 'ADD_ROLE_RESET',
};

export const GetActionTypes = {
  GET_ACTION_REQUEST: 'GET_ACTION_REQUEST',
  GET_ACTION_LOADING: 'GET_ACTION_LOADING',
  GET_ACTION_SUCCESS: 'GET_ACTION_SUCCESS',
  GET_ACTION_FAILURE: 'GET_ACTION_FAILURE',
  GET_ACTION_RESET: 'GET_ACTION_RESET',
};

export const GetAllPermissionsTypes = {
  ROLE_RECURSIVE_PERMISSIONS_LIST_REQUEST: 'ROLE_RECURSIVE_PERMISSIONS_LIST_REQUEST',
  ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING: 'ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING',
  ROLE_RECURSIVE_PERMISSIONS_LIST_SUCCESS: 'ROLE_RECURSIVE_PERMISSIONS_LIST_SUCCESS',
  ROLE_RECURSIVE_PERMISSIONS_LIST_FAILURE: 'ROLE_RECURSIVE_PERMISSIONS_LIST_FAILURE',
  ROLE_RECURSIVE_PERMISSIONS_LIST_RESET: 'ROLE_RECURSIVE_PERMISSIONS_LIST_RESET',
  ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE:
    'ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE',
};

export const GetPermissionDataTypes = {
  GET_PERMISSION_DATA_REQUEST: 'GET_PERMISSION_DATA_REQUEST',
  GET_PERMISSION_DATA_LOADING: 'GET_PERMISSION_DATA_LOADING',
  GET_PERMISSION_DATA_SUCCESS: 'GET_PERMISSION_DATA_SUCCESS',
  GET_PERMISSION_DATA_FAILURE: 'GET_PERMISSION_DATA_FAILURE',
  GET_PERMISSION_DATA_RESET: 'GET_PERMISSION_DATA_RESET',
};

export const classes = {
  roleActionContainer: 'role-action-container',
  roleLeftAction: 'role-left-action',
  roleSaveBtn: 'role-save-btn',
  roleRightAction: 'role-right-action',
  roleErrorSnackbar: 'role-error-snackbar',
};

//Labels and Messages
export const pageTitle = translate('ROLES_MODULE.ADD_ROLE');
export const saveBtn = translate('SAVE');
export const cancelBtn = translate('CANCEL');
export const switchToJSONLabel = translate('ROLES_MODULE.SWITCH_TO_JSON');
export const switchToFormLabel = translate('ROLES_MODULE.SWITCH_TO_FORM');
export const switchToJSONMessage = translate('ROLES_MODULE.SWITCH_TO_JSON_MESSAGE');
export const switchToFormMessage = translate('ROLES_MODULE.SWITCH_TO_FORM_MESSAGE');
export const switchToJSONBtn = translate('ROLES_MODULE.SWITCH_TO_JSON_BTN');
export const switchToFormBtn = translate('ROLES_MODULE.SWITCH_TO_FORM_BTN');
export const switchToJSONHeader = translate('ROLES_MODULE.SWITCH_TO_JSON_HEADER');
export const switchToFormHeader = translate('ROLES_MODULE.SWITCH_TO_FORM_HEADER');
export const noBtn = translate('NO');
export const cancelModalTitle = translate('ROLES_MODULE.CANCEL_MODAL_TITLE');
export const cancelModalMessage = translate('ROLES_MODULE.CANCEL_MODAL_MESSAGE', {
  entity: 'role',
});
export const cancelModalPrimaryBtn = translate('ROLES_MODULE.CANCEL_MODAL_PRIMARY_BTN');
export const addRoleSuccessMessage = translate('ROLES_MODULE.ADD_ROLE_SUCCESS_MESSAGE');
export const nameValidation = translate('ROLES_MODULE.ROLE_NAME_VALIDATION');
export const nameExistValidation = translate('ROLES_MODULE.ROLE_NAME_EXIST_VALIDATION');
export const roleJSONValidation = translate('ROLES_MODULE.ROLE_JSON_VALIDATION');
export const errorSnackbarTitle = translate('ROLES_MODULE.SUBMIT_FORM_ERROR_TITLE');
export const permissionValidation = translate('ROLES_MODULE.PERMISSION_VALIDATION');

export const translatedString = {
  creatingRoleSpinnerMessage: translate('ROLES_MODULE.CREATING_ROLE'),
  invalidJsonValidation: translate('INVALID_JSON'),
};
