import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { requestApplicationList } from '../../permissions/add/action';
import { deleteRoleRequest, viewRoleByIdRequest, viewRoleByIdReset } from './actions';
import RolesView from './RolesView';
const mapStateToProps = (state) => {
  const { status: roleViewStatus, data: roleViewData } = state?.rolesReducer?.view;
  const { loading: roleDeleteData } = state?.rolesReducer?.delete;
  const { result: policyEvalData } = state?.batchEvalReducer;
  const { data: applicationsListData } = state?.permissionsReducer?.permissionApplicationsList;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  return {
    roleViewStatus,
    roleViewData,
    roleDeleteData,
    policyEvalData,
    applicationsListData,
    consumerList: consumerList?.result || [],
    consumerListStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleById: (roleId, history) => {
      dispatch(viewRoleByIdReset());
      dispatch(viewRoleByIdRequest({ roleId, history }));
    },
    deleteRoleById: (roleId, history) => dispatch(deleteRoleRequest({ roleId, history })),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getApplicationsList: () => dispatch(requestApplicationList()),
    initSpinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    resetRoleById: () => dispatch(viewRoleByIdReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesView);
