import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { secretDetailsTypes, secretTemplateDetailsTypes } from './constants';
import { fetchSecretDetails, fetchSecretTemplateDetails } from './service';
import { fetchSecretList } from '../secret-list/service';
import { translate } from '../../../../externalization';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import { resetAdminSecretDetails, resetAdminGroupsDetails } from '../secret-list/action';
import { isEmpty } from 'lodash';
import { PAGE_TOKEN } from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';

function* secretTemplateDetailsWatcher() {
  yield takeLatest(
    secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_REQUEST,
    secretTemplateDetailsWorker
  );
}

function* secretTemplateDetailsWorker({ payload }) {
  try {
    yield put({ type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_LOADING });
    yield put(
      initSpinnerOverlay({
        open: true,
        size: 'medium',
        message: translate('SECRET_CREATE_MODULE.LOADING_SECRET_DETAILS'),
      })
    );
    const secretTemplateData = yield call(fetchSecretTemplateDetails, payload);
    yield put({
      type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_SUCCESS,
      payload: secretTemplateData,
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_FAILURE,
      payload: response?.data,
    });
  }
}

function* secretDetailsWatcher() {
  yield takeLatest(secretDetailsTypes.SECRET_DETAILS_REQUEST, secretDetailsWorker);
}

function* secretDetailsWorker({ payload }) {
  try {
    yield put({ type: secretDetailsTypes.SECRET_DETAILS_LOADING });
    yield put(
      initSpinnerOverlay({
        open: true,
        size: 'medium',
        message: translate('SECRET_CREATE_MODULE.LOADING_SECRET_DETAILS'),
      })
    );
    const vaultId = yield select((state) => state.vaultLanding.data?.id);
    const { parents, data } = payload;
    const updatedParents = parents.slice(1);
    if (isEmpty(data)) {
      yield put(resetAdminSecretDetails());
      yield put(resetAdminGroupsDetails());
    }
    const secretResponse = yield call(fetchSecretDetails, {
      parents: updatedParents,
      vaultId,
      data,
    });
    let selectedSecretMetadata;
    const selectedSecretName = updatedParents[updatedParents.length - 1].label;
    const parentsSelectedSecret = [...updatedParents];
    parentsSelectedSecret.splice(-1, 1);
    let allResults = [];
    let pageToken = '';
    const secretListDataParents = yield call(fetchSecretList, {
      parents: parentsSelectedSecret,
      vaultId: vaultId,
    });
    allResults = secretListDataParents?.result;
    if (secretListDataParents?.pagination?.next)
      pageToken = getQueryParamsFromUrl(secretListDataParents?.pagination?.next, PAGE_TOKEN);
    while (pageToken) {
      const secretListDataParents = yield call(fetchSecretList, {
        parents: parentsSelectedSecret,
        vaultId: vaultId,
        pageToken,
      });
      allResults = [...allResults, ...secretListDataParents?.result];
      if (secretListDataParents?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(secretListDataParents?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    for (let i = 0; i < secretListDataParents?.result?.length; i++) {
      if (allResults[i].name === selectedSecretName) {
        selectedSecretMetadata = allResults[i]?.metadata;
        break;
      }
    }
    yield put({
      type: secretDetailsTypes.SECRET_DETAILS_SUCCESS,
      payload: { secretResponse, selectedSecretMetadata },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_REQUEST,
      payload: {
        id: secretResponse?.staticSecretTemplateId,
      },
    });
  } catch ({ response }) {
    yield put({
      type: secretDetailsTypes.SECRET_DETAILS_FAILURE,
      payload: { data: response?.data, status: response?.status },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
  }
}

export default all([fork(secretTemplateDetailsWatcher), fork(secretDetailsWatcher)]);
