import { connect } from 'react-redux';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import EditVault from './EditVault';
import { updateVaultDetailsRequest, flushVaultDetailsRequest } from './action';
import { getVaultLandingRequest } from '../../home/actions';
import {
  requestNotificationMediumList,
  requestChannelList,
  requestUsersList,
  requestTagsList,
} from '../create/action';

const mapStateToProps = (state) => {
  const { loading: editVaultRequestLoading, error: vaultFormError } = state.vaultReducer.editVault;

  const { result: notificationMediumList, loading: notificationMediumLoading } =
    state?.vaultReducer?.notificationMediumListReducer;

  const { data: usersData, loading: usersLoading } = state?.vaultReducer?.usersList;
  const { data: tagsData, loading: tagsLoading } = state?.vaultReducer?.tagsList;
  const { data: channelData, loading: channelLoading } = state?.vaultReducer?.channelList;

  return {
    editVaultRequestLoading: editVaultRequestLoading,
    vaultFormError: vaultFormError,

    notificationMediumList,
    notificationMediumLoading,

    usersData: usersData?.result || [],
    usersLoading,

    tagsLoading,
    tagsData: tagsData?.result || [],

    channelLoading,
    channelData: channelData?.result || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getVaultDetails: () => dispatch(getVaultLandingRequest()),
    spinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    editVaultDetailsRequest: (formData, id, history) => {
      dispatch(updateVaultDetailsRequest(formData, id, history));
    },
    flushEditVault: () => dispatch(flushVaultDetailsRequest()),
    getNotificationMediumList: () => dispatch(requestNotificationMediumList()),
    fetchChannelList: (channelId) => dispatch(requestChannelList(channelId)),
    fetchUsers: () => dispatch(requestUsersList()),
    fetchTags: () => dispatch(requestTagsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVault);
