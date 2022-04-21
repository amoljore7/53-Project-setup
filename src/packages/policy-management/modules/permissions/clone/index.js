import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { openNotification } from '../../../../../components/notification/action';
import { GetViewPermissionsTypes } from '../view/constants';
import { AddPermissionsTypes, PermissionsActionsListTypes } from '../add/constants';
import ClonePermission from './ClonePermission';
import { requestApplicationList } from '../add/action';
import { consumerListRequest } from '../../../../../components/policy/consumer/actions';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';
import { smConsumer } from '../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const {
    data: addPermissionData,
    status: addPermissionStatus,
    error: addPermissionFormError,
  } = state.permissionsReducer.addPermission;
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
    data: viewPermissionData,
    status: viewPermissionStatus,
    error: viewPermissionFormError,
  } = state.permissionsReducer.viewPermissions;
  const {
    data: applicationsListData,
    status: applicationsListStatus,
    error: applicationsListError,
  } = state?.permissionsReducer?.permissionApplicationsList;

  const { flags: featureFlags } = state.featureFlags;

  return {
    consumerList: !featureFlags[secretManagerFlag]
      ? { result: consumerList?.result?.filter((consumer) => consumer.name !== smConsumer) || [] }
      : consumerList,
    consumerListStatus,
    consumerListError,

    actionListData,
    actionListStatus,
    actionListError,

    addPermissionData,
    addPermissionStatus,
    addPermissionFormError,

    viewPermissionData,
    viewPermissionStatus,
    viewPermissionFormError,

    applicationsListData,
    applicationsListStatus,
    applicationsListError,
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
    getConsumerList: () => dispatch(consumerListRequest()),
    getActionsList: (consumerName) =>
      dispatch({
        type: PermissionsActionsListTypes.PERMISSIONS_ACTIONS_LIST_REQUEST,
        payload: consumerName,
      }),
    getViewPermissions: (ID, history) => {
      const payload = { ID, history };
      dispatch({ type: GetViewPermissionsTypes.PERMISSIONS_VIEW_REQUEST, payload });
    },
    flushAddPermissions: () => dispatch({ type: AddPermissionsTypes.PERMISSIONS_FLUSH_DATA }),
    addPermissionsAction: (formData, history) => {
      const payload = {
        formData: formData,
        history: history,
      };
      dispatch({ type: AddPermissionsTypes.PERMISSIONS_ADD_REQUEST, payload });
    },
    getApplicationsList: () => dispatch(requestApplicationList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClonePermission);
