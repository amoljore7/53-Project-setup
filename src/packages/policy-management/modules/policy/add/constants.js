import { translate } from '../../../externalization';

export const permissionsListType = {
  RECURSIVE_PERMISSIONS_LIST_REQUEST: 'RECURSIVE_PERMISSIONS_LIST_REQUEST',
  RECURSIVE_PERMISSIONS_LIST_LOADING: 'RECURSIVE_PERMISSIONS_LIST_LOADING',
  RECURSIVE_PERMISSIONS_LIST_SUCCESS: 'RECURSIVE_PERMISSIONS_LIST_SUCCESS',
  RECURSIVE_PERMISSIONS_LIST_FAILURE: 'RECURSIVE_PERMISSIONS_LIST_FAILURE',
  RECURSIVE_PERMISSIONS_LIST_RESET: 'RECURSIVE_PERMISSIONS_LIST_RESET',
  RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE: 'RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE',
};

export const permissionDetailsType = {
  PERMISSION_DETAILS_REQUEST: 'PERMISSION_DETAILS_REQUEST',
  PERMISSION_DETAILS_LOADING: 'PERMISSION_DETAILS_LOADING',
  PERMISSION_DETAILS_SUCCESS: 'PERMISSION_DETAILS_SUCCESS',
  PERMISSION_DETAILS_FAILURE: 'PERMISSION_DETAILS_FAILURE',
};

export const consumerListType = {
  CONSUMER_LIST_REQUEST: 'CONSUMER_LIST_REQUEST',
  CONSUMER_LIST_LOADING: 'CONSUMER_LIST_LOADING',
  CONSUMER_LIST_SUCCESS: 'CONSUMER_LIST_SUCCESS',
  CONSUMER_LIST_FAILURE: 'CONSUMER_LIST_FAILURE',
};

export const approvalNotificationMediumListType = {
  APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE',
  APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET: 'APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET',
};

export const approvalChannelListType = {
  RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST: 'RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST',
  RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING: 'RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING',
  RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS: 'RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS',
  RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE: 'RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE',
  RECURSIVE_APPROVAL_CHANNEL_LIST_RESET: 'RECURSIVE_APPROVAL_CHANNEL_LIST_RESET',
  RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE:
    'RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE',
};

export const rolesListType = {
  RECURSIVE_ROLES_LIST_REQUEST: 'RECURSIVE_ROLES_LIST_REQUEST',
  RECURSIVE_ROLES_LIST_LOADING: 'RECURSIVE_ROLES_LIST_LOADING',
  RECURSIVE_ROLES_LIST_SUCCESS: 'RECURSIVE_ROLES_LIST_SUCCESS',
  RECURSIVE_ROLES_LIST_FAILURE: 'RECURSIVE_ROLES_LIST_FAILURE',
  RECURSIVE_ROLES_LIST_RESET: 'RECURSIVE_ROLES_LIST_RESET',
  RECURSIVE_ROLES_LIST_LOADING_DISABLE: 'RECURSIVE_ROLES_LIST_LOADING_DISABLE',
};

