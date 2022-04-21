import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import EditRole from './EditRole';
import { GetActionTypes, GetPermissionDataTypes } from '../add/constants';
import { requestApplicationList } from '../../permissions/add/action';
import { viewRoleByIdRequest, viewRoleByIdReset } from '../view/actions';
import { editRoleRequest, editRoleReset } from './actions';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';
import { smConsumer } from '../../../../../utils/common-constants';
import { recursivePermissionListRequest } from '../add/actions';

const mapStateToProps = (state) => {
  const { status: roleDataStatus, data: roleData } = state?.rolesReducer?.view;
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  const { status: actionStatus, data: actionList } = state?.rolesReducer?.actionData;
  const { status: permissionListStatus, data: permissionList } =
    state?.rolesReducer?.permissionList;
  const { status: permissionDataStatus, data: permissionData } =
    state?.rolesReducer?.permissionData;
  const { status: editRoleStatus, error: editRoleError } = state?.rolesReducer?.edit;
  const { status: applicationsListStatus, data: applicationsListData } =
    state?.permissionsReducer?.permissionApplicationsList;
  const { flags: featureFlags } = state?.featureFlags;

  return {
    roleDataStatus,
    roleData,
    consumerList: !featureFlags[secretManagerFlag]
      ? { result: consumerList?.result?.filter((consumer) => consumer.name !== smConsumer) || [] }
      : consumerList,
    consumerListStatus,
    actionStatus,
    actionList,
    permissionListStatus,
    permissionList,
    permissionDataStatus,
    permissionData,
    editRoleStatus,
    editRoleError,
    applicationsListStatus,
    applicationsListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getRoleById: (roleId, history) => {
      dispatch(viewRoleByIdReset());
      dispatch(viewRoleByIdRequest({ roleId, history }));
    },
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    getConsumerData: () => dispatch(consumerListRequest()),
    getActionData: (consumerName) =>
      dispatch({
        type: GetActionTypes.GET_ACTION_REQUEST,
        payload: {
          consumerName,
        },
      }),
    getAllPermissionsData: () => dispatch(recursivePermissionListRequest()),
    getPermissionData: (permissionId) =>
      dispatch({
        type: GetPermissionDataTypes.GET_PERMISSION_DATA_REQUEST,
        payload: {
          permissionId,
        },
      }),
    resetPermissionData: () =>
      dispatch({
        type: GetPermissionDataTypes.GET_PERMISSION_DATA_RESET,
      }),
    resetActionData: () =>
      dispatch({
        type: GetActionTypes.GET_ACTION_RESET,
      }),
    resetEditRoleData: () => dispatch(editRoleReset()),
    editRoleData: (id, roleData, history) => dispatch(editRoleRequest({ id, roleData, history })),
    getApplicationsList: () => dispatch(requestApplicationList()),
    initSpinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
