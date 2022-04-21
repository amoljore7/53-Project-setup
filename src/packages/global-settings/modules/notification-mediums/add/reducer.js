import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { AddNotificationMediumTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const addNotificationMediumData = (state = initialState, action) => {
  switch (action.type) {
    case AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
