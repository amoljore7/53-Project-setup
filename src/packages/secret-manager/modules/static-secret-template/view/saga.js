import { takeLatest, all, call, fork, put } from 'redux-saga/effects';
import { SecretViewDataTypes } from './constants';
import { staticSecretTemplateByIdAPI } from '../../../../../services/secret-manager-service';
import { translate } from '../../../externalization';
import {
  loadingStaticSecretTemplateView,
  successStaticSecretTemplateView,
  failStaticSecretTemplateView,
} from './action';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  sstListingPath,
} from '../../../../../utils/common-constants';

function* viewStaticSecretTemplateWatcher() {
  yield takeLatest(SecretViewDataTypes.SECRET_VIEW_DATA_REQUEST, viewStaticSecretTemplateWorker);
}

function* viewStaticSecretTemplateWorker({ payload }) {
  const { roleId, history } = payload;
  try {
    yield put(loadingStaticSecretTemplateView());
    const roleViewData = yield call(staticSecretTemplateByIdAPI, roleId);
    yield put(successStaticSecretTemplateView(roleViewData));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(
      openNotification(
        errorNotificationType,
        translate('STATIC_SECRETS_TEMPLATE_MODULE.GET_SECRET_ERROR_MESSAGE', { reason }),
        true,
        errorNotificationDuration
      )
    );
    history?.push(sstListingPath);
    yield put(failStaticSecretTemplateView(reason));
  }
}

export default all([fork(viewStaticSecretTemplateWatcher)]);
