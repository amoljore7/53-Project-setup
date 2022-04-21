import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tree from 'britive-design-system/core/components/tree';
import { classes } from '../constants';
import { translatedStrings } from './constants';

const SecretTree = ({
  getImmediateNodes,
  immediateNodes,
  vaultName,
  selectionHandler,
  parentsOfSelectedItem,
}) => {
  const [treeData, setTreeData] = useState({
    label: vaultName,
    hasChildren: true,
    details: {
      entityType: 'node',
    },
    actionItems: [{ title: translatedStrings.noActionsAvailableText, isDisabled: true }],
    nodes: [],
    leaves: [],
  });
  const [parentsWhereChildrenAreToBeAdded, setParentsWhereChildrenAreToBeAdded] = useState([]);
  const [selectedItemParents, setSelectedItemParents] = useState();

  useEffect(() => {
    setTreeData({ ...treeData, label: vaultName });
    setSelectedItemParents([{ ...treeData, label: vaultName }]);
    selectionHandler([{ ...treeData, label: vaultName }]);
  }, [vaultName]);

  useEffect(() => {
    setSelectedItemParents(parentsOfSelectedItem);
  }, [parentsOfSelectedItem]);

  useEffect(() => {
    if (immediateNodes?.length) {
      const nodes = treeData.nodes;
      const updatedData = getUpdatedData(
        nodes,
        parentsWhereChildrenAreToBeAdded,
        immediateNodes,
        'getNodes'
      );
      setTreeData({ ...treeData, nodes: updatedData });
    }
  }, [immediateNodes]);

  const nodeClickHandler = (ancestorsArray) => {
    setSelectedItemParents(parentsOfSelectedItem);
    selectionHandler(ancestorsArray);
  };

  const expandIconClickHandler = (parents) => {
    const newParents = parents.slice(1);
    setParentsWhereChildrenAreToBeAdded(newParents);
    getImmediateNodes(newParents);
  };

  // This method will traverse through ancestorsArray starting from rootNodes and will insert elements of children
  // array into the required position
  const getUpdatedData = (rootNodes, ancestorsArray, children, action) => {
    let nodesCopy = [...rootNodes];
    let desiredNodes = nodesCopy;
    for (let i = 0; i < ancestorsArray.length; i++) {
      for (let j = 0; j < desiredNodes?.length; j++) {
        if (desiredNodes[j].label === ancestorsArray[i].label) {
          if (!desiredNodes[j].nodes) {
            desiredNodes[j].nodes = [];
          }
          desiredNodes = desiredNodes[j].nodes;
          break;
        }
      }
    }
    action === 'getNodes' ? desiredNodes.splice(0, desiredNodes?.length) : null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].entityType === 'node') {
        desiredNodes.push({
          label: children[i].name,
          hasChildren: true,
          details: {
            entityType: children[i].entityType,
          },
          actionItems: [{ title: translatedStrings.noActionsAvailableText, isDisabled: true }],
        });
      }
    }
    return nodesCopy;
  };

  return (
    <div className={classes.nodesSecretsTreeContainer}>
      <Tree
        topPadding="48px"
        nodes={treeData}
        clickHandler={nodeClickHandler}
        expandIconClickHandler={expandIconClickHandler}
        selectedItemParents={selectedItemParents}
      />
    </div>
  );
};

SecretTree.propTypes = {
  setPageHeader: PropTypes.func,
  vaultName: PropTypes.string.isRequired,
  createNode: PropTypes.func,
  getImmediateNodes: PropTypes.func,
  deleteNode: PropTypes.func,
  immediateNodes: PropTypes.any,
  parentsOfSelectedItem: PropTypes.array,
  newNodeData: PropTypes.any,
  deleteStatus: PropTypes.number,
  selectionHandler: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
};

export default SecretTree;
