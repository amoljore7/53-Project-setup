import {
  MyApprovalsDataTypes,
  ApproveRequestDataTypes,
  RejectRequestDataTypes,
  UsersType,
} from './constants';

export const requestMyApprovalsList = (consumer) => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_REQUEST,
    payload: { consumer }
  };
};

export const requestUpdateMyApprovalsListSearchTerm = (search) => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_SEARCH_TERM_UPDATE,
    payload: search,
  };
};

export const requestMyApprovalsListLoadMore = () => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_REQUEST,
  };
};

export const loadingMyApprovalsListLoadMore = () => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_LOADING,
  };
};

export const successMyApprovalsListLoadMore = (data) => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_SUCCESS,
    payload: data,
  };
};

export const failureMyApprovalsListLoadMore = (reason) => {
  return {
    type: MyApprovalsDataTypes.MY_APPROVALS_LIST_LOAD_MORE_FAILURE,
    payload: reason,
  };
};

export const approveRequest = (approvalId, value, commandText) => {
  return {
    type: ApproveRequestDataTypes.APPROVE_REQUEST_REQUEST,
    payload: { approvalId, value, commandText },
  };
};

export const rejectRequest = (approvalId, value, commandText) => {
  return {
    type: RejectRequestDataTypes.REJECT_REQUEST_REQUEST,
    payload: { approvalId, value, commandText },
  };
};

export const requestUsersList = () => ({
  type: UsersType.APPROVALS_USERS_REQUEST,
});

export const loadingUsersList = () => ({
  type: UsersType.APPROVALS_USERS_LOADING,
});

export const successUsersList = (data) => ({
  type: UsersType.APPROVALS_USERS_SUCCESS,
  payload: data,
});

export const failureUsersList = (reason) => ({
  type: UsersType.APPROVALS_USERS_FAILURE,
  payload: reason,
});
