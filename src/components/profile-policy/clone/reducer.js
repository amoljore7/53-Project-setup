import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../utils/common-constants';
import {
  ClonePermissionActionsType,
  ClonePermissionDetailsType,
  clonePermissionsListType,
  ClonePolicyType,
  CloneRolesDetailsType,
  cloneRolesListType,
  LoadPolicyDataType,
} from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const clonePermissionListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const permissionList = (state = clonePermissionListInitialState, action) => {
  switch (action.type) {
    case clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: [],
      };
    case clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        data: [...state?.data, ...action?.payload],
      };
    case clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case clonePermissionsListType.RECURSIVE_CLONE_PERMISSIONS_LIST_RESET:
      return {
        ...clonePermissionListInitialState,
      };
    default:
      return state;
  }
};

const permissionActionsList = (state = initialState, action) => {
  switch (action.type) {
    case ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case ClonePermissionActionsType.PERMISSION_ACTIONS_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const permissionDetails = (state = initialState, action) => {
  switch (action.type) {
    case ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };
    case ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const cloneRoleInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const rolesList = (state = cloneRoleInitialState, action) => {
  switch (action.type) {
    case cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: [],
      };
    case cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_SUCCESS:
      return {
        ...state,
        data: [...state?.data, ...action.payload],
      };
    case cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case cloneRolesListType.RECURSIVE_CLONE_ROLES_LIST_RESET:
      return {
        ...cloneRoleInitialState,
      };
    default:
      return state;
  }
};

const roleDetails = (state = initialState, action) => {
  switch (action.type) {
    case CloneRolesDetailsType.CLONE_ROLES_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case CloneRolesDetailsType.CLONE_ROLES_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case CloneRolesDetailsType.CLONE_ROLES_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const loadPolicy = (state = initialState, action) => {
  switch (action.type) {
    case LoadPolicyDataType.CLONE_LOAD_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case LoadPolicyDataType.CLONE_LOAD_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case LoadPolicyDataType.CLONE_LOAD_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };

    case LoadPolicyDataType.CLONE_LOAD_POLICY_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const loadPolicyJSON = (state = initialState, action) => {
  switch (action.type) {
    case LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };

    case LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const addPolicy = (state = initialState, action) => {
  switch (action.type) {
    case ClonePolicyType.CLONE_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case ClonePolicyType.CLONE_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload.result },
        error: null,
      };
    case ClonePolicyType.CLONE_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const clonePolicyReducer = combineReducers({
  permissionList,
  permissionActionsList,
  permissionDetails,
  rolesList,
  roleDetails,
  loadPolicy,
  loadPolicyJSON,
  addPolicy,
});
export default clonePolicyReducer;
