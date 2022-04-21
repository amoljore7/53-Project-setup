import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { StaticSecretTemplateListTypes, StaticSecretTemplateDelete } from './constants';
import {
  staticSecretTemplateDeleteAPI,
  staticSecretTemplateListAPI,
} from '../../../../../services/secret-manager-service';
import { translate } from '../../../externalization';
import { openNotification } from '../../../../../components/notification/action';
import {
  failStaticSecretTemplateDelete,
  failStaticSecretTemplateList,
  failStaticSecretTemplateListLoadMore,
  loadingStaticSecretTemplateDelete,
  loadingStaticSecretTemplateList,
  loadingStaticSecretTemplateListLoadMore,
  requestStaticSecretTemplateList,
  successStaticSecretTemplateDelete,
  successStaticSecretTemplateList,
  successStaticSecretTemplateListLoadMore,
} from './action';
import {
  errorNotificationDuration,
  errorNotificationType,
  sstListingPath,
  successNotificationDuration,
  successNotificationType,
  staticSecTempDeleteCheckMsg,
} from '../../../../../utils/common-constants';

function* staticSecretTemplateListWatcher() {
  yield takeLatest(
    StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_REQUEST,
    staticSecretTemplateListWorker
  );
}

function* staticSecretTemplateListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.staticSecretTemplateReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  yield put(loadingStaticSecretTemplateList());
  try {
    const tableList = yield call(staticSecretTemplateListAPI, payload);
    yield put(successStaticSecretTemplateList(tableList));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failStaticSecretTemplateList(reason));
  }
}

function* staticSecretTemplateListLoadMoreWatcher() {
  yield takeLatest(
    StaticSecretTemplateListTypes.STATIC_SECRET_LISTING_LOAD_MORE_REQUEST,
    staticSecretTemplateListLoadMoreWorker
  );
}

function* staticSecretTemplateListLoadMoreWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.staticSecretTemplateReducer?.list?.searchTerm;
  const nextPageToken = (state) => state?.staticSecretTemplateReducer?.list?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  yield put(loadingStaticSecretTemplateListLoadMore());
  try {
    const tableList = yield call(staticSecretTemplateListAPI, payload);
    yield put(successStaticSecretTemplateListLoadMore(tableList));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failStaticSecretTemplateListLoadMore(reason));
  }
}

function* staticSecretTemplateDeleteWatcher() {
  yield takeLatest(
    StaticSecretTemplateDelete.STATIC_SECRET_DELETE_REQUEST,
    staticSecretTemplateDeleteWorker
  );
}

function* staticSecretTemplateDeleteWorker({ payload }) {
  const { id, history } = payload;
  try {
    yield put(loadingStaticSecretTemplateDelete());
    const deletePermissionStatus = yield call(staticSecretTemplateDeleteAPI, id);
    yield put(successStaticSecretTemplateDelete(deletePermissionStatus));
    history?.push(sstListingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );
    yield put(requestStaticSecretTemplateList());
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const checkReason = reason?.substring(0, 61).toLowerCase();
    let errorMessage;
    if (response?.status === 400 && checkReason === staticSecTempDeleteCheckMsg) {
      errorMessage = translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_TEMPLATE_FAILED_MESSAGE');
    } else {
      errorMessage = translate('STATIC_SECRETS_TEMPLATE_MODULE.DELETE_FAILED', { reason });
    }
    yield put(
      openNotification(errorNotificationType, errorMessage, true, errorNotificationDuration)
    );
    yield put(failStaticSecretTemplateDelete(reason));
  }
}

export default all([
  fork(staticSecretTemplateListWatcher),
  fork(staticSecretTemplateDeleteWatcher),
  fork(staticSecretTemplateListLoadMoreWatcher),
]);
