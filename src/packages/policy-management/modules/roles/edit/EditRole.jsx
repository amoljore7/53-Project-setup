import React, { useEffect, useState } from 'react';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import { cloneDeep, find, isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import useValidation from '../../../../../components/use-validation-hook';
import ApiServices from '../../../../../utils/api-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  medium,
  roleListingPath,
  successNotificationDuration,
  successNotificationType,
  typeOfStatus,
} from '../../../../../utils/common-constants';
import { isLoading, isSuccess } from '../../../../../utils/common-utils';
import AddRoleInput from '../add/input/AddRoleInput';
import { inlineType, preDefinedType } from '../add/input/constants';
import AddRoleJson from '../add/json/AddRoleJson';
import { description, name, permissions } from '../common-validation';
import { classes, translatedStrings } from './constants';
import './EditRole.scss';

const getPermissionTableMassagedData = (roleData, consumerList) => {
  const permissionData = roleData?.permissions;
  const massagedPermissionData = permissionData.map((data) => {
    const consumer = consumerList?.result?.find((consumer) => consumer.name === data.consumer);
    return {
      ...data,
      source: data?.isInline ? inlineType : preDefinedType,
      isPreviousPermission: true,
      consumer,
    };
  });
  return {
    ...roleData,
    permissions: massagedPermissionData,
  };
};

const getRoleJSONMassagedData = (roleData) => {
  const { name, description, permissions } = cloneDeep(roleData);
  const massagedPermissionData = permissions.map((data) => {
    if (data?.isInline) {
      delete data?.isInline;
      delete data?.isReadOnly;
      delete data?.id;
      return data;
    } else {
      return {
        name: data?.name,
      };
    }
  });

  return {
    name,
    description,
    permissions: massagedPermissionData,
  };
};

