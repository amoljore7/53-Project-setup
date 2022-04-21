import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import useValidation from '../../../../../components/use-validation-hook';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Button from 'britive-design-system/core/components/button';
import AddPermissionForm from '../add/add-permissions-form/AddPermissionsForm';
import AddPermissionJSON from '../add/add-permissions-json/AddPermissionJson';
import ApiServices from '../../../../../utils/api-service';
import { useParams } from 'react-router-dom';
import { classes } from '../add/constants';
import SnackbarFormError from '../../../../../components/snackbar';
import {
  pageTitle,
  buttonType,
  discardTitle,
  cancelModalMSG,
  discardCancelModal,
  switchToJSONDialogTitle,
  switchToFormDialogTitle,
  resetPermissions,
  fieldsReplaceMsg,
  resetAllField,
  keepChangesMSG,
  switchToJsonMsg,
  switchToFormMsg,
  noLabel,
  savePermissionTitle,
  permissionSaveMsg,
  yesSave,
  validation,
  resetNotification,
  switchToFormButton,
  switchToJSONButton,
  switchToJSONDialogButton,
  switchToFormDialogButton,
} from './constants';
import {
  name,
  description,
  consumer,
  resources,
  actions,
  applications,
} from '../common-validation';
import { getHeightFromTop, isSuccess } from '../../../../../utils/common-utils';
import { isEmpty } from 'lodash';
import { appsConsumer } from '../add/constants';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';

