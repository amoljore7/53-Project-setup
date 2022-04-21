import { GroupsType, ServiceIdentitiesType, TokensType, UsersType } from './constants';

export const getUsersRequest = () => {
  return {
    type: UsersType.USERS_REQUEST,
  };
};

export const getUsersRequestLoading = () => {
  return {
    type: UsersType.USERS_LOADING,
  };
};
export const getUsersRequestSuccess = (payload) => {
  return {
    type: UsersType.USERS_SUCCESS,
    payload,
  };
};

export const getUsersRequestFailure = (reason) => {
  return {
    type: UsersType.USERS_FAILURE,
    payload: reason,
  };
};

export const getGroupsRequest = () => {
  return {
    type: GroupsType.GROUPS_REQUEST,
  };
};

export const getGroupsRequestLoading = () => {
  return {
    type: GroupsType.GROUPS_LOADING,
  };
};
export const getGroupsRequestSuccess = (payload) => {
  return {
    type: GroupsType.GROUPS_SUCCESS,
    payload,
  };
};

export const getGroupsRequestFailure = (reason) => {
  return {
    type: GroupsType.GROUPS_FAILURE,
    payload: reason,
  };
};

export const getServiceIdentitiesRequest = () => {
  return {
    type: ServiceIdentitiesType.SERVICE_IDENTITY_REQUEST,
  };
};

export const getServiceIdentitiesRequestLoading = () => {
  return {
    type: ServiceIdentitiesType.SERVICE_IDENTITY_LOADING,
  };
};
export const getServiceIdentitiesRequestSuccess = (payload) => {
  return {
    type: ServiceIdentitiesType.SERVICE_IDENTITY_SUCCESS,
    payload,
  };
};

export const getServiceIdentitiesRequestFailure = (reason) => {
  return {
    type: ServiceIdentitiesType.SERVICE_IDENTITY_FAILURE,
    payload: reason,
  };
};

export const getTokensRequest = () => {
  return {
    type: TokensType.TOKENS_REQUEST,
  };
};

export const getTokensRequestLoading = () => {
  return {
    type: TokensType.TOKENS_LOADING,
  };
};
export const getTokensRequestSuccess = (payload) => {
  return {
    type: TokensType.TOKENS_SUCCESS,
    payload,
  };
};

export const getTokensRequestFailure = (reason) => {
  return {
    type: TokensType.TOKENS_FAILURE,
    payload: reason,
  };
};
