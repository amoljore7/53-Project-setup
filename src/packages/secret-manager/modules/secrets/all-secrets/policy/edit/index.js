import { connect } from 'react-redux';
import { openNotification } from '../../../../../../../components/notification/action';
import { HeaderConstants } from '../../../../../../../components/page-header/constants';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../../../../../../../components/policy/Members/actions';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';
import { getPolicyByNameRequest, getPolicyByNameReset } from '../view/action';
import {
  EditConsumerListType,
  EditPermissionActionsType,
  EditPolicyType,
  LoadPolicyDataType,
} from './constants';
import EditPolicy from './EditPolicy';

const mapStateToProps = (state) => {
  const { editPolicyReducer } = state.secretsReducer;
  const { membersReducer } = state;
  const { data: loadedPolicy, status: loadedPolicyStatus } = editPolicyReducer.loadPolicy;
  const { error: editPolicyErrors, status: editPolicyStatus } = editPolicyReducer.editPolicy;
  const { data: usersData, status: usersDataStatus } = membersReducer.users;
  const { data: groupsData, status: groupsDataStatus } = membersReducer.groups;
  const { data: serviceIdentitiesData, status: serviceIdentitiesDataStatus } =
    membersReducer.serviceIdentities;
  const { data: tokensData, status: tokensDataStatus } = membersReducer.tokens;
  const { data: consumersList } = editPolicyReducer.consumerList;
  const { data: permissionActionsList, status: permissionActionsListStatus } =
    editPolicyReducer.permissionActionsList;
  const { data: notificationMediumDetails, status: notificationMediumDetailsStatus } =
    state?.secretsReducer?.policyView?.notificationMedium;
  const { data: channelList, status: channelListStatus } =
    state?.secretsReducer?.addPolicyReducer?.channelList;
  const { loading: nodeSecretMetadataLoading } = state?.secretsReducer?.nodeSecretMetadata;
  const { data: policyViewJSONData, status: policyViewJSONStatus } =
    state.secretsReducer.policyView.policyViewJSONReducer;

  return {
    usersData: usersData?.result || [],
    usersDataStatus,
    groupsData: groupsData?.result || [],
    groupsDataStatus,
    serviceIdentitiesData: serviceIdentitiesData?.result || [],
    serviceIdentitiesDataStatus,
    tokensData: tokensData?.result || [],
    tokensDataStatus,
    consumersList: consumersList.result || [],
    permissionActionsList: permissionActionsList.result || [],
    permissionActionsListStatus,
    editPolicyErrors,
    editPolicyStatus,
    loadedPolicy,
    loadedPolicyStatus,
    notificationMediumDetails,
    notificationMediumDetailsStatus,
    channelList,
    channelListStatus,
    nodeSecretMetadataLoading,
    policyViewJSONData,
    policyViewJSONStatus,
    nodeSecretMetadataState: state.secretsReducer.nodeSecretMetadata,
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
    fetchConsumersList: () => dispatch({ type: EditConsumerListType.EDIT_CONSUMER_LIST_REQUEST }),
    fetchPermissionActions: (consumer) =>
      dispatch({
        type: EditPermissionActionsType.EDIT_PERMISSION_ACTIONS_REQUEST,
        payload: { consumer },
      }),
    updatePolicy: (data, history, resource,  entity) => {
      dispatch({
        type: EditPolicyType.EDIT_POLICY_REQUEST,
        payload: { data, history, resource, entity },
      });
    },
    loadPolicy: (id, history, resourcePath) => {
      dispatch({
        type: LoadPolicyDataType.EDIT_LOAD_POLICY_REQUEST,
        payload: { id, history, resourcePath },
      });
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getPolicyByName: (policyName, history) =>
      dispatch(getPolicyByNameRequest({ policyName, history })),
    getPolicyByNameReset: () => dispatch(getPolicyByNameReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPolicy);
