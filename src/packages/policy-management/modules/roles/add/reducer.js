import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import {
  AddRoleTypes,
  GetActionTypes,
  GetAllPermissionsTypes,
  GetPermissionDataTypes,
} from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const addRoleData = (state = initialState, action) => {
  switch (action.type) {
    case AddRoleTypes.ADD_ROLE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case AddRoleTypes.ADD_ROLE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case AddRoleTypes.ADD_ROLE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action?.payload,
      };
    case AddRoleTypes.ADD_ROLE_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export const actionData = (state = initialState, action) => {
  switch (action.type) {
    case GetActionTypes.GET_ACTION_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case GetActionTypes.GET_ACTION_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case GetActionTypes.GET_ACTION_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case GetActionTypes.GET_ACTION_RESET:
      return {
        ...initialState,
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

export const permissionList = (state = permissionListInitialState, action) => {
  switch (action.type) {
    case GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case GetAllPermissionsTypes.ROLE_RECURSIVE_PERMISSIONS_LIST_RESET:
      return {
        ...permissionListInitialState,
      };

    default:
      return state;
  }
};

export const permissionData = (state = initialState, action) => {
  switch (action.type) {
    case GetPermissionDataTypes.GET_PERMISSION_DATA_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case GetPermissionDataTypes.GET_PERMISSION_DATA_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case GetPermissionDataTypes.GET_PERMISSION_DATA_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case GetPermissionDataTypes.GET_PERMISSION_DATA_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
