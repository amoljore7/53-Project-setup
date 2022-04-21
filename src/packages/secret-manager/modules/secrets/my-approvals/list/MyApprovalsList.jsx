import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ApprovalsList from '../../../../../../components/approvals/list/ApprovalsList';
import { pageTitle, routeToNameList, translatedStrings, tableColumns } from './constants';
import { getApprovalStatus, getApprovalsActionTooltip, getActionLabel } from '../../utils';
import { adminApprovalsListString } from '../../../../../../components/approvals/list/constants';

const MyApprovalsList = ({
  setPageHeader,
  history,
  match,
  getMyApprovalsListData,
  myApprovalsListState,
  updateApprovalsListSearchTerm,
  requestToApprove,
  requestToReject,
  getMyApprovalsListDataLoadMore,
}) => {
  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  return (
    <>
      <ApprovalsList
        history={history}
        match={match}
        getMyApprovalsListData={getMyApprovalsListData}
        myApprovalsListState={myApprovalsListState}
        updateApprovalsListSearchTerm={updateApprovalsListSearchTerm}
        requestToApprove={requestToApprove}
        requestToReject={requestToReject}
        getMyApprovalsListDataLoadMore={getMyApprovalsListDataLoadMore}
        getApprovalStatus={getApprovalStatus}
        getApprovalStatusTooltip={getApprovalsActionTooltip}
        getActionLabel={getActionLabel}
        translatedStrings={translatedStrings}
        tableColumns={tableColumns}
        approvalsListString={adminApprovalsListString}
      />
    </>
  );
};

MyApprovalsList.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  getMyApprovalsListData: PropTypes.func,
  myApprovalsListState: PropTypes.object,
  updateApprovalsListSearchTerm: PropTypes.func,
  requestToApprove: PropTypes.func,
  requestToReject: PropTypes.func,
  getMyApprovalsListDataLoadMore: PropTypes.func,
};

export default MyApprovalsList;
