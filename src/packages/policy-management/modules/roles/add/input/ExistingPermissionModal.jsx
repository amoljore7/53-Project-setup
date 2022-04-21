import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import Spinner from 'britive-design-system/core/components/spinner';
import Pill from 'britive-design-system/core/components/pill';
import Typography from 'britive-design-system/core/components/typography';
import isEmpty from 'lodash/isEmpty';
import differenceBy from 'lodash/differenceBy';
import useValidation from '../../../../../../components/use-validation-hook';
import * as yup from 'yup';
import {
  successNotificationDuration,
  successNotificationType,
  typeOfStatus,
} from '../../../../../../utils/common-constants';
import {
  classes,
  translatedStrings,
  preDefinedType,
  addPermissionDetailsLayout,
  viewFieldKey,
  pillKey,
  asterisk,
} from './constants';
import { isLoading } from '../../../policy/utils';
import { appsConsumer } from '../../../permissions/add/constants';
import { isSuccess } from '../../../../../../utils/common-utils';

const ExistingPermissionModal = ({
  getAllPermissionsData,
  permissionListStatus,
  permissionList,
  getPermissionData,
  permissionDataStatus,
  permissionData: loadedPermissionData,
  validationHook,
  closeExistingModal,
  openNotification,
  resetPermissionData,
  applicationsListData,
  consumerList,
  consumerListStatus,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [permissionData, setPermissionData] = useState({});

  useEffect(() => {
    if (isSuccess(permissionDataStatus) && isSuccess(consumerListStatus)) {
      const consumer = consumerList.find(
        (consumerItem) => consumerItem.name === loadedPermissionData.consumer
      );
      setPermissionData({ ...loadedPermissionData, consumer });
    }
  }, [permissionDataStatus, consumerListStatus]);

  const validationSchema = yup.object({
    permissionName: yup.string().required(translatedStrings.permissionNameValidation),
  });

  const addExistValidationHook = useValidation({
    initialValues: {
      permissionName: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleAddPermission();
    },
  });

  useEffect(() => {
    getAllPermissionsData();
  }, []);

  useEffect(() => {
    let result = [];
    if (!isEmpty(permissionList)) {
      result = differenceBy(permissionList, validationHook.values.permissions, 'id');
    }
    setPermissionOptions(result);
  }, [permissionList]);

  const AddActionButtons = [
    {
      text: translatedStrings.addBtn,
      variant: 'primary',
      onClick: () => {
        addExistValidationHook.handleSubmit();
      },
      size: 'large',
    },
    {
      text: translatedStrings.cancelBtn,
      variant: 'secondary',
      onClick: () => setShowCancelModal(true),
      size: 'large',
    },
  ];

  const getTableMassagedData = (permissionData) => {
    return {
      ...permissionData,
      source: preDefinedType,
    };
  };

  const handleAddPermission = () => {
    const massagedData = getTableMassagedData(permissionData);
    const permissionName = validationHook.names.permissions;
    validationHook.handleChange(permissionName, [
      ...validationHook.values.permissions,
      massagedData,
    ]);
    openNotification(
      successNotificationType,
      translatedStrings.addPermissionNotification,
      successNotificationDuration
    );
    closeExistingModal();
  };

  const getApplicationName = (resources) => {
    return resources.map((value) => {
      if (value === asterisk) return value;
      else {
        return applicationsListData?.find((application) => application?.appContainerId === value)
          ?.applicationName;
      }
    });
  };

  const getViewPermissionLayout = () => {
    return addPermissionDetailsLayout.map((viewPermission, index) => (
      <div key={`${viewFieldKey}${index}`} className={classes.permissionInputSpacing}>
        <div className={classes.viewPermissionModalLabel}>
          <Typography variant="label2">{viewPermission.label}</Typography>
        </div>
        {viewPermission.key === 'actions' ? (
          <div className={`${classes.viewPermissionModalValue} ${classes.viewActionPill}`}>
            {permissionData.actions.map((action, index) => (
              <div key={`${pillKey}${index}`} className={classes.pillAdjust}>
                <Pill label={action} readOnly={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.viewPermissionModalValue}>
            <Typography variant="label1">
              {Array.isArray(permissionData[viewPermission.key])
                ? viewPermission.key === 'resources' &&
                  permissionData?.consumer?.name === appsConsumer
                  ? getApplicationName(permissionData[viewPermission.key])?.join(', ')
                  : permissionData[viewPermission.key]?.join(', ')
                : viewPermission.key === 'consumer'
                ? permissionData[viewPermission.key]?.description
                : permissionData[viewPermission.key] ?? translatedStrings.noneText}
            </Typography>
          </div>
        )}
      </div>
    ));
  };

  const getCancelModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelModalTitle}
        message={translatedStrings.cancelModalMessage}
        primaryButtonText={translatedStrings.cancelModalPrimaryBtn}
        secondaryButtonText={translatedStrings.noBtn}
        onSubmit={() => {
          setShowCancelModal(false);
          closeExistingModal();
        }}
        onCancel={() => setShowCancelModal(false)}
      />
    );
  };

  return (
    <>
      <ModalPopup
        width={512}
        title={translatedStrings.addExistingPermissionTitle}
        buttons={AddActionButtons}
        onCancel={() => {
          setShowCancelModal(true);
        }}
      >
        <div className={classes.permissionModalScroll}>
          {!isLoading(permissionListStatus) && (
            <div className={`${classes.permissionInputSpacing} ${classes.alignWithLoader}`}>
              <Autocomplete
                multiple={false}
                options={permissionOptions ?? []}
                label={translatedStrings.searchPermissionLabel}
                width="448px"
                onChange={(_, value) => {
                  addExistValidationHook.handleChange(
                    addExistValidationHook.names.permissionName,
                    value.name
                  );
                  getPermissionData(value.id);
                }}
                getOptionLabel={(option) => option.name}
                value={[{ name: addExistValidationHook.values.permissionName }]}
                onBlur={() =>
                  addExistValidationHook.handleBlur(addExistValidationHook.names.permissionName)
                }
                onInputChange={(_, value) => {
                  resetPermissionData();
                  addExistValidationHook.handleChange(
                    addExistValidationHook.names.permissionName,
                    value
                  );
                }}
                error={
                  addExistValidationHook.touched.permissionName &&
                  Boolean(addExistValidationHook.errors.permissionName)
                }
                errorMessage={addExistValidationHook.errors.permissionName}
                placeholder={translatedStrings.searchPlaceholder}
              />
            </div>
          )}
          {isLoading(permissionListStatus) && (
            <div className={classes.permissionDataLoader}>
              <Spinner size="medium" message={translatedStrings.loadingPermissions} />
            </div>
          )}
          {isLoading(permissionDataStatus) ? (
            <div className={classes.permissionDataLoader}>
              <Spinner size="medium" message={translatedStrings.permissionDataLoader} />
            </div>
          ) : !isEmpty(permissionData) ? (
            getViewPermissionLayout()
          ) : null}
        </div>
      </ModalPopup>
      {showCancelModal && getCancelModal()}
    </>
  );
};

ExistingPermissionModal.propTypes = {
  getAllPermissionsData: PropTypes.func,
  permissionListStatus: PropTypes.oneOf(typeOfStatus),
  permissionList: PropTypes.object,
  getPermissionData: PropTypes.func,
  permissionDataStatus: PropTypes.oneOf(typeOfStatus),
  permissionData: PropTypes.object,
  validationHook: PropTypes.object,
  closeExistingModal: PropTypes.func,
  openNotification: PropTypes.func,
  resetPermissionData: PropTypes.func,
  applicationsListData: PropTypes.array,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};

export default ExistingPermissionModal;
