import { translate } from '../../../externalization';

export const notificationMediumViewConstants = {
  NOTIFICATION_MEDIUM_VIEW_DATA_REQUEST: 'NOTIFICATION_MEDIUM_VIEW_DATA_REQUEST',
  NOTIFICATION_MEDIUM_VIEW_DATA_LOADING: 'NOTIFICATION_MEDIUM_VIEW_DATA_LOADING',
  NOTIFICATION_MEDIUM_VIEW_DATA_SUCCESS: 'NOTIFICATION_MEDIUM_VIEW_DATA_SUCCESS',
  NOTIFICATION_MEDIUM_VIEW_DATA_FAILURE: 'NOTIFICATION_MEDIUM_VIEW_DATA_FAILURE',
  NOTIFICATION_MEDIUM_VIEW_DATA_RESET: 'NOTIFICATION_MEDIUM_VIEW_DATA_RESET',
};

export const classes = {
  notificationMediumButtonContainer: 'notification-medium-button-container',
  notificationMediumViewDataMainContainer: 'notification-medium-view-data-main-container',
  fieldSpacing: 'field-spacing',
  fieldWrapper: 'field-wrapper',
  webHookUrlText: 'webhook-url-text',
};

export const translatedStrings = {
  pageTitle: translate('NOTIFICATION_MEDIUM_MODULE.MEDIUM'),
  yesText: translate('YES'),
  noText: translate('NO'),
  deletePrimaryButton: translate('YES_DELETE'),
  editText: translate('EDIT'),
  cloneText: translate('CLONE'),
  deleteText: translate('DELETE'),
  cancelText: translate('CANCEL'),
  closeText: translate('CLOSE'),
  noneText: translate('NONE'),
  loadingMessage: translate('NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_LOADING_MESSAGE'),
  deleteMessage: translate('NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_DIALOG_MESSAGE'),
  deleteTitle: translate('NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_DIALOG_TITLE'),
  deleteNotificationMediumSuccessMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_SUCCESS'
  ),
  deleteLoadingMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_DELETE_LOADING_MESSAGE'
  ),
  slackUrlLabel: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_URL_LABEL'),
  slackTokenLabel: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_TOKEN_LABEL'),
  separateTeamsText: translate('NOTIFICATION_MEDIUM_MODULE.SEPARATE_TEAMS_TEXT'),
  teamsLink: translate('NOTIFICATION_MEDIUM_MODULE.TEAMS_LINK'),
  teamsUrlLabel: translate('NOTIFICATION_MEDIUM_MODULE.TEAMS_URL_LABEL'),
  slackAttributeText: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_ATTRIBUTE_TEXT'),
  showText: translate('SHOW_TEXT'),
  hideText: translate('HIDE_TEXT'),
};

export const notificationMediumConstants = {
  mediumSize: 'medium',
  viewFieldKey: 'view-notification-medium-field-',
  mainText: 'main',
  alertDialog: 'alert',
  boolType: 'boolean',
  listUrl: '/admin/global-settings/notification-medium',
  variant: 'primary',
  secVariant: 'secondary',
  errorText: 'error',
  emailText: 'email',
  slackText: 'slack',
  starText: '**********',
  teamsText: 'teams',
};

export const viewNotificationMediumDetailsLayout = [
  {
    key: 'name',
    label: translate('NOTIFICATION_MEDIUM_MODULE.MEDIUM_NAME'),
  },
  {
    key: 'description',
    label: translate('DESCRIPTION'),
  },
  {
    key: 'type',
    label: translate('NOTIFICATION_MEDIUM_MODULE.APPLICATION'),
  },
];
