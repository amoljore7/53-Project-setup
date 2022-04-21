import * as yup from 'yup';
import { translate } from '../../externalization';

const translatedStrings = {
  notificationMediumNameValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_NAME_VALIDATION'
  ),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  descriptionMaxLength: translate('NOTIFICATION_MEDIUM_MODULE.DESCRIPTION_LENGTH_MAX'),
  notificationMediumNameExistValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_NAME_EXIST_VALIDATION'
  ),
  notificationMediumApplicationValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_APPLICATION_VALIDATION'
  ),
  notificationMediumUrlValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_URL_VALIDATION'
  ),
  notificationMediumTokenValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_TOKEN_VALIDATION'
  ),
  slackUrlMaxLength: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_URL_LENGTH_MAX'),
  slackTokenMaxLength: translate('NOTIFICATION_MEDIUM_MODULE.SLACK_TOKEN_LENGTH_MAX'),
  invalidSlackUrl: translate('NOTIFICATION_MEDIUM_MODULE.INVALID_SLACK_URL'),
  invalidSlackToken: translate('NOTIFICATION_MEDIUM_MODULE.INVALID_SLACK_TOKEN'),
  notificationMediumTeamsUrlValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_TEAMS_URL_VALIDATION'
  ),
  invalidTeamsUrl: translate('NOTIFICATION_MEDIUM_MODULE.INVALID_TEAMS_URL'),
};

const maxDescriptionChars = 255;
const maxNotificationMediumCharacter = 30;
const maxNotificationMediumSlackUrl = 100;
const slackUrlRegex =
  '\\s*\\b(https?|ftp|file|http):/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\s*';

const slackTokenRegex = /([a-zA-Z0-9])+/;
const slackText = 'slack';
const teamsText = 'teams';
// This provided by BE in Notification service docs for URL so we are using this to check normal URL validations.
// https://elbrus.atlassian.net/wiki/spaces/SM/pages/1941733380/Notification+Service
const teamsUrlRegex =
  '\\s*\\b(https?|ftp|file|http):/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\s*';

export const name = yup
  .string()
  .required(translatedStrings.notificationMediumNameValidation)
  .max(maxNotificationMediumCharacter, translatedStrings.inputNameMaxChar)
  .trim();

export const description = yup
  .string()
  .max(maxDescriptionChars, translatedStrings.descriptionMaxLength)
  .default(null)
  .nullable();

export const type = yup
  .string()
  .default(null)
  .nullable()
  .required(translatedStrings.notificationMediumApplicationValidation);

export const URL = yup.string().when('type', {
  is: slackText,
  then: yup
    .string()
    .max(maxNotificationMediumSlackUrl, translatedStrings.slackUrlMaxLength)
    .required(translatedStrings.notificationMediumUrlValidation)
    .matches(slackUrlRegex, {
      //regex will verify Slack URL pattern.
      message: translatedStrings.invalidSlackUrl,
      excludeEmptyString: true,
    }),
  otherwise: yup.string(),
});

export const token = yup.string().when('type', {
  is: slackText,
  then: yup
    .string()
    .max(maxNotificationMediumSlackUrl, translatedStrings.slackTokenMaxLength)
    .required(translatedStrings.notificationMediumTokenValidation)
    .matches(slackTokenRegex, {
      //regex will verify Slack Token pattern.
      message: translatedStrings.invalidSlackToken,
      excludeEmptyString: true,
    }),
  otherwise: yup.string(),
});

export const teamsWebHookUrl = yup.string().when('type', {
  is: teamsText,
  then: yup
    .string()
    .required(translatedStrings.notificationMediumTeamsUrlValidation)
    .matches(teamsUrlRegex, {
      //regex will verify Teams URL pattern.
      message: translatedStrings.invalidTeamsUrl,
      excludeEmptyString: true,
    }),
  otherwise: yup.string(),
});
