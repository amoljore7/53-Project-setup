import { combineReducers } from 'redux';
import { myRequestsList, usersList, tagsList } from './list/reducer';

const myRequestReducer = combineReducers({
  myRequestsList,
  usersList,
  tagsList,
});

export default myRequestReducer;
