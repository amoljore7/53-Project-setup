import { SecretViewDataTypes } from './constants';

export const requestStaticSecretTemplateById = (roleId, history) => {
  return {
    type: SecretViewDataTypes.SECRET_VIEW_DATA_REQUEST,
    payload: { roleId, history },
  };
};

export const resetStaticSecretTemplateView = () => {
  return {
    type: SecretViewDataTypes.SECRET_VIEW_DATA_RESET,
  };
};

export const loadingStaticSecretTemplateView = () => {
  return {
    type: SecretViewDataTypes.SECRET_VIEW_DATA_LOADING,
  };
};

export const successStaticSecretTemplateView = (roleViewData) => {
  return {
    type: SecretViewDataTypes.SECRET_VIEW_DATA_SUCCESS,
    payload: roleViewData,
  };
};

export const failStaticSecretTemplateView = (reason) => {
  return {
    type: SecretViewDataTypes.SECRET_VIEW_DATA_FAILURE,
    payload: { error: reason },
  };
};
