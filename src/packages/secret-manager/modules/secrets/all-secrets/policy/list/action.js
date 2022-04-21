import { PolicyListDataTypes } from './constants';

export const requestPolicyList = (parents) => ({
  type: PolicyListDataTypes.POLICY_LIST_DATA_REQUEST,
  payload: {
    resource: parents,
  },
});

export const loadingPolicyList = () => ({ type: PolicyListDataTypes.POLICY_LIST_DATA_LOADING });

export const successPolicyList = (policyListData) => ({
  type: PolicyListDataTypes.POLICY_LIST_DATA_SUCCESS,
  payload: policyListData,
});

export const failurePolicyList = (error) => ({
  type: PolicyListDataTypes.POLICY_LIST_DATA_FAILURE,
  payload: error,
});

export const requestPolicyListLoadMore = (parents) => ({
  type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_LOADING,
  payload: {
    parents,
  },
});

export const loadingPolicyListLoadMore = () => ({
  type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_LOADING,
});

export const successPolicyListLoadMore = (secretListData) => ({
  type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_SUCCESS,
  payload: secretListData,
});

export const failurePolicyListLoadMore = (error) => ({
  type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_FAILURE,
  payload: error,
});

export const updatePolicyListSearchTerm = (search) => ({
  type: PolicyListDataTypes.POLICY_LIST_SEARCH_TERM_UPDATE,
  payload: search,
});

export const requestPolicyToggle = (togglePayload) => ({
  type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_INIT,
  payload: {
    ...togglePayload,
  },
});

export const loadingPolicyToggle = () => ({
  type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_LOADING,
});

export const successPolicyToggle = () => ({
  type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_COMPLETE,
});

export const failurePolicyToggle = (reason) => ({
  type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_FAILURE,
  payload: { error: reason },
});

export const requestPolicyDelete = ({ id, resource, listPolicyPath }) => ({
  type: PolicyListDataTypes.POLICY_DELETE_REQUEST_INIT,
  payload: {
    id,
    resource,
    listPolicyPath,
  },
});

export const loadingPolicyDelete = () => ({
  type: PolicyListDataTypes.POLICY_DELETE_REQUEST_LOADING,
});

export const completePolicyDelete = () => ({
  type: PolicyListDataTypes.POLICY_DELETE_REQUEST_COMPLETE,
});
