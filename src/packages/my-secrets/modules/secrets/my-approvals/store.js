import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import userSecretsReducer from '../secrets-reducer';
import notification from '../../../../../components/notification/reducer';
import rootSaga from '../../../store/root-saga';
import spinnerOverlay from '../../../../../components/spinner-overlay/reducer';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    combineReducers({
      userSecretsReducer,
      notification,
      spinnerOverlay,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;