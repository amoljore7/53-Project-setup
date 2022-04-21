import React, { useEffect, useState } from 'react';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import DialogPopup from 'britive-design-system/core/components/dialog';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Spinner from 'britive-design-system/core/components/spinner';
import PropTypes from 'prop-types';
import ViewRoleLayout from '../../../view-policy/role-modal/ViewRoleLayout';
import * as yup from 'yup';
import useValidation from '../../../../use-validation-hook';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { isLoading } from '../../../../../utils/common-utils';
import { classes } from './constants';
import './Roles.scss';

const AddRoles = ({
  addRoleHandler,
  cancelHandler,
  fetchRolesList,
  rolesList,
  rolesListStatus,
  roleDetailsStatus,
  fetchRoleDetails,
  roleDetails,
  applicationsListData,
  consumersList,
  translatedStrings,
  roleFields,
}) => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [role, setRole] = useState(null);

  const loadRoleValidate = useValidation({
    initialValues: {
      name: '',
    },

    validationSchema: yup.object({
      name: yup.string().required(translatedStrings.roleNameRequiredValidation),
    }),
    onSubmit: () => {
      addRoleHandler(role);
    },
  });

  const AddActionButtons = [
    {
      text: translatedStrings.addBtn,
      variant: 'primary',
      onClick: () => {
        if (roleDetailsStatus === RESOURCE_STATUS.SUCCESS) {
          loadRoleValidate.handleSubmit();
        }
        setRole(null);
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
    fetchRolesList();
  }, []);

  useEffect(() => {
    setRole(null);
    if (roleDetailsStatus === RESOURCE_STATUS.SUCCESS) {
      const { id, name, description, permissions } = roleDetails;
      const permissionsWithConsumerObject = permissions?.map((permission) => {
        const consumerObject = consumersList?.find(
          (consumerItem) => consumerItem.name === permission.consumer
        );
        return {
          ...permission,
          consumer: consumerObject ?? {
            name: permission.consumer,
            description: permission.consumer,
          },
        };
      });
      setRole({ id, name, description, permissions: permissionsWithConsumerObject });
    }
  }, [roleDetails]);

  const roleChangeHandler = (value) => {
    loadRoleValidate.handleChange(loadRoleValidate.names.name, value.name);
    fetchRoleDetails(value.id);
  };

  return (
    <>
      <ModalPopup
        width={512}
        title={translatedStrings.addRole}
        buttons={AddActionButtons}
        onCancel={() => {
          setCancelModalOpen(true);
        }}
      >
        <div className={classes.entityModalScroll}>
          <div className={classes.formLoaderModal}>
            {(roleDetailsStatus === RESOURCE_STATUS.LOADING ||
              rolesListStatus === RESOURCE_STATUS.LOADING) && <Spinner size="medium" />}
          </div>
          {!isLoading(rolesListStatus) && (
            <div className={classes.addEntitySearchField}>
              <Autocomplete
                options={rolesList}
                value={[{ name: loadRoleValidate.values.name }]}
                label="Search Role"
                width="448px"
                onInputChange={(_, value) => {
                  if (!value) {
                    loadRoleValidate.handleChange(loadRoleValidate.names.name, value);
                    setRole(null);
                  }
                }}
                onBlur={() => {
                  loadRoleValidate.handleBlur(loadRoleValidate.names.name);
                }}
                onChange={(_, value) => roleChangeHandler(value)}
                getOptionLabel={(option) => option.name}
                error={loadRoleValidate.touched.name && Boolean(loadRoleValidate.errors.name)}
                errorMessage={loadRoleValidate.errors.name}
                multiple={false}
              />
            </div>
          )}
          {role && loadRoleValidate.isValid() && roleDetailsStatus !== RESOURCE_STATUS.LOADING && (
            <div className={classes.viewRoleEntityModalScroll}>
              <ViewRoleLayout
                roleData={role}
                applicationsListData={applicationsListData}
                translatedStrings={translatedStrings}
                roleFields={roleFields}
              />
            </div>
          )}
        </div>
      </ModalPopup>
      {cancelModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.cancelModalTitle}
          message={translatedStrings.roleCancelModalMessage}
          primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
          secondaryButtonText={translatedStrings.noBtn}
          onSubmit={() => {
            setRole(null);
            cancelHandler();
          }}
          onCancel={() => {
            setRole(null);
            setCancelModalOpen(false);
          }}
        />
      )}
    </>
  );
};

AddRoles.propTypes = {
  addRoleHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  fetchRoleDetails: PropTypes.func,
  fetchRolesList: PropTypes.func,
  rolesList: PropTypes.array,
  rolesListStatus: PropTypes.string,
  roleDetailsStatus: PropTypes.string,
  roleDetails: PropTypes.object,
  validationHook: PropTypes.object,
  applicationsListData: PropTypes.array,
  consumersList: PropTypes.array,
  translatedStrings: PropTypes.object,
  roleFields: PropTypes.any,
  consumerListStatus: PropTypes.array,
};

export default AddRoles;
