import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import SecretsRoutes from './modules/secrets/routes';
const MySecretsRoutes = ({ match, source, history }) => {
  return (
    <Switch>
      <Route
        path={match.url}
        render={() => <SecretsRoutes source={source} match={match} history={history} />}
      />
    </Switch>
  );
};

MySecretsRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  source: PropTypes.string,
};

export default MySecretsRoutes;
