import { DeleteVaultTypes, RotateVaultKeyTypes } from './constants';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export const deleteVault = (state = initialState, action) => {
  switch (action.type) {
    case DeleteVaultTypes.DELETE_VAULT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case DeleteVaultTypes.DELETE_VAULT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case DeleteVaultTypes.DELETE_VAULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.errorStatus,
      };

    default:
      return state;
  }
};

const rotateVaultKeyInitialState = {
  loading: false,
  error: null,
  rotateVaultStatusCode: null,
};

export const rotateVaultKey = (state = rotateVaultKeyInitialState, action) => {
  switch (action.type) {
    case RotateVaultKeyTypes.ROTATE_VAULT_KEY_LOADING:
      return {
        ...state,
        loading: true,
      };

    case RotateVaultKeyTypes.ROTATE_VAULT_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        rotateVaultStatusCode: action?.payload?.status,
        error: null,
      };

    case RotateVaultKeyTypes.ROTATE_VAULT_KEY_FAILURE:
      return {
        ...state,
        loading: false,
        rotateVaultStatusCode: null,
        error: action?.payload?.errorStatus,
      };

    default:
      return state;
  }
};
