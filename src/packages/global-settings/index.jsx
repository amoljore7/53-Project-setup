import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import PageHeaderContainer from '../../components/page-header';
import configureStore from './store';
import { Router } from 'react-router-dom';
import Notification from '../../components/notification';
import SpinnerOverlay from '../../components/spinner-overlay';
import './globalModule.scss';
import GlobalSettingsRoutes from './routes';

const store = configureStore();

const GlobalSettings = ({ history, match }) => {
  return (
    <div className="global-settings-app-container">
      <Provider store={store}>
        <Router history={history}>
          <Notification />
          <SpinnerOverlay />
          <PageHeaderContainer />
          <GlobalSettingsRoutes history={history} match={match} />
        </Router>
      </Provider>
    </div>
  );
};

GlobalSettings.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default GlobalSettings;
