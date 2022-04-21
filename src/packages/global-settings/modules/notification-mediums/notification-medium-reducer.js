import { combineReducers } from 'redux';
import { notificationMediumList, deleteNotificationMedium } from './list/reducer';
import { notificationMediumView } from './view/reducer';
import { addNotificationMediumData } from './add/reducer';
import { editNotificationMediumData } from './edit/reducer';

const notificationMediumReducer = combineReducers({
  list: notificationMediumList,
  delete: deleteNotificationMedium,
  view: notificationMediumView,
  add: addNotificationMediumData,
  edit: editNotificationMediumData,
});

export default notificationMediumReducer;
