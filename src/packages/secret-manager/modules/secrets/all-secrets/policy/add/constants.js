import { translate } from '../../../../../externalization';

export const AddPolicyType = {
  POLICY_CREATE_REQUEST: 'POLICY_CREATE_REQUEST',
  POLICY_CREATE_LOADING: 'POLICY_CREATE_LOADING',
  POLICY_CREATE_SUCCESS: 'POLICY_CREATE_SUCCESS',
  POLICY_CREATE_FAILURE: 'POLICY_CREATE_FAILURE',
};

export const NotificationType = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
};

export const SecretDetailsTypes = {
  SECRET_DETAILS_REQUEST: 'POLICY_ADD_SECRET_DETAILS_REQUEST',
  SECRET_DETAILS_LOADING: 'POLICY_ADD_SECRET_DETAILS_LOADING',
  SECRET_DETAILS_SUCCESS: 'POLICY_ADD_SECRET_DETAILS_SUCCESS',
  SECRET_DETAILS_FAILURE: 'POLICY_ADD_SECRET_DETAILS_FAILURE',
  SECRET_DETAILS_RESET: 'POLICY_ADD_SECRET_DETAILS_RESET',
};
export const approvalNotificationMediumListType = {
  APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET',
};

export const recursiveApprovalChannelListType = {
  RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST: 'RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST',
  RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING: 'RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING',
  RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS: 'RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS',
  RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE: 'RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE',
  RECURSIVE_APPROVAL_CHANNEL_LIST_RESET: 'RECURSIVE_APPROVAL_CHANNEL_LIST_RESET',
  RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE:
    'RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE',
};
export const dateFormat = 'yyyy-MM-dd h:mm aa';
export const timeFormat = 'h:mm aa';
export const dateFormatFinal = 'yyyy-MM-DD h:mm aa';
export const policyNameTest = 'Policy Name';
export const permissionNameTest = 'Permission Name';
export const nameContextField = 'name';
export const allContextField = 'all';
export const active = 'active';
export const ipNewRegex =
  /^(((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(((\/([1-9]|[12][0-9]|3[0-2]))?)|\s?-\s?((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))))(,\s?|$))+/g;
export const translatedStrings = {
  copyBtn: translate('COPY'),
  fetchVaultDetails: translate('VAULT_DETAILS_FETCHING_MESSAGE'),
  addingPolicy: translate('POLICIES_MODULE.ADDING_POLICY'),
  membersDialogTitle: translate('POLICIES_MODULE.MEMBERS_DIALOG_TITLE'),
  membersDialogMessage: translate('POLICIES_MODULE.MEMBERS_DIALOG_MESSAGE'),
  membersDialogPrimaryBtnText: translate('POLICIES_MODULE.MEMBERS_DIALOG_PRIMARY_BUTTON'),
  membersDialogSecondaryBtnText: translate('POLICIES_MODULE.MEMBERS_DIALOG_SECONDARY_BUTTON'),
  readOnlyPolicyJSONMessage: translate('POLICIES_MODULE.READONLY_POLICY_JSON_MESSAGE'),
  membersValidation: translate('POLICIES_MODULE.MEMBER_VALIDATION'),
  policyFormat: translate('POLICIES_MODULE.POLICY_IN_JSON_FORMAT'),
  policySuccessCopy: translate('POLICIES_MODULE.POLICY_JSON_COPIED'),
  policyFailedCopy: translate('POLICIES_MODULE.POLICY_JSON_EMPTY'),
  policyCreatedSuccessMessage: translate('POLICIES_MODULE.ADD_POLICY_SUCCESS'),
  switchMode: (isJson) =>
    isJson ? translate('ROLES_MODULE.SWITCH_TO_FORM') : translate('ROLES_MODULE.SWITCH_TO_JSON'),

  inlineType: translate('INLINE'),
  invalidJson: translate('INVALID_JSON'),
  maxTimeAfterApprovalValidation: translate(
    'POLICIES_MODULE.MAX_VALID_TIME_AFTER_APPROVAL_REQUIRED'
  ),
  maxTimeAfterApprovaltValidation: translate(
    'POLICIES_MODULE.MAX_VALID_TIME_AFTER_APPROVAL_FORMAT'
  ),
  pageTitle: translate('POLICIES_MODULE.ADD_POLICY'),
  editPageTitle: translate('POLICIES_MODULE.EDIT_POLICY'),
  accessType: translate('POLICIES_MODULE.ACCESS_TYPE'),
  descriptionLabel: translate('DESCRIPTION'),
  descriptionHelperLabel: translate('OPTIONAL'),
  addNewPermissionBtn: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),

  resourceLabel: translate('RESOURCES'),
  resourceHelperLabel: translate('ROLES_MODULE.RESOURCES_HELPER_LABEL'),
  actionColumn: translate('ROLES_MODULE.ACTION_COLUMN'),
  saveBtn: translate('SAVE'),
  resetBtn: translate('RESET'),
  cancelBtn: translate('CANCEL'),
  addBtn: translate('ADD'),
  cancelModalTitle: translate('DISCARD_CHANGES'),
  cancelModalPrimaryBtn: translate('ROLES_MODULE.CANCEL_MODAL_PRIMARY_BTN'),
  cancelAddPolicyMessage: translate('POLICIES_MODULE.CANCEL_ADD_POLICY'),
  noBtn: translate('NO'),
  resetModalTitle: translate('ROLES_MODULE.RESET_MODAL_TITLE'),
  resetModalMessage: translate('ROLES_MODULE.RESET_MODAL_MESSAGE'),
  resetModalPrimaryBtn: translate('ROLES_MODULE.RESET_MODAL_PRIMARY_BTN'),
  resetModalSecondaryBtn: translate('ROLES_MODULE.RESET_MODAL_SECONDARY_BTN'),
  resetNotification: translate('ROLES_MODULE.RESET_NOTIFICATION'),
  saveModalTitle: translate('ROLES_MODULE.SAVE_MODAL_TITLE'),
  saveModalMessage: translate('ROLES_MODULE.SAVE_INLINE_PERMISSION'),
  saveModalPrimaryBtn: translate('ROLES_MODULE.SAVE_MODAL_PRIMARY_BTN'),
  deleteModalTitle: translate('ROLES_MODULE.DELETE_ROLE_CONFIRM_TITLE'),
  deleteModalInlineMessage: translate('ROLES_MODULE.DELETE_MODAL_INLINE_MESSAGE'),
  deleteModalPermissionMessage: translate('ROLES_MODULE.DELETE_MODAL_PERMISSION_MESSAGE'),
  deletePermissionModalTitle: translate('ROLES_MODULE.DELETE_MODAL_TITLE'),
  deleteModalRoleMessage: translate('POLICIES_MODULE.ROLE_DELETE_MODAL_MESSAGE'),
  deleteModalPrimaryBtn: translate('ROLES_MODULE.DELETE_MODAL_PRIMARY_BTN'),
  policyNameValidation: translate('POLICIES_MODULE.POLICY_NAME_REQUIRED'),
  policyUniqueNameValidation: translate('POLICIES_MODULE.POLICY_NAME_UNIQUE'),
  descriptionMaxCharValidation: translate('POLICIES_MODULE.DESCRIPTION_LENGTH_MAX'),
  usersValidation: translate('POLICIES_MODULE.USERS_MIN'),
  groupsValidation: translate('POLICIES_MODULE.GROUPS_MIN'),
  tokenValidation: translate('POLICIES_MODULE.TOKENS_MIN'),
  siValidation: translate('POLICIES_MODULE.SERVICE_IDENTITIES_MIN'),
  ipAddressInvalidMsg: translate('POLICIES_MODULE.IP_ADDRESS_INVALID'),
  ipAddrValidation: translate('POLICIES_MODULE.IP_ADDRESS_REQUIRED'),
  endDateTimeValidationMsg: translate('POLICIES_MODULE.END_DATE_TIME_VALIDATION'),
  endTimeValidationMsg: translate('POLICIES_MODULE.END_TIME_VALIDATION'),
  startDateTimeValidation: translate('POLICIES_MODULE.START_DATE_TIME_REQUIRED'),
  endDateTimeValidation: translate('POLICIES_MODULE.END_DATE_TIME_REQUIRED'),
  startTimeValidation: translate('POLICIES_MODULE.START_TIME_REQUIRED'),
  startDateTimeMessage: translate('POLICIES_MODULE.START_DATE_TIME_MESSAGE'),
  endTimeValidation: translate('POLICIES_MODULE.END_TIME_REQUIRED'),
  notificationMediumValidation: translate('POLICIES_MODULE.NOTIFICATION_MEDIUM_MIN'),
  approverTypeValidation: translate('POLICIES_MODULE.APPROVER_TYPE_ONE_OF'),
  maxApprovalTimeValidation: translate('POLICIES_MODULE.MAX_APPROVAL_REQUIRED'),
  maxApprovalFormatValidation: translate('POLICIES_MODULE.MAX_APPROVAL_FORMAT'),
  approversValidation: translate('POLICIES_MODULE.APPROVERS_MIN'),
  policyJSONValidation: translate('POLICIES_MODULE.POLICY_JSON_NOT_EMPTY'),
  errorBarTitle: translate('ROLES_MODULE.SUBMIT_FORM_ERROR_TITLE'),
  switchModeChangeDialogMessage: (isJSON) =>
    isJSON
      ? translate('ROLES_MODULE.SWITCH_TO_FORM_MESSAGE')
      : translate('ROLES_MODULE.SWITCH_TO_JSON_MESSAGE'),
  switchModeChangeDialogButton: (isJSON) =>
    isJSON
      ? translate('ROLES_MODULE.SWITCH_TO_FORM_BTN')
      : translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
  saveAndEnable: translate('POLICIES_MODULE.SAVE_AND_ENABLE'),
  saveDraft: translate('POLICIES_MODULE.SAVE_DRAFT'),
  resourcesValidation: translate('ROLES_MODULE.RESOURCE_VALIDATION'),
  actionsValidation: translate('ROLES_MODULE.ACTION_VALIDATION'),
  warningGetChannelList: (reason) =>
    translate('POLICIES_MODULE.WARNING_GET_CHANNEL_LIST', { reason }),
  getMetadataErrorMessage: (reason) =>
    translate('POLICIES_MODULE.UNABLE_TO_FETCH_METADATA', { reason }),
  loadingMetadata: translate('POLICIES_MODULE.LOADING_METADATA'),
  noAccessToAddPolicy: translate('POLICIES_MODULE.NO_ACCESS_TO_ADD_POLICY'),
  endDateShouldGreaterThanTodayValidationMsg: translate(
    'POLICIES_MODULE.END_DATE_TIME_GREATER_THEN_TODAY_VALIDATION'
  ),
  startTimeBeforeEndTimeValidation: translate('POLICIES_MODULE.START_TIME_VALIDATION'),
  inputNameMaxCharsValidation: translate('INPUT_NAME_MAX_CHAR'),
  accessLevel: translate('POLICIES_MODULE.ACCESS_LEVEL'),
  policyNameCharacterValidation: translate('POLICIES_MODULE.NAME_CHAR_VALIDATION'),
  hours: (hours) => translate('HOURS', { hours }),
  minutes: (minutes) => translate('MINUTES', { minutes }),
  loadingMembers: translate('POLICIES_MODULE.LOADING_MEMBERS'),
  policyNameLabel: translate('POLICIES_MODULE.POLICY_NAME'),
  conditionsIpAddr: translate('POLICIES_MODULE.IP_ADDRESS_RADIO_LABEL'),
  conditionsDateTime: translate('POLICIES_MODULE.DATE_TIME_RADIO_LABEL'),
  ipLabel: translate('POLICIES_MODULE.IP_ADDRESS_LABEL'),
  ipLabelHelperText: translate('POLICIES_MODULE.IP_ADDRESS_HELPER_TEXT'),
  ipSubLabel: translate('POLICIES_MODULE.IP_ADDRESS_SUB_LABEL'),
  approvalLabel: translate('POLICIES_MODULE.APPROVAL_LABEL'),
  approvalType: translate('POLICIES_MODULE.APPROVER_TYPE_LABEL'),
  notification: translate('POLICIES_MODULE.NOTIFICATION_MEDIUM_LABEL'),
  approvers: translate('POLICIES_MODULE.APPROVERS_LABEL'),
  approversSubText: translate('POLICIES_MODULE.APPROVERS_SUB_LABEL'),
  approverPlaceHolder: translate('POLICIES_MODULE.APPROVERS_PLACEHOLDER'),
  notificationPlaceHolder: translate('POLICIES_MODULE.NOTIFICATION_MEDIUM_PLACEHOLDER'),
  approverTime: translate('POLICIES_MODULE.APPROVER_TIME_LABEL'),
  hhmm: translate('POLICIES_MODULE.HOURS_MINS'),
  resource: translate('POLICIES_MODULE.RESOURCE_LABEL'),
  allow: translate('POLICIES_MODULE.ALLOW'),
  deny: translate('POLICIES_MODULE.DENY'),
  startDate: translate('POLICIES_MODULE.START_DATE_TIME_LABEL'),
  endDate: translate('POLICIES_MODULE.END_DATE_TIME_LABEL'),
  startTime: translate('POLICIES_MODULE.START_TIME_LABEL'),
  endTime: translate('POLICIES_MODULE.END_TIME_LABEL'),
  description: translate('DESCRIPTION'),
  generalTabTitle: translate('POLICIES_MODULE.GENERAL'),
  membersTabTitle: translate('POLICIES_MODULE.MEMBERS'),
  permissionsTabTitle: translate('ROLES_MODULE.PERMISSION_LABEL'),
  genericConditionsTabTitle: translate('POLICIES_MODULE.GENERIC_CONDITIONS'),
  approvalsTabTitle: translate('POLICIES_MODULE.APPROVALS'),
  yesLabel: translate('YES'),
  noLabel: translate('NO'),
  channelListLabel: translate('POLICIES_MODULE.CHANNEL_LIST_LABEL'),
  channelListPlaceholder: translate('POLICIES_MODULE.CHANNEL_LIST_PLACEHOLDER'),
  tagListLabel: translate('POLICIES_MODULE.TAG_LIST_LABEL'),
  tagListPlaceholder: translate('POLICIES_MODULE.TAG_LIST_PLACEHOLDER'),
  userListLabel: translate('POLICIES_MODULE.USER_LIST_LABEL'),
  userListPlaceholder: translate('POLICIES_MODULE.USER_LIST_PLACEHOLDER'),
  accessValidityAfterApprovalLabel: translate(
    'POLICIES_MODULE.ACCESS_VALIDITY_AFTER_APPROVAL_LABEL'
  ),
  includeHierarchyBelowPath: translate('POLICIES_MODULE.INCLUDE_HIERARCHY_BELOW_PATH'),
  invalidResourceValidation: translate('POLICIES_MODULE.PROVIDE_VALID_RESOURCE_VALIDATION'),
  provideValidResourceValidation: translate('POLICIES_MODULE.PROVIDE_RESOURCE_VALIDATION'),
  removeApprovalsTitle: translate('POLICIES_MODULE.REMOVE_APPROVALS_TITLE'),
  removeApprovalsMessage: translate('POLICIES_MODULE.REMOVE_APPROVALS_MESSAGE'),
  yesRemoveApprovals: translate('POLICIES_MODULE.YES_REMOVE_APPROVALS'),
  userLabel: translate('POLICIES_MODULE.USERS_LABEL'),
  groupLabel: translate('POLICIES_MODULE.GROUPS_LABEL'),
  serviceIdentityLabel: translate('POLICIES_MODULE.SERVICE_IDENTITIES_LABEL'),
  tokenLabel: translate('POLICIES_MODULE.TOKEN_LABEL'),
};
export const viewRoleLayout = [
  {
    key: 'name',
    label: translate('ROLES_MODULE.PERMISSION_NAME_LABEL'),
  },
  {
    key: 'source',
    label: translate('ROLES_MODULE.SOURCE'),
  },
  {
    key: 'description',
    label: translate('DESCRIPTION'),
  },
  {
    key: 'consumer',
    label: translate('ROLES_MODULE.CONSUMER'),
  },
  {
    key: 'resources',
    label: translate('RESOURCES'),
  },
  {
    key: 'actions',
    label: translate('ROLES_MODULE.ACTION'),
  },
];

export const getPolicyActions = (resource) => [
  {
    action: 'authz.policy.update',
    resource,
    consumer: 'secretmanager',
  },
  {
    action: 'authz.policy.read',
    resource,
    consumer: 'secretmanager',
  },
  {
    action: 'authz.policy.delete',
    resource,
    consumer: 'secretmanager',
  },
  {
    action: 'authz.policy.create',
    resource,
    consumer: 'secretmanager',
  },
];

export const classes = {
  addPolicyButtonContainer: 'add-policy-button-container',
  addPolicyButtonsContainerLeft: 'add-policy-buttons-container-left',
  addPolicyButtonContainerLeft: 'add-policy-button-container-left',
  addPolicySnackbar: 'add-policy-snackbar',
};

export const placeHolderCondition =
  "(request.location equals 'en' && request.ipaddress IN (1.2.3.4,5.6.7.8))";

export const errorNotificationTime = 3000;
export const smConsumer = 'secretmanager';
export const IS_SLACK = 'slack';
export const rootNodePath = '/*';
export const pathSeparator = '/';
export const SECRET = 'secret';
