import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import useValidation from '../../../../../components/use-validation-hook';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Button from 'britive-design-system/core/components/button';
import AddPermissionForm from '../add/add-permissions-form/AddPermissionsForm';
import AddPermissionJSON from '../add/add-permissions-json/AddPermissionJson';
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
  cloneNamePrefix,
  errorNotificationTime,
  appsConsumer,
} from '../add/constants';
import { name, description, consumer, resources, actions } from '../common-validation';
import { getHeightFromTop, isSuccess } from '../../../../../utils/common-utils';
import { isEmpty } from 'lodash';
import { permissionListingPath } from '../../../../../utils/common-constants';

const ClonePermission = ({
  history,
  setPageHeader,
  openNotification,
  getConsumerList,
  getActionsList,
  consumerList,
  consumerListStatus,
  consumerListError,
  actionListData,
  actionListStatus,
  actionListError,
  flushAddPermissions,
  addPermissionsAction,
  addPermissionData,
  addPermissionStatus,
  addPermissionFormError,
  getViewPermissions,
  viewPermissionData,
  viewPermissionStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  applicationsListError,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formData, setFormData] = useState('');
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const { id: permissionCloneID } = useParams();
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

  useEffect(() => {
    getViewPermissions(permissionCloneID, history);
  }, [permissionCloneID]);

  useEffect(() => {
    getActionsList(viewPermissionData?.consumer);
    viewPermissionData?.consumer === appsConsumer && getApplicationsList();
  }, [viewPermissionData]);

  const inputFormValidationSchema = yup.object({
    name: name.test(name, validation.permissionNameExit, async (value, context) => {
      const contextField = context?.options?.context;
      if (
        (contextField === 'name' || contextField === 'all') &&
        value !== '' &&
        validationHook.values.name !== viewPermissionData.name
      ) {
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
          setNameFilterLoading(false);
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
  });

  useEffect(() => {
    if (!isEmpty(viewPermissionData) && isSuccess(consumerListStatus)) {
      const { name, description, consumer, resources, actions } = viewPermissionData;
      const consumerDescription = consumerList?.result?.find(
        (consumerItem) => consumerItem.name === consumer
      )?.description;
      validationHook.resetValues({
        name: cloneNamePrefix(name),
        description: description,
        consumer: { name: consumer, description: consumerDescription },
        resources: resources?.join(','),
        actions: actions,
      });
    }
  }, [viewPermissionData, consumerListStatus]);

  const validationHook = useValidation({
    initialValues: {
      description: '',
      name: '',
      consumer: '',
      resources: '',
      actions: [],
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
          ...values,
          actions: actions,
          resources: values.resources.split(','),
          name: values.name.trim(),
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
          history.push(permissionListingPath);
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
          getViewPermissions(permissionCloneID, history);
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
          viewPermissionData && (
            <AddPermissionForm
              validationHook={validationHook}
              nameFilterLoading={nameFilterLoading}
              consumerList={consumerList}
              consumerListStatus={consumerListStatus}
              consumerListError={consumerListError}
              getActionsList={getActionsList}
              actionListData={actionListData}
              actionListStatus={actionListStatus}
              actionListError={actionListError}
              addPermissionData={addPermissionData}
              addPermissionStatus={addPermissionStatus}
              viewPermissionStatus={viewPermissionStatus}
              getApplicationsList={getApplicationsList}
              applicationsListData={applicationsListData}
              applicationsListStatus={applicationsListStatus}
              applicationsListError={applicationsListError}
            />
          )
        ) : (
          <AddPermissionJSON
            jsonObject={jsonObject}
            openNotification={openNotification}
            addPermissionData={addPermissionData}
            addPermissionStatus={addPermissionStatus}
            viewPermissionData={viewPermissionData}
            viewPermissionStatus={viewPermissionStatus}
          />
        )}
      </div>
    </>
  );
};

ClonePermission.propTypes = {
  history: PropTypes.any,
  openNotification: PropTypes.any,
  getConsumerList: PropTypes.func,
  getActionsList: PropTypes.func,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
  consumerListError: PropTypes.any,
  actionListData: PropTypes.array,
  actionListStatus: PropTypes.string,
  actionListError: PropTypes.object,
  setPageHeader: PropTypes.func,
  flushAddPermissions: PropTypes.func,
  addPermissionsAction: PropTypes.func,
  addPermissionData: PropTypes.array,
  addPermissionStatus: PropTypes.string,
  addPermissionFormError: PropTypes.object,
  getViewPermissions: PropTypes.func,
  viewPermissionData: PropTypes.object,
  viewPermissionStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  applicationsListError: PropTypes.string,
};
export default ClonePermission;
