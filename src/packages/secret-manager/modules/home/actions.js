import { VaultLandingTypes } from './constants';

const getVaultLandingRequest = () => ({
  type: VaultLandingTypes.VAULT_LANDING_REQUEST,
});

export { getVaultLandingRequest };
