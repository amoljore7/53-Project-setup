import { updateSecretTypes } from './constants';

export const updateSecretAction = (payloadBody, parents, history) => {
  return {
    type: updateSecretTypes.UPDATE_SECRET_REQUEST,
    payload: {
      payloadBody,
      parents,
      history,
    },
  };
};

export const resetEditSecretAction = () => {
  return {
    type: updateSecretTypes.UPDATE_SECRET_RESET,
  };
};
