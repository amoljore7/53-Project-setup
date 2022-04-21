import { translate } from '../../../externalization';

export const GetViewPermissionsTypes = {
  PERMISSIONS_VIEW_REQUEST: 'PERMISSIONS_VIEW_REQUEST',
  PERMISSIONS_VIEW_LOADING: 'PERMISSIONS_VIEW_LOADING',
  PERMISSIONS_VIEW_SUCCESS: 'PERMISSIONS_VIEW_SUCCESS',
  PERMISSIONS_VIEW_FAILURE: 'PERMISSIONS_VIEW_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
};

export const classes = {
  viewPermissionButtonContainer: 'view-permission-button-container',
  viewPermissionBtnPadding: 'view-permission-btn-padding',
  viewPermissionLeftAction: 'view-permission-left-action',
  viewPermissionRightAction: 'view-permission-right-action',
  viewPermissionJSONFormContainer: 'view-permission-JSON-Form-container',
};

export const pageTitle = translate('PERMISSION');
export const defaultNotificationType = 'general';
export const switchToJSON = translate('VIEW_JSON');
export const switchToEntity = translate('VIEW_ENTITY');
export const permissionCloneTitle = translate('PERMISSION_MODULE.PERMISSION_CLONE');
export const deletePermissionMsg = translate('PERMISSION_MODULE.DELETE_PERMISSION_MSG');
export const deletePermissionTitle = translate('PERMISSION_MODULE.DELETE_PERMISSION');
export const deleteYesLabel = translate('YES_DELETE');
export const deleteNoLabel = translate('No');
export const defaultModalType = 'alert';
export const buttonType = {
  primaryBtn: 'primary',
  secondaryBtn: 'secondary',
  mediumBtn: 'medium',
  edit: translate('EDIT'),
  clone: translate('CLONE'),
  delete: translate('DELETE'),
  close: translate('CLOSE'),
};
