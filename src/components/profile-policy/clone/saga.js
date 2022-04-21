import { isEmpty } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import {
  errorNotificationType,
  successNotificationType
} from '../../../utils/common-constants';
import {
  createPolicy,
  getPolicyByEntity,
} from '../../../services/policy-admin-service';
import { approvalNotificationMediumDetailsRequest } from '../view/actions';
import {
  createPolicyFailure,
  createPolicyLoading,
  createPolicySuccess,
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
} from './actions';
import {
  ClonePolicyType,
  LoadPolicyDataType,
  translatedStrings,
} from './constants';

function* LoadPolicyDataWatcher() {
  yield takeLatest(LoadPolicyDataType.CLONE_LOAD_POLICY_REQUEST, LoadPolicyDataWorker);
}

function* LoadPolicyDataWorker(action) {
  const { id, history, consumer, consumerEntityId, redirectPath, } = action.payload;
  try {
    yield put({ type: LoadPolicyDataType.CLONE_LOAD_POLICY_LOADING });
    const ClonePolicyData = yield call(getPolicyByEntity, id, null, consumer, consumerEntityId);
    yield put({
      type: LoadPolicyDataType.CLONE_LOAD_POLICY_SUCCESS,
      payload: ClonePolicyData,
    });
    if (!isEmpty(ClonePolicyData?.condition)) {
      const approver = JSON.parse(ClonePolicyData.condition);
      if (!isEmpty(approver?.approval)) {
        yield put(
          approvalNotificationMediumDetailsRequest({
            channelId: approver?.approval?.notificationMedium,
            history,
          })
        );
      }
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: LoadPolicyDataType.CLONE_LOAD_POLICY_FAILURE,
      payload: { error: reason },
    });
    
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.errorGetPolicyData(reason),
        type: errorNotificationType,
        time: 'normal',
      }
    });
  }
}

function* LoadPolicyJSONDataWatcher() {
  yield takeLatest(LoadPolicyDataType.CLONE_LOAD_POLICY_JSON_REQUEST, LoadPolicyJSONDataWorker);
}

function* LoadPolicyJSONDataWorker(action) {
  const { name, history, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put(getPolicyByNameLoading());
    const ClonePolicyData = yield call(getPolicyByEntity, name,  null, consumer, consumerEntityId);
    yield put(getPolicyByNameSuccess(ClonePolicyData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getPolicyByNameFailure(reason));
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.errorGetPolicyData(reason),
        type: errorNotificationType,
        time: 'normal',
      }
    });
  }
}

function* addPolicyWatcher() {
  yield takeLatest(ClonePolicyType.CLONE_POLICY_REQUEST, addPolicyWorker);
}

function* addPolicyWorker(action) {
  const { history, data, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put(createPolicyLoading());
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.addingPolicy })
    );
    const response = yield call(createPolicy, { data, consumer, consumerEntityId  });
    yield put(createPolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.policyCreatedSuccessMessage,
        type: successNotificationType,
        time: 'normal',
      }
    });
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    yield put(createPolicyFailure(response));
  }
}

export default all([
  fork(addPolicyWatcher),
  fork(LoadPolicyDataWatcher),
  fork(LoadPolicyJSONDataWatcher),
]);
