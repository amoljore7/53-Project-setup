import { EditPermissionsTypes } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const editPermissionsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const editPermission = (state = editPermissionsInitialState, action) => {
  switch (action.type) {
    case EditPermissionsTypes.PERMISSIONS_EDIT_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };

    case EditPermissionsTypes.PERMISSIONS_EDIT_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case EditPermissionsTypes.PERMISSIONS_EDIT_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.errorStatus,
      };
    case EditPermissionsTypes.PERMISSIONS_EDIT_FLUSH_DATA:
      return {
        ...state,
        ...editPermissionsInitialState,
      };

    default:
      return state;
  }
};
