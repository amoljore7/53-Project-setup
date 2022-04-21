import * as yup from 'yup';
import useValidation from '../../../../components/use-validation-hook';
import {
  name,
  description,
  rotationTime,
  notificationList,
  userList,
  tagList,
  channelList,
  isChannelRequired,
} from './common-validation';
import { translatedStrings } from './create/constants';

export const getUsersId = (userList = []) => {
  const userIds = userList.map((option) => {
    return option.userId;
  });
  return userIds;
};

export const getTagsId = (tagList = []) => {
  const tagIds = tagList.map((option) => {
    return option?.userTagId;
  });
  return tagIds;
};

export const getChannelId = (channelList = []) => {
  const channelIds = channelList.map((option) => {
    return option?.channelId;
  });
  return channelIds;
};

export const getDefaultNotificationMediumId = (name, notificationMediumList) => {
  if (notificationMediumList && notificationMediumList?.length) {
    const mediumId = notificationMediumList.find((element) => element?.name === name);
    return mediumId?.id || translatedStrings.none;
  } else {
    return translatedStrings.none;
  }
};

const inputFormValidationSchema = yup.object({
  name,
  description,
  rotationTime,
  notificationList,
  userList,
  tagList,
  channelList,
  isChannelRequired,
});

export const validationHook = (onSubmitCallback) => {
  return useValidation({
    initialValues: {
      name: '',
      description: '',
      rotationTime: '',
      notificationList: '',
      userList: [],
      tagList: [],
      channelList: [],
      isChannelRequired: false,
    },
    validationSchema: inputFormValidationSchema,
    onSubmit: onSubmitCallback,
  });
};
