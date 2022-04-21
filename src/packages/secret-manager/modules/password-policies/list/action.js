import { PasswordPolicyDeleteConstants, PasswordPolicyListConstants } from './constants';

export const requestPasswordPolicyList = () => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_REQUEST,
  };
};

export const loadingPasswordPolicyList = () => {
  return { type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOADING };
};

export const successPasswordPolicyList = (passwordPolicyData) => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_SUCCESS,
    payload: passwordPolicyData,
  };
};

export const failurePasswordPolicyList = (error) => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_FAILURE,
    payload: error,
  };
};

export const requestPasswordPolicyListLoadMore = () => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_REQUEST,
  };
};

export const loadingPasswordPolicyListLoadMore = () => {
  return { type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_LOADING };
};

export const successPasswordPolicyListLoadMore = (passwordPolicyData) => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_SUCCESS,
    payload: passwordPolicyData,
  };
};

export const failurePasswordPolicyListLoadMore = (error) => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_FAILURE,
    payload: error,
  };
};

export const updatePasswordPolicyListSearchTerm = (search) => {
  return {
    type: PasswordPolicyListConstants.PASSWORD_POLICY_LIST_SEARCH_TERM_UPDATE,
    payload: search,
  };
};

export const requestPasswordPolicyDelete = (id) => {
  return {
    type: PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_REQUEST,
    payload: {
      id,
    },
  };
};

export const loadingPasswordPolicyDelete = () => {
  return { type: PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_LOADING };
};

export const successPasswordPolicyDelete = () => {
  return {
    type: PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_SUCCESS,
  };
};

export const failurePasswordPolicyDelete = (error) => {
  return {
    type: PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_FAILURE,
    payload: error,
  };
};

export const resetPasswordPolicyDelete = () => {
  return {
    type: PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_RESET,
    payload: {},
  };
};
