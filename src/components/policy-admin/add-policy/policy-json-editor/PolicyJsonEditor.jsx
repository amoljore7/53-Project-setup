import Button from 'britive-design-system/core/components/button';
import Textarea from 'britive-design-system/core/components/textarea';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  errorNotificationType,
  successNotificationType,
  warningNotificationType,
} from '../../../../utils/common-constants';
import { getHeightFromTop } from '../../../../utils/common-utils';
import { classes } from './constants';
import './PolicyJsonEditor.scss';

const AddPolicyJSON = ({
  validationHook,
  openNotification,
  editReadOnly,
  validationErrors,
  translatedStrings,
}) => {
  const jsonContainer = useRef(null);
  useEffect(() => {
    if (editReadOnly) {
      openNotification(warningNotificationType, translatedStrings.readOnlyPolicyJSONMessage);
    }
  }, [editReadOnly]);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (jsonContainer?.current) {
      jsonContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        jsonContainer.current
      )}px)`;
    }
  }, [jsonContainer.current, validationErrors]);

  const onCopy = () => {
    if (validationHook.values.JSONInputData) {
      navigator.clipboard.writeText(validationHook.values.JSONInputData);
      openNotification(successNotificationType, translatedStrings.policySuccessCopy);
    } else openNotification(errorNotificationType, translatedStrings.policyFailedCopy);
  };
  return (
    <>
      <div className={classes.inputJsonMainContainer} ref={jsonContainer}>
        <Button variant="secondary" size="small" onClick={onCopy}>
          {translatedStrings.copyBtn}
        </Button>
        <div style={{ marginTop: '10px' }}>
          <Textarea
            height="60vh"
            label={translatedStrings.policyFormat}
            value={validationHook.values.JSONInputData}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.JSONInputData, e.target.value)
            }
            error={
              validationHook.touched.JSONInputData && Boolean(validationHook.errors.JSONInputData)
            }
            onBlur={() => validationHook.handleBlur(validationHook.names.JSONInputData)}
            errorMsg={validationHook.errors.JSONInputData}
            readOnly={Boolean(editReadOnly)}
          />
        </div>
      </div>
    </>
  );
};

AddPolicyJSON.propTypes = {
  validationHook: PropTypes.object,
  openNotification: PropTypes.func,
  editReadOnly: PropTypes.bool,
  validationErrors: PropTypes.object,
  translatedStrings: PropTypes.object,
};

export default AddPolicyJSON;
