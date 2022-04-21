import { translate } from '../../../externalization';

export const PasswordPolicyViewConstants = {
  PASSWORD_POLICY_VIEW_DATA_REQUEST: 'PASSWORD_POLICY_VIEW_DATA_REQUEST',
  PASSWORD_POLICY_VIEW_DATA_LOADING: 'PASSWORD_POLICY_VIEW_DATA_LOADING',
  PASSWORD_POLICY_VIEW_DATA_SUCCESS: 'PASSWORD_POLICY_VIEW_DATA_SUCCESS',
  PASSWORD_POLICY_VIEW_DATA_FAILURE: 'PASSWORD_POLICY_VIEW_DATA_FAILURE',
  PASSWORD_POLICY_VIEW_DATA_RESET: 'PASSWORD_POLICY_VIEW_DATA_RESET',
};

export const classes = {
  passwordPolicyMainContainer: 'password-policy-main-container',
  passwordPolicyButtonContainer: 'password-policy-button-container',
  passwordPolicyViewDataMainContainer: 'password-policy-view-data-main-container',
  marginTop8px: 'margin-top-8px',
  marginTop32px: 'margin-top-32px',
};

export const translatedStrings = {
  pageTitle: translate('PASSWORD_POLICIES'),
  yesText: translate('YES'),
  noText: translate('NO'),
  deletePrimaryButton: translate('YES_DELETE'),
  editText: translate('EDIT'),
  cloneText: translate('CLONE'),
  deleteText: translate('DELETE'),
  closeText: translate('CLOSE'),
  noneText: translate('NONE'),
  loadingMessage: translate('PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_LOADING_MESSAGE'),
  deleteMessage: translate('PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_DIALOG_MESSAGE'),
  deleteTitle: translate('PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_DIALOG_TITLE'),
  deletePasswordPolicySuccessMessage: translate(
    'PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_SUCCESS'
  ),
  deleteLoadingMessage: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_DELETE_LOADING_MESSAGE'
  ),
  pinMandatoryText: translate('PASSWORD_POLICIES_MODULE.PIN_MANDATORY_TEXT'),
};

export const passwordPolicyConstants = {
  spinnerSize: 'medium',
  viewFieldKey: 'view-password-policy-field-',
  mainText: 'main',
  alphaNumeric: 'alphanumeric',
  alertDialog: 'alert',
  boolType: 'boolean',
  notificationTime: 3000,
};
export const passwordPolicyButton = {
  variant: 'primary',
  secVariant: 'secondary',
  size: 'medium',
};
export const viewPinPasswordPolicyDetailsLayout = [
  {
    key: 'name',
    label: translate('PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME'),
  },
  {
    key: 'description',
    label: translate('DESCRIPTION'),
  },
  {
    key: 'passwordType',
    label: translate('PASSWORD_POLICIES_MODULE.PASSWORD_TYPE'),
  },
  {
    key: 'pinLength',
    label: translate('PASSWORD_POLICIES_MODULE.PIN_LENGTH_LABEL'),
  },
];
export const viewAlphaPasswordPolicyDetailsLayout = [
  {
    key: 'name',
    label: translate('PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME'),
  },
  {
    key: 'description',
    label: translate('DESCRIPTION'),
  },
  {
    key: 'passwordType',
    label: translate('PASSWORD_POLICIES_MODULE.PASSWORD_TYPE'),
  },
  {
    key: 'minPasswordLength',
    label: translate('PASSWORD_POLICIES_MODULE.MINIMUM_PASSWORD_LENGTH'),
  },
  {
    key: 'hasUpperCaseChars',
    label: translate('PASSWORD_POLICIES_MODULE.UPPER_CASE_LABEL'),
  },
  {
    key: 'hasLowerCaseChars',
    label: translate('PASSWORD_POLICIES_MODULE.LOWER_CASE_LABEL'),
  },
  {
    key: 'hasNumbers',
    label: translate('PASSWORD_POLICIES_MODULE.NUMBER_LABEL'),
  },
  {
    key: 'hasSpecialChars',
    label: translate('PASSWORD_POLICIES_MODULE.SPECIAL_CHARS_LABEL'),
  },
  {
    key: 'allowedSpecialChars',
    label: translate('PASSWORD_POLICIES_MODULE.ALLOW_SPECIAL_CHAR'),
  },
];
