import { connect } from 'react-redux';
import { openNotification } from '../../notification/action';
import { HeaderConstants } from '../../page-header/constants';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../../policy/Members/actions';
import { initSpinnerOverlay } from '../../spinner-overlay/action';
import { requestApplicationList } from '../../../packages/policy-management/modules/permissions/add/action';
import {
  createPolicyRequest,
  getPolicyByIdRequest,
  getPolicyByIdReset,
  getPolicyByNameRequest,
  getPolicyByNameReset,
  recursiveClonePermissionListLoading,
  recursiveClonePermissionListRequest,
  recursiveClonePermissionListReset,
  recursiveCloneRoleListLoading,
  recursiveCloneRoleListRequest,
  recursiveCloneRoleListReset,
} from './actions';
import ClonePolicy from './ClonePolicy';
import {
  ClonePermissionActionsType,
  ClonePermissionDetailsType,
  CloneRolesDetailsType,
} from './constants';
import { active, smConsumer } from '../../../utils/common-constants';
import { consumerListRequest } from '../../policy/consumer/actions';

const mapStateToProps = (state) => {
  const { clone: clonePolicyReducer } = state.policyReducer;
  const { membersReducer } = state;
  const { data: loadedPolicy, status: loadedPolicyStatus } = clonePolicyReducer.loadPolicy;
  const { data: loadedPolicyJSON, status: loadedPolicyJSONStatus } =
    clonePolicyReducer.loadPolicyJSON;
  const { error: addPolicyErrors, status: addPolicyStatus } = clonePolicyReducer.addPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const { data: serviceIdentitiesData, status: serviceIdentitiesDataStatus } =
    membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;
  const { data: permissionsList, status: permissionsListStatus } =
    clonePolicyReducer.permissionList;
  const { data: consumersList, status: consumersListStatus } = state.consumerReducer;
  const { data: rolesList, status: rolesListStatus } = clonePolicyReducer.rolesList;
  const { data: roleDetails, status: roleDetailsStatus } = clonePolicyReducer.roleDetails;
  const { data: permissionDetails, status: permissionDetailsStatus } =
    clonePolicyReducer.permissionDetails;
  const { data: permissionActionsList, status: permissionActionsListStatus } =
    clonePolicyReducer.permissionActionsList;
  const { data: notificationMediumDetails, status: notificationMediumDetailsStatus } =
    state?.policyReducer?.view?.notificationMedium;
  const { data: channelList, status: channelListStatus } = state?.policyReducer?.add?.channelList;
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
    permissionsList: permissionsList || [],
    consumersList: consumersList.result?.filter((consumer) => consumer.name !== smConsumer),
    consumersListStatus,
    rolesList: rolesList || [],
    permissionActionsList: permissionActionsList.result || [],
    permissionActionsListStatus,
    rolesListStatus,
    roleDetails,
    roleDetailsStatus,
    permissionDetails: permissionDetails,
    permissionDetailsStatus,
    loadedPolicy,
    loadedPolicyStatus,
    addPolicyStatus,
    addPolicyErrors,
    permissionsListStatus,
    notificationMediumDetails,
    notificationMediumDetailsStatus,
    channelList,
    channelListStatus,
    loadedPolicyJSON,
    loadedPolicyJSONStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetActionsData: () =>
      dispatch({
        type: ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_RESET,
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
    fetchPermissionsList: () => {
      dispatch(recursiveClonePermissionListReset());
      dispatch(recursiveClonePermissionListLoading());
      dispatch(recursiveClonePermissionListRequest());
    },
    fetchConsumersList: () => dispatch(consumerListRequest()),
    fetchPermissionDetails: (id) =>
      dispatch({
        type: ClonePermissionDetailsType.CLONE_PERMISSION_DETAILS_REQUEST,
        payload: { id },
      }),
    fetchPermissionActions: (consumer) =>
      dispatch({
        type: ClonePermissionActionsType.CLONE_PERMISSION_ACTIONS_REQUEST,
        payload: { consumer },
      }),
    fetchRolesList: () => {
      dispatch(recursiveCloneRoleListReset());
      dispatch(recursiveCloneRoleListLoading());
      dispatch(recursiveCloneRoleListRequest());
    },
    fetchRoleDetails: (id) => {
      dispatch({ type: CloneRolesDetailsType.CLONE_ROLES_DETAILS_REQUEST, payload: { id } });
    },
    createPolicy: (data, history, consumer, consumerEntityId, redirectPath) => {
      dispatch(createPolicyRequest(data, history, consumer, consumerEntityId, redirectPath));
    },
    loadPolicy: (id, history, consumer, consumerEntityId, redirectPath) => {
      dispatch(getPolicyByIdRequest(id, history, consumer, consumerEntityId, redirectPath));
    },
    loadPolicyJSON: (name, history, consumer, consumerEntityId, redirectPath) => {
      dispatch(getPolicyByNameRequest(name, history, consumer, consumerEntityId, redirectPath));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getApplicationsList: () => dispatch(requestApplicationList()),
    resetPolicy: () => dispatch(getPolicyByIdReset()),
    resetPolicyJSON: () => dispatch(getPolicyByNameReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClonePolicy);
