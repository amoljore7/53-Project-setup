import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import { FiAlertCircle } from 'react-icons/fi';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import * as yup from 'yup';
import AddRoleJson from './json/AddRoleJson';
import AddRoleInput from './input/AddRoleInput';
import {
  cancelBtn,
  cancelModalMessage,
  cancelModalPrimaryBtn,
  cancelModalTitle,
  classes,
  errorSnackbarTitle,
  nameExistValidation,
  noBtn,
  pageTitle,
  roleJSONValidation,
  saveBtn,
  switchToFormBtn,
  switchToFormHeader,
  switchToFormLabel,
  switchToFormMessage,
  switchToJSONBtn,
  switchToJSONHeader,
  switchToJSONLabel,
  switchToJSONMessage,
  translatedString,
} from './constants';
import { inlineType } from './input/constants';
import {
  errorNotificationDuration,
  errorNotificationType,
  typeOfStatus,
} from '../../../../../utils/common-constants';
import ApiServices from '../../../../../utils/api-service';
import { name, description, permissions } from '../common-validation';

import './AddRole.scss';

const AddRole = ({
  setPageHeader,
  history,
  postRoleData,
  getConsumerData,
  consumerList,
  getActionData,
  actionStatus,
  actionList,
  getAllPermissionsData,
  permissionListStatus,
  permissionList,
  getPermissionData,
  permissionDataStatus,
  permissionData,
  openNotification,
  addRoleError,
  resetRoleData,
  resetPermissionData,
  resetActionData,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  consumerListStatus,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [roleFilterLoading, setRoleFilterLoading] = useState(false);

  const validationSchema = yup.object({
    name: name.test(name, nameExistValidation, async (value, context) => {
      const contextField = context?.options?.context;
      if ((contextField === 'name' || contextField === 'all') && value !== '') {
        setRoleFilterLoading(true);
        try {
          const response = await ApiServices.get(
            `/api/v1/policy-admin/roles?filter=name%20eq%20'${value}'`
          );
          setRoleFilterLoading(false);
          return response?.data?.result?.length === 0;
        } catch ({ response }) {
          setRoleFilterLoading(false);
          const reason = response?.data?.message || '';
          openNotification(errorNotificationType, reason, errorNotificationDuration);
          return true;
        }
      } else {
        return true;
      }
    }),
    description,
    permissions,
  });

  const validationHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      permissions: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payloadData = {
        ...values,
        permissions: getPermissionMassagedData(values.permissions),
        name: values.name.trim(),
      };
      postRoleData(JSON.stringify(payloadData), history);
    },
  });

  const validationSchemaJSON = yup.object({
    roleDataJSON: yup
      .string()
      .required(roleJSONValidation)
      .test('roleDataJSON', translatedString.invalidJsonValidation, (values) => {
        try {
          JSON.parse(values);
          return true;
        } catch (error) {
          return false;
        }
      }),
  });

  const validationHookJSON = useValidation({
    initialValues: {
      roleDataJSON: '',
    },
    validationSchema: validationSchemaJSON,
    onSubmit: (values) => {
      postRoleData(JSON.stringify(values.roleDataJSON), history);
    },
  });

  useEffect(() => {
    setPageHeader(pageTitle, []);
    getApplicationsList();
    getConsumerData();
  }, []);

  const getPermissionMassagedData = (permissionData) => {
    return permissionData.map((permission) =>
      permission.source === inlineType
        ? {
            name: permission.name,
            description: permission.description,
            consumer: permission.consumer.name,
            resources: permission.resources,
            actions: permission.actions,
          }
        : {
            id: permission.id,
          }
    );
  };

  const getSaveCancelBtn = () => {
    return (
      <div className={classes.roleLeftAction}>
        <div className={classes.roleSaveBtn}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              if (isForm) {
                validationHook.handleSubmit();
              } else {
                validationHookJSON.handleSubmit();
              }
            }}
          >
            {saveBtn}
          </Button>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setShowCancelModal(true)}>
          {cancelBtn}
        </Button>
      </div>
    );
  };

  const getSwitchBtn = () => {
    return (
      <div data-testid="switch-btn" className={classes.roleRightAction}>
        <Button variant="secondary" size="medium" onClick={() => setShowSwitchModal(true)}>
          {isForm ? switchToJSONLabel : switchToFormLabel}
        </Button>
      </div>
    );
  };

  const getAddRoleHeader = () => {
    return (
      <div className={classes.roleActionContainer}>
        {getSaveCancelBtn()}
        {getSwitchBtn()}
      </div>
    );
  };

  const handleSwitchSubmit = () => {
    if (isForm) {
      validationHook.resetForm();
    } else {
      validationHookJSON.resetForm();
    }
    !isEmpty(addRoleError) && resetRoleData();
    setShowSwitchModal(false);
    setIsForm(!isForm);
  };

  const getSwitchModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={isForm ? switchToJSONHeader : switchToFormHeader}
        message={isForm ? switchToJSONMessage : switchToFormMessage}
        primaryButtonText={isForm ? switchToJSONBtn : switchToFormBtn}
        secondaryButtonText={noBtn}
        onSubmit={handleSwitchSubmit}
        onCancel={() => setShowSwitchModal(false)}
      />
    );
  };

  const getCancelModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={cancelModalTitle}
        message={cancelModalMessage}
        primaryButtonText={cancelModalPrimaryBtn}
        secondaryButtonText={noBtn}
        onSubmit={() => {
          !isEmpty(addRoleError) && resetRoleData();
          setShowCancelModal(false);
          history.goBack();
          resetRoleData();
        }}
        onCancel={() => setShowCancelModal(false)}
      />
    );
  };

  const getRoleError = () => {
    return (
      <div data-testid="role-error" className={classes.roleErrorSnackbar}>
        <Snackbar
          title={errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={addRoleError.split('|').map((msg) => `- ${msg}`) || []}
        />
      </div>
    );
  };

  return (
    <>
      {getAddRoleHeader()}
      {!isEmpty(addRoleError) && getRoleError()}
      {isForm ? (
        <AddRoleInput
          consumerList={consumerList}
          getActionData={getActionData}
          actionStatus={actionStatus}
          actionList={actionList}
          getAllPermissionsData={getAllPermissionsData}
          permissionListStatus={permissionListStatus}
          permissionList={permissionList}
          getPermissionData={getPermissionData}
          permissionDataStatus={permissionDataStatus}
          permissionData={permissionData}
          openNotification={openNotification}
          resetPermissionData={resetPermissionData}
          resetActionData={resetActionData}
          roleFilterLoading={roleFilterLoading}
          validationHook={validationHook}
          roleError={addRoleError}
          getApplicationsList={getApplicationsList}
          applicationsListData={applicationsListData}
          applicationsListStatus={applicationsListStatus}
          consumerListStatus={consumerListStatus}
        />
      ) : (
        <AddRoleJson
          openNotification={openNotification}
          validationHookJSON={validationHookJSON}
          roleError={addRoleError}
        />
      )}
      {showSwitchModal && getSwitchModal()}
      {showCancelModal && getCancelModal()}
    </>
  );
};

AddRole.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  postRoleData: PropTypes.func,
  getConsumerData: PropTypes.func,
  consumerList: PropTypes.object,
  getActionData: PropTypes.func,
  actionStatus: PropTypes.oneOf(typeOfStatus),
  actionList: PropTypes.object,
  getAllPermissionsData: PropTypes.func,
  permissionListStatus: PropTypes.oneOf(typeOfStatus),
  permissionList: PropTypes.object,
  getPermissionData: PropTypes.func,
  permissionDataStatus: PropTypes.oneOf(typeOfStatus),
  permissionData: PropTypes.object,
  openNotification: PropTypes.func,
  addRoleError: PropTypes.object,
  resetRoleData: PropTypes.func,
  resetPermissionData: PropTypes.func,
  resetActionData: PropTypes.func,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  consumerListStatus: PropTypes.string,
};

export default AddRole;
