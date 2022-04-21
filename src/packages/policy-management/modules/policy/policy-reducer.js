import { combineReducers } from 'redux';
import addPolicyReducer from './add/reducer';
import editPolicyReducer from './edit/reducer';
import clonePolicyReducer from './clone/reducer';
import policyListReducer from './policy-list/reducer';
import viewPolicyReducer from './view/reducer';

const policyReducer = combineReducers({
  list: policyListReducer,
  add: addPolicyReducer,
  edit: editPolicyReducer,
  clone: clonePolicyReducer,
  view: viewPolicyReducer,
});

export default policyReducer;
