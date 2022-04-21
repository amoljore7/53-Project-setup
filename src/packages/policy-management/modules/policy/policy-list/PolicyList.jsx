import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Button from 'britive-design-system/core/components/button';
import Dialog from 'britive-design-system/core/components/dialog';
import DataTable from '../../../../../components/data-table/DataTable';
import BackToTop from 'britive-design-system/core/components/backToTop';
import { FiSliders } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import Tooltip from 'britive-design-system/core/components/tooltip';
import classNames from 'classnames';
import {
  mainRole,
  classes,
  title,
  routeToNameList,
  addPolicyBtnTestId,
  addPolicybtn,
  defaultBtnSize,
  enabledPolicy,
  disabledPolicy,
  policyTableTestId,
  policySearchText,
  addPolicyButtonLabel,
  loadingMessage,
  tableColumns,
  searchDebounceTime,
  deletePolicyTitle,
  deletePolicyMessage,
  yesDeleteLabel,
  noLabel,
  getTogglePolicyConfirmTitle,
  getTogglePolicyConfirmMessage,
  getTogglePolicyLabel,
  clonePolicyTooltip,
  tenantAdminPolicyName,
  backToTopId,
  translatedStrings,
  draftPolicy,
  getDisableTooltipTitle,
  getEnableTooltipTitle,
  getManageTooltipTitle,
  getDeleteTooltipTitle,
} from './constants';

import './PolicyList.scss';
import { isEmpty } from 'lodash';
import { policyActions } from '../../../../../components/batch-eval/constants';
import {
  ALLOW,
  policyListingPath,
  tokensListAction,
  userTagListAction,
} from '../../../../../utils/common-constants';

