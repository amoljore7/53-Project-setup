import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import * as yup from 'yup';
import AddSecretInputForm from './input/AddSecretInputForm';
import { classes, translatedStrings } from './constants';
import { staticSecretTemplateListAPI } from '../../../../../services/secret-manager-service';
import {
  secretType,
  description,
  parameters,
  passwordPolicyId,
  rotationInterval,
  isPasswordSelected as isPasswordSelectedValidation,
} from '../common-validation';
import './AddStaticSecretTemplate.scss';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../utils/common-constants';
import { getPwdPolicyID, getFieldMassagedData } from '../common-utils';
import SnackbarFormError from '../../../../../components/snackbar';

const AddStaticSecretTemplate = ({
  setPageHeader,
  history,
  sstPostData,
  getPwdPoliciesList,
  pwdPoliciesList,
  openNotification,
  sstAddFormError,
  sstAddStatus,
  spinnerOverlay,
  resetAddStaticSecretData,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const [isPasswordSelected, setIsPasswordSelected] = useState(false);

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    getPwdPoliciesList();
  }, []);

  useEffect(() => {
    spinnerOverlay({
      open: sstAddStatus === 'LOADING',
      size: 'medium',
    });
  }, [sstAddStatus]);

  const validationSchema = yup.object({
    secretType: secretType.test(
      name,
      translatedStrings.nameValidationExit,
      async (value, context) => {
        const contextField = context?.options?.context;
        if ((contextField === 'secretType' || contextField === 'all') && value !== '') {
          setNameFilterLoading(true);
          try {
            const response = await staticSecretTemplateListAPI({ filter: 'eq', search: value });
            setNameFilterLoading(false);
            return response?.result?.length === 0;
          } catch ({ response }) {
            const reason = response?.data?.message || '';
            setNameFilterLoading(false);
            openNotification(errorNotificationType, reason, errorNotificationDuration);
            return true;
          }
        } else {
          return true;
        }
      }
    ),
    description,
    parameters,
    passwordPolicyId,
    rotationInterval,
    isPasswordSelected: isPasswordSelectedValidation,
  });
  useEffect(() => {
    validationHook.handleChange(validationHook.names.isPasswordSelected, isPasswordSelected);
  }, [isPasswordSelected]);

  const validationHook = useValidation({
    initialValues: {
      secretType: '',
      description: '',
      rotationInterval: null,
      passwordPolicyId: '',
      parameters: [],
      isPasswordSelected: isPasswordSelected,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      delete values.isPasswordSelected;
      const payloadData = {
        ...values,
        rotationInterval: Number(values.rotationInterval),
        passwordPolicyId: getPwdPolicyID(values.passwordPolicyId, pwdPoliciesList),
        parameters: getFieldMassagedData(values.parameters),
        secretType: values?.secretType.trim(),
      };
      sstPostData(JSON.stringify(payloadData), history);
    },
  });

  const getSaveCancelBtn = () => {
    return (
      <div className={classes.sstLeftAction}>
        <div className={classes.sstSaveBtn}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              validationHook.handleSubmit();
            }}
          >
            {translatedStrings.saveBtn}
          </Button>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setShowCancelDialog(true)}>
          {translatedStrings.cancelBtn}
        </Button>
      </div>
    );
  };

  const addButtonHeader = () => {
    return <div className={classes.sstActionContainer}>{getSaveCancelBtn()}</div>;
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.yesDiscard}
        secondaryButtonText={translatedStrings.noLabel}
        onSubmit={() => {
          !isEmpty(sstAddFormError);
          setShowCancelDialog(false);
          resetAddStaticSecretData();
          history.goBack();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  return (
    <>
      {addButtonHeader()}
      <SnackbarFormError
        title={translatedStrings.formError}
        errorList={sstAddFormError?.split('|')?.map((message) => `- ${message}`)}
        hasError={!isEmpty(sstAddFormError)}
      />
      <AddSecretInputForm
        pwdPoliciesList={pwdPoliciesList}
        openNotification={openNotification}
        nameFilterLoading={nameFilterLoading}
        validationHook={validationHook}
        isPasswordSelected={isPasswordSelected}
        setIsPasswordSelected={setIsPasswordSelected}
        sstFormError={sstAddFormError}
      />

      {showCancelDialog && getCancelDialog()}
    </>
  );
};

AddStaticSecretTemplate.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  sstPostData: PropTypes.func,
  getPwdPoliciesList: PropTypes.func,
  pwdPoliciesList: PropTypes.object,
  openNotification: PropTypes.func,
  sstAddFormError: PropTypes.object,
  sstAddStatus: PropTypes.any,
  spinnerOverlay: PropTypes.func,
  resetAddStaticSecretData: PropTypes.func,
};

export default AddStaticSecretTemplate;
