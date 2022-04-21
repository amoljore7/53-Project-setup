import {
  createPolicyAction,
  deletePolicyAction,
  readPolicyAction,
  smConsumer,
  updatePolicyAction,
} from '../../../../../../../utils/common-constants';
import { translate } from '../../../../../externalization';

const enable = translate('ENABLE');
const disable = translate('DISABLE');
const enabledStatus = translate('ENABLED');
const disabledStatus = translate('DISABLED');

export const translatedStrings = {
  table: {
    nameHeader: translate('POLICIES_MODULE.POLICY_NAME'),
    descriptionHeader: translate('DESCRIPTION'),
    applicableToHeader: translate('APPLICABLE_TO'),
    statusHeader: translate('STATUS'),
    actionHeader: translate('ACTION'),
    enabledStatus,
    disabledStatus,
    searchPlaceHolder: translate('POLICIES_MODULE.SEARCH_PLACEHOLDER'),
    loadingMessage: translate('POLICIES_MODULE.LOADING_POLICIES'),
    draftStatus: translate('DRAFT'),
  },
  tooltip: {
    deletePolicy: translate('POLICIES_MODULE.DELETE_POLICY_TOOLTIP'),
    disabledDeletePolicy: translate('POLICIES_MODULE.DISABLED_DELETE_POLICY_TOOLTIP'),
    disabledDeleteTAPolicy: translate('POLICIES_MODULE.DISABLED_TA_DELETE_TOOLTIP'),
    managePolicy: translate('POLICIES_MODULE.MANAGE_POLICY_TOOLTIP'),
    disabledTooltip: translate('POLICIES_MODULE.DISABLE_TOOLTIP'),
    enabledTooltip: translate('POLICIES_MODULE.ENABLE_TOOLTIP'),
    disabledForUser: translate('POLICIES_MODULE.DISABLE_FOR_USER_TOOLTIP'),
    noAccessToDelete: translate('POLICIES_MODULE.NO_ACCESS_TO_DELETE_POLICY'),
    noAccessToEnablePolicy: translate('POLICIES_MODULE.NO_ACCESS_TO_ENABLE_POLICY'),
    noAccessToDisablePolicy: translate('POLICIES_MODULE.NO_ACCESS_TO_DISABLE_POLICY'),
    draftPolicy: translate('POLICIES_MODULE.DRAFT_ENABLE_TOOLTIP'),
    noAccessToManagePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_MANAGE_POLICY'),
  },
  delete: {
    title: translate('POLICIES_MODULE.DELETE_POLICY_CONFIRM_TITLE'),
    message: translate('POLICIES_MODULE.DELETE_POLICY_CONFIRM_MESSAGE'),
    primaryText: translate('YES_DELETE'),
    secondaryText: translate('NO'),
    successMessage: translate('POLICIES_MODULE.DELETE_POLICY_SUCCESS_MESSAGE'),
    getErrorMessage: (reason) => translate('POLICIES_MODULE.DELETE_POLICY_ERROR_MESSAGE', reason),
  },
  toggle: {
    getTitle: function (currentStatus) {
      const toggleType = currentStatus === enabledStatus ? disable : enable;
      return translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE', { toggleType });
    },
    getMessage: function (currentStatus) {
      const nextValue =
        currentStatus === enabledStatus
          ? disabledStatus.toLowerCase()
          : enabledStatus.toLowerCase();
      return translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_MESSAGE', { nextValue });
    },
    getPrimaryText: function (currentStatus) {
      const toggleLabel =
        currentStatus === enabledStatus ? translate('YES_DISABLE') : translate('YES_ENABLE');
      return toggleLabel;
    },
    secondaryText: translate('NO'),
    getErrorMessage: function (currentStatus, reason) {
      const nextValue =
        currentStatus === enabledStatus
          ? disabledStatus.toLowerCase()
          : enabledStatus.toLowerCase();
      return translate('POLICIES_MODULE.TOGGLE_POLICY_ERROR_MESSAGE', { nextValue, reason });
    },
    getSuccessMessage: function (currentStatus) {
      const nextValue =
        currentStatus === enabledStatus
          ? disabledStatus.toLowerCase()
          : enabledStatus.toLowerCase();
      return translate('POLICIES_MODULE.TOGGLE_POLICY_SUCCESS_MESSAGE', { nextValue });
    },
  },
  addPolicy: translate('POLICIES_MODULE.ADD_POLICY'),
  getMetadataErrorMessage: (reason) =>
    translate('POLICIES_MODULE.UNABLE_TO_FETCH_METADATA', { reason }),
};
export const PolicyListDataTypes = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  POLICY_LIST_DATA_REQUEST: 'SECRETS_POLICY_LIST_DATA_REQUEST',
  POLICY_LIST_DATA_LOADING: 'SECRETS_POLICY_LIST_DATA_LOADING',
  POLICY_LIST_DATA_SUCCESS: 'SECRETS_POLICY_LIST_DATA_SUCCESS',
  POLICY_LIST_DATA_FAILURE: 'SECRETS_POLICY_LIST_DATA_FAILURE',
  POLICY_DELETE_REQUEST_INIT: 'SECRETS_POLICY_DELETE_REQUEST_INIT',
  POLICY_DELETE_REQUEST_LOADING: 'SECRETS_POLICY_DELETE_REQUEST_LOADING',
  POLICY_DELETE_REQUEST_COMPLETE: 'SECRETS_POLICY_DELETE_REQUEST_COMPLETE',
  POLICY_TOGGLE_REQUEST_INIT: 'SECRETS_POLICY_TOGGLE_REQUEST_INIT',
  POLICY_TOGGLE_REQUEST_LOADING: 'SECRETS_POLICY_TOGGLE_REQUEST_LOADING',
  POLICY_TOGGLE_REQUEST_COMPLETE: 'SECRETS_POLICY_TOGGLE_REQUEST_COMPLETE',
  POLICY_TOGGLE_REQUEST_FAILURE: 'SECRETS_POLICY_TOGGLE_REQUEST_FAILURE',
  POLICY_LIST_SEARCH_TERM_UPDATE: 'SECRETS_POLICY_LIST_SEARCH_TERM_UPDATE',
  POLICY_LIST_LOAD_MORE_DATA_REQUEST: 'SECRETS_POLICY_LIST_LOAD_MORE_DATA_REQUEST',
  POLICY_LIST_LOAD_MORE_DATA_LOADING: 'SECRETS_POLICY_LIST_LOAD_MORE_DATA_LOADING',
  POLICY_LIST_LOAD_MORE_DATA_SUCCESS: 'SECRETS_POLICY_LIST_LOAD_MORE_DATA_SUCCESS',
  POLICY_LIST_LOAD_MORE_DATA_FAILURE: 'SECRETS_POLICY_LIST_LOAD_MORE_DATA_FAILURE',
};

export const getPolicyActions = (resource) => [
  {
    action: updatePolicyAction,
    resource,
    consumer: smConsumer,
  },
  {
    action: readPolicyAction,
    resource,
    consumer: smConsumer,
  },
  {
    action: deletePolicyAction,
    resource,
    consumer: smConsumer,
  },
  {
    action: createPolicyAction,
    resource,
    consumer: smConsumer,
  },
];

export const tenantAdminPolicyName = 'TenantAdminPolicy';
export const actionIconSize = '24';
export const mainRole = 'main';
export const searchDebounceTime = 300;
