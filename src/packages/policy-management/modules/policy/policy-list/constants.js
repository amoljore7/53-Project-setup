import { translate } from '../../../externalization';

export const title = translate('POLICIES');
export const noLabel = translate('NO');
export const yesDeleteLabel = translate('YES_DELETE');
export const policySearchText = translate('POLICIES_MODULE.SEARCH_POLICY');
export const addPolicyButtonLabel = translate('POLICIES_MODULE.ADD_POLICY');
export const loadingMessage = translate('POLICIES_LOADING');
export const deletePolicyTitle = translate('POLICIES_MODULE.DELETE_POLICY_CONFIRM_TITLE');
export const deletePolicyMessage = translate('POLICIES_MODULE.DELETE_POLICY_CONFIRM_MESSAGE');
export const deletePolicySuccessMessage = translate(
  'POLICIES_MODULE.DELETE_POLICY_SUCCESS_MESSAGE'
);
export const getTogglePolicyConfirmTitle = (currentStatus) => {
  const toggleType = currentStatus === enabledPolicy ? translate('DISABLE') : translate('ENABLE');
  return translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE', { toggleType });
};
export const getTogglePolicyConfirmMessage = (currentStatus) => {
  const nextValue = currentStatus === enabledPolicy ? translate('DISABLED') : translate('ENABLED');
  return translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_MESSAGE', { nextValue });
};

export const getTogglePolicySuccessMessage = (currentStatus) => {
  const nextValue = currentStatus === enabledPolicy ? translate('DISABLED') : translate('ENABLED');
  return translate('POLICIES_MODULE.TOGGLE_POLICY_SUCCESS_MESSAGE', { nextValue });
};

export const getTogglePolicyErrorMessage = (currentStatus, reason) => {
  return currentStatus === enabledPolicy
    ? translate('POLICIES_MODULE.TOGGLE_POLICY_ERROR_MESSAGE_DISABLE')
    : translate('ERROR_MESSAGE', { reason });
};

export const getTogglePolicyLabel = (currentStatus) => {
  const toggleLabel =
    currentStatus === enabledPolicy ? translate('YES_DISABLE') : translate('YES_ENABLE');
  return toggleLabel;
};

export const enabledPolicy = translate('ENABLED');
export const disabledPolicy = translate('DISABLED');
export const draftPolicy = translate('DRAFT');
export const defaultBtnSize = '24';
export const mainRole = 'main';
export const searchDebounceTime = 300;
export const deletePolicyTooltip = translate('POLICIES_MODULE.DELETE_POLICY_TOOLTIP');
export const disableDeletePolicyTooltip = translate(
  'POLICIES_MODULE.DISABLED_DELETE_POLICY_TOOLTIP'
);
export const clonePolicyTooltip = translate('POLICIES_MODULE.CLONE_POLICY_TOOLTIP');
export const managePolicyTooltip = translate('POLICIES_MODULE.MANAGE_POLICY_TOOLTIP');
export const disableTooltip = translate('POLICIES_MODULE.DISABLE_TOOLTIP');
export const disabledForUserTooltip = translate('POLICIES_MODULE.DISABLE_FOR_USER_TOOLTIP');
export const enableTooltip = translate('POLICIES_MODULE.ENABLE_TOOLTIP');
export const draftEnableTooltip = translate('POLICIES_MODULE.DRAFT_ENABLE_TOOLTIP');
export const disabledDeleteTAPolicy = translate('POLICIES_MODULE.DISABLED_TA_DELETE_TOOLTIP');

export const tableColumns = {
  policyName: translate('POLICIES_MODULE.POLICY_NAME'),
  description: translate('DESCRIPTION'),
  accessType: translate('POLICIES_MODULE.ACCESS_TYPE'),
  status: translate('STATUS'),
  action: translate('ACTION'),
};

export const translatedStrings = {
  noAccessToManagePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_MANAGE_POLICY'),
  noAccessToClonePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_CLONE_POLICY'),
  noAccessToDeletePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_DELETE_POLICY'),
  noAccessToEnablePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_ENABLE_POLICY'),
  noAccessToDisablePolicyTooltip: translate('POLICIES_MODULE.NO_ACCESS_TO_DISABLE_POLICY'),
};

