import { translate } from '../../externalization';

export const classes = {
  secretsRequestsApprovalsContainer: 'secrets-requests-approvals-container',
};

export const VaultLandingTypes = {
  VAULT_LANDING_REQUEST: 'VAULT_LANDING_REQUEST',
  VAULT_LANDING_LOADING: 'VAULT_LANDING_LOADING',
  VAULT_LANDING_SUCCESS: 'VAULT_LANDING_SUCCESS',
  VAULT_LANDING_FAILURE: 'VAULT_LANDING_FAILURE',
};

export const translatedInitialTab = [
  { title: translate('SECRETS_MODULE.ALL_SECRETS') },
  { title: translate('SECRETS_MODULE.MY_REQUESTS') },
  { title: translate('SECRETS_MODULE.MY_APPROVALS') },
];

export const translatedStrings = {
  approvalPendingText: translate('SECRETS_MODULE.APPROVAL_PENDING_TEXT'),
  approvalRequiredText: translate('SECRETS_MODULE.APPROVAL_REQUIRED_TEXT'),
  approvalDeniedText: translate('SECRETS_MODULE.APPROVAL_DENIED_TEXT'),
  availableText: translate('SECRETS_MODULE.AVAILABLE_TEXT'),
  alreadyApproved: translate('SECRETS_MODULE.ALREADY_APPROVED'),
  alreadyRejected: translate('SECRETS_MODULE.ALREADY_REJECTED'),
  alreadyExpired: translate('SECRETS_MODULE.ALREADY_EXPIRED'),
  viewSecret: translate('SECRETS_MODULE.VIEW_SECRET'),
  accessProfile: translate('SECRETS_MODULE.ACCESS_PROFILE'),
  rejectedStatus: translate('SECRETS_MODULE.REJECTED_STATUS'),
  approvedStatus: translate('SECRETS_MODULE.APPROVED_STATUS'),
  timeOutStatus: translate('SECRETS_MODULE.TIMEOUT_STATUS'),
  noneText: translate('SECRETS_MODULE.NONE_TEXT'),
};

export const pageTitle = translate('SECRETS_MODULE.MY_SECRETS');
export const vaultLoadingMessage = translate('VAULT_DETAILS_FETCHING_MESSAGE');

export const secretModuleConstants = {
  pendingText: 'pending',
  approvalRequiredText: 'approvalrequired',
  denyText: 'deny',
  allowText: 'allow',
  accessDeniedText: 'access denied',
  rejectedText: 'rejected',
  timeOutText: 'timeout',
  secretReadActionName: 'sm.secret.read',
  profileAccessActionName: 'papservice.profile.access',
  approvedText: 'approved',
  requestExpiredText: 'request expired',
};
