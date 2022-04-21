import { connect } from 'react-redux';
import { openNotification } from '../../../../../../../components/notification/action';
import AdminSecretPolicyView from './AdminSecretPolicyView';
import {
  getPolicyByNameRequest,
  getPolicyByNameReset,
  requestApplicationList,
  requestPolicyDelete,
  requestPolicyView,
  requestPolicyViewToggle,
  resetPolicyView,
} from './action';
import { setPageHeaderAction } from '../../../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../../../components/spinner-overlay/action';

const mapStateToProps = (state) => {
  const { loading: policyViewLoading, data: policyViewData } =
    state.secretsReducer.policyView.policyViewReducer;
  const { membersReducer } = state;
  const { loading: policyToggleLoading } = state.secretsReducer.policyView.policyToggleReducer;
  const { data: fetchedUsers, status: fetchedUsersStatus } = membersReducer.users;
  const { data: fetchedGroups, status: fetchedGroupsStatus } = membersReducer.groups;
  const { data: fetchedServiceIdentities, status: fetchedServiceIdentitiesStatus } =
    membersReducer.serviceIdentities;
  const { data: fetchedTokens, status: fetchedTokensStatus } = membersReducer.tokens;
  const {
    result: selectedNodeMetadata,
    loading: selectedNodeMetadataLoading,
    error: selectedNodeMetadataError,
  } = state.secretsReducer.nodeSecretMetadata;
  const { data: applicationsListData } =
    state.secretsReducer.policyView?.permissionApplicationsList;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  const { data: policyViewJSONData, status: policyViewJSONStatus } =
    state.secretsReducer.policyView.policyViewJSONReducer;
  return {
    policyViewLoading,
    policyViewData,
    policyToggleLoading,
    fetchedUsers,
    fetchedUsersStatus,
    fetchedGroups,
    fetchedGroupsStatus,
    fetchedServiceIdentities,
    fetchedServiceIdentitiesStatus,
    fetchedTokens,
    fetchedTokensStatus,
    selectedNodeMetadata,
    selectedNodeMetadataLoading,
    selectedNodeMetadataError,
    applicationsListData,
    consumerList: consumerList?.result || [],
    consumerListStatus,
    policyViewJSONData,
    policyViewJSONStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyById: (policyId, history, resourcePath) => {
      const payload = { policyId, history, resourcePath };
      dispatch(requestPolicyView(payload));
    },
    deletePolicyRequest: ({ id, resource, history }) =>
      dispatch(requestPolicyDelete({ id, resource, history })),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    resetPolicyView: () => dispatch(resetPolicyView()),
    togglePolicyRequest: (payload) => dispatch(requestPolicyViewToggle(payload)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getApplicationsList: () => dispatch(requestApplicationList()),
    getPolicyByName: (policyName, history) =>
      dispatch(getPolicyByNameRequest({ policyName, history })),
    getPolicyByNameReset: () => dispatch(getPolicyByNameReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSecretPolicyView);
