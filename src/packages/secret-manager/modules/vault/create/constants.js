import { translate } from '../../../externalization';

export const CreateVaultTypes = {
  CREATE_VAULT_REQUEST: 'CREATE_VAULT_REQUEST',
  CREATE_VAULT_LOADING: 'CREATE_VAULT_LOADING',
  CREATE_VAULT_SUCCESS: 'CREATE_VAULT_SUCCESS',
  CREATE_VAULT_FAILURE: 'CREATE_VAULT_FAILURE',
  CREATE_VAULT_FLUSH_DATA: 'CREATE_VAULT_FLUSH_DATA',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  OPEN_SPINNER: 'OPEN_SPINNER',
};

export const classes = {
  createVaultButton: 'create-vault-button',
  createVaultForm: 'create-vault-form',
  textfieldClass: 'textfield-class',
  cancelBtn: 'cancel-btn',
  vaultHeaderClass: 'vault-header-class',
};

export const notificationMediumListConstants = {
  NOTIFICATION_MEDIUM_LIST_REQUEST: 'NOTIFICATION_MEDIUM_LIST_REQUEST',
  NOTIFICATION_MEDIUM_LIST_LOADING: 'NOTIFICATION_MEDIUM_LIST_LOADING',
  NOTIFICATION_MEDIUM_LIST_SUCCESS: 'NOTIFICATION_MEDIUM_LIST_SUCCESS',
  NOTIFICATION_MEDIUM_LIST_FAILURE: 'NOTIFICATION_MEDIUM_LIST_FAILURE',
  NOTIFICATION_MEDIUM_SEARCH_TERM: 'NOTIFICATION_MEDIUM_SEARCH_TERM',
  NOTIFICATION_MEDIUM_LIST_FLUSH: 'NOTIFICATION_MEDIUM_LIST_FLUSH',
};
export const UsersType = {
  VAULT_USERS_REQUEST: 'VAULT_USERS_REQUEST',
  VAULT_USERS_LOADING: 'VAULT_USERS_LOADING',
  VAULT_USERS_SUCCESS: 'VAULT_USERS_SUCCESS',
  VAULT_USERS_FAILURE: 'VAULT_USERS_FAILURE',
  VAULT_USERS_FLUSH: 'VAULT_USERS_FLUSH',
};
export const TagsType = {
  TAGS_REQUEST: 'TAGS_REQUEST',
  TAGS_LOADING: 'TAGS_LOADING',
  TAGS_SUCCESS: 'TAGS_SUCCESS',
  TAGS_FAILURE: 'TAGS_FAILURE',
  TAGS_FLUSH: 'TAGS_FLUSH',
};
export const ChannelType = {
  SLACK_CHANNEL_REQUEST: 'SLACK_CHANNEL_REQUEST',
  SLACK_CHANNEL_LOADING: 'SLACK_CHANNEL_LOADING',
  SLACK_CHANNEL_SUCCESS: 'SLACK_CHANNEL_SUCCESS',
  SLACK_CHANNEL_FAILURE: 'SLACK_CHANNEL_FAILURE',
  SLACK_CHANNEL_FLUSH: 'SLACK_CHANNEL_FLUSH',
};

export const translatedStrings = {
  pageTitle: translate('CREATE_VAULT_MODULE.CREATE_VAULT'),
  vaultName: translate('VAULT_NAME'),
  vaultDescription: translate('DESCRIPTION'),
  vaultDescriptionOptional: translate('OPTIONAL'),
  vaultRotationName: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_NAME'),
  vaultRotationOptional: translate('IN_DAYS'),
  vaultRotationPlaceholder: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ROTATION_PLACEHOLDER'),
  notificationMediumSettings: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_SETTINGS'),
  notificationMediumLabel: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_LABEL'),
  notificationMediumOptional: translate('CREATE_VAULT_MODULE.VAULT_DEFAULT_MEDIUM_OPTIONAL'),
  noTagsFound: translate('POLICIES_MODULE.NO_TAGS_FOUND'),
  noUsersFound: translate('POLICIES_MODULE.NO_USERS_FOUND'),
  noChannelsFound: translate('POLICIES_MODULE.NO_CHANNELS_FOUND'),
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
};
export const buttonType = {
  create: translate('CREATE_VAULT_MODULE.CREATE_VAULT'),
  cancel: translate('CANCEL'),
};
export const defaultWidth = '512px';
export const active = 'active';
