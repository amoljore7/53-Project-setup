import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  ppListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import {
  failureAddPasswordPolicy,
  loadingAddPasswordPolicy,
  successAddPasswordPolicy,
} from './action';
import { AddPasswordPolicyTypes, translatedStrings } from './constants';
import { addPasswordPolicy } from './../../../../../services/secret-manager-service';

function* addPasswordPolicyWatcher() {
  yield takeLatest(AddPasswordPolicyTypes.ADD_PASSWORD_POLICY_REQUEST, addPasswordPolicyWorker);
}

function* addPasswordPolicyWorker({ payload }) {
  try {
    yield put(loadingAddPasswordPolicy());
    const addPasswordPolicyData = yield call(addPasswordPolicy, payload?.passwordPolicyData);
    yield put(successAddPasswordPolicy(addPasswordPolicyData));
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.addPasswordPolicySuccessMessage,
        true,
        successNotificationDuration
      )
    );
    payload?.history?.push(ppListingPath);
  } catch (error) {
    yield put(failureAddPasswordPolicy(error));
  }
}

export default all([fork(addPasswordPolicyWatcher)]);
