import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import GlobalSettingsHome from './modules/home';
import NotificationMediumsRoutes from './modules/notification-mediums/routes';

const GlobalSettingsRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={GlobalSettingsHome} />
      <Route path={`${match.url}/notification-medium`} component={NotificationMediumsRoutes} />
    </Switch>
  );
};

GlobalSettingsRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default GlobalSettingsRoutes;
