import { put, takeLatest, all, fork, call, select } from 'redux-saga/effects';
import { translate } from '../../../../externalization';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import {
  createNodeTypes,
  deleteNodeTypes,
  getImmediateNodesTypes,
  OPEN_NOTIFICATION,
} from '../constants';
import { createNode, getImmediateNodes, deleteNode } from './service';
import {
  errorNotificationDuration,
  errorNotificationType,
  PAGE_TOKEN,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';

function* createNodeWatcher() {
  yield takeLatest(createNodeTypes.CREATE_NODE_REQUEST, createNodeWorker);
}

function* createNodeWorker({ payload }) {
  const { payloadData, parents } = payload;
  const updatedParents = parents.slice(1);
  try {
    yield put({
      type: createNodeTypes.CREATE_NODE_LOADING,
    });
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));
    const vaultId = yield select((state) => state.vaultLanding.data?.id);
    const newNodeData = yield call(createNode, { payloadData, parents: updatedParents, vaultId });
    let allResult = [];
    let pageToken = '';
    const immediateNodes = yield call(getImmediateNodes, { parents: updatedParents, vaultId });
    allResult = [...immediateNodes?.result];
    if (immediateNodes?.pagination?.next)
      pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
    while (pageToken) {
      const immediateNodes = yield call(getImmediateNodes, { ...payload, vaultId, pageToken });
      allResult = [...allResult, ...immediateNodes?.result];
      if (immediateNodes?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    for (let i = 0; i < allResult.length; i++) {
      if (allResult[i].name === newNodeData.name) {
        newNodeData.metadata = allResult[i].metadata;
        break;
      }
    }
    yield put({
      type: createNodeTypes.CREATE_NODE_SUCCESS,
      payload: {
        newNodeData,
        parents,
        selectedItemParents: [
          ...parents,
          { label: newNodeData.name, details: { entityType: 'node' } },
        ],
      },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: successNotificationType,
        title: translate('SECRETS_MODULE.FOLDER_CREATED_SUCCESSFULLY'),
        duration: successNotificationDuration,
      },
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: createNodeTypes.CREATE_NODE_FAILURE,
      payload: { error: reason },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: errorNotificationType,
        title: translate('SECRETS_MODULE.FOLDER_CREATION_FAIL_MESSAGE', { reason }),
        duration: errorNotificationDuration,
      },
    });
  }
}

function* getImmediateNodesWatcher() {
  yield takeLatest(getImmediateNodesTypes.GET_IMMEDIATE_NODES_REQUEST, getImmediateNodesWorker);
}

function* getImmediateNodesWorker({ payload }) {
  try {
    yield put({
      type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_LOADING,
    });
    yield put(
      initSpinnerOverlay({
        open: true,
        size: 'medium',
        message: translate('SECRET_CREATE_MODULE.LOADING_NODE_DATA'),
      })
    );
    const vaultId = yield select((state) => state.vaultLanding.data?.id);
    let allResult = [];
    let pageToken = '';
    const immediateNodes = yield call(getImmediateNodes, { ...payload, vaultId });
    allResult = [...immediateNodes?.result];
    if (immediateNodes?.pagination?.next)
      pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
    while (pageToken) {
      const immediateNodes = yield call(getImmediateNodes, { ...payload, vaultId, pageToken });
      allResult = [...allResult, ...immediateNodes?.result];
      if (immediateNodes?.pagination?.next) {
        pageToken = getQueryParamsFromUrl(immediateNodes?.pagination?.next, PAGE_TOKEN);
      } else {
        pageToken = '';
      }
    }
    yield put({
      type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_SUCCESS,
      payload: { immediateNodes: allResult, parents: payload.parents },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: getImmediateNodesTypes.GET_IMMEDIATE_NODES_FAILURE,
      payload: { error: reason },
    });
    yield put({
      type: OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'error',
        title: reason || translate('SECRETS_MODULE.GET_ONE_LEVEL_CHILDREN_FAIL_MESSAGE'),
        duration: null,
      },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
  }
}

function* deleteNodeWatcher() {
  yield takeLatest(deleteNodeTypes.DELETE_NODE_REQUEST, deleteNodeWorker);
}

function* deleteNodeWorker({ payload }) {
  const { entity, parents } = payload;
  const selectedItemParentsAfterDeletion = [...parents];
  selectedItemParentsAfterDeletion.splice(-1, 1);
  const updatedParents = parents.slice(1);
  try {
    yield put({
      type: deleteNodeTypes.DELETE_NODE_LOADING,
    });
    yield put(initSpinnerOverlay({ open: true, size: 'medium' }));
    const vaultId = yield select((state) => state.vaultLanding.data?.id);
    let deleteResponse = yield call(deleteNode, { parents: updatedParents, vaultId });
    yield put({
      type: deleteNodeTypes.DELETE_NODE_SUCCESS,
      payload: {
        deleteResponse,
        parents: updatedParents,
        selectedItemParents: selectedItemParentsAfterDeletion,
      },
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: successNotificationType,
        title:
          entity === 'node'
            ? translate('SECRETS_MODULE.FOLDER_DELETED_SUCCESSFULLY')
            : translate('SECRETS_MODULE.SECRET_DELETED_SUCCESSFULLY'),
        duration: successNotificationDuration,
      },
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put({
      type: OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: errorNotificationType,
        title:
          entity === 'node'
            ? translate('SECRETS_MODULE.FOLDER_DELETION_FAIL_MESSAGE', { reason })
            : translate('SECRETS_MODULE.SECRET_DELETION_FAIL_MESSAGE', { reason }),
        duration: errorNotificationDuration,
      },
    });
    yield put({
      type: deleteNodeTypes.DELETE_NODE_FAILURE,
      payload: { error: reason, status: response?.status },
    });
  }
}

export default all([
  fork(createNodeWatcher),
  fork(deleteNodeWatcher),
  fork(getImmediateNodesWatcher),
]);
