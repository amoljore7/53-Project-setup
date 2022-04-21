import { combineReducers } from 'redux';
import { updateTreeData } from './all-secrets/secret-tree/reducer';
import {
  secretList,
  deleteSecret,
  userDetails,
  groupsDetails,
} from './all-secrets/secret-list/reducer';
import nodeSecretMetadata from '../../../../components/policy/metadata/reducer';
import policyListReducer from './all-secrets/policy/list/reducer';
import policyView from './all-secrets/policy/view/reducer';
import { secretDetails, secretTemplateDetails } from './all-secrets/secret-view/reducer';
import { myApprovalsList, approvalsUsersList } from './my-approvals/list/reducer';
import { myRequestsList, requestUsersList } from './my-requests/list/reducer';
import { myApprovalsDetails } from './my-approvals/view/reducer';
import editPolicyReducer from './all-secrets/policy/edit/reducer';
import addPolicyReducer from './all-secrets/policy/add/reducer';
import { secretPolicyTabIndex } from './all-secrets/reducer';
const secretsReducer = combineReducers({
  updateTreeData,
  secretList,
  deleteSecret,
  secretDetails,
  secretTemplateDetails,
  myApprovalsList,
  myRequestsList,
  myApprovalsDetails,
  nodeSecretMetadata,
  policyListReducer,
  policyView,
  addPolicyReducer,
  editPolicyReducer,
  requestUsersList,
  approvalsUsersList,
  userDetails,
  groupsDetails,
  secretPolicyTabIndex,
});

export default secretsReducer;
