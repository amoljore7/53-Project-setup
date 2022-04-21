import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import PermissionsListing from './list';
import AddPermission from './add';
import ViewPermission from './view';
import EditPermission from './edit';
import ClonePermission from './clone';

const PermissionsRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={PermissionsListing} />
      <Route path={`${match.url}/add`} component={AddPermission} />
      <Route path={`${match.url}/view/:id`} component={ViewPermission} />
      <Route path={`${match.url}/edit/:id`} component={EditPermission} />
      <Route path={`${match.url}/clone/:id`} component={ClonePermission} />
      {/* {TODO: Add routes here} */}
    </Switch>
  );
};

PermissionsRoutes.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
};

export default PermissionsRoutes;
