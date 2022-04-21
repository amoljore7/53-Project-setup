import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import {
  notificationMediumListConstants,
  translatedStrings,
  notificationMediumDeleteConstants,
  notificationMediumConstants,
} from './constants';
import {
  fetchNotificationMediumFilterList,
  deleteNotificationMedium,
} from '../../../../../services/notification-medium-service';
import {
  failureNotificationMediumList,
  loadingNotificationMediumList,
  successNotificationMediumList,
  loadingNotificationMediumDelete,
  failureNotificationMediumDelete,
  successNotificationMediumDelete,
  loadingNotificationMediumListLoadMore,
  successNotificationMediumListLoadMore,
  failureNotificationMediumListLoadMore,
} from './action';
import { openNotification } from '../../../../../components/notification/action';
import { translate } from '../../../externalization';
import {
  errorNotificationDuration,
  successNotificationDuration,
} from '../../../../../utils/common-constants';

function* notificationMediumListWatcher() {
  yield takeLatest(
    notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_REQUEST,
    notificationMediumListWorker
  );
}

function* notificationMediumListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.notificationMediumReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  try {
    yield put(loadingNotificationMediumList());
    const notificationMediumData = yield call(fetchNotificationMediumFilterList, payload);
    const { data } = notificationMediumData;
    yield put(successNotificationMediumList(data));
  } catch (error) {
    const reason = error?.response?.data?.message ?? '';
    yield put(failureNotificationMediumList(error));
    yield put(
      openNotification(
        notificationMediumConstants?.errorText,
        translate('NOTIFICATION_MEDIUM_MODULE.ERROR_LOADING_NOTIFICATION_LIST', {
          reason,
        }),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* notificationMediumDeleteWatcher() {
  yield takeLatest(
    notificationMediumDeleteConstants.NOTIFICATION_MEDIUM_DELETE_REQUEST,
    notificationMediumDeleteWorker
  );
}

function* notificationMediumDeleteWorker({ payload }) {
  try {
    yield put(loadingNotificationMediumDelete());
    yield call(deleteNotificationMedium, payload);
    yield put(successNotificationMediumDelete());
    yield put(
      openNotification(
        notificationMediumConstants?.successText,
        translatedStrings.deleteNotificationMediumSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    yield put({ type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_REQUEST });
  } catch (error) {
    const reason = error?.response?.data?.message ?? '';
    yield put(failureNotificationMediumDelete(error));
    let errorMessage;
    if (
      error?.response?.status === 400 &&
      (reason || '').includes(notificationMediumConstants.referencesFoundText)
    ) {
      errorMessage = translatedStrings.nmFailureMessageForUsedMedium;
    } else {
      errorMessage = translatedStrings.nmFailureMessage(reason);
    }
    yield put(
      openNotification(
        notificationMediumConstants?.errorText,
        errorMessage,
        true,
        errorNotificationDuration
      )
    );
  }
}

function* notificationMediumListLoadMoreDataWatcher() {
  yield takeLatest(
    notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOAD_MORE_DATA_REQUEST,
    notificationMediumListLoadMoreDataWorker
  );
}

function* notificationMediumListLoadMoreDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.notificationMediumReducer?.list?.searchTerm;
  const nextPageToken = (state) => state?.notificationMediumReducer?.list?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  try {
    yield put(loadingNotificationMediumListLoadMore());
    const notificationMediumListResponse = yield call(fetchNotificationMediumFilterList, payload);
    const { data } = notificationMediumListResponse;
    yield put(successNotificationMediumListLoadMore(data));
  } catch (error) {
    yield put(failureNotificationMediumListLoadMore(error));
  }
}

export default all([
  fork(notificationMediumListWatcher),
  fork(notificationMediumDeleteWatcher),
  fork(notificationMediumListLoadMoreDataWatcher),
]);
