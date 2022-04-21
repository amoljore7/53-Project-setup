import { translate } from '../../../externalization';

export const editNotificationMediumTypes = {
  EDIT_NOTIFICATION_MEDIUM_REQUEST: 'EDIT_NOTIFICATION_MEDIUM_REQUEST',
  EDIT_NOTIFICATION_MEDIUM_LOADING: 'EDIT_NOTIFICATION_MEDIUM_LOADING',
  EDIT_NOTIFICATION_MEDIUM_SUCCESS: 'EDIT_NOTIFICATION_MEDIUM_SUCCESS',
  EDIT_NOTIFICATION_MEDIUM_FAILURE: 'EDIT_NOTIFICATION_MEDIUM_FAILURE',
  EDIT_NOTIFICATION_MEDIUM_RESET: 'EDIT_NOTIFICATION_MEDIUM_RESET',
};

export const classes = {
  editNotificationMediumActionContainer: 'edit-notification-medium-action-container',
  editNotificationMediumSaveButton: 'edit-notification-medium-save-button',
  editNotificationMediumErrorSnackbar: 'edit-notification-medium-error-snackbar',
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
};

export const translatedStrings = {
  invalidSpecialChars: translate('NOTIFICATION_MEDIUM_MODULE.INVALID_SPECIAL_CHARACTERS'),
  pageTitle: translate('NOTIFICATION_MEDIUM_MODULE.EDIT_NOTIFICATION_MEDIUM'),
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
  editNotificationMediumSuccessMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.EDIT_NOTIFICATION_MEDIUM_SUCCESS_MESSAGE'
  ),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
  resetButton: translate('RESET'),
  resetDialogTitle: translate('NOTIFICATION_MEDIUM_MODULE.RESET_NOTIFICATION_MEDIUM_DIALOG_TITLE'),
  resetDialogMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.RESET_NOTIFICATION_MEDIUM_DIALOG_MESSAGE'
  ),
  resetDialogPrimaryButton: translate('RESET_ALL_FIELDS'),
  resetDialogSecondaryButton: translate('NO_KEEP_CHANGES'),
  resetNotificationMessage: translate('NOTIFICATION_MEDIUM_MODULE.RESET_NOTIFICATION_MESSAGE'),
  saveDialogTitle: translate('NOTIFICATION_MEDIUM_MODULE.SAVE_NOTIFICATION_MEDIUM_DIALOG_TITLE'),
  saveDialogMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.SAVE_NOTIFICATION_MEDIUM_DIALOG_MESSAGE'
  ),
  saveDialogPrimaryButton: translate('YES_SAVE'),
  saveDialogSecondaryButton: translate('NO'),
};
