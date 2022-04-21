import { translate } from '../../../externalization';

export const DeleteVaultTypes = {
  DELETE_VAULT_REQUEST: 'DELETE_VAULT_REQUEST',
  DELETE_VAULT_LOADING: 'DELETE_VAULT_LOADING',
  DELETE_VAULT_SUCCESS: 'DELETE_VAULT_SUCCESS',
  DELETE_VAULT_FAILURE: 'DELETE_VAULT_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  OPEN_SPINNER: 'OPEN_SPINNER',
};
export const RotateVaultKeyTypes = {
  ROTATE_VAULT_KEY_REQUEST: 'ROTATE_VAULT_KEY_REQUEST',
  ROTATE_VAULT_KEY_LOADING: 'ROTATE_VAULT_KEY_LOADING',
  ROTATE_VAULT_KEY_SUCCESS: 'ROTATE_VAULT_KEY_SUCCESS',
  ROTATE_VAULT_KEY_FAILURE: 'ROTATE_VAULT_KEY_FAILURE',
};

export const classes = {
  vaultDetailsButton: 'vault-details-button',
  vaultDetailsForm: 'vault-details-form',
  cancelBtn: 'cancel-btn',
  marginTop32: 'vault-details-margin-top-32',
  marginTop8: 'vault-details-margin-top-8',
  rotationMessageWrapper: 'rotation-message-wrapper',
  vaultHeaderClass: 'vault-header-class',
  viewPillMainContainer: 'view-pill-main-container',
  viewPillContainer: 'view-pill-container',
};

export const translatedStrings = {
  noneValue: translate('NONE'),
  pageTitle: translate('BRITIVE_VAULT'),
  vaultName: translate('VAULT_NAME'),
  vaultDescription: translate('DESCRIPTION'),
  keyRotation: translate('VAULT_DETAILS_MODULE.DEFAULT_KEY_ROTATION_INTERVAL'),
  lastKeyRotation: translate('VAULT_DETAILS_MODULE.LAST_KEY_ROTATION'),
  nextKeyRotation: translate('VAULT_DETAILS_MODULE.NEXT_KEY_ROTATION'),
  deleteVaultMsg: translate('VAULT_DETAILS_MODULE.DELETE_VAULT_MSG'),
  deleteVaultInputLabel: translate('VAULT_DETAILS_MODULE.DELETE_VAULT_INPUT_LABEL'),
  deleteVaultTitle: translate('VAULT_DETAILS_MODULE.DELETE_VAULT'),
  vaultNotCreatedWarning: translate('VAULT_DETAILS_MODULE.VAULT_NOT_CREATED_WARNING'),
  deleteYesLabel: translate('YES_DELETE'),
  deleteNoLabel: translate('NO'),
  accessDenied: translate('ACCESS_DENIED'),
  rotateVaultTitle: translate('VAULT_DETAILS_MODULE.ROTATE_VAULT_KEY_TITLE'),
  rotateVaultYesLabel: translate('VAULT_DETAILS_MODULE.ROTATE_VAULT_KEY_YES_LABEL'),
  rotateVaultMsg: translate('VAULT_DETAILS_MODULE.VAULT_ROTATE_DIALOG_MESSAGE'),
  rotateVaultInProgressMsg: translate('VAULT_DETAILS_MODULE.VAULT_ROTATE_IN_PROGRESS_MESSAGE'),

  vaultStatusLabel: translate('Vault Status'),
  notificationMediumSettings: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_SETTINGS'),
  notificationMediumLabel: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_LABEL'),
  notificationMediumOptional: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_OPTIONAL'),
  userListLabel: translate('CREATE_VAULT_MODULE.VAULT_USER_LIST'),
  userListHelperText: translate('CREATE_VAULT_MODULE.VAULT_SEARCH_USER'),
  tagListLabel: translate('CREATE_VAULT_MODULE.VAULT_TAG_LIST'),
  tagListHelperText: translate('CREATE_VAULT_MODULE.VAULT_SEARCH_TAGS'),
  channelListLabel: translate('CREATE_VAULT_MODULE.VAULT_CHANNEL_LIST'),
  channelListHelperText: translate('CREATE_VAULT_MODULE.VAULT_SEARCH_CHANNELS'),
  loadingMessage: translate('LOADING'),
};

export const buttonType = {
  edit: translate('EDIT'),
  delete: translate('DELETE'),
  close: translate('CLOSE'),
  rotateVault: translate('VAULT_DETAILS_MODULE.ROTATE_VAULT_KEY_BUTTON'),
};

export const vaultAccess = {
  createVault: 'sm.vault.create',
  readVault: 'sm.vault.read',
  updateVault: 'sm.vault.update',
  deleteVault: 'sm.vault.delete',
  rotateVault: 'sm.key.rotate',
};
export const isAllow = 'Allow';
export const ROTATION_IN_PROGRESS = 'rotation_in_progress';
export const defaultWidth = '512px';
