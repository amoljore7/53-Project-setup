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
  getPolicyByIdRequest,
  getPolicyByIdReset,
  getPolicyByNameRequest,
  getPolicyByNameReset,
  recursiveEditPermissionListLoading,
  recursiveEditPermissionListRequest,
  recursiveEditPermissionListReset,
  recursiveEditRoleListLoading,
  recursiveEditRoleListRequest,
  recursiveEditRoleListReset,
  updatePolicyRequest,
} from './actions';
import {
  EditPermissionActionsType,
  EditPermissionDetailsType,
  EditRolesDetailsType,
} from './constants';
import { active, smConsumer } from '../../../../../utils/common-constants';
import EditPolicy from './EditPolicy';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';

const mapStateToProps = (state) => {
  const { edit: editPolicyReducer } = state.policyReducer;
  const { membersReducer } = state;
  const { data: loadedPolicy, status: loadedPolicyStatus } = editPolicyReducer.loadPolicy;
  const { data: loadedPolicyJSON, status: loadedPolicyJSONStatus } =
    editPolicyReducer.loadPolicyJSON;
  const { error: editPolicyErrors, status: editPolicyStatus } = editPolicyReducer.editPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const { data: serviceIdentitiesData, status: serviceIdentitiesDataStatus } =
    membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;
  const { data: permissionsList, status: permissionsListStatus } = editPolicyReducer.permissionList;
  const { data: consumersList, status: consumersListStatus } = state.consumerReducer;
  const { data: rolesList, status: rolesListStatus } = editPolicyReducer.rolesList;
  const { data: roleDetails, status: roleDetailsStatus } = editPolicyReducer.roleDetails;
  const { data: permissionDetails, status: permissionDetailsStatus } =
    editPolicyReducer.permissionDetails;
  const { data: permissionActionsList, status: permissionActionsListStatus } =
    editPolicyReducer.permissionActionsList;
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
      : consumersList.result || [],
    consumersListStatus,
    rolesList: rolesList || [],
    permissionActionsList: permissionActionsList.result || [],
    permissionActionsListStatus,
    rolesListStatus,
    roleDetails,
    roleDetailsStatus,
    permissionDetails: permissionDetails,
    permissionDetailsStatus,
    editPolicyErrors,
    editPolicyStatus,
    loadedPolicy,
    loadedPolicyStatus,
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
        type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_RESET,
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
      dispatch(recursiveEditPermissionListReset());
      dispatch(recursiveEditPermissionListLoading());
      dispatch(recursiveEditPermissionListRequest());
    },
    fetchConsumersList: () => dispatch(consumerListRequest()),
    fetchPermissionDetails: (id) =>
      dispatch({
        type: EditPermissionDetailsType.EDIT_PERMISSION_DETAILS_REQUEST,
        payload: { id },
      }),
    fetchPermissionActions: (consumer) =>
      dispatch({
        type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_REQUEST,
        payload: { consumer },
      }),
    fetchRolesList: () => {
      dispatch(recursiveEditRoleListReset());
      dispatch(recursiveEditRoleListLoading());
      dispatch(recursiveEditRoleListRequest());
    },
    fetchRoleDetails: (id) => {
      dispatch({ type: EditRolesDetailsType.EDIT_ROLES_DETAILS_REQUEST, payload: { id } });
    },
    updatePolicy: (data, history, policyEntity) => {
      dispatch(updatePolicyRequest(data, history, policyEntity));
    },
    loadPolicy: (id, history) => {
      dispatch(getPolicyByIdRequest(id, history));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getApplicationsList: () => dispatch(requestApplicationList()),
    loadPolicyJSON: (name, history) => {
      dispatch(getPolicyByNameRequest(name, history));
    },
    resetPolicy: () => dispatch(getPolicyByIdReset()),
    resetPolicyJSON: () => dispatch(getPolicyByNameReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPolicy);
