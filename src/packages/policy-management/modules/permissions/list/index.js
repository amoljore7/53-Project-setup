import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { openNotification } from '../../../../../components/notification/action';
import { PermissionsListingTypes, DeletePermissionsTypes } from './constants';
import PermissionsListing from './PermissionListing';
import { requestApplicationList } from '../add/action';

const mapStateToProps = (state) => {
  const {
    data: tableList,
    status: tableStatus,
    error: tableError,
    searchTerm: tableSearchTerm,
  } = state.permissionsReducer.permissionsTableList;
  const {
    data: deletePermissionData,
    status: deletePermissionStatus,
    error: deletePermissionError,
  } = state.permissionsReducer.deletePermissions;
  const { result: policyEvalData } = state?.batchEvalReducer;
  const { data: applicationsListData } = state?.permissionsReducer?.permissionApplicationsList;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;

  return {
    tableList,
    tableStatus,
    tableError,
    tableSearchTerm,
    deletePermissionData,
    deletePermissionStatus,
    deletePermissionError,
    policyEvalData,
    applicationsListData,
    consumerList: consumerList?.result || [],
    consumerListStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    getPermissionsTableList: () =>
      dispatch({
        type: PermissionsListingTypes.PERMISSIONS_LISTING_REQUEST,
      }),
    deletePermission: (ID, history) => {
      const payload = { ID, history };
      dispatch({
        type: DeletePermissionsTypes.PERMISSIONS_DELETE_REQUEST,
        payload,
      });
    },
    updatePermissionListSearchTerm: (search) => {
      dispatch({
        type: PermissionsListingTypes.PERMISSIONS_LISTING_SEARCH_TERM_UPDATE,
        payload: search,
      });
    },
    getPermissionsTableLoadMoreList: () =>
      dispatch({
        type: PermissionsListingTypes.PERMISSIONS_LISTING_LOAD_MORE_REQUEST,
      }),
    getApplicationsList: () => dispatch(requestApplicationList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsListing);
