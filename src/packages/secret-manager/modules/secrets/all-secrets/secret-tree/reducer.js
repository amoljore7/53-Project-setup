/* eslint-disable no-extra-boolean-cast */
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import {
  createNodeTypes,
  getImmediateNodesTypes,
  deleteNodeTypes,
  SAVE_SELECTION_AND_EXPANSION,
  translatedStrings,
  nodeCreatePermissionProperty,
  nodeDeletePermissionProperty,
  secretUpdatePermissionProperty,
  allowString,
  nodeString,
  secretString,
  policyCreatePermissionProperty,
} from './constants';
import { createSecretTypes } from '../../add/constants';
import { updateSecretTypes } from '../../edit/constants';

export const getAllowedActionsArrayForNode = (metadata) => {
  let allowedActionItems = [];
  if (metadata[nodeCreatePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.addNodeActionTitle });
    allowedActionItems.push({ title: translatedStrings.addSecretActionTitle });
  }
  if (metadata[nodeDeletePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.deleteNodeActionTitle });
  }
  if (metadata[policyCreatePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.addPolicyActionItem });
  }
  return allowedActionItems;
};

const getAllowedActionsArrayForSecret = (metadata) => {
  let allowedActionItems = [];
  if (metadata[nodeDeletePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.deleteSecretActionTitle });
  }
  if (metadata[secretUpdatePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.editSecretActionTitle });
  }
  if (metadata[policyCreatePermissionProperty] === allowString) {
    allowedActionItems.push({ title: translatedStrings.addPolicyActionItem });
  }
  return allowedActionItems;
};

const getUpdatedDataAfterAddition = (rootNodes, rootLeaves, ancestorsArray, child) => {
  let nodesCopy = [...rootNodes];
  let nodesToBeUpdated = nodesCopy;
  let leavesCopy = [...rootLeaves];
  let leavesToBeUpdated = leavesCopy;
  for (let i = 0; i < ancestorsArray.length; i++) {
    for (let j = 0; j < nodesToBeUpdated?.length; j++) {
      if (nodesToBeUpdated[j].label === ancestorsArray[i].label) {
        if (i === ancestorsArray.length - 1 && child.entityType === secretString) {
          if (!nodesToBeUpdated[j].leaves) {
            nodesToBeUpdated[j].leaves = [];
          }
          leavesToBeUpdated = nodesToBeUpdated[j].leaves;
        }
        if (!nodesToBeUpdated[j].nodes) {
          nodesToBeUpdated[j].nodes = [];
        }
        nodesToBeUpdated = nodesToBeUpdated[j].nodes;
        break;
      }
    }
  }
  if (child.entityType === nodeString) {
    nodesToBeUpdated.push({
      label: child.name,
      hasChildren: true,
      details: {
        entityType: child.entityType,
      },
      actionItems: getAllowedActionsArrayForNode(child.metadata),
    });
  } else if (child.entityType === secretString) {
    leavesToBeUpdated.push({
      label: child.name,
      hasChildren: false,
      details: {
        entityType: child.entityType,
      },
      actionItems: getAllowedActionsArrayForSecret(child.metadata),
    });
  }
  return { nodesCopy, leavesCopy };
};

const getUpdatedDataAfterDeletion = (rootNodes, rootLeaves, ancestorsArray, child) => {
  let nodesCopy = [...rootNodes];
  let nodesToBeUpdated = nodesCopy;
  let leavesCopy = [...rootLeaves];
  let leavesToBeUpdated = leavesCopy;
  for (let i = 0; i < ancestorsArray.length; i++) {
    for (let j = 0; j < nodesToBeUpdated?.length; j++) {
      if (nodesToBeUpdated[j].label === ancestorsArray[i].label) {
        if (i === ancestorsArray.length - 1 && child.details.entityType === secretString) {
          leavesToBeUpdated = nodesToBeUpdated[j].leaves;
        }
        nodesToBeUpdated = nodesToBeUpdated[j].nodes;
        break;
      }
    }
  }
  let requiredIndex;
  if (child.details.entityType === nodeString) {
    for (let j = 0; j < nodesToBeUpdated?.length; j++) {
      if (nodesToBeUpdated[j].label === child.label) {
        requiredIndex = j;
      }
    }
    nodesToBeUpdated.splice(requiredIndex, 1);
  } else if (child.details.entityType === secretString) {
    for (let j = 0; j < leavesToBeUpdated?.length; j++) {
      if (leavesToBeUpdated[j].label === child.label) {
        requiredIndex = j;
        break;
      }
    }
    leavesToBeUpdated.splice(requiredIndex, 1);
  }
  return { nodesCopy, leavesCopy };
};

