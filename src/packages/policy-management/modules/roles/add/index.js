import { connect } from 'react-redux';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { smConsumer } from '../../../../../utils/common-constants';
import { requestApplicationList } from '../../permissions/add/action';
import { addRoleRequest, addRoleReset, recursivePermissionListRequest } from './actions';
import AddRole from './AddRole';
import { GetActionTypes, GetPermissionDataTypes } from './constants';

const mapStateToProps = (state) => {
  const { data: consumerList, status: consumerListStatus } = state.consumerReducer;
  const { status: actionStatus, data: actionList } = state?.rolesReducer?.actionData;
  const { status: permissionListStatus, data: permissionList } =
    state?.rolesReducer?.permissionList;
  const { status: permissionDataStatus, data: permissionData } =
    state?.rolesReducer?.permissionData;
  const { error: addRoleError } = state?.rolesReducer?.addRoleData;
  const { status: applicationsListStatus, data: applicationsListData } =
    state?.permissionsReducer?.permissionApplicationsList;
  const { flags: featureFlags } = state?.featureFlags;
  return {
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
    addRoleError,
    applicationsListData,
    applicationsListStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    postRoleData: (roleData, history) => dispatch(addRoleRequest({ roleData, history })),
    getConsumerData: () => dispatch(consumerListRequest()),
    getActionData: (consumerName) =>
      dispatch({
        type: GetActionTypes.GET_ACTION_REQUEST,
        payload: {
          consumerName,
        },
      }),
    getApplicationsList: () => dispatch(requestApplicationList()),
    getAllPermissionsData: () => dispatch(recursivePermissionListRequest()),
    getPermissionData: (permissionId) =>
      dispatch({
        type: GetPermissionDataTypes.GET_PERMISSION_DATA_REQUEST,
        payload: {
          permissionId,
        },
      }),
    openNotification: (type, title, duration) =>
      dispatch(openNotification(type, title, true, duration)),
    resetRoleData: () => dispatch(addRoleReset()),
    resetPermissionData: () =>
      dispatch({
        type: GetPermissionDataTypes.GET_PERMISSION_DATA_RESET,
      }),
    resetActionData: () =>
      dispatch({
        type: GetActionTypes.GET_ACTION_RESET,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);
