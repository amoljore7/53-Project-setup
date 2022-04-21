import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'britive-design-system/core/components/spinner';

const SpinnerContainer = ({ open, size, message }) => {
  return open && <Spinner size={size} message={message} overlay={true} />;
};
SpinnerContainer.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
export default SpinnerContainer;
