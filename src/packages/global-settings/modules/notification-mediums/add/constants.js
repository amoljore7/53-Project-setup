import { translate } from '../../../externalization';

export const AddNotificationMediumTypes = {
  ADD_NOTIFICATION_MEDIUM_REQUEST: 'ADD_NOTIFICATION_MEDIUM_REQUEST',
  ADD_NOTIFICATION_MEDIUM_LOADING: 'ADD_NOTIFICATION_MEDIUM_LOADING',
  ADD_NOTIFICATION_MEDIUM_SUCCESS: 'ADD_NOTIFICATION_MEDIUM_SUCCESS',
  ADD_NOTIFICATION_MEDIUM_FAILURE: 'ADD_NOTIFICATION_MEDIUM_FAILURE',
  ADD_NOTIFICATION_MEDIUM_RESET: 'ADD_NOTIFICATION_MEDIUM_RESET',
};

export const classes = {
  notificationMediumActionContainer: 'notification-medium-action-container',
  notificationMediumSaveButton: 'notification-medium-save-button',
  notificationMediumErrorSnackbar: 'notification-medium-error-snackbar',
};

export const notificationMediumConstants = {
  errorSnack: 'notification-medium-error-snack',
  mediumSize: 'medium',
  variant: 'primary',
  secVariant: 'secondary',
  alertText: 'alert',
  successText: 'success',
  errorText: 'error',
  nameText: 'name',
  allText: 'all',
  slackText: 'slack',
  teamsText: 'teams',
};

export const translatedStrings = {
  invalidSpecialChars: translate('NOTIFICATION_MEDIUM_MODULE.INVALID_SPECIAL_CHARACTERS'),
  pageTitle: translate('NOTIFICATION_MEDIUM_MODULE.ADD_NOTIFICATION_MEDIUM'),
  saveButton: translate('SAVE'),
  cancelButton: translate('CANCEL'),
  errorSnackbarTitle: translate('NOTIFICATION_MEDIUM_MODULE.ERROR_SUBMITTING_FORM'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  cancelDialogMessage: translate('NOTIFICATION_MEDIUM_MODULE.CANCEL_DIALOG_MESSAGE'),
  cancelDialogPrimaryButton: translate('NOTIFICATION_MEDIUM_MODULE.CANCEL_MODAL_PRIMARY_BTN'),
  noButton: translate('NO'),
  notificationMediumNameValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_NAME_VALIDATION'
  ),
  notificationMediumNameExistValidation: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_NAME_EXIST_VALIDATION'
  ),
  addNotificationMediumSuccessMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.ADD_NOTIFICATION_MEDIUM_SUCCESS_MESSAGE'
  ),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
};
export const cloneNamePrefix = (name) => translate('COPY_OF', { name });
