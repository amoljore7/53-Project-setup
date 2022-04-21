import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MyRequestsList from './list';
const MyRequestsRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={MyRequestsList} />
      {/* {TODO: Add routes here} */}
    </Switch>
  );
};

MyRequestsRoutes.propTypes = {
  match: PropTypes.any,
};

export default MyRequestsRoutes;
