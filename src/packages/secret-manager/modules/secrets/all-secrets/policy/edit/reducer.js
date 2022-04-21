import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../../../../../utils/common-constants';
import {
  EditConsumerListType,
  EditPermissionActionsType,
  EditPolicyType,
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

const consumerList = (state = initialState, action) => {
  switch (action.type) {
    case EditConsumerListType.EDIT_CONSUMER_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case EditConsumerListType.EDIT_CONSUMER_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload },
      };
    case EditConsumerListType.EDIT_CONSUMER_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
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

    default:
      return state;
  }
};

const editPolicyReducer = combineReducers({
  editPolicy,
  consumerList,
  permissionActionsList,
  loadPolicy,
});
export default editPolicyReducer;
