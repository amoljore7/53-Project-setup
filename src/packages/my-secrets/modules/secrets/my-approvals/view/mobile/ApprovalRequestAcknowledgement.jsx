import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import Typography from 'britive-design-system/core/components/typography/typography';
import { mySecretMyApprovalPath } from '../../../../../../../utils/common-constants';
import { setPageHeader } from '../action';
import { classesMobile } from '../constants';
import './ApprovalRequestAcknowledgement.scss';

const ApprovalRequestAcknowledgement = ({ history }) => {
  const dispatch = useDispatch();
  const { status } = useParams();

  useEffect(() => {
    dispatch(setPageHeader('', []));
  }, []);

  return (
    <div className={classesMobile.approvalRequestSuccessContainer}>
      <div
        className={classesMobile.approvalRequestSeccessContent}
        onClick={() => {
          history.push(mySecretMyApprovalPath);
        }}
      >
        {status === 'approved' ?
          <span className={`${classesMobile.checkIcon} ${classesMobile.approved}`}><BsCheckCircle /></span> : null}
        {status === 'rejected' ?
          <span className={`${classesMobile.checkIcon} ${classesMobile.rejected}`}><BsXCircle /></span> : null}
        <span className={classesMobile.successMessage}>
          <Typography variant="label2">Request is {capitalize(status)}</Typography>
        </span>
      </div>
    </div>
  );
};

ApprovalRequestAcknowledgement.propTypes = {
  history: PropTypes.any,
  status: PropTypes.string,
};

export default ApprovalRequestAcknowledgement;
