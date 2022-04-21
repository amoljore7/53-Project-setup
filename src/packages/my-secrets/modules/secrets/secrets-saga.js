import allSecretsWatcher from './all-secrets/all-secrets-saga';
import myRequestsWatcher from './my-requests/my-request-saga';
import myApprovalsWatcher from './my-approvals/my-approvals-saga';

export default [...allSecretsWatcher, ...myRequestsWatcher, ...myApprovalsWatcher];
