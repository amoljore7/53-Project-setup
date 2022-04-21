import { notificationMediumListConstants, UsersType, TagsType, ChannelType } from './constants';

export const requestNotificationMediumList = () => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_REQUEST,
  };
};

export const successNotificationMediumList = (notificationMediumData) => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_SUCCESS,
    payload: notificationMediumData,
  };
};

export const failureNotificationMediumList = (error) => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_FAILURE,
    payload: error,
  };
};

export const requestUsersList = () => {
  return {
    type: UsersType.VAULT_USERS_REQUEST,
  };
};

export const requestTagsList = () => {
  return {
    type: TagsType.TAGS_REQUEST,
  };
};

export const requestChannelList = (channelId) => {
  return {
    type: ChannelType.SLACK_CHANNEL_REQUEST,
    payload: channelId,
  };
};

export const flushUsersList = () => ({
  type: UsersType.VAULT_USERS_FLUSH,
});
export const flushTagsList = () => ({
  type: TagsType.TAGS_FLUSH,
});
export const flushChannelsList = () => ({
  type: ChannelType.SLACK_CHANNEL_FLUSH,
});

export const flushNotificationMediumList = () => ({
  type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_FLUSH,
});
