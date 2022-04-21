import { RESOURCE_STATUS } from '../../../../../utils/common-constants.js';
import { RoleViewDataTypes, RoleDeleteDataTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const roleViewDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoleViewDataTypes.ROLE_VIEW_DATA_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case RoleViewDataTypes.ROLE_VIEW_DATA_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case RoleViewDataTypes.ROLE_VIEW_DATA_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case RoleViewDataTypes.ROLE_VIEW_DATA_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const deleteInitialState = {
  loading: false,
};
export const roleDeleteData = (state = deleteInitialState, action) => {
  switch (action.type) {
    case RoleDeleteDataTypes.ROLE_DELETE_DATA_LOADING:
      return {
        loading: true,
      };
    case RoleDeleteDataTypes.ROLE_DELETE_DATA_SUCCESS:
      return {
        loading: false,
      };
    case RoleDeleteDataTypes.ROLE_DELETE_DATA_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};
