import { translate } from '../../../externalization';
export const RoleViewDataTypes = {
  ROLE_VIEW_DATA_REQUEST: 'ROLE_VIEW_DATA_REQUEST',
  ROLE_VIEW_DATA_LOADING: 'ROLE_VIEW_DATA_LOADING',
  ROLE_VIEW_DATA_SUCCESS: 'ROLE_VIEW_DATA_SUCCESS',
  ROLE_VIEW_DATA_FAILURE: 'ROLE_VIEW_DATA_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  ROLE_VIEW_DATA_RESET: 'ROLE_VIEW_DATA_RESET',
};

export const RoleDeleteDataTypes = {
  ROLE_DELETE_DATA_REQUEST: 'ROLE_DELETE_DATA_REQUEST',
  ROLE_DELETE_DATA_LOADING: 'ROLE_DELETE_DATA_LOADING',
  ROLE_DELETE_DATA_SUCCESS: 'ROLE_DELETE_DATA_SUCCESS',
  ROLE_DELETE_DATA_FAILURE: 'ROLE_DELETE_DATA_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
};
export const classes = {
  buttonMainContainer: 'button-main-container',
  buttonChildContainer: 'child-button-main-container',
  buttonChildContainerReadOnly: 'child-button-main-container-read-only',
  viewRoleMainContainer: 'view-role-main-container',
  marginTop32: 'margin-top-32',
  marginTop8: 'margin-top-8',
  tagsContainer: 'tag-container',
  renderClass: 'role-render-class',
  viewRolePermissionActionPillContainer: 'view-role-permission-action-pill-container',
  viewRoleJsonTextarea: 'view-role-json-textarea',
  viewRoleOuterWrapper: 'view-role-outer-wrapper',
  viewRolePermissionActionPillContainerRolesPolicyDetails:
    'view-role-permission-action-pill-container-view-role-policy-details',
  marginTop8RolesPolicyDetails: 'margin-top-8-view-role-policy-details',
  marginTop32RolesPolicyDetails: 'margin-top-32-view-role-policy-details',
};

export const spinnerSize = 'medium';
export const defaultButtonSize = '24';
export const mainRole = 'main';
export const deleteRoleSuccessMessage = translate('ROLES_MODULE.DELETE_ROLE_SUCCESS_MESSAGE');

export const translatedStrings = {
  permissionName: translate('PERMISSION_NAME'),
  source: translate('ROLES_MODULE.SOURCE'),
  consumer: translate('ROLES_MODULE.CONSUMER'),
  resources: translate('RESOURCES'),
  actions: translate('ROLES_MODULE.ACTIONS'),
  action: translate('ACTION'),
  roleName: translate('ROLES_MODULE.ROLE_NAME'),
  description: translate('DESCRIPTION'),
  permission: translate('PERMISSION'),
  pageTitle: translate('ROLE'),
  editButtonText: translate('EDIT'),
  cloneButtonText: translate('CLONE'),
  deleteButtonText: translate('DELETE'),
  closeButtonText: translate('CLOSE'),
  viewJsonButtonText: translate('VIEW_JSON'),
  viewEntityButtonText: translate('VIEW_ENTITY'),
  copyText: translate('COPY'),
  roleJsonText: translate('ROLES_MODULE.JSON_TEXTAREA_LABEL'),
  deleteRoleText: translate('ROLES_MODULE.DELETE_ROLE_CONFIRM_TITLE'),
  yesDeleteLabel: translate('YES_DELETE'),
  noLabel: translate('NO'),
  deleteMessagePost: translate('ROLES_MODULE.DELETE_ROLE_CONFIRM_MESSAGE'),
  copyMessage: translate('COPY_NOTIFICATION_MESSAGE'),
  cloneMessage: translate('ROLES_MODULE.ROLES_CLONE'),
  inlineText: translate('INLINE'),
  predefinedText: translate('PRE_DEFINED'),
  noneText: translate('NONE'),
  roleLoadingMessage: translate('ROLES_MODULE.ROLE_DETAILS_LOADING'),
  viewPermissionTooltip: translate('PERMISSION_MODULE.VIEW_PERMISSION_TOOLTIP'),
  deletingRoleLoaderMessage: translate('ROLES_MODULE.DELETE_ROLE_LOADER_MESSAGE'),
  deleteRoleError: translate('ROLES_MODULE.DELETE_ROLE_MESSAGE'),
  getRoleError: (reason) => translate('ROLES_MODULE.GET_ROLE_ERROR_MESSAGE', { reason }),
  deleteRoleWithReason: (reason) => translate('ROLES_MODULE.DELETE_ROLE_ERROR_MESSAGE', { reason }),
};

export const routeToNameList = [
  {
    name: 'System Administrator',
    route: '/admin',
  },
  {
    name: 'Role & Policy Management',
    route: '/admin/policy-management',
  },
  {
    name: 'Role',
    route: '/admin/policy-management/role',
  },
  {
    name: translate('VIEW'),
    route: '/admin/policy-management/role/view',
  },
];
export const viewRoleButtonTestId = 'view-role';
export const permissionTableTestId = 'permission-table';
export const roleButton = {
  variant: 'primary',
  secVariant: 'secondary',
  size: 'medium',
};

export const roleListingPath = '/admin/policy-management/roles';
export const asterisk = '*';
