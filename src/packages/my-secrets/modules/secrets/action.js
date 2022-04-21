import { VaultLandingTypes } from './constants';

export const requestVaultLanding = () => {
  return {
    type: VaultLandingTypes.VAULT_LANDING_REQUEST,
  };
};

export const loadingVaultLanding = () => {
  return { type: VaultLandingTypes.VAULT_LANDING_LOADING };
};

export const successVaultLanding = (response) => {
  return {
    type: VaultLandingTypes.VAULT_LANDING_SUCCESS,
    payload: {
      ...response,
    },
  };
};

export const failureVaultLanding = (response) => {
  return {
    type: VaultLandingTypes.VAULT_LANDING_FAILURE,
    payload: { ...response },
  };
};
