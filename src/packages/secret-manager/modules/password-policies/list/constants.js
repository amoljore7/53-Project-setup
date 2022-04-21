import { translate } from '../../../externalization';

export const PasswordPolicyListConstants = {
  PASSWORD_POLICY_LIST_REQUEST: 'PASSWORD_POLICY_LIST_REQUEST',
  PASSWORD_POLICY_LIST_LOADING: 'PASSWORD_POLICY_LIST_LOADING',
  PASSWORD_POLICY_LIST_SUCCESS: 'PASSWORD_POLICY_LIST_SUCCESS',
  PASSWORD_POLICY_LIST_FAILURE: 'PASSWORD_POLICY_LIST_FAILURE',
  PASSWORD_POLICY_LIST_LOAD_MORE_REQUEST: 'PASSWORD_POLICY_LIST_LOAD_MORE_REQUEST',
  PASSWORD_POLICY_LIST_LOAD_MORE_LOADING: 'PASSWORD_POLICY_LIST_LOAD_MORE_LOADING',
  PASSWORD_POLICY_LIST_LOAD_MORE_SUCCESS: 'PASSWORD_POLICY_LIST_LOAD_MORE_SUCCESS',
  PASSWORD_POLICY_LIST_LOAD_MORE_FAILURE: 'PASSWORD_POLICY_LIST_LOAD_MORE_FAILURE',
  PASSWORD_POLICY_LIST_SEARCH_TERM_UPDATE: 'PASSWORD_POLICY_LIST_SEARCH_TERM_UPDATE',
};

export const PasswordPolicyDeleteConstants = {
  PASSWORD_POLICY_DELETE_REQUEST: 'PASSWORD_POLICY_DELETE_REQUEST',
  PASSWORD_POLICY_DELETE_LOADING: 'PASSWORD_POLICY_DELETE_LOADING',
  PASSWORD_POLICY_DELETE_SUCCESS: 'PASSWORD_POLICY_DELETE_SUCCESS',
  PASSWORD_POLICY_DELETE_FAILURE: 'PASSWORD_POLICY_DELETE_FAILURE',
  PASSWORD_POLICY_DELETE_RESET: 'PASSWORD_POLICY_DELETE_RESET',
};

export const classes = {
  addPasswordPolicyButtonContainer: 'add-password-policy-button-container',
  passwordPolicyListContainer: 'password-policy-list-container',
  passwordPolicyTableContainer: 'password-policy-table-container',
  passwordPolicyTableActionCell: 'password-policy-table-action-cell',
  passwordPolicyTableActionEdit: 'password-policy-table-action-edit',
  passwordPolicyTableActionClone: 'password-policy-table-action-clone',
  passwordPolicyTableActionDelete: 'password-policy-table-action-delete',
  disabledIcon: 'disabled-icon',
};

export const pageTitle = translate('PASSWORD_POLICIES');
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('SECRETS_MANAGER'),
    route: '/admin/secret-manager',
  },
  {
    name: translate('PASSWORD_POLICIES'),
  },
];
export const mainRole = 'main';
export const searchDebounceTime = 300;
export const actionIconSize = '24';
export const deleteNotificationTime = 3000;
export const alphanumericType = 'alphanumeric';
export const pinType = 'pin';
export const backToTopId = 'password-policy-list-back-to-top';

export const tableColumns = {
  passwordPolicyName: translate('PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME'),
  description: translate('DESCRIPTION'),
  mustIncludeAZ: translate('PASSWORD_POLICIES_MODULE.MUST_INCLUDE_A_Z'),
  mustIncludeaz: translate('PASSWORD_POLICIES_MODULE.MUST_INCLUDE_a_z'),
  mustInclude09: translate('PASSWORD_POLICIES_MODULE.MUST_INCLUDE_0_9'),
  mustIncludeSpecialCharacters: translate(
    'PASSWORD_POLICIES_MODULE.MUST_INCLUDE_SPECIAL_CHARACTERS'
  ),
  minimumLength: translate('PASSWORD_POLICIES_MODULE.MINIMUM_LENGTH'),
  action: translate('ACTION'),
};

export const translatedStrings = {
  addPasswordPolicyButton: translate('PASSWORD_POLICIES_MODULE.ADD_PASSWORD_POLICY'),
  yesText: translate('YES'),
  noText: translate('NO'),
  naText: translate('NA'),
  passwordPolicyLoadingMessage: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_LOADING_MESSAGE'
  ),
  passwordPolicyDeleteLoadingMessage: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_DELETE_LOADING_MESSAGE'
  ),
  passwordPolicySearchPlaceholder: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_SEARCH_PLACEHOLDER'
  ),
  deletePasswordPolicySuccessMessage: translate(
    'PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_SUCCESS'
  ),
  deletePasswordPolicyDialogTitle: translate(
    'PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_DIALOG_TITLE'
  ),
  deletePasswordPolicyDialogMessage: translate(
    'PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_DIALOG_MESSAGE'
  ),
  deletePrimaryButton: translate('YES_DELETE'),
  deleteTooltip: translate('PASSWORD_POLICIES_MODULE.DELETE_POLICY'),
  cloneTooltip: translate('PASSWORD_POLICIES_MODULE.CLONE_POLICY'),
  manageTooltip: translate('PASSWORD_POLICIES_MODULE.MANAGE_PASSWORD_POLICY'),
  noAccessToManagePasswordPolicyTooltip: translate(
    'PASSWORD_POLICIES_MODULE.NO_ACCESS_TO_MANAGE_PASSWORD_POLICY'
  ),
  noAccessToClonePasswordPolicyTooltip: translate(
    'PASSWORD_POLICIES_MODULE.NO_ACCESS_TO_CLONE_PASSWORD_POLICY'
  ),
  noAccessToDeletePasswordPolicyTooltip: translate(
    'PASSWORD_POLICIES_MODULE.NO_ACCESS_TO_DELETE_PASSWORD_POLICY'
  ),
};
