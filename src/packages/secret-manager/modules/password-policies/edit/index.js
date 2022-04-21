import { connect } from 'react-redux';
import EditPasswordPolicy from './EditPasswordPolicy';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestViewPasswordPolicy } from '../view/action';
import { openNotification } from '../../../../../components/notification/action';
import { requestEditPasswordPolicy, resetEditPasswordPolicy } from './action';

const mapStateToProps = (state) => {
  const { loading: passwordPolicyDataLoading, data: passwordPolicyData } =
    state.passwordPolicyReducer.view;
  const { status: editPasswordPolicyStatus, error: editPasswordPolicyError } =
    state.passwordPolicyReducer.edit;

  return {
    passwordPolicyDataLoading,
    passwordPolicyData,
    editPasswordPolicyStatus,
    editPasswordPolicyError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    getPasswordPolicyById: (passwordPolicyId, history) => {
      const payload = { passwordPolicyId, history };
      dispatch(requestViewPasswordPolicy(payload));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    editPasswordPolicyData: (id, passwordPolicyData, history) =>
      dispatch(requestEditPasswordPolicy(id, passwordPolicyData, history)),
    resetEditPasswordPolicyData: () => dispatch(resetEditPasswordPolicy()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPasswordPolicy);