export const getUpdatedData = (rootNodes, rootLeaves, ancestorsArray, children) => {
  const filteredSecrets = children.filter((item) => item.entityType === secretString);
  let nodesCopy = [...rootNodes];
  let nodesToBeUpdated = nodesCopy;
  let leavesCopy = [...rootLeaves];
  let leavesToBeUpdated = leavesCopy;
  for (let i = 0; i < ancestorsArray.length; i++) {
    for (let j = 0; j < nodesToBeUpdated?.length; j++) {
      if (nodesToBeUpdated[j].label === ancestorsArray[i].label) {
        if (i === ancestorsArray.length - 1 && Boolean(filteredSecrets.length)) {
          if (!nodesToBeUpdated[j].leaves) nodesToBeUpdated[j].leaves = [];
          leavesToBeUpdated = nodesToBeUpdated[j].leaves;
        }
        if (!nodesToBeUpdated[j].nodes) {
          nodesToBeUpdated[j].nodes = [];
        }
        nodesToBeUpdated = nodesToBeUpdated[j].nodes;
        break;
      }
    }
  }
  nodesToBeUpdated.splice(0, nodesToBeUpdated?.length);
  // leavesToBeUpdated array is not spliced when there is no secret under a folder(other than root node)
  if (!(!Boolean(filteredSecrets.length) && Boolean(ancestorsArray.length)))
    leavesToBeUpdated.splice(0, leavesToBeUpdated?.length);
  for (let i = 0; i < children.length; i++) {
    if (children[i].entityType === nodeString) {
      nodesToBeUpdated.push({
        label: children[i].name,
        hasChildren: true,
        details: {
          entityType: children[i].entityType,
        },
        actionItems: getAllowedActionsArrayForNode(children[i].metadata),
      });
    } else if (children[i].entityType === secretString) {
      leavesToBeUpdated.push({
        label: children[i].name,
        hasChildren: false,
        details: {
          entityType: secretString,
        },
        actionItems: getAllowedActionsArrayForSecret(children[i].metadata),
      });
    }
  }
  return { nodesCopy, leavesCopy };
};

const initialState = {
  treeData: {
    nodes: [],
    leaves: [],
  },
  selectedItemParents: [],
  expandedItemsArray: [],
  newNodeParents: [],
  newNodeStatus: RESOURCE_STATUS.INITIAL,
  deleteNodeParents: [],
  deleteNodeStatus: RESOURCE_STATUS.INITIAL,
  newSecretStatus: RESOURCE_STATUS.INITIAL,
  newSecretParents: [],
  newSecretError: null,
  editSecretStatus: RESOURCE_STATUS.INITIAL,
  editSecretError: null,
};

