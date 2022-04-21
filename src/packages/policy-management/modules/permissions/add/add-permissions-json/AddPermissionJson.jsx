import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import Button from 'britive-design-system/core/components/button';
import Textarea from 'britive-design-system/core/components/textarea';
import Spinner from 'britive-design-system/core/components/spinner';
import {
  classes,
  spinnerSize,
  buttonType,
  textareaLabel,
  defaultHeight,
  permissionCopiedTitle,
  textareaRole,
  defaultNotificationType,
  textAreaTestId,
} from './constants';
import './AddPermissionJson.scss';
import { isEmpty } from 'lodash';
import { cloneNamePrefix } from '../constants';

const AddPermissionJSON = ({
  jsonObject,
  addPermissionStatus,
  openNotification,
  viewPermissionStatus,
  viewPermissionData,
}) => {
  const [jsonObj, setJsonObj] = useState('');

  useEffect(() => {
    if (!isEmpty(viewPermissionData)) {
      delete viewPermissionData.id;
      viewPermissionData.name = cloneNamePrefix(viewPermissionData.name);
      setJsonObj(JSON.stringify(viewPermissionData, undefined, 4));
      jsonObject(viewPermissionData);
    }
  }, [viewPermissionData]);

  const jsonHandler = (e) => {
    setJsonObj(e.target.value);
    jsonObject(e.target.value);
  };
  return (
    <>
      {(viewPermissionStatus == RESOURCE_STATUS.LOADING ||
        addPermissionStatus == RESOURCE_STATUS.LOADING) && (
        <Spinner size={spinnerSize} overlay={true} />
      )}
      <div className={classes.permissionJSONContainer}>
        <Button
          size={buttonType.mediumBtn}
          variant={buttonType.secondaryBtn}
          onClick={() => {
            navigator.clipboard.writeText(jsonObj);
            openNotification({
              type: defaultNotificationType,
              title: permissionCopiedTitle,
              open: true,
              duration: null,
            });
          }}
          disabled={!jsonObj}
        >
          {buttonType.copy}
        </Button>
        <div
          className={classes.permissonJSONTextarea}
          role={textareaRole}
          data-testid={textAreaTestId}
        >
          <Textarea
            label={textareaLabel}
            height={defaultHeight}
            value={jsonObj}
            onChange={jsonHandler}
          />
        </div>
      </div>
    </>
  );
};
AddPermissionJSON.propTypes = {
  jsonObject: PropTypes.func,
  openNotification: PropTypes.any,
  addPermissionStatus: PropTypes.string,
  viewPermissionStatus: PropTypes.string,
  viewPermissionData: PropTypes.object,
};
export default AddPermissionJSON;
