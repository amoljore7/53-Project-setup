import { all } from 'redux-saga/effects';
import batchEvalSaga from '../../../components/batch-eval/saga';
import rootVaultWatcher from '../modules/vault/vault-saga';
import getVaultWatcher from '../modules/home/saga';
import secretsWatcher from '../modules/secrets/secrets-saga';
import passwordPolicyWatcher from '../modules/password-policies/password-policies-saga';
import staticSecretTemplateWatcher from '../modules/static-secret-template/static-secret-template-saga';
import membersSaga from '../../../components/policy/Members/saga';
import consumerSaga from '../../../components/policy/consumer/saga';

export default function* () {
  yield all([
    batchEvalSaga,
    ...rootVaultWatcher,
    getVaultWatcher,
    ...secretsWatcher,
    ...passwordPolicyWatcher,
    ...staticSecretTemplateWatcher,
    membersSaga,
    consumerSaga,
  ]);
}
