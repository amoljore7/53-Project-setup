import { EditVaultTypes } from './constants';

const initialState = {
  loading: false,
  error: null,
};

export const editVault = (state = initialState, action) => {
  switch (action.type) {
    case EditVaultTypes.EDIT_VAULT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case EditVaultTypes.EDIT_VAULT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case EditVaultTypes.EDIT_VAULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.errorStatus,
      };

    case EditVaultTypes.EDIT_VAULT_FLUSH_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
