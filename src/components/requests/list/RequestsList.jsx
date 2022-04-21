import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../data-table/DataTable';
import BackToTop from 'britive-design-system/core/components/backToTop';
import {
  classes,
  myRequestsTableTestId,
  backToTopId,
  adminRequestsListString,
} from './constants';
import './RequestsList.scss';
import { isEmpty } from 'lodash';
import { sortApprovalsAndRequestByDate } from '../../../components/approvals/utils';
import { convertTimeToCurrentTimezone } from '../../../utils/common-utils';

const RequestsList = ({
  getMyRequestsListData,
  myRequestsListState,
  updateRequestsListSearchTerm,
  getMyRequestsListDataLoadMore,
  translatedStrings,
  getApprovalStatus,
  getActionLabel,
  tableColumns,
  requestsListString,
}) => {
  const [myRequestsList, setMyRequestsList] = useState([]);
  const { loading, result, pagination } = myRequestsListState;
  const tableContainer = useRef(null);

  // TODO: Uncomment once searching is supported by the API
  // const handleRequestSearch = useCallback(
  //   debounce(
  //     (nextValue) => {
  //       updateRequestsListSearchTerm(nextValue);
  //       /* To make get all call for empty search value */
  //       !nextValue && getMyRequestsListData();
  //     },
  //     searchDebounceTime,
  //     []
  //   )
  // );

  useEffect(() => {
    getMyRequestsListData();
    updateRequestsListSearchTerm('');
  }, []);

  useEffect(() => {
    if (myRequestsListState?.searchTerm) {
      getMyRequestsListData();
    }
  }, [myRequestsListState?.searchTerm]);

  useEffect(() => {
    if (!isEmpty(result)) {
      const requests =
        result &&
        result.map((request) => ({
          requestId: request?.requestId || translatedStrings.noneValue,
          createdAt:
            convertTimeToCurrentTimezone(request?.createdAt) || translatedStrings.noneValue,
          userId: request?.userId || translatedStrings.noneValue,
          action: getActionLabel(request?.action) || translatedStrings.noneValue,
          resource: request?.resourceName || request?.resourceName || translatedStrings.noneValue,
          status: getApprovalStatus(request?.status) || translatedStrings.noneValue,
          justification: request?.justification || translatedStrings.noneValue,
          approvers:
            getUserAndTags(request?.approvers?.userIds, request?.approvers?.tags).join(', ') ||
            translatedStrings.noneValue,
        }));
      setMyRequestsList(sortApprovalsAndRequestByDate(requests));
    }
  }, [result]);

  const getUserAndTags = (users, tags) => {
    const userAndTagNames = (users || []).concat(tags || []);
    return userAndTagNames;
  };

  const columns = [
    {
      field: 'createdAt',
      headerName: tableColumns.requestedOn,
      width: '15%',
      sortable: true,
      isDate: true,
    },
    {
      field: 'action',
      headerName: tableColumns.actionType,
      width: '15%',
      sortable: true,
    },
    {
      field: 'resource',
      headerName: tableColumns.resource,
      width: '25%',
      sortable: true,
    },
    {
      field: 'justification',
      headerName: tableColumns.justification,
      width: '20%',
    },
    {
      field: 'approvers',
      headerName: tableColumns.approvers,
      width: '15%',
      sortable: true,
    },
    {
      field: 'status',
      headerName: tableColumns.approvalStatus,
      width: '172px',
      sortable: true,
    },
  ];

  const loadMoreHandler = () => {
    getMyRequestsListDataLoadMore();
  };

  const findHeight = () =>
    requestsListString === adminRequestsListString ? 'calc(100vh - 200px)' : 'calc(100vh - 173px)';

  return (
    <>
      <div className={classes.listContainer} style={{ height: findHeight() }} ref={tableContainer}>
        <div data-testid={myRequestsTableTestId} className={classes.tableContainer}>
          <DataTable
            inLineSort={true}
            rows={myRequestsList}
            columns={columns}
            loading={loading}
            loadingMessage={translatedStrings.loadingMessage}
            loadMoreHandler={loadMoreHandler}
            loadMore={!loading && Boolean(pagination?.next)}
            // TODO: Uncomment once searching is supported by the API
            // searchBar={{
            //   onSearch: handleRequestSearch,
            //   placeholder: translatedStrings.myRequestsSearchText,
            //   isDisabled: true,
            // }}
          />
        </div>
      </div>
      <BackToTop id={backToTopId} parentRef={tableContainer} />
    </>
  );
};

RequestsList.propTypes = {
  setPageHeader: PropTypes.func,
  getMyRequestsListData: PropTypes.func,
  myRequestsListState: PropTypes.object,
  updateRequestsListSearchTerm: PropTypes.func,
  getMyRequestsListDataLoadMore: PropTypes.func,
  translatedStrings: PropTypes.object,
  getApprovalStatus: PropTypes.func,
  getActionLabel: PropTypes.func,
  tableColumns: PropTypes.object,
  requestsListString: PropTypes.string,
};

export default RequestsList;
