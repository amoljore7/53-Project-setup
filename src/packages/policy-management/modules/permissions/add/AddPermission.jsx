import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import useValidation from '../../../../../components/use-validation-hook';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Button from 'britive-design-system/core/components/button';
import AddPermissionForm from './add-permissions-form/AddPermissionsForm';
import AddPermissionJSON from './add-permissions-json/AddPermissionJson';
import ApiServices from '../../../../../utils/api-service';
import SnackbarFormError from '../../../../../components/snackbar';
import {
  classes,
  pageTitle,
  cancelPermissionMsg,
  cancelPermissionTitle,
  cancelYesLabel,
  cancelNoLabel,
  defaultModalType,
  buttonType,
  switchToJSON,
  switchToForm,
  switchToJsonMsg,
  switchToFormMsg,
  switchJsonLabel,
  switchFormLabel,
  switchNoLabel,
  validation,
  switchToJSONButton,
  switchToFormButton,
  errorNotificationTime,
} from './constants';
import './AddPermission.scss';
import {
  name,
  description,
  consumer,
  resources,
  actions,
  applications,
} from '../common-validation';
import { getHeightFromTop } from '../../../../../utils/common-utils';
import { isEmpty } from 'lodash';

const AddPermission = ({
  history,
  setPageHeader,
  openNotification,
  getConsumerList,
  getActionsList,
  getApplicationsList,
  consumerList,
  consumerListStatus,
  consumerListError,
  actionListData,
  actionListStatus,
  actionListError,
  applicationsListData,
  applicationsListStatus,
  applicationsListError,
  flushAddPermissions,
  addPermissionsAction,
  addPermissionData,
  addPermissionStatus,
  addPermissionFormError,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formData, setFormData] = useState('');
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const formContainer = useRef(null);

  useEffect(() => {
    setPageHeader(pageTitle, []);
    getConsumerList();
  }, []);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, addPermissionFormError]);

  const inputFormValidationSchema = yup.object({
    name: name.test(name, validation.permissionNameExit, async (value, context) => {
      const contextField = context?.options?.context;
      if ((contextField === 'name' || contextField === 'all') && value !== '') {
        setNameFilterLoading(true);
        try {
          const response = await ApiServices.get(
            `/api/v1/policy-admin/permissions?filter=name%20eq%20'${value}' `
          );
          setNameFilterLoading(false);
          return response?.data?.result?.length === 0;
        } catch ({ response }) {
          setNameFilterLoading(false);
          const reason = response?.data?.message || '';
          openNotification({
            type: 'error',
            title: reason,
            open: true,
            duration: errorNotificationTime,
          });
          return true;
        }
      } else {
        return true;
      }
    }),
    description,
    consumer,
    resources,
    actions,
    applications,
  });

  const validationHook = useValidation({
    initialValues: {
      description: '',
      name: '',
      consumer: '',
      resources: '',
      actions: [],
      applications: [],
    },
    validationSchema: inputFormValidationSchema,
    onSubmit: (values) => {
      // massage your data here
      if (isForm) {
        const actions =
          values.actions?.length &&
          values.actions.map((option) => {
            return option.name || option;
          });
        const payloadData = {
          actions: actions,
          resources: values.resources.split(','),
          name: values.name.trim(),
          description: values.description,
          consumer: values.consumer?.name,
        };
        addPermissionsAction(payloadData, history);
      }
    },
  });

  const jsonObject = (payload) => {
    setFormData(payload);
  };

  const getSaveCancelBtn = () => {
    return (
      <div className={classes.addPermissionLeftAction}>
        <div className={classes.addPermissionSaveBtn}>
          <Button
            variant={buttonType.primaryBtn}
            size={buttonType.mediumBtn}
            onClick={() => {
              isForm && validationHook.handleSubmit();
              if (!isForm) addPermissionsAction(formData, history);
            }}
          >
            {buttonType.save}
          </Button>
        </div>
        <Button
          variant={buttonType.secondaryBtn}
          size={buttonType.mediumBtn}
          onClick={() => setShowCancelDialog(true)}
        >
          {buttonType.cancel}
        </Button>
      </div>
    );
  };

  const getSwitchBtn = () => {
    return (
      <div className={classes.addPermissionRightAction}>
        <Button
          variant={buttonType.secondaryBtn}
          size={buttonType.mediumBtn}
          onClick={() => {
            setShowSwitchDialog(true);
          }}
        >
          {isForm ? switchToJSONButton : switchToFormButton}
        </Button>
      </div>
    );
  };
  const addPermissionButtonHeader = () => {
    return (
      <div className={classes.addPermissionButtonContainer}>
        {getSaveCancelBtn()}
        {getSwitchBtn()}
      </div>
    );
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type={defaultModalType}
        title={cancelPermissionTitle}
        message={cancelPermissionMsg}
        primaryButtonText={cancelYesLabel}
        secondaryButtonText={cancelNoLabel}
        onSubmit={() => {
          setShowCancelDialog(false);
          flushAddPermissions();
          history.goBack();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };
  const getSwitchDialog = () => {
    return (
      <DialogPopup
        type={defaultModalType}
        title={isForm ? switchToJSON : switchToForm}
        message={isForm ? switchToJsonMsg : switchToFormMsg}
        primaryButtonText={isForm ? switchJsonLabel : switchFormLabel}
        secondaryButtonText={switchNoLabel}
        onSubmit={() => {
          validationHook.resetForm();
          setShowSwitchDialog(false);
          setIsForm(!isForm);
          setFormData('');
          flushAddPermissions();
        }}
        onCancel={() => setShowSwitchDialog(false)}
      />
    );
  };

  return (
    <>
      {addPermissionButtonHeader()}
      <SnackbarFormError {...addPermissionFormError} hasError={!isEmpty(addPermissionFormError)} />
      {showCancelDialog && getCancelDialog()}
      {showSwitchDialog && getSwitchDialog()}
      <div className={classes.permissionJSONFormContainer} ref={formContainer}>
        {isForm ? (
          <AddPermissionForm
            validationHook={validationHook}
            nameFilterLoading={nameFilterLoading}
            consumerList={consumerList}
            consumerListStatus={consumerListStatus}
            consumerListError={consumerListError}
            getActionsList={getActionsList}
            getApplicationsList={getApplicationsList}
            actionListData={actionListData}
            actionListStatus={actionListStatus}
            actionListError={actionListError}
            addPermissionData={addPermissionData}
            addPermissionStatus={addPermissionStatus}
            applicationsListData={applicationsListData}
            applicationsListStatus={applicationsListStatus}
            applicationsListError={applicationsListError}
          />
        ) : (
          <AddPermissionJSON
            jsonObject={jsonObject}
            openNotification={openNotification}
            addPermissionData={addPermissionData}
            addPermissionStatus={addPermissionStatus}
          />
        )}
      </div>
    </>
  );
};

AddPermission.propTypes = {
  history: PropTypes.any,
  openNotification: PropTypes.any,
  getConsumerList: PropTypes.func,
  getActionsList: PropTypes.func,
  getApplicationsList: PropTypes.func,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
  consumerListError: PropTypes.any,
  actionListData: PropTypes.array,
  actionListStatus: PropTypes.string,
  actionListError: PropTypes.object,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  applicationsListError: PropTypes.object,
  setPageHeader: PropTypes.func,
  flushAddPermissions: PropTypes.func,
  addPermissionsAction: PropTypes.func,
  addPermissionData: PropTypes.array,
  addPermissionStatus: PropTypes.string,
  addPermissionFormError: PropTypes.object,
};
export default AddPermission;
