import {
  secretDeleteTypes,
  secretListTypes,
  fetchUsersType,
  fetchAdminGroupsType,
} from './constants';

export const requestSecretList = (parents) => {
  return {
    type: secretListTypes.SECRET_LIST_REQUEST,
    payload: {
      parents,
    },
  };
};

export const loadingSecretList = () => {
  return { type: secretListTypes.SECRET_LIST_LOADING };
};

export const successSecretList = (secretListData, selectedNodeMetadata, secretListPagination) => {
  return {
    type: secretListTypes.SECRET_LIST_SUCCESS,
    payload: { secretListData, selectedNodeMetadata, secretListPagination },
  };
};

export const failureSecretList = (error) => {
  return {
    type: secretListTypes.SECRET_LIST_FAILURE,
    payload: error,
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

export const deleteSecretAction = (id, parents) => {
  return {
    type: secretDeleteTypes.SECRET_DELETE_REQUEST,
    payload: {
      id,
      parents,
    },
  };
};

export const loadingAdminSecretDetails = () => {
  return { type: fetchUsersType.FETCH_ADMIN_LOADING_VIEW_SECRET };
};

export const successAdminSecretDetails = (userData) => {
  return {
    type: fetchUsersType.FETCH_ADMIN_SUCCESS_VIEW_SECRET,
    payload: userData,
  };
};

export const failureAdminSecretDetails = (error) => {
  return {
    type: fetchUsersType.FETCH_ADMIN_FAILURE_VIEW_SECRET,
    payload: error,
  };
};

export const resetAdminSecretDetails = () => {
  return {
    type: fetchUsersType.FETCH_ADMIN_RESET_VIEW_SECRET,
  };
};

export const loadingAdminGroupsDetails = () => {
  return { type: fetchAdminGroupsType.FETCH_ADMIN_GROUPS_LOADING_VIEW_SECRET };
};

export const successAdminGroupsDetails = (groupData) => {
  return {
    type: fetchAdminGroupsType.FETCH_ADMIN_GROUPS_SUCCESS_VIEW_SECRET,
    payload: groupData,
  };
};

export const failureAdminGroupsDetails = (error) => {
  return {
    type: fetchAdminGroupsType.FETCH_ADMIN_GROUPS_FAILURE_VIEW_SECRET,
    payload: error,
  };
};

export const resetAdminGroupsDetails = () => {
  return {
    type: fetchAdminGroupsType.FETCH_ADMIN_GROUPS_RESET_VIEW_SECRET,
  };
};
