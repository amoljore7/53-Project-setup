import { connect } from 'react-redux';
import StaticSecretTemplateView from './StaticSecretTemplateView';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestStaticSecretTemplateById, resetStaticSecretTemplateView } from './action';
import { requestStaticSecretTemplateDelete } from '../list/action';
import { requestPwdPolicyList } from '../add/action';

const mapStateToProps = (state) => {
  const { status: secretViewStatus, data: secretViewData } =
    state?.staticSecretTemplateReducer?.view;
  const { status: deleteSecretStatus } = state.staticSecretTemplateReducer.delete;
  const { result: pwdPoliciesList } = state.staticSecretTemplateReducer.policiesList;
  const { result: smEvalData } = state?.batchEvalReducer;
  return {
    secretViewStatus,
    secretViewData,
    deleteSecretStatus,
    pwdPoliciesList,
    smEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSecretById: (roleId, history) => dispatch(requestStaticSecretTemplateById(roleId, history)),
    deleteStaticSecretById: (id, history) =>
      dispatch(requestStaticSecretTemplateDelete(id, history)),
    resetSecretData: () => dispatch(resetStaticSecretTemplateView()),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    spinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    getPwdPoliciesList: () => dispatch(requestPwdPolicyList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticSecretTemplateView);
