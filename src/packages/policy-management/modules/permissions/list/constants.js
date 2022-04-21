import React from 'react';
import { translate } from '../../../externalization';
import { FiSliders } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';

export const PermissionsListingTypes = {
  PERMISSIONS_LISTING_REQUEST: 'PERMISSIONS_LISTING_REQUEST',
  PERMISSIONS_LISTING_LOADING: 'PERMISSIONS_LISTING_LOADING',
  PERMISSIONS_LISTING_SUCCESS: 'PERMISSIONS_LISTING_SUCCESS',
  PERMISSIONS_LISTING_FAILURE: 'PERMISSIONS_LISTING_FAILURE',
  PERMISSIONS_LISTING_SEARCH_TERM_UPDATE: 'PERMISSIONS_LISTING_SEARCH_TERM_UPDATE',
  PERMISSIONS_LISTING_LOAD_MORE_REQUEST: 'PERMISSIONS_LISTING_LOAD_MORE_REQUEST',
  PERMISSIONS_LISTING_LOAD_MORE_LOADING: 'PERMISSIONS_LISTING_LOAD_MORE_LOADING',
  PERMISSIONS_LISTING_LOAD_MORE_SUCCESS: 'PERMISSIONS_LISTING_LOAD_MORE_SUCCESS',
  PERMISSIONS_LISTING_LOAD_MORE_FAILURE: 'PERMISSIONS_LISTING_LOAD_MORE_FAILURE',
};

export const DeletePermissionsTypes = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  PERMISSIONS_DELETE_REQUEST: 'PERMISSIONS_DELETE_REQUEST',
  PERMISSIONS_DELETE_LOADING: 'PERMISSIONS_DELETE_LOADING',
  PERMISSIONS_DELETE_SUCCESS: 'PERMISSIONS_DELETE_SUCCESS',
  PERMISSIONS_DELETE_FAILURE: 'PERMISSIONS_DELETE_FAILURE',
};

export const classes = {
  addPermissionBtn: 'add-permission-button',
  permissionsListContainer: 'permissions-list-container',
  permissionsTableListingContainer: 'permissions-table-listing-container',
  permissionActionItems: 'permission-action-items',
  permissionActionView: 'permission-action-view',
  permissionActionCopy: 'permission-action-copy',
  permissionActionDelete: 'permission-action-delete',
  disabledIcon: 'disabled-icon',
  permissionListOuterWrapper: 'permission-list-outer-wrapper',
};

export const tableColumns = {
  permissionName: translate('PERMISSION_NAME'),
  description: translate('DESCRIPTION'),
  consumer: translate('CONSUMER'),
  action: translate('ACTION'),
  resources: translate('RESOURCES'),
};
export const loadingMessage = translate('PERMISSION_MODULE.PERMISSIONS_LOADING');
export const permissionSearchText = translate('PERMISSION_MODULE.SEARCH_IN_PERMISSIONS_NAME');
export const addPermissionsTxt = translate('PERMISSION_MODULE.ADD_PERMISSION');
export const pageTitle = translate('PERMISSIONS');
export const deletePermissionTitle = translate('PERMISSION_MODULE.DELETE_PERMISSION');
export const deletePermissionMsg = translate('PERMISSION_MODULE.DELETE_PERMISSION_MSG');
export const deleteYesLabel = translate('YES_DELETE');
export const deleteNoLabel = translate('No');
export const permissionCopiedTitle = translate('PERMISSION_MODULE.PERMISSION_COPIED');
export const deletePermissionTooltip = translate('PERMISSION_MODULE.DELETE_PERMISSION_TOOLTIP');
export const disabledDeletePermissionTooltip = translate(
  'PERMISSION_MODULE.DISABLED_DELETE_PERMISSION_TOOLTIP'
);
export const managePermissionTooltip = translate('PERMISSION_MODULE.MANAGE_PERMISSION_TOOLTIP');
export const clonePermissionTooltip = translate('PERMISSION_MODULE.CLONE_PERMISSION_TOOLTIP');
export const noAccessToClonePermissionTooltip = translate(
  'PERMISSION_MODULE.NO_ACCESS_TO_CLONE_PERMISSION'
);
export const noAccessToDeletePermissionTooltip = translate(
  'PERMISSION_MODULE.NO_ACCESS_TO_DELETE_PERMISSION'
);
export const noAccessToManagePermissionTooltip = translate(
  'PERMISSION_MODULE.NO_ACCESS_TO_MANAGE_PERMISSION'
);

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
    name: translate('PERMISSIONS'),
  },
];

export const cloneIcon = <IoCopyOutline size="24" />;
export const manageIcon = <FiSliders style={{ transform: 'rotate(90deg)' }} size="24" />;
export const deleteIcon = <BsTrash size="24" />;

export const addPermissionBtnTestId = 'add-permission-btn';
export const spinnerSize = 'medium';
export const defaultModalType = 'alert';
export const defaultNotificationType = 'general';
export const addPermission = {
  variant: 'primary',
  size: 'medium',
};
export const defaultBtnSize = '24';
export const pageSizeValues = [10, 25, 50];
export const searchDebounceTime = 800;
export const backToTopId = 'permission-list-back-to-top';
export const errorNotificationTime = 3000;
export const asterisk = '*';

export const permissionListTableTestId = 'permission-list-table-test-id';
