import { createSecretTypes } from './constants';

export const resetCreateSecretAction = () => {
  return {
    type: createSecretTypes.CREATE_SECRET_RESET,
  };
};

export const createSecretAction = (payloadBody, parents, history) => {
  return {
    type: createSecretTypes.CREATE_SECRET_REQUEST,
    payload: {
      payloadBody,
      parents,
      history,
    },
  };
};
