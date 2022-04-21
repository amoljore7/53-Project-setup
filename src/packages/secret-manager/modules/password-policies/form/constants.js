import { translate } from '../../../externalization';

export const classes = {
  passwordPolicyFormContainer: 'password-policy-form-container',
  passwordPolicyFormSpacing: 'password-policy-form-spacing',
  alignWithLoader: 'align-with-loader',
  formLoader: 'form-loader',
  marginTop32px: 'margin-top-32px',
};

export const alphanumericType = 'alphanumeric';
export const pinType = 'pin';
export const allowedSpecialCharsList = '~`!@#$%^&*()-_+=[]{}|/;:"?/\\.><,\'';
export const passwordTypeOptions = [
  {
    label: translate('PASSWORD_POLICIES_MODULE.ALPHANUMERIC_PASSWORD_LABEL'),
    value: 'alphanumeric',
  },
  {
    label: translate('PASSWORD_POLICIES_MODULE.PIN_LABEL'),
    value: 'pin',
  },
];
export const alphanumericPasswordRadioList = [
  {
    fieldKey: 'hasUpperCaseChars',
    label: translate('PASSWORD_POLICIES_MODULE.UPPER_CASE_LABEL'),
  },
  {
    fieldKey: 'hasLowerCaseChars',
    label: translate('PASSWORD_POLICIES_MODULE.LOWER_CASE_LABEL'),
  },
  {
    fieldKey: 'hasNumbers',
    label: translate('PASSWORD_POLICIES_MODULE.NUMBER_LABEL'),
  },
  {
    fieldKey: 'hasSpecialChars',
    label: translate('PASSWORD_POLICIES_MODULE.SPECIAL_CHARS_LABEL'),
  },
];
export const passwordDetailOptions = [
  {
    label: translate('YES'),
    value: 'true',
  },
  {
    label: translate('NO'),
    value: 'false',
  },
];
export const testIDList = {
  passwordTypeRadio: 'password-type-radio',
  pinLengthField: 'pin-length-field',
  minimumPasswordLengthField: 'minimum-password-length-field',
  allowedSpecialCharsField: 'allowed-special-chars-field',
};

export const translatedStrings = {
  passwordPolicyNameLabel: translate('PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME'),
  descriptionLabel: translate('DESCRIPTION'),
  descriptionHelperLabel: translate('OPTIONAL'),
  passwordTypeLabel: translate('PASSWORD_POLICIES_MODULE.PASSWORD_TYPE'),
  pinLengthLabel: translate('PASSWORD_POLICIES_MODULE.PIN_LENGTH_LABEL'),
  pinMandatoryText: translate('PASSWORD_POLICIES_MODULE.PIN_MANDATORY_TEXT'),
  minimumPasswordLengthLabel: translate('PASSWORD_POLICIES_MODULE.MINIMUM_PASSWORD_LENGTH'),
  allowedSpecialCharactersLabel: translate('PASSWORD_POLICIES_MODULE.ALLOWED_SPECIAL_CHARACTERS'),
};
export const passwordTypeOptionsEdit = [
  {
    label: translate('PASSWORD_POLICIES_MODULE.ALPHANUMERIC_PASSWORD_LABEL'),
    value: 'alphanumeric',
    disabled: true,
  },
  {
    label: translate('PASSWORD_POLICIES_MODULE.PIN_LABEL'),
    value: 'pin',
    disabled: true,
  },
];
