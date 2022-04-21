import { notificationMediumViewConstants } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

RESOURCE_STATUS;
const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const notificationMediumView = (state = initialState, action) => {
  switch (action.type) {
    case notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
