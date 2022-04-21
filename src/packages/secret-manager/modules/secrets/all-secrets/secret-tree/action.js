import {
  createNodeTypes,
  deleteNodeTypes,
  getImmediateNodesTypes,
  SAVE_SELECTION_AND_EXPANSION,
} from './constants';

export const createNodeAction = (payloadData, parents) => {
  return {
    type: createNodeTypes.CREATE_NODE_REQUEST,
    payload: { payloadData, parents },
  };
};

export const deleteEntityAction = (entity, parents) => {
  return {
    type: deleteNodeTypes.DELETE_NODE_REQUEST,
    payload: { entity, parents },
  };
};

export const getImmediateNodesAction = (parents) => {
  return {
    type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_REQUEST,
    payload: { parents },
  };
};

export const saveSelectionAndExpansionAction = (data) => {
  return {
    type: SAVE_SELECTION_AND_EXPANSION,
    payload: data,
  };
};

export const resetNewNodeData = () => {
  return {
    type: createNodeTypes.CREATE_NODE_RESET,
  };
};

export const resetDeleteNodeData = () => {
  return {
    type: deleteNodeTypes.DELETE_NODE_RESET,
  };
};
