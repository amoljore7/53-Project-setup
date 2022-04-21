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

export const SecretDetailsTypes = {
  SECRET_DETAILS_REQUEST: 'SECRET_DETAILS_REQUEST',
  SECRET_DETAILS_LOADING: 'SECRET_DETAILS_LOADING',
  SECRET_DETAILS_SUCCESS: 'SECRET_DETAILS_SUCCESS',
  SECRET_DETAILS_FAILURE: 'SECRET_DETAILS_FAILURE',
  SECRET_DETAILS_RESET: 'SECRET_DETAILS_RESET',
};

export const secretTemplateDetailsTypes = {
  SECRET_TEMPLATE_DETAILS_REQUEST: 'SECRET_TEMPLATE_DETAILS_REQUEST',
  SECRET_TEMPLATE_DETAILS_LOADING: 'SECRET_TEMPLATE_DETAILS_LOADING',
  SECRET_TEMPLATE_DETAILS_SUCCESS: 'SECRET_TEMPLATE_DETAILS_SUCCESS',
  SECRET_TEMPLATE_DETAILS_FAILURE: 'SECRET_TEMPLATE_DETAILS_FAILURE',
};

export const fetchUsersType = {
  FETCH_USERS_LOADING_VIEW_SECRET: 'FETCH_USERS_LOADING_VIEW_SECRET',
  FETCH_USERS_REQUEST_VIEW_SECRET: 'FETCH_USERS_REQUEST_VIEW_SECRET',
  FETCH_USERS_SUCCESS_VIEW_SECRET: 'FETCH_USERS_SUCCESS_VIEW_SECRET',
  FETCH_USERS_FAILURE_VIEW_SECRET: 'FETCH_USERS_ERROR_VIEW_SECRET',
  FETCH_USERS_RESET_VIEW_SECRET: 'FETCH_USERS_RESET_VIEW_SECRET',
};

export const mainRole = 'main';
export const searchDebounceTime = 300;
export const copyNotificationTime = 3000;
export const maskedRepeatCount = 10;
export const iconSize = 24;
export const templateKey = 'templateParameter-';
export const errorNotificationTime = 3000;

export const classes = {
  secretViewLoader: 'my-secrets-secret-view-loader',
  secretViewLayout: 'my-secrets-secret-view-layout',
  secretViewSpacing: 'secret-view-spacing',
  secretViewLabel: 'secret-view-label',
  secretViewValue: 'secret-view-value',
  maskedActionButtons: 'masked-action-buttons',
  showButton: 'show-button',
  fieldSpacing: 'my-secrets-approval-pending-popup-field-spacing',
  disabledIcon: 'disabled-icon',
};

export const translatedStrings = {
  secretsNameColumnHeader: translate('SECRETS_MODULE.SECRETS_NAME_HEADER'),
  secretsDescriptionColumnHeader: translate('DESCRIPTION'),
  secretsPathColumnHeader: translate('SECRETS_MODULE.SECRETS_PATH_HEADER'),
  secretsStatusColumnHeader: translate('SECRETS_MODULE.SECRETS_STATUS_HEADER'),
  secretsActionColumnHeader: translate('ACTION'),
  secretsLoadingMessage: translate('SECRETS_MODULE.SECRET_LOADING_MESSAGE'),
  copyNotificationMessage: translate('SECRETS_MODULE.COPIED_TO_CLIPBOARD'),
  copyAllText: translate('SECRETS_MODULE.COPY_ALL'),
  closeText: translate('CLOSE'),
  secretDetailLoadingMessage: translate('SECRETS_MODULE.SECRET_DETAILS_LOADING_MESSAGE'),
  secretNameLabel: translate('SECRETS_MODULE.SECRETS_NAME_HEADER'),
  secretDescriptionLabel: translate('DESCRIPTION'),
  noneText: translate('NONE'),
  showText: translate('SECRETS_MODULE.SHOW'),
  hideText: translate('SECRETS_MODULE.HIDE'),
  copyText: translate('COPY'),
  searchPlaceholderText: translate('SECRETS_MODULE.SECRETS_SEARCH_PLACEHOLDER'),
  viewSecretTooltip: translate('SECRETS_MODULE.VIEW_SECRET_TOOLTIP'),
  approvalRequiredText: translate('SECRETS_MODULE.APPROVAL_REQUIRED_TEXT'),
  availableText: translate('SECRETS_MODULE.AVAILABLE_TEXT'),
  accessDeniedText: translate('SECRETS_MODULE.APPROVAL_DENIED_TEXT'),
  approvalPendingText: translate('SECRETS_MODULE.APPROVAL_PENDING_TEXT'),
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

export const secretListConstants = {
  alertText: 'alert',
  height: 295,
  priVariant: 'primary',
  secVariant: 'secondary',
  largeSize: 'large',
  maxJustificationChars: '255',
  pendingText: 'Approval Pending',
  allowText: 'Allow',
  approvalRequiredText: 'ApprovalRequired',
  accessDenyText: 'Access Denied',
  mediumSize: 'medium',
  leftText: 'left',
  successText: 'success',
  secretViewModalWidth: 512,
  approvalRequiredErrorCode_11: 'PE-0011',
  pendingSecretErrorCode_10: 'PE-0010',
};

export const fetchGroupsType = {
  FETCH_GROUPS_LOADING_VIEW_SECRET: 'FETCH_GROUPS_LOADING_VIEW_SECRET',
  FETCH_GROUPS_REQUEST_VIEW_SECRET: 'FETCH_GROUPS_REQUEST_VIEW_SECRET',
  FETCH_GROUPS_SUCCESS_VIEW_SECRET: 'FETCH_GROUPS_SUCCESS_VIEW_SECRET',
  FETCH_GROUPS_FAILURE_VIEW_SECRET: 'FETCH_GROUPS_ERROR_VIEW_SECRET',
  FETCH_GROUPS_RESET_VIEW_SECRET: 'FETCH_GROUPS_RESET_VIEW_SECRET',
};
