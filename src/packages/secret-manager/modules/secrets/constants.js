import { translate } from '../../externalization';

export const classes = {
  secretsRequestsApprovalsContainer: 'secrets-requests-approvals-container',
  addFolderContainer: 'add-folder-container',
  addFolderLoaderContainer: 'add-folder-loader-container',
};

export const allSecretsTabValue = 0;
export const myRequestsTabValue = 1;
export const myApprovalsTabValue = 2;

export const translateStrings = {
  requestApproved: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_APPROVED'),
  requestRejected: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_REJECTED'),
  requestExpired: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUEST_EXPIRED_TOOLTIP'),
  approvalPending: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_PENDING'),
  approvedText: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVED_TEXT'),
  timeout: translate('MY_APPROVALS_AND_REQUEST_MODULE.TIMEOUT_STATUS'),
  rejected: translate('MY_APPROVALS_AND_REQUEST_MODULE.REJECTED_STATUS'),
  viewSecret: translate('SECRETS_MODULE.VIEW_SECRET'),
  noneText: translate('SECRETS_MODULE.NONE_TEXT'),
};

export const MyApprovalsStatus = {
  pending: 'pending',
  timeout: 'timeout',
  rejected: 'rejected',
  access_denied: 'access denied',
  approval_required: 'approval required',
  secretReadActionName: 'sm.secret.read',
  approved: 'approved',
  requestExpiredText: 'request expired',
};
