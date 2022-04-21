import { combineReducers } from 'redux';
import { myApprovalsList, usersList } from './list/reducer';
import { myApprovalsDetails } from './view/reducer';

const myApprovalsReducer = combineReducers({
  myApprovalsList,
  myApprovalsDetails,
  usersList,
});

export default myApprovalsReducer;
