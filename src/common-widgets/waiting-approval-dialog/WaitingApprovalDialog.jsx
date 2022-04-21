import React from 'react';
import PropTypes from 'prop-types';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Typography from 'britive-design-system/core/components/typography';
import { classes, adminSecretListConstants } from './constants';
import './WaitingApprovalDialog.scss';

const WaitingApprovalDialog = ({
  handleWaitingApprovalDialog,
  translatedStringsForWaitingApproval,
}) => {
  return (
    <DialogPopup
      type={adminSecretListConstants.alertText}
      title={translatedStringsForWaitingApproval.waitingApprovalDialogTitle}
      message={translatedStringsForWaitingApproval.approvalDialogMessage}
      primaryButtonText={translatedStringsForWaitingApproval.waitingApprovalDialogPrimaryButton}
      onSubmit={() => {
        handleWaitingApprovalDialog(false);
      }}
      height={adminSecretListConstants.height}
      onCancel={() => handleWaitingApprovalDialog(false)}
    >
      <Typography variant="label1">{translatedStringsForWaitingApproval.notifiedText}</Typography>
      <div className={classes.fieldSpacing}>
        <Typography variant="label1"> {translatedStringsForWaitingApproval.trackText} </Typography>
      </div>
    </DialogPopup>
  );
};

WaitingApprovalDialog.propTypes = {
  handleWaitingApprovalDialog: PropTypes.func,
  translatedStringsForWaitingApproval: PropTypes.any,
};

export default WaitingApprovalDialog;
