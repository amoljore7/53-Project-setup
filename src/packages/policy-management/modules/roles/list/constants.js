import { translate } from '../../../externalization';

// Labels and messages
export const noLabel = translate('NO');
export const yesDeleteLabel = translate('YES_DELETE');
export const pageTitle = translate('ROLES');
export const loadingMessage = translate('ROLES_MODULE.ROLES_LOADING');
export const roleSearchPlaceholder = translate('ROLES_MODULE.SEARCH_ROLE_NAME_MESSAGE');
export const addRoleLabel = translate('ROLES_MODULE.ADD_ROLE');
export const deleteRoleTitle = translate('ROLES_MODULE.DELETE_ROLE_CONFIRM_TITLE');
export const deleteRoleMessage = translate('ROLES_MODULE.DELETE_ROLE_CONFIRM_MESSAGE');
export const deleteRoleSuccessMessage = translate('ROLES_MODULE.DELETE_ROLE_SUCCESS_MESSAGE');
export const mainRole = 'main';
export const backToTopId = 'roles-list-back-to-top';

export const actionIconSize = '24';
export const searchDebounceTime = 300;
export const deleteRoleTooltip = translate('ROLES_MODULE.DELETE_ROLE_TOOLTIP');
export const disabledDeleteRoleTooltip = translate('ROLES_MODULE.DISABLED_DELETE_ROLE_TOOLTIP');
export const cloneRoleTooltip = translate('ROLES_MODULE.CLONE_ROLE_TOOLTIP');
export const manageRoleTooltip = translate('ROLES_MODULE.MANAGE_ROLE_TOOLTIP');

export const translatedStrings = {
  noAccessToManageRoleTooltip: translate('ROLES_MODULE.NO_ACCESS_TO_MANAGE_ROLE'),
  noAccessToCloneRoleTooltip: translate('ROLES_MODULE.NO_ACCESS_TO_CLONE_ROLE'),
  noAccessToDeleteRoleTooltip: translate('ROLES_MODULE.NO_ACCESS_TO_DELETE_ROLE'),
};

export const RolesListDataConstants = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  ROLES_LIST_DATA_REQUEST: 'ROLES_LIST_DATA_REQUEST',
  ROLES_LIST_DATA_LOADING: 'ROLES_LIST_DATA_LOADING',
  ROLES_LIST_DATA_SUCCESS: 'ROLES_LIST_DATA_SUCCESS',
  ROLES_LIST_DATA_FAILURE: 'ROLES_LIST_DATA_FAILURE',
  ROLE_DELETE_REQUEST_INIT: 'ROLE_DELETE_REQUEST_INIT',
  ROLE_DELETE_REQUEST_LOADING: 'ROLE_DELETE_REQUEST_LOADING',
  ROLE_DELETE_REQUEST_COMPLETE: 'ROLE_DELETE_REQUEST_COMPLETE',
  ROLE_LIST_SEARCH_TERM_UPDATE: 'ROLE_LIST_SEARCH_TERM_UPDATE',
  ROLES_LIST_LOAD_MORE_DATA_REQUEST: 'ROLES_LIST_LOAD_MORE_DATA_REQUEST',
  ROLES_LIST_LOAD_MORE_DATA_LOADING: 'ROLES_LIST_LOAD_MORE_DATA_LOADING',
  ROLES_LIST_LOAD_MORE_DATA_SUCCESS: 'ROLES_LIST_LOAD_MORE_DATA_SUCCESS',
  ROLES_LIST_LOAD_MORE_DATA_FAILURE: 'ROLES_LIST_LOAD_MORE_DATA_FAILURE',
};

export const classes = {
  addRoleBtnContainer: 'add-role-btn-container',
  rolesTableContainer: 'roles-table-container',
  rolesListContainer: 'roles-list-container',
  rolesTableActionCell: 'roles-table-action-cell',
  disabledIcon: 'disabled-icon',
  rolesTableActionEdit: 'roles-table-action-edit',
  rolesTableActionClone: 'roles-table-action-clone',
  rolesTableActionDelete: 'roles-table-action-delete',
};

export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('ROLE_&_POLICY_MANAGEMENT'),
    route: '/admin/policy-management',
  },
  {
    name: translate('ROLES'),
  },
];

export const errorNotificationTime = 3000;
