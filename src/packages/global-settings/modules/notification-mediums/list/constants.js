import { translate } from '../../../externalization';

export const notificationMediumListConstants = {
  NOTIFICATION_MEDIUM_LIST_REQUEST: 'NOTIFICATION_MEDIUM_LIST_REQUEST',
  NOTIFICATION_MEDIUM_LIST_LOADING: 'NOTIFICATION_MEDIUM_LIST_LOADING',
  NOTIFICATION_MEDIUM_LIST_SUCCESS: 'NOTIFICATION_MEDIUM_LIST_SUCCESS',
  NOTIFICATION_MEDIUM_LIST_FAILURE: 'NOTIFICATION_MEDIUM_LIST_FAILURE',
  NOTIFICATION_MEDIUM_SEARCH_TERM: 'NOTIFICATION_MEDIUM_SEARCH_TERM',
  NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_REQUEST:
    'NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_REQUEST',
  NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_LOADING:
    'NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_LOADING',
  NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_SUCCESS:
    'NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_SUCCESS',
  NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_FAILURE:
    'NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_FAILURE',
};

export const notificationMediumDeleteConstants = {
  NOTIFICATION_MEDIUM_DELETE_REQUEST: 'NOTIFICATION_MEDIUM_DELETE_REQUEST',
  NOTIFICATION_MEDIUM_DELETE_LOADING: 'NOTIFICATION_MEDIUM_DELETE_LOADING',
  NOTIFICATION_MEDIUM_DELETE_SUCCESS: 'NOTIFICATION_MEDIUM_DELETE_SUCCESS',
  NOTIFICATION_MEDIUM_DELETE_FAILURE: 'NOTIFICATION_MEDIUM_DELETE_FAILURE',
  NOTIFICATION_MEDIUM_DELETE_RESET: 'NOTIFICATION_MEDIUM_DELETE_RESET',
};

export const classes = {
  addNotificationMediumButtonContainer: 'add-notification-medium-button-container',
  notificationMediumListContainer: 'notification-medium-list-container',
  notificationMediumTableContainer: 'notification-medium-table-container',
  notificationMediumTableActionCell: 'notification-medium-table-action-cell',
  notificationMediumTableActionEdit: 'notification-medium-table-action-edit',
  notificationMediumTableActionClone: 'notification-medium-table-action-clone',
  notificationMediumTableActionDelete: 'notification-medium-table-action-delete',
  disabledIcon: 'disabled-icon',
};

export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('GLOBAL_SETTINGS'),
    route: '/admin/global-settings',
  },
  {
    name: translate('NOTIFICATION_MEDIUMS'),
  },
];

export const notificationMediumConstants = {
  mainRole: 'main',
  searchDebounceTime: 300,
  actionIconSize: '24',
  mediumSize: 'medium',
  alertDialog: 'alert',
  variant: 'primary',
  secVariant: 'secondary',
  errorText: 'error',
  successText: 'success',
  testId: 'notification-medium-table',
  referencesFoundText: 'references found',
  emailText: 'Email',
};

export const tableColumns = {
  notificationMediumName: translate('NOTIFICATION_MEDIUM_MODULE.MEDIUM_NAME'),
  description: translate('DESCRIPTION'),
  application: translate('NOTIFICATION_MEDIUM_MODULE.APPLICATION'),
  action: translate('ACTION'),
};

export const translatedStrings = {
  pageTitle: translate('NOTIFICATION_MEDIUMS'),
  addNotificationMediumButton: translate('NOTIFICATION_MEDIUM_MODULE.ADD_NOTIFICATION_MEDIUM'),
  yesText: translate('YES'),
  noText: translate('NO'),
  notificationMediumLoadingMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_LOADING_MESSAGE'
  ),
  notificationMediumDeleteLoadingMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_DELETE_LOADING_MESSAGE'
  ),
  notificationMediumSearchPlaceholder: translate(
    'NOTIFICATION_MEDIUM_MODULE.NOTIFICATION_MEDIUM_SEARCH_PLACEHOLDER'
  ),
  deleteNotificationMediumSuccessMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_SUCCESS'
  ),
  deleteNotificationMediumDialogTitle: translate(
    'NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_DIALOG_TITLE'
  ),
  deleteNotificationMediumDialogMessage: translate(
    'NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_DIALOG_MESSAGE'
  ),
  deletePrimaryButton: translate('YES_DELETE'),
  nmFailureMessageForUsedMedium: translate(
    'NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_FAILURE_MESSAGE'
  ),
  nmFailureMessage: (reason) =>
    translate('NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION_MEDIUM_FAILURE', {
      reason,
    }),
  manageNotification: translate('NOTIFICATION_MEDIUM_MODULE.MANAGE_NOTIFICATION'),
  cloneNotification: translate('NOTIFICATION_MEDIUM_MODULE.CLONE_NOTIFICATION'),
  deleteNotification: translate('NOTIFICATION_MEDIUM_MODULE.DELETE_NOTIFICATION'),
  deniedCloneNotification: translate('NOTIFICATION_MEDIUM_MODULE.DENIED_CLONE_NOTIFICATION'),
  deniedDeleteNotification: translate('NOTIFICATION_MEDIUM_MODULE.DENIED_DELETE_NOTIFICATION'),
};

export const backToTopId = 'notification-mediums-list-back-to-top';
