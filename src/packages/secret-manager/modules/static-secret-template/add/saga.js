import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  sstListingPath,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { AddStaticSecretTypes, GetPwdPoliciesTypes } from './constants';
import { addStaticSecret, getPwdPolicies } from '../../../../../services/secret-manager-service';
import { translatedStrings } from './constants';

function* addStaticSecretWatcher() {
  yield takeLatest(AddStaticSecretTypes.ADD_STATIC_SECRET_REQUEST, addStaticSecretWorker);
}

function* addStaticSecretWorker({ payload }) {
  try {
    yield put({ type: AddStaticSecretTypes.ADD_STATIC_SECRET_LOADING });
    const addSecretData = yield call(addStaticSecret, payload?.data);
    yield put({
      type: AddStaticSecretTypes.ADD_STATIC_SECRET_SUCCESS,
      payload: addSecretData,
    });

    yield put(
      openNotification(
        successNotificationType,
        translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_TEMPLATE_CREATED_SUCCESSFULLY'),
        true,
        null
      )
    );
    payload?.history?.push(sstListingPath);
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: AddStaticSecretTypes.ADD_STATIC_SECRET_FAILURE,
      payload: reason,
    });
  }
}

function* getPasswordPolicyListWatcher() {
  yield takeLatest(GetPwdPoliciesTypes.GET_STATIC_SECRET_REQUEST, getPasswordPolicyListWorker);
}

function* getPasswordPolicyListWorker() {
  try {
    yield put({ type: GetPwdPoliciesTypes.GET_STATIC_SECRET_LOADING });
    const policiesList = yield call(getPwdPolicies);
    var nonePolicy = {
      name: translatedStrings.none,
      id: '',
    };
    policiesList?.result?.unshift(nonePolicy);
    yield put({
      type: GetPwdPoliciesTypes.GET_STATIC_SECRET_SUCCESS,
      payload: policiesList,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: GetPwdPoliciesTypes.GET_STATIC_SECRET_FAILURE,
      payload: reason,
    });
  }
}

export default all([fork(addStaticSecretWatcher), fork(getPasswordPolicyListWatcher)]);
