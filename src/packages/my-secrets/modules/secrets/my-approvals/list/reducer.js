import { MyApprovalsDataTypes, UsersType } from './constants';

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

export const myApprovalsList = (state = initialState, action) => {
  switch (action.type) {
    case MyApprovalsDataTypes.MY_APPROVALS_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MyApprovalsDataTypes.MY_APPROVALS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        error: null,
      };

    case MyApprovalsDataTypes.MY_APPROVALS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MyApprovalsDataTypes.MY_APPROVALS_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        loading: false,
      };
    case MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const usersInitialState = {
  loading: false,
  error: null,
  data: {},
};

export const usersList = (state = usersInitialState, action) => {
  switch (action.type) {
    case UsersType.APPROVALS_USERS_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case UsersType.APPROVALS_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { result: action.payload },
      };

    case UsersType.APPROVALS_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      };
    default:
      return state;
  }
};
