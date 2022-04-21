import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import Spinner from 'britive-design-system/core/components/spinner';
import RadioGroup from 'britive-design-system/core/components/radio';
import { getHeightFromTop } from '../../../../../utils/common-utils';
import {
  classes,
  translatedStrings,
  testIDList,
  passwordTypeOptions,
  pinType,
  allowedSpecialCharsList,
  alphanumericType,
  alphanumericPasswordRadioList,
  passwordDetailOptions,
  passwordTypeOptionsEdit,
} from './constants';
import Typography from 'britive-design-system/core/components/typography';
import './PasswordPolicyForm.scss';

const PasswordPolicyForm = ({
  passwordPolicyValidation,
  passwordPolicyFilterLoading,
  isEdit = false,
  formError,
}) => {
  const formContainer = useRef(null);
  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, formError]);
  const handleResetPasswordForm = (passwordType) => {
    /* Resetting the remaining form according to password type to initial state */
    const {
      pinLength,
      minPasswordLength,
      hasUpperCaseChars,
      hasLowerCaseChars,
      hasNumbers,
      hasSpecialChars,
      allowedSpecialChars,
    } = passwordPolicyValidation.names;

    if (passwordType === alphanumericType) {
      passwordPolicyValidation.handleChange(pinLength, null);
    } else {
      passwordPolicyValidation.handleChange(minPasswordLength, null);
      passwordPolicyValidation.handleChange(hasUpperCaseChars, true);
      passwordPolicyValidation.handleChange(hasLowerCaseChars, true);
      passwordPolicyValidation.handleChange(hasNumbers, true);
      passwordPolicyValidation.handleChange(hasSpecialChars, true);
      passwordPolicyValidation.handleChange(allowedSpecialChars, allowedSpecialCharsList);
    }
  };

  const pinPasswordField = () => {
    return (
      <div data-testid={testIDList.pinLengthField} className={classes.passwordPolicyFormSpacing}>
        <Textfield
          value={passwordPolicyValidation.values.pinLength}
          onChange={(e) =>
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names.pinLength,
              e.target.value
            )
          }
          label={translatedStrings.pinLengthLabel}
          type="text"
          width={'500px'}
          onBlur={() =>
            passwordPolicyValidation.handleBlur(passwordPolicyValidation.names.pinLength)
          }
          error={
            passwordPolicyValidation.touched.pinLength &&
            Boolean(passwordPolicyValidation.errors.pinLength)
          }
          errorMsg={passwordPolicyValidation.errors.pinLength}
        />
        <div className={classes.marginTop32px}>
          <Typography variant="label2">{translatedStrings.pinMandatoryText}</Typography>
        </div>
      </div>
    );
  };

  const alphanumericPasswordField = () => {
    return (
      <>
        <div
          data-testid={testIDList.minimumPasswordLengthField}
          className={classes.passwordPolicyFormSpacing}
        >
          <Textfield
            value={passwordPolicyValidation.values.minPasswordLength}
            onChange={(e) =>
              passwordPolicyValidation.handleChange(
                passwordPolicyValidation.names.minPasswordLength,
                e.target.value
              )
            }
            label={translatedStrings.minimumPasswordLengthLabel}
            type="text"
            width={'500px'}
            onBlur={() =>
              passwordPolicyValidation.handleBlur(passwordPolicyValidation.names.minPasswordLength)
            }
            error={
              passwordPolicyValidation.touched.minPasswordLength &&
              Boolean(passwordPolicyValidation.errors.minPasswordLength)
            }
            errorMsg={passwordPolicyValidation.errors.minPasswordLength}
          />
        </div>
        {alphanumericPasswordRadioGroupList()}
        {passwordPolicyValidation.values.hasSpecialChars ? allowedSpecialCharsField() : null}
      </>
    );
  };

  const alphanumericPasswordRadioGroupList = () => {
    return alphanumericPasswordRadioList.map((passwordDetail) => (
      <div
        data-testid={passwordDetail.fieldKey}
        key={passwordDetail.fieldKey}
        className={classes.passwordPolicyFormSpacing}
      >
        <RadioGroup
          label={passwordDetail.label}
          name={passwordPolicyValidation.names[passwordDetail.fieldKey]}
          defaultValue={passwordPolicyValidation.values[passwordDetail.fieldKey] ? 'true' : 'false'}
          options={passwordDetailOptions}
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false;
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names[passwordDetail.fieldKey],
              value
            );
            if (passwordDetail.fieldKey === 'hasSpecialChars' && !value) {
              /* Resetting the allow special characters field to initial state */
              passwordPolicyValidation.handleChange(
                passwordPolicyValidation.names.allowedSpecialChars,
                allowedSpecialCharsList
              );
            }
          }}
          direction="vertical"
        />
      </div>
    ));
  };

  const allowedSpecialCharsField = () => {
    return (
      <div
        data-testid={testIDList.allowedSpecialCharsField}
        className={classes.passwordPolicyFormSpacing}
      >
        <Textfield
          value={passwordPolicyValidation.values.allowedSpecialChars}
          onChange={(e) =>
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names.allowedSpecialChars,
              e.target.value
            )
          }
          label={translatedStrings.allowedSpecialCharactersLabel}
          type="text"
          width={'500px'}
          onBlur={() =>
            passwordPolicyValidation.handleBlur(passwordPolicyValidation.names.allowedSpecialChars)
          }
          error={
            passwordPolicyValidation.touched.allowedSpecialChars &&
            Boolean(passwordPolicyValidation.errors.allowedSpecialChars)
          }
          errorMsg={passwordPolicyValidation.errors.allowedSpecialChars}
        />
      </div>
    );
  };

  return (
    <div className={classes.passwordPolicyFormContainer} ref={formContainer}>
      <div className={`${classes.passwordPolicyFormSpacing} ${classes.alignWithLoader}`}>
        <Textfield
          value={passwordPolicyValidation.values.name}
          onChange={(e) =>
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names.name,
              e.target.value
            )
          }
          label={translatedStrings.passwordPolicyNameLabel}
          type="text"
          width={'500px'}
          onBlur={() => passwordPolicyValidation.handleBlur(passwordPolicyValidation.names.name)}
          error={
            passwordPolicyValidation.touched.name && Boolean(passwordPolicyValidation.errors.name)
          }
          errorMsg={passwordPolicyValidation.errors.name}
        />
        <div className={classes.formLoader}>
          {passwordPolicyFilterLoading ? <Spinner size="small" /> : null}
        </div>
      </div>
      <div className={classes.passwordPolicyFormSpacing}>
        <Textarea
          value={passwordPolicyValidation.values.description}
          onChange={(e) =>
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names.description,
              e.target.value
            )
          }
          label={translatedStrings.descriptionLabel}
          helperText={translatedStrings.descriptionHelperLabel}
          type="text"
          width={'500px'}
          height={'72px'}
          onBlur={() => {
            passwordPolicyValidation.handleBlur(passwordPolicyValidation.names.description);
          }}
          error={
            passwordPolicyValidation.touched.description &&
            Boolean(passwordPolicyValidation.errors.description)
          }
          errorMsg={passwordPolicyValidation.errors.description}
        />
      </div>
      <div data-testid={testIDList.passwordTypeRadio} className={classes.passwordPolicyFormSpacing}>
        <RadioGroup
          label={translatedStrings.passwordTypeLabel}
          name={passwordPolicyValidation.names.passwordType}
          defaultValue={passwordPolicyValidation.values.passwordType}
          options={isEdit ? passwordTypeOptionsEdit : passwordTypeOptions}
          onChange={(e) => {
            passwordPolicyValidation.handleChange(
              passwordPolicyValidation.names.passwordType,
              e.target.value
            );
            handleResetPasswordForm(e.target.value);
          }}
          direction="vertical"
        />
      </div>
      {passwordPolicyValidation.values.passwordType === pinType
        ? pinPasswordField()
        : alphanumericPasswordField()}
    </div>
  );
};

PasswordPolicyForm.propTypes = {
  passwordPolicyValidation: PropTypes.any,
  passwordPolicyFilterLoading: PropTypes.bool,
  isEdit: PropTypes.bool,
  formError: PropTypes.any,
};

export default PasswordPolicyForm;
