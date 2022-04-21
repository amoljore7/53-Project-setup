import { connect } from 'react-redux';
import EditSecret from './EditSecret';
import { updateSecretAction, resetEditSecretAction } from './actions';
import { getSecretDetailsAction } from '../all-secrets/secret-view/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';

const mapStateToProps = (state) => {
  const { id: vaultId } = state?.vaultLanding?.data;
  const { editSecretError, editSecretStatus } = state?.secretsReducer?.updateTreeData;
  const { data: secretTemplateDetails, status: secretTemplateDetailsStatus } =
    state.secretsReducer.secretTemplateDetails;
  const { data: secretDetails } = state.secretsReducer.secretDetails;

  return {
    secretTemplateDetails,
    secretTemplateDetailsStatus,
    secretDetails,
    editSecretError,
    editSecretStatus,
    vaultId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getSecretDetails: (parents) => dispatch(getSecretDetailsAction(parents)),
    updateSecret: (payloadBody, parents, history) => {
      dispatch(updateSecretAction(payloadBody, parents, history));
    },
    resetEditSecret: () => dispatch(resetEditSecretAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSecret);
