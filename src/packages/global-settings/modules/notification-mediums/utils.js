import { notificationMediumConstants } from './add/constants';

export const webHookUrl = 'Webhook URL';

export const getPayloadBody = (formValues) => {
  const { name, description, type, URL, token, teamsWebHookUrl } = formValues;
  const commonMediumData = {
    name: name.trim(),
    description: description.trim(),
    type: type,
  };
  if (type === notificationMediumConstants.slackText) {
    return {
      ...commonMediumData,
      connectionParameters: {
        URL,
        token,
      },
    };
  } else {
    return {
      ...commonMediumData,
      connectionParameters: {
        [webHookUrl]: teamsWebHookUrl,
      },
    };
  }
};
