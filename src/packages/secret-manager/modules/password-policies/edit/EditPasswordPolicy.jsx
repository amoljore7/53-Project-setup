import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import { FiAlertCircle } from 'react-icons/fi';
import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import ApiServices from '../../../../../utils/api-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  RESOURCE_STATUS,
  typeOfStatus,
} from '../../../../../utils/common-constants';
import {
  allowedSpecialCharsList,
  alphanumericType,
  classes,
  pinType,
  translatedStrings,
} from '../add/constants';
import {
  name,
  description,
  passwordType,
  pinLength,
  minPasswordLengthValidation,
  hasUpperCaseChars,
  hasLowerCaseChars,
  hasNumbers,
  hasSpecialChars,
  allowedSpecialChars,
} from '../common-validation';
import { resetNotificationTime, translatedStrings as translatedEditStrings } from './constants';
import PasswordPolicyForm from '../form/PasswordPolicyForm';

const EditPasswordPolicy = ({
  setPageHeader,
  history,
  initSpinnerOverlay,
  getPasswordPolicyById,
  passwordPolicyDataLoading,
  passwordPolicyData,
  openNotification,
  editPasswordPolicyData,
  resetEditPasswordPolicyData,
  editPasswordPolicyStatus,
  editPasswordPolicyError,
}) => {
  const [passwordPolicyFilterLoading, setPasswordPolicyFilterLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { id: passwordPolicyId } = useParams();

  const editPasswordPolicyValidationSchema = yup.object({
    name: name.test(
      name,
      translatedStrings.passwordPolicyNameExistValidation,
      async (value, context) => {
        const contextField = context?.options?.context;
        if (
          (contextField === 'name' || contextField === 'all') &&
          value !== '' &&
          editPasswordPolicyValidation.values.name !== passwordPolicyData.name
        ) {
          setPasswordPolicyFilterLoading(true);
          try {
            const response = await ApiServices.get(
              `api/v1/secretmanager/pwdpolicies?filter=name%20eq%20'${value}'`
            );
            setPasswordPolicyFilterLoading(false);
            return response?.data?.result?.length === 0;
          } catch ({ response }) {
            const reason = response?.data?.message || '';
            setPasswordPolicyFilterLoading(false);
            openNotification(errorNotificationType, reason, errorNotificationDuration);
            return true;
          }
        } else {
          return true;
        }
      }
    ),
    description,
    passwordType,
    pinLength,
    minPasswordLength: minPasswordLengthValidation,
    hasUpperCaseChars,
    hasLowerCaseChars,
    hasNumbers,
    hasSpecialChars,
    allowedSpecialChars,
  });

  const editPasswordPolicyValidation = useValidation({
    initialValues: {
      name: '',
      description: '',
      passwordType: alphanumericType,
      pinLength: null,
      minPasswordLength: null,
      hasUpperCaseChars: true,
      hasLowerCaseChars: true,
      hasNumbers: true,
      hasSpecialChars: true,
      allowedSpecialChars: allowedSpecialCharsList,
    },
    validationSchema: editPasswordPolicyValidationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    setPageHeader(translatedEditStrings.pageTitle, []);
    getPasswordPolicyById(passwordPolicyId, history);
  }, []);

  useEffect(() => {
    if (!isEmpty(passwordPolicyData)) {
      editPasswordPolicyValidation.resetValues({ ...passwordPolicyData });
    }
  }, [passwordPolicyData]);

  useEffect(() => {
    initSpinnerOverlay({
      open: passwordPolicyDataLoading || editPasswordPolicyStatus === RESOURCE_STATUS.LOADING,
      size: 'medium',
    });
  }, [passwordPolicyDataLoading, editPasswordPolicyStatus]);

  const editPasswordPolicyHeader = () => {
    return (
      <div className={classes.passwordPolicyActionContainer}>
        <div className={classes.passwordPolicySaveButton}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              if (editPasswordPolicyValidation.isValid()) {
                setShowSaveDialog(true);
              } else {
                editPasswordPolicyValidation.handleSubmit();
              }
            }}
          >
            {translatedStrings.saveButton}
          </Button>
        </div>
        <div className={classes.passwordPolicySaveButton}>
          <Button variant="secondary" size="medium" onClick={() => setShowResetDialog(true)}>
            {translatedEditStrings.resetButton}
          </Button>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setShowCancelDialog(true)}>
          {translatedStrings.cancelButton}
        </Button>
      </div>
    );
  };

  const handleCancelSubmit = () => {
    !isEmpty(editPasswordPolicyError) && resetEditPasswordPolicyData();
    setShowCancelDialog(false);
    history.push('/admin/secret-manager/password-policies');
  };

  const cancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.cancelDialogPrimaryButton}
        secondaryButtonText={translatedStrings.noButton}
        onSubmit={handleCancelSubmit}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const handleResetSubmit = () => {
    editPasswordPolicyValidation.resetForm();
    !isEmpty(editPasswordPolicyError) && resetEditPasswordPolicyData();
    getPasswordPolicyById(passwordPolicyId, history);
    openNotification(
      'success',
      translatedEditStrings.resetNotificationMessage,
      resetNotificationTime
    );
    setShowResetDialog(false);
  };

  const resetDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedEditStrings.resetDialogTitle}
        message={translatedEditStrings.resetDialogMessage}
        primaryButtonText={translatedEditStrings.resetDialogPrimaryButton}
        secondaryButtonText={translatedEditStrings.resetDialogSecondaryButton}
        onSubmit={handleResetSubmit}
        onCancel={() => setShowResetDialog(false)}
      />
    );
  };

  const getPayloadBody = (formValues) => {
    const {
      name,
      description,
      passwordType,
      pinLength,
      minPasswordLength,
      hasUpperCaseChars,
      hasLowerCaseChars,
      hasNumbers,
      hasSpecialChars,
      allowedSpecialChars,
    } = formValues;

    if (passwordType === pinType) {
      return {
        name: name.trim(),
        description,
        passwordType,
        pinLength: Number(pinLength),
      };
    } else {
      return {
        name: name.trim(),
        description,
        passwordType,
        minPasswordLength: Number(minPasswordLength),
        hasUpperCaseChars,
        hasLowerCaseChars,
        hasNumbers,
        hasSpecialChars,
        ...(hasSpecialChars && { allowedSpecialChars }),
      };
    }
  };

  const handleSaveSubmit = () => {
    const payloadData = getPayloadBody(editPasswordPolicyValidation.values);
    editPasswordPolicyData(passwordPolicyId, payloadData, history);
    setShowSaveDialog(false);
  };

  const saveDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedEditStrings.saveDialogTitle}
        message={translatedEditStrings.saveDialogMessage}
        primaryButtonText={translatedEditStrings.saveDialogPrimaryButton}
        secondaryButtonText={translatedEditStrings.saveDialogSecondaryButton}
        onSubmit={handleSaveSubmit}
        onCancel={() => setShowSaveDialog(false)}
      />
    );
  };

  const editPasswordPolicyErrorSnackbar = () => {
    return (
      <div data-testid="password-policy-error" className={classes.passwordPolicyErrorSnackbar}>
        <Snackbar
          title={translatedStrings.errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={editPasswordPolicyError?.message?.split('|')?.map((msg) => `- ${msg}`)}
        />
      </div>
    );
  };

  return (
    <>
      {editPasswordPolicyHeader()}
      {!isEmpty(editPasswordPolicyError) && editPasswordPolicyErrorSnackbar()}
      <PasswordPolicyForm
        passwordPolicyValidation={editPasswordPolicyValidation}
        passwordPolicyFilterLoading={passwordPolicyFilterLoading}
        isEdit={true}
        formError={editPasswordPolicyError?.message}
      />
      {showCancelDialog && cancelDialog()}
      {showResetDialog && resetDialog()}
      {showSaveDialog && saveDialog()}
    </>
  );
};

EditPasswordPolicy.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.object,
  addPasswordPolicyStatus: PropTypes.oneOf(typeOfStatus),
  addPasswordPolicyError: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  getPasswordPolicyById: PropTypes.func,
  passwordPolicyDataLoading: PropTypes.bool,
  passwordPolicyData: PropTypes.object,
  openNotification: PropTypes.func,
  editPasswordPolicyData: PropTypes.func,
  resetEditPasswordPolicyData: PropTypes.func,
  editPasswordPolicyStatus: PropTypes.oneOf(typeOfStatus),
  editPasswordPolicyError: PropTypes.object,
};

export default EditPasswordPolicy;
