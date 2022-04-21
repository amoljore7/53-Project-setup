import { connect } from 'react-redux';
import { RolesListDataConstants } from './constants';
import RolesList from './RolesList';
import { HeaderConstants } from '../../../../../components/page-header/constants';

const mapStateToProps = (state) => {
  const { list: rolesListState } = state.rolesReducer;
  const { result: policyEvalData } = state?.batchEvalReducer;
  return {
    rolesListState,

    policyEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRoleRequest: (id) =>
      dispatch({
        type: RolesListDataConstants.ROLE_DELETE_REQUEST_INIT,
        payload: { id },
      }),
    getRolesListData: () =>
      dispatch({
        type: RolesListDataConstants.ROLES_LIST_DATA_REQUEST,
      }),
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    updateRoleListSearchTerm: (search) => {
      dispatch({
        type: RolesListDataConstants.ROLE_LIST_SEARCH_TERM_UPDATE,
        payload: search,
      });
    },
    getRolesListLoadMoreData: () =>
      dispatch({
        type: RolesListDataConstants.ROLES_LIST_LOAD_MORE_DATA_REQUEST,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
