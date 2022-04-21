import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestAddNotificationMedium, resetAddNotificationMedium } from '../add/action';
import { requestViewNotificationMedium } from '../view/action';
import CloneNotificationMedium from './CloneNotificationMedium';

const mapStateToProps = (state) => {
  const { status: addNotificationMediumStatus, error: addNotificationMediumError } =
    state.notificationMediumReducer.add;
  const { status: notificationMediumDataStatus, data: notificationMediumData } =
    state.notificationMediumReducer.view;
  return {
    addNotificationMediumStatus,
    addNotificationMediumError,
    notificationMediumDataStatus,
    notificationMediumData,
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
    getNotificationMediumById: (notificationMediumId, history) => {
      const payload = { notificationMediumId, history };
      dispatch(requestViewNotificationMedium(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CloneNotificationMedium);
