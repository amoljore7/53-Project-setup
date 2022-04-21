import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import Dialog from 'britive-design-system/core/components/dialog';
import BackToTop from 'britive-design-system/core/components/backToTop';
import { FiSliders } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import debounce from 'lodash/debounce';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { roleActions } from '../../../../../components/batch-eval/constants';

import {
  mainRole,
  classes,
  pageTitle,
  routeToNameList,
  loadingMessage,
  roleSearchPlaceholder,
  actionIconSize,
  addRoleLabel,
  searchDebounceTime,
  deleteRoleMessage,
  deleteRoleTitle,
  yesDeleteLabel,
  noLabel,
  deleteRoleTooltip,
  disabledDeleteRoleTooltip,
  cloneRoleTooltip,
  manageRoleTooltip,
  backToTopId,
  translatedStrings,
} from './constants';
import DataTable from '../../../../../components/data-table/DataTable';

import './RolesList.scss';
import { translate } from '../../../externalization';
import { isEmpty } from 'lodash';
import { ALLOW } from '../../../../../utils/common-constants';

const RolesList = ({
  rolesListState,
  getRolesListData,
  history,
  match,
  setPageHeader,
  deleteRoleRequest,
  updateRoleListSearchTerm,
  getRolesListLoadMoreData,
  policyEvalData,
}) => {
  const [rolesList, setRolesList] = useState([]);
  const [deleteRoleId, setDeleteRoleID] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rolesEvaluatedData, setRolesEvaluatedData] = useState({});
  const { loading, pagination, result } = rolesListState;
  const tableContainer = useRef(null);
  const handleRolesSearch = useCallback(
    debounce((nextValue) => {
      updateRoleListSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getRolesListData();
    }, searchDebounceTime),
    [] // will be created only once initially
  );

  useEffect(() => {
    updateRoleListSearchTerm('');
    setPageHeader(pageTitle, routeToNameList);
    getRolesListData();
  }, []);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setRolesEvaluatedData({
        add: policyEvalData[roleActions?.create] === ALLOW,
        edit: policyEvalData[roleActions?.update] === ALLOW,
        delete: policyEvalData[roleActions?.delete] === ALLOW,
        view: policyEvalData[roleActions?.read] === ALLOW,
        list: policyEvalData[roleActions?.list] === ALLOW,
      });
    }
  }, [policyEvalData]);

  useEffect(() => {
    if (rolesListState?.searchTerm) {
      getRolesListData();
    }
  }, [rolesListState?.searchTerm]);

  useEffect(() => {
    const { result } = rolesListState;
    const roles = result.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      isReadOnly: role.isReadOnly,
      permissions: (role.permissions || []).map((permission) => permission.name).join(', '),
    }));
    setRolesList(roles);
  }, [result]);

  const viewHandler = (id) => {
    updateRoleListSearchTerm('');
    history.push(match.url + `/view/${id}`);
  };
  const cloneHandler = (id) => {
    updateRoleListSearchTerm('');
    history.push(match.url + `/clone/${id}`);
  };
  const columns = [
    {
      field: 'name',
      headerName: translate('ROLES_MODULE.ROLE_NAME'),
      width: '30%',
      sortable: true,
    },
    {
      field: 'description',
      headerName: translate('DESCRIPTION'),
      width: '30%',
    },
    {
      field: 'permissions',
      headerName: translate('PERMISSIONS'),
      width: '45%',
      sortable: true,
    },
    {
      headerName: translate('ACTION'),
      width: '150px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const { isReadOnly } = row;
        return (
          <div className={classes.rolesTableActionCell}>
            <div className={classes.rolesTableActionEdit}>
              <Tooltip
                title={
                  rolesEvaluatedData?.view
                    ? manageRoleTooltip
                    : translatedStrings?.noAccessToManageRoleTooltip
                }
                position="bottom-left"
              >
                <div>
                  <FiSliders
                    size={actionIconSize}
                    onClick={() => rolesEvaluatedData?.view && viewHandler(row.id)}
                    className={!rolesEvaluatedData?.view ? classes.disabledIcon : null}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classes.rolesTableActionClone}>
              <Tooltip
                title={
                  rolesEvaluatedData?.add
                    ? cloneRoleTooltip
                    : translatedStrings.noAccessToCloneRoleTooltip
                }
                position="bottom-left"
              >
                <div>
                  <IoCopyOutline
                    size={actionIconSize}
                    onClick={() => rolesEvaluatedData?.add && cloneHandler(row.id)}
                    className={!rolesEvaluatedData?.add ? classes.disabledIcon : null}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classes.rolesTableActionDelete}>
              <Tooltip
                title={
                  isReadOnly
                    ? disabledDeleteRoleTooltip
                    : rolesEvaluatedData?.delete
                    ? deleteRoleTooltip
                    : translatedStrings.noAccessToDeleteRoleTooltip
                }
                position="bottom-left"
              >
                <div>
                  <BsTrash
                    size={actionIconSize}
                    className={
                      isReadOnly || !rolesEvaluatedData?.delete ? classes.disabledIcon : null
                    }
                    onClick={() => {
                      if (!isReadOnly && rolesEvaluatedData?.delete) {
                        setDeleteRoleID(row.id);
                        setOpenDeleteDialog(true);
                      }
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handleAddRole = () => {
    history.push(`${match.url}/add`);
  };

  const getAddRoleBtn = () => {
    return (
      <div data-testid="add-role" className={classes.addRoleBtnContainer}>
        <Button variant="primary" size="medium" onClick={handleAddRole}>
          {addRoleLabel}
        </Button>
      </div>
    );
  };

  const loadMorehandler = () => {
    getRolesListLoadMoreData();
  };

  const getRoleListTable = () => {
    return (
      <>
        <div className={classes.rolesListContainer} ref={tableContainer}>
          <div data-testid="roles-table" className={classes.rolesTableContainer}>
            <DataTable
              inLineSort={true}
              rows={rolesList}
              columns={columns}
              loading={loading}
              loadingMessage={loadingMessage}
              loadMoreHandler={loadMorehandler}
              loadMore={!loading && Boolean(pagination.next)}
              searchBar={{
                onSearch: handleRolesSearch,
                placeholder: roleSearchPlaceholder,
              }}
            />
          </div>
          {openDeleteDialog && (
            <Dialog
              type={'alert'}
              title={deleteRoleTitle}
              message={deleteRoleMessage}
              primaryButtonText={yesDeleteLabel}
              secondaryButtonText={noLabel}
              onSubmit={() => {
                setOpenDeleteDialog(false);
                deleteRoleRequest(deleteRoleId);
                setDeleteRoleID(null);
              }}
              onCancel={() => {
                setOpenDeleteDialog(false);
                setDeleteRoleID(null);
              }}
            />
          )}
        </div>
        <BackToTop id={backToTopId} parentRef={tableContainer} />
      </>
    );
  };

  return (
    <div role={mainRole}>
      {rolesEvaluatedData?.add && getAddRoleBtn()}
      {getRoleListTable()}
    </div>
  );
};

RolesList.propTypes = {
  rolesListState: PropTypes.object,
  getRolesListData: PropTypes.func,
  deleteRoleRequest: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  setPageHeader: PropTypes.func,
  updateRoleListSearchTerm: PropTypes.func,
  getRolesListLoadMoreData: PropTypes.func,
  policyEvalData: PropTypes.object,
};

export default RolesList;
