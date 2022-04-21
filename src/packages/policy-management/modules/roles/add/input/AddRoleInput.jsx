import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Spinner from 'britive-design-system/core/components/spinner';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Pill from 'britive-design-system/core/components/pill';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { getHeightFromTop } from '../../../../../../utils/common-utils';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import useValidation from '../../../../../../components/use-validation-hook';
import * as yup from 'yup';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationDuration,
  successNotificationType,
  typeOfStatus,
} from '../../../../../../utils/common-constants';
import DataTable from '../../../../../../components/data-table/DataTable';
import InlinePermissionModal from './InlinePermissionModal';
import ExistingPermissionModal from './ExistingPermissionModal';
import ApiServices from '../../../../../../utils/api-service';
import Tooltip from 'britive-design-system/core/components/tooltip';
import {
  viewPermissionLayout,
  classes,
  translatedStrings,
  inlineType,
  keyName,
  viewFieldKey,
  pillKey,
  validation,
  asterisk,
} from './constants';

import './AddRoleInput.scss';
import {
  name,
  description,
  consumer,
  resources,
  actions,
} from '../../../permissions/common-validation';
import { appsConsumer } from '../../../permissions/add/constants';

const AddRoleInput = ({
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
  resetPermissionData,
  resetActionData,
  roleFilterLoading,
  validationHook,
  isEditRoleMode = false,
  roleError,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  consumerListStatus,
}) => {
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [openExistingPermissionModal, setOpenExistingPermissionModal] = useState(false);
  const [openViewPermissionModal, setOpenViewPermissionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameFilterLoading, setNameFilterLoading] = useState(false);
  const formContainer = useRef(null);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, roleError]);

  const newPermissionValidationSchema = yup.object({
    name: name.test(name, validation.permissionNameExit, async (value, context) => {
      const contextField = context?.options?.context;
      if ((contextField === 'name' || contextField === 'all') && value !== '') {
        if (!isEmpty(validationHook?.values?.permissions)) {
          const isPermissionFound = validationHook?.values?.permissions.find((permission) => {
            return permission?.name?.toLowerCase() === value?.toLowerCase();
          });
          if (isPermissionFound) {
            // check is need in case of edit role
            if (isPermissionFound?.id === context?.parent?.id) {
              return true;
            }
            return false;
          }
        }
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
          openNotification(errorNotificationType, reason, errorNotificationDuration);
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

  const newPermissionHook = useValidation({
    initialValues: {
      name: '',
      description: '',
      consumer: '',
      resources: '',
      actions: [],
    },
    validationSchema: newPermissionValidationSchema,
    onSubmit: (values) => {
      handleAddInlinePermission(values);
    },
  });

  const getApplicationName = (resources) => {
    return resources.map((value) => {
      if (value === asterisk) return value;
      else {
        return applicationsListData?.find((application) => application?.appContainerId === value)
          ?.applicationName;
      }
    });
  };

  const getAddPermissionAction = () => {
    return (
      <>
        <Typography variant="label2">{translatedStrings.permissionLabel}</Typography>
        <div className={classes.addPermissionAction}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setOpenExistingPermissionModal(true)}
          >
            {translatedStrings.addExistingPermissionBtn}
          </Button>
          <div className={classes.newPermissionSpace}>
            <Button variant="primary" size="medium" onClick={() => setOpenPermissionModal(true)}>
              {translatedStrings.addNewPermissionBtn}
            </Button>
          </div>
        </div>
      </>
    );
  };

  const handleDeleteClick = () => {
    const currentTableData = [...validationHook.values.permissions];
    const permissionName = validationHook.names.permissions;
    const filteredData = currentTableData.filter((permission) => permission.id !== currentRow.id);
    validationHook.handleChange(permissionName, filteredData);
    openNotification(
      successNotificationType,
      currentRow.source === inlineType
        ? translatedStrings.deleteInlineNotification
        : translatedStrings.deletePermissionNotification,
      successNotificationDuration
    );
    setCurrentRow({});
    setShowDeleteModal(false);
  };

  const getEditViewMassagedData = (permissionData) => {
    return {
      ...permissionData,
      resources: permissionData.resources.join(','),
      actions: permissionData.actions,
    };
  };

  const handleEditClick = (row) => {
    const massagedData = getEditViewMassagedData(row);
    newPermissionHook.resetValues(massagedData);
    getActionData(massagedData?.consumer?.name);
    setIsEditMode(true);
    setOpenPermissionModal(true);
  };

  const getPermissionTableView = () => {
    const handleViewClick = (row) => {
      setCurrentRow(row);
      setOpenViewPermissionModal(true);
    };

    const handleDeleteClick = (row) => {
      setCurrentRow(row);
      setShowDeleteModal(true);
    };

    const columns = [
      {
        field: 'name',
        headerName: translatedStrings.permissionNameLabel,
        width: '16%',
        horizontalAlign: 'left',
      },
      {
        field: 'source',
        headerName: translatedStrings.sourceLabel,
        width: '12%',
        horizontalAlign: 'left',
      },
      {
        field: 'description',
        headerName: translatedStrings.descriptionLabel,
        horizontalAlign: 'left',
        width: '21%',
      },
      {
        field: 'consumer',
        headerName: translatedStrings.consumerLabel,
        horizontalAlign: 'left',
        width: '12%',
        renderColumn: (row) => {
          return row?.consumer?.description || row?.consumer?.name;
        },
      },
      {
        field: 'actions',
        headerName: translatedStrings.actionLabel,
        width: '18%',
        horizontalAlign: 'left',
        renderColumn: (row) => row.actions.join(', '),
      },
      {
        field: 'resources',
        headerName: translatedStrings.resourceLabel,
        width: '21%',
        horizontalAlign: 'left',
        renderColumn: (row) => {
          if (row?.consumer?.name === appsConsumer) {
            return getApplicationName(row?.resources)?.join(', ');
          } else {
            return row?.resources?.join(', ');
          }
        },
      },
      {
        headerName: translatedStrings.actionColumn,
        width: '183px',
        // eslint-disable-next-line react/display-name
        renderColumn: (row) => {
          return (
            <div className={classes.permissionActionIcons}>
              {row.source === inlineType ? (
                <div className={classes.permissionActionEdit}>
                  <Tooltip title={translatedStrings.editPermissionTooltip} position="left">
                    <div>
                      <BsPencilSquare onClick={() => handleEditClick(row)} size={24} />
                    </div>
                  </Tooltip>
                </div>
              ) : (
                <div className={classes.permissionActionView}>
                  <Tooltip title={translatedStrings.viewPermissionTooltip} position="left">
                    <div>
                      <BsEye onClick={() => handleViewClick(row)} size={24} />
                    </div>
                  </Tooltip>
                </div>
              )}
              <div className={classes.permissionActionDelete}>
                <Tooltip title={translatedStrings.deletePermissionTooltip} position="left">
                  <div>
                    <BsTrash onClick={() => handleDeleteClick(row)} size={24} />
                  </div>
                </Tooltip>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div className={classes.permissionTableSpacing}>
        <DataTable rows={validationHook.values.permissions} columns={columns} />
      </div>
    );
  };

  const getPermissionEmptyError = () => {
    if (validationHook.touched.permissions && Boolean(validationHook.errors.permissions)) {
      return (
        <div className={classes.permissionEmptyError}>
          <Typography variant="caption1">{validationHook.errors.permissions}</Typography>
        </div>
      );
    } else {
      return null;
    }
  };

  const getRoleForm = () => {
    return (
      <>
        <div className={`${classes.roleInputSpacing} ${classes.alignWithLoader}`}>
          <Textfield
            value={validationHook.values.name}
            onChange={(e) => validationHook.handleChange(validationHook.names.name, e.target.value)}
            label={translatedStrings.roleLabel}
            type="text"
            width={'500px'}
            onBlur={() => validationHook.handleBlur(validationHook.names.name)}
            error={validationHook.touched.name && Boolean(validationHook.errors.name)}
            errorMsg={validationHook.errors.name}
          />
          <div className={classes.formLoader}>
            {roleFilterLoading ? <Spinner size="small" /> : null}
          </div>
        </div>
        <div className={classes.roleInputSpacing}>
          <Textarea
            value={validationHook.values.description}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.description, e.target.value)
            }
            label={translatedStrings.descriptionLabel}
            helperText={translatedStrings.descriptionHelperLabel}
            type="text"
            width={'500px'}
            height={'72px'}
            onBlur={() => {
              validationHook.handleBlur(validationHook.names.description);
            }}
            error={validationHook.touched.description && Boolean(validationHook.errors.description)}
            errorMsg={validationHook.errors.description}
          />
        </div>
        {getAddPermissionAction()}
        {getPermissionEmptyError()}
        {!isEmpty(validationHook.values.permissions) && getPermissionTableView()}
      </>
    );
  };

  const getViewPermissionModal = () => {
    return (
      <ModalPopup
        width={512}
        title={`${translatedStrings.permissionTitle} : ${currentRow?.name}`}
        onCancel={() => {
          setCurrentRow({});
          setOpenViewPermissionModal(false);
        }}
      >
        <div className={classes.permissionModalScroll}>{getViewPermissionLayout()}</div>
      </ModalPopup>
    );
  };

  const getViewPermissionLayout = () => {
    return viewPermissionLayout.map((viewPermission, index) => {
      return (
        <div key={`${viewFieldKey}${index}`} className={classes.permissionInputSpacing}>
          <div className={classes.viewPermissionModalLabel}>
            <Typography variant="label2">{viewPermission.label}</Typography>
          </div>
          {viewPermission.key === 'actions' ? (
            <div className={`${classes.viewPermissionModalValue} ${classes.viewActionPill}`}>
              {currentRow.actions.map((action, index) => (
                <div key={`${pillKey}${index}`} className={classes.pillAdjust}>
                  <Pill label={action} readOnly={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.viewPermissionModalValue}>
              <Typography variant="label1">
                {Array.isArray(currentRow[viewPermission.key])
                  ? viewPermission.key === 'resources' &&
                    currentRow?.consumer?.name === appsConsumer
                    ? getApplicationName(currentRow[viewPermission.key])?.join(', ')
                    : currentRow[viewPermission.key].join(', ')
                  : viewPermission.key === 'consumer'
                  ? currentRow[viewPermission.key]?.description
                  : currentRow[viewPermission.key] ?? translatedStrings.noneText}
              </Typography>
            </div>
          )}
        </div>
      );
    });
  };

  const getDeleteModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.deleteModalTitle}
        message={
          currentRow.source === inlineType
            ? translatedStrings.deleteModalInlineMessage
            : translatedStrings.deleteModalPermissionMessage
        }
        primaryButtonText={translatedStrings.deleteModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={handleDeleteClick}
        onCancel={() => {
          setCurrentRow({});
          setShowDeleteModal(false);
        }}
      />
    );
  };

  const closeExistingModal = () => {
    resetPermissionData();
    setOpenExistingPermissionModal(false);
  };

  const resetStateHandler = () => {
    if (isEditMode) {
      setIsEditMode(false);
    }
    newPermissionHook.resetForm();
    resetActionData();
    setOpenPermissionModal(false);
  };

  const getTableMassagedData = (permissionData) => {
    const result = {
      ...permissionData,
      id: uniqueId(`${keyName}`),
      source: inlineType,
      resources: permissionData.resources.split(','),
      actions: permissionData.actions,
      name: permissionData.name.trim(),
    };

    return result;
  };

  const handleAddInlinePermission = (values) => {
    const massagedData = getTableMassagedData(values);
    const permissionName = validationHook.names.permissions;
    validationHook.handleChange(permissionName, [
      ...validationHook.values.permissions,
      massagedData,
    ]);
    openNotification(
      successNotificationType,
      translatedStrings.addInlineNotification,
      successNotificationDuration
    );
    resetStateHandler();
  };

  const getEditResultMassagedData = (permissionData) => {
    const result = {
      ...permissionData,
      resources: permissionData.resources.split(','),
      actions: permissionData.actions,
    };
    return result;
  };

  const saveInlineHandler = () => {
    const currentTableData = [...validationHook.values.permissions];
    const permissionName = validationHook.names.permissions;
    const index = currentTableData.findIndex(
      (permission) => permission.id === newPermissionHook.values.id
    );
    const massagedData = getEditResultMassagedData(newPermissionHook.values);
    currentTableData.splice(index, 1, massagedData);
    validationHook.handleChange(permissionName, currentTableData);
    openNotification(
      successNotificationType,
      translatedStrings.saveInlineNotification,
      successNotificationDuration
    );
    resetStateHandler();
  };

  const resetInlineHandler = () => {
    const currentTableData = [...validationHook.values.permissions];
    const index = currentTableData.findIndex(
      (permission) => permission.id === newPermissionHook.values.id
    );
    const massagedData = getEditViewMassagedData(currentTableData[index]);
    newPermissionHook.resetValues(massagedData);
    openNotification(
      successNotificationType,
      translatedStrings.resetNotification,
      successNotificationDuration
    );
    getActionData(massagedData?.consumer?.name);
  };

  const cancelInlineHandler = () => {
    resetStateHandler();
  };

  return (
    <>
      <div className={classes.roleInputFormContainer} ref={formContainer}>
        {getRoleForm()}
      </div>
      {openPermissionModal && (
        <InlinePermissionModal
          actionList={actionList}
          consumerList={consumerList}
          getActionData={getActionData}
          actionStatus={actionStatus}
          newPermissionHook={newPermissionHook}
          nameFilterLoading={nameFilterLoading}
          isEditMode={isEditMode}
          saveInlineHandler={saveInlineHandler}
          resetActionData={resetActionData}
          resetInlineHandler={resetInlineHandler}
          cancelInlineHandler={cancelInlineHandler}
          isEditRoleMode={isEditRoleMode}
          getApplicationsList={getApplicationsList}
          applicationsListData={applicationsListData}
          applicationsListStatus={applicationsListStatus}
        />
      )}
      {openExistingPermissionModal && (
        <ExistingPermissionModal
          getAllPermissionsData={getAllPermissionsData}
          permissionListStatus={permissionListStatus}
          permissionList={permissionList}
          getPermissionData={getPermissionData}
          permissionDataStatus={permissionDataStatus}
          permissionData={permissionData}
          validationHook={validationHook}
          closeExistingModal={closeExistingModal}
          openNotification={openNotification}
          resetPermissionData={resetPermissionData}
          applicationsListData={applicationsListData}
          consumerList={consumerList?.result || []}
          consumerListStatus={consumerListStatus}
        />
      )}
      {openViewPermissionModal && getViewPermissionModal()}
      {showDeleteModal && getDeleteModal()}
    </>
  );
};

AddRoleInput.propTypes = {
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
  resetPermissionData: PropTypes.func,
  resetActionData: PropTypes.func,
  roleFilterLoading: PropTypes.bool,
  validationHook: PropTypes.any,
  isEditRoleMode: PropTypes.bool,
  roleError: PropTypes.any,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  consumerListStatus: PropTypes.string,
};

export default AddRoleInput;
