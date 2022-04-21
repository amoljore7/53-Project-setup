import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import AdminSecretPolicyView from './view';
import AddPolicy from './add';
import EditPolicy from './edit';

const PolicyRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/add`} component={AddPolicy} />
      <Route exact path={`${match.url}/edit`} component={EditPolicy} />
      <Route exact path={`${match.url}/view/:id`} component={AdminSecretPolicyView} />
    </Switch>
  );
};

PolicyRoutes.propTypes = {
  match: PropTypes.any,
};

export default PolicyRoutes;
