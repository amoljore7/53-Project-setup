import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ApprovalsList from '../../../../../../components/approvals/list/ApprovalsList';
import { pageTitle, translatedStrings, tableColumns } from './constants';
import { getSecretStatus, getSecretStatusTooltip, getActionLabel } from '../../utils';
import { userApprovalsListString } from '../../../../../../components/approvals/list/constants';
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
  consumer,
}) => {
  useEffect(() => {
    setPageHeader(pageTitle, []);
  }, []);

  return (
    <ApprovalsList
      history={history}
      match={match}
      getMyApprovalsListData={getMyApprovalsListData}
      myApprovalsListState={myApprovalsListState}
      updateApprovalsListSearchTerm={updateApprovalsListSearchTerm}
      requestToApprove={requestToApprove}
      requestToReject={requestToReject}
      getMyApprovalsListDataLoadMore={getMyApprovalsListDataLoadMore}
      getApprovalStatus={getSecretStatus}
      getApprovalStatusTooltip={getSecretStatusTooltip}
      getActionLabel={getActionLabel}
      translatedStrings={translatedStrings}
      tableColumns={tableColumns}
      approvalsListString={userApprovalsListString}
      consumer={consumer}
    />
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
  consumer: PropTypes.string,
};

export default MyApprovalsList;
