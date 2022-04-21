import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../data-table/DataTable';
import BackToTop from 'britive-design-system/core/components/backToTop';
import DialogPopup from 'britive-design-system/core/components/dialog';
import TextField from 'britive-design-system/core/components/textfield';
import Tooltip from 'britive-design-system/core/components/tooltip';
import {
  classes,
  myApprovalsTableTestId,
  defaultBtnSize,
  YES_PARAM,
  NO_PARAM,
  backToTopId,
  adminApprovalsListString,
} from './constants';
import { CgCheckR, CgCloseR } from 'react-icons/cg';
import { FiSliders } from 'react-icons/fi';
import { mediumHeightDialogPopUp } from '../../../utils/common-constants';
import { convertTimeToCurrentTimezone } from '../../../utils/common-utils';
import './ApprovalsList.scss';
import { sortApprovalsAndRequestByDate } from '../utils';

const ApprovalsList = ({
  history,
  match,
  getMyApprovalsListData,
  myApprovalsListState,
  updateApprovalsListSearchTerm,
  requestToApprove,
  requestToReject,
  getMyApprovalsListDataLoadMore,
  getApprovalStatus,
  getApprovalStatusTooltip,
  getActionLabel,
  translatedStrings,
  tableColumns,
  approvalsListString,
  consumer,
}) => {
  const [myApprovalsList, setMyApprovalsList] = useState([]);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [userApproval, setUserApproval] = useState({});
  const { loading, result, pagination } = myApprovalsListState;
  const tableContainer = useRef(null);
  const [commandText, setCommandText] = useState('');

  // TODO: Uncomment once searching is supported by the API
  // const handleApprovalsSearch = useCallback(
  //   debounce(
  //     (nextValue) => {
  //       updateApprovalsListSearchTerm(nextValue);
  //       /* To make get all call for empty search value */
  //       !nextValue && getMyApprovalsListData();
  //     },
  //     searchDebounceTime,
  //     []
  //   )
  // );

  useEffect(() => {
    getMyApprovalsListData();
    updateApprovalsListSearchTerm('');
  }, []);

  useEffect(() => {
    if (myApprovalsListState?.searchTerm) {
      getMyApprovalsListData();
    }
  }, [myApprovalsListState?.searchTerm]);

  useEffect(() => {
    const approvals =
      result &&
      result.map((approval) => ({
        requestId: approval?.requestId || translatedStrings.noneValue,
        createdAt: convertTimeToCurrentTimezone(approval?.createdAt) || translatedStrings.noneValue,
        userId: approval?.userId || translatedStrings.noneValue,
        action: getActionLabel(approval?.action) || translatedStrings.noneValue,
        resource: approval?.resourceName || approval?.resource || translatedStrings.noneValue,
        //status is translated because it will help in sorting.
        status: getApprovalStatus(approval?.status) || translatedStrings.noneValue,
      }));
    setMyApprovalsList(sortApprovalsAndRequestByDate(approvals));
  }, [result]);

  const viewHandler = (id) => {
    history.push(match.url + `/view/${id}`);
    updateApprovalsListSearchTerm('');
  };

  const columns = [
    {
      field: 'createdAt',
      headerName: tableColumns.requestedOn,
      width: '20%',
      sortable: true,
      isDate: true,
    },
    {
      field: 'userId',
      headerName: tableColumns.requestedBy,
      width: '20%',
      sortable: true,
    },
    {
      field: 'resource',
      headerName: tableColumns.resource,
      width: '20%',
      sortable: true,
    },
    {
      field: 'status',
      headerName: tableColumns.approvalStatus,
      width: '20%',
      sortable: true,
    },
    {
      headerName: tableColumns.action,
      width: '140px',
      renderColumn: (row) => {
        const { status } = row;
        const isApprovalPending = status === translatedStrings.approvalPendingText;
        return (
          <div className={classes.myApprovalsActionItems}>
            <div className={classes.myApprovalsActionChecked}>
              <Tooltip title={translatedStrings.manageRequestTooltip} position="left">
                <div className={classes.approvalsManageIcon}>
                  <FiSliders size={defaultBtnSize} onClick={() => viewHandler(row.requestId)} />
                </div>
              </Tooltip>
            </div>
            <div
              className={
                !isApprovalPending ? classes.disabledIcon : classes.myApprovalsActionChecked
              }
            >
              <Tooltip
                title={
                  !isApprovalPending
                    ? getApprovalStatusTooltip(status)
                    : translatedStrings.approveRequestTooltip
                }
                position="left"
              >
                <div className={classes.approveIcon}>
                  <CgCheckR
                    size={defaultBtnSize}
                    onClick={() => {
                      if (isApprovalPending) {
                        setShowApproveDialog(true);
                        setUserApproval(row);
                      }
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div
              className={
                !isApprovalPending ? classes.disabledIcon : classes.myApprovalsActionCrossed
              }
            >
              <Tooltip
                title={
                  !isApprovalPending
                    ? getApprovalStatusTooltip(status)
                    : translatedStrings.rejectRequestTooltip
                }
                position="left"
              >
                <div className={classes.rejectIcon}>
                  <CgCloseR
                    size={defaultBtnSize}
                    onClick={() => {
                      if (isApprovalPending) {
                        setShowRejectDialog(true);
                        setUserApproval(row);
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
    getMyApprovalsListDataLoadMore();
  };

  const findHeight = () =>
    // we need to remove 200px/173px(height of title and breadcrumbs, which is different in admin and user side)
    // from page height to accommodate approvals list
    approvalsListString === adminApprovalsListString
      ? 'calc(100vh - 200px)'
      : 'calc(100vh - 173px)';

  return (
    <>
      <div className={classes.listContainer} style={{ height: findHeight() }} ref={tableContainer}>
        <div data-testid={myApprovalsTableTestId} className={classes.tableContainer}>
          <DataTable
            inLineSort={true}
            rows={myApprovalsList}
            columns={columns}
            loading={loading}
            loadingMessage={translatedStrings.loadingMessage}
            loadMoreHandler={loadMoreHandler}
            loadMore={!loading && Boolean(pagination?.next)}
            // TODO: Uncomment once searching is supported by the API
            // searchBar={{
            //   onSearch: handleApprovalsSearch,
            //   placeholder: translatedStrings.myApprovalsSearchText,
            //   isDisabled: true,
            // }}
          />
        </div>
        {showApproveDialog && (
          <DialogPopup
            type="alert"
            height={mediumHeightDialogPopUp}
            title={translatedStrings.approveRequestTitle}
            message={`${userApproval.action} ${translatedStrings.approveMessage} ${userApproval.userId} ${translatedStrings.forLabel} ${userApproval.resource}`}
            primaryButtonText={translatedStrings.yesApprove}
            secondaryButtonText={translatedStrings.cancelLabel}
            onSubmit={() => {
              setShowApproveDialog(false);
              //Api call for Approve.
              requestToApprove(userApproval.requestId, YES_PARAM, commandText, consumer);
              setCommandText('');
            }}
            onCancel={() => {
              setShowApproveDialog(false);
              setCommandText('');
            }}
          >
            <TextField
              label={translatedStrings.comments}
              helperText={translatedStrings.optional}
              value={commandText || ''}
              onChange={(e) => setCommandText(e.target.value)}
            />
          </DialogPopup>
        )}
        {showRejectDialog && (
          <DialogPopup
            type="alert"
            title={translatedStrings.rejectRequestTitle}
            height={mediumHeightDialogPopUp}
            message={`${userApproval.action} ${translatedStrings.rejectMessage} ${userApproval.userId} ${translatedStrings.forLabel} ${userApproval.resource}`}
            primaryButtonText={translatedStrings.yesReject}
            secondaryButtonText={translatedStrings.cancelLabel}
            onSubmit={() => {
              setShowRejectDialog(false);
              //Api call for Reject.
              requestToReject(userApproval.requestId, NO_PARAM, commandText, consumer);
              setCommandText('');
            }}
            onCancel={() => {
              setShowRejectDialog(false);
              setCommandText('');
            }}
          >
            <TextField
              label={translatedStrings.comments}
              helperText={translatedStrings.optional}
              value={commandText || ''}
              onChange={(e) => setCommandText(e.target.value)}
            />
          </DialogPopup>
        )}
      </div>
      <BackToTop id={backToTopId} parentRef={tableContainer} />
    </>
  );
};

ApprovalsList.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  getMyApprovalsListData: PropTypes.func,
  myApprovalsListState: PropTypes.object,
  updateApprovalsListSearchTerm: PropTypes.func,
  requestToApprove: PropTypes.func,
  requestToReject: PropTypes.func,
  getMyApprovalsListDataLoadMore: PropTypes.func,
  getApprovalStatus: PropTypes.func,
  getApprovalStatusTooltip: PropTypes.func,
  getActionLabel: PropTypes.func,
  translatedStrings: PropTypes.object,
  tableColumns: PropTypes.object,
  approvalsListString: PropTypes.string,
  consumer: PropTypes.string,
};

export default ApprovalsList;
