import { getImmediateNodesTypes } from './constants';

export const requestGetImmediateNodes = (parents) => {
  return {
    type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_REQUEST,
    payload: {
      parents,
    },
  };
};

export const loadingGetImmediateNodes = () => {
  return { type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_LOADING };
};

export const successGetImmediateNodes = (immediateNodes, immediateNodesPagination) => {
  return {
    type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_SUCCESS,
    payload: { immediateNodes, immediateNodesPagination },
  };
};

export const failureGetImmediateNodes = (reason) => {
  return {
    type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_FAILURE,
    payload: { error: reason },
  };
};
