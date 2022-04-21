import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import { staticSecretTemplateListAPI } from '../../../../../services/secret-manager-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  RESOURCE_STATUS,
} from '../../../../../utils/common-constants';
import {
  secretType,
  parameters,
  passwordPolicyId,
  description,
  rotationInterval,
  isPasswordSelected as isPasswordSelectedValidation,
} from '../common-validation';
import * as yup from 'yup';
import AddSecretInputForm from '../add/input/AddSecretInputForm';
import { classes, translatedStrings, keyName, passwordFieldType } from '../add/constants';
import uniqueId from 'lodash/uniqueId';
import { fieldTypeStrings } from '../constant';
import { getPwdPolicyID, getFieldMassagedData } from '../common-utils';
import SnackbarFormError from '../../../../../components/snackbar';

const CloneStaticSecretTemplate = ({
  setPageHeader,
  history,
  sstGetById,
  sstViewData,
  sstViewStatus,
  getPwdPoliciesList,
  pwdPoliciesList,
  openNotification,
  sstAddFormError,
  sstAddStatus,
  spinnerOverlay,
  sstPostData,
  resetAddStaticSecretData,
}) => {
  const { id: secretId } = useParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const [isPasswordSelected, setIsPasswordSelected] = useState(false);

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

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    sstGetById(secretId, history);
    getPwdPoliciesList();
  }, []);
  useEffect(() => {
    spinnerOverlay({
      open: sstAddStatus === 'LOADING',
      size: 'medium',
    });
  }, [sstAddStatus]);

  useEffect(() => {
    spinnerOverlay({
      open: sstViewStatus === 'LOADING',
      size: 'medium',
      message: translatedStrings.loadingSecretTemplate,
    });
  }, [sstViewStatus]);

  useEffect(() => {
    validationHook.handleChange(validationHook.names.isPasswordSelected, isPasswordSelected);
  }, [isPasswordSelected]);

  useEffect(() => {
    if (sstViewStatus === 'SUCCESS') {
      const massagedData = getTableMassagedData(sstViewData);
      validationHook.resetValues({
        ...massagedData,
        isPasswordSelected: checkPasswordField(massagedData),
      });
    }
  }, [sstViewStatus, pwdPoliciesList]);

  const checkPasswordField = (data) => {
    const isPassword = data?.parameters?.some((index) => index.type === passwordFieldType);
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
      secretType: `${translatedStrings.copyOf}${secretData?.secretType}`,
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
      {sstViewStatus !== RESOURCE_STATUS.LOADING && (
        <AddSecretInputForm
          pwdPoliciesList={pwdPoliciesList}
          openNotification={openNotification}
          nameFilterLoading={nameFilterLoading}
          validationHook={validationHook}
          isPasswordSelected={isPasswordSelected}
          setIsPasswordSelected={setIsPasswordSelected}
          sstFormError={sstAddFormError}
        />
      )}
      {showCancelDialog && getCancelDialog()}
    </>
  );
};

CloneStaticSecretTemplate.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  getPwdPoliciesList: PropTypes.func,
  pwdPoliciesList: PropTypes.object,
  openNotification: PropTypes.func,
  sstAddFormError: PropTypes.object,
  sstAddStatus: PropTypes.string,
  spinnerOverlay: PropTypes.func,
  sstGetById: PropTypes.func,
  sstViewData: PropTypes.object,
  sstViewStatus: PropTypes.string,
  sstPostData: PropTypes.object,
  resetAddStaticSecretData: PropTypes.func,
};

export default CloneStaticSecretTemplate;
