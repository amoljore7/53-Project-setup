import React, { useCallback, useEffect, useRef, useState } from 'react';
import BackToTop from 'britive-design-system/core/components/backToTop';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Tooltip from 'britive-design-system/core/components/tooltip';
import classNames from 'classnames';
import { debounce, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import { FiSliders } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { permissionActions } from '../../../../../components/batch-eval/constants';
import DataTable from '../../../../../components/data-table/DataTable';
import { ALLOW, RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { appsConsumer } from '../add/constants';
import {
  addPermission,
  addPermissionsTxt,
  asterisk,
  backToTopId,
  classes,
  clonePermissionTooltip,
  defaultBtnSize,
  defaultModalType,
  deleteNoLabel,
  deletePermissionMsg,
  deletePermissionTitle,
  deletePermissionTooltip,
  deleteYesLabel,
  disabledDeletePermissionTooltip,
  loadingMessage,
  managePermissionTooltip,
  noAccessToClonePermissionTooltip,
  noAccessToDeletePermissionTooltip,
  noAccessToManagePermissionTooltip,
  pageTitle,
  permissionListTableTestId,
  permissionSearchText,
  routeToNameList,
  searchDebounceTime,
  tableColumns,
} from './constants';
import './PermissionListing.scss';
import { isLoading } from '../../../../../utils/common-utils';

const PermissionsListing = ({
  history,
  match,
  deletePermission,
  setPageHeader,
  getPermissionsTableList,
  tableList,
  tableStatus,
  deletePermissionStatus,
  updatePermissionListSearchTerm,
  tableSearchTerm,
  getPermissionsTableLoadMoreList,
  policyEvalData,
  getApplicationsList,
  applicationsListData,
  consumerList,
  consumerListStatus,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [permissionsList, setPermissionList] = useState([]);
  const [permissionEvalData, setPermissionEvalData] = useState({});
  const tableContainer = useRef(null);
  const handlePermissionSearch = useCallback(
    debounce((nextValue) => {
      updatePermissionListSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getPermissionsTableList();
    }, searchDebounceTime),
    []
  );

  useEffect(() => {
    updatePermissionListSearchTerm('');
    setPageHeader(pageTitle, routeToNameList);
    getApplicationsList();
    getPermissionsTableList();
  }, []);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setPermissionEvalData({
        add: policyEvalData[permissionActions?.create] === ALLOW,
        edit: policyEvalData[permissionActions?.update] === ALLOW,
        delete: policyEvalData[permissionActions?.delete] === ALLOW,
        view: policyEvalData[permissionActions?.read] === ALLOW,
        list: policyEvalData[permissionActions?.list] === ALLOW,
      });
    }
  }, [policyEvalData]);

  useEffect(() => {
    if (tableSearchTerm) {
      getPermissionsTableList();
    }
  }, [tableSearchTerm]);

  useEffect(() => {
    if (tableList && tableList.result) {
      const permissions = tableList.result.map((permission) => {
        const consumerDescription = consumerList.find(
          (consumer) => consumer.name === permission.consumer
        )?.description;
        if (!permission.isInline) {
          return {
            id: permission?.id,
            name: permission?.name,
            description: permission?.description,
            consumer: consumerDescription,
            actions: permission?.actions?.join(', '),
            resources:
              permission?.consumer === appsConsumer
                ? getApplicationName(permission?.resources)?.join(', ')
                : permission?.resources?.join(', '),
            isReadOnly: permission?.isReadOnly,
          };
        }
      });
      setPermissionList(permissions);
    }
  }, [tableList]);

  const getApplicationName = (resources) => {
    return resources.map((value) => {
      if (value === asterisk) return value;
      else {
        return applicationsListData?.find((application) => application?.appContainerId === value)
          ?.applicationName;
      }
    });
  };

  const viewHandler = (id) => {
    updatePermissionListSearchTerm('');
    history.push(match.url + `/view/${id}`);
  };
  const cloneHandler = (id) => {
    updatePermissionListSearchTerm('');
    history.push(match.url + `/clone/${id}`);
  };

  const noAccessToManagePermissionClasses = {
    [classes.permissionActionView]: true,
    [classes.disabledIcon]: !permissionEvalData?.view,
  };
  const clonePermissionClasses = {
    [classes.permissionActionCopy]: true,
    [classes.disabledIcon]: !permissionEvalData?.add,
  };

  const columns = [
    {
      field: 'name',
      headerName: tableColumns.permissionName,
      width: '15%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'description',
      headerName: tableColumns.description,
      width: '15%',
      horizontalAlignment: 'left',
    },
    {
      field: 'consumer',
      headerName: tableColumns.consumer,
      width: '15%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'actions',
      headerName: tableColumns.action,
      width: '30%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'resources',
      headerName: tableColumns.resources,
      width: '30%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      headerName: tableColumns.action,
      width: '140px',
      horizontalAlignment: 'left',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const { isReadOnly } = row;
        const deletePermissionClasses = {
          [classes.permissionActionDelete]: true,
          [classes.disabledIcon]: isReadOnly || !permissionEvalData?.delete,
        };
        return (
          <div className={classes.permissionActionItems}>
            <div className={classNames({ ...noAccessToManagePermissionClasses })}>
              <Tooltip
                title={
                  permissionEvalData?.view
                    ? managePermissionTooltip
                    : noAccessToManagePermissionTooltip
                }
                position="bottom-left"
              >
                <div>
                  <FiSliders
                    size={defaultBtnSize}
                    onClick={() => permissionEvalData?.view && viewHandler(row.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...clonePermissionClasses })}>
              <Tooltip
                title={
                  permissionEvalData?.add
                    ? clonePermissionTooltip
                    : noAccessToClonePermissionTooltip
                }
                position="bottom-left"
              >
                <div>
                  <IoCopyOutline
                    size={defaultBtnSize}
                    onClick={() => permissionEvalData?.add && cloneHandler(row.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...deletePermissionClasses })}>
              <Tooltip
                title={
                  isReadOnly
                    ? disabledDeletePermissionTooltip
                    : permissionEvalData?.delete
                    ? deletePermissionTooltip
                    : noAccessToDeletePermissionTooltip
                }
                position="bottom-left"
              >
                <div>
                  <BsTrash
                    size={defaultBtnSize}
                    onClick={() => {
                      if (!isReadOnly && permissionEvalData?.delete) {
                        setShowDeleteModal(true);
                        setDeleteID(row.id);
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

  const loadMoreHandler = () => {
    getPermissionsTableLoadMoreList();
  };

  const permissionListTable = () => {
    return (
      <>
        <div className={classes.permissionsTableListingContainer}>
          <DataTable
            inLineSort={true}
            rows={permissionsList}
            columns={columns}
            loading={
              isLoading(tableStatus) ||
              isLoading(deletePermissionStatus) ||
              isLoading(consumerListStatus)
            }
            loadingMessage={loadingMessage}
            loadMoreHandler={loadMoreHandler}
            loadMore={
              tableStatus !== RESOURCE_STATUS.LOADING && Boolean(tableList?.pagination?.next)
            }
            searchBar={{
              onSearch: handlePermissionSearch,
              placeholder: permissionSearchText,
            }}
          />
        </div>
        {showDeleteModal && (
          <DialogPopup
            type={defaultModalType}
            title={deletePermissionTitle}
            message={deletePermissionMsg}
            primaryButtonText={deleteYesLabel}
            secondaryButtonText={deleteNoLabel}
            onSubmit={() => {
              setShowDeleteModal(false);
              deletePermission(deleteID, history);
              setDeleteID(null);
            }}
            onCancel={() => {
              setShowDeleteModal(false);
              setDeleteID(null);
            }}
          />
        )}
      </>
    );
  };

  const clickHandler = (e) => {
    e.preventDefault();
    history.push(match.url + '/add');
  };

  const addPermissionBtn = () => {
    return (
      <div className={classes.addPermissionBtn} role={classes.addPermissionBtnTestId}>
        <Button size={addPermission.size} onClick={clickHandler}>
          {addPermissionsTxt}
        </Button>
      </div>
    );
  };
  return (
    <>
      <div className={classes.permissionListOuterWrapper}>
        {permissionEvalData?.add && addPermissionBtn()}
        <div
          data-testid={permissionListTableTestId}
          className={classes.permissionsListContainer}
          ref={tableContainer}
        >
          {permissionsList && permissionListTable()}
        </div>
        <BackToTop id={backToTopId} parentRef={tableContainer} />
      </div>
    </>
  );
};

PermissionsListing.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  deletePermission: PropTypes.func,
  setPageHeader: PropTypes.func,
  getPermissionsTableList: PropTypes.func,
  tableList: PropTypes.object,
  tableStatus: PropTypes.string,
  deletePermissionStatus: PropTypes.string,
  updatePermissionListSearchTerm: PropTypes.func,
  tableSearchTerm: PropTypes.string,
  getPermissionsTableLoadMoreList: PropTypes.func,
  policyEvalData: PropTypes.object,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};
export default PermissionsListing;
