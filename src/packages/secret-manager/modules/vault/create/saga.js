import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationType,
  secretManagerLandingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { getVaultLandingRequest } from '../../home/actions';
import {
  CreateVaultTypes,
  notificationMediumListConstants,
  UsersType,
  TagsType,
  ChannelType,
} from './constants';
import {
  createVault,
  fetchNotificationMediumList,
  fetchUsers,
  fetchTags,
  fetchChannelList,
} from '../../../../../services/secret-manager-service';
import { failureNotificationMediumList, successNotificationMediumList } from './action';

function* createVaultWatcher() {
  yield takeLatest(CreateVaultTypes.CREATE_VAULT_REQUEST, createVaultWorker);
}

function* createVaultWorker({ payload }) {
  const { formData, history } = payload;
  yield put({ type: CreateVaultTypes.CREATE_VAULT_LOADING });
  try {
    const data = yield call(createVault, formData);
    yield put({
      type: CreateVaultTypes.CREATE_VAULT_SUCCESS,
      payload: {
        ...data,
      },
    });
    history.push(secretManagerLandingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('CREATE_VAULT_MODULE.VAULT_CREATED_SUCCESSFULLY'),
        true,
        successNotificationDuration
      )
    );
    yield put(getVaultLandingRequest());
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const errorList = reason.split('|').map((err) => `- ${err}`);
    const errorObject = {
      title: translate('CREATE_VAULT_MODULE.CREATE_VAULT_ERROR'),
      errorList: errorList,
    };
    yield put({
      type: CreateVaultTypes.CREATE_VAULT_FAILURE,
      payload: { errorStatus: errorObject },
    });
  }
}

function* notificationMediumListWatcher() {
  yield takeLatest(
    notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_REQUEST,
    notificationMediumListWorker
  );
}

function* notificationMediumListWorker() {
  try {
    yield put({ type: notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOADING });
    const { data } = yield call(fetchNotificationMediumList);
    yield put(successNotificationMediumList(data));
  } catch (error) {
    yield put(failureNotificationMediumList(error));
  }
}

function* usersDataWatcher() {
  yield takeLatest(UsersType.VAULT_USERS_REQUEST, usersDataWorker);
}

function* usersDataWorker() {
  try {
    yield put({ type: UsersType.VAULT_USERS_LOADING });
    const response = yield call(fetchUsers);
    yield put({
      type: UsersType.VAULT_USERS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, null));
    yield put({
      type: UsersType.VAULT_USERS_FAILURE,
      payload: reason,
    });
  }
}

function* tagsListWatcher() {
  yield takeLatest(TagsType.TAGS_REQUEST, tagsDataWorker);
}

function* tagsDataWorker() {
  try {
    yield put({ type: TagsType.TAGS_LOADING });
    const response = yield call(fetchTags);
    yield put({
      type: TagsType.TAGS_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, null));
    yield put({
      type: TagsType.TAGS_FAILURE,
      payload: reason,
    });
  }
}

function* channelListWatcher() {
  yield takeLatest(ChannelType.SLACK_CHANNEL_REQUEST, channelDataWorker);
}

function* channelDataWorker({ payload }) {
  try {
    yield put({ type: ChannelType.SLACK_CHANNEL_LOADING });
    const response = yield call(fetchChannelList, payload);
    yield put({
      type: ChannelType.SLACK_CHANNEL_SUCCESS,
      payload: response,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, null));
    yield put({
      type: ChannelType.SLACK_CHANNEL_FAILURE,
      payload: reason,
    });
  }
}

export default all([
  fork(createVaultWatcher),
  fork(notificationMediumListWatcher),
  fork(usersDataWatcher),
  fork(tagsListWatcher),
  fork(channelListWatcher),
]);
