import { translate } from '../../../../externalization';

export const secretListTypes = {
  SECRET_LIST_REQUEST: 'SECRET_LIST_REQUEST',
  SECRET_LIST_LOADING: 'SECRET_LIST_LOADING',
  SECRET_LIST_SUCCESS: 'SECRET_LIST_SUCCESS',
  SECRET_LIST_FAILURE: 'SECRET_LIST_FAILURE',
  SECRET_LIST_SEARCH_TERM_UPDATE: 'SECRET_LIST_SEARCH_TERM_UPDATE',
  SECRET_LIST_LOAD_MORE_REQUEST: 'SECRET_LIST_LOAD_MORE_REQUEST',
  SECRET_LIST_LOAD_MORE_LOADING: 'SECRET_LIST_LOAD_MORE_LOADING',
  SECRET_LIST_LOAD_MORE_SUCCESS: 'SECRET_LIST_LOAD_MORE_SUCCESS',
  SECRET_LIST_LOAD_MORE_FAILURE: 'SECRET_LIST_LOAD_MORE_FAILURE',
};

export const secretDeleteTypes = {
  SECRET_DELETE_REQUEST: 'SECRET_DELETE_REQUEST',
  SECRET_DELETE_LOADING: 'SECRET_DELETE_LOADING',
  SECRET_DELETE_SUCCESS: 'SECRET_DELETE_SUCCESS',
  SECRET_DELETE_FAILURE: 'SECRET_DELETE_FAILURE',
};

export const mainRole = 'main';
export const searchDebounceTime = 300;
export const actionIconSize = '24';
export const deleteNotificationTime = 3000;
export const errorNotificationTime = 3000;

export const translatedStrings = {
  secretsNameColumnHeader: translate('SECRETS_MODULE.SECRETS_NAME_HEADER'),
  secretsDescriptionColumnHeader: translate('SECRETS_MODULE.SECRETS_DESCRIPTION_HEADER'),
  secretsRotationPeriodColumnHeader: translate('SECRETS_MODULE.SECRETS_ROTATION_PERIOD_HEADER'),
  secretsCategoryColumnHeader: translate('SECRETS_MODULE.SECRETS_CATEGORY_HEADER'),
  secretsTypeColumnHeader: translate('SECRETS_MODULE.SECRETS_TYPE_HEADER'),
  secretsActionColumnHeader: translate('SECRETS_MODULE.SECRETS_ACTION_HEADER'),
  secretsSearchPlaceholder: translate('SECRETS_MODULE.SECRETS_SEARCH_PLACEHOLDER'),
  policiesSearchPlaceholder: translate('SECRETS_MODULE.POLICIES_SEARCH_PLACEHOLDER'),
  secretsLoadingMessage: translate('SECRETS_MODULE.SECRET_LOADING_MESSAGE'),
  secretsDeleteLoadingMessage: translate('SECRETS_MODULE.SECRET_DELETE_LOADING_MESSAGE'),
  addSecretButtonText: translate('SECRETS_MODULE.ADD_SECRET_BUTTON_TEXT'),
  deleteSecretSuccessMessage: translate('SECRETS_MODULE.DELETE_SECRET_SUCCESS_MESSAGE'),
  manageSecretsTooltip: translate('SECRETS_MODULE.MANAGE_TOOLTIP'),
  deleteSecretTooltip: translate('SECRETS_MODULE.DELETE_SECRET_TOOLTIP'),
  disableDeleteSecretTooltip: translate('SECRETS_MODULE.DISABLE_DELETE_SECRET_TOOLTIP'),
  accessDenied: translate('MY_APPROVALS_AND_REQUEST_MODULE.ACCESS_DENIED'),
  noneText: translate('SECRETS_MODULE.NONE_TEXT'),
};

