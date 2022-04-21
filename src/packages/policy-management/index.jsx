import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import PageHeaderContainer from '../../components/page-header';
import PolicyManagementRoutes from './routes';
import configureStore from './store';
import { Router } from 'react-router-dom';
import Notification from '../../components/notification';
import SpinnerOverlay from '../../components/spinner-overlay';
import './policyModule.scss';

const store = configureStore();

const PolicyManagement = ({ history, match, secretManagerEnabled }) => {
  return (
    <div className="policy-management-app-container">
      <Provider store={store}>
        <Router history={history}>
          <Notification />
          <SpinnerOverlay />
          <PageHeaderContainer />
          <PolicyManagementRoutes
            history={history}
            match={match}
            secretManagerEnabled={Boolean(secretManagerEnabled)}
          />
        </Router>
      </Provider>
    </div>
  );
};

PolicyManagement.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  secretManagerEnabled: PropTypes.bool,
};

export default PolicyManagement;
