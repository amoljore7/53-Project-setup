import React, { useState } from 'react';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import DataTable from 'britive-design-system/core/components/table';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import * as yup from 'yup';
import useValidation from '../../../../use-validation-hook';
import ApiServices from '../../../../../utils/api-service';
import {
  classes,
  commaSeperator,
  key,
  allContextField,
  nameContextField,
  permissionNameTest,
  appsConsumer,
} from './constants';
import AddEditPermission from './AddEditPermission';
import AddExistingPermission from './AddExistingPermission';
import ViewPermission from '../../../view-policy/permission-modal';
import Tooltip from 'britive-design-system/core/components/tooltip';
import { uniqueId } from 'lodash';
import { getApplicationName } from '../../../../../utils/common-utils';
import './Permissions.scss';

const Permissions = ({
  fetchPermissionsList,
  permissionsList,
  fetchConsumersList,
  consumersList,
  fetchPermissionDetails,
  permissionDetails,
  fetchPermissionActions,
  permissionActionsList,
  permissionActionsListStatus,
  permissionDetailsStatus,
  openNotification,
  validationHook,
  resetActionsData,
  permissionsListStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  translatedStrings,
}) => {
  const [modal, setModal] = useState({ isOpen: false, type: '' });
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isOpenExistingInline, setOpenExistingInline] = useState(false);
  const [toDeleteRow, setToDeleteRow] = useState({ id: '', source: '' });
  const [permissionFilterLoading, setPermissionFilterLoading] = useState(false);

  const newPermissionValidationSchema = yup.object({
    name: yup
      .string()
      .required(translatedStrings.permissionNameValidation)
      .max(30, translatedStrings.inputNameMaxCharsValidation)
      .trim()
      .test(
        permissionNameTest,
        translatedStrings.permissionUniqueNameValidation,
        async (value, context) => {
          if (value.length > 30) {
            return true;
          }
          const contextField = context?.options?.context;
          if (
            (contextField === nameContextField || contextField === allContextField) &&
            value !== ''
          ) {
            setPermissionFilterLoading(true);
            try {
              const response = await ApiServices.get(
                `/api/v1/policy-admin/permissions?filter=name%20eq%20'${value}'`
              );
              setPermissionFilterLoading(false);
              return response?.data?.result?.length === 0;
            } catch ({ response }) {
              setPermissionFilterLoading(false);
              const reason = response?.data?.message || '';
              openNotification('error', reason, 3000);
              return true;
            }
          } else {
            return true;
          }
        }
      ),
    description: yup.string().max(255, translatedStrings.descriptionMaxCharValidation),
    consumer: yup.object().required(translatedStrings.consumerValidation).nullable(),
    resources: yup.string().required(translatedStrings.resourcesValidation),
    actions: yup
      .array()
      .required(translatedStrings.actionsValidation)
      .min(1, translatedStrings.actionsValidation),
  });

  const addPermissionHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      consumer: '',
      resources: '',
      actions: [],
      applications: [],
    },
    validationSchema: newPermissionValidationSchema,
    onSubmit: (values) => {
      addInlinePermission(values);
    },
  });

  const getButtons = () => {
    return (
      <div className={classes.addPermissionButtonsWrapper}>
        <div className={classes.addPermissionButtonWrapper}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              setModal({ isOpen: true, type: 'existing' });
            }}
          >
            {translatedStrings.addExistingPermissionBtn}
          </Button>
        </div>
        <div className={classes.addPermissionButtonWrapper}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              setModal({ isOpen: true, type: 'new' });
              setOpenExistingInline(false);
            }}
          >
            {translatedStrings.addNewPermissionBtn}
          </Button>
        </div>
      </div>
    );
  };

  const addInlinePermission = (values) => {
    const { description, consumer, actions, resources, name } = values;
    const isInline = true;
    const newPermission = {
      id: uniqueId(`${key}`),
      actions: actions.join(','),
      resources,
      description,
      consumer,
      isInline,
      name: name.trim(),
      isExistingInline: false,
    };
    // check if permission with same name not already created.
    let inlinePermissionNames = [];
    const currentPermissions = validationHook.values.permissions;
    [...currentPermissions].filter((permission) => {
      const { isInline, name } = permission;
      if (isInline) {
        inlinePermissionNames.push(name.toLowerCase());
      }
      return isInline;
    });

    if (inlinePermissionNames.includes(name.toLowerCase())) {
      openNotification('error', translatedStrings.inlinePermissionUniqueName, 3000);
    } else {
      validationHook.values.permissions?.push(newPermission);
      validationHook.handleBlur(validationHook.names.permissions);
      addPermissionHook.resetForm();
      openNotification('success', translatedStrings.inlinePermissionAddSuccess, 3000);
      setModal({ ...modal, isOpen: false });
    }
  };

  const resetHandler = (otherData) => {
    const { id, isInline } = otherData;
    const currentTableData = [...validationHook.values.permissions];
    const resetIndex = currentTableData.findIndex((permission) => permission.id === id);
    const previousData = currentTableData[resetIndex];
    const { description, name, consumer, resources, actions, isExistingInline } = previousData;
    const modalData = {
      id,
      name,
      description,
      consumer,
      resources,
      actions: actions.split(','),
      isInline,
      isExistingInline,
    };
    addPermissionHook.resetValues(modalData);
    setPermissionFilterLoading(false);
  };

  const saveHandler = () => {
    let currentTableData = [...validationHook.values.permissions];
    const permissionName = validationHook.names.permissions;
    const editedValues = addPermissionHook.values;
    const { id, actions, resources, description, consumer, isInline, name, isExistingInline } =
      editedValues;
    const editedPermission = {
      id,
      actions: actions.join(','),
      resources: resources,
      description: description,
      consumer,
      isInline,
      name,
      isExistingInline,
    };
    const editedIndex = currentTableData.findIndex((el) => el.id === id);
    currentTableData.splice(editedIndex, 1, editedPermission),
      validationHook.handleChange(permissionName, currentTableData);
    addPermissionHook.resetForm();
    setModal({ isOpen: false, type: '' });
    setOpenExistingInline(false);
  };

  const cancelHandler = () => {
    addPermissionHook.resetForm();
    setModal({ ...modal, isOpen: false, type: '' });
    setViewModalOpen(false);
    setOpenExistingInline(false);
    setPermissionFilterLoading(false);
  };

  const addExistingPermission = () => {
    const currentData = [...validationHook.values.permissions];
    const toBeAddedId = addPermissionHook.values.id;
    const foundIndex = currentData.findIndex((permission) => permission.id === toBeAddedId);
    if (foundIndex >= 0) {
      openNotification('error', translatedStrings.permissionAddDuplicate, 3000);
    } else {
      validationHook.values.permissions.push(addPermissionHook.values);
      validationHook.handleBlur(validationHook.names.permissions);
      openNotification('success', translatedStrings.permissionAddSuccess, 3000);
    }
    addPermissionHook.resetForm();
    setModal({ ...modal, isOpen: false });
  };

  const viewIconClickHandler = (rowData) => {
    const { id, name, description, consumer, resources, actions, isInline, isExistingInline } =
      rowData;
    let modalData = {
      id,
      name,
      description,
      consumer,
      resources,
      actions,
      isInline,
      isExistingInline,
    };
    modalData['source'] = isInline ? undefined : translatedStrings.predefinedType;
    addPermissionHook.resetValues(modalData);
    setViewModalOpen(true);
  };

  const editIconClickHandler = (rowData) => {
    const { id, name, description, consumer, resources, actions, isInline, isExistingInline } =
      rowData;
    const modalData = {
      id,
      name,
      description,
      consumer,
      resources,
      actions: actions.split(','),
      isInline,
      isExistingInline,
    };
    setOpenExistingInline(true);
    addPermissionHook.resetValues(modalData);
    setModal({ isOpen: true, type: 'new' });
  };

  const getPermissionTableView = () => {
    const columns = [
      {
        field: 'name',
        headerName: translatedStrings.permissionNameLabel,
        width: '17%',
        horizontalAlign: 'left',
      },
      {
        headerName: translatedStrings.sourceLabel,
        width: '13%',
        horizontalAlign: 'left',
        renderColumn: (row) => {
          const { isInline } = row;
          return isInline ? translatedStrings.inlineType : translatedStrings.predefinedType;
        },
      },
      {
        field: 'description',
        headerName: translatedStrings.descriptionLabel,
        horizontalAlign: 'left',
        width: '19%',
      },
      {
        field: 'consumer',
        headerName: translatedStrings.consumerLabel,
        horizontalAlign: 'left',
        width: '13%',
        renderColumn: (row) => row?.consumer?.description,
      },
      {
        field: 'actions',
        headerName: translatedStrings.actionLabel,
        width: '18%',
        horizontalAlign: 'left',
      },
      {
        field: 'resources',
        headerName: translatedStrings.resourceLabel,
        width: '19%',
        horizontalAlign: 'left',
        renderColumn: (row) => {
          if (row?.consumer?.name === appsConsumer) {
            return getApplicationName(
              Array.isArray(row?.resources)
                ? row?.resources
                : row?.resources?.split(commaSeperator),
              applicationsListData
            )?.join(commaSeperator);
          } else {
            return row?.resources;
          }
        },
      },
      {
        headerName: translatedStrings.actionColumn,
        width: '120px',
        // eslint-disable-next-line react/display-name
        renderColumn: (row) => {
          return (
            <div className={classes.permissionActionItems}>
              {row.isInline ? (
                <div
                  className={classes.permissionActionEdit}
                  onClick={() => editIconClickHandler(row)}
                >
                  <Tooltip title={translatedStrings.editPermissionTooltip} position="left">
                    <div>
                      <BsPencilSquare size={24} />
                    </div>
                  </Tooltip>
                </div>
              ) : (
                <div
                  className={classes.permissionActionView}
                  onClick={() => viewIconClickHandler(row)}
                >
                  <Tooltip title={translatedStrings.viewPermissionTooltip} position="left">
                    <div>
                      <BsEye size={24} />
                    </div>
                  </Tooltip>
                </div>
              )}
              <div
                className={classes.permissionActionDelete}
                onClick={() => {
                  setToDeleteRow({ id: row.id, source: row.source });
                  setDeleteModalOpen(true);
                }}
              >
                <Tooltip title={translatedStrings.deletePermissionTooltip} position="left">
                  <div>
                    <BsTrash size={24} />
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
        {Boolean(validationHook.values.permissions?.length) && (
          <DataTable rows={validationHook.values.permissions} columns={columns} />
        )}
      </div>
    );
  };

  const deletePermissionHandler = () => {
    const currentData = [...validationHook.values.permissions];
    const filteredData = currentData.filter((permission) => permission.id !== toDeleteRow.id);
    validationHook.handleChange(validationHook.names.permissions, filteredData);
    setToDeleteRow({ id: '', source: '' });
    setDeleteModalOpen(false);
  };

  const getDeletePermissionModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.deletePermissionModalTitle}
        message={
          addPermissionHook.values.deleteSource === translatedStrings.inlineType
            ? translatedStrings.deleteModalInlineMessage
            : translatedStrings.deleteModalPermissionMessage
        }
        primaryButtonText={translatedStrings.deleteModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={deletePermissionHandler}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
      />
    );
  };

  const addEditPremProps = {
    addPermissionHook,
    validationHook,
    permissionActionsList,
    permissionActionsListStatus,
    fetchConsumersList,
    consumersList,
    fetchPermissionActions,
    isOpenExistingInline: isOpenExistingInline,
    saveHandler,
    cancelHandler,
    resetHandler,
    permissionFilterLoading,
    resetActionsData,
    getApplicationsList,
    applicationsListData,
    applicationsListStatus,
    translatedStrings,
  };

  const addExistingProps = {
    fetchPermissionsList,
    addPermissionHook,
    permissionsList,
    fetchPermissionDetails,
    permissionDetailsStatus,
    cancelHandler,
    addExistingPermission,
    permissionDetails,
    permissionsListStatus,
    applicationsListData,
    consumersList,
    translatedStrings,
  };

  const viewPermissionProps = {
    permissionData: addPermissionHook.values,
    onCancel: cancelHandler,
    applicationsListData,
    translatedStrings,
    title: `${translatedStrings.permissionTitle} : ${addPermissionHook.values.name}`,
  };

  return (
    <div className={classes.permissionTabOuterContainer}>
      <div className={classes.addPolicyFieldWrapper}>
        <Typography variant="label2">{translatedStrings.accessType}</Typography>
        <div className={classes.addPolicyFieldValueWrapper}>
          <Typography variant="label1">{validationHook.values.allowDeny}</Typography>
        </div>
      </div>
      <Typography variant="label2">{translatedStrings.permissionsLabel}</Typography>
      {getButtons()}
      <div> </div>
      {getPermissionTableView()}
      {modal.isOpen && modal.type === 'existing' && <AddExistingPermission {...addExistingProps} />}
      {modal.isOpen && modal.type === 'new' && <AddEditPermission {...addEditPremProps} />}
      {isViewModalOpen && <ViewPermission {...viewPermissionProps} />}
      {isDeleteModalOpen && getDeletePermissionModal()}
    </div>
  );
};

Permissions.propTypes = {
  validationHook: PropTypes.object,
  fetchPermissionsList: PropTypes.func,
  permissionsList: PropTypes.array,
  fetchConsumersList: PropTypes.func,
  consumersList: PropTypes.array,
  fetchPermissionDetails: PropTypes.func,
  permissionDetails: PropTypes.object,
  fetchPermissionActions: PropTypes.func,
  permissionActionsList: PropTypes.array,
  permissionActionsListStatus: PropTypes.string,
  permissionDetailsStatus: PropTypes.string,
  openNotification: PropTypes.func,
  resetActionsData: PropTypes.func,
  isEditMode: PropTypes.bool,
  permissionsListStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  translatedStrings: PropTypes.object,
};
export default Permissions;
