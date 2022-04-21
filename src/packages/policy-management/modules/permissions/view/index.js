import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { openNotification } from '../../../../../components/notification/action';
import { GetViewPermissionsTypes } from './constants';
import { DeletePermissionsTypes } from '../list/constants';
import ViewPermission from './ViewPermission';
import { requestApplicationList } from '../add/action';

const mapStateToProps = (state) => {
  const {
    data: viewPermissionData,
    status: viewPermissionStatus,
    error: viewPermissionFormError,
  } = state.permissionsReducer.viewPermissions;
  const {
    data: applicationsListData,
    status: applicationsListStatus,
    error: applicationsListError,
  } = state.permissionsReducer.permissionApplicationsList;
  const { status: deletePermissionStatus } = state.permissionsReducer.deletePermissions;
  const { result: policyEvalData } = state?.batchEvalReducer;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  return {
    viewPermissionData,
    viewPermissionStatus,
    viewPermissionFormError,

    applicationsListData,
    applicationsListStatus,
    applicationsListError,

    deletePermissionStatus,

    policyEvalData,
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
    getViewPermissions: (ID, history) => {
      const payload = { ID, history };
      dispatch({ type: GetViewPermissionsTypes.PERMISSIONS_VIEW_REQUEST, payload });
    },
    getApplicationsList: () => dispatch(requestApplicationList()),
    deletePermission: (ID, history) => {
      const payload = { ID, history };
      dispatch({
        type: DeletePermissionsTypes.PERMISSIONS_DELETE_REQUEST,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPermission);
