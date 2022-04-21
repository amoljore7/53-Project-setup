import { translate } from '../../../externalization';

export const AddPasswordPolicyTypes = {
  ADD_PASSWORD_POLICY_REQUEST: 'ADD_PASSWORD_POLICY_REQUEST',
  ADD_PASSWORD_POLICY_LOADING: 'ADD_PASSWORD_POLICY_LOADING',
  ADD_PASSWORD_POLICY_SUCCESS: 'ADD_PASSWORD_POLICY_SUCCESS',
  ADD_PASSWORD_POLICY_FAILURE: 'ADD_PASSWORD_POLICY_FAILURE',
  ADD_PASSWORD_POLICY_RESET: 'ADD_PASSWORD_POLICY_RESET',
};

export const classes = {
  passwordPolicyActionContainer: 'password-policy-action-container',
  passwordPolicySaveButton: 'password-policy-save-button',
  passwordPolicyErrorSnackbar: 'password-policy-error-snackbar',
};

export const alphanumericType = 'alphanumeric';
export const pinType = 'pin';
export const allowedSpecialCharsList = '~`!@#$%^&*()-_+=[]{}|/;:"?/\\.><,\'';
export const addPasswordPolicyNotificationTime = 3000;
export const minPasswordLength = 4;
export const maxPasswordPolicyCharacter = 30;
export const minPinLength = 1;

export const translatedStrings = {
  invalidSpecialChars: translate('PASSWORD_POLICIES_MODULE.INVALID_SPECIAL_CHARACTERS'),
  pageTitle: translate('PASSWORD_POLICIES_MODULE.ADD_PASSWORD_POLICY'),
  saveButton: translate('SAVE'),
  cancelButton: translate('CANCEL'),
  errorSnackbarTitle: translate('PASSWORD_POLICIES_MODULE.ERROR_SUBMITTING_FORM'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  cancelDialogMessage: translate('PASSWORD_POLICIES_MODULE.CANCEL_DIALOG_MESSAGE'),
  cancelDialogPrimaryButton: translate('YES_DISCARD'),
  noButton: translate('NO'),
  passwordPolicyNameValidation: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME_VALIDATION'
  ),
  passwordPolicyNameExistValidation: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME_EXIST_VALIDATION'
  ),
  pinLengthValidation: translate('PASSWORD_POLICIES_MODULE.PIN_LENGTH_VALIDATION'),
  pinLengthMinValidation: translate('PASSWORD_POLICIES_MODULE.PIN_LENGTH_MIN_VALIDATION'),
  passwordLengthValidation: translate('PASSWORD_POLICIES_MODULE.PASSWORD_LENGTH_VALIDATION'),
  passwordLengthMinValidation: translate('PASSWORD_POLICIES_MODULE.PASSWORD_LENGTH_MIN_VALIDATION'),
  allowedSpecialCharsValidation: translate(
    'PASSWORD_POLICIES_MODULE.ALLOWED_SPECIAL_CHARACTERS_VALIDATION'
  ),
  addPasswordPolicySuccessMessage: translate(
    'PASSWORD_POLICIES_MODULE.ADD_PASSWORD_POLICY_SUCCESS_MESSAGE'
  ),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
};
