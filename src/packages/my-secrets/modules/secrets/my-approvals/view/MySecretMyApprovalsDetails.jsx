import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getApprovalsDetailsById, detailsApproveRequest, detailsRejectRequest } from './action';
import ApprovalsView from '../../../../../../components/approvals/view/ApprovalsView';
import { classes, buttonType, translatedStrings, statusLabel } from './constants';
import { getSecretStatus, getActionLabel } from '../../utils';
import { translate } from '../../../../externalization';

const MyApprovalsDetails = ({ history, approvalId, redirectPath }) => {
  const approvalsDetails = useSelector(
    (state) => state.userSecretsReducer?.myApprovalsReducer?.myApprovalsDetails
  );
  const cancelHandler = () => {
    // Redirect to the page on Cancel button click.
    history.push(redirectPath || '/my-secrets/my-approvals');
  };

  return (
    <ApprovalsView
      id={approvalId}
      history={history}
      approvalsDetails={approvalsDetails}
      getSecretStatus={getSecretStatus}
      getActionLabel={getActionLabel}
      translate={translate}
      translatedStrings={translatedStrings}
      cancelHandler={cancelHandler}
      getApprovalsDetailsById={getApprovalsDetailsById}
      approveRequest={detailsApproveRequest}
      rejectRequest={detailsRejectRequest}
      classes={classes}
      buttonType={buttonType}
      statusLabel={statusLabel}
      redirectPath={redirectPath}
    />
  );
};

MyApprovalsDetails.propTypes = {
  history: PropTypes.any,
  approvalId: PropTypes.string,
  redirectPath: PropTypes.string,
};
export default MyApprovalsDetails;
