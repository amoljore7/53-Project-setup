import { combineReducers } from 'redux';
import { permissionsTableList, deletePermissions } from './list/reducer';
import { viewPermissions } from './view/reducer';
import { addPermission, permissionActionsList, permissionApplicationsList } from './add/reducer';
import { editPermission } from './edit/reducer';

const permissionsReducer = combineReducers({
  permissionsTableList,
  deletePermissions,
  viewPermissions,
  addPermission,
  permissionActionsList,
  permissionApplicationsList,
  editPermission,
});

export default permissionsReducer;
