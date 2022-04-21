import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pageTitle, routeToNameList, tableColumns, translatedStrings } from './constants';
import RequestsList from '../../../../../../components/requests/list/RequestsList';
import { getApprovalStatus, getActionLabel } from '../../utils';
import { adminRequestsListString } from '../../../../../../components/requests/list/constants';
const MyRequestList = ({
  setPageHeader,
  getMyRequestsListData,
  myRequestsListState,
  updateRequestsListSearchTerm,
  getMyRequestsListDataLoadMore,
}) => {
  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  return (
    <RequestsList
      setPageHeader={setPageHeader}
      getMyRequestsListData={getMyRequestsListData}
      myRequestsListState={myRequestsListState}
      updateRequestsListSearchTerm={updateRequestsListSearchTerm}
      getMyRequestsListDataLoadMore={getMyRequestsListDataLoadMore}
      translatedStrings={translatedStrings}
      getApprovalStatus={getApprovalStatus}
      getActionLabel={getActionLabel}
      tableColumns={tableColumns}
      requestsListString={adminRequestsListString}
    />
  );
};

MyRequestList.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  getMyRequestsListData: PropTypes.func,
  myRequestsListState: PropTypes.object,
  updateRequestsListSearchTerm: PropTypes.func,
  getMyRequestsListDataLoadMore: PropTypes.func,
};

export default MyRequestList;
