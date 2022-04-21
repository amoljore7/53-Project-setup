import React from 'react';
import Typography from 'britive-design-system/core/components/typography';
import Radio from 'britive-design-system/core/components/radio';
import PropTypes from 'prop-types';
import { classes } from './constants';
import './SMPermission.scss';

const Permissions = ({ validationHook, translatedStrings, accessLevelOptions }) => {
  const accessLevelProps = {
    defaultValue: validationHook.values.accessLevel,
    label: translatedStrings.accessLevel,
    name: 'access-level',
    direction: 'vertical',
    onChange: (e) => {
      const newValue = e.target.value;
      validationHook.handleChange(validationHook.names.accessLevel, newValue);
    },
    options: accessLevelOptions,
  };
  const getRadioOptions = () => {
    return (
      <div className={classes.addPolicyFieldWrapper}>
        <div className={classes.addPolicyFieldValueWrapper}>
          <Radio {...accessLevelProps} />
        </div>
      </div>
    );
  };
  return (
    <div className={classes.stepperMainContainer}>
      <div className={classes.addPolicyFieldWrapper}>
        <Typography variant="label2">{translatedStrings.accessType}</Typography>
        <div className={classes.addPolicyFieldValueWrapper}>
          <Typography variant="label1">{validationHook.values.allowDeny}</Typography>
        </div>
      </div>
      {getRadioOptions()}
    </div>
  );
};

Permissions.propTypes = {
  validationHook: PropTypes.object,
  translatedStrings: PropTypes.object,
  accessLevelOptions: PropTypes.array,
};
export default Permissions;
