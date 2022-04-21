import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import {
  PasswordPolicyDeleteConstants,
  PasswordPolicyListConstants,
  translatedStrings,
} from './constants';
import {
  deletePasswordPolicy,
  fetchPasswordPolicyList,
} from './../../../../../services/secret-manager-service';
import { openNotification } from '../../../../../components/notification/action';
import { translate } from '../../../externalization';
import {
  failurePasswordPolicyDelete,
  failurePasswordPolicyList,
  failurePasswordPolicyListLoadMore,
  loadingPasswordPolicyDelete,
  loadingPasswordPolicyList,
  loadingPasswordPolicyListLoadMore,
  successPasswordPolicyDelete,
  successPasswordPolicyList,
  successPasswordPolicyListLoadMore,
} from './action';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationType,
  pwdPolicyDeleteCheckMsg,
} from '../../../../../utils/common-constants';

function* passwordPolicyListWatcher() {
  yield takeLatest(
    PasswordPolicyListConstants.PASSWORD_POLICY_LIST_REQUEST,
    passwordPolicyListWorker
  );
}

function* passwordPolicyListWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.passwordPolicyReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  try {
    yield put(loadingPasswordPolicyList());
    const passwordPolicyData = yield call(fetchPasswordPolicyList, payload);
    yield put(successPasswordPolicyList(passwordPolicyData));
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failurePasswordPolicyList(error));
  }
}

function* passwordPolicyListLoadMoreWatcher() {
  yield takeLatest(
    PasswordPolicyListConstants.PASSWORD_POLICY_LIST_LOAD_MORE_REQUEST,
    passwordPolicyListLoadMoreWorker
  );
}

function* passwordPolicyListLoadMoreWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.passwordPolicyReducer?.list?.searchTerm;
  const nextPageToken = (state) => state?.passwordPolicyReducer?.list?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  try {
    yield put(loadingPasswordPolicyListLoadMore());
    const passwordPolicyData = yield call(fetchPasswordPolicyList, payload);
    yield put(successPasswordPolicyListLoadMore(passwordPolicyData));
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failurePasswordPolicyListLoadMore(error));
  }
}

function* passwordPolicyDeleteWatcher() {
  yield takeLatest(
    PasswordPolicyDeleteConstants.PASSWORD_POLICY_DELETE_REQUEST,
    passwordPolicyDeleteWorker
  );
}

function* passwordPolicyDeleteWorker({ payload }) {
  try {
    yield put(loadingPasswordPolicyDelete());
    yield call(deletePasswordPolicy, payload);
    yield put(successPasswordPolicyDelete());
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.deletePasswordPolicySuccessMessage,
        true,
        errorNotificationDuration
      )
    );
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    const checkReason = reason?.substring(0, 54).toLowerCase();
    yield put(failurePasswordPolicyDelete(error));
    let errorMessage;
    if (error?.response?.status === 400 && checkReason === pwdPolicyDeleteCheckMsg) {
      errorMessage = translate('PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_FAILURE_MESSAGE');
    } else {
      errorMessage = translate('PASSWORD_POLICIES_MODULE.DELETE_PASSWORD_POLICY_FAILURE', {
        reason,
      });
    }
    yield put(
      openNotification(errorNotificationType, errorMessage, true, errorNotificationDuration)
    );
  }
}

export default all([
  fork(passwordPolicyListWatcher),
  fork(passwordPolicyDeleteWatcher),
  fork(passwordPolicyListLoadMoreWatcher),
]);
