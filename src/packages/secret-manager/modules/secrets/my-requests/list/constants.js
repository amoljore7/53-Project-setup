import { translate } from '../../../../externalization';

export const pageTitle = translate('BRITIVE_VAULT');
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATOR'),
    route: '/admin',
  },
  {
    name: translate('SECRETS_MANAGER'),
    route: '/admin/secret-manager',
  },
  {
    name: translate('BRITIVE_VAULT'),
    route: '/admin/secret-manager/vault',
  },
];

export const MyRequestsDataTypes = {
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  MY_REQUESTS_LIST_REQUEST: 'MY_REQUESTS_LIST_REQUEST',
  MY_REQUESTS_LIST_LOADING: 'MY_REQUESTS_LIST_LOADING',
  MY_REQUESTS_LIST_SUCCESS: 'MY_REQUESTS_LIST_SUCCESS',
  MY_REQUESTS_LIST_FAILURE: 'MY_REQUESTS_LIST_FAILURE',
  MY_REQUESTS_LIST_SEARCH_TERM_UPDATE: 'MY_REQUESTS_LIST_SEARCH_TERM_UPDATE',
  MY_REQUESTS_LIST_LOAD_MORE_REQUEST: 'MY_REQUESTS_LIST_LOAD_MORE_REQUEST',
  MY_REQUESTS_LIST_LOAD_MORE_LOADING: 'MY_REQUESTS_LIST_LOAD_MORE_LOADING',
  MY_REQUESTS_LIST_LOAD_MORE_SUCCESS: 'MY_REQUESTS_LIST_LOAD_MORE_SUCCESS',
  MY_REQUESTS_LIST_LOAD_MORE_FAILURE: 'MY_REQUESTS_LIST_LOAD_MORE_FAILURE',
};

export const UsersType = {
  MY_REQUEST_USERS_REQUEST: 'MY_REQUEST_USERS_REQUEST',
  MY_REQUEST_USERS_LOADING: 'MY_REQUEST_USERS_LOADING',
  MY_REQUEST_USERS_SUCCESS: 'MY_REQUEST_USERS_SUCCESS',
  MY_REQUEST_USERS_FAILURE: 'MY_REQUEST_USERS_FAILURE',
};

export const tableColumns = {
  requestedOn: translate('MY_APPROVALS_AND_REQUEST_MODULE.REQUESTED_ON'),
  actionType: translate('ACTION'),
  resourceName: translate('RESOURCE'),
  justification: translate('JUSTIFICATION'),
  approvers: translate('APPROVERS'),
  approvalStatus: translate('MY_APPROVALS_AND_REQUEST_MODULE.APPROVAL_STATUS'),
};

export const translatedStrings = {
  noneValue: translate('NONE'),
  myRequestsSearchText: translate('MY_APPROVALS_AND_REQUEST_MODULE.SEARCH_NOT_SUPPORTED'),
  loadingMessage: translate('LOADING'),
};

export const active = 'active';
