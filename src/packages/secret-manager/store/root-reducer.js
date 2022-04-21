import { combineReducers } from 'redux';

import pageHeader from '../../../components/page-header/reducer';
import notification from '../../../components/notification/reducer';
import spinnerOverlay from '../../../components/spinner-overlay/reducer';
import batchEvalReducer from '../../../components/batch-eval/reducer';
import { vaultLanding } from '../modules/home/reducer';
import vaultReducer from '../modules/vault/vault-reducer';
import passwordPolicyReducer from '../modules/password-policies/password-policies-reducer';
import secretsReducer from '../modules/secrets/secrets-reducer';
import staticSecretTemplateReducer from '../modules/static-secret-template/static-secret-template-reducer';
import membersReducer from '../../../components/policy/Members/reducer';
import consumerReducer from '../../../components/policy/consumer/reducer';

const rootReducer = combineReducers({
  pageHeader,
  notification,
  spinnerOverlay,
  batchEvalReducer,
  vaultLanding,
  vaultReducer,
  passwordPolicyReducer,
  secretsReducer,
  staticSecretTemplateReducer,
  membersReducer,
  consumerReducer,
});

export default rootReducer;
