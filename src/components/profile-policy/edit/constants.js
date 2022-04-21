import { translate } from '../../../packages/policy-management/externalization';

export const translatedStrings = {
  loadingPolicy: translate('POLICIES_LOADING'),
  resetEditTitle: translate('POLICIES_MODULE.RESET_EDIT_TITLE'),
  resetEditMessage: translate('POLICIES_MODULE.RESET_EDIT_MESSAGE'),
  resetEditPrimaryBtn: translate('POLICIES_MODULE.RESET_EDIT_PRIMARY_BTN'),
  resetEditSecondaryBtn: translate('POLICIES_MODULE.RESET_EDIT_SECONDARY_BTN'),
  inlineType: translate('INLINE'),
  preDefinedType: translate('PRE_DEFINED'),
  policyUpdateSuccess: translate('POLICIES_MODULE.POLICY_UPDATE_SUCCESS'),
  editingPolicy: translate('POLICIES_MODULE.EDITING_POLICY'),
  errorGetRolesList: (reason) => translate('POLICIES_MODULE.ERROR_GET_ROLE_LIST', { reason }),
  errorGetPermissionsList: (reason) =>
    translate('POLICIES_MODULE.ERROR_GET_PERMISSION_LIST', { reason }),
  warningGetRolesList: (reason) => translate('POLICIES_MODULE.WARNING_GET_ROLE_LIST', { reason }),
  warningGetPermissionsList: (reason) =>
    translate('POLICIES_MODULE.WARNING_GET_PERMISSION_LIST', { reason }),
  errorGetPolicyData: (reason) =>
    translate('POLICIES_MODULE.VIEW_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
};

export const EditFetchUserType = {
  FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_USER_REQUEST_LOADING: 'FETCH_USER_REQUEST_LOADING',
  FETCH_USER_REQUEST_SUCCESS: 'FETCH_USER_REQUEST_SUCCESS',
  FETCH_USER_REQUEST_FAILURE: 'FETCH_USER_REQUEST_ERROR',
};
export const EditFetchGroupType = {
  FETCH_GROUP_REQUEST: 'FETCH_GROUP_REQUEST',
  FETCH_GROUP_REQUEST_LOADING: 'FETCH_GROUP_REQUEST_LOADING',
  FETCH_GROUP_REQUEST_SUCCESS: 'FETCH_GROUP_REQUEST_SUCCESS',
  FETCH_GROUP_REQUEST_FAILURE: 'FETCH_GROUP_REQUEST_ERROR',
};
export const EditFetchTokenType = {
  FETCH_TOKEN_REQUEST: 'FETCH_TOKEN_REQUEST',
  FETCH_TOKEN_REQUEST_LOADING: 'FETCH_TOKEN_REQUEST_LOADING',
  FETCH_TOKEN_REQUEST_SUCCESS: 'FETCH_TOKEN_REQUEST_SUCCESS',
  FETCH_TOKEN_REQUEST_FAILURE: 'FETCH_TOKEN_REQUEST_ERROR',
};
export const EditFetchServiceIdentityType = {
  FETCH_SERVICE_IDENTITY_REQUEST: 'FETCH_SERVICE_IDENTITY_REQUEST',
  FETCH_SERVICE_IDENTITY_REQUEST_LOADING: 'FETCH_SERVICE_IDENTITY_REQUEST_LOADING',
  FETCH_SERVICE_IDENTITY_REQUEST_SUCCESS: 'FETCH_SERVICE_IDENTITY_REQUEST_SUCCESS',
  FETCH_SERVICE_IDENTITY_REQUEST_FAILURE: 'FETCH_SERVICE_IDENTITY_REQUEST_ERROR',
};
export const EditUsersType = {
  EDIT_USERS_REQUEST: 'EDIT_USERS_REQUEST',
  EDIT_USERS_LOADING: 'EDIT_USERS_LOADING',
  EDIT_USERS_SUCCESS: 'EDIT_USERS_SUCCESS',
  EDIT_USERS_FAILURE: 'EDIT_USERS_ERROR',
};

export const EditGroupsType = {
  EDIT_GROUPS_REQUEST: 'EDIT_GROUPS_REQUEST',
  EDIT_GROUPS_LOADING: 'EDIT_GROUPS_LOADING',
  EDIT_GROUPS_SUCCESS: 'EDIT_GROUPS_SUCCESS',
  EDIT_GROUPS_FAILURE: 'EDIT_GROUPS_FAILURE',
};

export const EditServiceIdentitiesType = {
  EDIT_SERVICE_IDENTITY_REQUEST: 'EDIT_SERVICE_IDENTITY_REQUEST',
  EDIT_SERVICE_IDENTITY_LOADING: 'EDIT_SERVICE_IDENTITY_LOADING',
  EDIT_SERVICE_IDENTITY_SUCCESS: 'EDIT_SERVICE_IDENTITY_SUCCESS',
  EDIT_SERVICE_IDENTITY_FAILURE: 'EDIT_SERVICE_IDENTITY_FAILURE',
};

export const EditTokensType = {
  EDIT_TOKENS_REQUEST: 'EDIT_TOKENS_REQUEST',
  EDIT_TOKENS_LOADING: 'EDIT_TOKENS_LOADING',
  EDIT_TOKENS_SUCCESS: 'EDIT_TOKENS_SUCCESS',
  EDIT_TOKENS_FAILURE: 'EDIT_TOKENS_FAILURE',
};

export const EditPolicyType = {
  EDIT_POLICY_REQUEST: 'EDIT_POLICY_REQUEST',
  EDIT_POLICY_LOADING: 'EDIT_POLICY_LOADING',
  EDIT_POLICY_SUCCESS: 'EDIT_POLICY_SUCCESS',
  EDIT_POLICY_FAILURE: 'EDIT_POLICY_FAILURE',
};

export const EditNotificationType = {
  EDIT_OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  EDIT_CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
};

export const EditPermissionDetailsType = {
  EDIT_PERMISSION_DETAILS_REQUEST: 'EDIT_PERMISSION_DETAILS_REQUEST',
  EDIT_PERMISSION_DETAILS_LOADING: 'EDIT_PERMISSION_DETAILS_LOADING',
  EDIT_PERMISSION_DETAILS_SUCCESS: 'EDIT_PERMISSION_DETAILS_SUCCESS',
  EDIT_PERMISSION_DETAILS_FAILURE: 'EDIT_PERMISSION_DETAILS_FAILURE',
};

export const EditPermissionActionsType = {
  EDIT_PERMISSION_ACTIONS_REQUEST: 'EDIT_PERMISSION_ACTIONS_REQUEST',
  EDIT_PERMISSION_ACTIONS_LOADING: 'EDIT_PERMISSION_ACTIONS_LOADING',
  EDIT_PERMISSION_ACTIONS_SUCCESS: 'EDIT_PERMISSION_ACTIONS_SUCCESS',
  EDIT_PERMISSION_ACTIONS_FAILURE: 'EDIT_PERMISSION_ACTIONS_FAILURE',
  EDIT_PERMISSION_ACTIONS_RESET: 'EDIT_PERMISSION_ACTIONS_RESET',
};

export const editPermissionsListType = {
  RECURSIVE_EDIT_PERMISSIONS_LIST_REQUEST: 'RECURSIVE_EDIT_PERMISSIONS_LIST_REQUEST',
  RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING: 'RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING',
  RECURSIVE_EDIT_PERMISSIONS_LIST_SUCCESS: 'RECURSIVE_EDIT_PERMISSIONS_LIST_SUCCESS',
  RECURSIVE_EDIT_PERMISSIONS_LIST_FAILURE: 'RECURSIVE_EDIT_PERMISSIONS_LIST_FAILURE',
  RECURSIVE_EDIT_PERMISSIONS_LIST_RESET: 'RECURSIVE_EDIT_PERMISSIONS_LIST_RESET',
  RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING_DISABLE:
    'RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING_DISABLE',
};

export const editRolesListType = {
  RECURSIVE_EDIT_ROLES_LIST_REQUEST: 'RECURSIVE_EDIT_ROLES_LIST_REQUEST',
  RECURSIVE_EDIT_ROLES_LIST_LOADING: 'RECURSIVE_EDIT_ROLES_LIST_LOADING',
  RECURSIVE_EDIT_ROLES_LIST_SUCCESS: 'RECURSIVE_EDIT_ROLES_LIST_SUCCESS',
  RECURSIVE_EDIT_ROLES_LIST_FAILURE: 'RECURSIVE_EDIT_ROLES_LIST_FAILURE',
  RECURSIVE_EDIT_ROLES_LIST_RESET: 'RECURSIVE_EDIT_ROLES_LIST_RESET',
  RECURSIVE_EDIT_ROLES_LIST_LOADING_DISABLE: 'RECURSIVE_EDIT_ROLES_LIST_LOADING_DISABLE',
};

export const EditRolesDetailsType = {
  EDIT_ROLES_DETAILS_REQUEST: 'EDIT_ROLES_DETAILS_REQUEST',
  EDIT_ROLES_DETAILS_LOADING: 'EDIT_ROLES_DETAILS_LOADING',
  EDIT_ROLES_DETAILS_SUCCESS: 'EDIT_ROLES_DETAILS_SUCCESS',
  EDIT_ROLES_DETAILS_FAILURE: 'EDIT_ROLES_DETAILS_FAILURE',
};

export const LoadPolicyDataType = {
  EDIT_LOAD_POLICY_REQUEST: 'EDIT_LOAD_POLICY_REQUEST',
  EDIT_LOAD_POLICY_LOADING: 'EDIT_LOAD_POLICY_LOADING',
  EDIT_LOAD_POLICY_SUCCESS: 'EDIT_LOAD_POLICY_SUCCESS',
  EDIT_LOAD_POLICY_FAILURE: 'EDIT_LOAD_POLICY_FAILURE',
  EDIT_LOAD_POLICY_RESET: 'EDIT_LOAD_POLICY_RESET',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  EDIT_LOAD_POLICY_JSON_REQUEST: 'EDIT_LOAD_POLICY_JSON_REQUEST',
  EDIT_LOAD_POLICY_JSON_LOADING: 'EDIT_LOAD_POLICY_JSON_LOADING',
  EDIT_LOAD_POLICY_JSON_SUCCESS: 'EDIT_LOAD_POLICY_JSON_SUCCESS',
  EDIT_LOAD_POLICY_JSON_FAILURE: 'EDIT_LOAD_POLICY_JSON_FAILURE',
  EDIT_LOAD_POLICY_JSON_RESET: 'EDIT_LOAD_POLICY_JSON_RESET',
};

export const dummyDate = '01/01/1970';
export const dateSearchCharacter = '-';
export const errorNotificationTime = 3000;
