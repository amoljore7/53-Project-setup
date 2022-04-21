import { combineReducers } from 'redux';
import { deletePasswordPolicy, passwordPolicyList } from './list/reducer';
import { addPasswordPolicyData } from './add/reducer';
import { passwordPolicyView } from './view/reducer';
import { editPasswordPolicyReducer } from './edit/reducer';

const passwordPolicyReducer = combineReducers({
  list: passwordPolicyList,
  delete: deletePasswordPolicy,
  add: addPasswordPolicyData,
  view: passwordPolicyView,
  edit: editPasswordPolicyReducer,
});

export default passwordPolicyReducer;
