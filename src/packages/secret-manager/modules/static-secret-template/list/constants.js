import React from 'react';
import { translate } from '../../../externalization';
import { FiSliders } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';

export const defaultBtnSize = '24';
export const searchDebounceTime = 800;

export const StaticSecretTemplateListTypes = {
  STATIC_SECRET_LISTING_REQUEST: 'STATIC_SECRET_LISTING_REQUEST',
  STATIC_SECRET_LISTING_LOADING: 'STATIC_SECRET_LISTING_LOADING',
  STATIC_SECRET_LISTING_SUCCESS: 'STATIC_SECRET_LISTING_SUCCESS',
  STATIC_SECRET_LISTING_FAILURE: 'STATIC_SECRET_LISTING_FAILURE',
  STATIC_SECRET_LISTING_LOAD_MORE_REQUEST: 'STATIC_SECRET_LISTING_LOAD_MORE_REQUEST',
  STATIC_SECRET_LISTING_LOAD_MORE_LOADING: 'STATIC_SECRET_LISTING_LOAD_MORE_LOADING',
  STATIC_SECRET_LISTING_LOAD_MORE_SUCCESS: 'STATIC_SECRET_LISTING_LOAD_MORE_SUCCESS',
  STATIC_SECRET_LISTING_LOAD_MORE_FAILURE: 'STATIC_SECRET_LISTING_LOAD_MORE_FAILURE',
  STATIC_SECRET_LISTING_SEARCH_TERM_UPDATE: 'STATIC_SECRET_LISTING_SEARCH_TERM_UPDATE',
};

export const StaticSecretTemplateDelete = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  STATIC_SECRET_DELETE_REQUEST: 'STATIC_SECRET_DELETE_REQUEST',
  STATIC_SECRET_DELETE_LOADING: 'STATIC_SECRET_DELETE_LOADING',
  STATIC_SECRET_DELETE_SUCCESS: 'STATIC_SECRET_DELETE_SUCCESS',
  STATIC_SECRET_DELETE_FAILURE: 'STATIC_SECRET_DELETE_FAILURE',
};

export const classes = {
  addSecretBtn: 'add-static-secret-button',
  staticSecretListContainer: 'static-secret-list-container',
  staticSecretTableListingContainer: 'static-secret-table-listing-container',
  staticSecretActionItems: 'static-secret-action-items',
  staticSecretActionEdit: 'static-secret-action-edit',
  staticSecretActionCopy: 'static-secret-action-copy',
  staticSecretActionDelete: 'static-secret-action-delete',
  disabledIcon: 'disabled-icon',
};

export const tableColumns = {
  staticSecretName: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_TEMPLATE_NAME'),
  description: translate('DESCRIPTION'),
  rotationInterval: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_ROTATION_INTERVAL'),
  action: translate('ACTION'),
};

export const translateStrings = {
  loadingMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRETS_LOADING'),
  deleteLoadingMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_LOADING_MESSAGE'),
  staticSecretSearchText: translate('STATIC_SECRETS_TEMPLATE_MODULE.SEARCH_SECRET'),
  addSecretTxt: translate('STATIC_SECRETS_TEMPLATE_MODULE.ADD_SECRET'),
  deleteSecretTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_SECRET'),
  deleteSecretMsg: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_MESSAGE'),
  deleteYesLabel: translate('YES_DELETE'),
  deleteNoLabel: translate('NO'),
  pageTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.STATIC_SECRETS_TEMPLATE'),
  naText: translate('NA'),
  deleteTooltip: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_TOOLTIP'),
  cloneTooltip: translate('STATIC_SECRETS_TEMPLATE_MODULE.CLONE_TOOLTIP'),
  manageTooltip: translate('STATIC_SECRETS_TEMPLATE_MODULE.MANAGE_TOOLTIP'),
  disabledDeleteTooltip: translate('STATIC_SECRETS_TEMPLATE_MODULE.DISABLED_DELETE_MESSAGE'),
  noAccessToManageSstTooltip: translate(
    'STATIC_SECRETS_TEMPLATE_MODULE.NO_ACCESS_TO_MANAGE_SST_TOOLTIP'
  ),
  noAccessToCloneSstTooltip: translate(
    'STATIC_SECRETS_TEMPLATE_MODULE.NO_ACCESS_TO_CLONE_SST_TOOLTIP'
  ),
  noAccessToDeleteSstTooltip: translate(
    'STATIC_SECRETS_TEMPLATE_MODULE.NO_ACCESS_TO_DELETE_SST_TOOLTIP'
  ),
};

export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('SECRETS_MANAGER'),
    route: '/admin/secret-manager',
  },
  {
    name: translate('STATIC_SECRETS_TEMPLATE_MODULE.STATIC_SECRETS_TEMPLATE'),
  },
];

export const cloneIcon = <IoCopyOutline size={defaultBtnSize} />;
export const manageIcon = (
  <FiSliders style={{ transform: 'rotate(90deg)' }} size={defaultBtnSize} />
);
export const deleteIcon = <BsTrash size={defaultBtnSize} />;

export const addSecretBtnTestId = 'add-secret-btn';
export const spinnerSize = 'medium';
export const defaultModalType = 'alert';
export const defaultNotificationType = 'general';
export const addSecret = {
  variant: 'primary',
  size: 'medium',
};
export const backToTopId = 'static-secret-template-list-back-to-top';
