import { translate } from '../../../externalization';

export const EditStaticSecretTypes = {
  EDIT_STATIC_SECRET_REQUEST: 'EDIT_STATIC_SECRET_REQUEST',
  EDIT_STATIC_SECRET_LOADING: 'EDIT_STATIC_SECRET_LOADING',
  EDIT_STATIC_SECRET_SUCCESS: 'EDIT_STATIC_SECRET_SUCCESS',
  EDIT_STATIC_SECRET_FAILURE: 'EDIT_STATIC_SECRET_FAILURE',
  EDIT_STATIC_SECRET_RESET: 'EDIT_STATIC_SECRET_RESET',
};

export const translatedStrings = {
  deleteYesLabel: translate('YES_DELETE'),
  saveBtn: translate('SAVE'),
  cancelBtn: translate('CANCEL'),
  yesDiscard: translate('YES_DISCARD'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  pageTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.EDIT_SECRET'),
  nameValidationExit: translate('STATIC_SECRETS_TEMPLATE_MODULE.NAME_EXIT'),
  passwordPolicyValidation: translate('STATIC_SECRETS_TEMPLATE_MODULE.SELECT_PASSWORD'),
  cancelDialogMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.CANCEL_DIALOG_MESSAGE'),
  formError: translate('STATIC_SECRETS_TEMPLATE_MODULE.FORM_SUBMIT_ERROR'),
  loadingSecretTemplate: translate('STATIC_SECRETS_TEMPLATE_MODULE.LOADING_SECRET_TEMPLATE'),
  yesLabel: translate('YES'),
  noLabel: translate('NO'),
  minDays: translate('MIN_ROTATION_INTERVAL'),
  maxDays: translate('MAX_ROTATION_INTERVAL'),
  resetBtn: translate('RESET'),
  resetDialogTitle: translate('STATIC_SECRETS_TEMPLATE_MODULE.RESET_SECRET_TEMPLATE_DIALOG_TITLE'),
  resetDialogMessage: translate(
    'STATIC_SECRETS_TEMPLATE_MODULE.RESET_SECRET_TEMPLATE_DIALOG_MESSAGE'
  ),
  resetDialogPrimaryButton: translate('RESET_ALL_FIELDS'),
  resetDialogSecondaryButton: translate('NO_KEEP_CHANGES'),
  resetNotificationMessage: translate('STATIC_SECRETS_TEMPLATE_MODULE.RESET_NOTIFICATION_MESSAGE'),
};

export const keyName = 'key';
export const editSecretConstants = {
  resetNotificationTime: 3000,
  alertText: 'alert',
  successText: 'success',
  priVariant: 'primary',
  secVariant: 'secondary',
  size: 'medium',
  listUrl: '/admin/secret-manager/vault/static-secret',
  errorTestId: 'sst-submit-error',
  loadingText: 'LOADING',
  successStatusText: 'SUCCESS',
  passwordText: 'password',
  secretTypeText: 'secretType',
  allText: 'all',
  selectPassText: 'isPasswordSelected',
  yesText: 'Yes',
};

export const maxInputChars = 30;
