import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Secrets from './index';
import AddSecret from './add';
import EditSecret from './edit';
import MyApprovalsDetails from './my-approvals/view/MyApprovalsDetails';
import PolicyRoutes from './all-secrets/policy/routes';

const SecretsRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/add`} component={AddSecret} />
      <Route exact path={`${match.url}/edit`} component={EditSecret} />
      <Route exact path={`${match.url}/my-approvals/view/:id`} component={MyApprovalsDetails} />
      <Route path={`${match.url}/all-secrets/policy`} component={PolicyRoutes} />
      <Route path={`${match.url}`} component={Secrets} />
    </Switch>
  );
};

SecretsRoutes.propTypes = {
  match: PropTypes.any,
};

export default SecretsRoutes;
