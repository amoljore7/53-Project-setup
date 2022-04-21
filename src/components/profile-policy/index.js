import React from "react";
import PolicyRoutes from "./routes";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import Notification from "../notification";
import SpinnerOverlay from "../spinner-overlay";
import PageHeaderContainer from "../page-header";
import configureStore from "./store";
import PropTypes from "prop-types";
const store = configureStore();

const ProfilePolicy = ({ history, match, appManage = true }) => {
  return (
    <div className="secret-manager-app-container">
      <Provider store={store}>
        <Router history={history}>
          <Notification />
          <SpinnerOverlay />
          <PageHeaderContainer />
          <PolicyRoutes
            history={history} 
            match={match} 
            appManage={appManage} 
          />
        </Router>
      </Provider>
    </div>
  )
}


ProfilePolicy.propTypes = {
    history: PropTypes.any,
    match: PropTypes.any,
    appManage: PropTypes.bool,
};

export default ProfilePolicy
