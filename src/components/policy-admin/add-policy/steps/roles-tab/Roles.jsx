import React, { useState } from 'react';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import DataTable from 'britive-design-system/core/components/table';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { BsTrash, BsEye } from 'react-icons/bs';
import { classes } from './constants';
import AddRoles from './AddRole';
import ViewRole from '../../../view-policy/role-modal';
import './Roles.scss';

const Roles = ({
  validationHook,
  fetchRolesList,
  fetchRoleDetails,
  rolesListStatus,
  rolesList,
  roleDetails,
  roleDetailsStatus,
  openNotification,
  applicationsListData,
  consumersList,
  translatedStrings,
  consumerList,
  consumerListStatus,
  roleFields,
}) => {
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isViewRoleModalOpen, setViewRoleModalOpen] = useState(false);
  const [isDeleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);
  const [viewRoleData, setViewRoleData] = useState(null);
  const [deleteRowId, setDeleteRowId] = useState('');

  const getButtons = () => {
    return (
      <div className={classes.addPermissionButtonsWrapper}>
        <Button
          variant="primary"
          size="medium"
          onClick={() => {
            setRoleModalOpen(true);
          }}
        >
          Add Role
        </Button>
      </div>
    );
  };

  const addRoleHandler = (role) => {
    const { id, name, description, permissions } = role;
    const currentData = [...validationHook.values.roles];
    const foundIndex = currentData.findIndex((permission) => permission.id === id);
    const roleDuplicateError = 'The role could not be added to the list as it already exists.';
    const roleSuccessAdd = 'The role is added to the list.';
    if (foundIndex >= 0) {
      openNotification('error', roleDuplicateError, 3000);
    } else {
      const roleInTable = {
        id,
        name,
        description,
        permissions,
      };
      validationHook.handleChange(validationHook.names.roles, [
        ...validationHook.values.roles,
        roleInTable,
      ]);
      openNotification('success', roleSuccessAdd, 3000);
    }

    setRoleModalOpen(false);
  };

  const cancelHandler = () => {
    setViewRoleData(null);
    setViewRoleModalOpen(false);
    setRoleModalOpen(false);
  };

  const viewRoleHandler = (rowData) => {
    setViewRoleData(rowData);
    setViewRoleModalOpen(true);
  };

  const deleteRoleHandler = () => {
    const currentRoles = [...validationHook.values.roles];
    const removeIndex = currentRoles.findIndex((role) => role.id === deleteRowId);
    currentRoles.splice(removeIndex, 1);
    validationHook.handleChange(validationHook.names.roles, currentRoles);
    setDeleteRoleModalOpen(false);
  };

  const DeleteRoleModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.deleteModalTitle}
        message={translatedStrings.deleteModalRoleMessage}
        primaryButtonText={translatedStrings.deleteModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={deleteRoleHandler}
        onCancel={() => {
          setDeleteRowId('');
          setDeleteRoleModalOpen(false);
        }}
      />
    );
  };

  const getRoleTableView = () => {
    const columns = [
      {
        field: 'name',
        headerName: translatedStrings.roleNameLabel,
        width: '22%',
        horizontalAlign: 'left',
      },
      {
        field: 'description',
        headerName: translatedStrings.roleDescriptionLabel,
        width: '28%',
        horizontalAlign: 'left',
      },
      {
        headerName: translatedStrings.permissionsLabel,
        horizontalAlign: 'left',
        width: '50%',
        renderColumn: (row) => {
          const permissionsValues = row?.permissions
            ?.map((permission) => permission.name)
            .join(',');
          return (
            <div className={classes.addRoleTablePermissions} title={permissionsValues}>
              {permissionsValues}
            </div>
          );
        },
      },
      {
        headerName: translatedStrings.roleActionsLabel,
        width: '120px',
        // eslint-disable-next-line react/display-name
        renderColumn: (row) => {
          return (
            <div className={classes.permissionActionItems}>
              <div className={classes.permissionActionView}>
                <Tooltip title={translatedStrings.viewRoleTooltip} position="left">
                  <div>
                    <BsEye onClick={() => viewRoleHandler(row)} size={24} />
                  </div>
                </Tooltip>
              </div>
              <div className={classes.permissionActionDelete}>
                <Tooltip title={translatedStrings.deleteRoleTooltip} position="left">
                  <div>
                    <BsTrash
                      onClick={() => {
                        setDeleteRoleModalOpen(true);
                        setDeleteRowId(row.id);
                      }}
                      size={24}
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div className={classes.entityTableSpacing}>
        {validationHook.values.roles.length !== 0 && (
          <DataTable rows={validationHook.values.roles} columns={columns} />
        )}
      </div>
    );
  };

  const addRoleProps = {
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
    consumerListStatus,
  };

  const viewRoleProps = {
    roleData: viewRoleData,
    onCancel: cancelHandler,
    applicationsListData,
    translatedStrings,
    title: translatedStrings.viewRoleTitle(viewRoleData?.name),
    width: 512,
    roleFields,
    consumerList,
    consumerListStatus,
    //
  };

  return (
    <div className={classes.stepperMainContainer}>
      <div className={classes.addPolicyFieldWrapper}>
        <Typography variant="label2">{translatedStrings.accessType}</Typography>
        <div className={classes.addPolicyFieldValueWrapper}>
          <Typography variant="label1">{validationHook.values.allowDeny}</Typography>
        </div>
      </div>
      <Typography variant="label2">{translatedStrings.rolesLabel}</Typography>
      {getButtons()}
      {getRoleTableView()}
      {isRoleModalOpen && <AddRoles {...addRoleProps} />}
      {isViewRoleModalOpen && <ViewRole {...viewRoleProps} />}
      {isDeleteRoleModalOpen && <DeleteRoleModal />}
    </div>
  );
};

Roles.propTypes = {
  validationHook: PropTypes.any,
  fetchRolesList: PropTypes.func,
  fetchRoleDetails: PropTypes.any,
  rolesList: PropTypes.array,
  rolesListStatus: PropTypes.any,
  roleDetails: PropTypes.any,
  roleDetailsStatus: PropTypes.string,
  openNotification: PropTypes.func,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  consumersList: PropTypes.array,
  translatedStrings: PropTypes.object,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
  roleFields: PropTypes.array,
};
export default Roles;
