import { translate } from '../../../externalization';

export const classes = {
  notificationMediumFormContainer: 'notification-medium-form-container',
  fieldWrapper: 'field-wrapper',
  formLoader: 'form-loader',
  alignWithLoader: 'align-with-loader',
  fieldSpacing: 'field-spacing',
  webHookUrlText: 'webhook-url-text',
};

export const translatedStrings = {
  nameLabel: translate('NAME'),
  descriptionLabel: translate('DESCRIPTION'),
  descriptionHelperLabel: translate('NOTIFICATION_MEDIUM_MODULE.OPTIONAL'),
  selectPlaceholder: translate('NOTIFICATION_MEDIUM_MODULE.SELECT_APPLICATION'),
  applicationLabel: translate('NOTIFICATION_MEDIUM_MODULE.APPLICATION'),
  slackUrlLabel: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_URL_LABEL'),
  slackTokenLabel: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_TOKEN_LABEL'),
  noneText: translate('NOTIFICATION_MEDIUM_MODULE.NONE'),
  separateTeamsText: translate('NOTIFICATION_MEDIUM_MODULE.SEPARATE_TEAMS_TEXT'),
  teamsLink: translate('NOTIFICATION_MEDIUM_MODULE.TEAMS_LINK'),
  teamsUrlLabel: translate('NOTIFICATION_MEDIUM_MODULE.TEAMS_URL_LABEL'),
  slackAttributeText: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_ATTRIBUTE_TEXT'),
  slackLink: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_LINK'),
};

export const formConstants = {
  smallSize: 'small',
  defaultWidth: '500px',
  slackText: 'slack',
  teamsText: 'teams',
  targetText: '_blank',
  relText: 'noopener noreferrer',
  webhookUrl:
    'https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook',
  iconDefaultSize: 24,
  slackUrl: 'https://api.slack.com/bot-users',
};
export const applicationList = [
  { name: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_TEXT'), value: 'slack' },
  { name: translate('NOTIFICATION_MEDIUM_MODULE.TEAMS_TEXT'), value: 'teams' },
];
