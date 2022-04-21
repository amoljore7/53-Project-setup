import React, { useEffect, useState } from 'react';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import DialogPopup from 'britive-design-system/core/components/dialog';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Spinner from 'britive-design-system/core/components/spinner';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import useValidation from '../../../../use-validation-hook';
import { isError, isLoading, isSuccess } from '../../../../../utils/common-utils';
import { classes } from './constants';
import ViewPermissionLayout from '../../../view-policy/permission-modal/ViewPermissionLayout';

const AddExistingPermission = ({
  addPermissionHook,
  permissionsList,
  fetchPermissionDetails,
  permissionDetailsStatus,
  cancelHandler,
  addExistingPermission,
  permissionDetails,
  fetchPermissionsList,
  permissionsListStatus,
  applicationsListData,
  consumersList,
  translatedStrings,
}) => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const loadPermissionValidate = useValidation({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(translatedStrings.permissionNameValidation),
    }),
    onSubmit: () => {
      addExistingPermission();
    },
  });

  useEffect(() => {
    fetchPermissionsList();
  }, []);

  const AddActionButtons = [
    {
      text: translatedStrings.addBtn,
      variant: 'primary',
      onClick: () => {
        isSuccess(permissionDetailsStatus) && loadPermissionValidate.handleSubmit();
      },
      size: 'large',
    },
    {
      text: translatedStrings.cancelBtn,
      variant: 'secondary',
      onClick: () => {
        setCancelModalOpen(true);
      },
      size: 'large',
    },
  ];

  useEffect(() => {
    if (isSuccess(permissionDetailsStatus)) {
      const { id, actions, resources, description, consumer, isInline, name } = permissionDetails;
      const consumerObj = consumersList?.find((consumerItem) => consumerItem.name === consumer);
      const existingPermission = {
        id,
        actions: actions,
        resources: resources,
        description,
        consumer: consumerObj ?? { name: consumer, description: consumer },
        isInline,
        name,
        source: translatedStrings.predefinedType,
      };
      addPermissionHook.resetValues(existingPermission);
    }
  }, [permissionDetails]);

  const onPolicyChange = (value) => {
    fetchPermissionDetails(value.id);
    loadPermissionValidate.handleChange(loadPermissionValidate.names.name, value.name);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ModalPopup
        width={512}
        title={translatedStrings.addExistingPermissionBtn}
        buttons={AddActionButtons}
        onCancel={() => {
          setCancelModalOpen(true);
        }}
      >
        <div className={classes.entityModalScroll}>
          <div className={classes.formLoaderModal}>
            {(isLoading(permissionDetailsStatus) || isLoading(permissionsListStatus)) && (
              <Spinner size="medium" />
            )}
          </div>
          {!isLoading(permissionsListStatus) && (
            <div className={classes.addEntitySearchField}>
              <Autocomplete
                value={[{ name: loadPermissionValidate.values.name }]}
                options={permissionsList}
                label={translatedStrings.searchPermissionLabel}
                width="448px"
                onBlur={() => loadPermissionValidate.handleBlur(loadPermissionValidate.names.name)}
                onInputChange={(_, value) => {
                  if (value === '') {
                    loadPermissionValidate.handleChange(loadPermissionValidate.names.name, value);
                    addPermissionHook.resetForm();
                  }
                }}
                onChange={(_, value) => onPolicyChange(value)}
                getOptionLabel={(option) => option.name}
                error={
                  loadPermissionValidate.touched.name && Boolean(loadPermissionValidate.errors.name)
                }
                errorMessage={loadPermissionValidate.errors.name}
              />
            </div>
          )}
          {!loadPermissionValidate.errors.name &&
            !isLoading(permissionDetailsStatus) &&
            !isError(permissionDetailsStatus) && (
              <ViewPermissionLayout
                translatedStrings={translatedStrings}
                permissionData={addPermissionHook.values}
                applicationsListData={applicationsListData}
              />
            )}
        </div>
      </ModalPopup>
      {cancelModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.cancelModalTitle}
          message={translatedStrings.permissionCancelModalMessage}
          primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={cancelHandler}
          onCancel={() => {
            setCancelModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

AddExistingPermission.propTypes = {
  addPermissionHook: PropTypes.object,
  permissionsList: PropTypes.array,
  permissionDetails: PropTypes.object,
  fetchPermissionDetails: PropTypes.func,
  permissionDetailsStatus: PropTypes.string,
  cancelHandler: PropTypes.func,
  addExistingPermission: PropTypes.func,
  fetchPermissionsList: PropTypes.func,
  permissionsListStatus: PropTypes.string,
  applicationsListData: PropTypes.array,
  consumersList: PropTypes.array,
  translatedStrings: PropTypes.object,
};
export default AddExistingPermission;
