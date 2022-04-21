import { connect } from 'react-redux';
import AddPolicy from './SMAddPolicy';
import { HeaderConstants } from '../../../../../../../components/page-header/constants';
import { openNotification } from '../../../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import { createPolicyRequest, secretDetailsRequest } from './actions';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../../../../../../../components/policy/Members/actions';

const mapStateToProps = (state) => {
  const { addPolicyReducer } = state.secretsReducer;
  const { membersReducer } = state;
  const { error: addPolicyErrors, status: addPolicyStatus } = addPolicyReducer.addPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const {
    data: serviceIdentitiesData,
    status: serviceIdentitiesDataStatus,
  } = membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;

  return {
    usersData: usersData?.result || [],
    usersDataStatus,
    groupsData: groupsData?.result || [],
    groupsDataStatus,
    serviceIdentitiesData: serviceIdentitiesData?.result || [],
    serviceIdentitiesDataStatus,
    tokensData: tokensData?.result || [],
    tokensDataStatus,
    addPolicyErrors,
    addPolicyStatus,
    nodeSecretMetadataState: state.secretsReducer.nodeSecretMetadata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    fetchUsers: () => dispatch(getUsersRequest()),
    fetchGroups: () => dispatch(getGroupsRequest()),
    fetchServiceIdentities: () => dispatch(getServiceIdentitiesRequest()),
    fetchTokens: () => dispatch(getTokensRequest()),
    createPolicy: (data, history, resource) => {
      dispatch(createPolicyRequest(data, history, resource));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    fetchSecretDetails: (path, vaultId, history) =>
      dispatch(secretDetailsRequest(path, vaultId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicy);
