import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
