import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { openNotification } from '../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../utils/common-constants';
import { VaultLandingTypes, errorCodeForNoVault } from './constants';
import { getVault } from './service';

function* getVaultWatcher() {
  yield takeLatest(VaultLandingTypes.VAULT_LANDING_REQUEST, getVaultWorker);
}

function* getVaultWorker() {
  yield put({ type: VaultLandingTypes.VAULT_LANDING_LOADING });
  try {
    const response = yield call(getVault);
    yield put({
      type: VaultLandingTypes.VAULT_LANDING_SUCCESS,
      payload: {
        ...response,
      },
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const errorCode = response?.data?.errorCode;
    // Avoiding no vault found message
    if (errorCode !== errorCodeForNoVault) {
      yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    }
    yield put({
      type: VaultLandingTypes.VAULT_LANDING_FAILURE,
      payload: { ...response },
    });
  }
}

export default all([fork(getVaultWatcher)]);
