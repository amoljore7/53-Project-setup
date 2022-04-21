import React, { useEffect, useRef, useState } from 'react';
import TextField from 'britive-design-system/core/components/textfield';
import TextArea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import Spinner from 'britive-design-system/core/components/spinner';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Snackbar from '../../../../../components/snackbar';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Button from 'britive-design-system/core/components/button';
import {
  classes,
  dynamicFieldKeyPrefix,
  iconDefaultSize,
  previousPath,
  rotationIntervalValueSuffix,
  translatedStrings,
} from './constants';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  requestStaticSecretTemplateById,
  resetStaticSecretTemplateView,
} from '../../static-secret-template/view/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  infoNotificationDuration,
  infoNotificationType,
} from '../../../../../utils/common-constants';
import { getHeightFromTop, isError, isSuccess } from '../../../../../utils/common-utils';
import ApiServices from '../../../../../utils/api-service';
import { fetchPasswordPolicyData } from '../../password-policies/view/service';
import { addString, editString } from '../all-secrets/constants';
import { isEmpty } from 'lodash';

const AddSecretForm = ({
  addSecretHook,
  staticSecretTemplateList,
  secretTemplateDetailsStatus,
  secretTemplateDetails,
  secretFilterLoading,
  passwordPolicyName,
  setPasswordPolicyName,
  secretSubmitError,
  dynamicValues,
  setDynamicValues,
  openNotification,
  staticSecretTemplateListStatus,
  isEditMode = false,
  isCancelDialogOpen,
  setCancelDialogOpen,
  secretDetails,
  setDynamicValuesCopy,
  history,
}) => {
  const dispatch = useDispatch();
  const formContainer = useRef(null);
  const [maskedFields, setMaskedFields] = useState({});
  const [isGeneratePasswordLoading, setGeneratePasswordLoading] = useState(false);
  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, secretSubmitError]);

  useEffect(() => {
    if (isError(staticSecretTemplateListStatus))
      history.push({
        pathname: previousPath,
        state: { previousPath: isEditMode ? editString : addString },
      });
  }, [staticSecretTemplateListStatus]);

  useEffect(() => {
    secretTemplateDetails?.parameters?.map((item) => {
      setMaskedFields((maskedFields) => {
        return { ...maskedFields, [item.name]: item.mask };
      });
      setDynamicValues((dynamicValues) => {
        return { ...dynamicValues, [item.name]: '' };
      });
    });
    if (secretTemplateDetails.passwordPolicyId && !isEditMode) {
      const fetchData = async () => {
        try {
          const response = await fetchPasswordPolicyData(secretTemplateDetails?.passwordPolicyId);
          setPasswordPolicyName(response.name);
        } catch ({ response }) {
          const reason = response?.data?.message || '';
          dispatch(
            openNotification(
              errorNotificationType,
              translatedStrings.generatePasswordFail(reason),
              true,
              errorNotificationDuration
            )
          );
        }
      };
      fetchData();
    }
  }, [secretTemplateDetails]);

  useEffect(() => {
    addSecretHook.handleChange(addSecretHook.names.name, secretDetails?.name);
    addSecretHook.handleChange(addSecretHook.names.description, secretDetails?.description);
  }, [secretDetails]);

  useEffect(() => {
    if (isEditMode) {
      secretTemplateDetails?.parameters?.forEach((item) => {
        // callback signature is used to refer latest value of state variable
        setMaskedFields((maskedFields) => {
          return { ...maskedFields, [item.name]: item.mask };
        });
        setDynamicValues((dynamicValues) => {
          return { ...dynamicValues, [item.name]: secretDetails?.value[item.name] };
        });
        setDynamicValuesCopy((dynamicValuesCopy) => {
          return { ...dynamicValuesCopy, [item.name]: secretDetails?.value[item.name] };
        });
      });
    }
  }, [secretTemplateDetails, secretDetails]);

  const maskHandler = (name) => {
    setMaskedFields({ ...maskedFields, [name]: !maskedFields[name] });
  };

  const getDynamicField = (item, index) => {
    switch (item.type) {
      case 'singleLine': {
        const singleLineTextFieldProps = {
          value: dynamicValues[item.name],
          onChange: (e) => setDynamicValues({ ...dynamicValues, [item.name]: e.target.value }),
          label: item.name,
          helperText: !item.required ? translatedStrings.optionalHelperText : null,
          type: maskedFields[item.name] ? 'password' : 'text',
          width: '500px',
        };
        if (item.mask) {
          singleLineTextFieldProps.icon = maskedFields[item.name] ? (
            <BsEye size={iconDefaultSize} />
          ) : (
            <BsEyeSlash size={iconDefaultSize} />
          );
          singleLineTextFieldProps.onIconClick = () => maskHandler(item.name);
        }
        return (
          <div
            className={classes.addSecretFormFieldWrapper}
            key={`${dynamicFieldKeyPrefix}${index}`}
          >
            <TextField {...singleLineTextFieldProps} />
          </div>
        );
      }
      case 'multiLine': {
        const multiLineTextFieldProps = {
          value: dynamicValues[item.name],
          onChange: (e) => setDynamicValues({ ...dynamicValues, [item.name]: e.target.value }),
          label: item.name,
          helperText: !item.required ? translatedStrings.optionalHelperText : null,
          type: maskedFields[item.name] ? 'password' : 'text',
          width: '500px',
        };
        if (item.mask) {
          multiLineTextFieldProps.icon = maskedFields[item.name] ? (
            <BsEye size={iconDefaultSize} />
          ) : (
            <BsEyeSlash size={iconDefaultSize} />
          );
          multiLineTextFieldProps.onIconClick = () => maskHandler(item.name);
        }
        return (
          <div
            className={classes.addSecretFormFieldWrapper}
            key={`${dynamicFieldKeyPrefix}${index}`}
          >
            <TextArea {...multiLineTextFieldProps} />
          </div>
        );
      }
      case 'password':
        return (
          <div
            className={classes.addSecretFormFieldWrapper}
            key={`${dynamicFieldKeyPrefix}${index}`}
          >
            <div className={classes.readOnlyLabelWrapper}>
              <Typography variant="label2"> {item.name} </Typography>
            </div>
            {secretTemplateDetails.passwordPolicyId && (
              <div className={classes.generatePasswordContainer}>
                <div className={classes.generatePasswordButtonContainer}>
                  <Button onClick={() => generatePassword(item.name)}>
                    {translatedStrings.generatePasswordButtonText}
                  </Button>
                </div>
                {isGeneratePasswordLoading ? <Spinner size="small" /> : null}
              </div>
            )}
            <TextField
              value={dynamicValues[item.name]}
              onChange={(e) => setDynamicValues({ ...dynamicValues, [item.name]: e.target.value })}
              type={maskedFields[item.name] ? 'password' : 'text'}
              icon={
                maskedFields[item.name] ? (
                  <BsEye size={iconDefaultSize} />
                ) : (
                  <BsEyeSlash size={iconDefaultSize} />
                )
              }
              onIconClick={() => maskHandler(item.name)}
              width={'500px'}
            />
          </div>
        );
    }
  };

  const generatePassword = async (name) => {
    if (
      secretTemplateDetails?.passwordPolicyId !== null &&
      secretTemplateDetails?.passwordPolicyId !== 'N/A'
    ) {
      setGeneratePasswordLoading(true);
      try {
        const params = {};
        params.action = 'generatePasswordOrPin';
        const response = await ApiServices.get(
          `/api/v1/secretmanager/pwdpolicies/${secretTemplateDetails?.passwordPolicyId}`,
          { params }
        );
        setGeneratePasswordLoading(false);
        const newPassword = response?.data?.passwordOrPin;
        setDynamicValues({ ...dynamicValues, [name]: newPassword });
      } catch ({ response }) {
        const reason = response?.data?.message || '';
        setGeneratePasswordLoading(false);
        dispatch(
          openNotification(
            errorNotificationType,
            translatedStrings.generatePasswordFail(reason),
            true,
            errorNotificationDuration
          )
        );
      }
    } else {
      dispatch(
        openNotification(
          infoNotificationType,
          translatedStrings.passwordPolicyIdNullMessage,
          true,
          infoNotificationDuration
        )
      );
    }
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.cancelDialogMessage}
        primaryButtonText={translatedStrings.cancelDialogPrimaryButtonText}
        secondaryButtonText={translatedStrings.noButtonText}
        onSubmit={() => {
          setCancelDialogOpen(false);
          history.push({ pathname: previousPath, state: { previousPath: editString } });
          addSecretHook.resetForm();
        }}
        onCancel={() => setCancelDialogOpen(false)}
      />
    );
  };

  return (
    <>
      <Snackbar
        title={translatedStrings.errorSnackbarTitle}
        errorList={secretSubmitError?.split('|').map((error) => `- ${error}`)}
        hasError={!isEmpty(secretSubmitError)}
      />
      <div className={classes.addSecretFormContainer} ref={formContainer}>
        <div className={classes.addSecretFormFieldWrapper}>
          {!isEditMode && (
            <div className={classes.nameCheckTextFieldLoaderContainer}>
              <TextField
                value={addSecretHook.values.name || ''}
                onChange={(e) =>
                  addSecretHook.handleChange(addSecretHook.names.name, e.target.value)
                }
                onBlur={() => addSecretHook.handleBlur(addSecretHook.names.name)}
                error={addSecretHook.touched.name && Boolean(addSecretHook.errors.name)}
                errorMsg={addSecretHook.errors.name}
                label={translatedStrings.nameLabel}
                type="text"
                width={'500px'}
              />
              <div className={classes.nameCheckLoaderContainer}>
                {secretFilterLoading && <Spinner size="small" />}
              </div>
            </div>
          )}
          {isEditMode && (
            <div className={classes.readOnlyFieldWrapper}>
              <Typography variant="label2"> {translatedStrings.nameLabel} </Typography>
              <div className={classes.readOnlyFieldValueWrapper}>
                <Typography variant="label1">{addSecretHook.values.name || ''}</Typography>
              </div>
            </div>
          )}
        </div>
        <div className={classes.addSecretFormFieldWrapper}>
          <TextArea
            value={addSecretHook.values.description}
            onChange={(e) =>
              addSecretHook.handleChange(addSecretHook.names.description, e.target.value)
            }
            label={translatedStrings.descriptionLabel}
            helperText={translatedStrings.descriptionHelperLabel}
            type="text"
            width={'500px'}
            height={'72px'}
            onBlur={() => addSecretHook.handleBlur(addSecretHook.names.description)}
            error={addSecretHook.touched.description && Boolean(addSecretHook.errors.description)}
            errorMsg={addSecretHook.errors.description}
          />
        </div>
        <div className={classes.readOnlyFieldWrapper}>
          <Typography variant="label2"> {translatedStrings.categoryLabel} </Typography>
          <div className={classes.readOnlyFieldValueWrapper}>
            <Typography variant="label1"> {translatedStrings.secretCategoryValue} </Typography>
          </div>
        </div>
        <div className={classes.readOnlyFieldWrapper}>
          <Typography variant="label2"> {translatedStrings.accessTypeLabel} </Typography>
          <div className={classes.readOnlyFieldValueWrapper}>
            <Typography variant="label1">{translatedStrings.secretAccessTypeValue}</Typography>
          </div>
        </div>
        {!isEditMode && (
          <div className={classes.addSecretFormFieldWrapper}>
            {staticSecretTemplateList.length ? (
              <Autocomplete
                options={staticSecretTemplateList}
                label={translatedStrings.secretTypeLabel}
                width={'500px'}
                value={[{ secretType: addSecretHook.values.secretType }]}
                onChange={(_, value) => {
                  dispatch(requestStaticSecretTemplateById(value.id));
                  addSecretHook.handleChange(addSecretHook.names.secretType, value.secretType);
                  setDynamicValues({});
                  setPasswordPolicyName(translatedStrings.noneValue);
                }}
                onBlur={() => addSecretHook.handleBlur(addSecretHook.names.secretType)}
                onInputChange={(_, value) => {
                  dispatch(resetStaticSecretTemplateView());
                  addSecretHook.handleChange(addSecretHook.names.secretType, value);
                }}
                errorMessage={
                  addSecretHook.touched.secretType && Boolean(addSecretHook.errors.secretType)
                    ? addSecretHook.errors.secretType
                    : ''
                }
                error={addSecretHook.touched.secretType && Boolean(addSecretHook.errors.secretType)}
                getOptionLabel={(option) => option.secretType}
                placeholder={translatedStrings.searchPlaceholder}
              />
            ) : null}
          </div>
        )}
        {isSuccess(secretTemplateDetailsStatus) && (
          <>
            {!isEditMode && (
              <div className={classes.readOnlyFieldWrapper}>
                <Typography variant="label2">
                  {translatedStrings.templateDescriptionLabel}
                </Typography>
                <div className={classes.readOnlyFieldValueWrapper}>
                  <Typography variant="label1">
                    {!secretTemplateDetails?.description ||
                    secretTemplateDetails?.description === ''
                      ? translatedStrings.noneValue
                      : secretTemplateDetails?.description}
                  </Typography>
                </div>
              </div>
            )}
            {isEditMode && (
              <div className={classes.readOnlyFieldWrapper}>
                <Typography variant="label2"> {translatedStrings.secretTypeLabel} </Typography>
                <div className={classes.readOnlyFieldValueWrapper}>
                  <Typography variant="label1">{secretTemplateDetails?.secretType}</Typography>
                </div>
              </div>
            )}
            <div className={classes.readOnlyFieldWrapper}>
              <Typography variant="label2">
                {translatedStrings.secretRotationIntervalLabel}
              </Typography>
              <div className={classes.readOnlyFieldValueWrapper}>
                <Typography variant="label1">
                  {`${secretTemplateDetails?.rotationInterval}${rotationIntervalValueSuffix}`}
                </Typography>
              </div>
            </div>
            {!isEditMode && (
              <>
                <div className={classes.readOnlyFieldWrapper}>
                  <Typography variant="label2">
                    {translatedStrings.passwordPolicyIdLabel}
                  </Typography>
                  <div className={classes.readOnlyFieldValueWrapper}>
                    <Typography variant="label1">{passwordPolicyName} </Typography>
                  </div>
                </div>
                <div className={classes.secretDetailContainer}>
                  <Typography variant="pageSectionHeader">
                    {translatedStrings.secretDetailsSubHeading}
                  </Typography>
                </div>
                <hr />
              </>
            )}
            {secretTemplateDetails.parameters.map((item, index) => getDynamicField(item, index))}
          </>
        )}
      </div>
      {isCancelDialogOpen && getCancelDialog()}
    </>
  );
};

AddSecretForm.propTypes = {
  addSecretHook: PropTypes.object.isRequired,
  staticSecretTemplateList: PropTypes.array,
  secretTemplateDetailsStatus: PropTypes.string.isRequired,
  secretTemplateDetails: PropTypes.object.isRequired,
  secretFilterLoading: PropTypes.bool.isRequired,
  passwordPolicyName: PropTypes.string,
  setPasswordPolicyName: PropTypes.func,
  secretSubmitError: PropTypes.array,
  dynamicValues: PropTypes.object,
  setDynamicValues: PropTypes.func,
  openNotification: PropTypes.func.isRequired,
  staticSecretTemplateListStatus: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
  isCancelDialogOpen: PropTypes.bool.isRequired,
  setCancelDialogOpen: PropTypes.func.isRequired,
  secretDetails: PropTypes.object,
  dynamicValuesCopy: PropTypes.object,
  setDynamicValuesCopy: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default AddSecretForm;
