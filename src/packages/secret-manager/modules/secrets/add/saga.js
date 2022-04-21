import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { createSecretTypes, translatedStrings, previousPath } from './constants';
import { openNotification } from '../../../../../components/notification/action';
import { INIT_SPINNER_OVERLAY } from '../../../../../components/spinner-overlay/types';
import {
  PAGE_TOKEN,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { getImmediateNodes } from '../all-secrets/secret-tree/service';
import { getQueryParamsFromUrl } from '../../../../../utils/common-utils';
import { addString } from '../all-secrets/constants';
import { createSecret } from '../../../../../services/secret-manager-service';

function* createSecretWatcher() {
  yield takeLatest(createSecretTypes.CREATE_SECRET_REQUEST, createSecretWorker);
}

function* createSecretWorker({ payload }) {
  const { payloadBody, parents, history } = payload;
  try {
    yield put({
      type: createSecretTypes.CREATE_SECRET_LOADING,
    });
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: true, size: 'medium' },
    });
    const vaultId = yield select((state) => state.vaultLanding.data.id);
    const updatedParents = parents.slice(1);
    const newSecretData = yield call(createSecret, {
      payloadBody,
      parents: updatedParents,
      vaultId,
    });
    let allResults = [];
    let pageToken = '';
    const immediateNodes = yield call(getImmediateNodes, { parents: updatedParents, vaultId });
    allResults = immediateNodes?.result;
    if (immediateNodes?.pagination?.next)
      pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
    while (pageToken) {
      const immediateNodes = yield call(getImmediateNodes, {
        parents: updatedParents,
        vaultId,
        pageToken,
      });
      allResults = [...allResults, ...immediateNodes?.result];
      if (immediateNodes?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    for (let i = 0; i < allResults.length; i++) {
      if (allResults[i].name === newSecretData.name) {
        newSecretData.metadata = allResults[i].metadata;
        break;
      }
    }
    yield put({
      type: createSecretTypes.CREATE_SECRET_SUCCESS,
      payload: { parents, newSecretData },
    });
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: false, size: 'medium' },
    });
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.successMessage,
        true,
        successNotificationDuration
      )
    );
    history.push({ pathname: previousPath, state: { previousPath: addString } });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: INIT_SPINNER_OVERLAY,
      payload: { open: false, size: 'medium' },
    });
    yield put({
      type: createSecretTypes.CREATE_SECRET_FAILURE,
      payload: reason,
    });
  }
}

export default all([fork(createSecretWatcher)]);
