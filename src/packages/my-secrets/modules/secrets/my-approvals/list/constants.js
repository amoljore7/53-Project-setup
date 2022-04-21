import { translate } from '../../../../externalization';

export const pageTitle = translate('MY_SECRETS');
export const approvalPageTitle = translate('SECRETS_MODULE.MY_APPROVALS');
export const approvalMessage = 'SECRETS_MODULE.APPROVAL_MESSAGE';
export const approvalLoadingMessage = translate(
  'MY_APPROVALS_AND_REQUEST_MODULE.APPROVALS_LOADING'
);

export const classes = {
  notificationContainer: 'notification-container',
  spinnerContainer: 'spinner-container',
};

export const MyApprovalsDataTypes = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  MY_APPROVALS_LIST_REQUEST: 'MY_APPROVALS_LIST_REQUEST',
  MY_APPROVALS_LIST_LOADING: 'MY_APPROVALS_LIST_LOADING',
  MY_APPROVALS_LIST_SUCCESS: 'MY_APPROVALS_LIST_SUCCESS',
  MY_APPROVALS_LIST_FAILURE: 'MY_APPROVALS_LIST_FAILURE',
  MY_APPROVALS_LIST_SEARCH_TERM_UPDATE: 'MY_APPROVALS_LIST_SEARCH_TERM_UPDATE',
  MY_APPROVALS_LIST_LOAD_MORE_REQUEST: 'MY_APPROVALS_LIST_LOAD_MORE_REQUEST',
  MY_APPROVALS_LIST_LOAD_MORE_LOADING: 'MY_APPROVALS_LIST_LOAD_MORE_LOADING',
  MY_APPROVALS_LIST_LOAD_MORE_SUCCESS: 'MY_APPROVALS_LIST_LOAD_MORE_SUCCESS',
  MY_APPROVALS_LIST_LOAD_MORE_FAILURE: 'MY_APPROVALS_LIST_LOAD_MORE_FAILURE',
};

export const UsersType = {
  APPROVALS_USERS_REQUEST: 'APPROVALS_USERS_REQUEST',
  APPROVALS_USERS_LOADING: 'APPROVALS_USERS_LOADING',
  APPROVALS_USERS_SUCCESS: 'APPROVALS_USERS_SUCCESS',
  APPROVALS_USERS_FAILURE: 'APPROVALS_USERS_FAILURE',
};

export const ApproveRequestDataTypes = {
  APPROVE_REQUEST_REQUEST: 'APPROVE_REQUEST_REQUEST',
};

export const RejectRequestDataTypes = {
  REJECT_REQUEST_REQUEST: 'REJECT_REQUEST_REQUEST',
};

export const tableColumns = {
  requestedOn: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUESTED_ON'),
  requestedBy: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUESTED_BY'),
  actionType: translate('ACTION'),
  resource: translate('RESOURCE'),
  approvalStatus: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_STATUS'),
  action: translate('ACTION'),
};

export const translatedStrings = {
  noneValue: translate('NONE'),
  cancelLabel: translate('CANCEL'),
  yesApprove: translate('YES_APPROVE'),
  yesReject: translate('YES_REJECT'),
  forLabel: translate('FOR'),
  myApprovalsSearchText: translate('MY_APPROVALS_AND_REQUEST_MODULE.SEARCH_NOT_SUPPORTED'),
  loadingMessage: translate('LOADING'),
  approveRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVE_REQUEST'),
  rejectRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECT_REQUEST'),
  approveMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_GRANTED'),
  rejectMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_DENIED'),
  manageRequestTooltip: translate('MY_APPROVALS_AND_REQUEST_MODULE.MANAGE_REQUEST_TITLE'),
  approveRequestTooltip: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVE_REQUEST_TOOLTIP'),
  rejectRequestTooltip: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECT_REQUEST_TOOLTIP'),
  approvalPendingText: translate('SECRETS_MODULE.APPROVAL_PENDING_TEXT'),
  comments: translate('COMMENTS'),
  optional: translate('OPTIONAL'),
};

export const active = 'active';
