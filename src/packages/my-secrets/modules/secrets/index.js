import React, { useEffect, useState } from 'react';
import Tabs from 'britive-design-system/core/components/tabs';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllSecrets from './all-secrets/MyAllSecrets';
import MyApprovalsRoutes from './my-approvals/routes';
import MyRequestsRoutes from './my-requests/routes';
import { requestVaultLanding } from './action';
import { setPageHeaderAction } from '../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../components/spinner-overlay/action';
import { classes, pageTitle, vaultLoadingMessage } from './constants';
import './index.scss';

const TabPanel = (props) => {
  const { value, index } = props;
  return value === index && <div>{props.children}</div>;
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
};

const SecretsRequestsApprovals = ({ history, match }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const { loading: vaultDetailsLoading } = useSelector((state) => state.vaultLanding);

  const tabValues = {
    allSecrets: 0,
    myRequests: 1,
    myApprovals: 2,
  };

  const getTabValue = () => {
    if (location.pathname.includes('/my-secrets/all-secrets')) {
      return tabValues.allSecrets;
    } else if (location.pathname.includes('/my-secrets/my-requests')) {
      return tabValues.myRequests;
    } else if (location.pathname.includes('/my-secrets/my-approvals')) {
      return tabValues.myApprovals;
    }
  };

  useEffect(() => {
    setValue(getTabValue());
  }, [location?.pathname]);

  useEffect(() => {
    dispatch(setPageHeaderAction(pageTitle, []));
    dispatch(requestVaultLanding());
  }, []);

  useEffect(() => {
    dispatch(
      initSpinnerOverlay({
        open: vaultDetailsLoading,
        size: 'medium',
        message: vaultLoadingMessage,
      })
    );
  }, [vaultDetailsLoading]);

  const initialTab = [
    { title: 'All Secrets', link: '/all-secrets' },
    { title: 'My Requests', link: '/my-requests' },
    { title: 'My Approvals', link: '/my-approvals' },
  ];

  const handleChange = (index) => {
    setValue(index);
    history.push(`/my-secrets${initialTab[index].link}`);
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

SecretsRequestsApprovals.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default SecretsRequestsApprovals;
