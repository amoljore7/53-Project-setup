import { StaticSecretTemplateListTypes, StaticSecretTemplateDelete } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  result: [],
  pagination: { next: '', prev: '' },
  searchTerm: '',
};

export const staticSecretTemplateList = (state = initialState, action) => {
  switch (action.type) {
    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };

    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
        result: [...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
      };

    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
        result: [],
        pagination: { ...initialState.pagination },
      };
    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
        result: [...state.result, ...action.payload?.result],
        pagination: {
          ...action.payload?.pagination,
        },
      };
    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
      };
    case StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};

const deleteSecretInitialState = {
  status: RESOURCE_STATUS.INITIAL,
};

export const staticSecretTemplateDelete = (state = deleteSecretInitialState, action) => {
  switch (action.type) {
    case StaticSecretTemplateDelete.STATIC_SECRET_DELETE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case StaticSecretTemplateDelete.STATIC_SECRET_DELETE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case StaticSecretTemplateDelete.STATIC_SECRET_DELETE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
      };
    default:
      return state;
  }
};
