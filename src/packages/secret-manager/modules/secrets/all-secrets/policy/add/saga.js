import { isEmpty } from 'lodash';
import { put, takeLatest, call, all, fork, select } from 'redux-saga/effects';
import { openNotification } from '../../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import {
  allSecretsPath,
  errorNotificationDuration,
  errorNotificationType,
  medium,
  successNotificationDuration,
  successNotificationType,
  warningNotificationDuration,
  warningNotificationType,
} from '../../../../../../../utils/common-constants';
import { translate } from '../../../../../externalization';
import {
  recursiveApprovalChannelListFail,
  recursiveApprovalChannelListLoadingDisable,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListSuccess,
  approvalNotificationMediumListFail,
  approvalNotificationMediumListLoading,
  approvalNotificationMediumListSuccess,
  createPolicyRequestError,
  createPolicyRequestLoading,
  createPolicyRequestSuccess,
  secretDetailsRequestError,
  secretDetailsRequestLoading,
  secretDetailsRequestSuccess,
} from './actions';
import {
  AddPolicyType,
  recursiveApprovalChannelListType,
  approvalNotificationMediumListType,
  SecretDetailsTypes,
  translatedStrings,
} from './constants';
import { addString } from '../../../all-secrets/constants';
import {
  fetchChannelList,
  fetchNotificationMediumList,
} from '../../../../../../../services/notification-medium-service';
import { fetchSecretDetails } from '../../../../../../../services/secret-manager-service';
import { createPolicy } from '../../../../../../../services/policy-admin-service';

function* addPolicyWatcher() {
  yield takeLatest(AddPolicyType.POLICY_CREATE_REQUEST, addPolicyWorker);
}

function* addPolicyWorker({ payload, history }) {
  const { data } = payload;
  try {
    yield put(createPolicyRequestLoading());
    yield put(
      initSpinnerOverlay({ open: true, size: medium, message: translatedStrings.addingPolicy })
    );
    const response = yield call(createPolicy, {
      data,
      resource: data?.resource,
      consumer: 'secretmanager',
    });
    yield put(createPolicyRequestSuccess(response));
    yield put(initSpinnerOverlay({ open: false, size: medium }));
    history.push({ pathname: allSecretsPath, state: { previousPath: addString } });
    yield put(
      openNotification(
        successNotificationType,
        translatedStrings.policyCreatedSuccessMessage,
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: medium }));
    const reason = response?.data?.message || '';
    yield put(createPolicyRequestError(reason));
  }
}

function* secretDetailsWatcher() {
  yield takeLatest(SecretDetailsTypes.SECRET_DETAILS_REQUEST, secretDetailsWorker);
}

function* secretDetailsWorker({ payload }) {
  try {
    yield put(secretDetailsRequestLoading());
    yield put(
      initSpinnerOverlay({
        open: true,
        size: medium,
        message: translate('SECRET_CREATE_MODULE.LOADING_SECRET_DETAILS'),
      })
    );
    const secretResponse = yield call(fetchSecretDetails, payload);
    yield put(secretDetailsRequestSuccess(secretResponse));
  } catch ({ response }) {
    yield put(initSpinnerOverlay({ open: false, size: medium }));
    yield put(secretDetailsRequestError(response));
    yield put(openNotification(errorNotificationType, '', true, errorNotificationDuration));
    history.push(allSecretsPath);
  }
}

function* notificationMediumListWatcher() {
  yield takeLatest(
    approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_REQUEST,
    notificationMediumListWorker
  );
}

function* notificationMediumListWorker() {
  try {
    yield put(approvalNotificationMediumListLoading());
    const data = yield call(fetchNotificationMediumList);
    yield put(approvalNotificationMediumListSuccess(data?.result || []));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put(approvalNotificationMediumListFail(reason));
  }
}

function* channelListWatcher() {
  yield takeLatest(
    recursiveApprovalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_REQUEST,
    channelListWorker
  );
}

function* channelListWorker({ payload = {} }) {
  const { notificationMediumId, next } = payload;
  try {
    const response = yield call(fetchChannelList, { notificationMediumId, next });
    yield put(recursiveApprovalChannelListSuccess(response?.result));
    if (!isEmpty(response?.pagination?.next)) {
      yield put(
        recursiveApprovalChannelListRequest({
          notificationMediumId,
          next: response?.pagination?.next,
        })
      );
    } else {
      yield put(recursiveApprovalChannelListLoadingDisable());
    }
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const state = yield select();
    if (isEmpty(state?.secretsReducer?.addPolicyReducer?.channelList?.data)) {
      yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    } else {
      yield put(
        openNotification(
          warningNotificationType,
          translatedStrings.warningGetChannelList(reason),
          true,
          warningNotificationDuration
        )
      );
    }
    yield put(recursiveApprovalChannelListFail(reason));
  }
}

export default all([
  fork(addPolicyWatcher),
  fork(secretDetailsWatcher),
  fork(notificationMediumListWatcher),
  fork(channelListWatcher),
]);
