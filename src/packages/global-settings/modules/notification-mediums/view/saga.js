import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { notificationMediumViewConstants, notificationMediumConstants } from './constants';
import { fetchNotificationMediumById } from '../../../../../services/notification-medium-service';
import { openNotification } from '../../../../../components/notification/action';
import { translate } from '../../../externalization';
import {
  failureViewNotificationMedium,
  loadingViewNotificationMedium,
  successViewNotificationMedium,
} from './action';
import { errorNotificationDuration } from '../../../../../utils/common-constants';

function* notificationMediumViewWatcher() {
  yield takeLatest(
    notificationMediumViewConstants.NOTIFICATION_MEDIUM_VIEW_DATA_REQUEST,
    notificationMediumViewWorker
  );
}

function* notificationMediumViewWorker({ payload }) {
  const { notificationMediumId, history } = payload;
  try {
    yield put(loadingViewNotificationMedium());
    const notificationMediumData = yield call(fetchNotificationMediumById, notificationMediumId);
    yield put(successViewNotificationMedium(notificationMediumData));
  } catch (error) {
    history?.push('/admin/global-setting/notification-medium');
    yield put(failureViewNotificationMedium(error));
    yield put(
      openNotification(
        notificationMediumConstants?.errorText,
        translate('NOTIFICATION_MEDIUM_MODULE.VIEW_NOTIFICATION_MEDIUM_ERROR_MESSAGE'),
        true,
        errorNotificationDuration
      )
    );
  }
}

export default all([fork(notificationMediumViewWatcher)]);
