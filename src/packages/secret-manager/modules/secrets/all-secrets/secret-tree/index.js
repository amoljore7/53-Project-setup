import { connect } from 'react-redux';
import SecretsTree from './SecretTree';
import {
  createNodeAction,
  deleteEntityAction,
  getImmediateNodesAction,
  saveSelectionAndExpansionAction,
} from './action';
import { getSecretDetailsAction } from '../secret-view/action';
import { openNotification } from '../../../../../../components/notification/action';
import {
  nodeCreatePermissionProperty,
  nodeDeletePermissionProperty,
  nodeListPermissionProperty,
  secretUpdatePermissionProperty,
  denyString,
  policyCreatePermissionProperty,
} from './constants';

const mapStateToProps = (state, ownProps) => {
  const { name: vaultName, id: vaultId, metadata } = state?.vaultLanding?.data;
  const rootNodeMetadata = {
    [nodeCreatePermissionProperty]: metadata && metadata[nodeCreatePermissionProperty],
    [nodeDeletePermissionProperty]: denyString,
    [nodeListPermissionProperty]: metadata && metadata[nodeListPermissionProperty],
    [secretUpdatePermissionProperty]: metadata && metadata[secretUpdatePermissionProperty],
    [policyCreatePermissionProperty]: metadata && metadata[policyCreatePermissionProperty],
  };
  const {
    treeData,
    selectedItemParents: selectedItemAncestors,
    expandedItemsArray: expandedItems,
    newNodeStatus,
    newNodeParents,
    deleteNodeParents,
    deleteNodeStatus,
    newSecretStatus,
    newSecretParents,
  } = state.secretsReducer.updateTreeData;
  const { error: secretDetailsError, status: secretDetailsStatus } =
    state.secretsReducer.secretDetails;
  const { error: secretTemplateDetailsError, status: secretTemplateDetailsStatus } =
    state.secretsReducer.secretTemplateDetails;
  const currentTabIndex = state?.secretsReducer?.secretPolicyTabIndex?.tabIndex || 0;
  return {
    vaultName,
    vaultId,
    treeData,
    selectedItemAncestors,
    expandedItems,
    newSecretStatus,
    newSecretParents,
    newNodeStatus,
    newNodeParents,
    deleteNodeParents,
    deleteNodeStatus,
    rootNodeMetadata,
    secretTemplateDetailsError,
    secretDetailsError,
    secretTemplateDetailsStatus,
    secretDetailsStatus,
    parentsOfSelectedItem: ownProps.parentsOfSelectedItem,
    currentTabIndex,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectionHandler: ownProps.selectionHandler,
    createNode: (payloadData, parents) => {
      dispatch(createNodeAction(payloadData, parents));
    },
    deleteEntity: (entity, parents) => dispatch(deleteEntityAction(entity, parents)),
    getImmediateNodes: (parents) => dispatch(getImmediateNodesAction(parents)),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    saveSelectionAndExpansion: (data) => dispatch(saveSelectionAndExpansionAction(data)),
    getSecretDetails: (parents) => dispatch(getSecretDetailsAction(parents)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretsTree);
