import { all } from 'redux-saga/effects';
import notificationMediumSaga from '../modules/notification-mediums/notification-medium-saga';

export default function* () {
  yield all([...notificationMediumSaga]);
}
