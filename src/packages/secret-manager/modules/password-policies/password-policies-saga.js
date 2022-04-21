import passwordPolicyListSaga from './list/saga';
import addPasswordPolicySaga from './add/saga';
import passwordPolicyViewSaga from './view/saga';
import editPasswordPolicySaga from './edit/saga';

export default [
  passwordPolicyListSaga,
  addPasswordPolicySaga,
  passwordPolicyViewSaga,
  editPasswordPolicySaga,
];
