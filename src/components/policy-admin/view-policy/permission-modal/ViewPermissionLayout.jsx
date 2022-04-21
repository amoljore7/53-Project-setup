import Pill from 'britive-design-system/core/components/pill';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React from 'react';
import { classes, appsConsumer } from './constants';
import { getApplicationName } from '../../../../utils/common-utils';
import classNames from 'classnames';
import { isArray } from 'lodash';

const pillClass = {
  [classes.marginTop10]: true,
  [classes.tagsContainer]: true,
};

const ViewPermissionLayout = ({ translatedStrings, permissionData, applicationsListData }) => {
  const getResources = (isAppsConsumer) => {
    let resources = isArray(permissionData?.resources)
      ? permissionData?.resources.join(', ')
      : permissionData?.resources;
    if (!resources) {
      resources = translatedStrings.noneText;
    }
    if (isAppsConsumer) {
      return (
        getApplicationName(permissionData?.resources, applicationsListData).join(', ') || resources
      );
    }
    return resources;
  };

  return (
    <div className={classes.viewRolePermissionDetailsLayoutModalPopupWrapper}>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.description} </Typography>
        <div className={classes.marginTop8}>
          <Typography variant="label1">
            {permissionData?.description || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.consumer} </Typography>
        <div className={classes.marginTop8}>
          <Typography variant="label1">
            {permissionData?.consumer?.description ||
              permissionData?.consumer?.name ||
              translatedStrings.noneText}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.resources} </Typography>
        <div className={classes.marginTop8}>
          <Typography variant="label1">
            {getResources(permissionData?.consumer?.name === appsConsumer)}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.actions} </Typography>
        <div className={classNames({ ...pillClass })}>
          {permissionData?.actions ? (
            permissionData?.actions.map((item) => {
              return (
                <div key={item} className={classes.viewPolicyPermissionActionPillContainer}>
                  <Pill readOnly={true} key={item} label={item} />
                </div>
              );
            })
          ) : (
            <Typography variant="label1"> {translatedStrings?.noneText} </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

ViewPermissionLayout.propTypes = {
  translatedStrings: PropTypes.object,
  permissionData: PropTypes.object,
  applicationsListData: PropTypes.array,
};

export default ViewPermissionLayout;