export const roleDetailsType = {
  ROLE_DETAILS_REQUEST: 'ROLE_DETAILS_REQUEST',
  ROLE_DETAILS_LOADING: 'ROLE_DETAILS_LOADING',
  ROLE_DETAILS_SUCCESS: 'ROLE_DETAILS_SUCCESS',
  ROLE_DETAILS_FAILURE: 'ROLE_DETAILS_FAILURE',
  ROLE_DETAILS_COMPLETED: 'ROLE_DETAILS_COMPLETED',
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
  addingPolicy: translate('POLICIES_MODULE.ADDING_POLICY'),
  membersDialogTitle: translate('POLICIES_MODULE.MEMBERS_DIALOG_TITLE'),
  membersDialogMessage: translate('POLICIES_MODULE.MEMBERS_DIALOG_MESSAGE'),
  membersDialogPrimaryBtnText: translate('POLICIES_MODULE.MEMBERS_DIALOG_PRIMARY_BUTTON'),
  membersDialogSecondaryBtnText: translate('POLICIES_MODULE.MEMBERS_DIALOG_SECONDARY_BUTTON'),
  readOnlyPolicyJSONMessage: translate('POLICIES_MODULE.READONLY_POLICY_JSON_MESSAGE'),
  membersValidation: translate('POLICIES_MODULE.MEMBER_VALIDATION'),
  consumerPlaceholder: translate('ROLES_MODULE.CONSUMER_PLACEHOLDER'),
  policyFormat: translate('POLICIES_MODULE.POLICY_IN_JSON_FORMAT'),
  policySuccessCopy: translate('POLICIES_MODULE.POLICY_JSON_COPIED'),
  policyFailedCopy: translate('POLICIES_MODULE.POLICY_JSON_EMPTY'),
  policyCreatedSuccessMessage: translate('POLICIES_MODULE.ADD_POLICY_SUCCESS'),
  switchMode: (isJson) =>
    isJson ? translate('SWITCH_TO_FORM_BUTTON') : translate('SWITCH_TO_JSON_BUTTON'),
  inlineType: translate('INLINE'),
  invalidJson: translate('INVALID_JSON'),
  permissionAddDuplicate: translate('POLICIES_MODULE.ADD_PERMISSION_DUPLICATE'),
  permissionAddSuccess: translate('POLICIES_MODULE.ADD_PERMISSION_SUCCESS'),
  inlinePermissionAddSuccess: translate('POLICIES_MODULE.INLINE_POLICY_SUCCESS_MESSAGE'),
  inlinePermissionUniqueName: translate('POLICIES_MODULE.INLINE_POLICY_UNIQUE_NAME_MESSAGE'),
  pageTitle: translate('POLICIES_MODULE.ADD_POLICY'),
  editPageTitle: translate('POLICIES_MODULE.EDIT_POLICY'),
  accessType: translate('POLICIES_MODULE.ACCESS_TYPE'),
  predefinedType: translate('PRE_DEFINED'),
  roleLabel: translate('ROLES_MODULE.ROLE_NAME'),
  descriptionLabel: translate('DESCRIPTION'),
  descriptionHelperLabel: translate('OPTIONAL'),
  permissionLabel: translate('PERMISSIONS'),
  rolesLabel: translate('ROLES'),
  addExistingPermissionBtn: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
  addRole: translate('ROLES_MODULE.ADD_ROLE'),
  addNewPermissionBtn: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
  permissionNameLabel: translate('ROLES_MODULE.PERMISSION_NAME_LABEL'),
  permissionNameValidation: translate('ROLES_MODULE.PERMISSION_NAME_VALIDATION'),
  roleNameLabel: translate('ROLES_MODULE.ROLE_NAME'),
  roleNameRequiredValidation: translate('ROLES_MODULE.ROLE_NAME_VALIDATION'),
  roleDescriptionLabel: translate('DESCRIPTION'),
  permissionsLabel: translate('PERMISSIONS'),
  roleActionsLabel: translate('ROLES_MODULE.ACTION_COLUMN'),
  sourceLabel: translate('ROLES_MODULE.SOURCE'),
  consumerLabel: translate('ROLES_MODULE.CONSUMER'),
  actionLabel: translate('ROLES_MODULE.ACTION_LABEL'),
  resourceLabel: translate('RESOURCES'),
  resourceHelperLabel: translate('RESOURCES_HELPER_TEXT'),
  actionColumn: translate('ROLES_MODULE.ACTION_COLUMN'),
  addNewPermissionTitle: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
  editPermissionTitle: translate('ROLES_MODULE.EDIT_PERMISSION_TITLE'),
  saveBtn: translate('SAVE'),
  resetBtn: translate('RESET'),
  cancelBtn: translate('CANCEL'),
  addBtn: translate('ADD'),
  addExistingPermissionTitle: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
  searchPermissionLabel: translate('ROLES_MODULE.SEARCH_PERMISSION_LABEL'),
  permissionTitle: translate('PERMISSION'),
  deleteInlineNotification: translate('ROLES_MODULE.DELETE_INLINE_NOTIFICATION'),
  deletePermissionNotification: translate('ROLES_MODULE.DELETE_PERMISSION_NOTIFICATION'),
  addInlineNotification: translate('ROLES_MODULE.ADD_INLINE_NOTIFICATION'),
  addPermissionNotification: translate('ROLES_MODULE.ADD_PERMISSION_NOTIFICATION'),
  saveInlineNotification: translate('ROLES_MODULE.SAVE_INLINE_PERMISSION'),
  cancelModalTitle: translate('DISCARD'),
  permissionCancelModalMessage: translate('ROLES_MODULE.CANCEL_MODAL_MESSAGE', {
    entity: 'permission',
  }),
  roleCancelModalMessage: translate('ROLES_MODULE.CANCEL_MODAL_MESSAGE', { entity: 'role' }),
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
  policyNameCharacterValidation: translate('POLICIES_MODULE.NAME_CHAR_VALIDATION'),
  policyNameValidation: translate('POLICIES_MODULE.POLICY_NAME_REQUIRED'),
  policyUniqueNameValidation: translate('POLICIES_MODULE.POLICY_NAME_UNIQUE'),
  permissionUniqueNameValidation: translate('POLICIES_MODULE.PERMISSION_NAME_UNIQUE'),
  descriptionMaxCharValidation: translate('POLICIES_MODULE.DESCRIPTION_LENGTH_MAX'),
  usersValidation: translate('POLICIES_MODULE.USERS_MIN'),
  groupsValidation: translate('POLICIES_MODULE.GROUPS_MIN'),
  tokenValidation: translate('POLICIES_MODULE.TOKENS_MIN'),
  siValidation: translate('POLICIES_MODULE.SERVICE_IDENTITIES_MIN'),
  ipAddressInvalidMsg: translate('POLICIES_MODULE.IP_ADDRESS_INVALID'),
  ipAddrValidation: translate('POLICIES_MODULE.IP_ADDRESS_REQUIRED'),
  endDateTimeValidationMsg: translate('POLICIES_MODULE.END_DATE_TIME_VALIDATION'),
  endDateShouldGreaterThanTodayValidationMsg: translate(
    'POLICIES_MODULE.END_DATE_TIME_GREATER_THEN_TODAY_VALIDATION'
  ),
  endTimeValidationMsg: translate('POLICIES_MODULE.END_TIME_VALIDATION'),
  startDateTimeValidation: translate('POLICIES_MODULE.START_DATE_TIME_REQUIRED'),
  endDateTimeValidation: translate('POLICIES_MODULE.END_DATE_TIME_REQUIRED'),
  startTimeValidation: translate('POLICIES_MODULE.START_TIME_REQUIRED'),
  startTimeBeforeEndTimeValidation: translate('POLICIES_MODULE.START_TIME_VALIDATION'),
  startDateTimeMessage: translate('POLICIES_MODULE.START_DATE_TIME_MESSAGE'),
  endTimeValidation: translate('POLICIES_MODULE.END_TIME_REQUIRED'),
  notifMediumValidation: translate('POLICIES_MODULE.NOTIFICATION_MEDIUM_MIN'),
  approverTypeValidation: translate('POLICIES_MODULE.APPROVER_TYPE_ONE_OF'),
  maxApprovalTimeValidation: translate('POLICIES_MODULE.MAX_APPROVAL_REQUIRED'),
  maxTimeAfterApprovalValidation: translate(
    'POLICIES_MODULE.MAX_VALID_TIME_AFTER_APPROVAL_REQUIRED'
  ),
  maxTimeAfterApprovaltValidation: translate(
    'POLICIES_MODULE.MAX_VALID_TIME_AFTER_APPROVAL_FORMAT'
  ),
  maxApprovalFormatValidation: translate('POLICIES_MODULE.MAX_APPROVAL_FORMAT'),
  approversValidation: translate('POLICIES_MODULE.APPROVERS_MIN'),
  rolesAndPermissionValidation: translate('POLICIES_MODULE.ROLES_PERMISSION_ONE_OF'),
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
  consumerValidation: translate('ROLES_MODULE.CONSUMER_VALIDATIONS'),
  resourcesValidation: translate('ROLES_MODULE.RESOURCE_VALIDATION'),
  actionsValidation: translate('ROLES_MODULE.ACTION_VALIDATION'),
  deletePermissionTooltip: translate('PERMISSION_MODULE.DELETE_PERMISSION_TOOLTIP'),
  editPermissionTooltip: translate('PERMISSION_MODULE.EDIT_PERMISSION_TOOLTIP'),
  viewPermissionTooltip: translate('PERMISSION_MODULE.VIEW_PERMISSION_TOOLTIP'),
  viewRoleTooltip: translate('POLICIES_MODULE.VIEW_ROLE_POLICY_TOOLTIP'),
  deleteRoleTooltip: translate('ROLES_MODULE.DELETE_ROLE_TOOLTIP'),
  channelValidation: translate('POLICIES_MODULE.CHANNEl_MIN'),
  errorGetRolesList: (reason) => translate('POLICIES_MODULE.ERROR_GET_ROLE_LIST', { reason }),
  errorGetPermissionsList: (reason) =>
    translate('POLICIES_MODULE.ERROR_GET_PERMISSION_LIST', { reason }),
  warningGetRolesList: (reason) => translate('POLICIES_MODULE.WARNING_GET_ROLE_LIST', { reason }),
  warningGetPermissionsList: (reason) =>
    translate('POLICIES_MODULE.WARNING_GET_PERMISSION_LIST', { reason }),
  warningGetChannelList: (reason) =>
    translate('POLICIES_MODULE.WARNING_GET_CHANNEL_LIST', { reason }),
  inputNameMaxCharsValidation: translate('INPUT_NAME_MAX_CHAR'),
  copyBtn: translate('COPY'),
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
  allow: translate('POLICIES_MODULE.ALLOW'),
  deny: translate('DENY'),
  startDate: translate('POLICIES_MODULE.START_DATE_TIME_LABEL'),
  endDate: translate('POLICIES_MODULE.END_DATE_TIME_LABEL'),
  startTime: translate('POLICIES_MODULE.START_TIME_LABEL'),
  endTime: translate('POLICIES_MODULE.END_TIME_LABEL'),
  description: translate('DESCRIPTION'),
  generalTabTitle: translate('POLICIES_MODULE.GENERAL'),
  membersTabTitle: translate('POLICIES_MODULE.MEMBERS'),
  permissionsTabTitle: translate('PERMISSIONS'),
  rolesTabTitle: translate('ROLES'),
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
  removeApprovalsTitle: translate('POLICIES_MODULE.REMOVE_APPROVALS_TITLE'),
  removeApprovalsMessage: translate('POLICIES_MODULE.REMOVE_APPROVALS_MESSAGE'),
  yesRemoveApprovals: translate('POLICIES_MODULE.YES_REMOVE_APPROVALS'),
  tags: translate('POLICIES_MODULE.TAGS'),
  users: translate('POLICIES_MODULE.USERS'),
  si: translate('POLICIES_MODULE.SERVICE_IDENTITIES'),
  tokens: translate('POLICIES_MODULE.API_TOKENS'),
  noUsersFound: translate('POLICIES_MODULE.NO_USERS_FOUND'),
  noTagsFound: translate('POLICIES_MODULE.NO_TAGS_FOUND'),
  noTokensFound: translate('POLICIES_MODULE.NO_TOKENS_FOUND'),
  noSIFound: translate('POLICIES_MODULE.NO_SI_FOUND'),
  userLabel: translate('POLICIES_MODULE.USERS_LABEL'),
  groupLabel: translate('POLICIES_MODULE.GROUPS_LABEL'),
  serviceIdentityLabel: translate('POLICIES_MODULE.SERVICE_IDENTITIES_LABEL'),
  tokenLabel: translate('POLICIES_MODULE.TOKEN_LABEL'),
  accessLevel: translate('POLICIES_MODULE.ACCESS_LEVEL'),
  permissionName: translate('PERMISSION_NAME'),
  sourceName: translate('ROLES_MODULE.SOURCE'),
  consumer: translate('ROLES_MODULE.CONSUMER'),
  actions: translate('ROLES_MODULE.ACTIONS'),
  inlineText: translate('INLINE'),
  inactiveText: translate('INACTIVE_TEXT'),
  preDefinedText: translate('PRE_DEFINED'),
  resources: translate('RESOURCES'),
  noneText: translate('ROLES_MODULE.NONE'),
  roleName: translate('ROLES_MODULE.ROLE_NAME'),
  viewRoleTitle: (name) => translate('ROLES_MODULE.ROLE_NAME_VALUE', { name }),
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

export const classes = {
  addPolicyButtonContainer: 'add-policy-button-container',
  addPolicyButtonsContainerLeft: 'add-policy-buttons-container-left',
  addPolicyButtonContainerLeft: 'add-policy-button-container-left',
  addPolicySnackbar: 'add-policy-snackbar',
};

export const placeHolderCondition =
  "(request.location equals 'en' && request.ipaddress IN (1.2.3.4,5.6.7.8))";

export const RoleType = {
  ROLE_CREATE_REQUEST: 'ROLE_CREATE_REQUEST',
  ROLE_CREATE_LOADING: 'ROLE_CREATE_LOADING',
  ROLE_CREATE_SUCCESS: 'ROLE_CREATE_SUCCESS',
  ROLE_CREATE_FAILURE: 'ROLE_CREATE_FAILURE',
};

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

export const PermissionDetailsType = {
  PERMISSION_DETAILS_REQUEST: 'PERMISSION_DETAILS_REQUEST',
  PERMISSION_DETAILS_LOADING: 'PERMISSION_DETAILS_LOADING',
  PERMISSION_DETAILS_SUCCESS: 'PERMISSION_DETAILS_SUCCESS',
  PERMISSION_DETAILS_FAILURE: 'PERMISSION_DETAILS_FAILURE',
};

export const PermissionActionsType = {
  PERMISSION_ACTIONS_REQUEST: 'PERMISSION_ACTIONS_REQUEST',
  PERMISSION_ACTIONS_LOADING: 'PERMISSION_ACTIONS_LOADING',
  PERMISSION_ACTIONS_SUCCESS: 'PERMISSION_ACTIONS_SUCCESS',
  PERMISSION_ACTIONS_FAILURE: 'PERMISSION_ACTIONS_FAILURE',
  PERMISSION_ACTIONS_RESET: 'PERMISSION_ACTIONS_RESET',
};

export const RolesDetailsType = {
  ROLES_DETAILS_REQUEST: 'ROLES_DETAILS_REQUEST',
  ROLES_DETAILS_LOADING: 'ROLES_DETAILS_LOADING',
  ROLES_DETAILS_SUCCESS: 'ROLES_DETAILS_SUCCESS',
  ROLES_DETAILS_FAILURE: 'ROLES_DETAILS_FAILURE',
};

export const errorNotificationTime = 3000;
export const IS_SLACK = 'slack';
