import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import { openNotification } from '../../../../../components/notification/action';
import { AddPermissionsTypes, PermissionsActionsListTypes } from './constants';
import AddPermission from './AddPermission';
import { requestApplicationList } from './action';
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
    data: applicationsListData,
    status: applicationsListStatus,
    error: applicationsListError,
  } = state.permissionsReducer.permissionApplicationsList;
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

    applicationsListData,
    applicationsListStatus,
    applicationsListError,

    addPermissionData,
    addPermissionStatus,
    addPermissionFormError,
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
    getApplicationsList: () => dispatch(requestApplicationList()),
    flushAddPermissions: () => dispatch({ type: AddPermissionsTypes.PERMISSIONS_FLUSH_DATA }),
    addPermissionsAction: (formData, history) => {
      const payload = {
        formData: formData,
        history: history,
      };
      dispatch({ type: AddPermissionsTypes.PERMISSIONS_ADD_REQUEST, payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPermission);
