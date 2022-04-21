import { connect } from 'react-redux';
import { openNotification } from '../../notification/action';
import { HeaderConstants } from '../../page-header/constants';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getUsersRequest,
  getTokensRequest,
} from '../../policy/Members/actions';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import { requestApplicationList } from '../../../packages/policy-management/modules/permissions/add/action';
import {
  createPolicyRequest,
} from './actions';
import AddPolicy from './AddPolicy';
import { PermissionActionsType } from './constants';
import { active, smConsumer } from '../../../utils/common-constants';
import { consumerListRequest } from '../../policy/consumer/actions';

const mapStateToProps = (state) => {
  const { add: addPolicyReducer } = state.policyReducer;
  const { membersReducer } = state;
  const { error: addPolicyErrors, status: addPolicyStatus } = addPolicyReducer.addPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const { data: serviceIdentitiesData, status: serviceIdentitiesDataStatus } =
    membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;
  const { data: consumersList } = state.consumerReducer;
  return {
    usersData: (usersData?.result || []).filter((user) => user.status.toLowerCase() === active),
    usersDataStatus,
    groupsData: (groupsData?.result || []).filter((tag) => tag.status.toLowerCase() === active),
    groupsDataStatus,
    serviceIdentitiesData: (serviceIdentitiesData?.result || []).filter(
      (si) => si.status.toLowerCase() === active
    ),
    serviceIdentitiesDataStatus,
    tokensData: (tokensData?.result || []).filter((token) => token.status.toLowerCase() === active),
    tokensDataStatus,
    consumersList: consumersList.result?.filter((consumer) => consumer.name !== smConsumer),
    addPolicyErrors,
    addPolicyStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetActionsData: () =>
      dispatch({
        type: PermissionActionsType.PERMISSION_ACTIONS_RESET,
      }),
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
    fetchConsumersList: () => dispatch(consumerListRequest()),
    createPolicy: (data, history, consumer, consumerEntityId, redirectPath) => {
      dispatch(createPolicyRequest(data, history, consumer, consumerEntityId, redirectPath));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getApplicationsList: () => dispatch(requestApplicationList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicy);
