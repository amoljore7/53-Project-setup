import { connect } from 'react-redux';
import PasswordPolicyView from './PasswordPolicyView';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestViewPasswordPolicy, resetViewPasswordPolicy } from './action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { requestPasswordPolicyDelete } from '../list/action';
const mapStateToProps = (state) => {
  const { loading: passwordPolicyLoading, data: passwordPolicyData } =
    state.passwordPolicyReducer.view;
  const { status: deletePasswordPolicyLoading } = state.passwordPolicyReducer.delete;
  const { result: smEvalData } = state?.batchEvalReducer;

  return {
    passwordPolicyLoading,
    passwordPolicyData,
    deletePasswordPolicyLoading,
    smEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),

    fetchPasswordPolicyData: (passwordPolicyId, history) => {
      const payload = { passwordPolicyId, history };
      dispatch(requestViewPasswordPolicy(payload));
    },

    deletePasswordPolicyById: (id) => dispatch(requestPasswordPolicyDelete(id)),
    resetPasswordPolicyView: () => {
      dispatch(resetViewPasswordPolicy());
    },

    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPolicyView);
