import { combineReducers } from 'redux';
import { actionData, addRoleData, permissionData, permissionList } from './add/reducer';
import { editRoleReducer } from './edit/reducer';
import rolesListReducer from './list/reducer';
import { roleDeleteData, roleViewDataReducer } from './view/reducer';

const rolesReducer = combineReducers({
  list: rolesListReducer,
  view: roleViewDataReducer,
  delete: roleDeleteData,
  addRoleData,
  actionData,
  permissionList,
  permissionData,
  edit: editRoleReducer,
});

export default rolesReducer;
