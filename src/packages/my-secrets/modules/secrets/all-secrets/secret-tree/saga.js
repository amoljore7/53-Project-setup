import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { openNotification } from '../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../../utils/common-constants';
import { translate } from '../../../../externalization';
import {
  failureGetImmediateNodes,
  loadingGetImmediateNodes,
  successGetImmediateNodes,
} from './action';
import { getImmediateNodesTypes } from './constants';
import { getImmediateNodes } from './service';
import { PAGE_TOKEN } from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';

const getVaultDetails = (state) => state.vaultLanding.data;

function* getImmediateNodesWatcher() {
  yield takeLatest(getImmediateNodesTypes.GET_IMMEDIATE_NODES_REQUEST, getImmediateNodesWorker);
}

function* getImmediateNodesWorker({ payload }) {
  try {
    yield put(loadingGetImmediateNodes());
    yield put(
      initSpinnerOverlay({
        open: true,
        size: 'medium',
        message: translate('SECRETS_MODULE.LOADING_NODE_DATA'),
      })
    );
    const { id: vaultId } = yield select(getVaultDetails);
    let allResult = [];
    let pageToken = '';
    let immediateNodes = yield call(getImmediateNodes, payload, vaultId);
    allResult = [...immediateNodes?.result];
    let immediateNodesPagination = immediateNodes?.pagination;
    if (immediateNodes?.pagination?.next)
      pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
    while (pageToken) {
      let immediateNodes = yield call(getImmediateNodes, { ...payload, vaultId, pageToken });
      allResult = [...allResult, ...immediateNodes?.result];
      immediateNodesPagination = immediateNodes?.pagination;
      if (immediateNodes?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    immediateNodes = allResult;
    yield put(successGetImmediateNodes(immediateNodes, immediateNodesPagination));
    yield put(
      initSpinnerOverlay({
        open: false,
        size: 'medium',
      })
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(failureGetImmediateNodes(reason));
    yield put(
      initSpinnerOverlay({
        open: false,
        size: 'medium',
      })
    );
  }
}

export default all([fork(getImmediateNodesWatcher)]);
