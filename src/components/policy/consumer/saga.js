import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { getConsumerList } from '../../../services/policy-admin-service';
import { consumerListFailure, consumerListLoading, consumerListSuccess } from './actions';
import { ConsumerListTypes } from './constant';

function* permissionsConsumerListWatcher() {
  yield takeLatest(ConsumerListTypes.CONSUMER_LIST_REQUEST, getConsumerListWorker);
}

function* getConsumerListWorker() {
  yield put(consumerListLoading());
  try {
    const consumerList = yield call(getConsumerList);
    yield put(consumerListSuccess(consumerList));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(consumerListFailure({ error: reason }));
  }
}

export default all([fork(permissionsConsumerListWatcher)]);
