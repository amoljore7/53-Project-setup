import NotificationContainer from './notification';
import { CLOSE_NOTIFICATION } from './types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { type, duration, open, title, outside } = state.notification;
  return {
    type,
    duration,
    open,
    title,
    outside
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeNotification: () => dispatch({ type: CLOSE_NOTIFICATION, payload: {} }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
