import { translate } from '../../../externalization';

export const EditPermissionsTypes = {
  PERMISSIONS_EDIT_REQUEST: 'PERMISSIONS_EDIT_REQUEST',
  PERMISSIONS_EDIT_LOADING: 'PERMISSIONS_EDIT_LOADING',
  PERMISSIONS_EDIT_SUCCESS: 'PERMISSIONS_EDIT_SUCCESS',
  PERMISSIONS_EDIT_FAILURE: 'PERMISSIONS_EDIT_FAILURE',
  PERMISSIONS_EDIT_FLUSH_DATA: 'PERMISSIONS_EDIT_FLUSH_DATA',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
};

export const pageTitle = translate('PERMISSION_MODULE.PERMISSION_EDIT');
export const discardTitle = translate('DISCARD');
export const cancelModalMSG = translate('PERMISSION_MODULE.CANCEL_SAVE_PERMISSION');
export const discardCancelModal = translate('YES_DISCARD');
export const switchToJSONDialogTitle = translate('SWITCH_TO_JSON_HEADER');
export const switchToFormDialogTitle = translate('SWITCH_TO_FORM_HEADER');
export const switchToJSONButton = translate('SWITCH_TO_JSON_BUTTON');
export const switchToFormButton = translate('SWITCH_TO_FORM_BUTTON');
export const switchToJSONDialogButton = translate('SWITCH_TO_JSON_BTN');
export const switchToFormDialogButton = translate('SWITCH_TO_FORM_BTN');
export const resetPermissions = translate('PERMISSION_MODULE.PERMISSION_RESET');
export const fieldsReplaceMsg = translate('PERMISSION_MODULE.FIELD_REPLACE_MSG');
export const resetAllField = translate('RESET_ALL_FILED');
export const keepChangesMSG = translate('NO_KEEP_CHANGES');
export const switchToJsonMsg = translate('DISCARD_AND_SWITCH_TO_JSON_MSG');
export const switchToFormMsg = translate('DISCARD_AND_SWITCH_TO_FORM_MSG');
export const noLabel = translate('NO');
export const savePermissionTitle = translate('PERMISSION_MODULE.SAVE_PERMISSION');
export const permissionSaveMsg = translate('PERMISSION_MODULE.PERMISSION_SAVE_MSG');
export const yesSave = translate('YES_SAVE');
export const resetNotification = translate('ROLES_MODULE.RESET_NOTIFICATION');

export const validation = {
  permissionNameExit: translate('PERMISSION_MODULE.PERMISSION_NAME_EXIT'),
  permissionNameEnter: translate('PERMISSION_MODULE.PERMISSION_NAME_ENTER'),
  permissionConsumer: translate('PERMISSION_MODULE.PERMISSION_CONSUMER'),
  permissionResource: translate('PERMISSION_MODULE.PERMISSION_RESOURCE'),
  permissionResourceSelect: translate('PERMISSION_MODULE.PERMISSION_RESOURCE_SELECT'),
  permissionAction: translate('PERMISSION_MODULE.PERMISSION_ACTION'),
  descriptionMaxChar: translate('DESCRIPTION_MAX_CHAR'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
};

export const buttonType = {
  primaryBtn: 'primary',
  secondaryBtn: 'secondary',
  mediumBtn: 'medium',
  reset: translate('RESET'),
  save: translate('SAVE'),
  cancel: translate('CANCEL'),
};

export const errorNotificationTime = 3000;
