import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { EditRoleTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const editRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EditRoleTypes.EDIT_ROLE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case EditRoleTypes.EDIT_ROLE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case EditRoleTypes.EDIT_ROLE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action?.payload,
      };
    case EditRoleTypes.EDIT_ROLE_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
