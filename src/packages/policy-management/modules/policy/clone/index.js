import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../../../../../components/policy/Members/actions';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestApplicationList } from '../../permissions/add/action';
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
import { active, smConsumer } from '../../../../../utils/common-constants';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';

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
  const { status: applicationsListStatus, data: applicationsListData } =
    state?.permissionsReducer?.permissionApplicationsList;
  const { flags: featureFlags } = state.featureFlags;
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
    consumersList: !featureFlags[secretManagerFlag]
      ? consumersList.result?.filter((consumer) => consumer.name !== smConsumer)
      : consumersList?.result || [],
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
    applicationsListStatus,
    applicationsListData,
    loadedPolicyJSON,
    loadedPolicyJSONStatus,
    featureFlags,
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
    createPolicy: (data, history) => {
      dispatch(createPolicyRequest(data, history));
    },
    loadPolicy: (id, history) => {
      dispatch(getPolicyByIdRequest(id, history));
    },
    loadPolicyJSON: (name, history) => {
      dispatch(getPolicyByNameRequest(name, history));
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
