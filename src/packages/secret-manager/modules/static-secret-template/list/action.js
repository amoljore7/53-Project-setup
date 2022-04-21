import { StaticSecretTemplateListTypes, StaticSecretTemplateDelete } from './constants';

export const requestStaticSecretTemplateList = () => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_REQUEST,
  };
};

export const loadingStaticSecretTemplateList = () => {
  return { type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOADING };
};

export const successStaticSecretTemplateList = (tableList) => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_SUCCESS,
    payload: tableList,
  };
};

export const failStaticSecretTemplateList = (reason) => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_FAILURE,
    payload: { error: reason },
  };
};

export const requestStaticSecretTemplateListLoadMore = () => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_REQUEST,
  };
};

export const loadingStaticSecretTemplateListLoadMore = () => {
  return { type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_LOADING };
};

export const successStaticSecretTemplateListLoadMore = (tableList) => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_SUCCESS,
    payload: tableList,
  };
};

export const failStaticSecretTemplateListLoadMore = (reason) => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_FAILURE,
    payload: { error: reason },
  };
};

export const updateStaticSecretTemplateListSearchTerm = (search) => {
  return {
    type: StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_SEARCH_TERM_UPDATE,
    payload: search,
  };
};

export const requestStaticSecretTemplateDelete = (id, history) => {
  return {
    type: StaticSecretTemplateDelete.STATIC_SECRET_DELETE_REQUEST,
    payload: { id, history },
  };
};

export const loadingStaticSecretTemplateDelete = () => {
  return {
    type: StaticSecretTemplateDelete.STATIC_SECRET_DELETE_LOADING,
  };
};

export const successStaticSecretTemplateDelete = (deletePermissionStatus) => {
  return {
    type: StaticSecretTemplateDelete.STATIC_SECRET_DELETE_SUCCESS,
    payload: deletePermissionStatus,
  };
};

export const failStaticSecretTemplateDelete = (reason) => {
  return {
    type: StaticSecretTemplateDelete.STATIC_SECRET_DELETE_FAILURE,
    payload: { error: reason },
  };
};
