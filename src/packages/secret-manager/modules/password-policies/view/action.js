import { PasswordPolicyViewConstants } from './constants';

export const requestViewPasswordPolicy = (payload) => {
  return {
    type: PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_REQUEST,
    payload,
  };
};

export const loadingViewPasswordPolicy = () => {
  return { type: PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_LOADING };
};

export const successViewPasswordPolicy = (viewPasswordPolicyData) => {
  return {
    type: PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_SUCCESS,
    payload: viewPasswordPolicyData,
  };
};

export const failureViewPasswordPolicy = (error) => {
  return {
    type: PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_FAILURE,
    payload: error,
  };
};

export const resetViewPasswordPolicy = () => {
  return {
    type: PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_RESET,
    payload: {},
  };
};
