import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import { translate } from '../../externalization';

const translatedStrings = {
  nameValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.NAME_ENTER'),
  parametersValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.ADD_FIELD_AT_LEAST_ONE'),
  rotationIntervalValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.ENTER_NUMBER'),
  rotationIntervalDaysValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.ENTER_VALID_DAYS'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_LENGTH_MAX'),
  fieldNameReq: translate('STATIC_SECRETS_TEMPLATE_MODULE.FIELD_NAME_REQ'),
};

const maxInputChars = 30;
const maxDescriptionChars = 255;

export const secretType = yup
  .string()
  .required(translatedStrings.nameValidation)
  .trim()
  .max(maxInputChars, translatedStrings.inputNameMaxChar);

export const description = yup
  .string()
  .max(maxDescriptionChars, translatedStrings.descriptionMaxLength);

export const isPasswordSelected = yup.boolean();
export const parameters = yup.array().min(1, translatedStrings.parametersValidation);
export const passwordPolicyId = yup.string();
export const rotationInterval = yup.string().when('isPasswordSelected', {
  is: true,
  then: yup
    .string()
    .default(null)
    .nullable()
    .test(name, (value, context) => {
      if (isEmpty(value?.trim())) return true;
      if (value === null) return true;
      if (isNaN(Number(value))) {
        return context.createError({
          path: context.path,
          message: translatedStrings.rotationIntervalValidation,
        });
      }
      const days = Number(value);
      if (days > 0 && days <= 60) {
        return true;
      }
      return context.createError({
        path: context.path,
        message: translatedStrings.rotationIntervalDaysValidation,
      });
    }),
  otherwise: yup.string().nullable().default(null),
});

export const fieldName = yup
  .string()
  .required(translatedStrings?.fieldNameReq)
  .trim()
  .max(30, translatedStrings?.inputNameMaxChar);

export const fieldDescription = yup
  .string()
  .max(maxDescriptionChars, translatedStrings.descriptionMaxLength);
export const fieldMask = yup.string();
export const fieldRequired = yup.string();
export const fieldType = yup.string();
