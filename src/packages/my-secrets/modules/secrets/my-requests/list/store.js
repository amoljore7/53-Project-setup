import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import userSecretsReducer from '../../secrets-reducer';
import rootSaga from '../../../../store/root-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    combineReducers({
      userSecretsReducer
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
