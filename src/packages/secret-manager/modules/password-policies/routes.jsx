import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../../../components/notification/action';
import PasswordPoliciesList from './list';
import AddPasswordPolicy from './add';
import PasswordPolicyView from './view';
import EditPasswordPolicy from './edit';
import ClonePasswordPolicy from './clone';
import { translatedStrings } from './common-validation';

const PasswordPoliciesRoutes = ({ match }) => {
  const dispatch = useDispatch();
  const vaultDetail = useSelector((state) => state.vaultLanding);

  if (vaultDetail?.vaultStatusCode === 403) {
    dispatch(openNotification('error', translatedStrings.accessDenied, true, null));
    return <Redirect to="/admin/secret-manager" />;
  }
  return (
    <Switch>
      <Route exact path={match.url} component={PasswordPoliciesList} />
      <Route exact path={`${match.url}/add`} component={AddPasswordPolicy} />
      <Route path={`${match.url}/view/:id`} component={PasswordPolicyView} />
      <Route path={`${match.url}/edit/:id`} component={EditPasswordPolicy} />
      <Route path={`${match.url}/clone/:id`} component={ClonePasswordPolicy} />
    </Switch>
  );
};

PasswordPoliciesRoutes.propTypes = {
  match: PropTypes.any,
};

export default PasswordPoliciesRoutes;
