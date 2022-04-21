import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { requestAddPasswordPolicy, resetAddPasswordPolicy } from '../add/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestViewPasswordPolicy } from '../view/action';
import ClonePasswordPolicy from './ClonePasswordPolicy';
import { openNotification } from '../../../../../components/notification/action';

const mapStateToProps = (state) => {
  const { status: addPasswordPolicyStatus, error: addPasswordPolicyError } =
    state.passwordPolicyReducer.add;
  const { loading: passwordPolicyLoading, data: passwordPolicyData } =
    state.passwordPolicyReducer.view;
  return {
    addPasswordPolicyStatus,
    addPasswordPolicyError,
    passwordPolicyLoading,
    passwordPolicyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    postPasswordPolicyData: (passwordPolicyData, history) =>
      dispatch(requestAddPasswordPolicy(passwordPolicyData, history)),
    resetPasswordPolicyData: () => dispatch(resetAddPasswordPolicy()),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getPasswordPolicyData: (passwordPolicyId, history) => {
      const payload = { passwordPolicyId, history };
      dispatch(requestViewPasswordPolicy(payload));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClonePasswordPolicy);
