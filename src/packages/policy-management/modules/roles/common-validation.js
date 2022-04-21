import * as yup from 'yup';
import { translate } from '../../externalization';

const validations = {
  nameValidation: translate('ROLES_MODULE.ROLE_NAME_VALIDATION'),
  permissionValidation: translate('ROLES_MODULE.PERMISSION_VALIDATION'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_MAX_CHAR'),
};

const maxInputChars = 30;
const maxDescriptionChars = 255;

export const name = yup
  .string()
  .required(validations.nameValidation)
  .trim()
  .max(maxInputChars, validations.inputNameMaxChar);

export const description = yup.string().max(maxDescriptionChars, validations.descriptionMaxLength);

export const permissions = yup.array().min(1, validations.permissionValidation);
