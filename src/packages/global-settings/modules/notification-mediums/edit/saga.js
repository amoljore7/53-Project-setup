import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  successNotificationDuration,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import {
  failureEditNotificationMedium,
  loadingEditNotificationMedium,
  successEditNotificationMedium,
} from './action';
import {
  notificationMediumConstants,
  editNotificationMediumTypes,
  translatedStrings,
} from './constants';
import { editNotificationMedium } from '../../../../../services/notification-medium-service';

function* editNotificationMediumWatcher() {
  yield takeLatest(
    editNotificationMediumTypes.EDIT_NOTIFICATION_MEDIUM_REQUEST,
    editNotificationMediumWorker
  );
}

function* editNotificationMediumWorker({ payload }) {
  try {
    yield put(loadingEditNotificationMedium());
    const editNotificationMediumData = yield call(
      editNotificationMedium,
      payload?.id,
      payload?.notificationMediumData
    );
    yield put(successEditNotificationMedium(editNotificationMediumData));
    yield put(
      openNotification(
        notificationMediumConstants.successText,
        translatedStrings.editNotificationMediumSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    payload?.history?.push('/admin/global-settings/notification-medium');
  } catch (error) {
    const reason = error?.response?.data?.message ?? '';
    yield put(failureEditNotificationMedium(error));
    yield put(
      openNotification(
        notificationMediumConstants.errorText,
        translate('NOTIFICATION_MEDIUM_MODULE.EDIT_NOTIFICATION_MEDIUM_FAILURE_MESSAGE', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

export default all([fork(editNotificationMediumWatcher)]);
