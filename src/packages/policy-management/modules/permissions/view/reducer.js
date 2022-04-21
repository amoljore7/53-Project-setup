import { GetViewPermissionsTypes } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const viewPermissionsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const viewPermissions = (state = viewPermissionsInitialState, action) => {
  switch (action.type) {
    case GetViewPermissionsTypes.PERMISSIONS_VIEW_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case GetViewPermissionsTypes.PERMISSIONS_VIEW_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case GetViewPermissionsTypes.PERMISSIONS_VIEW_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
