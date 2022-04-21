import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { openNotification } from '../../../../../components/notification/action';
import {
  errorNotificationDuration,
  errorNotificationType,
  permissionListingPath,
  successNotificationDuration,
  successNotificationType,
} from '../../../../../utils/common-constants';
import { translate } from '../../../externalization';
import { failureApplicationList, loadingApplicationList, successApplicationList } from './action';
import {
  AddPermissionsTypes,
  PermissionsActionsListTypes,
  ApplicationsListTypes,
} from './constants';
import {
  fetchActionsList,
  fetchApplicationsList,
  createPermission,
} from '../../../../../services/policy-admin-service';

function* addPermissionsWatcher() {
  yield takeLatest(AddPermissionsTypes.PERMISSIONS_ADD_REQUEST, addPermissionsWorker);
}

function* addPermissionsWorker({ payload }) {
  const { formData, history } = payload;
  yield put({ type: AddPermissionsTypes.PERMISSIONS_ADD_LOADING });

  try {
    const data = yield call(createPermission, formData);
    yield put({
      type: AddPermissionsTypes.PERMISSIONS_ADD_SUCCESS,
      payload: {
        ...data,
      },
    });
    history.push(permissionListingPath);
    yield put(
      openNotification(
        successNotificationType,
        translate('PERMISSION_MODULE.PERMISSION_CREATED'),
        true,
        successNotificationDuration
      )
    );
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    const errorObject = {
      title: translate('PERMISSION_MODULE.PERMISSION_NOT_CREATED'),
      errorList: reason.split('|').map((msg) => `- ${msg}`) || [],
    };
    yield put({
      type: AddPermissionsTypes.PERMISSIONS_ADD_FAILURE,
      payload: { errorStatus: errorObject },
    });
  }
}

function* permissionsActionsListWatcher() {
  yield takeLatest(
    PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_REQUEST,
    getActionsListWorker
  );
}

function* getActionsListWorker({ payload }) {
  yield put({
    type: PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_LOADING,
  });
  try {
    const actionList = yield call(fetchActionsList, payload);
    yield put({
      type: PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_SUCCESS,
      payload: actionList,
    });
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(openNotification(errorNotificationType, reason, true, errorNotificationDuration));
    yield put({
      type: PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_FAILURE,
      payload: { error: reason },
    });
  }
}

function* permissionsApplicationsListWatcher() {
  yield takeLatest(ApplicationsListTypes.APPLICATION_LIST_REQUEST, getApplicationsListWatcher);
}

function* getApplicationsListWatcher() {
  yield put(loadingApplicationList());
  try {
    const ApplicationsList = yield call(fetchApplicationsList);
    yield put(successApplicationList(ApplicationsList));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(failureApplicationList(reason));
  }
}

export default all([
  fork(addPermissionsWatcher),
  fork(permissionsActionsListWatcher),
  fork(permissionsApplicationsListWatcher),
]);
