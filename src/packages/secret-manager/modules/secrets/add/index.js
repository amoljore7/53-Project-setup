import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { createSecretAction, resetCreateSecretAction } from './actions';
import AddSecret from './AddSecret';

const mapStateToProps = (state) => {
  const { result: staticSecretTemplateList, status: staticSecretTemplateListStatus } =
    state?.staticSecretTemplateReducer?.list;
  const { data: secretTemplateDetails, status: secretTemplateDetailsStatus } =
    state?.staticSecretTemplateReducer?.view;
  const { id: vaultId } = state?.vaultLanding?.data;
  const { newSecretError } = state?.secretsReducer?.updateTreeData;
  return {
    newSecretError,
    staticSecretTemplateList,
    staticSecretTemplateListStatus,
    secretTemplateDetailsStatus,
    secretTemplateDetails,
    vaultId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    createSecret: (payloadBody, parents, history) => {
      dispatch(createSecretAction(payloadBody, parents, history));
    },
    resetSecretData: () => {
      dispatch(resetCreateSecretAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSecret);
