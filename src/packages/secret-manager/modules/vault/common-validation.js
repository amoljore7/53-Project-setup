import * as yup from 'yup';
import { translate } from '../../externalization';
import isEmpty from 'lodash/isEmpty';

const validation = {
  vaultName: translate('CREATE_VAULT_MODULE.CREATE_VAULT_NAME_VALIDATION'),
  vaultRotationTime: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_VALIDATION'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('DESCRIPTION_LENGTH_MAX'),
  notificationListErrorMessage: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_ERROR'),
  userListMessage: translate('CREATE_VAULT_MODULE.VAULT_USER_ERROR'),
  tagListMessage: translate('CREATE_VAULT_MODULE.VAULT_TAG_ERROR'),
  channelListMessage: translate('CREATE_VAULT_MODULE.VAULT_CHANNEL_ERROR'),
};

const maxInputChars = 30;
const maxDescriptionChars = 255;
const minRotationInterval = 1;
const maxRotationInterval = 60;

export const name = yup
  .string()
  .required(validation.vaultName)
  .trim()
  .max(maxInputChars, validation.inputNameMaxChar);

export const description = yup.string().max(maxDescriptionChars, validation.descriptionMaxLength);
export const notificationList = yup.string().required(validation.notificationListErrorMessage);

export const userList = yup
  .array()
  .test('userList', validation.userListMessage, (value, context) => {
    const userList = !isEmpty(value);
    const channelList = !isEmpty(context.parent.channelList);
    const isChannelRequired = context.parent.isChannelRequired;
    const tagList = !isEmpty(context.parent.tagList);
    return userList || tagList || (isChannelRequired && channelList);
  })
  .nullable();

export const tagList = yup
  .array()
  .test('tagList', validation.tagListMessage, (value, context) => {
    const channelList = !isEmpty(context.parent.channelList);
    const isChannelRequired = context.parent.isChannelRequired;
    const userList = !isEmpty(context.parent.userList);
    const tagList = !isEmpty(context.parent.tagList);
    return tagList || userList || (isChannelRequired && channelList);
  })
  .nullable();

export const channelList = yup.array().when('isChannelRequired', {
  is: true,
  then: yup
    .array()
    .test('channelList', validation.channelListMessage, (value, context) => {
      const channelList = !isEmpty(context.parent.channelList);
      const userList = !isEmpty(context.parent.userList);
      const tagList = !isEmpty(context.parent.tagList);
      return tagList || userList || channelList;
    })
    .nullable(),
  otherwise: yup.array().nullable(true),
});

export const isChannelRequired = yup.boolean();

export const rotationTime = yup
  .number()
  .typeError(validation.vaultRotationTime)
  .min(minRotationInterval, 'Min number of days 1')
  .max(maxRotationInterval, 'Max number of days 60');
