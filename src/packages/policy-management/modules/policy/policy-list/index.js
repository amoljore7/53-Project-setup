import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { PolicyListDataTypes } from './constants';
import PolicyList from './PolicyList';

const mapStateToProps = (state) => {
  const { list: policyListState } = state?.policyReducer;
  const { result: policyEvalData } = state?.batchEvalReducer;
  return {
    policyListState,
    policyEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePolicyRequest: (id) => {
      dispatch({
        type: PolicyListDataTypes.POLICY_DELETE_REQUEST_INIT,
        payload: { id },
      });
    },
    getPolicyListData: () =>
      dispatch({
        type: PolicyListDataTypes.POLICY_LIST_DATA_REQUEST,
      }),
    togglePolicyRequest: (payload) => {
      dispatch({
        type: PolicyListDataTypes.POLICY_TOGGLE_REQUEST_INIT,
        payload,
      });
    },
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    updatePolicyListSearchTerm: (search) => {
      dispatch({
        type: PolicyListDataTypes.POLICY_LIST_SEARCH_TERM_UPDATE,
        payload: search,
      });
    },
    getPolicyListLoadMoreData: () =>
      dispatch({
        type: PolicyListDataTypes.POLICY_LIST_LOAD_MORE_DATA_REQUEST,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList);
