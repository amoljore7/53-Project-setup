import { connect } from 'react-redux';
import NotificationMediumView from './NotificationMediumView';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestViewNotificationMedium, resetViewNotificationMedium } from './action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { requestNotificationMediumDelete } from '../list/action';

const mapStateToProps = (state) => {
  const { status: notificationMediumViewStatus, data: notificationMediumData } =
    state.notificationMediumReducer.view;
  const { status: deleteNotificationMediumStatus } = state.notificationMediumReducer.delete;
  return {
    notificationMediumViewStatus,
    notificationMediumData,
    deleteNotificationMediumStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    fetchNotificationMediumData: (notificationMediumId, history) => {
      const payload = { notificationMediumId, history };
      dispatch(requestViewNotificationMedium(payload));
    },
    deleteNotificationMediumById: (id) => dispatch(requestNotificationMediumDelete(id)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    resetNotificationMediumView: () => {
      dispatch(resetViewNotificationMedium());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMediumView);
