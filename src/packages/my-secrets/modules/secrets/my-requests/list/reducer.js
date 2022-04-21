import { MyRequestsDataTypes, UsersType, TagsType } from './constants';

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

export const myRequestsList = (state = initialState, action) => {
  switch (action.type) {
    case MyRequestsDataTypes.MY_REQUESTS_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MyRequestsDataTypes.MY_REQUESTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        error: null,
      };

    case MyRequestsDataTypes.MY_REQUESTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MyRequestsDataTypes.MY_REQUESTS_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        loading: false,
      };
    case MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_FAILURE:
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
    case UsersType.USERS_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case UsersType.USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { result: action.payload },
      };

    case UsersType.USERS_FAILURE:
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

const tagsInitialState = {
  loading: false,
  error: null,
  data: {},
};

export const tagsList = (state = tagsInitialState, action) => {
  switch (action.type) {
    case TagsType.USER_TAGS_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case TagsType.USER_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { result: action.payload },
      };

    case TagsType.USER_TAGS_FAILURE:
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