const PolicyList = ({
  policyListState,
  deletePolicyRequest,
  togglePolicyRequest,
  getPolicyListData,
  setPageHeader,
  history,
  match,
  updatePolicyListSearchTerm,
  getPolicyListLoadMoreData,
  policyEvalData,
}) => {
  const [policyList, setPolicyList] = useState([]);
  const [deletePolicyId, setDeletePolicyId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openToggleDialog, setOpenToggleDialog] = useState(false);
  const [togglePolicy, setTogglePolicy] = useState({ id: '', status: '' });
  const [policiesEvalData, setPoliciesEvalData] = useState({});
  const tableContainer = useRef(null);
  const { loading, pagination, result } = policyListState;

  const handlePolicySearch = useCallback(
    debounce(
      (nextValue) => {
        updatePolicyListSearchTerm(nextValue);
        /* To make get all call for empty search value */
        !nextValue && getPolicyListData();
      },
      searchDebounceTime,
      []
    )
  );

  useEffect(() => {
    updatePolicyListSearchTerm('');
    setPageHeader(title, routeToNameList);
    getPolicyListData();
  }, []);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setPoliciesEvalData({
        add: policyEvalData[policyActions?.create] === ALLOW,
        edit: policyEvalData[policyActions?.update] === ALLOW,
        delete: policyEvalData[policyActions?.delete] === ALLOW,
        view: policyEvalData[policyActions?.read] === ALLOW,
        list: policyEvalData[policyActions?.list] === ALLOW,
        members:
          policyEvalData[userTagListAction] === ALLOW && policyEvalData[tokensListAction] === ALLOW,
      });
    }
  }, [policyEvalData]);

  useEffect(() => {
    if (policyListState?.searchTerm) {
      getPolicyListData();
    }
  }, [policyListState?.searchTerm]);

  useEffect(() => {
    const policies = result.map((policy) => ({
      id: policy.id,
      name: policy.name,
      description: policy.description,
      accessType: policy.accessType,
      status: policy.isActive ? enabledPolicy : policy.isDraft ? draftPolicy : disabledPolicy,
      isReadOnly: policy.isReadOnly,
      isDraft: policy.isDraft,
      accessLevel: policy.accessLevel,
    }));

    setPolicyList(policies);
  }, [result]);

  const viewHandler = (id) => {
    updatePolicyListSearchTerm('');
    history.push(`${policyListingPath}/view/${id}`);
  };
  const columns = [
    {
      field: 'name',
      headerName: tableColumns.policyName,
      width: '30%',
      sortable: true,
    },
    {
      field: 'description',
      headerName: tableColumns.description,
      width: '40%',
    },
    {
      field: 'accessType',
      headerName: tableColumns.accessType,
      width: '15%',
      sortable: true,
    },
    {
      field: 'status',
      headerName: tableColumns.status,
      width: '15%',
      sortable: true,
    },
    {
      headerName: tableColumns.action,
      width: '172px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const handlePolicyDelete = () => {
          const { isReadOnly, id } = row;
          if (!isReadOnly) {
            setDeletePolicyId(id);
            setOpenDeleteDialog(true);
          }
        };

        const handlePolicyToggle = () => {
          const { name, id, status, isDraft } = row;
          if (name?.toLowerCase() !== tenantAdminPolicyName.toLowerCase() && !isDraft) {
            setTogglePolicy({ id, status });
            setOpenToggleDialog(true);
          }
        };

        const handlePolicyClone = (id) => {
          updatePolicyListSearchTerm('');
          history.push(`/admin/policy-management/policies/clone/${id}`);
        };

        const deleteIconClasses = {
          [classes.policyActionDelete]: true,
          [classes.policyActionDeleteDisabled]: row?.isReadOnly || row?.accessLevel,
        };

        const toggleButtonClasses = {
          [classes.policyActionToggleDisabled]:
            row?.name?.toLowerCase() === tenantAdminPolicyName.toLowerCase() ||
            row?.isDraft ||
            row?.accessLevel,
        };

        const manageIconClasses = {
          [classes.disabledIcon]: !policiesEvalData?.view || !policiesEvalData?.members,
        };

        return (
          <div className={classes.policyActionItems}>
            <div className={classes.policyActionEdit}>
              <Tooltip title={getManageTooltipTitle(policiesEvalData)} position="bottom-left">
                <div>
                  <FiSliders
                    size={defaultBtnSize}
                    onClick={() => policiesEvalData?.view && viewHandler(row?.id)}
                    className={classNames(manageIconClasses)}
                  />
                </div>
              </Tooltip>
            </div>
            {row.status === enabledPolicy && (
              <div
                className={classes.policyActionToggle}
                onClick={() => policiesEvalData?.edit && !row?.accessLevel && handlePolicyToggle()}
              >
                <Tooltip
                  title={getEnableTooltipTitle(row, policiesEvalData)}
                  position="bottom-left"
                >
                  <div>
                    <BsToggleOn
                      size={defaultBtnSize}
                      className={classNames({ ...toggleButtonClasses })}
                    />
                  </div>
                </Tooltip>
              </div>
            )}
            {(row.status === disabledPolicy || row.status === draftPolicy) && (
              <div
                className={classes.policyActionToggle}
                onClick={() => policiesEvalData?.edit && !row?.accessLevel && handlePolicyToggle()}
              >
                <Tooltip
                  title={getDisableTooltipTitle(row, policiesEvalData)}
                  position="bottom-left"
                >
                  <div>
                    <BsToggleOff
                      size={defaultBtnSize}
                      className={classNames({ ...toggleButtonClasses })}
                    />
                  </div>
                </Tooltip>
              </div>
            )}
            <div className={classes.policyActionCopy}>
              <Tooltip
                title={
                  policiesEvalData?.add
                    ? clonePolicyTooltip
                    : translatedStrings.noAccessToClonePolicyTooltip
                }
                position="bottom-left"
              >
                <div>
                  <IoCopyOutline
                    size={defaultBtnSize}
                    className={!policiesEvalData?.add && classes.disabledIcon}
                    onClick={() => policiesEvalData?.add && handlePolicyClone(row.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div
              className={classNames({ ...deleteIconClasses })}
              onClick={() => policiesEvalData?.delete && !row?.accessLevel && handlePolicyDelete()}
            >
              <Tooltip title={getDeleteTooltipTitle(row, policiesEvalData)} position="bottom-left">
                <div>
                  <BsTrash
                    size={defaultBtnSize}
                    className={!policiesEvalData?.delete && classes.disabledIcon}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handleAddPolicy = () => {
    history.push(`${match.url}/add`);
  };
  const getPolicyBtn = () => {
    return (
      <div data-testid={addPolicyBtnTestId} className={classes.addPolicyBtnContainer}>
        <Button variant={addPolicybtn.variant} size={addPolicybtn.size} onClick={handleAddPolicy}>
          {addPolicyButtonLabel}
        </Button>
      </div>
    );
  };

  const loadMoreHandler = () => {
    getPolicyListLoadMoreData();
  };

  const getPolicyTable = () => {
    const handleCancel = () => {
      setOpenDeleteDialog(false);
      setDeletePolicyId(null);
    };
    const handleDelete = () => {
      setOpenDeleteDialog(false);
      deletePolicyRequest(deletePolicyId);
      setDeletePolicyId(null);
    };
    const handleTogglePolicyCancel = () => {
      setOpenToggleDialog(false);
      setTogglePolicy({});
    };
    const handleTogglePolicy = () => {
      setOpenToggleDialog(false);
      togglePolicyRequest(togglePolicy);
    };
    return (
      <>
        <div data-testid={policyTableTestId} className={classes.policiesTableContainer}>
          <DataTable
            inLineSort={true}
            rows={policyList}
            columns={columns}
            loading={loading}
            loadingMessage={loadingMessage}
            loadMoreHandler={loadMoreHandler}
            loadMore={!loading && Boolean(pagination.next)}
            searchBar={{
              onSearch: handlePolicySearch,
              placeholder: policySearchText,
            }}
          />
        </div>
        {openDeleteDialog && (
          <Dialog
            type={'alert'}
            title={deletePolicyTitle}
            message={deletePolicyMessage}
            primaryButtonText={yesDeleteLabel}
            secondaryButtonText={noLabel}
            onSubmit={handleDelete}
            onCancel={handleCancel}
          />
        )}
        {openToggleDialog && (
          <Dialog
            type={'alert'}
            title={getTogglePolicyConfirmTitle(togglePolicy.status)}
            message={getTogglePolicyConfirmMessage(togglePolicy.status)}
            primaryButtonText={getTogglePolicyLabel(togglePolicy.status)}
            secondaryButtonText={noLabel}
            onSubmit={handleTogglePolicy}
            onCancel={handleTogglePolicyCancel}
          />
        )}
      </>
    );
  };

  return (
    <>
      {policiesEvalData?.add && policiesEvalData?.members && getPolicyBtn()}
      <div role={mainRole} className={classes.policyListContainer} ref={tableContainer}>
        {getPolicyTable()}
      </div>
      <BackToTop id={backToTopId} parentRef={tableContainer} />
    </>
  );
};

PolicyList.propTypes = {
  policyListState: PropTypes.object,
  togglePolicyRequest: PropTypes.func,
  deletePolicyRequest: PropTypes.func,
  getPolicyListData: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  setPageHeader: PropTypes.func,
  updatePolicyListSearchTerm: PropTypes.func,
  getPolicyListLoadMoreData: PropTypes.func,
  policyEvalData: PropTypes.object,
};

export default PolicyList;
