import BritiveVaultImg from '../../../../assets/img_vault.svg';
import PasswordPoliciesImg from '../../../../assets/img_pwd_policy.svg';
import VaultDetails from '../../../../assets/img_vault_config.svg';
import StaticSecretTemplate from '../../../../assets/img_static_secret_template.svg';
import { translate } from '../../externalization';
import {
  passwordPolicyActions,
  staticSecretTemplateActions,
  vaultActions,
} from '../../../../components/batch-eval/constants';

export const VaultLandingTypes = {
  VAULT_LANDING_REQUEST: 'VAULT_LANDING_REQUEST',
  VAULT_LANDING_LOADING: 'VAULT_LANDING_LOADING',
  VAULT_LANDING_SUCCESS: 'VAULT_LANDING_SUCCESS',
  VAULT_LANDING_FAILURE: 'VAULT_LANDING_FAILURE',
  VAULT_LANDING_FLUSH_DATA: 'VAULT_LANDING_FLUSH_DATA',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  OPEN_SPINNER: 'OPEN_SPINNER',
};

export const classes = {
  secretLandingContainer: 'secret-landing-container',
  groupTilesContainer: 'group-tiles-container',
  groupTitle: 'group-title',
  groupCard: 'group-card',
  secretCardWrapper: 'secret-card-wrapper',
  backButton: 'sm-back-to-system-administration-button',
  noAccessBanner: 'sm-no-access-banner',
};

export const pageTitle = translate('SECRETS_MANAGER');
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    route: '/admin/secret-manager',
    name: translate('SECRETS_MANAGER'),
  },
];
export const groupTilesDetails = [
  {
    groupTitle: translate('BRITIVE_VAULT'),
    tilesDetails: [
      {
        title: translate('BRITIVE_VAULT'),
        img: BritiveVaultImg,
        link: '/vault',
        allPermissions: [...Object.values(vaultActions)],
      },
    ],
  },
  {
    groupTitle: translate('CONFIGURATION'),
    tilesDetails: [
      {
        title: translate('BRITIVE_VAULT_DETAILS'),
        img: VaultDetails,
        link: '/vault/details',
        allPermissions: [vaultActions.read],
      },
      {
        title: translate('PASSWORD_POLICIES'),
        img: PasswordPoliciesImg,
        link: '/password-policies',
        allPermissions: [...Object.values(passwordPolicyActions)],
      },
      {
        title: 'Static Secret Templates',
        img: StaticSecretTemplate,
        link: '/vault/static-secret',
        allPermissions: [...Object.values(staticSecretTemplateActions)],
      },
    ],
  },
];

export const title = {
  britiveVault: 'Britive Vault',
  britiveVaultDetails: 'Britive Vault Details',
};

export const backToSysAdminBtnTxt = translate('BACK_TO_SYS_ADMIN_BUTTON');
export const noAccessOnSecretManagerTxt = translate('NO_ACCESS_To_SECRET_MANAGER');
export const cardKeyPrefix = 'card-';
export const groupTileKeyPrefix = 'group-tile-';
export const mainRole = 'main';

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
export const errorCodeForNoVault = 'SM-0022';
