import { AddPasswordPolicyTypes } from './constants';

export const requestAddPasswordPolicy = (passwordPolicyData, history) => {
  return {
    type: AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_REQUEST,
    payload: {
      passwordPolicyData,
      history,
    },
  };
};

export const loadingAddPasswordPolicy = () => {
  return { type: AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_LOADING };
};

export const successAddPasswordPolicy = (addPasswordPolicyData) => {
  return {
    type: AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_SUCCESS,
    payload: addPasswordPolicyData,
  };
};

export const failureAddPasswordPolicy = (error) => {
  return {
    type: AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_FAILURE,
    payload: error,
  };
};

export const resetAddPasswordPolicy = () => {
  return {
    type: AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_RESET,
    payload: {},
  };
};
