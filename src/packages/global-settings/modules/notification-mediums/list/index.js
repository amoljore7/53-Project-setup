import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import {
  requestNotificationMediumList,
  requestNotificationMediumDelete,
  updateNotificationMediumSearchTerm,
  resetNotificationMediumDelete,
  requestNotificationMediumListLoadMore,
} from './action';
import NotificationMediumList from './NotificationMediumList';

const mapStateToProps = (state) => {
  const {
    status: notificationMediumStatus,
    result: notificationMediumData,
    pagination: notificationMediumPagination,
    searchTerm: notificationMediumSearchTerm,
  } = state.notificationMediumReducer.list;
  const { status: deleteNotificationMediumStatus } = state.notificationMediumReducer.delete;
  return {
    notificationMediumStatus,
    notificationMediumData,
    notificationMediumPagination,
    deleteNotificationMediumStatus,
    notificationMediumSearchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getNotificationMediumList: () => dispatch(requestNotificationMediumList()),
    deleteNotificationMedium: (id) => dispatch(requestNotificationMediumDelete(id)),
    updateNotificationMediumSearchTerm: (search) =>
      dispatch(updateNotificationMediumSearchTerm(search)),
    resetDeleteNotificationMedium: () => dispatch(resetNotificationMediumDelete()),
    getNotificationMediumListLoadMoreData: () => dispatch(requestNotificationMediumListLoadMore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMediumList);
