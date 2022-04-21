import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import useValidation from '../../../../../components/use-validation-hook';
import isEmpty from 'lodash/isEmpty';
import {
  errorNotificationDuration,
  warningNotificationType,
} from '../../../../../utils/common-constants';
import { classes, translatedStrings, previousPath } from './constants';
import { openNotification } from '../../../../../components/notification/action';
import * as yup from 'yup';
import {  description } from '../common-validation';
import { isSuccess } from '../../../../../utils/common-utils';
import { editString } from '../all-secrets/constants';
import './EditSecret.scss';
import { resetSecretDetails, resetSecretTemplateDetails } from '../all-secrets/secret-view/action';
import AddSecretForm from '../add/AddSecretForm';

const EditSecret = ({
  setPageHeader,
  location,
  getSecretDetails,
  resetEditSecret,
  secretTemplateDetails,
  secretDetails,
  updateSecret,
  editSecretError,
  editSecretStatus,
  vaultId,
  history,
  secretTemplateDetailsStatus,
}) => {
  const [dynamicValues, setDynamicValues] = useState({});
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isResetDialogOpen, setResetDialogOpen] = useState(false);
  const [dynamicValuesCopy, setDynamicValuesCopy] = useState({});
  const dispatch = useDispatch();

  const { search } = location;
  const params = new URLSearchParams(search);
  const paramsObject = Object.fromEntries(params.entries());
  const parentsPath = paramsObject.path;
  let selectedItemParentsArray = parentsPath?.split('/');
  let requiredSelectedItemParentsArray = [];
  for (const i in selectedItemParentsArray) {
    if (selectedItemParentsArray[i])
      requiredSelectedItemParentsArray.push({ label: selectedItemParentsArray[i] });
  }

  useEffect(() => {
    if (!isEmpty(vaultId)) getSecretDetails(['', ...requiredSelectedItemParentsArray]);
  }, [vaultId]);

  useEffect(() => {
    if (isSuccess(editSecretStatus)) {
      history.push({ pathname: previousPath, state: { previousPath: editString } });
    }
  }, [editSecretStatus]);

  useEffect(() => {
    setPageHeader(translatedStrings.editSecretTitle, []);
    return () => {
      editSecretHook.resetForm();
      setDynamicValues({});
      resetEditSecret();
      dispatch(resetSecretDetails());
      dispatch(resetSecretTemplateDetails());
    };
  }, []);

  const editSecretValidationSchema = yup.object({
    description,
  });

  const editSecretHook = useValidation({
    initialValues: {
      name: secretDetails?.name,
      description: secretDetails?.description,
    },
    validationSchema: editSecretValidationSchema,
    onSubmit: (values) => {
      const payloadBody = getRequestBody(values);
      if (!Object.entries(payloadBody).length) {
        dispatch(
          openNotification(
            warningNotificationType,
            translatedStrings.noFieldChangedMessage,
            true,
            errorNotificationDuration
          )
        );
        return;
      }
      updateSecret(payloadBody, requiredSelectedItemParentsArray, history);
    },
  });

  const getRequestBody = ({ name, description }) => {
    let finalData = {};
    let finalDynamicValues = {};
    if (name !== secretDetails.name) {
      finalData.name = name;
    }
    if (description !== secretDetails.description) {
      finalData.description = description;
    }
    for (let key in dynamicValues) {
      if (dynamicValues[key] !== dynamicValuesCopy[key])
        finalDynamicValues[key] = dynamicValues[key];
    }
    if (Object.keys(finalDynamicValues).length) finalData.value = finalDynamicValues;

    return finalData;
  };

  const getResetDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.resetSecretDialogTitle}
        message={translatedStrings.resetSecretDialogMessage}
        primaryButtonText={translatedStrings.resetSecretDialogPrimaryButtonText}
        secondaryButtonText={translatedStrings.resetSecretDialogSecondaryButtonText}
        onSubmit={() => {
          editSecretHook.handleChange(editSecretHook.names.name, secretDetails.name);
          editSecretHook.handleChange(editSecretHook.names.description, secretDetails.description);
          secretTemplateDetails?.parameters?.forEach((item) => {
            setDynamicValues((dynamicValues) => {
              return { ...dynamicValues, [item.name]: secretDetails?.value[item.name] ?? '' };
            });
          });
          setResetDialogOpen(false);
        }}
        onCancel={() => setResetDialogOpen(false)}
      />
    );
  };

  const editSecretHeader = () => {
    return (
      <div className={classes.editSecretActionsContainer}>
        <div className={classes.editSecretSaveButton}>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              editSecretHook.handleSubmit();
            }}
          >
            {translatedStrings.saveButtonText}
          </Button>
        </div>
        <div className={classes.editSecretSaveButton}>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              setResetDialogOpen(true);
            }}
          >
            {translatedStrings.resetButtonText}
          </Button>
        </div>
        <Button
          variant="secondary"
          size="medium"
          onClick={() => {
            setCancelDialogOpen(true);
          }}
        >
          {translatedStrings.cancelButtonText}
        </Button>
      </div>
    );
  };
  return (
    <>
      {editSecretHeader()}
      <AddSecretForm
        addSecretHook={editSecretHook}
        staticSecretTemplateList={[]}
        secretTemplateDetailsStatus={secretTemplateDetailsStatus}
        secretTemplateDetails={secretTemplateDetails}
        secretFilterLoading={false}
        secretSubmitError={editSecretError}
        dynamicValues={dynamicValues}
        setDynamicValues={setDynamicValues}
        openNotification={openNotification}
        staticSecretTemplateListStatus={''}
        isCancelDialogOpen={isCancelDialogOpen}
        isEditMode={true}
        setDynamicValuesCopy={setDynamicValuesCopy}
        secretDetails={secretDetails}
        setCancelDialogOpen={setCancelDialogOpen}
        history={history}
      />
      {isResetDialogOpen && getResetDialog()}
    </>
  );
};

EditSecret.propTypes = {
  setPageHeader: PropTypes.func,
  getSecretDetails: PropTypes.func,
  resetEditSecret: PropTypes.func,
  secretTemplateDetails: PropTypes.any,
  secretDetails: PropTypes.any,
  history: PropTypes.any,
  vaultId: PropTypes.string,
  updateSecret: PropTypes.any,
  editSecretError: PropTypes.string,
  editSecretStatus: PropTypes.string,
  location: PropTypes.any,
  secretTemplateDetailsStatus: PropTypes.string,
};

export default EditSecret;
