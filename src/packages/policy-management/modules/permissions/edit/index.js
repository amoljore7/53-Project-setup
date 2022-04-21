import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { openNotification } from '../../../../../components/notification/action';
import { PermissionsActionsListTypes } from '../add/constants';
import { GetViewPermissionsTypes } from '../view/constants';
import { EditPermissionsTypes } from './constants';
import EditPermission from './EditPermission';
import { requestApplicationList } from '../add/action';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';
import { smConsumer } from '../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const {
    data: viewPermissionData,
    status: viewPermissionStatus,
    error: viewPermissionFormError,
  } = state.permissionsReducer.viewPermissions;
  const {
    data: consumerList,
    status: consumerListStatus,
    error: consumerListError,
  } = state.consumerReducer;
  const {
    data: actionListData,
    status: actionListStatus,
    error: actionListError,
  } = state.permissionsReducer.permissionActionsList;

  const {
    data: editPermissionData,
    status: editPermissionStatus,
    error: editPermissionFormError,
  } = state.permissionsReducer.editPermission;

  const {
    data: applicationsListData,
    status: applicationsListStatus,
    error: applicationsListError,
  } = state.permissionsReducer.permissionApplicationsList;

  const { flags: featureFlags } = state.featureFlags;

  return {
    viewPermissionData,
    viewPermissionStatus,
    viewPermissionFormError,

    consumerList: !featureFlags[secretManagerFlag]
      ? { result: consumerList?.result?.filter((consumer) => consumer.name !== smConsumer) || [] }
      : consumerList?.result || [],
    consumerListStatus,
    consumerListError,

    actionListData,
    actionListStatus,
    actionListError,

    applicationsListData,
    applicationsListStatus,
    applicationsListError,

    editPermissionData,
    editPermissionStatus,
    editPermissionFormError,
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
    openNotification: ({ type, title, duration }) =>
      dispatch(openNotification(type, title, true, duration)),
    getViewPermissions: (ID, history) => {
      const payload = { ID, history };
      dispatch({ type: GetViewPermissionsTypes.PERMISSIONS_VIEW_REQUEST, payload });
    },
    getConsumerList: () => dispatch(consumerListRequest()),
    getActionsList: (consumerName) =>
      dispatch({
        type: PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_REQUEST,
        payload: consumerName,
      }),
    getApplicationsList: () => dispatch(requestApplicationList()),
    flushEditPermissions: () =>
      dispatch({ type: EditPermissionsTypes.PERMISSIONS_EDIT_FLUSH_DATA }),
    editPermissionsAction: (formData, id, history) => {
      const payload = {
        formData,
        id,
        history,
      };
      dispatch({ type: EditPermissionsTypes.PERMISSIONS_EDIT_REQUEST, payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPermission);
