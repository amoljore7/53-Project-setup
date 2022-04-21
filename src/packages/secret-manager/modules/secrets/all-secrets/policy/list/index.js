import { connect } from 'react-redux';
import { isLoading } from '../../../../../../../utils/common-utils';
import {
  requestPolicyList,
  requestPolicyListLoadMore,
  updatePolicyListSearchTerm,
  requestPolicyToggle,
  requestPolicyDelete,
} from './action';
import PolicyList from './PolicyList';

const mapStateToProps = (state, ownProps) => {
  const { loading, pagination, result, searchTerm } = state.secretsReducer.policyListReducer.list;
  const { loading: togglePolicyLoading } = state.secretsReducer.policyListReducer.toggle;
  const { loading: deletePolicyLoading } = state.secretsReducer.policyListReducer.delete;
  const { loading: nodeSecretMetadataLoading } = state.secretsReducer.nodeSecretMetadata;
  const { status: batchEvalStatus, result: batchEvalData } = state.batchEvalReducer;

  const policyListState = {
    loading:
      loading ||
      togglePolicyLoading ||
      deletePolicyLoading ||
      nodeSecretMetadataLoading ||
      isLoading(batchEvalStatus),
    pagination,
    result,
    searchTerm,
  };
  const { name: vaultName } = state.vaultLanding.data;
  return {
    batchEvalData,
    policyListState,
    deletePolicyLoading,
    togglePolicyLoading: loading,
    selectedItemAncestors: ownProps.selectedItemAncestors,
    nodeSecretMetadataState: state.secretsReducer.nodeSecretMetadata,
    vaultName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyListData: (parents) => dispatch(requestPolicyList(parents)),
    updatePolicyListSearchTerm: (search) => {
      dispatch(updatePolicyListSearchTerm(search));
    },
    getPolicyListLoadMoreData: (parents) => dispatch(requestPolicyListLoadMore(parents)),
    togglePolicyRequest: (togglePayload) => dispatch(requestPolicyToggle(togglePayload)),
    deletePolicyRequest: ({ id, resource, listPolicyPath }) => {
      dispatch(requestPolicyDelete({ id, resource, listPolicyPath }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList);
