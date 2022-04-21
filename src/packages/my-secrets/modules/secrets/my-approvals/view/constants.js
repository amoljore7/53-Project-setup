import { translate } from '../../../../externalization';

export const classes = {
  approvalsDetailsButton: 'my-secrets-my-approvals-details-button',
  approvalsDetailsForm: 'my-secrets-my-approvals-details-form',
  marginTop32: 'approvals-details-margin-top-32',
  marginTop20: 'approvals-details-margin-top-20',
  marginTop8: 'approvals-details-margin-top-8',
  cancelBtn: 'user-cancel-btn',
  detailsLabel: 'details-label',
};

export const classesMobile = {
  approvalRequestSuccessContainer: 'approval-request-success-container',
  approvalRequestSeccessContent: 'approval-request-success-content',
  checkIcon: 'check-icon',
  successMessage: 'success-message',
  approved: 'approved',
  rejected: 'rejected',
  detailsTextIndent: 'my-secrets-my-approvals-details-text-indent',
};

export const MyApprovalsDetailsDataTypes = {
  MY_APPROVALS_DETAILS_REQUEST: 'MY_APPROVALS_DETAILS_REQUEST',
  MY_APPROVALS_DETAILS_LOADING: 'MY_APPROVALS_DETAILS_LOADING',
  MY_APPROVALS_DETAILS_SUCCESS: 'MY_APPROVALS_DETAILS_SUCCESS',
  MY_APPROVALS_DETAILS_FAILURE: 'MY_APPROVALS_DETAILS_FAILURE',
};

export const ApproveRequestDataTypes = {
  APPROVE_REQUEST_DETAILS_REQUEST: 'APPROVE_REQUEST_DETAILS_REQUEST',
};

export const RejectRequestDataTypes = {
  REJECT_REQUEST_DETAILS_REQUEST: 'REJECT_REQUEST_DETAILS_REQUEST',
};

export const buttonType = {
  approve: translate('APPROVE'),
  reject: translate('REJECT'),
  close: translate('CLOSE'),
};

export const translatedStrings = {
  pageTitle: translate('APPROVAL'),
  noneValue: translate('NONE'),
  requestedBy: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUESTED_BY'),
  actionType: translate('ACTION'),
  resource: translate('RESOURCE'),
  approvalStatus: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_STATUS'),
  cancelLabel: translate('CANCEL'),
  yesApprove: translate('YES_APPROVE'),
  yesReject: translate('YES_REJECT'),
  forLabel: translate('FOR'),
  approveRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVE_REQUEST'),
  rejectRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECT_REQUEST'),
  approveMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_GRANTED'),
  rejectMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_DENIED'),
  fetchingApprovals: translate('LOADING'),
  requestDate: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_DATE'),
  justification: translate('JUSTIFICATION'),
  comments: translate('COMMENTS'),
  approvedBy: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVED_BY'),
  approvedOn: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVED_ON'),
  rejectedBy: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECTED_BY'),
  rejectedOn: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECTED_ON'),
  expiredOn: translate('MY_APPROVALS_AND_REQUEST_MODULE.EXPIRED_ON'),
  optional: translate('OPTIONAL'),
};

export const statusLabel = {
  expired: translate('MY_APPROVALS_AND_REQUEST_MODULE.MESSAGE_EXPIRED'),
  approved: translate('MY_APPROVALS_AND_REQUEST_MODULE.MESSAGE_APPROVED'),
  expiredAfterApproval: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_EXPIRED_MESSAGE'),
  rejected: translate('MY_APPROVALS_AND_REQUEST_MODULE.MESSAGE_REJECTED'),
};

export const status = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  TIMEOUT: 'TIMEOUT',
};
export const defaultBtnSize = '24';
export const YES_PARAM = 'yes';
export const NO_PARAM = 'no';
