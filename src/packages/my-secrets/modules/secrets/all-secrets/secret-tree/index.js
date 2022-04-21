import { connect } from 'react-redux';
import SecretTree from './SecretTree';
import { requestGetImmediateNodes } from './action';

const mapStateToProps = (state, ownProps) => {
  const { name: vaultName } = state?.vaultLanding?.data;
  const {
    result: immediateNodes,
  } = state?.userSecretsReducer?.allSecretsReducer?.getImmediateNodes;

  return {
    vaultName: vaultName,
    immediateNodes: immediateNodes,
    parentsOfSelectedItem: ownProps.parentsOfSelectedItem,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectionHandler: ownProps.selectionHandler,
    getImmediateNodes: (parents) => dispatch(requestGetImmediateNodes(parents)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretTree);
