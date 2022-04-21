import { translate } from '../../../externalization';

export const EditVaultTypes = {
  EDIT_VAULT_REQUEST: 'EDIT_VAULT_REQUEST',
  EDIT_VAULT_LOADING: 'EDIT_VAULT_LOADING',
  EDIT_VAULT_SUCCESS: 'EDIT_VAULT_SUCCESS',
  EDIT_VAULT_FAILURE: 'EDIT_VAULT_FAILURE',
  EDIT_VAULT_FLUSH_DATA: 'EDIT_VAULT_FLUSH_DATA',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  OPEN_SPINNER: 'OPEN_SPINNER',
};

export const translatedStrings = {
  deleteYesLabel: translate('YES_DELETE'),
  yesSave: translate('YES_SAVE'),
  none: translate('NONE'),
  noLabel: translate('NO'),
  yesDiscard: translate('YES_DISCARD'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  pageTitle: translate('VAULT_DETAILS_MODULE.VAULT_EDIT_TITLE'),
  resetAllField: translate('Yes, Reset All Fields'),
  lastKeyRotation: translate('VAULT_DETAILS_MODULE.LAST_KEY_ROTATION'),
  nextKeyRotation: translate('VAULT_DETAILS_MODULE.NEXT_KEY_ROTATION'),
  keepChangesMSG: translate('NO_KEEP_CHANGES'),
  vaultName: translate('VAULT_NAME'),
  vaultDescription: translate('DESCRIPTION'),
  vaultDescriptionOptional: translate('OPTIONAL'),
  vaultRotationName: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_NAME'),
  vaultRotationOptional: translate('IN_DAYS'),
  vaultRotationPlaceholder: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_PLACEHOLDER'),
  vaultNotCreatedWarning: translate('VAULT_DETAILS_MODULE.VAULT_NOT_CREATED_WARNING'),
  vaultReset: translate('VAULT_DETAILS_MODULE.VAULT_RESET'),
  vaultResetMessage: translate('VAULT_DETAILS_MODULE.VAULT_RESET_MESSAGE'),
  vaultResetNotification: translate('VAULT_DETAILS_MODULE.VAULT_RESET_NOTIFICATION'),
  vaultSaveTitle: translate('VAULT_DETAILS_MODULE.VAULT_SAVE_TITLE'),
  vaultSaveMessage: translate('VAULT_DETAILS_MODULE.VAULT_SAVE_MESSAGE'),
  vaultCancelMessage: translate('VAULT_DETAILS_MODULE.VAULT_CANCEL_MESSAGE'),

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
export const validation = {
  vaultName: translate('CREATE_VAULT_MODULE.CREATE_VAULT_NAME_VALIDATION'),
  vaultRotationTime: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_VALIDATION'),
  minDays: translate('MIN_ROTATION_INTERVAL'),
  maxDays: translate('MAX_ROTATION_INTERVAL'),
};
export const buttonType = {
  save: translate('SAVE'),
  cancel: translate('CANCEL'),
  reset: translate('RESET'),
};
export const defaultWidth = '512px';
export const minRotationInterval = 1;
export const maxRotationInterval = 60;
