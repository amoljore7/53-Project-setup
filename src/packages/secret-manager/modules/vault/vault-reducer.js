import { combineReducers } from 'redux';
import {
  createVault,
  notificationMediumListReducer,
  usersList,
  tagsList,
  channelList,
} from './create/reducer';
import { deleteVault, rotateVaultKey } from './details/reducer';
import { editVault } from './edit/reducer';

const vaultReducer = combineReducers({
  createVault,
  deleteVault,
  editVault,
  rotateVaultKey,
  notificationMediumListReducer,
  usersList,
  tagsList,
  channelList,
});

export default vaultReducer;
