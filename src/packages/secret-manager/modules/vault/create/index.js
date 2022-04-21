import { connect } from 'react-redux';
import { initSpinnerOverlay } from '../../../../../components/spinner-overlay/action';
import { HeaderConstants } from '../../../../../components/page-header/constants';
import CreateVault from './CreateVault';
import { CreateVaultTypes } from './constants';

import {
  requestNotificationMediumList,
  requestUsersList,
  requestTagsList,
  requestChannelList,
} from './action';

const mapStateToProps = (state) => {
  const {
    data: vaultStatus,
    loading: vaultLoading,
    error: vaultFormError,
  } = state.vaultReducer.createVault;

  const { result: notificationMediumList, loading: notificationMediumLoading } =
    state?.vaultReducer?.notificationMediumListReducer;

  const { data: usersData, loading: usersLoading } = state?.vaultReducer?.usersList;
  const { data: tagsData, loading: tagsLoading } = state?.vaultReducer?.tagsList;
  const { data: channelData, loading: channelLoading } = state?.vaultReducer?.channelList;

  return {
    vaultStatus: vaultStatus,
    vaultLoading: vaultLoading,
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
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
    spinnerOverlay: ({ open, size, message }) =>
      dispatch(initSpinnerOverlay({ open, size, message })),
    createVaultAction: (formData, history) => {
      const payload = {
        formData: formData,
        history: history,
      };
      dispatch({ type: CreateVaultTypes.CREATE_VAULT_REQUEST, payload });
    },
    flushCreateVault: () => dispatch({ type: CreateVaultTypes.CREATE_VAULT_FLUSH_DATA }),
    getNotificationMediumList: () => dispatch(requestNotificationMediumList()),
    fetchUsers: () => dispatch(requestUsersList()),
    fetchTags: () => dispatch(requestTagsList()),
    fetchChannelList: (channelId) => dispatch(requestChannelList(channelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVault);
