import * as yup from 'yup';
import { translate } from '../../externalization';

export const translatedStrings = {
  passwordPolicyNameValidation: translate(
    'PASSWORD_POLICIES_MODULE.PASSWORD_POLICY_NAME_VALIDATION'
  ),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_LENGTH_MAX'),
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
  invalidSpecialChars: translate('PASSWORD_POLICIES_MODULE.INVALID_SPECIAL_CHARACTERS'),
  accessDenied: translate('ACCESS_DENIED'),
};

const maxDescriptionChars = 255;
const alphanumericType = 'alphanumeric';
const pinType = 'pin';
const minPasswordLength = 4;
const maxPasswordPolicyCharacter = 30;
const minPinLength = 1;

export const name = yup
  .string()
  .required(translatedStrings.passwordPolicyNameValidation)
  .max(maxPasswordPolicyCharacter, translatedStrings.inputNameMaxChar)
  .trim();

export const description = yup
  .string()
  .max(maxDescriptionChars, translatedStrings.descriptionMaxLength);

export const passwordType = yup.string().oneOf([alphanumericType, pinType]);
export const pinLength = yup.number().when('passwordType', {
  is: pinType,
  then: yup
    .number()
    .typeError(translatedStrings.pinLengthValidation)
    .min(minPinLength, translatedStrings.pinLengthMinValidation),
  otherwise: yup.number().nullable().default(null),
});
export const minPasswordLengthValidation = yup.number().when('passwordType', {
  is: alphanumericType,
  then: yup
    .number()
    .typeError(translatedStrings.passwordLengthValidation)
    .min(minPasswordLength, translatedStrings.passwordLengthMinValidation),
  otherwise: yup.number().nullable().default(null),
});
export const hasUpperCaseChars = yup.boolean().when('passwordType', {
  is: alphanumericType,
  then: yup.boolean(),
});

export const hasLowerCaseChars = yup.boolean().when('passwordType', {
  is: alphanumericType,
  then: yup.boolean(),
});

export const hasNumbers = yup.boolean().when('passwordType', {
  is: alphanumericType,
  then: yup.boolean(),
});
export const hasSpecialChars = yup.boolean().when('passwordType', {
  is: alphanumericType,
  then: yup.boolean(),
});
export const allowedSpecialChars = yup.string().when('hasSpecialChars', {
  is: true,
  then: yup
    .string()
    .trim()
    .required(translatedStrings.allowedSpecialCharsValidation)
    .test(name, translatedStrings.invalidSpecialChars, async (value) => {
      const digitRex = /[a-zA-Z0-9]/g;
      return !digitRex.test(value);
    }),
  otherwise: yup.string().nullable(),
});
