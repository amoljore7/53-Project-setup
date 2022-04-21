import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { editRequestStaticSecretTemplate, resetEditSecretTemplate } from './action';
import { requestPwdPolicyList } from '../add/action';
import { requestStaticSecretTemplateById } from '../view/action';
import EditStaticSecretTemplate from './EditStaticSecretTemplate';

const mapStateToProps = (state) => {
  const { result: pwdPoliciesList } = state.staticSecretTemplateReducer.policiesList;
  const { status: sstViewStatus, data: sstViewData } = state?.staticSecretTemplateReducer?.view;
  const { error: sstEditFormError, status: sstEditStatus } = state.staticSecretTemplateReducer.edit;
  return {
    pwdPoliciesList,
    sstEditFormError,
    sstEditStatus,
    sstViewStatus,
    sstViewData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sstGetById: (secretId, history) => dispatch(requestStaticSecretTemplateById(secretId, history)),
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    spinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    getPwdPoliciesList: () => dispatch(requestPwdPolicyList()),
    sstEditRequest: (data, id, history) =>
      dispatch(editRequestStaticSecretTemplate(data, id, history)),
    resetEditSecretTemplateData: () => dispatch(resetEditSecretTemplate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStaticSecretTemplate);
