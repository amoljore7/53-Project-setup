import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'britive-design-system/core/components/snackbar';
import { classes } from './constants';
import './Snackbar.scss';

const SnackbarFormError = ({ title, errorList, hasError }) => {
  return (
    hasError && (
      <div className={classes.snackbarStyle}>
        <Snackbar title={title} errorList={errorList} />
      </div>
    )
  );
};

SnackbarFormError.propTypes = {
  title: PropTypes.string.isRequired,
  errorList: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default SnackbarFormError;
