import manageSecretsWatcher from './all-secrets/secret-tree/saga';
import secretsListWatcher from './all-secrets/secret-list/saga';
import secretDetailsWatcher from './all-secrets/secret-view/saga';
import secretCreateWatcher from './add/saga';
import secretUpdateWatcher from './edit/saga';
import nodeSecretWatcher from '../../../../components/policy/metadata/saga';
import policyListWatchers from './all-secrets/policy/list/saga';
import policyViewWatcher from './all-secrets/policy/view/saga';
import addPolicyWatchers from './all-secrets/policy/add/saga';
import editPolicyWatchers from './all-secrets/policy/edit/saga';
import myApprovalsListWatcher from './my-approvals/list/saga';
import myRequestsListWatcher from './my-requests/list/saga';
import myApprovalsDetailsWatcher from './my-approvals/view/saga';

export default [
  manageSecretsWatcher,
  nodeSecretWatcher,
  secretsListWatcher,
  secretDetailsWatcher,
  secretCreateWatcher,
  secretUpdateWatcher,
  myApprovalsListWatcher,
  myRequestsListWatcher,
  myApprovalsDetailsWatcher,
  policyListWatchers,
  policyViewWatcher,
  addPolicyWatchers,
  editPolicyWatchers,
];