export const translatedStringsForApprovalsModal = {
  notifiedText: translate('SECRETS_MODULE.NOTIFIED_TEXT'),
  trackText: translate('SECRETS_MODULE.TRACK_TEXT'),
  viewAction: translate('SECRETS_MODULE.VIEW_ACTION'),
  sendRequestButton: translate('SECRETS_MODULE.SEND_REQUEST_BUTTON'),
  cancelText: translate('CANCEL'),
  needApproval: translate('SECRETS_MODULE.NEED_APPROVAL'),
  approvalRequestSent: translate('SECRETS_MODULE.APPROVAL_REQUEST_SENT'),
  sendingApprovalRequestMessage: translate('SECRETS_MODULE.SENDING_APPROVAL_REQUEST'),
  justificationText: translate('SECRETS_MODULE.JUSTIFICATION_TEXT'),
  justificationMaxLength: translate('SECRETS_MODULE.JUSTIFICATION_LENGTH_MAX'),
  justificationRequiredValidation: translate('SECRETS_MODULE.JUSTIFICATION_REQUIRED'),
  loadingApproversDetails: translate('SECRETS_MODULE.LOADING_APPROVERS_DETAILS'),
  accessRequestSentMessage: translate('SECRETS_MODULE.ACCESS_REQUEST_SENT_MESSAGE'),
};

export const translatedStringsForWaitingApproval = {
  waitingApprovalDialogTitle: translate('SECRETS_MODULE.WAITING_FOR_APPROVAL'),
  waitingApprovalDialogPrimaryButton: translate(
    'SECRETS_MODULE.WAITING_FOR_APPROVAL_PRIMARY_BUTTON'
  ),
  approvalDialogMessage: translate('SECRETS_MODULE.WAITING_FOR_APPROVAL_DIALOG_MESSAGE'),
  notifiedText: translate('SECRETS_MODULE.NOTIFIED_TEXT'),
  trackText: translate('SECRETS_MODULE.TRACK_TEXT'),
};

export const adminSecretListConstants = {
  denyText: 'Deny',
  approvalRequiredErrorCode_11: 'PE-0011',
  pendingSecretErrorCode_10: 'PE-0010',
};

export const classes = {
  fieldSpacing: 'field-spacing',
  disabledIcon: 'disabled-icon',
  secretViewLoader: 'secret-view-loader',
};

export const fetchUsersType = {
  FETCH_ADMIN_LOADING_VIEW_SECRET: 'FETCH_ADMIN_LOADING_VIEW_SECRET',
  FETCH_ADMIN_REQUEST_VIEW_SECRET: 'FETCH_ADMIN_REQUEST_VIEW_SECRET',
  FETCH_ADMIN_SUCCESS_VIEW_SECRET: 'FETCH_ADMIN_SUCCESS_VIEW_SECRET',
  FETCH_ADMIN_FAILURE_VIEW_SECRET: 'FETCH_ADMIN_ERROR_VIEW_SECRET',
  FETCH_ADMIN_RESET_VIEW_SECRET: 'FETCH_ADMIN_RESET_VIEW_SECRET',
};

export const fetchAdminGroupsType = {
  FETCH_ADMIN_GROUPS_LOADING_VIEW_SECRET: 'FETCH_ADMIN_GROUPS_LOADING_VIEW_SECRET',
  FETCH_ADMIN_GROUPS_REQUEST_VIEW_SECRET: 'FETCH_ADMIN_GROUPS_REQUEST_VIEW_SECRET',
  FETCH_ADMIN_GROUPS_SUCCESS_VIEW_SECRET: 'FETCH_ADMIN_GROUPS_SUCCESS_VIEW_SECRET',
  FETCH_ADMIN_GROUPS_FAILURE_VIEW_SECRET: 'FETCH_ADMIN_GROUPS_ERROR_VIEW_SECRET',
  FETCH_ADMIN_GROUPS_RESET_VIEW_SECRET: 'FETCH_ADMIN_GROUPS_RESET_VIEW_SECRET',
};
