import React, { useEffect, useState } from 'react';
import Typography from 'britive-design-system/core/components/typography';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import { isObject } from 'lodash';
import { isLoading } from '../../../../utils/common-utils';
import { classes, smallModalPopupWidth } from './constants';
import PropTypes from 'prop-types';
import './RoleModal.scss';
import ViewRoleLayout from './ViewRoleLayout';

const PolicyRolesModal = ({
  roleData: loadedRoleData,
  applicationsListData,
  consumerList,
  consumerListStatus,
  translatedStrings,
  roleFields,
  width = smallModalPopupWidth,
  title,
  onCancel,
}) => {
  const [roleData, setRoleData] = useState({});
  useEffect(() => {
    if (!isLoading(consumerListStatus)) {
      const permissionsWithConsumerObject = loadedRoleData?.permissions.map((permission) => {
        if (isObject(permission.consumer)) return permission;
        const consumer = consumerList?.find(
          (consumerItem) => consumerItem.name === permission.consumer
        ) ?? { name: permission.consumer };
        return { ...permission, consumer };
      });
      setRoleData({ ...loadedRoleData, permissions: permissionsWithConsumerObject });
    }
  }, [consumerListStatus]);
  return (
    <ModalPopup width={width} title={title} onCancel={onCancel}>
      <div className={classes.viewRolePermissionDetailsModalPopupWrapper}>
        <div className={classes.roleLabelModalContainer}>
          <Typography variant="label2"> {translatedStrings?.roleName} </Typography>
          <div className={classes.roleValueModalContainer}>
            <Typography variant="label1">
              {roleData?.name || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <ViewRoleLayout
          translatedStrings={translatedStrings}
          applicationsListData={applicationsListData}
          roleData={roleData}
          roleFields={roleFields}
        />
      </div>
    </ModalPopup>
  );
};
PolicyRolesModal.propTypes = {
  roleData: PropTypes.object,
  applicationsListData: PropTypes.array,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
  translatedStrings: PropTypes.object,
  roleFields: PropTypes.object,
  width: PropTypes.number,
  title: PropTypes.string,
  onCancel: PropTypes.func,
};
export default PolicyRolesModal;
