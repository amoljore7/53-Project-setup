import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Tree from 'britive-design-system/core/components/tree';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import DialogPopup from 'britive-design-system/core/components/dialog';
import TextField from 'britive-design-system/core/components/textfield';
import {
  spinnerSizeSmall,
  translatedStrings,
  defaultWidth,
  adminSecretTreeConstants,
  secretString,
  nodeString,
} from './constants';
import { classes } from '../constants';
import { classes as folderClasses } from '../../constants';
import ApiServices from '../../../../../../utils/api-service';
import useValidation from '../../../../../../components/use-validation-hook';
import * as yup from 'yup';
import { getRequiredString } from './service';
import { translate } from '../../../../externalization/index';
import {
  RESOURCE_STATUS,
  errorNotificationDuration,
  errorNotificationType,
  typeOfStatus,
} from '../../../../../../utils/common-constants';
import Spinner from 'britive-design-system/core/components/spinner';
import { getAllowedActionsArrayForNode } from './reducer';
import '../../index.scss';
import { isSuccess, isError, getParentString } from '../../../../../../utils/common-utils';
import { addString, editString, viewString } from '../constants';
import SecretApprovalModal from '../../../../../my-secrets/modules/secrets/secret-approval-modal/SecretApprovalModal';
import WaitingApprovalDialog from '../../../../../../common-widgets/waiting-approval-dialog/WaitingApprovalDialog';
import { adminSecretListConstants } from '../secret-list/constants';
import {
  translatedStringsForWaitingApproval,
} from '../secret-list/constants';
import { resetNewNodeData, resetDeleteNodeData } from './action';

