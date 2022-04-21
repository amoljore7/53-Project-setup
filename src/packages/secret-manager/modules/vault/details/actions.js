import { HeaderConstants } from '../../../../../components/page-header/constants';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { DeleteVaultTypes, RotateVaultKeyTypes } from './constants';

const setPageHeader = (title, routeToNameList) => ({
  type: HeaderConstants.HEADER_PROPS,
  payload: {
    title,
    routeToNameList,
  },
});

const spinnerOverlay = ({ open, size, message }) => initSpinnerOverlay({ open, size, message });

const deleteVault = (vaultId, history) => ({
  type: DeleteVaultTypes.DELETE_VAULT_REQUEST,
  payload: {
    vaultId,
    history,
  },
});

const openNotification = ({ type, title, open, duration }) => ({
  type: DeleteVaultTypes.OPEN_NOTIFICATION,
  payload: {
    open,
    type,
    title,
    duration,
  },
});

const rotateVaultKey = (id, history) => ({
  type: RotateVaultKeyTypes.ROTATE_VAULT_KEY_REQUEST,
  payload: {
    id,
    history,
  },
});

export { setPageHeader, deleteVault, spinnerOverlay, openNotification, rotateVaultKey };
