import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getUsersRequest,
  getTokensRequest,
} from '../../../../../components/policy/Members/actions';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestApplicationList } from '../../permissions/add/action';
import {
  createPolicyRequest,
  recursivePermissionListLoading,
  recursivePermissionListRequest,
  recursivePermissionListReset,
  recursiveRoleListLoading,
  recursiveRoleListRequest,
  recursiveRoleListReset,
} from './actions';
import AddPolicy from './AddPolicy';
import { PermissionActionsType, PermissionDetailsType, RolesDetailsType } from './constants';
import { active, smConsumer } from '../../../../../utils/common-constants';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';

const mapStateToProps = (state) => {
  const { add: addPolicyReducer } = state.policyReducer;
  const { membersReducer } = state;
  const { error: addPolicyErrors, status: addPolicyStatus } = addPolicyReducer.addPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const { data: serviceIdentitiesData, status: serviceIdentitiesDataStatus } =
    membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;
  const { data: permissionsList, status: permissionsListStatus } = addPolicyReducer.permissionList;
  const { data: consumersList } = state.consumerReducer;
  const { data: rolesList, status: rolesListStatus } = addPolicyReducer.rolesList;
  const { data: roleDetails, status: roleDetailsStatus } = addPolicyReducer.roleDetails;
  const { data: permissionDetails, status: permissionDetailsStatus } =
    addPolicyReducer.permissionDetails;
  const { data: permissionActionsList, status: permissionActionsListStatus } =
    addPolicyReducer.permissionActionsList;
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
    rolesList: rolesList || [],
    permissionActionsList: permissionActionsList.result || [],
    permissionActionsListStatus,
    rolesListStatus,
    roleDetails,
    roleDetailsStatus,
    permissionDetails: permissionDetails,
    permissionDetailsStatus,
    addPolicyErrors,
    addPolicyStatus,
    permissionsListStatus,
    applicationsListData,
    applicationsListStatus,
    featureFlags,
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
    fetchPermissionsList: () => {
      dispatch(recursivePermissionListReset());
      dispatch(recursivePermissionListLoading());
      dispatch(recursivePermissionListRequest());
    },
    fetchConsumersList: () => dispatch(consumerListRequest()),
    fetchPermissionDetails: (id) =>
      dispatch({ type: PermissionDetailsType.PERMISSION_DETAILS_REQUEST, payload: { id } }),
    fetchPermissionActions: (consumer) =>
      dispatch({ type: PermissionActionsType.PERMISSION_ACTIONS_REQUEST, payload: { consumer } }),
    fetchRolesList: () => {
      dispatch(recursiveRoleListReset());
      dispatch(recursiveRoleListLoading());
      dispatch(recursiveRoleListRequest());
    },
    fetchRoleDetails: (id) => {
      dispatch({ type: RolesDetailsType.ROLES_DETAILS_REQUEST, payload: { id } });
    },
    createPolicy: (data, history) => {
      dispatch(createPolicyRequest(data, history));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getApplicationsList: () => dispatch(requestApplicationList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicy);
