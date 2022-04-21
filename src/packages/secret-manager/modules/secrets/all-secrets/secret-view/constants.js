import { translate } from '../../../../externalization';

export const secretTemplateDetailsTypes = {
  SECRET_TEMPLATE_DETAILS_REQUEST: 'SECRET_TEMPLATE_DETAILS_REQUEST',
  SECRET_TEMPLATE_DETAILS_LOADING: 'SECRET_TEMPLATE_DETAILS_LOADING',
  SECRET_TEMPLATE_DETAILS_SUCCESS: 'SECRET_TEMPLATE_DETAILS_SUCCESS',
  SECRET_TEMPLATE_DETAILS_FAILURE: 'SECRET_TEMPLATE_DETAILS_FAILURE',
  SECRET_TEMPLATE_DETAILS_RESET: 'SECRET_TEMPLATE_DETAILS_RESET',
};

export const secretDetailsTypes = {
  SECRET_DETAILS_REQUEST: 'SECRET_DETAILS_REQUEST',
  SECRET_DETAILS_LOADING: 'SECRET_DETAILS_LOADING',
  SECRET_DETAILS_SUCCESS: 'SECRET_DETAILS_SUCCESS',
  SECRET_DETAILS_FAILURE: 'SECRET_DETAILS_FAILURE',
  SECRET_DETAILS_RESET: 'SECRET_DETAILS_RESET',
};

export const deleteNotificationTime = 3000;
export const asteriskCount = 10;
export const templateParametersKeyPrefix = 'templateParameters-';
export const rotationIntervalSuffix = ' days';

export const translatedStrings = {
  noneValue: translate('NONE'),
  editButtonText: translate('SECRET_DETAILS_MODULE.EDIT_BUTTON_TEXT'),
  deleteButtonText: translate('SECRET_DETAILS_MODULE.DELETE_BUTTON_TEXT'),
  nameLabel: translate('SECRET_DETAILS_MODULE.NAME_LABEL'),
  descriptionLabel: translate('SECRET_DETAILS_MODULE.DESCRIPTION_LABEL'),
  categoryLabel: translate('SECRET_DETAILS_MODULE.CATEGORY_LABEL'),
  accessTypeLabel: translate('SECRET_DETAILS_MODULE.ACCESS_TYPE_LABEL'),
  typeLabel: translate('SECRET_DETAILS_MODULE.TYPE_LABEL'),
  rotationIntervalLabel: translate('SECRET_DETAILS_MODULE.ROTATION_INTERVAL_LABEL'),
  lastRotationLabel: translate('SECRET_DETAILS_MODULE.LAST_ROTATION_LABEL'),
  nextRotationLabel: translate('SECRET_DETAILS_MODULE.NEXT_ROTATION_LABEL'),
  usageInstructionLabel: translate('SECRET_DETAILS_MODULE.USAGE_INSTRUCTIONS_LABEL'),
  connectionStringLabel: translate('SECRET_DETAILS_MODULE.CONNECTION_STRING_LABEL'),
  usernameLabel: translate('SECRET_DETAILS_MODULE.USERNAME_LABEL'),
  passwordLabel: translate('SECRET_DETAILS_MODULE.PASSWORD_LABEL'),
  showButtonText: translate('SECRET_DETAILS_MODULE.SHOW_BUTTON_TEXT'),
  hideButtonText: translate('SECRET_DETAILS_MODULE.HIDE_BUTTON_TEXT'),
  accessRequestSentMessage: translate('SECRETS_MODULE.ACCESS_REQUEST_SENT_MESSAGE'),
};

export const secretViewConstant = {
  approvalRequiredErrorCode_11: 'PE-0011',
  pendingSecretErrorCode_10: 'PE-0010',
};
