import { translate } from '../../../../../../externalization';

export const SAVE_AND_ENABLE = 'SAVE_AND_ENABLE';
export const classes = {
  addPolicyWrapper: 'sm-add-policy-wrapper',
  verticalTabWrap: 'sm-vertical-tab-wrap',
};

export const accessLevelOptions = [
  { label: translate('POLICIES_MODULE.VIEW'), value: 'SM_View' },
  { label: translate('POLICIES_MODULE.CREATE_EDIT'), value: 'SM_CRUD' },
  { label: translate('POLICIES_MODULE.MANAGE'), value: 'SM_Manage' },
];

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

export const fieldWidth = '512px';
export const rootNodePath = '/*';
export const verticalTabWidth = '288px';
export const verticalTabTopPadding = '48px';
