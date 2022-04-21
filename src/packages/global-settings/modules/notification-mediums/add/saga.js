import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  successNotificationDuration,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import {
  failureAddNotificationMedium,
  loadingAddNotificationMedium,
  successAddNotificationMedium,
} from './action';
import {
  notificationMediumConstants,
  AddNotificationMediumTypes,
  translatedStrings,
} from './constants';
import { addNotificationMedium } from '../../../../../services/notification-medium-service';

function* addNotificationMediumWatcher() {
  yield takeLatest(
    AddNotificationMediumTypes.ADD_NOTIFICATION_MEDIUM_REQUEST,
    addNotificationMediumWorker
  );
}

function* addNotificationMediumWorker({ payload }) {
  try {
    yield put(loadingAddNotificationMedium());
    const addNotificationMediumData = yield call(
      addNotificationMedium,
      payload?.notificationMediumData
    );
    yield put(successAddNotificationMedium(addNotificationMediumData));
    yield put(
      openNotification(
        notificationMediumConstants.successText,
        translatedStrings.addNotificationMediumSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    payload?.history?.push('/admin/global-settings/notification-medium');
  } catch (error) {
    const reason = error?.response?.data?.message ?? '';
    yield put(failureAddNotificationMedium(error));
    yield put(
      openNotification(
        notificationMediumConstants.errorText,
        translate('NOTIFICATION_MEDIUM_MODULE.ADD_NOTIFICATION_MEDIUM_FAILURE_MESSAGE', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

export default all([fork(addNotificationMediumWatcher)]);
