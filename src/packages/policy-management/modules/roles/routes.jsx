import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import RolesList from './list';
import RolesView from './view';
import AddRole from './add';
import EditRole from './edit';
import CloneRole from './clone';

const RolesRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={RolesList} />
      <Route path={`${match?.url}/view/:id`} component={RolesView} />
      <Route exact path={`${match.url}/add`} component={AddRole} />
      <Route path={`${match?.url}/edit/:id`} component={EditRole} />
      <Route path={`${match?.url}/clone/:id`} component={CloneRole} />
    </Switch>
  );
};

RolesRoutes.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
};

export default RolesRoutes;
