import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store';
import SecretManagerRoutes from './routes';
import { Router } from 'react-router-dom';
import Notification from '../../components/notification';
import SpinnerOverlay from '../../components/spinner-overlay';
import PageHeaderContainer from '../../components/page-header';
import './secretModule.scss';

const store = configureStore();

const SecretManager = ({ history, match }) => {
  return (
    <div className="secret-manager-app-container">
      <Provider store={store}>
        <Router history={history}>
          <Notification />
          <SpinnerOverlay />
          <PageHeaderContainer />
          <SecretManagerRoutes history={history} match={match} />
        </Router>
      </Provider>
    </div>
  );
};

SecretManager.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default SecretManager;
