import { combineReducers } from 'redux';
import pageHeader from '../../../components/page-header/reducer';
import notification from '../../../components/notification/reducer';
import spinnerOverlay from '../../../components/spinner-overlay/reducer';
import batchEvalReducer from '../../../components/batch-eval/reducer';
import policyReducer from '../modules/policy/policy-reducer';
import rolesReducer from '../modules/roles/roles-reducer';
import permissionsReducer from '../modules/permissions/permissions-reducer';
import membersReducer from '../../../components/policy/Members/reducer';
import featureFlags from '../../../components/feature-flag/reducer';
import consumerReducer from '../../../components/policy/consumer/reducer';

const rootReducer = combineReducers({
  pageHeader,
  notification,
  spinnerOverlay,
  batchEvalReducer,
  membersReducer,
  policyReducer,
  rolesReducer,
  permissionsReducer,
  featureFlags,
  consumerReducer,
});
export default rootReducer;
