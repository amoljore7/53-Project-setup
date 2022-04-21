import { translate } from '../../../../externalization';

export const classes = {
  approvalsDetailsButton: 'sm-approvals-details-button',
  approvalsDetailsForm: 'sm-approvals-details-form',
  marginTop32: 'approvals-details-margin-top-32',
  marginTop8: 'approvals-details-margin-top-8',
  cancelBtn: 'sm-cancel-btn',
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
  approve: translate('Approve'),
  reject: translate('Reject'),
  close: translate('CLOSE'),
};

export const translatedStrings = {
  pageTitle: translate('APPROVAL'),
  noneValue: translate('NONE'),
  requestedBy: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUESTED_BY'),
  actionType: translate('ACTION'),
  resource: translate('RESOURCE'),
  approvalStatus: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_STATUS'),
  requestDate: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_DATE'),
  justification: translate('JUSTIFICATION'),
  cancelLabel: translate('CANCEL'),
  yesApprove: translate('YES_APPROVE'),
  yesReject: translate('YES_REJECT'),
  forLabel: translate('FOR'),
  fetchingApprovals: translate('LOADING'),
  approveRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVE_REQUEST'),
  rejectRequestTitle: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECT_REQUEST'),
  approveMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_GRANTED'),
  rejectMessage: translate('MY_APPROVALS_AND_REQUEST_MODULE.PERMISSION_DENIED'),
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
