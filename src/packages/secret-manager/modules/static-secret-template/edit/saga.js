import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  sstListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { EditStaticSecretTypes } from './constants';
import { editStaticSecretReq } from '../../../../../services/secret-manager-service';

function* editStaticSecretWatcher() {
  yield takeLatest(EditStaticSecretTypes.EDIT_STATIC_SECRET_REQUEST, editStaticSecretWorker);
}

function* editStaticSecretWorker({ payload }) {
  const { data, id, history } = payload;
  try {
    yield put({ type: EditStaticSecretTypes.EDIT_STATIC_SECRET_LOADING });
    const editSecretData = yield call(editStaticSecretReq, data, id);
    yield put({
      type: EditStaticSecretTypes.EDIT_STATIC_SECRET_SUCCESS,
      payload: editSecretData,
    });

    yield put(
      openNotification(
        successNotificationType,
        translate('STATIC_SECRETS_TEMPLATE_MODULE.SECRET_TEMPLATE_UPDATED_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );

    history?.push(sstListingPath);
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put({
      type: EditStaticSecretTypes.EDIT_STATIC_SECRET_FAILURE,
      payload: reason,
    });
  }
}

export default all([fork(editStaticSecretWatcher)]);
