import { translate } from '../../../externalization';

export const EditRoleTypes = {
  EDIT_ROLE_REQUEST: 'EDIT_ROLE_REQUEST',
  EDIT_ROLE_LOADING: 'EDIT_ROLE_LOADING',
  EDIT_ROLE_SUCCESS: 'EDIT_ROLE_SUCCESS',
  EDIT_ROLE_FAILURE: 'EDIT_ROLE_FAILURE',
  EDIT_ROLE_RESET: 'EDIT_ROLE_RESET',
};

export const classes = {
  editRoleActionContainer: 'edit-role-action-container',
  editRoleLeftAction: 'edit-role-left-action',
  editRoleSaveBtn: 'edit-role-save-btn',
  editRoleResetBtn: 'edit-role-reset-btn',
  editRoleRightAction: 'edit-role-right-action',
  editRoleErrorSnackbar: 'edit-role-error-snackbar',
};

export const translatedStrings = {
  pageTitle: translate('ROLES_MODULE.EDIT_ROLE_TITLE'),
  saveBtn: translate('SAVE'),
  resetBtn: translate('RESET'),
  cancelBtn: translate('CANCEL'),
  switchToJSONLabel: translate('ROLES_MODULE.SWITCH_TO_JSON'),
  switchToFormLabel: translate('ROLES_MODULE.SWITCH_TO_FORM'),
  switchToJSONMessage: translate('ROLES_MODULE.SWITCH_TO_JSON_MESSAGE'),
  switchToFormMessage: translate('ROLES_MODULE.SWITCH_TO_FORM_MESSAGE'),
  switchToJSONBtn: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
  switchToFormBtn: translate('ROLES_MODULE.SWITCH_TO_FORM_BTN'),
  switchToJSONHeader: translate('ROLES_MODULE.SWITCH_TO_JSON_HEADER'),
  switchToFormHeader: translate('ROLES_MODULE.SWITCH_TO_FORM_HEADER'),
  noBtn: translate('NO'),
  cancelModalTitle: translate('ROLES_MODULE.CANCEL_MODAL_TITLE'),
  cancelModalMessage: translate('ROLES_MODULE.CANCEL_MODAL_MESSAGE', {
    entity: 'role',
  }),
  cancelModalPrimaryBtn: translate('ROLES_MODULE.CANCEL_MODAL_PRIMARY_BTN'),
  saveModalTitle: translate('ROLES_MODULE.SAVE_MODAL_ROLE_TITLE'),
  saveModalMessage: translate('ROLES_MODULE.SAVE_MODAL_ROLE_MESSAGE', {
    entity: 'role',
  }),
  saveModalPrimaryBtn: translate('ROLES_MODULE.SAVE_MODAL_PRIMARY_BTN'),
  resetModalTitle: translate('ROLES_MODULE.RESET_MODAL_ROLE_TITLE'),
  resetModalMessage: translate('ROLES_MODULE.RESET_MODAL_ROLE_MESSAGE'),
  resetModalPrimaryBtn: translate('ROLES_MODULE.RESET_MODAL_PRIMARY_BTN'),
  resetModalSecondaryBtn: translate('ROLES_MODULE.RESET_MODAL_SECONDARY_BTN'),
  resetNotification: translate('ROLES_MODULE.RESET_NOTIFICATION'),
  nameValidation: translate('ROLES_MODULE.ROLE_NAME_VALIDATION'),
  nameExistValidation: translate('ROLES_MODULE.ROLE_NAME_EXIST_VALIDATION'),
  roleJSONValidation: translate('ROLES_MODULE.ROLE_JSON_VALIDATION'),
  editRoleSuccessMessage: translate('ROLES_MODULE.EDIT_ROLE_SUCCESS_MESSAGE'),
  errorSnackbarTitle: translate('ROLES_MODULE.SUBMIT_FORM_ERROR_TITLE'),
  permissionValidation: translate('ROLES_MODULE.PERMISSION_VALIDATION'),
  invalidJsonValidation: translate('INVALID_JSON'),
  editingRoleLoaderMessage: translate('ROLES_MODULE.UPDATE_ROLE_LOADER_MESSAGE'),
  roleLoadingMessage: translate('ROLES_MODULE.ROLE_DETAILS_LOADING'),
};
