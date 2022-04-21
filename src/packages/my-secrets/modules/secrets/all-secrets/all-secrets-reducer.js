import { combineReducers } from 'redux';
import { getImmediateNodes } from './secret-tree/reducer';
import {
  secretList,
  secretDetails,
  secretTemplateDetails,
  userDetails,
  groupsDetails,
} from './secret-list/reducer';

const allSecretsReducer = combineReducers({
  getImmediateNodes,
  secretList,
  secretDetails,
  secretTemplateDetails,
  userDetails,
  groupsDetails,
});

export default allSecretsReducer;
