import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { PasswordPolicyDeleteConstants, PasswordPolicyListConstants } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  result: [],
  pagination: {
    next: '',
    prev: '',
  },
  searchTerm: '',
};

const deleteInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
};

export const passwordPolicyList = (state = initialState, action) => {
  switch (action.type) {
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        result: action.payload?.result,
        pagination: action.payload?.pagination,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        error: null,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case PasswordPolicyListConstants.PASSWORD_POLICY_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export const deletePasswordPolicy = (state = deleteInitialState, action) => {
  switch (action.type) {
    case PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
      };
    case PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    case PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_RESET:
      return {
        ...deleteInitialState,
      };
    default:
      return state;
  }
};
