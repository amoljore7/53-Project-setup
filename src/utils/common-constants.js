export const RESOURCE_STATUS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const typeOfStatus = ['INITIAL', 'LOADING', 'SUCCESS', 'ERROR'];
export const PAGE_TOKEN = 'pageToken';
export const IS_SLACK = 'slack';
export const errorNotificationDuration = 3000;
export const successNotificationDuration = 3000;
export const warningNotificationDuration = 3000;
export const infoNotificationDuration = 3000;
export const errorNotificationType = 'error';
export const successNotificationType = 'success';
export const warningNotificationType = 'warning';
export const generalNotificationType = 'general';
export const infoNotificationType = 'info';
export const medium = 'medium';
export const ppListingPath = '/admin/secret-manager/password-policies';
export const sstListingPath = '/admin/secret-manager/vault/static-secret';
export const mySecretMyApprovalPath = '/my-secrets/my-approvals';
export const secretManagerLandingPath = '/admin/secret-manager';
export const permissionListingPath = '/admin/policy-management/permissions';
export const policyListingPath = '/admin/policy-management/policies';
export const roleListingPath = '/admin/policy-management/roles';
export const adminSecretListingPath = '/admin/secret-manager/vault/secrets';
export const allSecretsPath = '/admin/secret-manager/vault/secrets/all-secrets';
export const notificationMediumListingPath = '/admin/global-settings/notification-medium';
export const editSMPolicyPath = '/admin/secret-manager/vault/secrets/all-secrets/policy/edit';
export const dateFormat = 'MMMM DD, YYYY hh:mm A';
export const roleDeleteCheckMsg = 'role cannot be deleted as it is referred in';
export const permissionDeleteCheckMsg = 'permission cannot be deleted as it is referred in';
export const COLON_SEPARATOR = ':';
export const pwdPolicyDeleteCheckMsg = 'password policy cannot be deleted as it is referred in';
export const staticSecTempDeleteCheckMsg =
  'static secret template cannot be deleted as it is referred in';
export const ALLOW = 'Allow';
export const DENY = 'Deny';
export const adminPath = '/admin';
export const ascendingOrder = 'ascending';
export const descendingOrder = 'descending';
export const unsortedOrder = 'unsorted';
export const ascOrder = 'asc';
export const descOrder = 'desc';
export const NA_TEXT = 'NA';
export const smallModalPopupWidth = 512;
export const active = 'active';
export const smConsumer = 'secretmanager';
export const notificationManager = 'notificationmanager';
export const securityAdminConsumer = 'securityadmin';
export const identityConsumer = 'identity';
export const readPolicyAction = 'authz.policy.read';
export const createPolicyAction = 'authz.policy.create';
export const deletePolicyAction = 'authz.policy.delete';
export const updatePolicyAction = 'authz.policy.update';
export const listPolicyAction = 'authz.policy.list';
export const userTagListAction = 'identity.user.list';
export const tokensListAction = 'securityadmin.security.list';
export const userField = 'user';
export const groupField = 'group';
export const siField = 'serviceIdentity';
export const tokenField = 'token';
export const mediumHeightDialogPopUp = 365;
export const viewDateFormat = 'DD/MM/YYYY h:mm A';
export const secretManagerConsumer = 'secretmanager';
export const papServiceConsumer = 'papservice';
