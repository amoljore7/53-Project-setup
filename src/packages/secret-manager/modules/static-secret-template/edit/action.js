import { EditStaticSecretTypes } from './constants';

export const editRequestStaticSecretTemplate = (data, id, history) => {
  return {
    type: EditStaticSecretTypes.EDIT_STATIC_SECRET_REQUEST,
    payload: {
      data,
      id,
      history,
    },
  };
};

export const resetEditSecretTemplate = () => ({
  type: EditStaticSecretTypes.EDIT_STATIC_SECRET_RESET,
});
