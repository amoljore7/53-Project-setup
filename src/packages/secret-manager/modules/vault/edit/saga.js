import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  secretManagerLandingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { EditVaultTypes } from './constants';
import { editVault } from '../../../../../services/secret-manager-service';
import { getVaultLandingRequest } from '../../home/actions';

function* editVaultWatcher() {
  yield takeLatest(EditVaultTypes.EDIT_VAULT_REQUEST, editVaultWorker);
}

function* editVaultWorker({ payload }) {
  const { formData, id, history } = payload;
  yield put({ type: EditVaultTypes.EDIT_VAULT_LOADING });
  try {
    const data = yield call(editVault, formData, id);
    yield put({
      type: EditVaultTypes.EDIT_VAULT_SUCCESS,
      payload: {
        ...data,
      },
    });
    history.push(secretManagerLandingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('VAULT_DETAILS_MODULE.VAULT_UPDATED_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );
    yield put(getVaultLandingRequest());
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const errorList = reason.split('|').map((err) => `- ${err}`);
    const errorObject = {
      title: translate('VAULT_DETAILS_MODULE.VAULT_UPDATE_FAILED'),
      errorList: errorList,
    };
    yield put({
      type: EditVaultTypes.EDIT_VAULT_FAILURE,
      payload: { errorStatus: errorObject },
    });
  }
}

export default all([fork(editVaultWatcher)]);
