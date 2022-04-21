import { translate } from '../../../../packages/policy-management/externalization';

export const classes = {
  addPolicyWrapper: 'add-policy-wrapper',
  formNameLoaderWrapper: 'form-name-loader-wrapper',
  readOnlyConsumer: 'read-only-consumer',
  addPolicyFieldWrapper: 'add-policy-field-wrapper',
  addPolicyFieldValueWrapper: 'add-policy-field-value-wrapper',
  addPermissionButtonsWrapper: 'add-permission-buttons-wrapper',
  addPermissionButtonWrapper: 'add-permission-button-wrapper',
  verticalTabWrap: 'vertical-tab-wrap',
};

export const SAVE_AND_ENABLE = 'SAVE_AND_ENABLE';
export const isIPAddressData = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

export const isDateTimeData = [
  { label: 'Not required', value: 'none' },
  { label: 'Date-time range', value: 'date' },
  { label: 'Schedule Daily', value: 'time' },
];
export const notificationMediumData = [
  { label: 'Slack', value: 'slack' },
  { label: 'email', value: 'email' },
];
export const approversData = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];
export const approverTypeList = [
  { label: 'Users', value: 'users' },
  { label: 'Tags', value: 'tags' },
  { label: 'Channels', value: 'channels' },
];
export const datePickerHeight = '40px';
export const datePickerWidth = '512px';

export const key = 'key';
export const fieldWidth = '512px';
export const commaSeperator = ',';
export const verticalTabWidth = '288px';
export const verticalTabTopPadding = '48px';

export const roleFields = [
  { key: 'consumer', label: translate('CONSUMER') },
  { key: 'resources', label: translate('RESOURCES') },
  { key: 'actions', label: translate('ROLES_MODULE.ACTIONS') },
];