const EditRole = ({
  setPageHeader,
  history,
  getRoleById,
  roleDataStatus,
  roleData,
  openNotification,
  getConsumerData,
  getActionData,
  getAllPermissionsData,
  getPermissionData,
  resetPermissionData,
  resetActionData,
  consumerList,
  actionStatus,
  actionList,
  permissionListStatus,
  permissionList,
  permissionDataStatus,
  permissionData,
  editRoleError,
  editRoleData,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  initSpinnerOverlay,
  consumerListStatus,
}) => {
  const { id: roleId } = useParams();
  const [isForm, setIsForm] = useState(true);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [roleFilterLoading, setRoleFilterLoading] = useState(false);
  const [rolePayloadData, setRolePayloadData] = useState({});

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    getApplicationsList();
    getRoleById(roleId, history);
    getConsumerData();
  }, []);

  useEffect(() => {
    if (isSuccess(roleDataStatus) && isSuccess(consumerListStatus)) {
      const massagedData = getPermissionTableMassagedData(roleData, consumerList);
      editRoleValidation.resetValues(massagedData);
      // JSON Part
      const jsonMassagedData = getRoleJSONMassagedData(roleData);
      editRoleValidationJSON.handleChange(
        editRoleValidationJSON.names.roleDataJSON,
        JSON.stringify(jsonMassagedData, undefined, 4)
      );
    }
  }, [roleDataStatus, consumerListStatus]);

  useEffect(() => {
    initSpinnerOverlay({
      open: isLoading(roleDataStatus) || isLoading(consumerListStatus),
      size: medium,
      message: translatedStrings.roleLoadingMessage,
    });
  }, [roleDataStatus, consumerListStatus]);

  const editRoleValidationSchema = yup.object({
    name: name.test(name, translatedStrings.nameExistValidation, async (value, context) => {
      const contextField = context?.options?.context;
      if (
        (contextField === 'name' || contextField === 'all') &&
        value !== '' &&
        editRoleValidation?.values?.name.toLowerCase() !== roleData?.name?.toLowerCase()
      ) {
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

  const editRoleValidation = useValidation({
    initialValues: {
      name: '',
      description: '',
      permissions: [],
    },
    validationSchema: editRoleValidationSchema,
    onSubmit: (values) => {
      const payloadData = getRolePayloadData(values);
      setRolePayloadData(payloadData);
      setShowSaveModal(true);
    },
  });

  const editRoleValidationSchemaJSON = yup.object({
    roleDataJSON: yup
      .string()
      .required(translatedStrings.roleJSONValidation)
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

  const editRoleValidationJSON = useValidation({
    initialValues: {
      roleDataJSON: '',
    },
    validationSchema: editRoleValidationSchemaJSON,
    onSubmit: (values) => {
      setRolePayloadData(values.roleDataJSON);
      setShowSaveModal(true);
    },
  });

  const isUpdatedPermission = (permission) => {
    // eslint-disable-next-line no-unused-vars
    const { source, isPreviousPermission, consumer, ...restPermissionData } = permission;
    const oldPermission = find(roleData?.permissions, { id: permission?.id });
    restPermissionData.consumer = consumer.name;
    return !isEqual(oldPermission, restPermissionData);
  };

  const getRolePayloadData = (editRoleFormState) => {
    const { name, description, ...restData } = editRoleFormState;
    const permissionData = restData?.permissions ?? [];
    const massagedPermissionData = permissionData.map((permission) => {
      /* Need to check whether it is previous permission or new permission  */
      if (permission?.isPreviousPermission) {
        /* Need to check whether the previous permission is updated or not */
        if (isUpdatedPermission(permission)) {
          return {
            id: permission.id,
            description: permission.description,
            name: permission.name,
            consumer: permission.consumer.name,
            resources: permission.resources,
            actions: permission.actions,
          };
        } else {
          return {
            id: permission?.id,
          };
        }
      } else {
        return permission?.source === inlineType
          ? {
              description: permission.description,
              consumer: permission.consumer.name,
              resources: permission.resources,
              actions: permission.actions,
              name: permission.name,
            }
          : {
              id: permission.id,
            };
      }
    });
    return {
      name: name.trim(),
      description,
      permissions: massagedPermissionData,
    };
  };

  const actionButtons = () => {
    return (
      <div className={classes.editRoleLeftAction}>
        <div className={classes.editRoleSaveBtn}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              if (isForm) {
                editRoleValidation.handleSubmit();
              } else {
                editRoleValidationJSON.handleSubmit();
              }
            }}
          >
            {translatedStrings.saveBtn}
          </Button>
        </div>
        <div className={classes.editRoleResetBtn}>
          <Button variant="secondary" size="medium" onClick={() => setShowResetModal(true)}>
            {translatedStrings.resetBtn}
          </Button>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setShowCancelModal(true)}>
          {translatedStrings.cancelBtn}
        </Button>
      </div>
    );
  };

  const switchButton = () => {
    return (
      <div data-testid="switch-btn" className={classes.editRoleRightAction}>
        <Button variant="secondary" size="medium" onClick={() => setShowSwitchModal(true)}>
          {isForm ? translatedStrings.switchToJSONLabel : translatedStrings.switchToFormLabel}
        </Button>
      </div>
    );
  };

  const editRoleHeader = () => {
    return (
      <div className={classes.editRoleActionContainer}>
        {actionButtons()}
        {switchButton()}
      </div>
    );
  };

  const resetStateHandler = () => {
    if (isForm) {
      editRoleValidation.resetForm();
    } else {
      editRoleValidationJSON.resetForm();
    }
    getRoleById(roleId, history);
  };

  const handleSwitchSubmit = () => {
    // below if-else block is to fill form/json from store when user changes the view.
    if (isForm) {
      const jsonMassagedData = getRoleJSONMassagedData(roleData);
      editRoleValidationJSON.handleChange(
        editRoleValidationJSON.names.roleDataJSON,
        JSON.stringify(jsonMassagedData, undefined, 4)
      );
    } else {
      const massagedData = getPermissionTableMassagedData(roleData, consumerList);
      editRoleValidation.resetValues(massagedData);
    }
    setShowSwitchModal(false);
    setIsForm(!isForm);
  };

  const SwitchDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={isForm ? translatedStrings.switchToJSONHeader : translatedStrings.switchToFormHeader}
        message={
          isForm ? translatedStrings.switchToJSONMessage : translatedStrings.switchToFormMessage
        }
        primaryButtonText={
          isForm ? translatedStrings.switchToJSONBtn : translatedStrings.switchToFormBtn
        }
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={handleSwitchSubmit}
        onCancel={() => setShowSwitchModal(false)}
      />
    );
  };

  const handleSaveSubmit = () => {
    if (isForm) {
      editRoleData(roleId, rolePayloadData, history);
    } else {
      editRoleData(roleData?.name, rolePayloadData, history);
    }
    setShowSaveModal(false);
  };

  const SaveDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.saveModalTitle}
        message={translatedStrings.saveModalMessage}
        primaryButtonText={translatedStrings.saveModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={handleSaveSubmit}
        onCancel={() => setShowSaveModal(false)}
      />
    );
  };

  const handleResetSubmit = () => {
    resetStateHandler();
    openNotification(
      successNotificationType,
      translatedStrings.resetNotification,
      successNotificationDuration
    );
    setShowResetModal(false);
  };

  const ResetDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.resetModalTitle}
        message={translatedStrings.resetModalMessage}
        primaryButtonText={translatedStrings.resetModalPrimaryBtn}
        secondaryButtonText={translatedStrings.resetModalSecondaryBtn}
        onSubmit={handleResetSubmit}
        onCancel={() => setShowResetModal(false)}
      />
    );
  };

  const handleCancelSubmit = () => {
    setShowCancelModal(false);
    history.push(roleListingPath);
  };

  const CancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelModalTitle}
        message={translatedStrings.cancelModalMessage}
        primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={handleCancelSubmit}
        onCancel={() => setShowCancelModal(false)}
      />
    );
  };

  const getEditFormError = () => {
    return (
      <div data-testid="role-error" className={classes.editRoleErrorSnackbar}>
        <Snackbar
          title={translatedStrings.errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={editRoleError.split('|').map((msg) => `- ${msg}`) || []}
        />
      </div>
    );
  };

  return (
    <>
      {editRoleHeader()}
      {!isEmpty(editRoleError) && getEditFormError()}
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
          validationHook={editRoleValidation}
          isEditRoleMode={true}
          roleError={editRoleError}
          getApplicationsList={getApplicationsList}
          applicationsListData={applicationsListData}
          applicationsListStatus={applicationsListStatus}
          consumerListStatus={consumerListStatus}
        />
      ) : (
        !isLoading(roleDataStatus) && (
          <AddRoleJson
            openNotification={openNotification}
            validationHookJSON={editRoleValidationJSON}
            roleError={editRoleError}
          />
        )
      )}
      {showSwitchModal && <SwitchDialog />}
      {showSaveModal && <SaveDialog />}
      {showResetModal && <ResetDialog />}
      {showCancelModal && <CancelDialog />}
    </>
  );
};

EditRole.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  getRoleById: PropTypes.func,
  roleDataStatus: PropTypes.oneOf(typeOfStatus),
  roleData: PropTypes.object,
  openNotification: PropTypes.func,
  getConsumerData: PropTypes.func,
  getActionData: PropTypes.func,
  getAllPermissionsData: PropTypes.func,
  getPermissionData: PropTypes.func,
  resetPermissionData: PropTypes.func,
  resetActionData: PropTypes.func,
  consumerList: PropTypes.object,
  actionStatus: PropTypes.oneOf(typeOfStatus),
  actionList: PropTypes.object,
  permissionListStatus: PropTypes.oneOf(typeOfStatus),
  permissionList: PropTypes.object,
  permissionDataStatus: PropTypes.oneOf(typeOfStatus),
  permissionData: PropTypes.object,
  editRoleError: PropTypes.object,
  editRoleData: PropTypes.func,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  initSpinnerOverlay: PropTypes.func,
  consumerListStatus: PropTypes.string,
};

export default EditRole;
