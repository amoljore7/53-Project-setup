import { secretModuleConstants, translatedStrings } from './constants';

export const getSecretStatus = (status) => {
  switch (status?.toLowerCase()) {
    case secretModuleConstants.pendingText:
      return translatedStrings.approvalPendingText;

    case secretModuleConstants.approvalRequiredText:
      return translatedStrings.approvalRequiredText;

    case secretModuleConstants.denyText:
      return translatedStrings.approvalDeniedText;

    case secretModuleConstants.allowText:
      return translatedStrings.availableText;

    case secretModuleConstants.approvedText:
      return translatedStrings.approvedStatus;

    case secretModuleConstants.rejectedText:
      return translatedStrings.rejectedStatus;

    case secretModuleConstants.timeOutText:
      return translatedStrings.timeOutStatus;

    default:
      return translatedStrings.noneText;
  }
};

export const getSecretStatusTooltip = (status) => {
  switch (status?.toLowerCase()) {
    case secretModuleConstants.allowText:
      return translatedStrings.alreadyApproved;

    case secretModuleConstants.accessDeniedText || secretModuleConstants.rejectedText:
      return translatedStrings.alreadyRejected;

    case secretModuleConstants.requestExpiredText:
      return translatedStrings.alreadyExpired;

    case secretModuleConstants.approvedText:
      return translatedStrings.alreadyApproved;

    case secretModuleConstants.rejectedText:
      return translatedStrings.alreadyRejected;

    default:
      return translatedStrings.noneText;
  }
};

export const getActionLabel = (action) => {
  if (action) {
    if (action === secretModuleConstants.secretReadActionName) {
      return translatedStrings.viewSecret;
    }
    
    if (action === secretModuleConstants.profileAccessActionName) {
      return translatedStrings.accessProfile;
    }
    return action;
  }
  return translatedStrings.noneText;
};

export const isMobileDevice = () => window.innerWidth <= 768;
