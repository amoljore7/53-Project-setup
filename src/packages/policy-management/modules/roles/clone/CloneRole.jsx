import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import { FiAlertCircle } from 'react-icons/fi';
import isEmpty from 'lodash/isEmpty';
import useValidation from '../../../../../components/use-validation-hook';
import * as yup from 'yup';
import AddRoleJson from '../add/json/AddRoleJson';
import AddRoleInput from '../add/input/AddRoleInput';
import {
  errorNotificationDuration,
  errorNotificationType,
  medium,
  roleListingPath,
  typeOfStatus,
} from '../../../../../utils/common-constants';
import { inlineType, preDefinedType } from '../add/input/constants';
import { useParams } from 'react-router';
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
} from '../add/constants';
import ApiServices from '../../../../../utils/api-service';
import { name, description, permissions } from '../common-validation';
import { translatedStrings } from './constant';
import { isLoading, isSuccess } from '../../../../../utils/common-utils';

const CloneRole = ({
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
  resetPermissionData,
  resetActionData,
  roleDataStatus,
  roleData,
  getRoleById,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  initSpinnerOverlay,
  resetRoleData,
  consumerListStatus,
}) => {
  const { id: roleId } = useParams();
  const [isForm, setIsForm] = useState(true);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [roleFilterLoading, setRoleFilterLoading] = useState(false);

  useEffect(() => {
    setPageHeader(pageTitle, []);
    getApplicationsList();
    getRoleById(roleId, history);
    getConsumerData();
  }, []);

  useEffect(() => {
    if (isSuccess(roleDataStatus)) {
      const massagedData = getPermissionTableMassagedData(roleData);
      validationHook.resetValues(massagedData);
      // JSON part
      const jsonMassagedData = getRoleJSONMassagedData(roleData);
      validationHookJSON.handleChange(
        validationHookJSON.names.roleDataJSON,
        JSON.stringify(jsonMassagedData, undefined, 4)
      );
    }
  }, [roleDataStatus]);

  useEffect(() => {
    initSpinnerOverlay({
      open: isLoading(roleDataStatus) || isLoading(consumerListStatus),
      size: medium,
      message: translatedStrings.roleLoadingMessage,
    });
  }, [roleDataStatus, consumerListStatus]);

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
      .test('roleDataJSON', translatedStrings.invalidJsonValidation, (value) => {
        try {
          if (isEmpty(value)) {
            return true;
          }
          JSON.parse(value);
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

  const getPermissionTableMassagedData = (roleData) => {
    const permissionData = [...roleData?.permissions];
    const massagedPermissionData = permissionData.map((data) => {
      const consumer = consumerList?.result?.find((consumer) => consumer.name === data.consumer);
      return {
        ...data,
        name: data?.isInline ? `${translatedStrings.copyOf(data?.name)}` : data?.name,
        source: data?.isInline ? inlineType : preDefinedType,
        consumer,
      };
    });

    const tempRoleData = { ...roleData };

    tempRoleData.name = `${translatedStrings.copyOf(roleData?.name)}`;
    delete tempRoleData?.isReadOnly;
    delete tempRoleData?.id;
    return {
      ...tempRoleData,
      permissions: massagedPermissionData,
    };
  };

  const getRoleJSONMassagedData = (roleData) => {
    const permissionData = [...roleData?.permissions];
    const massagedPermissionData = permissionData.map((data) => {
      if (data?.isInline) {
        delete data?.id;
        return {
          ...data,
          name: `${translatedStrings.copyOf(data.name)}`,
        };
      } else {
        return {
          name: data?.name,
        };
      }
    });

    const tempRoleData = { ...roleData };
    delete tempRoleData?.id;
    tempRoleData.name = `${translatedStrings.copyOf(roleData?.name)}`;
    delete tempRoleData?.isReadOnly;
    return {
      ...tempRoleData,
      permissions: massagedPermissionData,
    };
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

  const handleFormSwitchConfirmation = () => {
    // on view change discarding the changes. reloading data from store
    if (isForm) {
      const jsonMassagedData = getRoleJSONMassagedData(roleData);
      validationHookJSON.handleChange(
        validationHookJSON.names.roleDataJSON,
        JSON.stringify(jsonMassagedData, undefined, 4)
      );
    } else {
      const massagedData = getPermissionTableMassagedData(roleData);
      validationHook.resetValues(massagedData);
    }
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
        onSubmit={handleFormSwitchConfirmation}
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
          setShowCancelModal(false);
          history.push(roleListingPath);
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
      {!isLoading(roleDataStatus) && isForm ? (
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
          roleError={addRoleError?.message}
          getApplicationsList={getApplicationsList}
          applicationsListData={applicationsListData}
          applicationsListStatus={applicationsListStatus}
          consumerListStatus={consumerListStatus}
        />
      ) : (
        !isLoading(roleDataStatus) && (
          <AddRoleJson
            openNotification={openNotification}
            validationHookJSON={validationHookJSON}
            roleError={addRoleError?.message}
          />
        )
      )}
      {showSwitchModal && getSwitchModal()}
      {showCancelModal && getCancelModal()}
    </>
  );
};

CloneRole.propTypes = {
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
  resetPermissionData: PropTypes.func,
  resetActionData: PropTypes.func,
  getRoleById: PropTypes.func,
  roleDataStatus: PropTypes.oneOf(typeOfStatus),
  roleData: PropTypes.object,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  initSpinnerOverlay: PropTypes.func,
  resetRoleData: PropTypes.func,
  consumerListStatus: PropTypes.string,
};

export default CloneRole;
