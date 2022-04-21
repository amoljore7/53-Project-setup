import { isEmpty } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { openNotification } from '../../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import {
  editPolicySM,
  getConsumerList,
  getPermissionActions,
  getPolicyByEntity,
} from '../../../../../../../services/policy-admin-service';
import {
  errorNotificationDuration,
  errorNotificationType,
  successNotificationDuration,
  successNotificationType,
  allSecretsPath,
} from '../../../../../../../utils/common-constants';
import { translate } from '../../../../../externalization';
import { approvalNotificationMediumDetailsRequest } from '../view/action';

import {
  EditConsumerListType,
  EditPermissionActionsType,
  EditPolicyType,
  LoadPolicyDataType,
  translatedStrings,
} from './constants';
import { editString } from '../../../all-secrets/constants';

function* editPolicyWatcher() {
  yield takeLatest(EditPolicyType.EDIT_POLICY_REQUEST, editPolicyWorker);
}

function* editPolicyWorker(action) {
  const { data: modifiedPolicy, history, entity } = action.payload;
  try {
    yield put(
      initSpinnerOverlay({ open: true, size: 'medium', message: translatedStrings.editingPolicy })
    );
    yield put({ type: EditPolicyType.EDIT_POLICY_LOADING });
    const response = yield call(editPolicySM, modifiedPolicy, modifiedPolicy?.resource, entity);
    yield put({
      type: EditPolicyType.EDIT_POLICY_SUCCESS,
      payload: response,
    });
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    if (!modifiedPolicy?.isDraft) {
      history.push({ pathname: allSecretsPath, state: { previousPath: editString } });
    }

    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.policyUpdateSuccess,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: 'medium' }));
    const reason = response?.data?.message || '';
    yield put({
      type: EditPolicyType.EDIT_POLICY_FAILURE,
      payload: reason,
    });
  }
}

function* editConsumerWatcher() {
  yield takeLatest(EditConsumerListType.EDIT_CONSUMER_LIST_REQUEST, editConsumerWorker);
}

function* editConsumerWorker() {
  try {
    yield put({ type: EditConsumerListType.EDIT_CONSUMER_LIST_LOADING });
    const response = yield call(getConsumerList);
    yield put({
      type: EditConsumerListType.EDIT_CONSUMER_LIST_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: EditConsumerListType.EDIT_CONSUMER_LIST_FAILURE,
      payload: reason,
    });
  }
}

function* editPermissionActionsWatcher() {
  yield takeLatest(
    EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_REQUEST,
    editPermissionActionsWorker
  );
}

function* editPermissionActionsWorker(action) {
  try {
    yield put({ type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_LOADING });
    const response = yield call(getPermissionActions, action.payload.consumer);
    yield put({
      type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_FAILURE,
      payload: reason,
    });
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
  const { id, history, resourcePath } = action.payload;
  const resourceData = { resourcePath, consumer: 'secretmanager' };
  try {
    yield put({ type: LoadPolicyDataType.EDIT_LOAD_POLICY_LOADING });
    const EditPolicyData = yield call(getPolicyByEntity, id, resourceData);
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
    history?.push(allSecretsPath);
    yield put(
      openNotification(
        errorNotificationType,
        translate('POLICIES_MODULE.VIEW_POLICY_ERROR_MESSAGE_WITH_REASON', { reason }),
        true,
        errorNotificationDuration
      )
    );
  }
}
export default all([
  fork(editPolicyWatcher),
  fork(editConsumerWatcher),
  fork(editPermissionActionsWatcher),
  fork(LoadPolicyDataWatcher),
]);
