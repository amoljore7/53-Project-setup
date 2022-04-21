/* eslint-disable no-case-declarations */
import {
  secretListTypes,
  secretDeleteTypes,
  fetchUsersType,
  fetchAdminGroupsType,
} from './constants';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';

const initialState = {
  loading: false,
  result: [],
  selectedNodeMetadata: {},
  pagination: {
    next: '',
    prev: '',
  },
  error: null,
  searchTerm: '',
};

const deleteInitialState = {
  error: null,
  status: 0,
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
        pagination: {
          ...action.payload?.secretListPagination,
        },
        selectedNodeMetadata: action.payload?.selectedNodeMetadata,
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

export const deleteSecret = (state = deleteInitialState, action) => {
  switch (action.type) {
    case secretDeleteTypes.SECRET_DELETE_LOADING:
      return {
        ...state,
      };
    case secretDeleteTypes.SECRET_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        status: 204,
      };
    case secretDeleteTypes.SECRET_DELETE_FAILURE:
      return {
        ...state,
        error: action.payload?.status,
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
    case fetchUsersType.FETCH_ADMIN_LOADING_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case fetchUsersType.FETCH_ADMIN_SUCCESS_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case fetchUsersType.FETCH_ADMIN_FAILURE_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case fetchUsersType.FETCH_ADMIN_RESET_VIEW_SECRET:
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
    case fetchAdminGroupsType.FETCH_ADMIN_GROUPS_LOADING_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case fetchAdminGroupsType.FETCH_ADMIN_GROUPS_SUCCESS_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case fetchAdminGroupsType.FETCH_ADMIN_GROUPS_FAILURE_VIEW_SECRET:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case fetchAdminGroupsType.FETCH_ADMIN_GROUPS_RESET_VIEW_SECRET:
      return {
        ...groupsInitialState,
      };
    default:
      return state;
  }
};
