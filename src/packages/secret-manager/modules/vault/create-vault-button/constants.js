import { translate } from '../../../externalization';

export const classes = {
  createVaultButton: 'create-vault-button',
  createVaultPage: 'create-vault-page',
};

export const translatedStrings = {
  britiveVaultButton: translate('CREATE_VAULT_MODULE.CREATE_VAULT_BUTTON'),
  britiveVaultLabel: translate('CREATE_VAULT_MODULE.CREATE_VAULT_LABEL'),
  britiveVaultNoAccess: translate('CREATE_VAULT_MODULE.BACK_BUTTON'),
  britiveVaultNotCreatedLabel: translate('CREATE_VAULT_MODULE.VAULT_NO_ACCESS_LABEL'),
  accessDenied: translate('ACCESS_DENIED'),
};

export const pageTitle = 'Britive Vault';
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('SECRETS_MANAGER'),
    route: '/admin/secret-manager',
  },

  {
    name: translate('BRITIVE_VAULT'),
  },
];

export const vaultAccess = {
  createVault: 'sm.vault.create',
  readVault: 'sm.vault.read',
  updateVault: 'sm.vault.update',
  deleteVault: 'sm.vault.delete',
  rotateVault: 'sm.key.rotate',
  viewSecretNode: 'sm.node.list',
  vaultList: 'sm.vault.list',
};
export const isAllow = 'Allow';
