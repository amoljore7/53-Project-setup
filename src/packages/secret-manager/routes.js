import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initSpinnerOverlay } from '../../components/spinner-overlay/action';
import { getVaultLandingRequest } from './modules/home/actions';
import SecretManagerHome from './modules/home';
import CreateVaultButton from './modules/vault/create-vault-button';
import CreateVaultForm from './modules/vault/create';
import VaultDetails from './modules/vault/details/VaultDetails';
import PasswordPoliciesRoutes from './modules/password-policies/routes';
import SecretsRoutes from './modules/secrets/routes';
import PrivateRoutes from './PrivateRoutes';
import StaticSecretsRoutes from './modules/static-secret-template/routes';
import EditVault from './modules/vault/edit';
import { translate } from './externalization';
import { getBatchEvalDataRequest } from '../../components/batch-eval/action';
import {
  identitySecurityActionsPayload,
  passwordPolicyActionsPayload,
  staticSecretTemplateActionsPayload,
  vaultActionsPayload,
  notificationMediumActionsPayload,
} from '../../components/batch-eval/constants';
import { isError, isLoading, isSuccess } from '../../utils/common-utils';
import { isEmpty } from 'lodash';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../../components/policy/Members/actions';
import { ALLOW, tokensListAction, userTagListAction } from '../../utils/common-constants';
import { consumerListRequest } from '../../components/policy/consumer/actions';

const SecretManagerRoutes = ({ match }) => {
  const [usersRequestRetries, setUsersRequestRetries] = useState(0);
  const [groupsRequestRetries, setGroupsRequestRetries] = useState(0);
  const [tokensRequestRetries, setTokensRequestRetries] = useState(0);
  const [siRequestRetries, setSiRequestRetries] = useState(0);
  const [consumerListRequestRetries, setConsumerListRequestRetries] = useState(0);
  const dispatch = useDispatch();
  const {
    loading: vaultStatus,
    data: vaultData,
    error: vaultError,
  } = useSelector((state) => state?.vaultLanding);
  const { status: batchEvalLoading, result: batchEvalData } = useSelector(
    (state) => state?.batchEvalReducer
  );
  const { status: usersStatus } = useSelector((state) => state?.membersReducer?.users);
  const { status: groupsStatus } = useSelector((state) => state?.membersReducer?.groups);
  const { status: tokensStatus } = useSelector((state) => state?.membersReducer?.tokens);
  const { status: serviceIdentitiesStatus } = useSelector(
    (state) => state?.membersReducer?.serviceIdentities
  );
  const { status: consumerListStatus } = useSelector((state) => state?.consumerReducer);

  const [loading, setLoading] = useState(false);
  const loadingMessage = translate('LOADING');

  useEffect(() => {
    dispatch(
      getBatchEvalDataRequest([
        ...passwordPolicyActionsPayload,
        ...staticSecretTemplateActionsPayload,
        ...vaultActionsPayload,
        ...identitySecurityActionsPayload,
        ...notificationMediumActionsPayload,
      ])
    );
    dispatch(getVaultLandingRequest());
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
    if (vaultStatus || isLoading(batchEvalLoading)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [vaultStatus, batchEvalLoading]);

  useEffect(() => {
    dispatch(
      initSpinnerOverlay({
        open: loading,
        size: 'medium',
        message: loadingMessage,
      })
    );
  }, [loading, vaultStatus, batchEvalLoading]);

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
  }, [consumerListStatus]);

  //vaultData and vaultError is being checked because to avoid rendering secret home page before completing vault api as loading will be false in initial rendering
  return (
    !loading &&
    (!isEmpty(vaultData) || !isEmpty(vaultError)) && (
      <Switch>
        <Route exact path={match.url} component={SecretManagerHome} />
        <Route path={`${match.url}/vault/secrets`} component={SecretsRoutes} />
        <PrivateRoutes
          exact
          toPath={`${match.url}/vault/secrets`}
          path={`${match.url}/vault`}
          component={CreateVaultButton}
        />
        <PrivateRoutes
          toPath={`${match.url}/vault/secrets`}
          path={`${match.url}/vault/create`}
          component={CreateVaultForm}
        />
        <Route exact path={`${match.url}/vault/details`} component={VaultDetails} />
        <Route exact path={`${match.url}/vault/edit/:id`} component={EditVault} />
        <Route path={`${match.url}/password-policies`} component={PasswordPoliciesRoutes} />
        <Route path={`${match.url}/vault/static-secret`} component={StaticSecretsRoutes} />
      </Switch>
    )
  );
};

SecretManagerRoutes.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default SecretManagerRoutes;
