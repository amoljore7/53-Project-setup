import { connect } from 'react-redux';
import SecretsList from './SecretList';
import { requestSecretList, requestSecretListLoadMore, updateSecretListSearchTerm } from './action';
import { deleteEntityAction } from '../secret-tree/action';
import {
  getSecretDetailsAction,
  resetSecretDetails,
  resetSecretTemplateDetails,
} from '../secret-view/action';
import { initSpinnerOverlay } from '../../../../../../components/spinner-overlay/action';
import { openNotification } from '../../../../../../components/notification/action';

const mapStateToProps = (state, ownProps) => {
  const {
    result: secretListData,
    pagination: secretListPagination,
    loading: secretListLoading,
    searchTerm: secretSearchTerm,
    selectedNodeMetadata,
  } = state.secretsReducer.secretList;
  const { id: vaultId } = state.vaultLanding.data;
  const { status: getUsersStatus, data: usersData } = state.secretsReducer.userDetails;
  const {
    status: secretDetailsStatus,
    error: secretDetailsError,
  } = state.secretsReducer.secretDetails;
  const { status: getGroupsStatus, data: groupsData } = state.secretsReducer.groupsDetails;
  const {
    error: secretTemplateDetailsError,
    status: secretTemplateDetailsStatus,
  } = state.secretsReducer.secretTemplateDetails;
  const { selectedItemParents } = state.secretsReducer.updateTreeData;
  return {
    vaultId,
    secretListLoading,
    secretListData,
    secretListPagination,
    selectedItemAncestorsArray: ownProps.selectedItemAncestors,
    selectedItemParents,
    secretSearchTerm,
    selectedNodeMetadata,
    selectionHandler: ownProps.selectionHandler,
    getUsersStatus,
    usersData,
    secretDetailsError,
    secretTemplateDetailsError,
    secretDetailsStatus,
    getGroupsStatus,
    groupsData,
    secretTemplateDetailsStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSecretList: (parents) => dispatch(requestSecretList(parents)),
    deleteSecret: (entity, parents) => dispatch(deleteEntityAction(entity, parents)),
    getSecretLoadMoreList: (parents) => dispatch(requestSecretListLoadMore(parents)),
    updateSecretListSearchTerm: (search) => dispatch(updateSecretListSearchTerm(search)),
    secretDetails: (parents, data) => dispatch(getSecretDetailsAction(parents, data)),
    initSpinnerOverlay: (data) => dispatch(initSpinnerOverlay(data)),
    resetSecretDetails: () => dispatch(resetSecretDetails()),
    resetSecretTemplateDetails: () => dispatch(resetSecretTemplateDetails()),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretsList);
