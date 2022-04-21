import { combineReducers } from 'redux';
import allSecretsReducer from './all-secrets/all-secrets-reducer';
import myRequestReducer from './my-requests/my-request-reducer';
import myApprovalsReducer from './my-approvals/my-approvals-reducer';

const secretsReducer = combineReducers({
  allSecretsReducer,
  myRequestReducer,
  myApprovalsReducer,
});

export default secretsReducer;
