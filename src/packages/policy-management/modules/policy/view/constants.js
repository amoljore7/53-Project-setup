import { translate } from '../../../externalization';
export const PolicyViewDataTypes = {
  POLICY_VIEW_DATA_REQUEST: 'POLICY_VIEW_DATA_REQUEST',
  POLICY_VIEW_DATA_LOADING: 'POLICY_VIEW_DATA_LOADING',
  POLICY_VIEW_DATA_SUCCESS: 'POLICY_VIEW_DATA_SUCCESS',
  POLICY_VIEW_DATA_FAILURE: 'POLICY_VIEW_DATA_FAILURE',
  POLICY_VIEW_DATA_RESET: 'POLICY_VIEW_DATA_RESET',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  POLICY_VIEW_TOGGLE_REQUEST_INIT: 'POLICY_VIEW_TOGGLE_REQUEST_INIT',
  POLICY_VIEW_TOGGLE_REQUEST_LOADING: 'POLICY_VIEW_TOGGLE_REQUEST_LOADING',
  POLICY_VIEW_TOGGLE_REQUEST_COMPLETE: 'POLICY_VIEW_TOGGLE_REQUEST_COMPLETE',
  POLICY_VIEW_TOGGLE_REQUEST_FAILURE: 'POLICY_VIEW_TOGGLE_REQUEST_FAILURE',
  POLICY_VIEW_DATA_JSON_REQUEST: 'POLICY_VIEW_DATA_JSON_REQUEST',
  POLICY_VIEW_DATA_JSON_LOADING: 'POLICY_VIEW_DATA_JSON_LOADING',
  POLICY_VIEW_DATA_JSON_SUCCESS: 'POLICY_VIEW_DATA_JSON_SUCCESS',
  POLICY_VIEW_DATA_JSON_FAILURE: 'POLICY_VIEW_DATA_JSON_FAILURE',
  POLICY_VIEW_DATA_JSON_RESET: 'POLICY_VIEW_DATA_JSON_RESET',
};
export const PolicyDeleteDataTypes = {
  POLICY_DELETE_DATA_REQUEST: 'POLICY_DELETE_DATA_REQUEST',
  POLICY_DELETE_DATA_LOADING: 'POLICY_DELETE_DATA_LOADING',
  POLICY_DELETE_DATA_SUCCESS: 'POLICY_DELETE_DATA_SUCCESS',
  POLICY_DELETE_DATA_FAILURE: 'POLICY_DELETE_DATA_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
};

export const approvalNotificationMediumDetailsType = {
  APPROVAL_NOTIFICATION_MEDIUM_DETAILS_REQUEST: 'APPROVAL_NOTIFICATION_MEDIUM_DETAILS_REQUEST',
  APPROVAL_NOTIFICATION_MEDIUM_DETAILS_LOADING: 'APPROVAL_NOTIFICATION_MEDIUM_DETAILS_LOADING',
  APPROVAL_NOTIFICATION_MEDIUM_DETAILS_SUCCESS: 'APPROVAL_NOTIFICATION_MEDIUM_DETAILS_SUCCESS',
  APPROVAL_NOTIFICATION_MEDIUM_DETAILS_FAILURE: 'APPROVAL_NOTIFICATION_MEDIUM_DETAILS_FAILURE',
  APPROVAL_NOTIFICATION_MEDIUM_DETAILS_RESET: 'APPROVAL_NOTIFICATION_MEDIUM_DETAILS_RESET',
};

