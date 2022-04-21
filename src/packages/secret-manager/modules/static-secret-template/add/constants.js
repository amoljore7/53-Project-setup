import { translate } from '../../../externalization';

export const AddStaticSecretTypes = {
  ADD_STATIC_SECRET_REQUEST: 'ADD_STATIC_SECRET_REQUEST',
  ADD_STATIC_SECRET_LOADING: 'ADD_STATIC_SECRET_LOADING',
  ADD_STATIC_SECRET_SUCCESS: 'ADD_STATIC_SECRET_SUCCESS',
  ADD_STATIC_SECRET_FAILURE: 'ADD_STATIC_SECRET_FAILURE',
  ADD_STATIC_SECRET_RESET: 'ADD_STATIC_SECRET_RESET',
};

export const GetPwdPoliciesTypes = {
  GET_STATIC_SECRET_REQUEST: 'GET_STATIC_SECRET_REQUEST',
  GET_STATIC_SECRET_LOADING: 'GET_STATIC_SECRET_LOADING',
  GET_STATIC_SECRET_SUCCESS: 'GET_STATIC_SECRET_SUCCESS',
  GET_STATIC_SECRET_FAILURE: 'GET_STATIC_SECRET_FAILURE',
};

export const classes = {
  sstActionContainer: 'sst-action-container',
  sstLeftAction: 'sst-left-action',
  sstSaveBtn: 'sst-save-btn',
  sstMarginTop32: 'sst-margin-top-32',
  sstMarginTop8: 'sst-margin-top-8',
  sstResetBtn: 'sst-reset-btn',
};

export const translatedStrings = {
  deleteYesLabel: translate('YES_DELETE'),
  saveBtn: translate('SAVE'),
  cancelBtn: translate('CANCEL'),
  yesDiscard: translate('YES_DISCARD'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  pageTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.ADD_SECRET'),
  nameValidationExit: translate('STATIC_SECRETS_TEMPLATE_MODULE.NAME_EXIT'),
  passwordPolicyValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.SELECT_PASSWORD'),
  cancelDialogMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.CANCEL_DIALOG_MESSAGE'),
  formError: translate('STATIC_SECRETS_TEMPLATE_MODULE.FORM_SUBMIT_ERROR'),
  loadingSecretTemplate: translate('STATIC_SECRETS_TEMPLATE_MODULE.LOADING_SECRET_TEMPLATE'),
  yesLabel: translate('YES'),
  noLabel: translate('NO'),
  minDays: translate('MIN_ROTATION_INTERVAL'),
  maxDays: translate('MAX_ROTATION_INTERVAL'),
  copyOf: translate('COPY_OF'),
  none: translate('NONE'),
};
export const keyName = 'key';
export const passwordFieldType = 'password';
