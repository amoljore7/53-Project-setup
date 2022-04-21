import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { failureVaultLanding, loadingVaultLanding, successVaultLanding } from './action';
import { VaultLandingTypes } from './constants';
import { getVault } from './service';

function* getVaultWatcher() {
  yield takeLatest(VaultLandingTypes.VAULT_LANDING_REQUEST, getVaultWorker);
}

function* getVaultWorker() {
  yield put(loadingVaultLanding());
  try {
    const response = yield call(getVault);
    yield put(successVaultLanding(response));
  } catch ({ response }) {
    yield put(failureVaultLanding(response));
  }
}

export default all([fork(getVaultWatcher)]);
