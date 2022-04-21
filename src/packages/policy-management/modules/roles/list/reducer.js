import { RolesListDataConstants } from './constants';

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

const rolesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case RolesListDataConstants.ROLES_LIST_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RolesListDataConstants.ROLES_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
      };
    case RolesListDataConstants.ROLES_LIST_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RolesListDataConstants.ROLE_DELETE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RolesListDataConstants.ROLE_DELETE_REQUEST_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case RolesListDataConstants.ROLE_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        loading: false,
      };
    case RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rolesListReducer;
