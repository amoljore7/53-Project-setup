import React, { useState, useEffect } from 'react';
import Tabs from 'britive-design-system/core/components/tabs';
import PropTypes from 'prop-types';
import AllSecrets from './all-secrets';
import { classes, allSecretsTabValue, myRequestsTabValue, myApprovalsTabValue } from './constants';
import { Switch, Route, Redirect } from 'react-router-dom';
import MyApprovalsRoutes from './my-approvals/routes';
import MyRequestsRoutes from './my-requests/routes';
import './index.scss';

const Secrets = ({ history, match, location }) => {
  const [value, setValue] = useState(0);

  const tabValues = {
    allSecrets: allSecretsTabValue,
    myRequests: myRequestsTabValue,
    myApprovals: myApprovalsTabValue,
  };

  const getTabValue = () => {
    if (location.pathname.includes('/secrets/all-secrets')) {
      return tabValues.allSecrets;
    } else if (location.pathname.includes('/secrets/my-requests')) {
      return tabValues.myRequests;
    } else if (location.pathname.includes('/secrets/my-approvals')) {
      return tabValues.myApprovals;
    }
  };

  useEffect(() => {
    setValue(getTabValue());
  }, [location?.pathname]);

  const initialTab = [
    { title: 'All Secrets', link: 'all-secrets' },
    { title: 'My Requests', link: 'my-requests' },
    { title: 'My Approvals', link: 'my-approvals' },
  ];

  const handleChange = (index) => {
    setValue(index);
    history.push(`/admin/secret-manager/vault/secrets/${initialTab[index].link}`);
  };

  return (
    <div className={classes.secretsRequestsApprovalsContainer}>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="auto" />
      <Switch>
        <Route exact path={`${match.url}/all-secrets`} component={AllSecrets} />
        <Route exact path={`${match.url}/my-requests`} component={MyRequestsRoutes} />
        <Route exact path={`${match.url}/my-approvals`} component={MyApprovalsRoutes} />
        <Redirect exact path={match.url} to={`${match.url}/all-secrets`} />
      </Switch>
    </div>
  );
};

Secrets.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  location: PropTypes.any,
};

export default Secrets;