export const updateTreeData = (state = initialState, action) => {
  switch (action.type) {
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_LOADING:
      return {
        ...state,
      };
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_SUCCESS: {
      const { immediateNodes, parents } = action.payload;
      const { nodes, leaves } = state.treeData;
      const updatedData = getUpdatedData(nodes, leaves, parents, immediateNodes);
      return {
        ...state,
        treeData: {
          nodes: updatedData.nodesCopy,
          leaves: updatedData.leavesCopy,
        },
      };
    }
    case getImmediateNodesTypes.GET_IMMEDIATE_NODES_FAILURE:
      return {
        ...state,
      };
    case createNodeTypes.CREATE_NODE_LOADING:
      return {
        ...state,
        newNodeStatus: RESOURCE_STATUS.LOADING,
      };
    case createNodeTypes.CREATE_NODE_SUCCESS: {
      const { newNodeData, parents, selectedItemParents } = action.payload;
      const { nodes, leaves } = state.treeData;
      const updatedParents = parents.slice(1);
      const updatedData = getUpdatedDataAfterAddition(nodes, leaves, updatedParents, newNodeData);
      return {
        ...state,
        treeData: {
          ...state.treeData,
          nodes: updatedData.nodesCopy,
          leaves: updatedData.leavesCopy,
        },
        newNodeStatus: RESOURCE_STATUS.SUCCESS,
        newNodeParents: selectedItemParents,
      };
    }
    case createNodeTypes.CREATE_NODE_FAILURE:
      return {
        ...state,
        data: {},
        newNodeStatus: RESOURCE_STATUS.ERROR,
      };
    case createNodeTypes.CREATE_NODE_RESET:
      return {
        ...state,
        data: {},
        newNodeStatus: RESOURCE_STATUS.INITIAL,
      };
    case createSecretTypes.CREATE_SECRET_LOADING:
      return {
        ...state,
        newSecretStatus: RESOURCE_STATUS.LOADING,
        newSecretError: null,
      };
    case createSecretTypes.CREATE_SECRET_SUCCESS: {
      const { newSecretData, parents } = action.payload;
      const updatedParents = parents.slice(1);
      const { nodes, leaves } = state.treeData;
      const updatedData = getUpdatedDataAfterAddition(nodes, leaves, updatedParents, newSecretData);
      return {
        ...state,
        treeData: {
          ...state.treeData,
          nodes: updatedData.nodesCopy,
          leaves: updatedData.leavesCopy,
        },
        newSecretStatus: RESOURCE_STATUS.SUCCESS,
        newSecretParents: [
          ...parents,
          { label: newSecretData.name, details: { entityType: secretString } },
        ],
      };
    }
    case createSecretTypes.CREATE_SECRET_FAILURE:
      return {
        ...state,
        newSecretStatus: RESOURCE_STATUS.ERROR,
        newSecretError: action.payload,
      };
    case createSecretTypes.CREATE_SECRET_RESET:
      return {
        ...state,
        newSecretStatus: RESOURCE_STATUS.INITIAL,
        newSecretParents: [],
        newSecretError: null,
      };
    case updateSecretTypes.UPDATE_SECRET_LOADING:
      return {
        ...state,
        editSecretStatus: RESOURCE_STATUS.LOADING,
        editSecretError: null,
      };
    case updateSecretTypes.UPDATE_SECRET_SUCCESS:
      return {
        ...state,
        editSecretStatus: RESOURCE_STATUS.SUCCESS,
        editSecretError: null,
      };
    case updateSecretTypes.UPDATE_SECRET_FAILURE:
      return {
        ...state,
        editSecretStatus: RESOURCE_STATUS.ERROR,
        editSecretError: action.payload,
      };
    case updateSecretTypes.UPDATE_SECRET_RESET:
      return {
        ...state,
        editSecretStatus: RESOURCE_STATUS.INITIAL,
        editSecretError: null,
      };
    case deleteNodeTypes.DELETE_NODE_LOADING:
      return {
        ...state,
        deleteNodeStatus: RESOURCE_STATUS.LOADING,
      };
    case deleteNodeTypes.DELETE_NODE_SUCCESS: {
      const { nodes, leaves } = state.treeData;
      const { parents, selectedItemParents } = action.payload;
      const updatedParents = [...parents];
      updatedParents.splice(-1, 1);
      const updatedData = getUpdatedDataAfterDeletion(
        nodes,
        leaves,
        updatedParents,
        parents[parents.length - 1]
      );
      return {
        ...state,
        treeData: {
          ...state.treeData,
          nodes: updatedData.nodesCopy,
          leaves: updatedData.leavesCopy,
        },
        deleteNodeStatus: RESOURCE_STATUS.SUCCESS,
        deleteNodeParents: selectedItemParents,
      };
    }
    case deleteNodeTypes.DELETE_NODE_FAILURE:
      return {
        ...state,
        deleteNodeStatus: RESOURCE_STATUS.ERROR,
      };
    case deleteNodeTypes.DELETE_NODE_RESET:
      return {
        ...state,
        deleteNodeStatus: RESOURCE_STATUS.INITIAL,
      };
    case SAVE_SELECTION_AND_EXPANSION: {
      const { selectedItemParents, expandedItemsArray } = action.payload;
      return {
        ...state,
        selectedItemParents: selectedItemParents,
        expandedItemsArray: expandedItemsArray,
      };
    }
    default:
      return state;
  }
};
