import * as yup from 'yup';
import { translate } from '../../externalization';
import { appsConsumer } from './add/constants';

const validations = {
  permissionNameEnter: translate('PERMISSION_MODULE.PERMISSION_NAME_ENTER'),
  permissionConsumer: translate('PERMISSION_MODULE.PERMISSION_CONSUMER'),
  permissionResource: translate('PERMISSION_MODULE.PERMISSION_RESOURCE'),
  permissionResourceSelect: translate('PERMISSION_MODULE.PERMISSION_RESOURCE_SELECT'),
  permissionAction: translate('PERMISSION_MODULE.PERMISSION_ACTION'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_MAX_CHAR'),
};

const maxInputChars = 30;
const maxDescriptionChars = 255;

export const name = yup
  .string()
  .required(validations.permissionNameEnter)
  .trim()
  .max(maxInputChars, validations.inputNameMaxChar);

export const description = yup.string().max(maxDescriptionChars, validations.descriptionMaxLength);

export const consumer = yup.object().required(validations.permissionConsumer).nullable();

export const resources = yup.string().required(validations.permissionResource);

export const applications = yup.array().when('consumer', {
  is: (consumer) => consumer?.name === appsConsumer,
  then: yup
    .array()
    .min(1, validations.permissionResourceSelect)
    .required(validations.permissionResourceSelect),
  otherwise: yup.array().length(0),
});

export const actions = yup
  .array()
  .min(1, validations.permissionAction)
  .required(validations.permissionAction);
