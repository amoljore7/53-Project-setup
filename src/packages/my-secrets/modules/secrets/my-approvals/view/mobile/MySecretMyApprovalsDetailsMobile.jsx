import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'britive-design-system/core/components/button';
import Typography from 'britive-design-system/core/components/typography';
import {
  setPageHeader,
  getApprovalsDetailsById,
  detailsApproveRequest,
  detailsRejectRequest,
} from '../action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import { approveRejectBy } from '../../../../../../../components/approvals/approveRejectBy';
import { approveRejectExpiredDate } from '../../../../../../../components/approvals/approveRejectExpiredDate';
import {
  classes,
  translatedStrings,
  status,
  statusLabel,
  YES_PARAM,
  buttonType,
  NO_PARAM,
  classesMobile,
} from '../constants';
import { convertTimeToCurrentTimezone } from '../../../../../../../utils/common-utils';
import '../MySecretMyApprovalsDetails.scss';
import { getSecretStatus, getActionLabel } from '../../../utils';
import { isEmpty, lowerFirst } from 'lodash';
import { translate } from '../../../../../externalization';

const MySecretMyApprovalsDetailsMobile = ({ history }) => {
  const dispatch = useDispatch();
  const approvalsDetails = useSelector(
    (state) => state.userSecretsReducer?.myApprovalsReducer?.myApprovalsDetails
  );

  const [userName, setUsername] = useState('');
  const { id: approvalId } = useParams();
  const [actionName, setActionName] = useState('');

  useEffect(() => {
    dispatch(getApprovalsDetailsById(approvalId));
  }, []);

  useEffect(() => {
    dispatch(
      setPageHeader(
        `${userName || translatedStrings.noneValue} requested access to 
        ${lowerFirst(getActionLabel(approvalsDetails?.data?.action))} at ${
          approvalsDetails?.data?.resource
        }`,
        []
      )
    );
    setActionName(getActionLabel(approvalsDetails?.data?.action));
  }, [approvalsDetails?.data?.action, userName]);

  useEffect(() => {
    dispatch(
      initSpinnerOverlay({
        open: approvalsDetails?.loading,
        size: 'medium',
        message: translatedStrings.fetchingApprovals,
      })
    );
  }, [approvalsDetails?.loading]);

  useEffect(() => {
    setUsername(approvalsDetails?.data?.userId);
  }, [approvalsDetails?.data?.userId]);

  const statusMsg = (label) => {
    return (
      <>
        <Typography variant="label2">{label}</Typography>
      </>
    );
  };

  const myApprovalsDetails = () => {
    return (
      <div className={classes.approvalsDetailsForm}>
        <div className={`${classes?.marginTop8} ${classes?.detailsLabel}`}>
          <Typography variant="label2">DETAILS</Typography>
        </div>

        {approvalsDetails?.data?.status === status.TIMEOUT && statusMsg(statusLabel.expired)}
        {approvalsDetails?.data?.status === status.APPROVED &&
          statusMsg(
            translate('MY_APPROVALS_AND_REQUEST_MODULE.MESSAGE_APPROVED', {
              userName: approvalsDetails?.data?.actionBy,
            })
          )}
        {approvalsDetails?.data?.status === status.REJECTED &&
          statusMsg(
            translate('MY_APPROVALS_AND_REQUEST_MODULE.MESSAGE_REJECTED', {
              userName: approvalsDetails?.data?.actionBy,
            })
          )}

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.requestDate} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">
              {convertTimeToCurrentTimezone(approvalsDetails?.data?.createdAt) ||
                translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.resource} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">
              {approvalsDetails?.data?.resource || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.actionType} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">{actionName || translatedStrings.noneValue}</Typography>
          </div>
        </div>

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.requestedBy} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">{userName || translatedStrings.noneValue}</Typography>
          </div>
        </div>

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.justification} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">
              {approvalsDetails?.data?.justification || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop20}>
          <Typography variant="label2"> {translatedStrings.approvalStatus} </Typography>
          <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
            <Typography variant="label1">
              {getSecretStatus(approvalsDetails?.data?.status) || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        {approvalsDetails?.data?.status === status.APPROVED &&
          approveRejectBy(
            translatedStrings.approvedBy,
            approvalsDetails?.data?.actionBy,
            classes.marginTop20,
            `${classes?.marginTop8} ${classesMobile.detailsTextIndent}`
          )}
        {approvalsDetails?.data?.status === status.REJECTED &&
          approveRejectBy(
            translatedStrings.rejectedBy,
            approvalsDetails?.data?.actionBy,
            classes.marginTop20,
            `${classes.marginTop8} ${classesMobile.detailsTextIndent}`
          )}

        {approvalsDetails?.data?.status === status.APPROVED &&
          approveRejectExpiredDate(
            translatedStrings.approvedOn,
            convertTimeToCurrentTimezone(approvalsDetails?.data?.updatedAt),
            classes.marginTop20,
            `${classes.marginTop8} ${classesMobile.detailsTextIndent}`
          )}
        {approvalsDetails?.data?.status === status.REJECTED &&
          approveRejectExpiredDate(
            translatedStrings.rejectedOn,
            convertTimeToCurrentTimezone(approvalsDetails?.data?.updatedAt),
            classes.marginTop20,
            `${classes.marginTop8} ${classesMobile.detailsTextIndent}`
          )}
        {approvalsDetails?.data?.status === status.TIMEOUT &&
          approveRejectExpiredDate(
            translatedStrings.expiredOn,
            convertTimeToCurrentTimezone(approvalsDetails?.data?.expirationTimeForApproveRequest),
            classes.marginTop20,
            `${classes.marginTop8} ${classesMobile.detailsTextIndent}`
          )}

        {approvalsDetails?.data?.status !== status.TIMEOUT &&
          approvalsDetails?.data?.status !== status.PENDING && (
            <div className={classes?.marginTop20}>
              <Typography variant="label2"> {translatedStrings.comments} </Typography>
              <div className={`${classes?.marginTop8} ${classesMobile.detailsTextIndent}`}>
                <Typography variant="label1">
                  {approvalsDetails?.data?.approverComment || translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
          )}

        <div className={classes.approvalsDetailsButton}>
          {approvalsDetails?.data?.status === status.PENDING && (
            <Button
              size="medium"
              onClick={() => {
                dispatch(
                  detailsApproveRequest(
                    approvalId,
                    YES_PARAM,
                    history,
                    '',
                    false,
                    '/my-secrets/my-approvals/acknowledge/approved'
                  )
                );
              }}
            >
              {buttonType.approve}
            </Button>
          )}
          {approvalsDetails?.data?.status === status.PENDING && (
            <div className={classes.cancelBtn}>
              <Button
                size="medium"
                variant="secondary"
                onClick={() => {
                  dispatch(
                    detailsRejectRequest(
                      approvalId,
                      NO_PARAM,
                      history,
                      '',
                      false,
                      '/my-secrets/my-approvals/acknowledge/rejected'
                    )
                  );
                }}
              >
                {buttonType.reject}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <>{!isEmpty(approvalsDetails.data) && myApprovalsDetails()}</>;
};

MySecretMyApprovalsDetailsMobile.propTypes = {
  history: PropTypes.any,
  setPageHeader: PropTypes.func,
  getApprovalsDetailsById: PropTypes.func,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersLoading: PropTypes.bool,
};
export default MySecretMyApprovalsDetailsMobile;
