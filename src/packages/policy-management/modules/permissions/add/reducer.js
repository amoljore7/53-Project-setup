import {
  AddPermissionsTypes,
  PermissionsActionsListTypes,
  ApplicationsListTypes,
} from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const addPermissionsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

export const addPermission = (state = addPermissionsInitialState, action) => {
  switch (action.type) {
    case AddPermissionsTypes.PERMISSIONS_ADD_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };

    case AddPermissionsTypes.PERMISSIONS_ADD_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case AddPermissionsTypes.PERMISSIONS_ADD_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.errorStatus,
      };
    case AddPermissionsTypes.PERMISSIONS_FLUSH_DATA:
      return {
        ...addPermissionsInitialState,
      };

    default:
      return state;
  }
};

const actionsListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

export const permissionActionsList = (state = actionsListInitialState, action) => {
  switch (action.type) {
    case PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case AddPermissionsTypes.PERMISSIONS_FLUSH_DATA:
      return {
        ...actionsListInitialState,
      };
    default:
      return state;
  }
};

const allApplications = { appContainerId: '*', applicationName: 'All' };

const applicationsListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [allApplications],
};

export const permissionApplicationsList = (state = applicationsListInitialState, action) => {
  switch (action.type) {
    case ApplicationsListTypes.APPLICATION_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case ApplicationsListTypes.APPLICATION_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: [...applicationsListInitialState.data, ...action.payload],
        error: null,
      };
    case ApplicationsListTypes.APPLICATION_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};
