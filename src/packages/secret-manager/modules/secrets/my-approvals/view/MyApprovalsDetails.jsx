import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getApprovalsDetailsById, approveRequest, rejectRequest } from './action';
import { getSecretStatus } from '../../../../../my-secrets/modules/secrets/utils';
import ApprovalsView from '../../../../../../components/approvals/view/ApprovalsView';
import { classes, buttonType, translatedStrings, statusLabel } from './constants';

import './MyApprovalsDetails.scss';
import { getActionLabel } from '../../utils';
import { translate } from '../../../../externalization';

const MyApprovalsDetails = ({ history }) => {
  const approvalsDetails = useSelector((state) => state?.secretsReducer?.myApprovalsDetails);
  const cancelHandler = () => {
    history.push('/admin/secret-manager/vault/secrets/my-approvals');
  };

  return (
    <ApprovalsView
      history={history}
      approvalsDetails={approvalsDetails}
      getSecretStatus={getSecretStatus}
      getActionLabel={getActionLabel}
      translate={translate}
      translatedStrings={translatedStrings}
      cancelHandler={cancelHandler}
      getApprovalsDetailsById={getApprovalsDetailsById}
      approveRequest={approveRequest}
      rejectRequest={rejectRequest}
      classes={classes}
      buttonType={buttonType}
      statusLabel={statusLabel}
    />
  );
};

MyApprovalsDetails.propTypes = {
  history: PropTypes.any,
};
export default MyApprovalsDetails;
