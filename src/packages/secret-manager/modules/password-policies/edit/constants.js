import { translate } from '../../../externalization';

export const EditPasswordPolicyTypes = {
  EDIT_PASSWORD_POLICY_REQUEST: 'EDIT_PASSWORD_POLICY_REQUEST',
  EDIT_PASSWORD_POLICY_LOADING: 'EDIT_PASSWORD_POLICY_LOADING',
  EDIT_PASSWORD_POLICY_SUCCESS: 'EDIT_PASSWORD_POLICY_SUCCESS',
  EDIT_PASSWORD_POLICY_FAILURE: 'EDIT_PASSWORD_POLICY_FAILURE',
  EDIT_PASSWORD_POLICY_RESET: 'EDIT_PASSWORD_POLICY_RESET',
};

export const translatedStrings = {
  pageTitle: translate('PASSWORD_POLICIES_MODULE.EDIT_PASSWORD_POLICY'),
  resetButton: translate('RESET'),
  allowedSpecialCharsTypeValidation: translate(
    'PASSWORD_POLICIES_MODULE.ALLOWED_SPECIAL_CHARACTERS_TYPE_VALIDATION'
  ),
  resetDialogTitle: translate('PASSWORD_POLICIES_MODULE.RESET_PASSWORD_POLICY_DIALOG_TITLE'),
  resetDialogMessage: translate('PASSWORD_POLICIES_MODULE.RESET_PASSWORD_POLICY_DIALOG_MESSAGE'),
  resetDialogPrimaryButton: translate('RESET_ALL_FIELDS'),
  resetDialogSecondaryButton: translate('NO_KEEP_CHANGES'),
  resetNotificationMessage: translate('PASSWORD_POLICIES_MODULE.RESET_NOTIFICATION_MESSAGE'),
  editNotificationSuccessMessage: translate(
    'PASSWORD_POLICIES_MODULE.EDIT_PASSWORD_POLICY_SUCCESS_MESSAGE'
  ),
  saveDialogTitle: translate('PASSWORD_POLICIES_MODULE.SAVE_PASSWORD_POLICY_DIALOG_TITLE'),
  saveDialogMessage: translate('PASSWORD_POLICIES_MODULE.SAVE_PASSWORD_POLICY_DIALOG_MESSAGE'),
  saveDialogPrimaryButton: translate('YES_SAVE'),
  saveDialogSecondaryButton: translate('NO'),
  invalidSpecialChars: translate('PASSWORD_POLICIES_MODULE.INVALID_SPECIAL_CHARACTERS'),
};

export const resetNotificationTime = 3000;
export const editNotificationTime = 3000;
