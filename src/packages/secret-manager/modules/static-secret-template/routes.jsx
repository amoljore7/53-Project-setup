import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { openNotification } from '../../../../components/notification/action';
import StaticSecretsListing from './list';
import ViewStaticSecret from './view';
import AddStaticSecret from './add';
import EditStaticSecret from './edit';
import CloneStaticSecret from './clone';
import { fieldTypeStrings } from './constant';

const StaticSecretTemplateRoutes = ({ match }) => {
  const dispatch = useDispatch();
  const vaultDetail = useSelector((state) => state.vaultLanding);

  if (vaultDetail?.vaultStatusCode === 403) {
    dispatch(openNotification('error', fieldTypeStrings.accessDenied, true, null));
    return <Redirect to="/admin/secret-manager" />;
  }
  return (
    <Switch>
      <Route exact path={match.url} component={StaticSecretsListing} />
      <Route path={`${match.url}/view/:id`} component={ViewStaticSecret} />
      <Route path={`${match.url}/edit/:id`} component={EditStaticSecret} />
      <Route path={`${match.url}/clone/:id`} component={CloneStaticSecret} />
      <Route path={`${match.url}/add`} component={AddStaticSecret} />
      {/* {TODO: Add routes here} */}
    </Switch>
  );
};

StaticSecretTemplateRoutes.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
};

export default StaticSecretTemplateRoutes;
