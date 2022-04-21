import Button from 'britive-design-system/core/components/button';
import Dialog from 'britive-design-system/core/components/dialog';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { BsTrash } from 'react-icons/bs';
import { FiSliders } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import DataTable from '../../../../../components/data-table/DataTable';
import BackToTop from 'britive-design-system/core/components/backToTop';
import { notificationMediumListingPath, typeOfStatus } from '../../../../../utils/common-constants';
import {
  backToTopId,
  classes,
  notificationMediumConstants,
  routeToNameList,
  tableColumns,
  translatedStrings,
} from './constants';
import './NotificationMediumList.scss';
import { startCase, debounce } from 'lodash';
import { isLoading, isSuccess } from '../../../../../utils/common-utils';
import Tooltip from 'britive-design-system/core/components/tooltip';

const NotificationMediumList = ({
  setPageHeader,
  getNotificationMediumList,
  notificationMediumStatus,
  notificationMediumData,
  notificationMediumPagination,
  deleteNotificationMedium,
  deleteNotificationMediumStatus,
  updateNotificationMediumSearchTerm,
  notificationMediumSearchTerm,
  resetDeleteNotificationMedium,
  history,
  match,
  getNotificationMediumListLoadMoreData,
}) => {
  const [notificationMediumTableData, setNotificationMediumTableData] = useState([]);
  const [deleteNotificationMediumId, setDeleteNotificationMediumId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const tableContainer = useRef(null);
  const loading = isLoading(notificationMediumStatus);
  const loadingDeleteNotificationMedium = isLoading(deleteNotificationMediumStatus);
  const handleNotificationMediumSearch = useCallback(
    debounce((nextValue) => {
      updateNotificationMediumSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getNotificationMediumList();
    }, notificationMediumConstants?.searchDebounceTime),
    [] // will be created only once initially
  );

  useEffect(() => {
    updateNotificationMediumSearchTerm('');
    setPageHeader(translatedStrings.pageTitle, routeToNameList);
    getNotificationMediumList();
  }, []);

  useEffect(() => {
    if (notificationMediumSearchTerm) {
      getNotificationMediumList();
    }
  }, [notificationMediumSearchTerm]);

  useEffect(() => {
    if (isSuccess(notificationMediumStatus)) {
      const tableData = notificationMediumData.map((notificationMedium) => {
        return {
          ...notificationMedium,
          type: startCase(notificationMedium?.type),
        };
      });
      setNotificationMediumTableData(tableData);
    }
  }, [notificationMediumStatus]);

  const cloneNotificationMedium = (id) => {
    updateNotificationMediumSearchTerm('');
    history?.push(`${notificationMediumListingPath}/clone/${id}`);
  };

  const goToViewPage = (id) => {
    updateNotificationMediumSearchTerm('');
    resetDeleteNotificationMedium();
    history?.push(`${match?.url}/view/${id}`);
  };

  const loadMoreHandler = () => {
    getNotificationMediumListLoadMoreData();
  };

  const columns = [
    {
      field: 'name',
      headerName: tableColumns.notificationMediumName,
      width: '30%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'description',
      headerName: tableColumns.description,
      width: '40%',
      horizontalAlignment: 'left',
    },
    {
      headerName: tableColumns.application,
      field: 'type',
      width: '30%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      headerName: tableColumns.action,
      width: '140px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.notificationMediumTableActionCell}>
            <div className={classes.notificationMediumTableActionEdit}>
              <Tooltip title={translatedStrings.manageNotification} position="left">
                <div>
                  <FiSliders
                    size={notificationMediumConstants?.actionIconSize}
                    onClick={() => {
                      goToViewPage(row?.id);
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classes.notificationMediumTableActionClone}>
              <Tooltip
                title={
                  row?.type === notificationMediumConstants.emailText
                    ? translatedStrings.deniedCloneNotification
                    : translatedStrings.cloneNotification
                }
                position="left"
              >
                <div>
                  <IoCopyOutline
                    size={notificationMediumConstants?.actionIconSize}
                    className={
                      row?.type === notificationMediumConstants.emailText && classes.disabledIcon
                    }
                    onClick={() => {
                      row?.type !== notificationMediumConstants.emailText &&
                        cloneNotificationMedium(row?.id);
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classes.notificationMediumTableActionDelete}>
              <Tooltip
                title={
                  row?.type === notificationMediumConstants.emailText
                    ? translatedStrings.deniedDeleteNotification
                    : translatedStrings.deleteNotification
                }
                position="left"
              >
                <div>
                  <BsTrash
                    size={notificationMediumConstants?.actionIconSize}
                    className={
                      row?.type === notificationMediumConstants.emailText && classes.disabledIcon
                    }
                    onClick={() => {
                      row?.type !== notificationMediumConstants.emailText &&
                        (setDeleteNotificationMediumId(row?.id), setShowDeleteDialog(true));
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

  const handleNotificationMedium = () => {
    updateNotificationMediumSearchTerm('');
    resetDeleteNotificationMedium();
    history?.push(`${match?.url}/add`);
  };

  const addNotificationMediumButton = () => {
    return (
      <div className={classes.addNotificationMediumButtonContainer}>
        <Button
          variant={notificationMediumConstants?.variant}
          size={notificationMediumConstants?.mediumSize}
          onClick={handleNotificationMedium}
        >
          {translatedStrings.addNotificationMediumButton}
        </Button>
      </div>
    );
  };

  const notificationMediumListTable = () => {
    return (
      <>
        <div className={classes.notificationMediumListContainer} ref={tableContainer}>
          <div
            data-testid={notificationMediumConstants?.testId}
            className={classes.notificationMediumTableContainer}
          >
            <DataTable
              inLineSort={true}
              rows={notificationMediumTableData}
              columns={columns}
              loading={loading || loadingDeleteNotificationMedium}
              loadingMessage={
                loadingDeleteNotificationMedium
                  ? translatedStrings.notificationMediumDeleteLoadingMessage
                  : translatedStrings.notificationMediumLoadingMessage
              }
              loadMoreHandler={loadMoreHandler}
              loadMore={!loading && Boolean(notificationMediumPagination?.next)}
              searchBar={{
                onSearch: handleNotificationMediumSearch,
                placeholder: translatedStrings.notificationMediumSearchPlaceholder,
              }}
            />
          </div>
        </div>
        <BackToTop id={backToTopId} parentRef={tableContainer} />
      </>
    );
  };

  const deleteDialog = () => {
    return (
      <Dialog
        type={notificationMediumConstants?.alertDialog}
        width={400}
        height={250}
        title={translatedStrings.deleteNotificationMediumDialogTitle}
        message={translatedStrings.deleteNotificationMediumDialogMessage}
        primaryButtonText={translatedStrings.deletePrimaryButton}
        secondaryButtonText={translatedStrings.noText}
        onSubmit={() => {
          setShowDeleteDialog(false);
          deleteNotificationMedium(deleteNotificationMediumId);
          setDeleteNotificationMediumId(null);
        }}
        onCancel={() => {
          setShowDeleteDialog(false);
          setDeleteNotificationMediumId(null);
        }}
      />
    );
  };

  return (
    <div role={notificationMediumConstants?.mainRole}>
      {addNotificationMediumButton()}
      {notificationMediumListTable()}
      {showDeleteDialog && deleteDialog()}
    </div>
  );
};

NotificationMediumList.propTypes = {
  setPageHeader: PropTypes.func,
  getNotificationMediumList: PropTypes.func,
  notificationMediumStatus: PropTypes.oneOf(typeOfStatus),
  notificationMediumData: PropTypes.array,
  notificationMediumPagination: PropTypes.object,
  deleteNotificationMedium: PropTypes.func,
  updateNotificationMediumSearchTerm: PropTypes.func,
  resetDeleteNotificationMedium: PropTypes.func,
  deleteNotificationMediumStatus: PropTypes.oneOf(typeOfStatus),
  notificationMediumSearchTerm: PropTypes.string,
  match: PropTypes.any,
  history: PropTypes.any,
  getNotificationMediumListLoadMoreData: PropTypes.func,
};

export default NotificationMediumList;
