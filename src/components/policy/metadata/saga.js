import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getMetadataComplete, getMetadataFailure, getMetadataLoading } from './actions';
import { GetMetadataType } from './constants';
import { parseBatchEvalResponse } from '../../batch-eval/utils';
import { fetchMetadata } from './service';

function* getMetadataWatcher() {
  yield takeLatest(GetMetadataType.GET_METADATA_REQUEST, getMetadataWorker);
}

function* getMetadataWorker({ payload }) {
  try {
    yield put(getMetadataLoading());
    const metadataResponse = yield call(fetchMetadata, payload);
    const metadata = parseBatchEvalResponse(
      metadataResponse,
      payload?.actionsList,
      payload?.resource
    );
    yield put(getMetadataComplete(metadata));
  } catch ({ response }) {
    const reason = response?.data?.message || '';
    yield put(getMetadataFailure(reason));
  }
}

export default all([fork(getMetadataWatcher)]);
