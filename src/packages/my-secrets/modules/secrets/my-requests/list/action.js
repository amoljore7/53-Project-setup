import { MyRequestsDataTypes, UsersType, TagsType } from './constants';

export const requestMyRequestsList = (consumer) => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_REQUEST,
    payload: { consumer },
  };
};

export const requestUpdateMyRequestsListSearchTerm = (search) => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_SEARCH_TERM_UPDATE,
    payload: search,
  };
};

export const requestMyRequestsListLoadMore = () => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_REQUEST,
  };
};

export const loadingMyRequestsListLoadMore = () => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_LOADING,
  };
};

export const successMyRequestsListLoadMore = (data) => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_SUCCESS,
    payload: data,
  };
};

export const failureMyRequestsListLoadMore = (reason) => {
  return {
    type: MyRequestsDataTypes.MY_REQUESTS_LIST_LOAD_MORE_FAILURE,
    payload: reason,
  };
};

export const requestUsersList = () => ({
  type: UsersType.USERS_REQUEST,
});

export const loadingUsersList = () => ({
  type: UsersType.USERS_LOADING,
});

export const successUsersList = (data) => ({
  type: UsersType.USERS_SUCCESS,
  payload: data,
});

export const failureUsersList = (reason) => ({
  type: UsersType.USERS_FAILURE,
  payload: reason,
});

export const requestTagsList = () => {
  return {
    type: TagsType.USER_TAGS_REQUEST,
  };
};

export const loadingTagsList = () => ({
  type: TagsType.USER_TAGS_LOADING,
});

export const successTagsList = (data) => ({
  type: TagsType.USER_TAGS_SUCCESS,
  payload: data,
});

export const failureTagsList = (reason) => ({
  type: TagsType.USER_TAGS_FAILURE,
  payload: reason,
});
