import { translate } from '../../../externalization';
export const createSecretTypes = {
  CREATE_SECRET_REQUEST: 'CREATE_SECRET_REQUEST',
  CREATE_SECRET_LOADING: 'CREATE_SECRET_LOADING',
  CREATE_SECRET_SUCCESS: 'CREATE_SECRET_SUCCESS',
  CREATE_SECRET_FAILURE: 'CREATE_SECRET_FAILURE',
  CREATE_SECRET_RESET: 'CREATE_SECRET_RESET',
};

export const classes = {
  addSecretFormContainer: 'add-secret-form-container',
  addSecretFormFieldWrapper: 'add-secret-form-field-wrapper',
  nameCheckTextFieldLoaderContainer: 'name-check-textfield-loader-container',
  nameCheckLoaderContainer: 'name-check-loader-container',
  generatePasswordContainer: 'generate-password-container',
  generatePasswordButtonContainer: 'generate-password-button-container',
  readOnlyLabelWrapper: 'read-only-label-wrapper',
  readOnlyFieldWrapper: 'read-only-field-wrapper',
  readOnlyFieldValueWrapper: 'read-only-field-value-wrapper',
  addSecretActionsContainer: 'add-secret-actions-container',
  addSecretSaveButton: 'add-secret-save-button',
  secretDetailContainer: 'secret-detail-container',
};

export const notificationTime = 3000;
export const dynamicFieldKeyPrefix = 'dynamic-field-';
export const iconDefaultSize = 24;
export const rotationIntervalValueSuffix = ' days';
export const previousPath = '/admin/secret-manager/vault/secrets/all-secrets';

export const translatedStrings = {
  noneValue: translate('NONE'),
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
  saveButtonText: translate('SECRET_CREATE_MODULE.SAVE_BUTTON_TEXT'),
  cancelButtonText: translate('SECRET_CREATE_MODULE.CANCEL_BUTTON_TEXT'),
  errorSnackbarTitle: translate('SECRET_CREATE_MODULE.ERROR_SUBMITTING_FORM'),
  cancelDialogTitle: translate('DISCARD_CHANGES'),
  cancelDialogMessage: translate('SECRET_CREATE_MODULE.CANCEL_DIALOG_MESSAGE'),
  cancelDialogPrimaryButtonText: translate('YES_DISCARD'),
  noButtonText: translate('NO'),
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
  generatePasswordFail: (reason) =>
    translate('SECRET_CREATE_MODULE.GENERATE_PASSWORD_FAILURE_MESSAGE', { reason }),
};

export const maxSecretNameCharacters = 30;
export const na = 'NA';
