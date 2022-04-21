import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { notificationMediumListConstants, notificationMediumDeleteConstants } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  result: [],
  pagination: {
    next: '',
    prev: '',
  },
  searchTerm: '',
};

const deleteInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
};

export const notificationMediumList = (state = initialState, action) => {
  switch (action.type) {
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        status: RESOURCE_STATUS.SUCCESS,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deleteNotificationMedium = (state = deleteInitialState, action) => {
  switch (action.type) {
    case notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
      };
    case notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_RESET:
      return {
        ...deleteInitialState,
      };
    default:
      return state;
  }
};
