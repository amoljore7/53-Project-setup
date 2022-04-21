import { all } from 'redux-saga/effects';
import secretsWatcher from '../modules/secrets/secrets-saga';
import getVaultWatcher from '../modules/secrets/vault-saga';

export default function* () {
  yield all([...secretsWatcher, getVaultWatcher]);
}
