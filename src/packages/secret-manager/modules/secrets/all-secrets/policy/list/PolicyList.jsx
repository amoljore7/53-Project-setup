import Button from 'britive-design-system/core/components/button';
import Dialog from 'britive-design-system/core/components/dialog';
import Tooltip from 'britive-design-system/core/components/tooltip';
import classNames from 'classnames';
import { debounce, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
import { BsToggleOff, BsToggleOn, BsTrash } from 'react-icons/bs';
import { FiSliders } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import DataTable from '../../../../../../../components/data-table/DataTable';
import { openNotification } from '../../../../../../../components/notification/action';
import { getMetadataRequest } from '../../../../../../../components/policy/metadata/actions';
import {
  ALLOW,
  createPolicyAction,
  deletePolicyAction,
  errorNotificationDuration,
  readPolicyAction,
  tokensListAction,
  updatePolicyAction,
  userTagListAction,
} from '../../../../../../../utils/common-constants';
import { getParentString } from '../../../../../../../utils/common-utils';
import { classes } from '../../constants';
import { pathSeparator } from '../add/constants';
import { isPolicyEditable } from '../utils';
import {
  actionIconSize,
  translatedStrings,
  tenantAdminPolicyName,
  mainRole,
  searchDebounceTime,
  getPolicyActions,
  PolicyListDataTypes,
} from './constants';

const PolicyList = ({
  batchEvalData,
  policyListState,
  deletePolicyRequest,
  togglePolicyRequest,
  getPolicyListData,
  history,
  match,
  vaultName,
  updatePolicyListSearchTerm,
  getPolicyListLoadMoreData,
  selectedItemAncestors,
  nodeSecretMetadataState,
}) => {
  const dispatch = useDispatch();
  const [policyList, setPolicyList] = useState([]);
  const { loading, pagination, result } = policyListState;
  const [deletePolicy, setDeletePolicy] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openToggleDialog, setOpenToggleDialog] = useState(false);
  const [togglePolicy, setTogglePolicy] = useState(false);
  const [isSearchEmpty, setSearchEmpty] = useState(false);
  const { result: selectedNodeMetadata, error: selectedNodeMetadataError } =
    nodeSecretMetadataState;

  useEffect(() => {
    if (!isEmpty(vaultName)) {
      updatePolicyListSearchTerm('');
      setSearchEmpty(true);
      if (!isEmpty(selectedItemAncestors)) {
        getPolicyListData(getParentString(selectedItemAncestors.slice(1)));
        dispatch(
          getMetadataRequest(
            getPolicyActions(getParentString(selectedItemAncestors.slice(1))),
            getParentString(selectedItemAncestors.slice(1))
          )
        );
      } else {
        if (!isEmpty(vaultName)) {
          getPolicyListData(pathSeparator);
        }
      }
    }
  }, [selectedItemAncestors, vaultName]);

  useEffect(() => {
    if (selectedNodeMetadataError) {
      openNotification(
        PolicyListDataTypes.OPEN_NOTIFICATION,
        translatedStrings.getMetadataErrorMessage(selectedNodeMetadataError),
        errorNotificationDuration
      );
    }
  }, [selectedNodeMetadataError]);

  const handlePolicySearch = useCallback(
    debounce(
      (nextValue) => {
        setSearchEmpty(!nextValue);
        updatePolicyListSearchTerm(nextValue);

        if (!isEmpty(selectedItemAncestors)) {
          getPolicyListData(getParentString(selectedItemAncestors.slice(1)));
        } else {
          getPolicyListData(pathSeparator);
        }
      },
      searchDebounceTime,
      []
    )
  );

  const handleDelete = () => {
    setOpenDeleteDialog(false);
    const { id, resource, listPolicyPath } = deletePolicy;
    deletePolicyRequest({
      id,
      resource,
      listPolicyPath,
    });
    setDeletePolicy(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeletePolicy(null);
  };

  const handleToggle = () => {
    setOpenToggleDialog(false);
    if (!isEmpty(selectedItemAncestors)) {
      togglePolicyRequest(togglePolicy);
    } else {
      togglePolicyRequest(togglePolicy);
    }
  };

  const handleToggleCancel = () => {
    setOpenToggleDialog(false);
    setTogglePolicy({});
  };

  const loadMoreHandler = () => {
    if (!isEmpty(selectedItemAncestors)) {
      getPolicyListLoadMoreData(selectedItemAncestors);
    } else {
      getPolicyListLoadMoreData([{ label: vaultName }]);
    }
  };

  const addPolicyHandler = () => {
    if (!isEmpty(selectedItemAncestors)) {
      const path = getParentString(selectedItemAncestors.slice(1));
      history.push(`${match.url}/policy/add?path=${path}`, {
        allAncestorItems: selectedItemAncestors,
      });
    }
  };

  const columns = [
    {
      width: '20%',
      field: 'name',
      headerName: translatedStrings.table.nameHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '30%',
      field: 'description',
      headerName: translatedStrings.table.descriptionHeader,
      horizontalAlignment: 'left',
    },
    {
      width: '30%',
      field: 'resource',
      headerName: translatedStrings.table.applicableToHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '20%',
      field: 'status',
      headerName: translatedStrings.table.statusHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      headerName: translatedStrings.table.actionHeader,
      width: '150px',
      renderColumn: (row) => {
        const isEditAllowed = () =>
          !loading && isPolicyEditable(getParentString(selectedItemAncestors.slice(1)), row);
        const isDeleteAllowed = () =>
          (row?.name?.toLowerCase() !== tenantAdminPolicyName.toLowerCase() ||
            selectedNodeMetadata[deletePolicyAction] === ALLOW) &&
          isEditAllowed();
        const canViewPolicy = () =>
          selectedNodeMetadata[readPolicyAction] === ALLOW &&
          batchEvalData[userTagListAction] === ALLOW &&
          batchEvalData[tokensListAction] === ALLOW;

        const handlePolicyDelete = () => {
          if (!isDeleteAllowed()) return;
          const { isReadOnly, id } = row;
          if (!isReadOnly && selectedNodeMetadata[updatePolicyAction] === ALLOW) {
            setDeletePolicy({
              id,
              resource: row?.resource,
              listPolicyPath: getParentString(selectedItemAncestors.slice(1)),
            });
            setOpenDeleteDialog(true);
          }
        };

        const handleToggle = () => {
          if (
            row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase() ||
            selectedNodeMetadata[updatePolicyAction] !== ALLOW ||
            !isEditAllowed()
          )
            return;

          const { name, id, status } = row;
          if (
            name?.toLowerCase() !== tenantAdminPolicyName.toLowerCase() &&
            selectedNodeMetadata[updatePolicyAction] === ALLOW
          ) {
            setTogglePolicy({
              id,
              status,
              resource: row?.resource,
              listPolicyPath: getParentString(selectedItemAncestors.slice(1)),
            });
            setOpenToggleDialog(true);
          }
        };

        const handleView = (id) => {
          if (!isEmpty(selectedItemAncestors)) {
            const path = getParentString(selectedItemAncestors.slice(1));
            history.push(match?.url + `/policy/view/${id}?path=${path}`);
            updatePolicyListSearchTerm('');
          }
        };

        const deleteIconClasses = {
          [classes.policyActionDelete]: true,
          [classes.policyActionDeleteDisabled]: !isDeleteAllowed(),
        };

        const toggleButtonClasses = {
          [classes.policyActionToggle]: true,
          [classes.policyActionToggleDisabled]:
            row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase() ||
            selectedNodeMetadata[updatePolicyAction] !== ALLOW ||
            !isEditAllowed(),
        };

        const manageIconClasses = {
          [classes.policyActionViewDisabled]: !canViewPolicy(),
        };

        const getManageTooltipTitle = () => {
          return canViewPolicy()
            ? translatedStrings.tooltip.managePolicy
            : translatedStrings.tooltip.noAccessToManagePolicyTooltip;
        };

        const getToggleTooltipTitle = (enabled = false) => {
          if (row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase())
            return translatedStrings.tooltip.disabledForUser;
          else if (selectedNodeMetadata[updatePolicyAction] !== ALLOW || !isEditAllowed()) {
            return enabled
              ? translatedStrings.tooltip.noAccessToDisablePolicy
              : translatedStrings.tooltip.noAccessToEnablePolicy;
          } else
            return enabled
              ? translatedStrings.tooltip.disabledTooltip
              : translatedStrings.tooltip.enabledTooltip;
        };

        const getDeleteTooltipTitle = () => {
          if (row?.isReadOnly) {
            if (row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase()) {
              return translatedStrings.tooltip.disabledDeleteTAPolicy;
            } else {
              return translatedStrings.tooltip.disabledDeletePolicy;
            }
          } else {
            if (selectedNodeMetadata[deletePolicyAction] === ALLOW && isDeleteAllowed()) {
              return translatedStrings.tooltip.deletePolicy;
            } else {
              return translatedStrings.tooltip.noAccessToDelete;
            }
          }
        };

        return (
          <div className={classes.policyActionItems}>
            <div className={classes.policyActionView}>
              <Tooltip title={getManageTooltipTitle()} position="bottom-left">
                <div>
                  <FiSliders
                    size={actionIconSize}
                    onClick={() => canViewPolicy() && handleView(row?.id)}
                    className={classNames(manageIconClasses)}
                  />
                </div>
              </Tooltip>
            </div>
            {row.status === translatedStrings.table.enabledStatus && (
              <div className={classNames({ ...toggleButtonClasses })} onClick={handleToggle}>
                <Tooltip title={getToggleTooltipTitle(true)} position="bottom-left">
                  <div>
                    <BsToggleOn size={actionIconSize} />
                  </div>
                </Tooltip>
              </div>
            )}
            {row.status === translatedStrings.table.disabledStatus && (
              <div className={classNames({ ...toggleButtonClasses })} onClick={handleToggle}>
                <Tooltip title={getToggleTooltipTitle(false)} position="bottom-left">
                  <div>
                    <BsToggleOff size={actionIconSize} />
                  </div>
                </Tooltip>
              </div>
            )}
            {row.status === translatedStrings.table.draftStatus && (
              <div className={classes.policyActionToggleDisabled}>
                <Tooltip title={translatedStrings.tooltip.draftPolicy} position="bottom-left">
                  <div>
                    <BsToggleOff size={actionIconSize} />
                  </div>
                </Tooltip>
              </div>
            )}
            <div className={classNames({ ...deleteIconClasses })} onClick={handlePolicyDelete}>
              <Tooltip title={getDeleteTooltipTitle()} position="bottom-left">
                <div>
                  <BsTrash size={actionIconSize} />
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const policies = result
      .sort(({ name: firstPolicyName }, { name: secondPolicyName }) =>
        (firstPolicyName || '').localeCompare(secondPolicyName)
      )
      .map((policy) => {
        const {
          id,
          name,
          description,
          isActive,
          isReadOnly,
          isDraft,
          accessType,
          resource,
          resources,
          accessLevel,
          consumer,
        } = policy;
        return {
          id,
          name,
          description,
          accessType,
          status: isActive
            ? translatedStrings.table.enabledStatus
            : isDraft
            ? translatedStrings.table.draftStatus
            : translatedStrings.table.disabledStatus,
          isReadOnly: isReadOnly,
          isDraft: isDraft,
          resource: resource ?? resources.join(', '),
          accessLevel,
          consumer,
        };
      });

    setPolicyList(policies);
  }, [result]);

  return (
    <>
      <div className={classes.secretsTabButtonContainer}>
        {!selectedNodeMetadataError &&
          selectedNodeMetadata[createPolicyAction] === ALLOW &&
          batchEvalData[userTagListAction] === ALLOW &&
          batchEvalData[tokensListAction] === ALLOW && (
            <Button variant="primary" onClick={addPolicyHandler}>
              {translatedStrings.addPolicy}
            </Button>
          )}
      </div>
      <div role={mainRole} className={classes.secretsTabTableContainer}>
        <DataTable
          inLineSort={true}
          rows={policyList}
          columns={columns}
          loading={loading}
          loadingMessage={translatedStrings.table.loadingMessage}
          loadMoreHandler={loadMoreHandler}
          loadMore={!loading && Boolean(pagination?.next)}
          searchBar={{
            onSearch: handlePolicySearch,
            placeholder: translatedStrings.table.searchPlaceHolder,
            isSearchEmpty: isSearchEmpty,
          }}
        ></DataTable>
      </div>
      {openDeleteDialog && (
        <Dialog
          type={'alert'}
          title={translatedStrings.delete.title}
          message={translatedStrings.delete.message}
          primaryButtonText={translatedStrings.delete.primaryText}
          secondaryButtonText={translatedStrings.delete.secondaryText}
          onSubmit={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
      {openToggleDialog && (
        <Dialog
          type={'alert'}
          title={translatedStrings.toggle.getTitle(togglePolicy.status)}
          message={translatedStrings.toggle.getMessage(togglePolicy.status)}
          primaryButtonText={translatedStrings.toggle.getPrimaryText(togglePolicy.status)}
          secondaryButtonText={translatedStrings.toggle.secondaryText}
          onSubmit={handleToggle}
          onCancel={handleToggleCancel}
        />
      )}
    </>
  );
};

PolicyList.propTypes = {
  batchEvalData: PropTypes.object,
  policyListState: PropTypes.object,
  deletePolicyRequest: PropTypes.func,
  nodeSecretMetadataState: PropTypes.any,
  togglePolicyRequest: PropTypes.func,
  getPolicyListData: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  updatePolicyListSearchTerm: PropTypes.func,
  getPolicyListLoadMoreData: PropTypes.func,
  selectedItemAncestors: PropTypes.array,
  vaultName: PropTypes.string,
};

export default PolicyList;
