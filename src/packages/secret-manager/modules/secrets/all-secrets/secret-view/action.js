import { secretDetailsTypes, secretTemplateDetailsTypes } from './constants';

export const getSecretDetailsAction = (parents, data) => {
  return {
    type: secretDetailsTypes.SECRET_DETAILS_REQUEST,
    payload: {
      parents,
      data,
    },
  };
};

export const resetSecretDetails = () => {
  return {
    type: secretDetailsTypes.SECRET_DETAILS_RESET,
  };
};

export const resetSecretTemplateDetails = () => {
  return {
    type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_RESET,
  };
};
