import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { PolicyViewDataTypes, PolicyDeleteDataTypes } from './constants';
import { openNotification } from '../../../../../components/notification/action';
import PolicyView from './PolicyView';
import { requestApplicationList } from '../../permissions/add/action';
import {
  getPolicyByIdRequest,
  getPolicyByIdReset,
  getPolicyByNameRequest,
  getPolicyByNameReset,
} from './actions';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';

const mapStateToProps = (state) => {
  const { loading: policyViewLoading, data: policyViewData } =
    state?.policyReducer?.view?.policyViewReducer;
  const { membersReducer } = state;
  const { loading: policyDeleteLoading } = state?.policyReducer?.view?.policyDeleteReducer;
  const { loading: policyToggleLoading } = state?.policyReducer?.view?.policyToggleReducer;
  const { data: fetchedUsers, status: fetchedUsersStatus } = membersReducer.users;
  const { data: fetchedGroups, status: fetchedGroupsStatus } = membersReducer.groups;
  const { data: fetchedServiceIdentities, status: fetchedServiceIdentitiesStatus } =
    membersReducer.serviceIdentities;
  const { data: fetchedTokens, status: fetchedTokensStatus } = membersReducer.tokens;
  const { result: policyEvalData } = state?.batchEvalReducer;
  const { data: applicationsListData } = state?.permissionsReducer?.permissionApplicationsList;
  const { loading: policyViewJSONLoading, data: policyViewJSONData } =
    state?.policyReducer?.view?.policyViewJSONReducer;
  state?.permissionsReducer?.permissionApplicationsList;
  const { flags: featureFlags } = state.featureFlags;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  return {
    policyViewLoading,
    policyViewData,
    policyDeleteLoading,
    policyToggleLoading,
    fetchedUsers,
    fetchedUsersStatus,
    fetchedGroups,
    fetchedGroupsStatus,
    fetchedServiceIdentities,
    fetchedServiceIdentitiesStatus,
    fetchedTokens,
    fetchedTokensStatus,
    featureFlags,
    policyEvalData,
    applicationsListData,
    policyViewJSONLoading,
    policyViewJSONData,
    consumerList: consumerList?.result || [],
    consumerListStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyById: (policyId, history) => {
      const payload = { policyId, history };
      dispatch(getPolicyByIdRequest(payload));
    },
    deletePolicyById: (policyId, history) => {
      const payload = { policyId, history };
      dispatch({
        type: PolicyDeleteDataTypes.POLICY_DELETE_DATA_REQUEST,
        payload: payload,
      });
    },
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    resetPolicyView: () => {
      dispatch({
        type: PolicyViewDataTypes.POLICY_VIEW_DATA_RESET,
        payload: {},
      });
    },
    togglePolicyRequest: (payload) => {
      dispatch({
        type: PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_INIT,
        payload,
      });
    },
    getApplicationsList: () => dispatch(requestApplicationList()),
    getPolicyByName: (policyName, history) => {
      const payload = { policyName, history };
      dispatch(getPolicyByNameRequest(payload));
    },
    getPolicyByIdReset: () => dispatch(getPolicyByIdReset()),
    getPolicyByNameReset: () => dispatch(getPolicyByNameReset()),
    initSpinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyView);
