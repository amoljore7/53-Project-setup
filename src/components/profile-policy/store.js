import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { composeWithDevTools } from 'redux-devtools-extension';

import policyReducer from './policy-reducer';
import membersReducer from '../policy/Members/reducer';
import consumerReducer from '../policy/consumer/reducer'
import notification from '../notification/reducer'
import pageHeader from '../page-header/reducer'
import spinnerOverlay from '../spinner-overlay/reducer'
import policySaga from './policy-saga';
import membersSaga from '../policy/Members/saga'
import consumerSaga from '../policy/consumer/saga'

const saga = function* () {
  yield all([
    policySaga,
    membersSaga,
    consumerSaga
  ])
}
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(combineReducers({
    policyReducer, 
    membersReducer, 
    consumerReducer, 
    notification,
    pageHeader,
    spinnerOverlay,
  }), composeWithDevTools(applyMiddleware(...middleware)));
  sagaMiddleware.run(saga);
  return store;
};

export default configureStore;
