import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import {
  errorNotificationDuration,
  errorNotificationType,
  RESOURCE_STATUS,
} from '../../../../../utils/common-constants';
import { staticSecretTemplateListAPI } from '../../../../../services/secret-manager-service';
import {
  secretType,
  rotationInterval,
  description,
  passwordPolicyId,
  parameters,
  isPasswordSelected as isPasswordSelectedValidation,
} from '../common-validation';
import * as yup from 'yup';
import AddSecretInputForm from '../add/input/AddSecretInputForm';
import { translatedStrings, keyName, editSecretConstants } from './constants';
import { classes } from '../add/constants';
import uniqueId from 'lodash/uniqueId';
import { fieldTypeStrings } from '../constant';
import { getPwdPolicyID, getFieldMassagedData } from '../common-utils';
import SnackbarFormError from '../../../../../components/snackbar';

const EditStaticSecretTemplate = ({
  setPageHeader,
  history,
  sstGetById,
  sstViewData,
  sstViewStatus,
  sstEditRequest,
  getPwdPoliciesList,
  pwdPoliciesList,
  openNotification,
  sstEditFormError,
  sstEditStatus,
  spinnerOverlay,
  resetEditSecretTemplateData,
}) => {
  const { id: secretId } = useParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const [isPasswordSelected, setIsPasswordSelected] = useState(false);

  const validationSchema = yup.object({
    secretType: secretType.test(
      name,
      translatedStrings.nameValidationExit,
      async (value, context) => {
        const contextField = context?.options?.context;
        if (
          (contextField === editSecretConstants?.secretTypeText ||
            contextField === editSecretConstants?.allText) &&
          value !== '' &&
          validationHook.values.secretType !== sstViewData.secretType
        ) {
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
      delete values.id;
      const rotationInterval =
        sstViewData?.rotationInterval !== Number(values.rotationInterval)
          ? Number(values.rotationInterval)
          : undefined;
      const payloadData = {
        ...values,
        rotationInterval,
        passwordPolicyId: getPwdPolicyID(values.passwordPolicyId, pwdPoliciesList),
        parameters: getFieldMassagedData(values.parameters),
        secretType: values?.secretType.trim(),
      };
      sstEditRequest(JSON.stringify(payloadData), secretId, history);
    },
  });

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    sstGetById(secretId, history);
    getPwdPoliciesList();
  }, []);
  useEffect(() => {
    spinnerOverlay({
      open: sstEditStatus === editSecretConstants?.loadingText,
      size: editSecretConstants?.size,
    });
  }, [sstEditStatus]);
  useEffect(() => {
    spinnerOverlay({
      open: sstViewStatus === editSecretConstants?.loadingText,
      size: editSecretConstants?.size,
      message: translatedStrings.loadingSecretTemplate,
    });
  }, [sstViewStatus]);

  useEffect(() => {
    validationHook.handleChange(validationHook.names.isPasswordSelected, isPasswordSelected);
  }, [isPasswordSelected]);

  useEffect(() => {
    if (sstViewStatus === editSecretConstants?.successStatusText) {
      const massagedData = getTableMassagedData(sstViewData);
      validationHook.resetValues({
        ...massagedData,
        isPasswordSelected: checkPasswordField(massagedData),
      });
    }
  }, [sstViewStatus, pwdPoliciesList]);

  const checkPasswordField = (data) => {
    const isPassword =
      data?.parameters.length &&
      data?.parameters.some((index) => index.type === editSecretConstants?.passwordText);
    setIsPasswordSelected(isPassword);
    return isPassword;
  };
  const getTableMassagedData = (secretData) => {
    const parametersData = secretData?.parameters;
    const massagedParametersData =
      parametersData &&
      parametersData.map((data) => {
        return {
          ...data,
          id: uniqueId(`${keyName}`),
          mask: data.mask ? translatedStrings.yesLabel : translatedStrings.noLabel,
          required: data.required ? translatedStrings.yesLabel : translatedStrings.noLabel,
          fieldTypeDisplayValue: fieldTypeStrings[data?.type],
        };
      });
    const policyName =
      pwdPoliciesList.length &&
      pwdPoliciesList.find((policy) => policy.id === secretData?.passwordPolicyId);
    return {
      ...secretData,
      passwordPolicyId: policyName ? policyName.name : translatedStrings?.noneText,
      parameters: massagedParametersData,
      rotationInterval: secretData?.rotationInterval || '',
    };
  };

  const getSaveCancelBtn = () => {
    return (
      <div className={classes.sstLeftAction}>
        <div className={classes.sstSaveBtn}>
          <Button
            variant={editSecretConstants?.priVariant}
            size={editSecretConstants?.size}
            onClick={() => {
              validationHook.handleSubmit();
            }}
          >
            {translatedStrings.saveBtn}
          </Button>
        </div>
        <div className={classes.sstResetBtn}>
          <Button
            variant={editSecretConstants?.secVariant}
            size={editSecretConstants?.size}
            onClick={() => setShowResetDialog(true)}
          >
            {translatedStrings.resetBtn}
          </Button>
        </div>
        <Button
          variant={editSecretConstants?.secVariant}
          size={editSecretConstants?.size}
          onClick={() => setShowCancelDialog(true)}
        >
          {translatedStrings.cancelBtn}
        </Button>
      </div>
    );
  };

  const editButtonHeader = () => {
    return <div className={classes.sstActionContainer}>{getSaveCancelBtn()}</div>;
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type={editSecretConstants?.alertText}
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.yesDiscard}
        secondaryButtonText={translatedStrings.noLabel}
        onSubmit={() => {
          !isEmpty(sstEditFormError);
          setShowCancelDialog(false);
          resetEditSecretTemplateData();
          history.push(editSecretConstants?.listUrl);
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };
  const handleResetSubmit = () => {
    validationHook.resetForm();
    !isEmpty(sstEditFormError) && resetEditSecretTemplateData();
    sstGetById(secretId, history);
    openNotification(
      editSecretConstants?.successText,
      translatedStrings?.resetNotificationMessage,
      editSecretConstants?.resetNotificationTime
    );
    setShowResetDialog(false);
  };

  const getResetDialog = () => {
    return (
      <DialogPopup
        type={editSecretConstants?.alertText}
        title={translatedStrings?.resetDialogTitle}
        message={translatedStrings?.resetDialogMessage}
        primaryButtonText={translatedStrings?.resetDialogPrimaryButton}
        secondaryButtonText={translatedStrings?.resetDialogSecondaryButton}
        onSubmit={handleResetSubmit}
        onCancel={() => setShowResetDialog(false)}
      />
    );
  };

  return (
    <>
      {editButtonHeader()}
      <SnackbarFormError
        title={translatedStrings.formError}
        errorList={sstEditFormError?.split('|')?.map((message) => `- ${message}`)}
        hasError={!isEmpty(sstEditFormError)}
      />
      {sstViewStatus !== RESOURCE_STATUS.LOADING && (
        <AddSecretInputForm
          pwdPoliciesList={pwdPoliciesList}
          openNotification={openNotification}
          nameFilterLoading={nameFilterLoading}
          validationHook={validationHook}
          isPasswordSelected={isPasswordSelected}
          setIsPasswordSelected={setIsPasswordSelected}
          sstFormError={sstEditFormError}
        />
      )}
      {showCancelDialog && getCancelDialog()}
      {showResetDialog && getResetDialog()}
    </>
  );
};

EditStaticSecretTemplate.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  getPwdPoliciesList: PropTypes.func,
  pwdPoliciesList: PropTypes.object,
  openNotification: PropTypes.func,
  spinnerOverlay: PropTypes.func,
  sstGetById: PropTypes.func,
  sstEditRequest: PropTypes.func,
  sstViewData: PropTypes.object,
  sstViewStatus: PropTypes.string,
  sstEditFormError: PropTypes.object,
  sstEditStatus: PropTypes.string,
  resetEditSecretTemplateData: PropTypes.func,
};

export default EditStaticSecretTemplate;
