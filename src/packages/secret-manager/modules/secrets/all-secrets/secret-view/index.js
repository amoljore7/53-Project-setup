import { connect } from 'react-redux';
import SecretView from './SecretView';
import { getSecretDetailsAction } from './action';
import { deleteEntityAction } from '../secret-tree/action';
import { openNotification } from '../../../../../../components/notification/action';

const mapStateToProps = (state, ownProps) => {
  const { id: vaultId } = state?.vaultLanding?.data;
  const {
    data: secretDetails,
    error: secretDetailsError,
    status: secretDetailsStatus,
    selectedSecretMetadata,
  } = state.secretsReducer.secretDetails;
  const {
    data: secretTemplateDetails,
    error: secretTemplateDetailsError,
    status: secretTemplateDetailsStatus,
  } = state.secretsReducer.secretTemplateDetails;

  return {
    vaultId,
    secretDetails,
    secretTemplateDetails,
    secretTemplateDetailsError,
    secretTemplateDetailsStatus,
    secretDetailsError,
    secretDetailsStatus,
    selectedSecretMetadata,
    selectedItemAncestors: ownProps.selectedItemAncestors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    getSecretDetails: (parents) => dispatch(getSecretDetailsAction(parents)),
    deleteSecret: (entity, parents) => dispatch(deleteEntityAction(entity, parents)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretView);
