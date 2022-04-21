import { connect } from 'react-redux';
import PasswordPoliciesList from './PasswordPoliciesList';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import {
  requestPasswordPolicyDelete,
  requestPasswordPolicyList,
  requestPasswordPolicyListLoadMore,
  resetPasswordPolicyDelete,
  updatePasswordPolicyListSearchTerm,
} from './action';

const mapStateToProps = (state) => {
  const {
    status: passwordPolicyStatus,
    result: passwordPolicyData,
    pagination: passwordPolicyPagination,
    searchTerm: passwordPolicySearchTerm,
  } = state.passwordPolicyReducer.list;
  const { status: deletePasswordPolicyStatus } = state.passwordPolicyReducer.delete;
  const { result: smEvalData } = state?.batchEvalReducer;

  return {
    passwordPolicyStatus,
    passwordPolicyData,
    passwordPolicyPagination,
    deletePasswordPolicyStatus,
    passwordPolicySearchTerm,
    smEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getPasswordPolicyList: () => dispatch(requestPasswordPolicyList()),
    deletePasswordPolicy: (id) => dispatch(requestPasswordPolicyDelete(id)),
    resetDeletePasswordPolicy: () => dispatch(resetPasswordPolicyDelete()),
    getPasswordPolicyListLoadMore: () => dispatch(requestPasswordPolicyListLoadMore()),
    updatePasswordPolicyListSearchTerm: (search) =>
      dispatch(updatePasswordPolicyListSearchTerm(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPoliciesList);
