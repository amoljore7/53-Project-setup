import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import PolicyList from './policy-list';
import AddPolicy from './add';
import PolicyView from './view';
import EditPolicy from './edit';
import ClonePolicy from './clone';
const PolicyRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={PolicyList} />
      <Route exact path={`${match.url}/add`} component={AddPolicy} />
      <Route path={`${match?.url}/view/:id`} component={PolicyView} />
      <Route path={`${match?.url}/edit/:id`} component={EditPolicy} />
      <Route path={`${match?.url}/clone/:id`} component={ClonePolicy} />
    </Switch>
  );
};

PolicyRoutes.propTypes = {
  match: PropTypes.any,
};

export default PolicyRoutes;
