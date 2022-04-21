import { VaultLandingTypes } from './constants';

const initialState = {
  loading: false,
  error: null,
  vaultStatusCode: null,
  data: {},
};

export const vaultLanding = (state = initialState, action) => {
  switch (action.type) {
    case VaultLandingTypes.VAULT_LANDING_LOADING:
      return {
        ...state,
        loading: true,
      };

    case VaultLandingTypes.VAULT_LANDING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        vaultStatusCode: action.payload.status,
        error: null,
      };

    case VaultLandingTypes.VAULT_LANDING_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        vaultStatusCode: action.payload.status,
        error: action.payload.data.message,
      };

    default:
      return state;
  }
};
