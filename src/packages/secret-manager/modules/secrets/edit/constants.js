import { translate } from '../../../externalization';
export const updateSecretTypes = {
  UPDATE_SECRET_REQUEST: 'UPDATE_SECRET_REQUEST',
  UPDATE_SECRET_LOADING: 'UPDATE_SECRET_LOADING',
  UPDATE_SECRET_SUCCESS: 'UPDATE_SECRET_SUCCESS',
  UPDATE_SECRET_FAILURE: 'UPDATE_SECRET_FAILURE',
  UPDATE_SECRET_RESET: 'UPDATE_SECRET_RESET',
};

export const classes = {
  editSecretFormContainer: 'edit-secret-form-container',
  editSecretFormFieldWrapper: 'edit-secret-form-field-wrapper',
  nameCheckTextFieldLoaderContainer: 'name-check-text-field-loader-container',
  nameCheckLoaderContainer: 'name-check-loader-container',
  generatePasswordContainer: 'generate-password-container',
  generatePasswordButtonContainer: 'generate-password-button-container',
  readOnlyLabelWrapper: 'read-only-label-wrapper',
  readOnlyFieldWrapper: 'read-only-field-wrapper',
  readOnlyFieldValueWrapper: 'read-only-field-value-wrapper',
  editSecretActionsContainer: 'edit-secret-actions-container',
  editSecretSaveButton: 'edit-secret-save-button',
  editSecretErrorSnackbar: 'edit-secret-error-snackbar',
  secretDetailContainer: 'secret-detail-container',
};

export const notificationTime = 3000;
export const dynamicFieldKeyPrefix = 'dynamic-field-';
export const iconDefaultSize = 24;
export const rotationIntervalValueSuffix = ' days';
export const previousPath = '/admin/secret-manager/vault/secrets/all-secrets';

export const translatedStrings = {
  nameLabel: translate('SECRET_CREATE_MODULE.NAME_LABEL'),
  descriptionLabel: translate('SECRET_CREATE_MODULE.DESCRIPTION_LABEL'),
  descriptionHelperLabel: translate('SECRET_CREATE_MODULE.DESCRIPTION_HELPER_LABEL'),
  categoryLabel: translate('SECRET_CREATE_MODULE.CATEGORY_LABEL'),
  accessTypeLabel: translate('SECRET_CREATE_MODULE.ACCESS_TYPE_LABEL'),
  secretTypeLabel: translate('SECRET_CREATE_MODULE.TYPE_LABEL'),
  templateDescriptionLabel: translate('SECRET_CREATE_MODULE.TEMPLATE_DESCRIPTION_LABEL'),
  secretRotationIntervalLabel: translate('SECRET_CREATE_MODULE.ROTATION_INTERVAL_LABEL'),
  passwordPolicyIdLabel: translate('SECRET_CREATE_MODULE.PASSWORD_POLICY_LABEL'),
  secretDetailsSubHeading: translate('SECRET_CREATE_MODULE.DETAILS_SUBHEADING'),
  editSecretTitle: translate('SECRET_EDIT_MODULE.EDIT_SECRET_TITLE'),
  saveButtonText: translate('SECRET_CREATE_MODULE.SAVE_BUTTON_TEXT'),
  resetButtonText: translate('RESET'),
  cancelButtonText: translate('SECRET_CREATE_MODULE.CANCEL_BUTTON_TEXT'),
  errorSnackbarTitle: translate('SECRET_CREATE_MODULE.ERROR_SUBMITTING_FORM'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  cancelDialogMessage: translate('SECRET_CREATE_MODULE.CANCEL_DIALOG_MESSAGE'),
  cancelDialogPrimaryButtonText: translate('YES_DISCARD'),
  noButtonText: translate('NO'),
  resetSecretDialogTitle: translate('SECRET_EDIT_MODULE.RESET_SECRET_DIALOG_TITLE'),
  resetSecretDialogMessage: translate('SECRET_EDIT_MODULE.RESET_SECRET_DIALOG_MESSAGE'),
  resetSecretDialogPrimaryButtonText: translate(
    'SECRET_EDIT_MODULE.RESET_SECRET_DIALOG_PRIMARY_BTN_TEXT'
  ),
  resetSecretDialogSecondaryButtonText: translate(
    'SECRET_EDIT_MODULE.RESET_SECRET_DIALOG_SECONDARY_BTN_TEXT'
  ),
  successMessage: translate('SECRET_CREATE_MODULE.SUCCESS_MESSAGE'),
  nameRequiredMessage: translate('SECRET_CREATE_MODULE.NAME_REQUIRED_MESSAGE'),
  nameExistValidationMessage: translate('SECRET_CREATE_MODULE.SECRET_FOLDER_ALREADY_EXISTS'),
  secretTypeRequiredMessage: translate('SECRET_CREATE_MODULE.SECRET_TYPE_REQUIRED_MESSAGE'),
  optionalHelperText: translate('SECRET_CREATE_MODULE.OPTIONAL_HELPER_TEXT'),
  generatePasswordButtonText: translate('SECRET_CREATE_MODULE.GENERATE_PASSWORD_BUTTON_TEXT'),
  secretCategoryValue: translate('SECRET_CREATE_MODULE.CATEGORY_VALUE'),
  secretAccessTypeValue: translate('SECRET_CREATE_MODULE.ACCESS_TYPE_VALUE'),
  passwordPolicyIdNullMessage: translate('SECRET_CREATE_MODULE.PASSWORD_POLICY_ID_NULL_MESSAGE'),
  searchPlaceholder: translate('SECRET_CREATE_MODULE.SEARCH_SECRET_TYPE'),
  secretEditSuccessMessage: translate('SECRET_EDIT_MODULE.EDIT_SECRET_SUCCESS_MESSAGE'),
  noFieldChangedMessage: translate('SECRET_EDIT_MODULE.NO_FIELD_CHANGED_MESSAGE'),
};

export const maxSecretNameCharacters = 30;
export const na = 'NA';
