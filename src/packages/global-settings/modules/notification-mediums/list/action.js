import { notificationMediumListConstants, notificationMediumDeleteConstants } from './constants';

export const requestNotificationMediumList = () => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_REQUEST,
  };
};

export const loadingNotificationMediumList = () => {
  return { type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOADING };
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

export const requestNotificationMediumDelete = (id) => {
  return {
    type: notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_REQUEST,
    payload: {
      id,
    },
  };
};

export const loadingNotificationMediumDelete = () => {
  return { type: notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_LOADING };
};

export const successNotificationMediumDelete = () => {
  return {
    type: notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_SUCCESS,
  };
};

export const failureNotificationMediumDelete = (error) => {
  return {
    type: notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_FAILURE,
    payload: error,
  };
};

export const updateNotificationMediumSearchTerm = (search) => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_SEARCH_TERM,
    payload: search,
  };
};

export const resetNotificationMediumDelete = () => ({
  type: notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_RESET,
});

export const requestNotificationMediumListLoadMore = () => ({
  type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_REQUEST,
});

export const loadingNotificationMediumListLoadMore = () => {
  return { type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_LOADING };
};

export const successNotificationMediumListLoadMore = (notificationMediumData) => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_SUCCESS,
    payload: notificationMediumData,
  };
};

export const failureNotificationMediumListLoadMore = (error) => {
  return {
    type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_FAILURE,
    payload: error,
  };
};
