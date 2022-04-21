import { connect } from 'react-redux';
import { openNotification } from '../../../../../../components/notification/action';
import {
  requestSecretDetails,
  requestSecretList,
  requestSecretListLoadMore,
  resetSecretDetails,
  updateSecretListSearchTerm,
} from './action';
import MySecretList from './MySecretList';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';

const mapStateToProps = (state, ownProps) => {
  const {
    result: secretListData,
    pagination: secretListPagination,
    loading: secretListLoading,
    searchTerm: secretSearchTerm,
  } = state.userSecretsReducer.allSecretsReducer.secretList;
  const { id: vaultId } = state.vaultLanding.data;
  const {
    status: secretDetailStatus,
    data: secretDetailData,
    error: secretDetailError,
  } = state.userSecretsReducer.allSecretsReducer.secretDetails;
  const {
    status: secretTemplateDetailStatus,
    data: secretTemplateData,
    error: secretTemplateDetailError,
  } = state.userSecretsReducer.allSecretsReducer.secretTemplateDetails;
  return {
    secretListLoading,
    secretListData,
    secretListPagination,
    selectedItemAncestors: ownProps.selectedItemAncestors,
    vaultId,
    secretDetailStatus,
    secretDetailData,
    secretTemplateDetailStatus,
    secretTemplateDetailError,
    secretTemplateData,
    secretSearchTerm,
    secretDetailError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSecretList: (parents) => dispatch(requestSecretList(parents)),
    getSecretDetails: (path, data) => dispatch(requestSecretDetails(path, data)),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    getSecretLoadMoreList: (parents) => dispatch(requestSecretListLoadMore(parents)),
    updateSecretListSearchTerm: (search) => dispatch(updateSecretListSearchTerm(search)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    resetSecretDetails: () => dispatch(resetSecretDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MySecretList);
