import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import DataTable from '../../../../../../components/data-table/DataTable';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import {
  translatedStrings,
  translatedStringsForWaitingApproval,
  searchDebounceTime,
  actionIconSize,
  adminSecretListConstants,
  errorNotificationTime,
} from './constants';
import { classes } from '../constants';
import { BsTrash } from 'react-icons/bs';
import { FiSliders } from 'react-icons/fi';
import isEmpty from 'lodash/isEmpty';
import Tooltip from 'britive-design-system/core/components/tooltip';
import {
  allowString,
  nodeDeletePermissionProperty,
  nodeCreatePermissionProperty,
  translatedStrings as secretsTreeTranslatedStrings,
} from '../secret-tree/constants';
import { translate } from '../../../../externalization/index';
import { errorNotificationType, typeOfStatus } from '../../../../../../utils/common-constants';
import { isError, isSuccess } from '../../../../../../utils/common-utils';
import { addString, editString } from '../constants';
import SecretApprovalModal from '../../../../../my-secrets/modules/secrets/secret-approval-modal/SecretApprovalModal';
import WaitingApprovalDialog from '../../../../../../common-widgets/waiting-approval-dialog/WaitingApprovalDialog';

const SecretsList = ({
  secretListLoading,
  getSecretList,
  deleteSecret,
  secretListData,
  secretListPagination,
  selectedItemAncestorsArray,
  selectedItemParents,
  vaultId,
  selectionHandler,
  history,
  getSecretLoadMoreList,
  updateSecretListSearchTerm,
  secretSearchTerm,
  selectedNodeMetadata,
  secretDetails,
  secretDetailsStatus,
  secretTemplateDetailsStatus,
  secretDetailsError,
  secretTemplateDetailsError,
  openNotification,
}) => {
  const [secretTableData, setSecretTableData] = useState([]);
  const [deleteSecretParents, setDeleteSecretParents] = useState(null);
  const [isDeleteSecretDialogOpen, setDeleteSecretDialogOpen] = useState(false);
  const [openWaitingForApprovalDialog, setOpenWaitingForApprovalDialog] = useState(false);
  const [openRequiredApprovalModal, setOpenRequiredApprovalModal] = useState(false);
  const [secretViewName, setSecretViewName] = useState('');
  const [selectedSecretParents, setSelectedSecretParents] = useState();
  const [selectedItemAncestors, setSelectedItemAncestors] = useState(
    (location?.state?.previousPath === addString || location?.state?.previousPath === editString) &&
      selectedItemParents?.length
      ? [...selectedItemParents]
      : [...selectedItemAncestorsArray]
  );
  const [isApprovalPendingAfterApprovalSent, setIsApprovalPendingAfterApprovalSent] = useState();
  const [isSearchEmpty, setSearchEmpty] = useState(false);

  useEffect(() => {
    updateSecretListSearchTerm('');
    setSearchEmpty(true);
    setSelectedItemAncestors(
      (location?.state?.previousPath === addString ||
        location?.state?.previousPath === editString) &&
        selectedItemParents?.length
        ? [...selectedItemParents]
        : [...selectedItemAncestorsArray]
    );
  }, [selectedItemAncestorsArray]);

  useEffect(() => {
    if (!isEmpty(vaultId)) {
      updateSecretListSearchTerm('');
      setSearchEmpty(true);
      Boolean(selectedItemAncestors.length) && getSecretList(selectedItemAncestors.slice(1), '');
    }
  }, [selectedItemAncestors, vaultId]);

  useEffect(() => {
    if (secretSearchTerm) {
      getSecretList(selectedItemAncestors.slice(1));
    }
  }, [secretSearchTerm]);

  useEffect(() => {
    const tableData = secretListData.map((secret) => {
      return {
        name: secret.name,
        rotationInterval: secret.rotationInterval,
        category: secret?.secretNature?.charAt(0).toUpperCase() + secret?.secretNature?.slice(1),
        secretType: secret.secretType,
        description: secret.description,
        metadata: secret.metadata,
        status: secret.status,
      };
    });
    setSecretTableData(tableData);
  }, [secretListData]);

  useEffect(() => {
    if (
      selectedSecretParents &&
      isSuccess(secretDetailsStatus) &&
      isSuccess(secretTemplateDetailsStatus)
    ) {
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
          secretDetailsError?.data?.errorCode === adminSecretListConstants.pendingSecretErrorCode_10
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
      openNotification(
        errorNotificationType,
        translate('SECRET_DETAILS_MODULE.DETAILS_FAILURE_MESSAGE', { reason }),
        errorNotificationTime
      );
    }
  }, [secretDetailsStatus, secretTemplateDetailsStatus, isApprovalPendingAfterApprovalSent]);

  const handleSecretSearch = useCallback(
    debounce((nextValue) => {
      setSearchEmpty(!nextValue);
      updateSecretListSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getSecretList(selectedItemAncestors.slice(1));
    }, searchDebounceTime),
    []
  );

  const secretsColumns = [
    {
      width: '20%',
      field: 'name',
      headerName: translatedStrings.secretsNameColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '30%',
      field: 'description',
      headerName: translatedStrings.secretsDescriptionColumnHeader,
      horizontalAlignment: 'left',
    },
    {
      width: '15%',
      field: 'rotationInterval',
      headerName: translatedStrings.secretsRotationPeriodColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
      isNumeric: true,
    },
    {
      width: '15%',
      field: 'category',
      headerName: translatedStrings.secretsCategoryColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '20%',
      field: 'secretType',
      headerName: translatedStrings.secretsTypeColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      headerName: translatedStrings.secretsActionColumnHeader,
      width: '120px',
      renderColumn: (row) => {
        const { status, name } = row;
        return (
          <div className={classes.actionColumnContainer}>
            <div className={classes.editActionContainer}>
              {status !== adminSecretListConstants.denyText ? (
                <Tooltip title={translatedStrings.manageSecretsTooltip} position="left">
                  <div>
                    <FiSliders
                      size={actionIconSize}
                      onClick={() => {
                        setIsApprovalPendingAfterApprovalSent();
                        setSecretViewName(name);
                        const ancestors = [
                          ...selectedItemAncestors,
                          { label: name, details: { entityType: 'secret' } },
                        ];
                        setSelectedSecretParents(ancestors);
                        secretDetails(ancestors, {});
                      }}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title={translatedStrings.accessDenied} position="left">
                  <div>
                    <FiSliders size={actionIconSize} className={classes.disabledIcon} />
                  </div>
                </Tooltip>
              )}
            </div>
            <div className={classes.actionContainer}>
              {row.metadata[nodeDeletePermissionProperty] === allowString ? (
                <Tooltip title={translatedStrings.deleteSecretTooltip} position="left">
                  <div>
                    <BsTrash
                      data-testid="delete-icon"
                      size={actionIconSize}
                      onClick={() => {
                        const ancestors = [...selectedItemAncestors];
                        ancestors.push({
                          label: row.name,
                          details: { entityType: 'secret' },
                        });
                        setDeleteSecretParents(ancestors);
                        setDeleteSecretDialogOpen(true);
                      }}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title={translatedStrings.disableDeleteSecretTooltip} position="left">
                  <div>
                    <BsTrash
                      data-testid="delete-icon"
                      size={actionIconSize}
                      className={classes.disabledIcon}
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const getDeleteSecretDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={secretsTreeTranslatedStrings.deleteSecretModalTitle}
        message={secretsTreeTranslatedStrings.deleteSecretModalMessage}
        primaryButtonText={secretsTreeTranslatedStrings.deleteNodeModalPrimaryBtn}
        secondaryButtonText={secretsTreeTranslatedStrings.deleteNodeModalNoBtn}
        onSubmit={() => {
          deleteSecret('secret', deleteSecretParents);
          setDeleteSecretDialogOpen(false);
        }}
        onCancel={() => setDeleteSecretDialogOpen(false)}
      />
    );
  };

  const clickHandler = () => {
    history.push({
      pathname: '/admin/secret-manager/vault/secrets/add',
      state: { parents: selectedItemAncestors },
    });
  };

  const loadMoreHandler = () => {
    getSecretLoadMoreList(selectedItemAncestors.slice(1));
  };

  const handleApprovalModal = (isApprovalPending) => {
    setOpenRequiredApprovalModal(false);
    isApprovalPending && setIsApprovalPendingAfterApprovalSent(isApprovalPending);
  };

  const handleWaitingApprovalDialog = (isOpen) => {
    setOpenWaitingForApprovalDialog(isOpen);
  };

  return (
    <>
      {selectedNodeMetadata[nodeCreatePermissionProperty] === allowString ? (
        <div className={classes.secretsTabButtonContainer}>
          <Button variant="primary" onClick={clickHandler}>
            {translatedStrings.addSecretButtonText}
          </Button>
        </div>
      ) : null}
      <div className={classes.secretsTabTableContainer}>
        <DataTable
          inLineSort={true}
          rows={secretTableData}
          columns={secretsColumns}
          loading={secretListLoading}
          loadingMessage={
            secretListLoading
              ? translatedStrings.secretsLoadingMessage
              : translatedStrings.secretsDeleteLoadingMessage
          }
          loadMoreHandler={loadMoreHandler}
          loadMore={!secretListLoading && Boolean(secretListPagination?.next)}
          searchBar={{
            onSearch: handleSecretSearch,
            placeholder: translatedStrings.secretsSearchPlaceholder,
            isSearchEmpty: isSearchEmpty,
          }}
        ></DataTable>
      </div>
      {isDeleteSecretDialogOpen && getDeleteSecretDialog()}
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
          selectedItemAncestors={selectedItemAncestors}
          handleApprovalModal={handleApprovalModal}
          approversDetails={secretDetailsError?.data?.extraInfo}
        />
      )}
    </>
  );
};

SecretsList.propTypes = {
  secretListLoading: PropTypes.bool,
  getSecretList: PropTypes.func,
  deleteSecret: PropTypes.func,
  secretListData: PropTypes.array,
  secretListPagination: PropTypes.func,
  selectedItemAncestorsArray: PropTypes.array,
  selectedItemParents: PropTypes.array,
  selectionHandler: PropTypes.func,
  history: PropTypes.any,
  vaultId: PropTypes.string,
  getSecretLoadMoreList: PropTypes.func,
  updateSecretListSearchTerm: PropTypes.func,
  secretSearchTerm: PropTypes.string,
  selectedNodeMetadata: PropTypes.any,
  secretDetails: PropTypes.func,
  secretDetailsStatus: PropTypes.oneOf(typeOfStatus),
  secretTemplateDetailsStatus: PropTypes.oneOf(typeOfStatus),
  resetSecretDetails: PropTypes.func,
  resetSecretTemplateDetails: PropTypes.func,
  secretDetailsError: PropTypes.object,
  secretTemplateDetailsError: PropTypes.object,
  openNotification: PropTypes.func,
};

export default SecretsList;
