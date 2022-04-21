import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from 'britive-design-system/core/components/snackbar';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import * as yup from 'yup';
import useValidation from '../../../../../components/use-validation-hook';
import { RESOURCE_STATUS, typeOfStatus } from '../../../../../utils/common-constants';
import { description, name, token, type, URL, teamsWebHookUrl } from '../common-validation';
import NotificationMediumForm from '../form/NotificationMediumForm';
import { fetchNotificationMediumFilterList } from '../../../../../services/notification-medium-service';
import './AddNotificationMedium.scss';
import { classes, notificationMediumConstants, translatedStrings } from './constants';
import { getPayloadBody } from '../utils';

const AddNotificationMedium = ({
  setPageHeader,
  history,
  postNotificationMediumData,
  resetNotificationMediumData,
  addNotificationMediumError,
  addNotificationMediumStatus,
  initSpinnerOverlay,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [notificationMediumFilterLoading, setNotificationMediumFilterLoading] = useState(false);

  const addNotificationMediumValidationSchema = yup.object({
    name: name.test(
      name,
      translatedStrings.notificationMediumNameExistValidation,
      async (value, context) => {
        const contextField = context?.options?.context;
        if (
          (contextField === notificationMediumConstants.nameText ||
            contextField === notificationMediumConstants.allText) &&
          value !== ''
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

  const addNotificationMediumValidation = useValidation({
    initialValues: {
      name: '',
      description: '',
      type: '',
      URL: '',
      token: '',
      teamsWebHookUrl: '',
    },
    validationSchema: addNotificationMediumValidationSchema,
    onSubmit: (values) => {
      const payloadData = getPayloadBody(values);
      postNotificationMediumData(payloadData, history);
    },
  });

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
  });

  useEffect(() => {
    initSpinnerOverlay({
      open: addNotificationMediumStatus === RESOURCE_STATUS.LOADING,
      size: notificationMediumConstants.mediumSize,
    });
  }, [addNotificationMediumStatus]);

  const addNotificationMediumHeader = () => {
    return (
      <div className={classes.notificationMediumActionContainer}>
        <div className={classes.notificationMediumSaveButton}>
          <Button
            variant={notificationMediumConstants.variant}
            size={notificationMediumConstants.mediumSize}
            onClick={() => {
              addNotificationMediumValidation.handleSubmit();
            }}
          >
            {translatedStrings.saveButton}
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
          history.goBack();
          resetNotificationMediumData();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const addNotificationMediumErrorSnackbar = () => {
    return (
      <div
        data-testid={notificationMediumConstants.errorSnack}
        className={classes.notificationMediumErrorSnackbar}
      >
        <Snackbar
          title={translatedStrings.errorSnackbarTitle}
          icon={<FiAlertCircle />}
          errorList={addNotificationMediumError?.message?.split('|')?.map((msg) => `- ${msg}`)}
        />
      </div>
    );
  };

  return (
    <>
      {addNotificationMediumHeader()}
      {!isEmpty(addNotificationMediumError) && addNotificationMediumErrorSnackbar()}
      <NotificationMediumForm
        notificationMediumValidation={addNotificationMediumValidation}
        notificationMediumFilterLoading={notificationMediumFilterLoading}
        formError={addNotificationMediumError?.message}
      />
      {showCancelDialog && cancelDialog()}
    </>
  );
};

AddNotificationMedium.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.object,
  postNotificationMediumData: PropTypes.func,
  resetNotificationMediumData: PropTypes.func,
  addNotificationMediumStatus: PropTypes.oneOf(typeOfStatus),
  addNotificationMediumError: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
};

export default AddNotificationMedium;
