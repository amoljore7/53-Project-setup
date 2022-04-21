import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { PasswordPolicyViewConstants } from './constants';
import { fetchPasswordPolicyData } from './service';
import { openNotification } from '../../../../../components/notification/action';
import {
  failureViewPasswordPolicy,
  loadingViewPasswordPolicy,
  successViewPasswordPolicy,
} from './action';
import {
  errorNotificationDuration,
  errorNotificationType,
  ppListingPath,
} from '../../../../../utils/common-constants';

function* passwordPolicyViewWatcher() {
  yield takeLatest(
    PasswordPolicyViewConstants.PASSWORD_POLICY_VIEW_DATA_REQUEST,
    passwordPolicyViewWorker
  );
}

function* passwordPolicyViewWorker({ payload }) {
  const { passwordPolicyId, history } = payload;
  try {
    yield put(loadingViewPasswordPolicy());
    const passwordPolicyData = yield call(fetchPasswordPolicyData, passwordPolicyId);
    yield put(successViewPasswordPolicy(passwordPolicyData));
  } catch (error) {
    const reason = error?.response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    history?.push(ppListingPath);
    yield put(failureViewPasswordPolicy(error));
  }
}

export default all([fork(passwordPolicyViewWatcher)]);
