import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { EditPasswordPolicyTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
};

export const editPasswordPolicyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
      };
    case EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