const SecretsTree = ({
  createNode,
  getImmediateNodes,
  saveSelectionAndExpansion,
  getSecretDetails,
  treeData,
  deleteEntity,
  vaultName,
  selectedItemAncestors,
  parentsOfSelectedItem,
  expandedItems,
  secretTemplateDetailsError,
  secretDetailsError,
  newNodeStatus,
  newNodeParents,
  selectionHandler,
  deleteNodeParents,
  deleteNodeStatus,
  history,
  location,
  vaultId,
  openNotification,
  rootNodeMetadata,
  secretTemplateDetailsStatus,
  secretDetailsStatus,
  currentTabIndex,
  match,
}) => {
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [isAddNodeCancelDialogOpen, setAddNodeCancelDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const [clickedItemAncestor, setClickedItemAncestor] = useState([]);
  const [treeDataState, setTreeData] = useState({
    label: vaultName,
    hasChildren: true,
    details: {
      entityType: nodeString,
    },
    actionItems: getAllowedActionsArrayForNode(rootNodeMetadata),
    nodes: [],
    leaves: [],
  });
  const [openWaitingForApprovalDialog, setOpenWaitingForApprovalDialog] = useState(false);
  const [openRequiredApprovalModal, setOpenRequiredApprovalModal] = useState(false);
  const [selectedItemParents, setSelectedItemParents] = useState(
    (location?.state?.previousPath === addString ||
      location?.state?.previousPath === editString ||
      location?.state?.previousPath === viewString) &&
      selectedItemAncestors?.length
      ? selectedItemAncestors
      : [{ ...treeDataState }]
  );

  const [expandedItemsArray, setExpandedItemsArray] = useState(
    location?.state?.previousPath === addString ||
      location?.state?.previousPath === editString ||
      location?.state?.previousPath === viewString
      ? expandedItems
      : []
  );
  const [parentsOfToBeDeletedChild, setParentsOfToBeDeletedChild] = useState([]);
  const [parentsWhereChildrenAreToBeAdded, setParentsWhereChildrenAreToBeAdded] = useState([]);
  const [entityToBeDeleted, setEntityToBeDeleted] = useState('');
  const [selectedSecretParents, setSelectedSecretParents] = useState();
  const [isApprovalPendingAfterApprovalSent, setIsApprovalPendingAfterApprovalSent] = useState();
  const [secretViewName, setSecretViewName] = useState('');
  const dispatch = useDispatch();
  const isFirstRenderSecretDetails = useRef(true);

  useEffect(() => {
    return () => {
      saveSelectionAndExpansion({
        selectedItemParents: selectedItemParents,
        expandedItemsArray: expandedItemsArray,
      });
    };
  }, [selectedItemParents, expandedItemsArray]);

  useEffect(() => {
    return () => {
      dispatch(resetDeleteNodeData());
      dispatch(resetNewNodeData());
    };
  }, []);

  useEffect(() => {
    setTreeData((treeDataState) => {
      return { ...treeDataState, actionItems: getAllowedActionsArrayForNode(rootNodeMetadata) };
    });
  }, [rootNodeMetadata]);

  useEffect(() => {
    setTreeData({ ...treeDataState, label: vaultName });
    const parentsWithoutRoot = selectedItemParents.slice(1);
    setSelectedItemParents((selectedItemParents) => {
      return [{ ...selectedItemParents[0], label: vaultName }, ...parentsWithoutRoot];
    });
    selectionHandler([{ ...selectedItemParents[0], label: vaultName }, ...parentsWithoutRoot]);
  }, [vaultName]);

  useEffect(() => {
    setTreeData({ ...treeDataState, nodes: treeData.nodes, leaves: treeData.leaves });
  }, [treeData]);

  useEffect(() => {
    if (newNodeStatus === RESOURCE_STATUS.SUCCESS) {
      setSelectedItemParents(newNodeParents);
      selectionHandler(newNodeParents);
    }
  }, [newNodeStatus]);

  useEffect(() => {
    if (deleteNodeStatus === RESOURCE_STATUS.SUCCESS) {
      setSelectedItemParents(deleteNodeParents);
      selectionHandler(deleteNodeParents);
    }
  }, [deleteNodeStatus]);

  useEffect(() => {
    setSelectedItemParents(parentsOfSelectedItem);
  }, [parentsOfSelectedItem]);

  useEffect(() => {
    if (isFirstRenderSecretDetails.current) {
      isFirstRenderSecretDetails.current = false;
    } else {
      if (
        selectedSecretParents &&
        isSuccess(secretDetailsStatus) &&
        isSuccess(secretTemplateDetailsStatus)
      ) {
        setSelectedItemParents(selectedSecretParents);
        selectionHandler(selectedSecretParents);
        setSelectedSecretParents();
      } else if (
        selectedSecretParents &&
        (isError(secretDetailsStatus) || isError(secretTemplateDetailsStatus))
      ) {
        if (isError(secretDetailsStatus)) {
          if (
            secretDetailsError?.status === 403 &&
            secretDetailsError?.data?.errorCode ===
              adminSecretListConstants.approvalRequiredErrorCode_11
          ) {
            setOpenRequiredApprovalModal(true);
            setSelectedSecretParents();
            return;
          }
          if (
            secretDetailsError?.status === 403 &&
            secretDetailsError?.data?.errorCode ===
              adminSecretListConstants.pendingSecretErrorCode_10
          ) {
            setSelectedSecretParents();
            if (isApprovalPendingAfterApprovalSent) {
              setOpenWaitingForApprovalDialog(false);
              return;
            }
            setOpenWaitingForApprovalDialog(true);
            return;
          }
        }
        setSelectedSecretParents();
        const reason = secretDetailsError?.message || secretTemplateDetailsError?.message;
        if (
          secretDetailsError?.data?.errorCode !==
            adminSecretTreeConstants.approvalRequiredErrorCode_11 &&
          secretDetailsError?.data?.errorCode !== adminSecretTreeConstants.pendingSecretErrorCode_10
        ) {
          openNotification(
            errorNotificationType,
            translate('SECRET_DETAILS_MODULE.DETAILS_FAILURE_MESSAGE', { reason }),
            errorNotificationDuration
          );
        }
      }
    }
  }, [secretDetailsStatus, secretTemplateDetailsStatus, isApprovalPendingAfterApprovalSent]);

  const addNodeFormValidationSchema = yup.object({
    name: yup
      .string()
      .required(translatedStrings.newFolderNameRequiredValidationMessage)
      .test(name, translatedStrings.secretFolderAlreadyExists, async (value, context) => {
        const contextField = context?.options?.context;
        if ((contextField === 'name' || contextField === 'all') && value !== '') {
          setNameFilterLoading(true);
          try {
            const response = await ApiServices.get(
              `/api/v1/secretmanager/vault/${vaultId}/secrets?path=${getRequiredString(
                parentsWhereChildrenAreToBeAdded.slice(1)
              )}&filter=name eq ${value}`
            );
            setNameFilterLoading(false);
            return response?.data?.result?.length === 0;
          } catch ({ response }) {
            const reason = response?.data?.message || '';
            setNameFilterLoading(false);
            openNotification(errorNotificationType, reason, errorNotificationDuration);
            return true;
          }
        } else {
          return true;
        }
      }),
  });

  const addNodeFormValidationHook = useValidation({
    initialValues: {
      name: '',
    },
    validationSchema: addNodeFormValidationSchema,
    onSubmit: (values) => {
      const payloadData = { ...values, entityType: nodeString };
      createNode(payloadData, parentsWhereChildrenAreToBeAdded);
      addNodeFormValidationHook.resetForm();
      setAddNodeModalOpen(false);
    },
  });

  const handleApprovalModal = (isApprovalPending) => {
    setOpenRequiredApprovalModal(false);
    isApprovalPending && setIsApprovalPendingAfterApprovalSent(true);
  };

  const handleWaitingApprovalDialog = (isOpen) => {
    setOpenWaitingForApprovalDialog(isOpen);
  };

  const nodeClickHandler = (ancestorsArray) => {
    setClickedItemAncestor(ancestorsArray);
    if (ancestorsArray[ancestorsArray.length - 1].details.entityType === nodeString) {
      setSelectedItemParents(ancestorsArray);
      selectionHandler(ancestorsArray);
    } else {
      if (currentTabIndex == 0) {
        setSelectedSecretParents(ancestorsArray);
        getSecretDetails(ancestorsArray);
        setIsApprovalPendingAfterApprovalSent();
        setSecretViewName(ancestorsArray[ancestorsArray.length - 1].label);
      } else {
        setSelectedItemParents(ancestorsArray);
        selectionHandler(ancestorsArray);
      }
    }
  };

  const expandIconClickHandler = (parents) => {
    let isExpanded = false;
    let expansionArray = [...expandedItemsArray];
    for (let i = 0; i < expandedItemsArray.length; i++) {
      if (expandedItemsArray[i].length === parents.length) {
        let counter = 0;
        for (let j = 0; j < parents.length; j++) {
          if (expandedItemsArray[i][j].label !== parents[j].label) break;
          else counter++;
        }
        if (counter === parents.length) {
          isExpanded = true;
          expansionArray.splice(i, 1);
          setExpandedItemsArray(expansionArray);
          break;
        }
      }
    }
    if (!isExpanded) {
      const newParents = parents.slice(1);
      setParentsWhereChildrenAreToBeAdded(newParents);
      getImmediateNodes(newParents);
      setExpandedItemsArray([...expandedItemsArray, parents]);
    }
  };

  const actionClickHandler = (allParents, value) => {
    switch (value.title) {
      case translatedStrings.addNodeActionTitle: {
        setParentsWhereChildrenAreToBeAdded(allParents);
        setAddNodeModalOpen(true);
        break;
      }
      case translatedStrings.deleteNodeActionTitle: {
        setParentsOfToBeDeletedChild(allParents);
        setDeleteDialogOpen(true);
        setEntityToBeDeleted(nodeString);
        break;
      }
      case translatedStrings.addSecretActionTitle: {
        history.push({
          pathname: '/admin/secret-manager/vault/secrets/add',
          state: { parents: allParents },
        });
        break;
      }
      case translatedStrings.addPolicyActionItem: {
        const path = getParentString(allParents.slice(1));
        history.push(`${match.url}/policy/add?path=${path}`, { allAncestorItems: allParents });
        break;
      }
      case translatedStrings.deleteSecretActionTitle: {
        setParentsOfToBeDeletedChild(allParents);
        setDeleteDialogOpen(true);
        setEntityToBeDeleted(secretString);
        break;
      }
      case translatedStrings.editSecretActionTitle: {
        const newParents = allParents.slice(1);
        history.push(
          `/admin/secret-manager/vault/secrets/edit?path=${getRequiredString(newParents)}`
        );
        break;
      }
    }
  };

  const formSubmitHandler = () => {
    addNodeFormValidationHook.handleSubmit();
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelModalTitle}
        message={translatedStrings.cancelModalMessage}
        primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
        secondaryButtonText={translatedStrings.cancelModalNoBtn}
        onSubmit={() => {
          setAddNodeModalOpen(false);
          setAddNodeCancelDialogOpen(false);
          addNodeFormValidationHook.resetForm();
        }}
        onCancel={() => {
          setAddNodeCancelDialogOpen(false);
        }}
      />
    );
  };

  const getDeleteDialog = (entity) => {
    return (
      <DialogPopup
        type="alert"
        title={
          entity === nodeString
            ? translatedStrings.deleteNodeModalTitle
            : translatedStrings.deleteSecretModalTitle
        }
        message={
          entity === nodeString
            ? translatedStrings.deleteNodeModalMessage
            : translatedStrings.deleteSecretModalMessage
        }
        primaryButtonText={translatedStrings.deleteNodeModalPrimaryBtn}
        secondaryButtonText={translatedStrings.deleteNodeModalNoBtn}
        onSubmit={() => {
          deleteEntity(entity, parentsOfToBeDeletedChild);
          setDeleteDialogOpen(false);
        }}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    );
  };

  const addNewFolderActionButtons = [
    {
      text: translatedStrings.addNewFolderModalButtonText,
      variant: 'primary',
      onClick: formSubmitHandler,
      size: 'large',
    },
    {
      text: translatedStrings.addNewFolderModalCancelText,
      variant: 'secondary',
      onClick: () => setAddNodeCancelDialogOpen(true),
      size: 'large',
    },
  ];

  const addNodeModal = () => {
    return (
      <ModalPopup
        width={512}
        buttons={addNewFolderActionButtons}
        title={translatedStrings.addNewFolderModalTitle}
        onCancel={() => {
          setAddNodeModalOpen(false);
          addNodeFormValidationHook.resetForm();
        }}
      >
        <div className={folderClasses?.addFolderContainer}>
          <TextField
            label={translatedStrings?.folderName}
            value={addNodeFormValidationHook.values.name}
            onChange={(e) => {
              addNodeFormValidationHook.handleChange(
                addNodeFormValidationHook.names.name,
                e.target.value
              );
            }}
            onBlur={() => {}}
            error={
              addNodeFormValidationHook.touched.name &&
              Boolean(addNodeFormValidationHook.errors.name)
            }
            errorMsg={addNodeFormValidationHook.errors.name}
            width={defaultWidth}
          />
          <div className={folderClasses?.addFolderLoaderContainer}>
            {nameFilterLoading && <Spinner size={spinnerSizeSmall} />}
          </div>
        </div>
      </ModalPopup>
    );
  };

  return (
    <>
      <div className={classes.nodesSecretsTreeContainer}>
        <Tree
          topPadding="48px"
          nodes={treeDataState}
          clickHandler={nodeClickHandler}
          expandIconClickHandler={expandIconClickHandler}
          actionClickHandler={actionClickHandler}
          selectedItemParents={selectedItemParents}
          expandedItems={expandedItemsArray}
        />
      </div>
      {isAddNodeModalOpen && addNodeModal()}
      {isAddNodeCancelDialogOpen && getCancelDialog()}
      {isDeleteDialogOpen &&
        getDeleteDialog(entityToBeDeleted === nodeString ? nodeString : secretString)}
      {openWaitingForApprovalDialog && (
        <WaitingApprovalDialog
          handleWaitingApprovalDialog={handleWaitingApprovalDialog}
          translatedStringsForWaitingApproval={translatedStringsForWaitingApproval}
        />
      )}
      {openRequiredApprovalModal && (
        <SecretApprovalModal
          vaultId={vaultId}
          secretName={secretViewName}
          selectedItemAncestors={clickedItemAncestor.slice(0, -1)}
          handleApprovalModal={handleApprovalModal}
          approversDetails={secretDetailsError?.data?.extraInfo}
        />
      )}
    </>
  );
};

