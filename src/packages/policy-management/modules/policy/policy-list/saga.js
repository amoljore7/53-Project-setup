import { put, takeLatest, call, all, fork, select } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  deletePolicyId,
  editPolicyByEntity,
  getPolicyList,
} from '../../../../../services/policy-admin-service';
import { errorNotificationType } from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import {
  deletePolicySuccessMessage,
  enabledPolicy,
  getTogglePolicySuccessMessage,
  getTogglePolicyErrorMessage,
  PolicyListDataTypes,
  errorNotificationTime,
} from './constants';
function* policyListDataWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_LIST_DATA_REQUEST, policyListDataWorker);
}

function* policyListDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.policyReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  try {
    yield put({ type: PolicyListDataTypes.POLICY_LIST_DATA_LOADING });
    const policyListResponse = yield call(getPolicyList, payload);
    const { data } = policyListResponse;
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification('error', reason, true, errorNotificationTime));
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_DATA_FAILURE,
      payload: error,
    });
  }
}

function* policyListLoadMoreDataWatcher() {
  yield takeLatest(
    PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_REQUEST,
    policyListLoadMoreDataWorker
  );
}

function* policyListLoadMoreDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.policyReducer?.list?.searchTerm;
  const nextPageToken = (state) => state?.policyReducer?.list?.pagination?.next;
  payload.search = searchTerm(state);
  payload.next = nextPageToken(state);
  try {
    yield put({ type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_LOADING });
    const policyListResponse = yield call(getPolicyList, payload);
    const { data } = policyListResponse;
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const { response } = error;
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationTime));
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_FAILURE,
      payload: error,
    });
  }
}

function* policyDeleteWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_DELETE_REQUEST_INIT, policyDeleteWorker);
}

function* policyDeleteWorker({ payload }) {
  try {
    yield put({ type: PolicyListDataTypes.POLICY_DELETE_REQUEST_LOADING });
    yield call(deletePolicyId, payload);
    yield put({ type: PolicyListDataTypes.POLICY_DELETE_REQUEST_COMPLETE });
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'success',
        title: deletePolicySuccessMessage,
        duration: null,
      },
    });
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_DATA_REQUEST,
    });
  } catch (error) {
    yield put({ type: PolicyListDataTypes.POLICY_DELETE_REQUEST_COMPLETE });
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'error',
        title: translate('POLICIES_MODULE.DELETE_POLICY_ERROR_MESSAGE'),
        duration: null,
      },
    });
  }
}

export function* policyToggleWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_TOGGLE_REQUEST_INIT, policyToggleWorker);
}

export function* policyToggleWorker({ payload }) {
  try {
    yield put({ type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_LOADING });
    yield call(
      editPolicyByEntity,
      {
        isActive: !(payload.status === enabledPolicy),
      },
      payload.id
    );
    yield put({ type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_COMPLETE });
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'success',
        title: getTogglePolicySuccessMessage(payload.status),
        duration: null,
      },
    });
    yield put({ type: PolicyListDataTypes.POLICY_LIST_DATA_REQUEST });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_FAILURE,
      payload: { error: reason },
    });
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'error',
        title: getTogglePolicyErrorMessage(payload.status, reason),
        duration: null,
      },
    });
  }
}

export default all([
  fork(policyListDataWatcher),
  fork(policyDeleteWatcher),
  fork(policyToggleWatcher),
  fork(policyListLoadMoreDataWatcher),
]);