const EditPermission = ({
  history,
  setPageHeader,
  openNotification,
  getActionsList,
  actionListData,
  actionListStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  flushEditPermissions,
  editPermissionsAction,
  editPermissionStatus,
  editPermissionFormError,
  getViewPermissions,
  viewPermissionData,
  viewPermissionStatus,
  consumerList,
  consumerListStatus,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [showSaveDialog, setSaveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formData, setFormData] = useState('');
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const { id: permissionEditID } = useParams();
  const formContainer = useRef(null);

  useEffect(() => {
    setPageHeader(pageTitle, []);
  }, []);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, editPermissionFormError]);

  useEffect(() => {
    getViewPermissions(permissionEditID, history);
  }, [permissionEditID]);

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
            `/api/v1/policy-admin/permissions?filter=name%20eq%20'${value}'`
          );
          setNameFilterLoading(false);
          return response?.data?.result?.length === 0;
        } catch ({ response }) {
          setNameFilterLoading(false);
          const reason = response?.data?.message || '';
          openNotification({
            type: errorNotificationType,
            title: reason,
            duration: errorNotificationDuration,
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
  useEffect(() => {
    if (
      isSuccess(viewPermissionStatus) &&
      (isSuccess(applicationsListStatus) || isSuccess(actionListStatus)) &&
      isSuccess(consumerListStatus)
    ) {
      const consumerDescription = consumerList?.result?.find(
        (consumer) => consumer.name === viewPermissionData.consumer
      )?.description;
      validationHook.resetValues({
        name: viewPermissionData.name,
        description: viewPermissionData.description,
        consumer: { name: viewPermissionData.consumer, description: consumerDescription },
        resources: viewPermissionData?.resources?.join(','),
        actions: viewPermissionData.actions,
        applications:
          viewPermissionData?.consumer === appsConsumer ? viewPermissionData?.resources : [],
      });
    }
  }, [viewPermissionStatus, applicationsListStatus, actionListStatus, consumerListStatus]);

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
      // data masage here for API
      setSaveDialog(true);
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
        setFormData(payloadData);
      }
    },
  });

  const jsonObject = (payload) => {
    setFormData(payload);
  };

  const editCloneDeleteCloseBtn = () => {
    return (
      <div className={classes.addPermissionLeftAction}>
        <div className={classes.addPermissionSaveBtn}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              isForm && validationHook.handleSubmit();
              if (!isForm) setSaveDialog(true);
            }}
          >
            {buttonType.save}
          </Button>
        </div>
        <div className={classes.addPermissionSaveBtn}>
          <Button variant="secondary" size="medium" onClick={() => setResetDialog(true)}>
            {buttonType.reset}
          </Button>
        </div>

        <Button variant="secondary" size="medium" onClick={() => setShowCancelDialog(true)}>
          {buttonType.cancel}
        </Button>
      </div>
    );
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={discardTitle}
        message={cancelModalMSG}
        primaryButtonText={discardCancelModal}
        secondaryButtonText={noLabel}
        onSubmit={() => {
          setShowCancelDialog(false);
          flushEditPermissions();
          history.push('/admin/policy-management/permissions');
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const getResetDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={resetPermissions}
        message={fieldsReplaceMsg}
        primaryButtonText={resetAllField}
        secondaryButtonText={keepChangesMSG}
        onSubmit={() => {
          validationHook.resetForm();
          setResetDialog(false);
          flushEditPermissions();
          getViewPermissions(permissionEditID, history);
          openNotification({
            type: successNotificationType,
            title: resetNotification,
            duration: successNotificationDuration,
          });
        }}
        onCancel={() => setResetDialog(false)}
      />
    );
  };

  const switchBtn = () => {
    return (
      <div className={classes.addPermissionRightAction}>
        <Button
          variant="secondary"
          size="medium"
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
        {editCloneDeleteCloseBtn()}
        {switchBtn()}
      </div>
    );
  };

  const getSaveDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={savePermissionTitle}
        message={permissionSaveMsg}
        primaryButtonText={yesSave}
        secondaryButtonText={noLabel}
        onSubmit={() => {
          setSaveDialog(false);
          editPermissionsAction(formData, permissionEditID, history);
        }}
        onCancel={() => setSaveDialog(false)}
      />
    );
  };
  const getSwitchDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={isForm ? switchToJSONDialogTitle : switchToFormDialogTitle}
        message={isForm ? switchToJsonMsg : switchToFormMsg}
        primaryButtonText={isForm ? switchToJSONDialogButton : switchToFormDialogButton}
        secondaryButtonText={noLabel}
        onSubmit={() => {
          getViewPermissions(permissionEditID, history);
          validationHook.resetForm();
          setShowSwitchDialog(false);
          setIsForm(!isForm);
          setFormData('');
          flushEditPermissions();
        }}
        onCancel={() => setShowSwitchDialog(false)}
      />
    );
  };

  return (
    <>
      {addPermissionButtonHeader()}
      <SnackbarFormError
        {...editPermissionFormError}
        hasError={!isEmpty(editPermissionFormError)}
      />
      {showCancelDialog && getCancelDialog()}
      {showSaveDialog && getSaveDialog()}
      {showSwitchDialog && getSwitchDialog()}
      {resetDialog && getResetDialog()}
      <div className={classes.permissionJSONFormContainer} ref={formContainer}>
        {isForm ? (
          viewPermissionData && (
            <AddPermissionForm
              validationHook={validationHook}
              nameFilterLoading={nameFilterLoading}
              viewPermissionStatus={viewPermissionStatus}
              actionListData={actionListData}
              actionListStatus={actionListStatus}
              applicationsListData={applicationsListData}
              applicationsListStatus={applicationsListStatus}
              addPermissionStatus={editPermissionStatus}
              consumerList={consumerList}
              consumerListStatus={consumerListStatus}
              isEditMode={true}
            />
          )
        ) : (
          <AddPermissionJSON
            jsonObject={jsonObject}
            viewPermissionData={viewPermissionData}
            viewPermissionStatus={viewPermissionStatus}
            openNotification={openNotification}
            addPermissionStatus={editPermissionStatus}
          />
        )}
      </div>
    </>
  );
};

EditPermission.propTypes = {
  history: PropTypes.any,
  openNotification: PropTypes.func,
  getActionsList: PropTypes.func,
  actionListData: PropTypes.array,
  actionListStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  setPageHeader: PropTypes.func,
  flushEditPermissions: PropTypes.func,
  editPermissionsAction: PropTypes.func,
  editPermissionStatus: PropTypes.string,
  editPermissionFormError: PropTypes.object,
  getViewPermissions: PropTypes.func,
  viewPermissionData: PropTypes.object,
  viewPermissionStatus: PropTypes.string,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};
export default EditPermission;
