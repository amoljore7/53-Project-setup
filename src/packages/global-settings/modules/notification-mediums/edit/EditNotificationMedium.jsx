import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import * as yup from 'yup';
import useValidation from '../../../../../components/use-validation-hook';
import {
  RESOURCE_STATUS,
  successNotificationDuration,
  typeOfStatus,
} from '../../../../../utils/common-constants';
import { useParams } from 'react-router-dom';

import { description, name, token, type, URL, teamsWebHookUrl } from '../common-validation';
import NotificationMediumForm from '../form/NotificationMediumForm';
import { fetchNotificationMediumFilterList } from '../../../../../services/notification-medium-service';
import { notificationMediumConstants, translatedStrings } from './constants';
import { classes } from '../add/constants';
import { getPayloadBody, webHookUrl } from '../utils';

const EditNotificationMedium = ({
  setPageHeader,
  history,
  postNotificationMediumData,
  resetNotificationMediumData,
  editNotificationMediumError,
  editNotificationMediumStatus,
  initSpinnerOverlay,
  getNotificationMediumById,
  editNotificationMediumDataStatus,
  editNotificationMediumData,
  openNotification,
  resetEditNotificationMediumData,
}) => {
  const [notificationMediumFilterLoading, setNotificationMediumFilterLoading] = useState(false);
  const { id: notificationMediumId } = useParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const editNotificationMediumValidationSchema = yup.object({
    name: name.test(
      name,
      translatedStrings.notificationMediumNameExistValidation,
      async (value, context) => {
        const contextField = context?.options?.context;
        if (
          (contextField === notificationMediumConstants.nameText ||
            contextField === notificationMediumConstants.allText) &&
          value !== '' &&
          editNotificationMediumValidation?.values?.name !== editNotificationMediumData?.name
        ) {
          setNotificationMediumFilterLoading(true);
          try {
            const response = await fetchNotificationMediumFilterList({
              search: value,
              filter: 'eq',
            });
            setNotificationMediumFilterLoading(false);
            return !response?.data?.result?.length;
          } catch (error) {
            setNotificationMediumFilterLoading(false);
            return true;
          }
        } else {
          return true;
        }
      }
    ),
    description,
    type,
    URL,
    token,
    teamsWebHookUrl,
  });

  const editNotificationMediumValidation = useValidation({
    initialValues: {
      name: '',
      description: '',
      type: '',
      URL: '',
      token: '',
      teamsWebHookUrl: '',
    },
    validationSchema: editNotificationMediumValidationSchema,
    onSubmit: (values) => {
      const payloadData = getPayloadBody(values);
      postNotificationMediumData(notificationMediumId, payloadData, history);
    },
  });

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    getNotificationMediumById(notificationMediumId, history);
  }, []);

  useEffect(() => {
    if (!isEmpty(editNotificationMediumData)) {
      const { name, description, type, connectionParameters } = editNotificationMediumData;
      const editMediumMassagesData = {
        name,
        description: description || '',
        type,
        URL: connectionParameters?.URL || '',
        token: connectionParameters?.token || '',
        teamsWebHookUrl: connectionParameters?.[webHookUrl] || '',
      };
      editNotificationMediumValidation.resetValues({ ...editMediumMassagesData });
    }
  }, [editNotificationMediumData]);

  useEffect(() => {
    initSpinnerOverlay({
      open:
        editNotificationMediumDataStatus === RESOURCE_STATUS.LOADING ||
        editNotificationMediumStatus === RESOURCE_STATUS.LOADING,
      size: notificationMediumConstants.mediumSize,
    });
  }, [editNotificationMediumStatus]);

  const resetDialog = () => {
    return (
      <DialogPopup
        type={notificationMediumConstants.alertText}
        title={translatedStrings.resetDialogTitle}
        message={translatedStrings.resetDialogMessage}
        primaryButtonText={translatedStrings.resetDialogPrimaryButton}
        secondaryButtonText={translatedStrings.resetDialogSecondaryButton}
        onSubmit={handleResetSubmit}
        onCancel={() => setShowResetDialog(false)}
      />
    );
  };

  const handleResetSubmit = () => {
    editNotificationMediumValidation.resetForm();
    !isEmpty(editNotificationMediumError) && resetEditNotificationMediumData();
    getNotificationMediumById(notificationMediumId, history);
    openNotification(
      notificationMediumConstants.successText,
      translatedStrings.resetNotificationMessage,
      successNotificationDuration
    );
    setShowResetDialog(false);
  };

  const saveDialog = () => {
    return (
      <DialogPopup
        type={notificationMediumConstants.alertText}
        title={translatedStrings.saveDialogTitle}
        message={translatedStrings.saveDialogMessage}
        primaryButtonText={translatedStrings.saveDialogPrimaryButton}
        secondaryButtonText={translatedStrings.saveDialogSecondaryButton}
        onSubmit={handleSaveSubmit}
        onCancel={() => setShowSaveDialog(false)}
      />
    );
  };

  const handleSaveSubmit = () => {
    const payloadData = getPayloadBody(editNotificationMediumValidation.values);
    postNotificationMediumData(notificationMediumId, payloadData, history);
    setShowSaveDialog(false);
  };

  const editNotificationMediumHeader = () => {
    return (
      <div className={classes.notificationMediumActionContainer}>
        <div className={classes.notificationMediumSaveButton}>
          <Button
            variant={notificationMediumConstants.variant}
            size={notificationMediumConstants.mediumSize}
            onClick={() => {
              if (editNotificationMediumValidation.isValid()) {
                setShowSaveDialog(true);
              } else {
                editNotificationMediumValidation.handleSubmit();
              }
            }}
          >
            {translatedStrings.saveButton}
          </Button>
        </div>
        <div className={classes.notificationMediumSaveButton}>
          <Button
            variant={notificationMediumConstants.secVariant}
            size={notificationMediumConstants.mediumSize}
            onClick={() => setShowResetDialog(true)}
          >
            {translatedStrings.resetButton}
          </Button>
        </div>
        <Button
          variant={notificationMediumConstants.secVariant}
          size={notificationMediumConstants.mediumSize}
          onClick={() => setShowCancelDialog(true)}
        >
          {translatedStrings.cancelButton}
        </Button>
      </div>
    );
  };

  const cancelDialog = () => {
    return (
      <DialogPopup
        type={notificationMediumConstants.alertText}
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.cancelDialogPrimaryButton}
        secondaryButtonText={translatedStrings.noButton}
        onSubmit={() => {
          setShowCancelDialog(false);
          history.push('/admin/global-settings/notification-medium');
          resetNotificationMediumData();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const editNotificationMediumErrorSnackbar = () => {
    return (
      <div
        data-testid={notificationMediumConstants.errorSnack}
        className={classes.notificationMediumErrorSnackbar}
      >
        <Snackbar
          title={translatedStrings.errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={editNotificationMediumError?.message?.split('|')?.map((msg) => `- ${msg}`)}
        />
      </div>
    );
  };

  return (
    <>
      {editNotificationMediumHeader()}
      {!isEmpty(editNotificationMediumError) && editNotificationMediumErrorSnackbar()}
      <NotificationMediumForm
        notificationMediumValidation={editNotificationMediumValidation}
        notificationMediumFilterLoading={notificationMediumFilterLoading}
        formError={editNotificationMediumError?.message}
        isEdit={true}
      />
      {showCancelDialog && cancelDialog()}
      {showResetDialog && resetDialog()}
      {showSaveDialog && saveDialog()}
    </>
  );
};

EditNotificationMedium.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.object,
  postNotificationMediumData: PropTypes.func,
  resetNotificationMediumData: PropTypes.func,
  editNotificationMediumStatus: PropTypes.oneOf(typeOfStatus),
  editNotificationMediumDataStatus: PropTypes.oneOf(typeOfStatus),
  editNotificationMediumError: PropTypes.object,
  editNotificationMediumData: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  getNotificationMediumById: PropTypes.func,
  openNotification: PropTypes.func,
  resetEditNotificationMediumData: PropTypes.func,
};

export default EditNotificationMedium;
