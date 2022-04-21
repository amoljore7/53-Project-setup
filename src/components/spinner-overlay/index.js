import SpinnerContainer from './SpinnerOverlay';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { open, size, message } = state.spinnerOverlay;
  return {
    open,
    size,
    message,
  };
};

export default connect(mapStateToProps, null)(SpinnerContainer);
