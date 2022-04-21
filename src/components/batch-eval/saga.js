import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { getBatchEvalDataComplete, getBatchEvalDataLoading } from './action';
import { getBatchEvalTypes } from './constants';
import { fetchBatchEvalData } from './service';
import { parseBatchEvalResponse } from './utils';

function* getBatchEvalWatcher() {
  yield takeLatest(getBatchEvalTypes.GET_BATCH_EVAL_REQUEST, getBatchEvalWorker);
}

function* getBatchEvalWorker({ payload }) {
  try {
    yield put(getBatchEvalDataLoading());
    const batchEvalResponse = yield call(fetchBatchEvalData, payload);
    const batchEvalData = parseBatchEvalResponse(batchEvalResponse, payload?.actionsList);
    yield put(getBatchEvalDataComplete(batchEvalData));
  } catch (_error) {
    // On error all actions are allowed
    const batchEvalData = parseBatchEvalResponse({}, payload?.actionsList);
    yield put(getBatchEvalDataComplete(batchEvalData));
  }
}

export default all([fork(getBatchEvalWatcher)]);
