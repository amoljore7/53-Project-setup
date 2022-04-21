import { connect } from 'react-redux';
import AddPasswordPolicy from './AddPasswordPolicy';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { requestAddPasswordPolicy, resetAddPasswordPolicy } from './action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { openNotification } from '../../../../../components/notification/action';

const mapStateToProps = (state) => {
  const { status: addPasswordPolicyStatus, error: addPasswordPolicyError } =
    state.passwordPolicyReducer.add;
  return {
    addPasswordPolicyStatus,
    addPasswordPolicyError,
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
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPasswordPolicy);
