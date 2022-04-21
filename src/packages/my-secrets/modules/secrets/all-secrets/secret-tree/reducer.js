import { getImmediateNodesTypes } from './constants';

const immediateNodesInitialState = {
  result: [],
  pagination: {
    next: '',
    previous: '',
  },
  error: null,
};

export const getImmediateNodes = (state = immediateNodesInitialState, action) => {
  switch (action.type) {
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_LOADING:
      return {
        ...state,
        error: null,
      };
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_SUCCESS:
      return {
        ...state,
        result: [...action.payload.immediateNodes],
        pagination: action.payload.immediateNodesPagination,
        error: null,
      };
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
