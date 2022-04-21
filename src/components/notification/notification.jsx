import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'britive-design-system/core/components/notification';

const NotificationContainer = ({ type, duration, open, title, closeNotification, outside }) => {
  const closeHandler = () => {
    closeNotification();
  };
  return (
    open && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: outside ? '-144px' : '0'}}>
        <div style={{ position: 'absolute', zIndex: 9999 }}>
          <Notification
            type={type}
            title={title}
            duration={duration}
            open={open}
            onClose={closeHandler}
          />
        </div>
      </div>
    )
  );
};
NotificationContainer.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['general', 'success', 'error', 'warning']),
  duration: PropTypes.number,
  closeNotification: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  outside: PropTypes.bool,
};
export default NotificationContainer;
