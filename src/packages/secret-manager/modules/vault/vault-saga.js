import createVaultWatcher from './create/saga';
import detailsVaultWatcher from './details/saga';
import editVaultWatcher from './edit/saga';

export default [createVaultWatcher, detailsVaultWatcher, editVaultWatcher];
