import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import SecretManager from '../../packages/secret-manager';
import PolicyManagement from '../../packages/policy-management';
import GlobalSettings from '../../packages/global-settings';
import ProfilePolicy from '../../components/profile-policy';
import Admin from './Admin';

const AdminRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={Admin} />
      <Route path={`${match.url}/secret-manager`} component={SecretManager} />
      <Route path={`${match.url}/policy-management`} component={PolicyManagement} />
      <Route path={`${match.url}/global-settings`} component={GlobalSettings} />
      <Route path={`${match.url}/profiles/:profileId/policy/manage`} component={ProfilePolicy} />
    </Switch>
  );
};

AdminRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default withRouter(AdminRoutes);
