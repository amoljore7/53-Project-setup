import { notificationMediumViewConstants } from './constants';

export const requestViewNotificationMedium = (payload) => {
  return {
    type: notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_REQUEST,
    payload,
  };
};

export const loadingViewNotificationMedium = () => {
  return { type: notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_LOADING };
};

export const successViewNotificationMedium = (viewNotificationMediumData) => {
  return {
    type: notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_SUCCESS,
    payload: viewNotificationMediumData,
  };
};

export const failureViewNotificationMedium = (error) => {
  return {
    type: notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_FAILURE,
    payload: error,
  };
};

export const resetViewNotificationMedium = () => ({
  type: notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_RESET,
});
