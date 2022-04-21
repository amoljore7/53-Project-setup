import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import {
  AddPolicyType,
  approvalChannelListType,
  approvalNotificationMediumListType,
  PermissionActionsType,
  PermissionDetailsType,
  permissionsListType,
  RolesDetailsType,
  rolesListType,
} from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const notificationMedium = (state = initialState, action) => {
  switch (action.type) {
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const channelListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const channelList = (state = channelListInitialState, action) => {
  switch (action.type) {
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_RESET:
      return {
        ...channelListInitialState,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    default:
      return state;
  }
};

const addPolicy = (state = initialState, action) => {
  switch (action.type) {
    case AddPolicyType.POLICY_CREATE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case AddPolicyType.POLICY_CREATE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload.result },
        error: null,
      };
    case AddPolicyType.POLICY_CREATE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const permissionListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const permissionList = (state = permissionListInitialState, action) => {
  switch (action.type) {
    case permissionsListType.RECURSIVE_PERMISSIONS_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case permissionsListType.RECURSIVE_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case permissionsListType.RECURSIVE_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case permissionsListType.RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case permissionsListType.RECURSIVE_PERMISSIONS_LIST_RESET:
      return {
        ...permissionListInitialState,
      };

    default:
      return state;
  }
};

const permissionActionsList = (state = initialState, action) => {
  switch (action.type) {
    case PermissionActionsType.PERMISSION_ACTIONS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PermissionActionsType.PERMISSION_ACTIONS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case PermissionActionsType.PERMISSION_ACTIONS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case PermissionActionsType.PERMISSION_ACTIONS_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const permissionDetails = (state = initialState, action) => {
  switch (action.type) {
    case PermissionDetailsType.PERMISSION_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PermissionDetailsType.PERMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case PermissionDetailsType.PERMISSION_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const roleListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const rolesList = (state = roleListInitialState, action) => {
  switch (action.type) {
    case rolesListType.RECURSIVE_ROLES_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case rolesListType.RECURSIVE_ROLES_LIST_SUCCESS:
      return {
        ...state,
        data: [...state?.data, ...action?.payload],
      };
    case rolesListType.RECURSIVE_ROLES_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case rolesListType.RECURSIVE_ROLES_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case rolesListType.RECURSIVE_ROLES_LIST_RESET:
      return {
        ...roleListInitialState,
      };
    default:
      return state;
  }
};

const roleDetails = (state = initialState, action) => {
  switch (action.type) {
    case RolesDetailsType.ROLES_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case RolesDetailsType.ROLES_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case RolesDetailsType.ROLES_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const addPolicyReducer = combineReducers({
  addPolicy,
  permissionList,
  permissionActionsList,
  permissionDetails,
  rolesList,
  roleDetails,
  notificationMedium,
  channelList,
});
export default addPolicyReducer;