export const classes = {
  buttonMainContainer: 'button-main-container',
  buttonChildContainer: 'child-button-main-container',
  viewPolicyMainContainer: 'view-policy-main-container',
  headerClass: 'header-class',
  marginTop32: 'margin-top-32',
  marginTop8: 'margin-top-8',
  marginTop10: 'margin-top-10',
  tagsContainer: 'tag-container',
  renderClass: 'policy-render-class',
  viewPolicyPermissionActionPillContainer: 'view-policy-permission-action-pill-container',
  addRoleTablePermissions: 'add-role-table-permissions',
  approvalLoaderContainer: 'approval-loader-container',
  viewPolicyOuterWrapper: 'view-policy-outer-wrapper',
  viewRolePolicyDetailsModalWrapper: 'view-role-permission-details-modal-wrapper',
  rolePermissionWrapper: 'role-permission-wrapper',
  addEntityInputSpacing: 'add-entity-input-spacing',
  addEntityModalLabel: 'add-entity-modal-label',
  addEntityModalValue: 'add-entity-modal-value',
  viewActionPill: 'view-action-pill',
  actionWrapperPill: 'action-wrapper-pill',
  roleLabelModalContainer: 'role-label-modal-container',
  roleValueModalContainer: 'role-value-modal-container',
};
export const translatedStrings = {
  allUsers: translate('POLICIES_MODULE.ALL_USERS'),
  allTags: translate('POLICIES_MODULE.ALL_TAGS'),
  allSeviceIdentities: translate('POLICIES_MODULE.ALL_SERVICE_IDENTITIES'),
  allTokens: translate('POLICIES_MODULE.ALL_TOKENS'),
  cloneText: translate('CLONE'),
  mainRoleText: translate('MAIN'),
  inlineText: translate('INLINE'),
  inactiveText: translate('INACTIVE_TEXT'),
  preDefinedText: translate('PRE_DEFINED'),
  policyJsonText: translate('POLICIES_MODULE.POLICY_JSON_FORMAT'),
  deleteText: translate('POLICIES_MODULE.DELETE_POLICY'),
  cloneMessage: translate('POLICIES_MODULE.POLICY_CLONE'),
  loadingMessage: translate('POLICIES_LOADING'),
  pageTitle: translate('POLICY'),
  roleTitle: translate('ROLE'),
  permissionTitle: translate('PERMISSION'),
  editText: translate('EDIT'),
  disableText: translate('DISABLE'),
  enableText: translate('ENABLE'),
  deleteLabel: translate('DELETE'),
  closeLabel: translate('CLOSE'),
  viewJson: translate('VIEW_JSON'),
  viewEntity: translate('VIEW_ENTITY'),
  permissionName: translate('PERMISSION_NAME'),
  sourceName: translate('ROLES_MODULE.SOURCE'),
  description: translate('DESCRIPTION'),
  consumer: translate('ROLES_MODULE.CONSUMER'),
  actions: translate('ROLES_MODULE.ACTIONS'),
  resources: translate('RESOURCES'),
  actionText: translate('ACTION'),
  permissionText: translate('PERMISSIONS'),
  rolesLabel: translate('ROLES'),
  deletePolicyConfirmMessage: translate('POLICIES_MODULE.DELETE_POLICY_CONFIRM_MESSAGE'),
  roleName: translate('ROLES_MODULE.ROLE_NAME'),
  copyText: translate('COPY'),
  yesDeleteText: translate('YES_DELETE'),
  noText: translate('NO'),
  yesText: translate('YES'),
  noneText: translate('NONE'),
  copyMessage: translate('COPY_NOTIFICATION_MESSAGE'),
  policyName: translate('POLICIES_MODULE.POLICY_NAME'),
  accessType: translate('POLICIES_MODULE.ACCESS_TYPE'),
  enableLoadingMessage: translate('POLICIES_MODULE.ENABLE_LOADING_MESSAGE'),
  disableLoadingMessage: translate('POLICIES_MODULE.DISABLE_LOADING_MESSAGE'),
  viewTooltip: translate('POLICIES_MODULE.VIEW_ROLE_POLICY_TOOLTIP'),
  viewPermissionTooltip: translate('PERMISSION_MODULE.VIEW_PERMISSION_TOOLTIP'),
  hours: (hours) => translate('HOURS', { hours }),
  minutes: (minutes) => translate('MINUTES', { minutes }),
  errorPolicyViewData: (reason) =>
    translate('POLICIES_MODULE.VIEW_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
};
export const policyConstantLabels = {
  defaultButtonSize: '24',
  viewPolicyButtonTestId: 'view-policy',
  permissionTableTestId: 'permission-table',
  roleTableTestId: 'role-table',
};

export const memberLabels = {
  user: translate('POLICIES_MODULE.USERS'),
  tags: translate('POLICIES_MODULE.TAGS'),
  identities: translate('POLICIES_MODULE.SERVICE_IDENTITIES'),
  tokens: translate('POLICIES_MODULE.API_TOKENS'),
};
export const conditionsLabels = {
  ip: translate('POLICIES_MODULE.IP_ADDRESS'),
  startTime: translate('POLICIES_MODULE.START_TIME_LABEL'),
  endTime: translate('POLICIES_MODULE.END_TIME_LABEL'),
  startDate: translate('POLICIES_MODULE.START_DATE_TIME_LABEL'),
  endDate: translate('POLICIES_MODULE.END_DATE_TIME_LABEL'),
};
export const approvalLabels = {
  approvalRequired: translate('POLICIES_MODULE.APPROVAL_REQUIRED'),
  notification: translate('POLICIES_MODULE.NOTIFICATION_MEDIUM'),
  type: translate('POLICIES_MODULE.APPROVER_TYPE'),
  approvers: translate('POLICIES_MODULE.APPROVERS'),
  time: translate('POLICIES_MODULE.MAXIMUM_TIME'),
  userListLabel: translate('POLICIES_MODULE.USER_LIST_LABEL'),
  tagListLabel: translate('POLICIES_MODULE.TAG_LIST_LABEL'),
  channelListLabel: translate('POLICIES_MODULE.CHANNEL_LIST_LABEL'),
  maxValidTimeLabel: translate('POLICIES_MODULE.ACCESS_VALIDITY_AFTER_APPROVAL_LABEL'),
};
export const viewPolicyHeaders = {
  general: translate('POLICIES_MODULE.GENERAL'),
  members: translate('POLICIES_MODULE.MEMBERS'),
  generic: translate('POLICIES_MODULE.GENERIC_CONDITIONS'),
  approvals: translate('POLICIES_MODULE.APPROVALS'),
};

export const dateFormat = 'DD/MM/YYYY h:mm A';
export const timeFormat = 'h:mm A';
export const inactiveStatus = 'inactive';
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
    name: 'Policy',
    route: '/admin/policy-management/policies',
  },
  {
    name: translate('VIEW'),
    route: '/admin/policy-management/policies/view',
  },
];
export const policyButton = {
  variant: 'primary',
  secVariant: 'secondary',
  size: 'medium',
};

export const getTogglePolicyConfirmTitle = (currentStatus) => {
  return currentStatus === enabledPolicy
    ? translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_DISABLE')
    : translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_ENABLE');
};
export const getTogglePolicyConfirmMessage = (currentStatus) => {
  return currentStatus === enabledPolicy
    ? translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_MESSAGE_DISABLE')
    : translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_MESSAGE_ENABLE');
};

export const getTogglePolicySuccessMessage = (currentStatus) => {
  return currentStatus === enabledPolicy
    ? translate('POLICIES_MODULE.TOGGLE_POLICY_SUCCESS_MESSAGE_DISABLE')
    : translate('POLICIES_MODULE.TOGGLE_POLICY_SUCCESS_MESSAGE_ENABLE');
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
export const tenantAdminPolicyName = 'TenantAdminPolicy';

export const roleFields = [
  { key: 'consumer', label: translate('CONSUMER') },
  { key: 'resources', label: translate('RESOURCES') },
  { key: 'actions', label: translate('ROLES_MODULE.ACTIONS') },
];

export const appsConsumer = 'apps';
