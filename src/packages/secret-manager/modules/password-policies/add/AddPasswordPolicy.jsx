import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
} from './constants';
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
import PasswordPolicyForm from '../form/PasswordPolicyForm';

import './AddPasswordPolicy.scss';

const AddPasswordPolicy = ({
  setPageHeader,
  history,
  postPasswordPolicyData,
  resetPasswordPolicyData,
  addPasswordPolicyError,
  addPasswordPolicyStatus,
  initSpinnerOverlay,
  openNotification,
}) => {
  const [passwordPolicyFilterLoading, setPasswordPolicyFilterLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const addPasswordPolicyValidationSchema = yup.object({
    name: name.test(
      name,
      translatedStrings.passwordPolicyNameExistValidation,
      async (value, context) => {
        const contextField = context?.options?.context;
        if ((contextField === 'name' || contextField === 'all') && value !== '') {
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

  const addPasswordPolicyValidation = useValidation({
    initialValues: {
      name: '',
      description: '',
      passwordType: alphanumericType,
      pinLength: null,
      minPasswordLength: 8,
      hasUpperCaseChars: true,
      hasLowerCaseChars: true,
      hasNumbers: true,
      hasSpecialChars: true,
      allowedSpecialChars: allowedSpecialCharsList,
    },
    validationSchema: addPasswordPolicyValidationSchema,
    onSubmit: (values) => {
      const payloadData = getPayloadBody(values);
      postPasswordPolicyData(payloadData, history);
    },
  });

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
  });

  useEffect(() => {
    initSpinnerOverlay({
      open: addPasswordPolicyStatus === RESOURCE_STATUS.LOADING,
      size: 'medium',
    });
  }, [addPasswordPolicyStatus]);

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
        ...(hasSpecialChars && { allowedSpecialChars: allowedSpecialChars.trim() }),
      };
    }
  };

  const addPasswordPolicyHeader = () => {
    return (
      <div className={classes.passwordPolicyActionContainer}>
        <div className={classes.passwordPolicySaveButton}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              addPasswordPolicyValidation.handleSubmit();
            }}
          >
            {translatedStrings.saveButton}
          </Button>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setShowCancelDialog(true)}>
          {translatedStrings.cancelButton}
        </Button>
      </div>
    );
  };

  const cancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.cancelDialogPrimaryButton}
        secondaryButtonText={translatedStrings.noButton}
        onSubmit={() => {
          setShowCancelDialog(false);
          history.goBack();
          resetPasswordPolicyData();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const addPasswordPolicyErrorSnackbar = () => {
    return (
      <div data-testid="password-policy-error" className={classes.passwordPolicyErrorSnackbar}>
        <Snackbar
          title={translatedStrings.errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={addPasswordPolicyError?.message?.split('|')?.map((msg) => `- ${msg}`)}
        />
      </div>
    );
  };

  return (
    <>
      {addPasswordPolicyHeader()}
      {!isEmpty(addPasswordPolicyError) && addPasswordPolicyErrorSnackbar()}
      <PasswordPolicyForm
        passwordPolicyValidation={addPasswordPolicyValidation}
        passwordPolicyFilterLoading={passwordPolicyFilterLoading}
        formError={addPasswordPolicyError?.message}
      />
      {showCancelDialog && cancelDialog()}
    </>
  );
};

AddPasswordPolicy.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.object,
  postPasswordPolicyData: PropTypes.func,
  resetPasswordPolicyData: PropTypes.func,
  addPasswordPolicyStatus: PropTypes.oneOf(typeOfStatus),
  addPasswordPolicyError: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  openNotification: PropTypes.func,
};

export default AddPasswordPolicy;
