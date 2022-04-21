import {
  fetchUsersType,
  SecretDetailsTypes,
  secretListTypes,
  secretTemplateDetailsTypes,
  fetchGroupsType,
} from './constants';

export const requestSecretList = (parents, search) => {
  return {
    type: secretListTypes.SECRET_LIST_REQUEST,
    payload: {
      parents,
      search,
    },
  };
};

export const loadingSecretList = () => {
  return { type: secretListTypes.SECRET_LIST_LOADING };
};

export const successSecretList = (secretListData, secretListPagination) => {
  return {
    type: secretListTypes.SECRET_LIST_SUCCESS,
    payload: { secretListData, secretListPagination },
  };
};

export const failureSecretList = (error) => {
  return {
    type: secretListTypes.SECRET_LIST_FAILURE,
    payload: error,
  };
};

export const requestSecretDetails = (path, data) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_REQUEST,
    payload: {
      path,
      data,
    },
  };
};

export const loadingSecretDetails = () => {
  return { type: SecretDetailsTypes.SECRET_DETAILS_LOADING };
};

export const successSecretDetails = (secretData) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_SUCCESS,
    payload: secretData,
  };
};

export const failureSecretDetails = (payload) => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_FAILURE,
    payload: payload,
  };
};

export const resetSecretDetails = () => {
  return {
    type: SecretDetailsTypes.SECRET_DETAILS_RESET,
  };
};

export const requestSecretListLoadMore = (parents) => {
  return {
    type: secretListTypes.SECRET_LIST_LOAD_MORE_REQUEST,
    payload: {
      parents,
    },
  };
};

export const loadingSecretListLoadMore = () => {
  return { type: secretListTypes.SECRET_LIST_LOAD_MORE_LOADING };
};

export const successSecretListLoadMore = (secretListData) => {
  return {
    type: secretListTypes.SECRET_LIST_LOAD_MORE_SUCCESS,
    payload: secretListData,
  };
};

export const failureSecretListLoadMore = (error) => {
  return {
    type: secretListTypes.SECRET_LIST_LOAD_MORE_FAILURE,
    payload: error,
  };
};

export const updateSecretListSearchTerm = (search) => {
  return {
    type: secretListTypes.SECRET_LIST_SEARCH_TERM_UPDATE,
    payload: search,
  };
};

export const requestSecretTemplateDetails = (staticSecretTemplateId) => {
  return {
    type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_REQUEST,
    payload: {
      id: staticSecretTemplateId,
    },
  };
};

export const loadingSecretTemplateDetails = () => {
  return { type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_LOADING };
};

export const successSecretTemplateDetails = (secretTemplateData) => {
  return {
    type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_SUCCESS,
    payload: secretTemplateData,
  };
};

export const failureSecretTemplateDetails = (error) => {
  return {
    type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_FAILURE,
    payload: error,
  };
};

export const loadingUserDetails = () => {
  return { type: fetchUsersType.FETCH_USERS_LOADING_VIEW_SECRET };
};

export const successUserDetails = (userData) => {
  return {
    type: fetchUsersType.FETCH_USERS_SUCCESS_VIEW_SECRET,
    payload: userData,
  };
};

export const failureUserDetails = (error) => {
  return {
    type: fetchUsersType.FETCH_USERS_FAILURE_VIEW_SECRET,
    payload: error,
  };
};

export const resetUserDetails = () => {
  return {
    type: fetchUsersType.FETCH_USERS_RESET_VIEW_SECRET,
  };
};

export const loadingGroupsDetails = () => {
  return { type: fetchGroupsType.FETCH_GROUPS_LOADING_VIEW_SECRET };
};

export const successGroupsDetails = (userData) => {
  return {
    type: fetchGroupsType.FETCH_GROUPS_SUCCESS_VIEW_SECRET,
    payload: userData,
  };
};

export const failureGroupsDetails = (error) => {
  return {
    type: fetchGroupsType.FETCH_GROUPS_FAILURE_VIEW_SECRET,
    payload: error,
  };
};

export const resetGroupsDetails = () => {
  return {
    type: fetchGroupsType.FETCH_GROUPS_RESET_VIEW_SECRET,
  };
};
