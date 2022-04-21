import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { AddPasswordPolicyTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const addPasswordPolicyData = (state = initialState, action) => {
  switch (action.type) {
    case AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
