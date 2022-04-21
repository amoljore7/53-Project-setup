import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import {
  deletePolicySM,
  editPolicySM,
  fetchPolicyListSM,
} from '../../../../../../../services/policy-admin-service';
import { errorNotificationDuration } from '../../../../../../../utils/common-constants';
import { translate } from '../../../../../externalization';
import {
  completePolicyDelete,
  failurePolicyToggle,
  loadingPolicyDelete,
  loadingPolicyToggle,
  requestPolicyList,
  successPolicyToggle,
} from './action';
import { PolicyListDataTypes, translatedStrings } from './constants';

function* policyListDataWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_LIST_DATA_REQUEST, policyListDataWorker);
}

function* policyListDataWorker({ payload = {} }) {
  const state = yield select();
  const searchTerm = (state) => state?.secretsReducer?.policyListReducer?.list?.searchTerm;
  payload.search = searchTerm(state);
  try {
    yield put({ type: PolicyListDataTypes.POLICY_LIST_DATA_LOADING });
    const policyListResponse = yield call(fetchPolicyListSM, payload);
    const { data } = policyListResponse;
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const reason = error?.response?.data?.message;
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_DATA_FAILURE,
      payload: error,
    });
    yield put(openNotification('error', reason, true, errorNotificationDuration));
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
    yield put(
      initSpinnerOverlay({
        open: false,
        size: 'medium',
        message: translatedStrings.table.loadingMessage,
      })
    );
    const policyListResponse = yield call(fetchPolicyListSM, payload);
    const { data } = policyListResponse;
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_SUCCESS,
      payload: data,
    });
  } catch ({ response }) {
    const reason = response?.data?.message;
    yield put(
      initSpinnerOverlay({
        open: false,
        size: 'medium',
      })
    );
    yield put({
      type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_FAILURE,
      payload: response,
    });
    yield put(
      openNotification(
        'error',
        translate('POLICIES_MODULE.POLICIES_ERROR_LOADING_MESSAGE', reason),
        true,
        errorNotificationDuration
      )
    );
  }
}

function* policyListDeleteWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_DELETE_REQUEST_INIT, policyDeleteWorker);
}

function* policyDeleteWorker({ payload }) {
  const { id, resource, listPolicyPath } = payload;
  try {
    yield put(loadingPolicyDelete());
    yield call(deletePolicySM, { id, resource });
    yield put(completePolicyDelete());
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'success',
        title: translatedStrings.delete.successMessage,
        duration: null,
      },
    });
    yield put(requestPolicyList(listPolicyPath));
  } catch ({ response }) {
    const reason = (response && response.data && response.data.message) || '';
    yield put(completePolicyDelete());
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'error',
        title: translatedStrings.delete.getErrorMessage(reason),
        duration: null,
      },
    });
  }
}

export function* policyListToggleWatcher() {
  yield takeLatest(PolicyListDataTypes.POLICY_TOGGLE_REQUEST_INIT, policyToggleWorker);
}

export function* policyToggleWorker({ payload }) {
  const { id, status, resource, listPolicyPath } = payload;
  try {
    yield put(loadingPolicyToggle());
    yield call(
      editPolicySM,
      {
        id,
        isActive: status !== translatedStrings.table.enabledStatus,
      },
      resource,
    );
    yield put(successPolicyToggle());
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'success',
        title: translatedStrings.toggle.getSuccessMessage(status),
        duration: null,
      },
    });
    yield put(requestPolicyList(listPolicyPath));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failurePolicyToggle(reason));
    yield put({
      type: PolicyListDataTypes.OPEN_NOTIFICATION,
      payload: {
        open: true,
        type: 'error',
        title: translatedStrings.toggle.getErrorMessage(status, reason),
        duration: null,
      },
    });
  }
}

export default all([
  fork(policyListDataWatcher),
  fork(policyListDeleteWatcher),
  fork(policyListToggleWatcher),
  fork(policyListLoadMoreDataWatcher),
]);
