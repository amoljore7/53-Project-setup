import { EditVaultTypes } from './constants';

const updateVaultDetailsRequest = (formData, id, history) => {
  return {
    type: EditVaultTypes.EDIT_VAULT_REQUEST,
    payload: {
      formData,
      id,
      history,
    },
  };
};

const flushVaultDetailsRequest = () => {
  return {
    type: EditVaultTypes.EDIT_VAULT_FLUSH_DATA,
  };
};

export { updateVaultDetailsRequest, flushVaultDetailsRequest };
