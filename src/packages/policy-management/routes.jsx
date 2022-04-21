import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'britive-design-system/core/components/spinner';
import PolicyManagementHome from './modules/home';
import PolicyRoutes from './modules/policy/routes';
import RolesRoutes from './modules/roles/routes';
import PermissionsRoutes from './modules/permissions/routes';
import { getBatchEvalDataRequest } from '../../components/batch-eval/action';
import {
  identitySecurityActionsPayload,
  permissionActionsPayload,
  policyActionsPayload,
  roleActionsPayload,
} from '../../components/batch-eval/constants';
import {
  ALLOW,
  errorNotificationDuration,
  errorNotificationType,
  medium,
  tokensListAction,
  userTagListAction,
} from '../../utils/common-constants';
import { translate } from './externalization';
import { isError, isLoading, isSuccess } from '../../utils/common-utils';
import { isEmpty } from 'lodash';
import {
  // eslint-disable-next-line no-unused-vars
  getGroupsRequest,
  // eslint-disable-next-line no-unused-vars
  getServiceIdentitiesRequest,
  // eslint-disable-next-line no-unused-vars
  getTokensRequest,
  getUsersRequest,
} from '../../components/policy/Members/actions';
import { setFeatureFlags } from '../../components/feature-flag/actions';
import { consumerListRequest } from '../../components/policy/consumer/actions';
import { openNotification } from '../../components/notification/action';

const PolicyManagementRoutes = ({ match, secretManagerEnabled }) => {
  const [usersRequestRetries, setUsersRequestRetries] = useState(0);
  const [groupsRequestRetries, setGroupsRequestRetries] = useState(0);
  const [tokensRequestRetries, setTokensRequestRetries] = useState(0);
  const [siRequestRetries, setSiRequestRetries] = useState(0);
  const [consumerListRequestRetries, setConsumerListRequestRetries] = useState(0);

  const dispatch = useDispatch();
  const { status: batchEvalLoading, result: batchEvalData } = useSelector(
    (state) => state?.batchEvalReducer
  );
  const { status: usersStatus } = useSelector((state) => state?.membersReducer?.users);
  const { status: groupsStatus } = useSelector((state) => state?.membersReducer?.groups);
  const { status: tokensStatus } = useSelector((state) => state?.membersReducer?.tokens);
  const { status: serviceIdentitiesStatus } = useSelector(
    (state) => state?.membersReducer?.serviceIdentities
  );
  const { status: consumerListStatus, error: consumerListError } = useSelector(
    (state) => state?.consumerReducer
  );

  useEffect(() => {
    dispatch(setFeatureFlags({ secretManagerEnabled }));
    // dispatch initial batch eval request
    dispatch(
      getBatchEvalDataRequest([
        ...policyActionsPayload,
        ...roleActionsPayload,
        ...permissionActionsPayload,
        // actions for accessing members list
        ...identitySecurityActionsPayload,
      ])
    );
    dispatch(consumerListRequest());
  }, []);

  useEffect(() => {
    if (
      isSuccess(batchEvalLoading) &&
      batchEvalData[userTagListAction] === ALLOW &&
      batchEvalData[tokensListAction] === ALLOW &&
      !isSuccess(usersStatus) &&
      !isSuccess(groupsStatus) &&
      !isSuccess(tokensStatus) &&
      !isSuccess(serviceIdentitiesStatus)
    ) {
      dispatch(getUsersRequest());
      dispatch(getTokensRequest());
      dispatch(getGroupsRequest());
      dispatch(getServiceIdentitiesRequest());
    }
  }, [batchEvalData, batchEvalLoading]);

  useEffect(() => {
    if (isError(usersStatus) && !usersRequestRetries) {
      setUsersRequestRetries(usersRequestRetries + 1);
      dispatch(getUsersRequest());
    }
  }, [usersStatus]);

  useEffect(() => {
    if (isError(groupsStatus) && !groupsRequestRetries) {
      setGroupsRequestRetries(groupsRequestRetries + 1);
      dispatch(getGroupsRequest());
    }
  }, [groupsStatus]);

  useEffect(() => {
    if (isError(tokensStatus) && !tokensRequestRetries) {
      setTokensRequestRetries(tokensRequestRetries + 1);
      dispatch(getTokensRequest());
    }
  }, [tokensStatus]);

  useEffect(() => {
    if (isError(serviceIdentitiesStatus) && !siRequestRetries) {
      setSiRequestRetries(siRequestRetries + 1);
      dispatch(getServiceIdentitiesRequest());
    }
  }, [serviceIdentitiesStatus]);

  useEffect(() => {
    if (isError(consumerListStatus) && !consumerListRequestRetries) {
      setConsumerListRequestRetries(consumerListRequestRetries + 1);
      dispatch(consumerListRequest());
    }
    if (isError(consumerListStatus) && consumerListRequestRetries >= 1) {
      dispatch(
        openNotification(errorNotificationType, consumerListError, true, errorNotificationDuration)
      );
    }
  }, [consumerListStatus]);

  // Extra check is added to avoid false rendering for 1st time, as loading will be false(for fraction of seconds i.,e time between first render and useEffect),
  // component will render(base on route) after that batchEval APi will be call which will mark loading as true
  // After API call, again component will be render(base on route)
  return !isLoading(batchEvalLoading) && !isEmpty(batchEvalData) ? (
    <Switch>
      <Route exact path={match.url} component={PolicyManagementHome} />
      <Route path={`${match.url}/policies`} component={PolicyRoutes} />
      <Route path={match.url + '/roles'} component={RolesRoutes} />
      <Route path={`${match.url}/permissions`} component={PermissionsRoutes} />
    </Switch>
  ) : (
    <Spinner size={medium} message={translate('LOADING')} overlay={true} />
  );
};

PolicyManagementRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  secretManagerEnabled: PropTypes.bool,
};

export default PolicyManagementRoutes;
