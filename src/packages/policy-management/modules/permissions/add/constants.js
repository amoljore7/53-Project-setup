import { translate } from '../../../externalization';

export const PermissionsActionsListTypes = {
  PERMISSIONS_ACTIONS_LIST_REQUEST: 'PERMISSIONS_ACTIONS_LIST_REQUEST',
  PERMISSIONS_ACTIONS_LIST_LOADING: 'PERMISSIONS_ACTIONS_LIST_LOADING',
  PERMISSIONS_ACTIONS_LIST_SUCCESS: 'PERMISSIONS_ACTIONS_LIST_SUCCESS',
  PERMISSIONS_ACTIONS_LIST_FAILURE: 'PERMISSIONS_ACTIONS_LIST_FAILURE',
};
export const AddPermissionsTypes = {
  PERMISSIONS_ADD_REQUEST: 'PERMISSIONS_ADD_REQUEST',
  PERMISSIONS_ADD_LOADING: 'PERMISSIONS_ADD_LOADING',
  PERMISSIONS_ADD_SUCCESS: 'PERMISSIONS_ADD_SUCCESS',
  PERMISSIONS_ADD_FAILURE: 'PERMISSIONS_ADD_FAILURE',
  PERMISSIONS_FLUSH_DATA: 'PERMISSIONS_FLUSH_DATA',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
};
export const ApplicationsListTypes = {
  APPLICATION_LIST_REQUEST: 'APPLICATION_LIST_REQUEST',
  APPLICATION_LIST_LOADING: 'APPLICATION_LIST_LOADING',
  APPLICATION_LIST_SUCCESS: 'APPLICATION_LIST_SUCCESS',
  APPLICATION_LIST_FAILURE: 'APPLICATION_LIST_FAILURE',
};

export const classes = {
  addPermissionButtonContainer: 'add-permission-button-container',
  addPermissionSaveBtn: 'add-permission-save-btn',
  addPermissionLeftAction: 'add-permission-left-action',
  addPermissionRightAction: 'add-permission-right-action',
  permissionJSONFormContainer: 'permission-JSON-Form-container',
};
export const pageTitle = translate('PERMISSION_MODULE.ADD_PERMISSION');
export const cancelPermissionMsg = translate('PERMISSION_MODULE.CANCEL_SAVE_PERMISSION');
export const cancelPermissionTitle = translate('DISCARD');
export const cancelYesLabel = translate('YES_DISCARD');
export const cancelNoLabel = translate('NO');
export const switchToJSON = translate('SWITCH_TO_JSON');
export const switchToForm = translate('SWITCH_TO_FORM');
export const switchToJSONButton = translate('SWITCH_TO_JSON_BUTTON');
export const switchToFormButton = translate('SWITCH_TO_FORM_BUTTON');
export const switchToJsonMsg = translate('DISCARD_AND_SWITCH_TO_JSON_MSG');
export const switchToFormMsg = translate('DISCARD_AND_SWITCH_TO_FORM_MSG');
export const switchJsonLabel = translate('SWITCH_TO_JSON_BTN');
export const switchFormLabel = translate('SWITCH_TO_FORM_BTN');
export const switchNoLabel = translate('NO');
export const defaultModalType = 'alert';
export const appsConsumer = 'apps';
export const appsConsumerDescription = 'Applications';
export const cloneNamePrefix = (name) => translate('COPY_OF', { name });

export const validation = {
  permissionNameExit: translate('PERMISSION_MODULE.PERMISSION_NAME_EXIT'),
  permissionNameEnter: translate('PERMISSION_MODULE.PERMISSION_NAME_ENTER'),
  permissionConsumer: translate('PERMISSION_MODULE.PERMISSION_CONSUMER'),
  permissionResource: translate('PERMISSION_MODULE.PERMISSION_RESOURCE'),
  permissionAction: translate('PERMISSION_MODULE.PERMISSION_ACTION'),
  descriptionMaxChar: translate('DESCRIPTION_MAX_CHAR'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
};

export const buttonType = {
  primaryBtn: 'primary',
  secondaryBtn: 'secondary',
  mediumBtn: 'medium',
  save: translate('SAVE'),
  cancel: translate('CANCEL'),
};

export const errorNotificationTime = 3000;
