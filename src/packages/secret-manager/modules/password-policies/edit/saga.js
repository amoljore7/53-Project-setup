import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  ppListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import {
  failureEditPasswordPolicy,
  loadingEditPasswordPolicy,
  successEditPasswordPolicy,
} from './action';
import { EditPasswordPolicyTypes, translatedStrings } from './constants';
import { editPasswordPolicy } from './../../../../../services/secret-manager-service';

function* editPasswordPolicyDataWatcher() {
  yield takeLatest(
    EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_REQUEST,
    editPasswordPolicyDataWorker
  );
}

function* editPasswordPolicyDataWorker({ payload }) {
  try {
    yield put(loadingEditPasswordPolicy());
    yield call(editPasswordPolicy, payload?.id, payload?.passwordPolicyData);
    yield put(successEditPasswordPolicy());

    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.editNotificationSuccessMessage,
        true,
        successNotificationDuration
      )
    );
    payload?.history?.push(ppListingPath);
  } catch (error) {
    yield put(failureEditPasswordPolicy(error));
  }
}

export default all([fork(editPasswordPolicyDataWatcher)]);
