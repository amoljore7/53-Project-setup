import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { translate } from '../../../externalization';
import { DeleteVaultTypes, RotateVaultKeyTypes } from './constants';
import { deleteVault, rotateVaultKey } from '../../../../../services/secret-manager-service';
import { VaultLandingTypes } from '../../home/constants';
import { openNotification } from '../../../../../components/notification/action';
import { getVaultLandingRequest } from '../../home/actions';
import {
  errorNotificationDuration,
  errorNotificationType,
  secretManagerLandingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';

function* deleteVaultWatcher() {
  yield takeLatest(DeleteVaultTypes.DELETE_VAULT_REQUEST, deleteVaultWorker);
}

function* deleteVaultWorker({ payload }) {
  const { vaultId, history } = payload;
  yield put({ type: DeleteVaultTypes.DELETE_VAULT_LOADING });
  try {
    const data = yield call(deleteVault, vaultId);
    yield put({
      type: DeleteVaultTypes.DELETE_VAULT_SUCCESS,
      payload: {
        ...data,
      },
    });
    history.push(secretManagerLandingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('VAULT_DETAILS_MODULE.VAULT_DELETED_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );
    yield put(getVaultLandingRequest());
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(
      openNotification(
        errorNotificationType,
        translate('VAULT_DETAILS_MODULE.VAULT_DELETION_FAIL_MESSAGE', { reason }),
        true,
        errorNotificationDuration
      )
    );
    yield put({
      type: DeleteVaultTypes.DELETE_VAULT_FAILURE,
      payload: { errorStatus: reason },
    });
  }
}

function* rotateVaultKeyWatcher() {
  yield takeLatest(RotateVaultKeyTypes.ROTATE_VAULT_KEY_REQUEST, rotateVaultKeyWorker);
}

function* rotateVaultKeyWorker({ payload }) {
  const { id } = payload;
  yield put({ type: RotateVaultKeyTypes.ROTATE_VAULT_KEY_LOADING });
  try {
    const res = yield call(rotateVaultKey, id);
    yield put({
      type: RotateVaultKeyTypes.ROTATE_VAULT_KEY_SUCCESS,
      payload: {
        ...res,
      },
    });
    yield put(
      openNotification(
        successNotificationType,
        translate('VAULT_DETAILS_MODULE.VAULT_ROTATE_KEY_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );
    yield put({
      type: VaultLandingTypes.VAULT_LANDING_REQUEST,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(
      openNotification(
        errorNotificationType,
        translate('VAULT_DETAILS_MODULE.VAULT_ROTATE_KEY_FAIL_MESSAGE', { reason }),
        true,
        errorNotificationDuration
      )
    );
    yield put({
      type: RotateVaultKeyTypes.ROTATE_VAULT_KEY_FAILURE,
      payload: { errorStatus: reason },
    });
  }
}

export default all([fork(deleteVaultWatcher), fork(rotateVaultKeyWatcher)]);
