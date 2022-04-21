import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import notification from '../../components/notification/reducer';
import spinnerOverlay from '../../components/spinner-overlay/reducer';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    combineReducers({
      notification,
      spinnerOverlay,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};

export default configureStore;