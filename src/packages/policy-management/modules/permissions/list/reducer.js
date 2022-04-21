import { PermissionsListingTypes, DeletePermissionsTypes } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {
    result: [],
    pagination: {
      next: '',
      prev: '',
    },
  },
  searchTerm: '',
};

export const permissionsTableList = (state = initialState, action) => {
  switch (action.type) {
    case PermissionsListingTypes.PERMISSIONS_LISTING_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };

    case PermissionsListingTypes.PERMISSIONS_LISTING_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: {
          result: [...action.payload?.result],
          pagination: {
            ...action.payload?.pagination,
          },
        },
        error: null,
      };

    case PermissionsListingTypes.PERMISSIONS_LISTING_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
      };
    case PermissionsListingTypes.PERMISSIONS_LISTING_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: {
          result: [...state.data?.result, ...action.payload?.result],
          pagination: {
            ...action.payload?.pagination,
          },
        },
        error: null,
      };
    case PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const deletePermissionsInitialState = {
  status: RESOURCE_STATUS.INITIAL,
};

export const deletePermissions = (state = deletePermissionsInitialState, action) => {
  switch (action.type) {
    case DeletePermissionsTypes.PERMISSIONS_DELETE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case DeletePermissionsTypes.PERMISSIONS_DELETE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case DeletePermissionsTypes.PERMISSIONS_DELETE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
      };
    default:
      return state;
  }
};
