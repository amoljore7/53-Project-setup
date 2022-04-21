import { combineReducers } from 'redux';
import { PolicyListDataTypes } from './constants';

const initialState = {
  loading: false,
  error: null,
  result: [],
  pagination: {
    next: '',
    prev: '',
  },
  searchTerm: '',
};

const policyList = (state = initialState, action) => {
  switch (action.type) {
    case PolicyListDataTypes.POLICY_LIST_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyListDataTypes.POLICY_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
      };
    case PolicyListDataTypes.POLICY_LIST_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        result: [],
      };
    case PolicyListDataTypes.POLICY_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        loading: false,
      };
    case PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const deletePolicy = (state = initialState, action) => {
  switch (action.type) {
    case PolicyListDataTypes.POLICY_DELETE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyListDataTypes.POLICY_DELETE_REQUEST_COMPLETE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const togglePolicy = (state = initialState, action) => {
  switch (action.type) {
    case PolicyListDataTypes.POLICY_TOGGLE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyListDataTypes.POLICY_TOGGLE_REQUEST_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case PolicyListDataTypes.POLICY_TOGGLE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};

const policyListReducer = combineReducers({
  list: policyList,
  delete: deletePolicy,
  toggle: togglePolicy,
});
export default policyListReducer;
