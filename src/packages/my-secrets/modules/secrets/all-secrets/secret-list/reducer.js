/* eslint-disable no-case-declarations */
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import {
  fetchUsersType,
  SecretDetailsTypes,
  secretListTypes,
  secretTemplateDetailsTypes,
  fetchGroupsType,
} from './constants';

const initialState = {
  loading: false,
  result: [],
  pagination: {
    next: '',
    prev: '',
  },
  error: null,
  searchTerm: '',
};

export const secretList = (state = initialState, action) => {
  switch (action.type) {
    case secretListTypes.SECRET_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case secretListTypes.SECRET_LIST_SUCCESS:
      return {
        ...state,
        result: [...action.payload?.secretListData],
        pagination: action.payload?.secretListPagination,
        loading: false,
      };
    case secretListTypes.SECRET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        result: [],
      };
    case secretListTypes.SECRET_LIST_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case secretListTypes.SECRET_LIST_LOAD_MORE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case secretListTypes.SECRET_LIST_LOAD_MORE_SUCCESS:
      return {
        ...state,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
        loading: false,
      };
    case secretListTypes.SECRET_LIST_LOAD_MORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const secretDetailsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const secretDetails = (state = secretDetailsInitialState, action) => {
  switch (action.type) {
    case SecretDetailsTypes.SECRET_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case SecretDetailsTypes.SECRET_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case SecretDetailsTypes.SECRET_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: {},
      };
    case SecretDetailsTypes.SECRET_DETAILS_RESET:
      return {
        ...secretDetailsInitialState,
      };
    default:
      return state;
  }
};

const secretTemplateDetailsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const secretTemplateDetails = (state = secretTemplateDetailsInitialState, action) => {
  switch (action.type) {
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload?.response?.data,
      };
    default:
      return state;
  }
};

const usersInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

export const userDetails = (state = usersInitialState, action) => {
  switch (action.type) {
    case fetchUsersType.FETCH_USERS_LOADING_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case fetchUsersType.FETCH_USERS_SUCCESS_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case fetchUsersType.FETCH_USERS_FAILURE_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case fetchUsersType.FETCH_USERS_RESET_VIEW_SECRET:
      return {
        ...usersInitialState,
      };
    default:
      return state;
  }
};

const groupsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

export const groupsDetails = (state = groupsInitialState, action) => {
  switch (action.type) {
    case fetchGroupsType.FETCH_GROUPS_LOADING_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case fetchGroupsType.FETCH_GROUPS_SUCCESS_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case fetchGroupsType.FETCH_GROUPS_FAILURE_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case fetchGroupsType.FETCH_GROUPS_RESET_VIEW_SECRET:
      return {
        ...groupsInitialState,
      };
    default:
      return state;
  }
};
