import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import Pill from 'britive-design-system/core/components/pill';
import { classes, appsConsumer } from './constants';
import { isArray } from 'lodash';
import { getApplicationName } from '../../../../utils/common-utils';

const ViewRoleLayout = ({ translatedStrings, applicationsListData, roleData, roleFields }) => {
  const getResources = (permission, item) => {
    if (item.key === 'resources' && permission?.consumer?.name === appsConsumer) {
      return (
        getApplicationName(permission[item.key], applicationsListData).join(', ') ||
        permission[item.key]?.join(', ')
      );
    } else if (item.key === 'consumer') {
      return permission[item.key]?.description || permission[item.key]?.name;
    }
    return permission[item.key];
  };
  const getRoleField = (permission, item, index) => {
    return item.key === 'actions' ? (
      <div className={classes.addEntityInputSpacing} key={`role-detail-field-${index}`}>
        <div className={classes.addEntityModalLabel}>
          <Typography variant="label2">{item.label}</Typography>
        </div>
        <div className={`${classes.addEntityModalValue} ${classes.viewActionPill}`}>
          {permission.actions.map((action, index) => (
            <div key={`pill-${index}`} className={classes.actionWrapperPill}>
              <Pill label={action} readOnly={true} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div key={`role-detail-field-${index}`} className={classes.addEntityInputSpacing}>
        <div className={classes.addEntityModalLabel}>
          <Typography variant="label2">{item.label}</Typography>
        </div>
        <div className={classes.addEntityModalValue}>
          <Typography variant="label1">{getResources(permission, item)}</Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.viewRolePermissionDetailsLayoutModalPopupWrapper}>
      <div className={classes.roleLabelModalContainer}>
        <Typography variant="label2"> {translatedStrings?.description} </Typography>
        <div className={classes.roleValueModalContainer}>
          <Typography variant="label1">
            {roleData?.description || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      {isArray(roleData?.permissions) ? (
        roleData.permissions.map((permission, index) => {
          return (
            <div key={`permission-detail-${index}`} className={classes.rolePermissionWrapper}>
              <div className={classes.addEntityInputSpacing}>
                <div className={classes.addEntityInputSpacing}>
                  <div className={classes.addEntityModalLabel}>
                    <Typography variant="label2">{permission.name}</Typography>
                  </div>
                  <div className={classes.addEntityModalValue}>
                    <Typography variant="label1">
                      {permission.description || translatedStrings.noneText}
                    </Typography>
                  </div>
                </div>
                {roleFields.map((item, index) => {
                  return getRoleField(permission, item, index);
                })}
              </div>
            </div>
          );
        })
      ) : (
        <Typography variant="label1"> {translatedStrings?.noneText} </Typography>
      )}
    </div>
  );
};

ViewRoleLayout.propTypes = {
  translatedStrings: PropTypes.object,
  applicationsListData: PropTypes.array,
  roleData: PropTypes.object,
  roleFields: PropTypes.array,
};

export default ViewRoleLayout;
