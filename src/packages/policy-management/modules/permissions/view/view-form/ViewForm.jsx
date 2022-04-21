import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../../externalization';
import Spinner from 'britive-design-system/core/components/spinner';
import Pill from 'britive-design-system/core/components/pill';
import Typography from 'britive-design-system/core/components/typography';

import {
  classes,
  spinnerSize,
  permissionNameLabel,
  permissionDescriptionLabel,
  permissionConsumerLabel,
  permissionResourcesLabel,
  permissionActionsLabel,
  defaultWidth,
} from './constants';
import './ViewForm.scss';
import { appsConsumerDescription } from '../../add/constants';
import { isLoading, isSuccess } from '../../../../../../utils/common-utils';

const ViewPermissionEntity = ({
  viewPermissionData,
  applicationsListData,
  applicationsListStatus,
  viewPermissionStatus,
  deletePermissionStatus,
  consumerListStatus,
  consumerList,
}) => {
  const [permission, setPermission] = useState({});
  useEffect(() => {
    if (isSuccess(consumerListStatus) && isSuccess(viewPermissionStatus)) {
      const consumerDescription = consumerList.find(
        (consumer) => consumer.name === viewPermissionData?.consumer
      )?.description;
      setPermission({ ...viewPermissionData, consumer: consumerDescription });
    }
  }, [consumerListStatus, viewPermissionStatus]);
  return (
    <>
      {isLoading(viewPermissionStatus) ||
      isLoading(applicationsListStatus) ||
      isLoading(deletePermissionStatus) ||
      isLoading(consumerListStatus) ? (
        <Spinner size={spinnerSize} overlay={true} />
      ) : (
        <div className={classes.viewPermissionFormContainer}>
          <div className={classes?.marginTop32}>
            <Typography variant="label2"> {permissionNameLabel} </Typography>
            <div className={classes?.marginTop8}>
              <Typography variant="label1">{permission.name || translate('NONE')}</Typography>
            </div>
          </div>

          <div className={classes?.marginTop32}>
            <Typography variant="label2"> {permissionDescriptionLabel} </Typography>
            <div className={classes?.marginTop8}>
              <Typography variant="label1">
                {permission.description || translate('NONE')}
              </Typography>
            </div>
          </div>

          <div className={classes?.marginTop32}>
            <Typography variant="label2"> {permissionConsumerLabel} </Typography>
            <div className={classes?.marginTop8}>
              <Typography variant="label1">{permission.consumer || translate('NONE')}</Typography>
            </div>
          </div>

          <div className={classes?.marginTop32}>
            <Typography variant="label2"> {permissionResourcesLabel} </Typography>
            {permission.consumer === appsConsumerDescription ? (
              <div className={classes.viewPermissionFormFieldTagContainer}>
                {permission.resources?.map((value) => (
                  <div key={value} className={classes.viewPermissionActionPillContainer}>
                    <Pill
                      readOnly={true}
                      label={
                        applicationsListData?.find(
                          (application) => application.appContainerId === value
                        )?.applicationName
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={classes?.marginTop8}>
                <Typography variant="label1">
                  {permission.resources?.join(', ') || translate('NONE')}
                </Typography>
              </div>
            )}
          </div>

          <div
            className={classes?.marginTop32}
            style={{ width: defaultWidth, justifyContent: 'space-between' }}
          >
            <Typography variant="label2"> {permissionActionsLabel} </Typography>
            <div className={classes.viewPermissionFormFieldTagContainer}>
              {permission.actions &&
                permission.actions.map((value) => {
                  return (
                    <div key={value} className={classes.viewPermissionActionPillContainer}>
                      <Pill readOnly={true} label={value} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ViewPermissionEntity.propTypes = {
  viewPermissionData: PropTypes.object,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.array,
  viewPermissionStatus: PropTypes.string,
  deletePermissionStatus: PropTypes.string,
  consumerListStatus: PropTypes.string,
  consumerList: PropTypes.array,
};
export default ViewPermissionEntity;
