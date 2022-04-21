import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import Textarea from 'britive-design-system/core/components/textarea';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import * as yup from 'yup';
import useValidation from '../../components/use-validation-hook';
import {
  errorNotificationType,
  successNotificationType,
  errorNotificationDuration,
} from '../../utils/common-constants';
import { adminSecretListConstants, pendingSecretErrorCode_10, classes } from './constants';
import { initSpinnerOverlay } from '../../components/spinner-overlay/action';
import { openNotification } from '../../components/notification/action';
import { useDispatch } from 'react-redux';
import './ApprovalModal.scss';
import { 
  translatedStringsForApprovalsModal 
} from '../../packages/my-secrets/modules/secrets/all-secrets/secret-list/constants';

const ApprovalModal = ({
  approversDetails,
  entityName,
  onSubmit,
  onModalClose,
  action,
}) => {
  const { userIds: userNames, tags: groupNames } = approversDetails || {};

  useEffect(() => {
    const resetData = {
      justification: '',
    };
    requiredApprovalFormValidation.resetValues(resetData);
  }, []);
  const dispatch = useDispatch();

  const addRequiredApprovalFormValidationSchema = yup.object({
    justification: yup
      .string()
      .required(translatedStringsForApprovalsModal.justificationRequiredValidation)
      .max(
        adminSecretListConstants.maxJustificationChars,
        translatedStringsForApprovalsModal.justificationMaxLength
      ),
  });

  const requiredApprovalFormValidation = useValidation({
    initialValues: {
      justification: '',
    },
    validationSchema: addRequiredApprovalFormValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(
          initSpinnerOverlay({
            open: true,
            size: adminSecretListConstants.mediumSize,
            message: translatedStringsForApprovalsModal.sendingApprovalRequestMessage,
          })
        );
        await onSubmit(values);
        dispatch(
          initSpinnerOverlay({
            open: false,
          })
        );
      } catch ({ response }) {
        let reason = response?.data?.message || '';
        let pendingApprovalReason = '';
        const { data } = response;
        if (data?.errorCode === pendingSecretErrorCode_10) {
          onModalClose(true);
          pendingApprovalReason = translatedStringsForApprovalsModal.accessRequestSentMessage;
        }
        dispatch(
          openNotification(
            data?.errorCode === pendingSecretErrorCode_10
              ? successNotificationType
              : errorNotificationType,
            data?.errorCode === pendingSecretErrorCode_10 ? pendingApprovalReason : reason,
            true,
            errorNotificationDuration,
            action !== translatedStringsForApprovalsModal.viewAction
          )
        );
        dispatch(
          initSpinnerOverlay({
            open: false,
          })
        );
      }
    },
  });

  const requiredApprovalModalActionButtons = [
    {
      text: translatedStringsForApprovalsModal.sendRequestButton,
      variant: adminSecretListConstants.priVariant,
      onClick: () => {
        requiredApprovalFormValidation.handleSubmit();
      },
      size: adminSecretListConstants.largeSize,
    },
    {
      text: translatedStringsForApprovalsModal.cancelText,
      variant: adminSecretListConstants.secVariant,
      onClick: onModalClose,
      size: adminSecretListConstants.largeSize,
    },
  ];


  return (
    <>
      <ModalPopup
        width={512}
        title={`${entityName} (${action})`}
        buttons={requiredApprovalModalActionButtons}
        onCancel={onModalClose}
      >
        <div className={classes.secretApprovalLayout}>
          <div className={classes.secretApprovalSpacing}>
            <div className={classes.secretApprovalSpacing}>
              <Typography variant="label1">
                {translatedStringsForApprovalsModal.needApproval} {action.toLowerCase()}.
              </Typography>
            </div>
            {(userNames || groupNames) && (
              <div className={classes.secretApprovalLabel}>
                <Typography variant="label1">
                  {translatedStringsForApprovalsModal.approvalRequestSent}
                </Typography>
              </div>
            )}
            <div className={classes.secretApprovalSpacing}>
              {userNames &&
                userNames?.map((user) => {
                  return (
                    <div key={user} className={classes.secretApprovalLabel}>
                      <Typography variant="label1"> - {user} </Typography>
                    </div>
                  );
                })}
              {groupNames &&
                groupNames?.map((group) => {
                  return (
                    <div key={group} className={classes.secretApprovalLabel}>
                      <Typography variant="label1"> - {group} </Typography>
                    </div>
                  );
                })}
            </div>

            <div className={classes.secretApprovalSpacing}>
              <Textarea
                type="text"
                label={translatedStringsForApprovalsModal.justificationText}
                value={requiredApprovalFormValidation.values.justification}
                onChange={(e) => {
                  requiredApprovalFormValidation.handleChange(
                    requiredApprovalFormValidation.names.justification,
                    e.target.value
                  );
                }}
                onBlur={() => {
                  requiredApprovalFormValidation.handleBlur(
                    requiredApprovalFormValidation.names.justification
                  );
                }}
                error={
                  requiredApprovalFormValidation.touched.justification &&
                  Boolean(requiredApprovalFormValidation.errors.justification)
                }
                errorMsg={requiredApprovalFormValidation.errors.justification}
              />
            </div>
            <div className={classes.secretApprovalLabel}>
              <Typography variant="label1">
                {translatedStringsForApprovalsModal.notifiedText}
              </Typography>
            </div>
            <div className={classes.secretApprovalLabel}>
              <Typography variant="label1">
                {translatedStringsForApprovalsModal.trackText}
              </Typography>
            </div>
          </div>
        </div>
      </ModalPopup>
    </>
  );
};

ApprovalModal.propTypes = {
  entityName: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  approversDetails: PropTypes.object,
};

export default ApprovalModal;
