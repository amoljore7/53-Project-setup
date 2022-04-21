import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { updateSecretTypes, translatedStrings } from './constants';
import { openNotification } from '../../../../../components/notification/action';
import { INIT_SPINNER_OVERLAY } from '../../../../../components/spinner-overlay/types';
import {
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { updateSecret } from '../../../../../services/secret-manager-service';

function* updateSecretWatcher() {
  yield takeLatest(updateSecretTypes.UPDATE_SECRET_REQUEST, updateSecretWorker);
}

function* updateSecretWorker({ payload }) {
  const { payloadBody, parents } = payload;
  try {
    yield put({
      type: updateSecretTypes.UPDATE_SECRET_LOADING,
    });
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: true, size: 'medium' },
    });
    const vaultId = yield select((state) => state.vaultLanding.data.id);
    const updatedParents = [...parents];
    updatedParents.splice(-1, 1);
    yield call(updateSecret, {
      payloadBody,
      parents: parents,
      vaultId,
    });
    yield put({
      type: updateSecretTypes.UPDATE_SECRET_SUCCESS,
    });
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: false, size: 'medium' },
    });
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.secretEditSuccessMessage,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: false, size: 'medium' },
    });
    yield put({
      type: updateSecretTypes.UPDATE_SECRET_FAILURE,
      payload: reason,
    });
  }
}

export default all([fork(updateSecretWatcher)]);
