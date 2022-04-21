import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../utils/common-constants';
import {
  EditPermissionActionsType,
  EditPermissionDetailsType,
  editPermissionsListType,
  EditPolicyType,
  EditRolesDetailsType,
  editRolesListType,
  LoadPolicyDataType,
} from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const editPolicy = (state = initialState, action) => {
  switch (action.type) {
    case EditPolicyType.EDIT_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case EditPolicyType.EDIT_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload.result },
        error: null,
      };
    case EditPolicyType.EDIT_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const editPermissionListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const permissionList = (state = editPermissionListInitialState, action) => {
  switch (action.type) {
    case editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        data: [...state?.data, ...action.payload],
      };
    case editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case editPermissionsListType.RECURSIVE_EDIT_PERMISSIONS_LIST_RESET:
      return {
        ...editPermissionListInitialState,
      };
    default:
      return state;
  }
};

const permissionActionsList = (state = initialState, action) => {
  switch (action.type) {
    case EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const permissionDetails = (state = initialState, action) => {
  switch (action.type) {
    case EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };
    case EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const editRoleListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const rolesList = (state = editRoleListInitialState, action) => {
  switch (action.type) {
    case editRolesListType.RECURSIVE_EDIT_ROLES_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case editRolesListType.RECURSIVE_EDIT_ROLES_LIST_SUCCESS:
      return {
        ...state,
        data: [...state?.data, ...action.payload],
      };
    case editRolesListType.RECURSIVE_EDIT_ROLES_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case editRolesListType.RECURSIVE_EDIT_ROLES_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case editRolesListType.RECURSIVE_EDIT_ROLES_LIST_RESET:
      return {
        ...editRoleListInitialState,
      };
    default:
      return state;
  }
};

const roleDetails = (state = initialState, action) => {
  switch (action.type) {
    case EditRolesDetailsType.EDIT_ROLES_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case EditRolesDetailsType.EDIT_ROLES_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case EditRolesDetailsType.EDIT_ROLES_DETAILS_FAILURE:
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
    case LoadPolicyDataType.EDIT_LOAD_POLICY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
        data: null,
      };
    case LoadPolicyDataType.EDIT_LOAD_POLICY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case LoadPolicyDataType.EDIT_LOAD_POLICY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };

    case LoadPolicyDataType.EDIT_LOAD_POLICY_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const loadPolicyJSON = (state = initialState, action) => {
  switch (action.type) {
    case LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
        data: null,
      };
    case LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };

    case LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const editPolicyReducer = combineReducers({
  editPolicy,
  permissionList,
  permissionActionsList,
  permissionDetails,
  rolesList,
  roleDetails,
  loadPolicy,
  loadPolicyJSON,
});
export default editPolicyReducer;
