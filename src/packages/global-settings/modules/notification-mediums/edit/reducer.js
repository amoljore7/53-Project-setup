import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { editNotificationMediumTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const editNotificationMediumData = (state = initialState, action) => {
  switch (action.type) {
    case editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
