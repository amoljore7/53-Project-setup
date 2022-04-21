import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import Textarea from 'britive-design-system/core/components/textarea';
import isEmpty from 'lodash/isEmpty';
import {
  classes,
  copyBtn,
  copyNotificationMessage,
  jsonTxtAreaLabel,
  defaultHeight,
} from './constants';

import './AddRoleJson.scss';
import { getHeightFromTop } from '../../../../../../utils/common-utils';

const AddRoleJson = ({ openNotification, validationHookJSON, roleError }) => {
  const formContainer = useRef(null);
  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, roleError]);
  const getRoleJSONTextarea = () => {
    return (
      <div data-testid="role-textarea" className={classes.roleTextareaContainer}>
        <Textarea
          name="roleDataJSON"
          label={jsonTxtAreaLabel}
          height={defaultHeight}
          value={validationHookJSON.values.roleDataJSON}
          onChange={(e) =>
            validationHookJSON.handleChange(validationHookJSON.names.roleDataJSON, e.target.value)
          }
          onBlur={() => validationHookJSON.handleBlur(validationHookJSON.names.roleDataJSON)}
          error={
            validationHookJSON.touched.roleDataJSON &&
            Boolean(validationHookJSON.errors.roleDataJSON)
          }
          errorMsg={validationHookJSON.errors.roleDataJSON}
        />
      </div>
    );
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(validationHookJSON.values.roleDataJSON);
    openNotification('success', copyNotificationMessage, 3000);
  };

  const getJSONForm = () => {
    return (
      <>
        <Button
          variant="secondary"
          size="medium"
          onClick={handleCopyJSON}
          disabled={isEmpty(validationHookJSON?.values?.roleDataJSON)}
        >
          {copyBtn}
        </Button>
        {getRoleJSONTextarea()}
      </>
    );
  };

  return (
    <div className={classes.roleJSONContainer} ref={formContainer}>
      {getJSONForm()}
    </div>
  );
};

AddRoleJson.propTypes = {
  openNotification: PropTypes.func,
  validationHookJSON: PropTypes.any,
  roleError: PropTypes.any,
};

export default AddRoleJson;
