import { translate } from '../../../externalization';

export const SecretViewDataTypes = {
  SECRET_VIEW_DATA_REQUEST: 'SECRET_VIEW_DATA_REQUEST',
  SECRET_VIEW_DATA_LOADING: 'SECRET_VIEW_DATA_LOADING',
  SECRET_VIEW_DATA_SUCCESS: 'SECRET_VIEW_DATA_SUCCESS',
  SECRET_VIEW_DATA_FAILURE: 'SECRET_VIEW_DATA_FAILURE',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  SECRET_VIEW_DATA_RESET: 'SECRET_VIEW_DATA_RESET',
};

export const classes = {
  buttonMainContainer: 'sst-view-button-main-container',
  buttonChildContainer: 'sst-view-child-button-main-container',
  viewSecretMainContainer: 'view-secret-main-container',
  marginTop32: 'margin-top-32',
  marginTop8: 'margin-top-8',
  tagsContainer: 'tag-container',
  renderClass: 'sst-view-render-class',
  viewSecretModalPopupWrapper: 'pp-view-sst-modal-popup-container',
};

export const spinnerSize = 'medium';
export const defaultButtonSize = '24';
export const mainRole = 'main';

export const translatedStrings = {
  action: translate('ACTION'),
  description: translate('DESCRIPTION'),
  fields: translate('FIELDS'),
  field: translate('FIELD'),
  pageTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_TEMPLATE'),
  editButtonText: translate('EDIT'),
  cloneButtonText: translate('CLONE'),
  deleteButtonText: translate('DELETE'),
  closeButtonText: translate('CLOSE'),
  deleteSecretTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_SECRET'),
  deleteSecretMsg: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_MESSAGE'),
  deleteYesLabel: translate('YES_DELETE'),
  deleteNoLabel: translate('NO'),
  noLabel: translate('NO'),
  noneText: translate('NONE'),
  no: translate('NO'),
  yes: translate('YES'),
  fieldName: translate('STATIC_SECRETS_TEMPLATE_MODULE.FIELD_NAME'),
  fieldDescription: translate('STATIC_SECRETS_TEMPLATE_MODULE.FIELD_DESCRIPTION'),
  fieldType: translate('STATIC_SECRETS_TEMPLATE_MODULE.FIELD_TYPE'),
  passwordPolicy: translate('STATIC_SECRETS_TEMPLATE_MODULE.PASSWORD_POLICY'),
  isMandatory: translate('STATIC_SECRETS_TEMPLATE_MODULE.IS_MANDATORY'),
  isMandatoryField: translate('STATIC_SECRETS_TEMPLATE_MODULE.IS_MANDATORY_FIELD'),
  isMasked: translate('STATIC_SECRETS_TEMPLATE_MODULE.IS_MASKED'),
  isMaskedField: translate('STATIC_SECRETS_TEMPLATE_MODULE.IS_MASKED_FIELD'),
  secretTemplateName: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_TEMPLATE_NAME'),
  secretRotationInterval: translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_ROTATION_INTERVAL'),
  deleteLoadingMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_LOADING_MESSAGE'),
  loadingSecretTemplate: translate('STATIC_SECRETS_TEMPLATE_MODULE.LOADING_SECRET_TEMPLATE'),
  secretRotationIntervalView: translate(
    'STATIC_SECRETS_TEMPLATE_MODULE.SECRET_ROTATION_INTERVAL_VIEW'
  ),
  viewTooltip: translate('STATIC_SECRETS_TEMPLATE_MODULE.VIEW_TOOLTIP'),
  naText: translate('NA'),
};

export const viewSecretTemplateActionContainerTestId = 'static-secret-view-action-button-container';
export const viewFieldsTableTestId = 'static-secret-view-fields-table';
export const secretButton = {
  variant: 'primary',
  secVariant: 'secondary',
  size: 'medium',
};
