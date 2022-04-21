import { combineReducers } from 'redux';

import pageHeader from '../../../components/page-header/reducer';
import notification from '../../../components/notification/reducer';
import spinnerOverlay from '../../../components/spinner-overlay/reducer';
import { vaultLanding } from '../modules/secrets/vault-reducer';
import userSecretsReducer from '../modules/secrets/secrets-reducer';
import membersReducer from '../../../components/policy/Members/reducer';

const rootReducer = combineReducers({
  pageHeader,
  notification,
  spinnerOverlay,
  vaultLanding,
  userSecretsReducer,
  membersReducer,
});

export default rootReducer;
