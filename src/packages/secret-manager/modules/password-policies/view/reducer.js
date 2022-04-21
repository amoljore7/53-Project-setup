import { PasswordPolicyViewConstants } from './constants';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export const passwordPolicyView = (state = initialState, action) => {
  switch (action.type) {
    case PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
