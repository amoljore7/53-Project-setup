import React, { useState, useEffect } from 'react';
import {
  approvalPageTitle,
  translatedStrings,
  approvalMessage,
  approvalLoadingMessage,
  classes,
} from '../constants';
import PropTypes from 'prop-types';
import { sortApprovalsAndRequestByDate } from '../../../../../../../components/approvals/utils';
import { capitalize } from 'lodash';
import NotificationCard from 'britive-design-system/core/components/notification-card';
import Spinner from 'britive-design-system/core/components/spinner';
import { translate } from '../../../../../externalization';
import './MySecretsMyApprovalsListMobileView.scss';
import { FaKey } from 'react-icons/fa';
import { convertTimeToCurrentTimezone } from '../../../../../../../utils/common-utils';

const MySecretsMyApprovalsListMobileView = ({
  getMyApprovalsListData,
  setPageHeader,
  fetchUsers,
  usersData,
  usersLoading,
  myApprovalsListState,
  match,
  history,
}) => {
  const [myApprovalsList, setMyApprovalsList] = useState([]);
  const { loading, result } = myApprovalsListState;

  useEffect(() => {
    setPageHeader(approvalPageTitle, []);
    fetchUsers();
    getMyApprovalsListData();
  }, []);

  useEffect(() => {
    const approvals = result?.map((approval) => ({
      requestId: approval?.requestId || translatedStrings.noneValue,
      createdAt: convertTimeToCurrentTimezone(approval?.createdAt) || translatedStrings.noneValue,
      userId: approval?.userId || translatedStrings.noneValue,
      action: approval?.action || translatedStrings.noneValue,
      resource: approval?.resource || translatedStrings.noneValue,
      status: approval?.status || translatedStrings.noneValue,
    }));
    setMyApprovalsList(sortApprovalsAndRequestByDate(approvals));
  }, [result, usersData]);

  return (
    <>
      {loading || usersLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner size={'medium'} message={approvalLoadingMessage} />
        </div>
      ) : (
        myApprovalsList?.map(({ requestId, createdAt, userId, action, resource, status }) => (
          <div key={requestId} className={classes.notificationContainer}>
            <NotificationCard
              loading={loading || usersLoading}
              loadingMessage="Loading Approvals"
              notificationTime={createdAt}
              notificationMessage={translate(approvalMessage, {
                userName: userId,
                accessType: action?.split('.')[2],
                secretName: resource,
              })}
              notificationTitle={
                <>
                  <FaKey /> Secrets Manager
                </>
              }
              primaryActionLabel={status === 'PENDING' ? 'Review' : 'View'}
              primaryActionHandler={() => {
                history.push(`${match.url}/my-approvals/view/${requestId}`);
              }}
              secondaryActionLabel={capitalize(status)}
              secondaryActionHandler={() => {
                history.push(`${match.url}/my-approvals/view/${requestId}`);
              }}
            />
          </div>
        ))
      )}
    </>
  );
};

MySecretsMyApprovalsListMobileView.propTypes = {
  setPageHeader: PropTypes.func,
  getMyApprovalsListData: PropTypes.func,
  myApprovalsListState: PropTypes.object,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersLoading: PropTypes.bool,
  match: PropTypes.any,
  history: PropTypes.any,
};

export default MySecretsMyApprovalsListMobileView;
