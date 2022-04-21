import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestViewNotificationMedium } from '../view/action';
import { requestEditNotificationMedium, resetEditNotificationMedium } from './action';
import EditNotificationMedium from './EditNotificationMedium';

const mapStateToProps = (state) => {
  const { status: editNotificationMediumStatus, error: editNotificationMediumError } =
    state.notificationMediumReducer.edit;
  const { status: editNotificationMediumDataStatus, data: editNotificationMediumData } =
    state.notificationMediumReducer.view;
  return {
    editNotificationMediumStatus,
    editNotificationMediumError,
    editNotificationMediumDataStatus,
    editNotificationMediumData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    postNotificationMediumData: (id, notificationMediumData, history) => {
      dispatch(requestEditNotificationMedium(id, notificationMediumData, history));
    },
    resetNotificationMediumData: () => dispatch(resetEditNotificationMedium()),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getNotificationMediumById: (notificationMediumId, history) => {
      const payload = { notificationMediumId, history };
      dispatch(requestViewNotificationMedium(payload));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNotificationMedium);
