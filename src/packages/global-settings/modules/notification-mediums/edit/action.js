import { editNotificationMediumTypes } from './constants';

export const requestEditNotificationMedium = (id, notificationMediumData, history) => {
  return {
    type: editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_REQUEST,
    payload: {
      id,
      notificationMediumData,
      history,
    },
  };
};

export const loadingEditNotificationMedium = () => {
  return { type: editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_LOADING };
};

export const successEditNotificationMedium = (editNotificationMediumData) => {
  return {
    type: editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_SUCCESS,
    payload: editNotificationMediumData,
  };
};

export const failureEditNotificationMedium = (error) => {
  return {
    type: editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_FAILURE,
    payload: error,
  };
};

export const resetEditNotificationMedium = () => {
  return {
    type: editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_RESET,
    payload: {},
  };
};
