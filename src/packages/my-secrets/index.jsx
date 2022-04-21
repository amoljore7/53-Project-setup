import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import configureStore from "./store";
import MySecretRoutes from "./routes";
import { Router } from "react-router-dom";
import Notification from "../../components/notification";
import SpinnerOverlay from "../../components/spinner-overlay";
import PageHeaderContainer from "../../components/page-header";

import "./mySecrets.scss";

const store = configureStore();

const SecretManager = ({ history, match, source }) => {
  return (
    <div className="my-secrets-app-container">
      <Provider store={store}>
        <Router history={history}>
          <Notification />
          <SpinnerOverlay />
          <PageHeaderContainer />
          <MySecretRoutes history={history} match={match} source={source} />
        </Router>
      </Provider>
    </div>
  );
};

SecretManager.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  source: PropTypes.string,
};

export default SecretManager;
