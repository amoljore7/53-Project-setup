import { isEmpty } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import {
  errorNotificationType,
  successNotificationType
} from '../../../utils/common-constants';
import {
  editPolicyByEntity,
  getPolicyByEntity,
} from '../../../services/policy-admin-service';
import { approvalNotificationMediumDetailsRequest } from '../view/actions';
import {
  getPolicyByNameFailure,
  getPolicyByNameLoading,
  getPolicyByNameSuccess,
  updatePolicyFailure,
  updatePolicyLoading,
  updatePolicySuccess,
} from './actions';
import {
  EditPolicyType,
  LoadPolicyDataType,
  translatedStrings,
} from './constants';

function* editPolicyWatcher() {
  yield takeLatest(EditPolicyType.EDIT_POLICY_REQUEST, editPolicyWorker);
}

function* editPolicyWorker(action) {
  const { data: modifiedPolicy, history, policyEntity, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.editingPolicy })
    );
    yield put(updatePolicyLoading());
    const response = yield call(editPolicyByEntity, modifiedPolicy, policyEntity, consumer, consumerEntityId);
    yield put(updatePolicySuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    history.push({
      pathname: redirectPath,
      notification: {
        title: translatedStrings.policyUpdateSuccess,
        type: successNotificationType,
        time: 'normal',
      }
    });
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    const reason = response?.data?.message || '';
    yield put(updatePolicyFailure(reason));
  }
}

function* LoadPolicyDataWatcher() {
  yield takeLatest(LoadPolicyDataType.EDIT_LOAD_POLICY_REQUEST, LoadPolicyDataWorker);
}

function* LoadPolicyDataWorker(action) {
  if (action.payload === null) {
    yield put({
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_SUCCESS,
      payload: null,
    });
  }
  const { id, history, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put({ type: LoadPolicyDataType.EDIT_LOAD_POLICY_LOADING });
    const EditPolicyData = yield call(getPolicyByEntity, id,  null, consumer, consumerEntityId);
    yield put({
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_SUCCESS,
      payload: EditPolicyData,
    });
    if (!isEmpty(EditPolicyData?.condition)) {
      const approver = JSON.parse(EditPolicyData.condition);
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
      type: LoadPolicyDataType.EDIT_LOAD_POLICY_FAILURE,
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
  yield takeLatest(LoadPolicyDataType.EDIT_LOAD_POLICY_JSON_REQUEST, LoadPolicyJSONDataWorker);
}

function* LoadPolicyJSONDataWorker(action) {
  if (action.payload === null) {
    yield put(getPolicyByNameSuccess(null));
  }
  const { name, history, consumer, consumerEntityId, redirectPath } = action.payload;
  try {
    yield put(getPolicyByNameLoading());
    const EditPolicyData = yield call(getPolicyByEntity, name,  null, consumer, consumerEntityId);
    yield put(getPolicyByNameSuccess(EditPolicyData));
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
export default all([
  fork(editPolicyWatcher),
  fork(LoadPolicyDataWatcher),
  fork(LoadPolicyJSONDataWatcher),
]);