SecretsTree.propTypes = {
  setPageHeader: PropTypes.func,
  vaultName: PropTypes.string.isRequired,
  createNode: PropTypes.func,
  getImmediateNodes: PropTypes.func,
  deleteEntity: PropTypes.func,
  saveSelectionAndExpansion: PropTypes.func,
  selectedItemAncestors: PropTypes.array,
  parentsOfSelectedItem: PropTypes.array,
  expandedItems: PropTypes.array,
  immediateNodes: PropTypes.any,
  deleteStatus: PropTypes.number,
  selectionHandler: PropTypes.func,
  history: PropTypes.any,
  location: PropTypes.any,
  vaultId: PropTypes.string,
  openNotification: PropTypes.string,
  treeData: PropTypes.any,
  newSecretStatus: PropTypes.string,
  newSecretParents: PropTypes.array,
  newNodeStatus: PropTypes.string,
  newNodeParents: PropTypes.array,
  deleteNodeParents: PropTypes.array,
  deleteNodeStatus: PropTypes.string,
  rootNodeMetadata: PropTypes.array,
  secretTemplateDetailsError: PropTypes.string,
  secretDetailsError: PropTypes.string,
  getSecretDetails: PropTypes.func,
  secretDetailsStatus: PropTypes.oneOf(typeOfStatus),
  secretTemplateDetailsStatus: PropTypes.oneOf(typeOfStatus),
  currentTabIndex: PropTypes.number,
  match: PropTypes.any,
};

export default SecretsTree;
