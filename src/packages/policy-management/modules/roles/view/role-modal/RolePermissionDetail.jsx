import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import Pill from 'britive-design-system/core/components/pill';
import classNames from 'classnames';
import { asterisk, classes, translatedStrings } from '../constants';
import { appsConsumer } from '../../../permissions/add/constants';
import '../RolesView.scss';

const pillClass = {
  [classes.marginTop8RolesPolicyDetails]: true,
  [classes.tagsContainer]: true,
};

const RolePermissionDetail = ({ permissionData, applicationsListData }) => {
  const getApplicationName = (resources) => {
    return resources.map((value) => {
      if (value === asterisk) return value;
      else {
        return applicationsListData?.find((application) => application?.appContainerId === value)
          ?.applicationName;
      }
    });
  };

  return (
    <>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.permissionName} </Typography>
        <div className={classes?.marginTop8RolesPolicyDetails}>
          <Typography variant="label1"> {permissionData?.name} </Typography>
        </div>
      </div>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.source} </Typography>
        <div className={classes?.marginTop8RolesPolicyDetails}>
          <Typography variant="label1">
            {permissionData?.isInline
              ? translatedStrings?.inlineText
              : translatedStrings?.predefinedText}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.description} </Typography>
        <div className={classes?.marginTop8RolesPolicyDetails}>
          <Typography variant="label1"> {permissionData?.description} </Typography>
        </div>
      </div>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.consumer} </Typography>
        <div className={classes?.marginTop8RolesPolicyDetails}>
          <Typography variant="label1"> {permissionData?.consumer?.description} </Typography>
        </div>
      </div>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.resources} </Typography>
        <div className={classes?.marginTop8RolesPolicyDetails}>
          <Typography variant="label1">
            {permissionData?.consumer?.name === appsConsumer
              ? getApplicationName(permissionData?.resources)?.join(', ')
              : permissionData?.resources?.join(', ')}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32RolesPolicyDetails}>
        <Typography variant="label2"> {translatedStrings?.actions} </Typography>
        <div className={classNames({ ...pillClass })}>
          {permissionData?.actions.map((item) => {
            return (
              <div
                key={item}
                className={classes.viewRolePermissionActionPillContainerRolesPolicyDetails}
              >
                <Pill readOnly={true} label={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

RolePermissionDetail.propTypes = {
  permissionData: PropTypes.object,
  applicationsListData: PropTypes.array,
};

export default RolePermissionDetail;
