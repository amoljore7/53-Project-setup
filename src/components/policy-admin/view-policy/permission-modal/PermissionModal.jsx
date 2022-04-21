import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import { classes, smallModalPopupWidth } from './constants';
import PropTypes from 'prop-types';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import './PermissionModal.scss';
import ViewPermissionLayout from './ViewPermissionLayout';

const PolicyPermissionModal = ({
  permissionData,
  applicationsListData,
  translatedStrings,
  title,
  onCancel,
  width = smallModalPopupWidth,
}) => {
  return (
    <ModalPopup width={width} title={title} onCancel={onCancel}>
      <div className={classes.viewRolePermissionDetailsModalPopupWrapper}>
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {translatedStrings?.permissionName} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {permissionData?.name || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {translatedStrings?.sourceName} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {permissionData?.isInline
                ? translatedStrings?.inlineText
                : translatedStrings?.preDefinedText}
            </Typography>
          </div>
        </div>
        <ViewPermissionLayout
          translatedStrings={translatedStrings}
          permissionData={permissionData}
          applicationsListData={applicationsListData}
        />
      </div>
    </ModalPopup>
  );
};

PolicyPermissionModal.propTypes = {
  permissionData: PropTypes.object,
  applicationsListData: PropTypes.array,
  translatedStrings: PropTypes.object,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  width: PropTypes.number,
};

export default PolicyPermissionModal;
