/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'britive-design-system/core/components/button';
import Typography from 'britive-design-system/core/components/typography';
import DialogPopup from 'britive-design-system/core/components/dialog';
import TextField from 'britive-design-system/core/components/textfield';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import { setPageHeaderAction as setPageHeader } from '../../page-header/action';
import { approveRejectBy } from '../approveRejectBy';
import { approveRejectExpiredDate } from '../approveRejectExpiredDate';
import { YES_PARAM, NO_PARAM, status } from './constants';
import { mediumHeightDialogPopUp } from '../../../utils/common-constants';
import { convertTimeToCurrentTimezone } from '../../../utils/common-utils';
import { isEmpty } from 'lodash';

const ApprovalsView = ({
  history,
  approvalsDetails,
  getSecretStatus,
  getActionLabel,
  translate,
  translatedStrings,
  cancelHandler,
  getApprovalsDetailsById,
  approveRequest,
  rejectRequest,
  classes,
  buttonType,
  statusLabel,
  id,
  redirectPath,
}) => {
  const dispatch = useDispatch();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [userName, setUsername] = useState('');
  const [actionName, setActionName] = useState('');
  const [commandText, setCommandText] = useState('');

  let approvalId = id || useParams().id;

  useEffect(() => {
    dispatch(getApprovalsDetailsById(approvalId));
  }, []);

  useEffect(() => {
    dispatch(
      setPageHeader(
        `${translatedStrings.pageTitle} : ${getActionLabel(approvalsDetails?.data?.action) ?? ''}`,
        []
      )
    );
    setActionName(getActionLabel(approvalsDetails?.data?.action));
  }, [approvalsDetails?.data?.action]);

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

  const buttonHeader = () => {
    return (
      <>
        <div className={classes.approvalsDetailsButton}>
          {approvalsDetails?.data?.status === status.PENDING && (
            <>
              <Button
                size="medium"
                onClick={() => {
                  setShowApproveDialog(true);
                }}
              >
                {buttonType.approve}
              </Button>
              <div className={classes.cancelBtn}>
                <Button
                  size="medium"
                  variant="secondary"
                  onClick={() => {
                    setShowRejectDialog(true);
                  }}
                >
                  {buttonType.reject}
                </Button>
              </div>
            </>
          )}
          <Button
            size="medium"
            variant={approvalsDetails?.data?.status === status.PENDING ? 'secondary' : 'primary'}
            onClick={cancelHandler}
          >
            {buttonType.close}
          </Button>
        </div>
      </>
    );
  };

  const approveDialog = () => {
    return (
      <div>
        <DialogPopup
          type="alert"
          height={mediumHeightDialogPopUp}
          title={translatedStrings.approveRequestTitle}
          message={translate('SECRETS_MODULE.APPROVE_SECRET_ACTION_MSG', {
            actionName,
            userName,
            resource: approvalsDetails?.data?.resourceName || approvalsDetails?.data?.resource,
          })}
          primaryButtonText={translatedStrings.yesApprove}
          secondaryButtonText={translatedStrings.cancelLabel}
          onSubmit={() => {
            setShowApproveDialog(false);
            //Api call for Approve.
            dispatch(approveRequest(approvalId, YES_PARAM, history, commandText, true, redirectPath));
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
      </div>
    );
  };

  const rejectDialog = () => {
    return (
      <div>
        <DialogPopup
          type="alert"
          height={mediumHeightDialogPopUp}
          title={translatedStrings.rejectRequestTitle}
          message={translate('SECRETS_MODULE.REJECT_SECRET_ACTION_MSG', {
            actionName,
            userName,
            resource: approvalsDetails?.data?.resourceName || approvalsDetails?.data?.resource,
          })}
          primaryButtonText={translatedStrings.yesReject}
          secondaryButtonText={translatedStrings.cancelLabel}
          onSubmit={() => {
            setShowRejectDialog(false);
            //Api call for Reject.
            dispatch(rejectRequest(approvalId, NO_PARAM, history, commandText, true, redirectPath));
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
      </div>
    );
  };
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
        {approvalsDetails?.data?.status === status.TIMEOUT &&
          (Boolean(approvalsDetails?.data?.actionBy)
            ? statusMsg(statusLabel.expiredAfterApproval)
            : statusMsg(statusLabel.expired))}
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

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.requestDate} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {convertTimeToCurrentTimezone(approvalsDetails?.data?.createdAt) ||
                translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.requestedBy} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">{userName || translatedStrings.noneValue}</Typography>
          </div>
        </div>

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.actionType} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">{actionName || translatedStrings.noneValue}</Typography>
          </div>
        </div>

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.resource} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {approvalsDetails?.data?.resourceName || approvalsDetails?.data?.resource || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.justification} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {approvalsDetails?.data?.justification || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.approvalStatus} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {getSecretStatus(approvalsDetails?.data?.status) || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>

        {approvalsDetails?.data?.status === status.APPROVED &&
          approveRejectBy(
            translatedStrings.approvedBy,
            approvalsDetails?.data?.actionBy,
            classes.marginTop32,
            classes.marginTop8
          )}
        {approvalsDetails?.data?.status === status.REJECTED &&
          approveRejectBy(
            translatedStrings.rejectedBy,
            approvalsDetails?.data?.actionBy,
            classes.marginTop32,
            classes.marginTop8
          )}

        {approvalsDetails?.data?.status === status.APPROVED &&
          approveRejectExpiredDate(
            translatedStrings.approvedOn,
            convertTimeToCurrentTimezone(approvalsDetails?.data?.updatedAt),
            classes.marginTop32,
            classes.marginTop8
          )}
        {approvalsDetails?.data?.status === status.REJECTED &&
          approveRejectExpiredDate(
            translatedStrings.rejectedOn,
            convertTimeToCurrentTimezone(approvalsDetails?.data?.updatedAt),
            classes.marginTop32,
            classes.marginTop8
          )}
        {approvalsDetails?.data?.status === status.TIMEOUT &&
          approveRejectExpiredDate(
            translatedStrings.expiredOn,
            convertTimeToCurrentTimezone(
              Boolean(approvalsDetails?.data?.actionBy)
                ? approvalsDetails?.data?.expirationTimeApproval
                : approvalsDetails?.data?.expirationTimeForApproveRequest
            ),
            classes.marginTop32,
            classes.marginTop8
          )}

        {approvalsDetails?.data?.status !== status.TIMEOUT &&
          approvalsDetails?.data?.status !== status.PENDING && (
            <div className={classes?.marginTop32}>
              <Typography variant="label2"> {translatedStrings.comments} </Typography>
              <div className={classes?.marginTop8}>
                <Typography variant="label1">
                  {approvalsDetails?.data?.approverComment || translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <>
      {!isEmpty(approvalsDetails?.data) && buttonHeader()}
      {!isEmpty(approvalsDetails?.data) && myApprovalsDetails()}
      {showApproveDialog && approveDialog()}
      {showRejectDialog && rejectDialog()}
    </>
  );
};

ApprovalsView.propTypes = {
  history: PropTypes.any,
  approvalsDetails: PropTypes.object,
  getSecretStatus: PropTypes.func.isRequired,
  getActionLabel: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  translatedStrings: PropTypes.object,
  cancelHandler: PropTypes.func.isRequired,
  getApprovalsDetailsById: PropTypes.func.isRequired,
  approveRequest: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  classes: PropTypes.object,
  buttonType: PropTypes.object,
  statusLabel: PropTypes.object,
  id: PropTypes.string,
  redirectPath: PropTypes.string,
};
export default ApprovalsView;
