import { combineReducers } from 'redux';
import pageHeader from '../../../components/page-header/reducer';
import notification from '../../../components/notification/reducer';
import spinnerOverlay from '../../../components/spinner-overlay/reducer';
import notificationMediumReducer from '../modules/notification-mediums/notification-medium-reducer';
const rootReducer = combineReducers({
  pageHeader,
  notification,
  spinnerOverlay,
  notificationMediumReducer,
});
export default rootReducer;
