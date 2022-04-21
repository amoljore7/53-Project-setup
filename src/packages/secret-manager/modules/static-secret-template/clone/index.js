import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import CloneStaticSecretTemplate from './CloneStaticSecretTemplate';
import {
  postRequestStaticSecretTemplate,
  requestPwdPolicyList,
  resetStaticSecretTemplate,
} from '../add/action';
import { requestStaticSecretTemplateById } from '../view/action';

const mapStateToProps = (state) => {
  const { result: pwdPoliciesList } = state.staticSecretTemplateReducer.policiesList;
  const { error: sstAddFormError, status: sstAddStatus } = state.staticSecretTemplateReducer.add;
  const { status: sstViewStatus, data: sstViewData } = state?.staticSecretTemplateReducer?.view;
  return {
    pwdPoliciesList,
    sstAddFormError,
    sstAddStatus,
    sstViewStatus,
    sstViewData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    spinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    sstGetById: (secretId, history) => dispatch(requestStaticSecretTemplateById(secretId, history)),
    sstPostData: (data, history) => dispatch(postRequestStaticSecretTemplate(data, history)),
    getPwdPoliciesList: () => dispatch(requestPwdPolicyList()),
    resetAddStaticSecretData: () => dispatch(resetStaticSecretTemplate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CloneStaticSecretTemplate);