export const PolicyListDataTypes = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  POLICY_LIST_DATA_REQUEST: 'POLICY_LIST_DATA_REQUEST',
  POLICY_LIST_DATA_LOADING: 'POLICY_LIST_DATA_LOADING',
  POLICY_LIST_DATA_SUCCESS: 'POLICY_LIST_DATA_SUCCESS',
  POLICY_LIST_DATA_FAILURE: 'POLICY_LIST_DATA_FAILURE',
  POLICY_DELETE_REQUEST_INIT: 'POLICY_DELETE_REQUEST_INIT',
  POLICY_DELETE_REQUEST_LOADING: 'POLICY_DELETE_REQUEST_LOADING',
  POLICY_DELETE_REQUEST_COMPLETE: 'POLICY_DELETE_REQUEST_COMPLETE',
  POLICY_TOGGLE_REQUEST_INIT: 'POLICY_TOGGLE_REQUEST_INIT',
  POLICY_TOGGLE_REQUEST_LOADING: 'POLICY_TOGGLE_REQUEST_LOADING',
  POLICY_TOGGLE_REQUEST_COMPLETE: 'POLICY_TOGGLE_REQUEST_COMPLETE',
  POLICY_TOGGLE_REQUEST_FAILURE: 'POLICY_TOGGLE_REQUEST_FAILURE',
  POLICY_LIST_SEARCH_TERM_UPDATE: 'POLICY_LIST_SEARCH_TERM_UPDATE',
  POLICY_LIST_LOAD_MORE_DATA_REQUEST: 'POLICY_LIST_LOAD_MORE_DATA_REQUEST',
  POLICY_LIST_LOAD_MORE_DATA_LOADING: 'POLICY_LIST_LOAD_MORE_DATA_LOADING',
  POLICY_LIST_LOAD_MORE_DATA_SUCCESS: 'POLICY_LIST_LOAD_MORE_DATA_SUCCESS',
  POLICY_LIST_LOAD_MORE_DATA_FAILURE: 'POLICY_LIST_LOAD_MORE_DATA_FAILURE',
};

export const classes = {
  addPolicyBtnContainer: 'add-policy-btn-container',
  policiesTableContainer: 'policies-table-container',
  policyListContainer: 'policy-list-container',
  policyActionItems: 'policy-action-items',
  policyActionEdit: 'policy-action-edit',
  policyActionCopy: 'policy-action-copy',
  policyActionDelete: 'policy-action-delete',
  policyActionToggle: 'policy-action-toggle',
  policyActionDeleteDisabled: 'policy-action-delete-disabled',
  policyActionToggleDisabled: 'disabled-toggle-icon',
  disabledIcon: 'disabled-policy-icons',
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
    name: translate('POLICIES'),
    route: '/admin/policy-management/policies',
  },
];
export const addPolicyBtnTestId = 'add-policy';
export const addPolicybtn = {
  variant: 'primary',
  size: 'medium',
};
export const policyTableTestId = 'policy-table';
export const tenantAdminPolicyName = 'TenantAdminPolicy';
export const backToTopId = 'policy-list-back-to-top';
export const errorNotificationTime = 3000;

export const getDeleteTooltipTitle = (row, policiesEvalData) => {
  if (row?.isReadOnly) {
    return row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase()
      ? disabledDeleteTAPolicy
      : disableDeletePolicyTooltip;
  } else {
    return policiesEvalData?.delete && !row?.accessLevel
      ? deletePolicyTooltip
      : translatedStrings.noAccessToDeletePolicyTooltip;
  }
};
export const getEnableTooltipTitle = (row, policiesEvalData) => {
  if (row?.name.toLowerCase() === tenantAdminPolicyName.toLowerCase()) {
    return disabledForUserTooltip;
  } else {
    return policiesEvalData?.edit && !row?.accessLevel
      ? disableTooltip
      : translatedStrings.noAccessToDisablePolicyTooltip;
  }
};

export const getDisableTooltipTitle = (row, policiesEvalData) => {
  if (policiesEvalData?.edit && !row?.accessLevel) {
    return row?.isDraft ? draftEnableTooltip : enableTooltip;
  } else {
    return translatedStrings.noAccessToEnablePolicyTooltip;
  }
};
export const getManageTooltipTitle = (policiesEvalData) => {
  if (!policiesEvalData?.view || !policiesEvalData?.members) {
    return translatedStrings.noAccessToManagePolicyTooltip;
  } else {
    return managePolicyTooltip;
  }
};
