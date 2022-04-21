import { connect } from 'react-redux';
import AddNotificationMedium from './AddNotificationMedium';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { requestAddNotificationMedium, resetAddNotificationMedium } from './action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';

const mapStateToProps = (state) => {
  const { status: addNotificationMediumStatus, error: addNotificationMediumError } =
    state.notificationMediumReducer.add;
  return {
    addNotificationMediumStatus,
    addNotificationMediumError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    postNotificationMediumData: (notificationMediumData, history) => {
      dispatch(requestAddNotificationMedium(notificationMediumData, history));
    },
    resetNotificationMediumData: () => dispatch(resetAddNotificationMedium()),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNotificationMedium);
