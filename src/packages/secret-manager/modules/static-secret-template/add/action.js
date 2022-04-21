import { AddStaticSecretTypes, GetPwdPoliciesTypes } from './constants';

export const postRequestStaticSecretTemplate = (data, history) => {
  return {
    type: AddStaticSecretTypes.ADD_STATIC_SECRET_REQUEST,
    payload: {
      data,
      history,
    },
  };
};

export const resetStaticSecretTemplate = () => {
  return {
    type: AddStaticSecretTypes.ADD_STATIC_SECRET_RESET,
  };
};

export const requestPwdPolicyList = () => {
  return {
    type: GetPwdPoliciesTypes.GET_STATIC_SECRET_REQUEST,
    payload: {},
  };
};
