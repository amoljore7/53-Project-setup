import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Admin from '../admin';
import MySecrets from '../../packages/my-secrets';

const HomeRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={Home} />
      <Route path={`${match.url}admin`} component={Admin} />
      <Route path={`${match.url}my-secrets`} component={MySecrets} />
    </Switch>
  );
};

HomeRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default withRouter(HomeRoutes);
