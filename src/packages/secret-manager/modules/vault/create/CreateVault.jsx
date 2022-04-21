import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import { CreateVaultForm } from './create-vault-form/CreateVaultForm';
import { getHeightFromTop } from '../../../../../utils/common-utils';
import {
  getUsersId,
  getTagsId,
  getChannelId,
  getDefaultNotificationMediumId,
  validationHook as vaultValidationHook,
} from '../common-utils';
import { classes, translatedStrings, buttonType } from './constants';
import { IS_SLACK } from '../../../../../utils/common-constants';
import SnackbarFormError from '../../../../../components/snackbar';
import isEmpty from 'lodash/isEmpty';

import './CreateVault.scss';

const CreateVault = ({
  history,
  setPageHeader,
  spinnerOverlay,
  createVaultAction,
  vaultFormError,
  vaultLoading,
  flushCreateVault,
  getNotificationMediumList,
  notificationMediumList,
  notificationMediumLoading,
  fetchUsers,
  usersData,
  usersLoading,
  fetchTags,
  tagsData,
  tagsLoading,
  fetchChannelList,
  channelData,
  channelLoading,
}) => {
  const formContainer = useRef(null);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, vaultFormError]);

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    getNotificationMediumList();
    fetchUsers();
    fetchTags();
  }, []);

  const submitHandler = (values) => {
    // Data massage
    const userList = getUsersId(values.userList);
    const tagsList = getTagsId(values.tagList);
    const channelList = getChannelId(values.channelList);

    const payloadData = {
      name: values.name.trim(),
      description: values.description.trim(),
      rotationTime: parseInt(values.rotationTime),
      defaultNotificationMediumId: getDefaultNotificationMediumId(
        values.notificationList,
        notificationMediumList
      ),
      recipients: {
        userIds: userList || [],
        tags: tagsList || [],
        channelIds: channelList || [],
      },
    };
    createVaultAction(payloadData, history);
  };

  const validationHook = vaultValidationHook(submitHandler);

  const formSubmitHandler = () => {
    validationHook.handleSubmit();
  };
  const cancelHandler = () => {
    flushCreateVault();
    history.goBack();
  };

  const buttonHeader = () => {
    return (
      <>
        <div className={classes.createVaultButton} role="create-britive-vault">
          <Button size="medium" onClick={formSubmitHandler}>
            {buttonType.create}
          </Button>
          <div className={classes.cancelBtn}>
            <Button size="medium" variant="secondary" onClick={cancelHandler}>
              {buttonType.cancel}
            </Button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    spinnerOverlay({
      open:
        vaultLoading || notificationMediumLoading || usersLoading || tagsLoading || channelLoading,
      size: 'medium',
      message: translatedStrings.loadingMessage,
    });
  }, [vaultLoading, notificationMediumLoading, usersLoading, tagsLoading, channelLoading]);
  return (
    <>
      {buttonHeader()}
      {!vaultLoading && (
        <>
          <SnackbarFormError {...vaultFormError} hasError={!isEmpty(vaultFormError)} />
          <CreateVaultForm
            validationHook={validationHook}
            formContainer={formContainer}
            IS_SLACK={IS_SLACK}
            notificationMediumList={notificationMediumList}
            fetchChannelList={fetchChannelList}
            usersData={usersData}
            tagsData={tagsData}
            channelData={channelData}
          />
        </>
      )}
    </>
  );
};

CreateVault.propTypes = {
  history: PropTypes.any,
  createVaultAction: PropTypes.func,
  vaultFormError: PropTypes.any,
  setPageHeader: PropTypes.func,
  vaultLoading: PropTypes.bool,
  flushCreateVault: PropTypes.func,
  spinnerOverlay: PropTypes.func,
  getNotificationMediumList: PropTypes.func,
  notificationMediumList: PropTypes.array,
  fetchUsers: PropTypes.func,
  notificationMediumLoading: PropTypes.bool,
  usersData: PropTypes.array,
  usersLoading: PropTypes.bool,
  fetchTags: PropTypes.func,
  tagsData: PropTypes.array,
  tagsLoading: PropTypes.bool,
  fetchChannelList: PropTypes.func,
  channelData: PropTypes.array,
  channelLoading: PropTypes.bool,
};

export default CreateVault;
