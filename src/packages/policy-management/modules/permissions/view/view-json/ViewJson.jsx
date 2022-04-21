import React from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS, successNotificationType } from '../../../../../../utils/common-constants';
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
} from './constants';
import './ViewJson.scss';

const ViewPermissionJSON = ({
  openNotification,
  viewPermissionStatus,
  viewPermissionData,
  deletePermissionStatus,
}) => {
  return (
    <>
      {(viewPermissionStatus == RESOURCE_STATUS.LOADING ||
        deletePermissionStatus == RESOURCE_STATUS.LOADING) && (
        <Spinner size={spinnerSize} overlay={true} />
      )}
      <div className={classes.viewPermissionJSONContainer}>
        <Button
          size={buttonType.mediumBtn}
          variant={buttonType.secondaryBtn}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(viewPermissionData, undefined, 4));
            openNotification({
              type: successNotificationType,
              title: permissionCopiedTitle,
              open: true,
              duration: null,
            });
          }}
        >
          {buttonType.copy}
        </Button>
        <div className={classes.viewPermissonJSONTextarea} role={textareaRole}>
          <Textarea
            label={textareaLabel}
            height={defaultHeight}
            value={JSON.stringify(viewPermissionData, undefined, 4)}
            readOnly={true}
          />
        </div>
      </div>
    </>
  );
};
ViewPermissionJSON.propTypes = {
  openNotification: PropTypes.func,
  viewPermissionData: PropTypes.object,
  viewPermissionStatus: PropTypes.string,
  deletePermissionStatus: PropTypes.string,
};
export default ViewPermissionJSON;
