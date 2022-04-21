import * as yup from 'yup';
import { translate } from '../../externalization';

const translatedStrings = {
  nameRequiredMessage: translate('SECRET_CREATE_MODULE.NAME_REQUIRED_MESSAGE'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_LENGTH_MAX'),
  secretTypeRequiredMessage: translate('SECRET_CREATE_MODULE.SECRET_TYPE_REQUIRED_MESSAGE'),
};

const maxInputChars = 30;
const maxDescriptionChars = 255;

export const name = yup
  .string()
  .required(translatedStrings.nameRequiredMessage)
  .max(maxInputChars, translatedStrings.inputNameMaxChar);

export const description = yup
  .string()
  .max(maxDescriptionChars, translatedStrings.descriptionMaxLength);

export const secretType = yup.string().required(translatedStrings.secretTypeRequiredMessage);
