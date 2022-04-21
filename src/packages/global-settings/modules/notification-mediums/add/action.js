import { AddNotificationMediumTypes } from './constants';

export const requestAddNotificationMedium = (notificationMediumData, history) => {
  return {
    type: AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_REQUEST,
    payload: {
      notificationMediumData,
      history,
    },
  };
};

export const loadingAddNotificationMedium = () => {
  return { type: AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_LOADING };
};

export const successAddNotificationMedium = (addNotificationMediumData) => {
  return {
    type: AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_SUCCESS,
    payload: addNotificationMediumData,
  };
};

export const failureAddNotificationMedium = (error) => {
  return {
    type: AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_FAILURE,
    payload: error,
  };
};

export const resetAddNotificationMedium = () => {
  return {
    type: AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_RESET,
    payload: {},
  };
};
