import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import { useParams } from 'react-router-dom';
import { CreateVaultForm } from '../create/create-vault-form/CreateVaultForm';
import { getHeightFromTop } from '../../../../../utils/common-utils';
import {
  getUsersId,
  getTagsId,
  getChannelId,
  getDefaultNotificationMediumId,
  validationHook as vaultValidationHook,
} from '../common-utils';
import isEmpty from 'lodash/isEmpty';
import { intersectionWith } from 'lodash';
import { translatedStrings, buttonType } from './constants';
import { classes } from '../create/constants';
import { IS_SLACK } from '../../../../../utils/common-constants';
import SnackbarFormError from '../../../../../components/snackbar';

const EditVault = ({
  history,
  setPageHeader,
  getVaultDetails,
  openNotification,
  spinnerOverlay,
  editVaultDetailsRequest,
  vaultFormError,
  editVaultRequestLoading,
  flushEditVault,
  getNotificationMediumList,
  notificationMediumList,
  fetchUsers,
  usersData,
  fetchTags,
  tagsData,
  fetchChannelList,
  channelData,
  notificationMediumLoading,
  usersLoading,
  tagsLoading,
  channelLoading,
}) => {
  const vaultDetail = useSelector((state) => state.vaultLanding);
  const [resetDialog, setResetDialog] = useState(false);
  const [showSaveDialog, setSaveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formData, setFormData] = useState('');
  const [notificationName, setNotificationName] = useState('');
  const { id: vaultID } = useParams();
  const formContainer = useRef(null);
  const channelRef = useRef(0);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current, vaultFormError]);

  if (vaultDetail.vaultStatusCode === 404) {
    openNotification({
      open: true,
      type: 'warning',
      title: translatedStrings.vaultNotCreatedWarning,
      duration: null,
    });
    return <Redirect to="/admin/secret-manager" />;
  }

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle, []);
    getNotificationMediumList();
    fetchUsers();
    fetchTags();
  }, []);

  useEffect(() => {
    spinnerOverlay({
      open:
        editVaultRequestLoading ||
        notificationMediumLoading ||
        usersLoading ||
        tagsLoading ||
        channelLoading,
      size: 'medium',
      message: translatedStrings.loadingMessage,
    });
  }, [
    editVaultRequestLoading,
    notificationMediumLoading,
    usersLoading,
    tagsLoading,
    channelLoading,
  ]);

  useEffect(() => {
    if ((vaultDetail?.data || vaultDetail?.data?.recipients) && !isEmpty(usersData)) {
      validationHook.resetValues({
        name: vaultDetail?.data?.name,
        description: vaultDetail?.data?.description,
        rotationTime: vaultDetail?.data?.rotationTime,
        notificationList: validationHook?.values?.notificationList || notificationName,
        userList: getUserList(vaultDetail?.data?.recipients?.userIds),
        tagList: getTagList(vaultDetail?.data?.recipients?.tags),
        channelList: !isEmpty(channelData)
          ? getChannelList(vaultDetail?.data?.recipients?.channelIds)
          : [],
        isChannelRequired: true,
      });
    }
  }, [vaultDetail?.data, vaultDetail?.data?.recipients, usersData, tagsData, notificationName]);

  useEffect(() => {
    if (!isEmpty(vaultDetail?.data?.defaultNotificationMediumId)) {
      setNotificationName(
        getDefaultNotificationMediumName(vaultDetail?.data?.defaultNotificationMediumId)
      );
    }
  }, [notificationMediumList, vaultDetail?.data?.defaultNotificationMediumId]);

  useEffect(() => {
    if (
      !isEmpty(channelData) &&
      isEmpty(validationHook?.values?.channelList) &&
      channelRef.current == 0
    ) {
      channelRef.current = 1;
      validationHook.handleChange(
        validationHook.names.channelList,
        getChannelList(vaultDetail?.data?.recipients?.channelIds)
      );
    }
  }, [channelData]);

  const getDefaultNotificationMediumName = (id) => {
    if (!isEmpty(notificationMediumList)) {
      const mediumName = notificationMediumList.find((element) => element?.id === id);
      if (mediumName?.type === IS_SLACK) {
        fetchChannelList(id);
      }
      return mediumName ? mediumName?.name : translatedStrings.none;
    } else {
      return translatedStrings.none;
    }
  };

  const getUserList = (data) => {
    const userNameList = [];
    if (!isEmpty(usersData)) {
      for (let i = 0; i < data?.length; i++) {
        const userObject = usersData.find((element) => element?.userId === data[i]);
        userNameList.push(userObject ? userObject : translatedStrings.none);
      }
      return userNameList;
    } else {
      return userNameList;
    }
  };

  const getTagList = (data) => {
    const tagsNameList = [];
    if (tagsData && tagsData.length) {
      for (let i = 0; i < data?.length; i++) {
        const tagObject = tagsData.find((element) => element?.userTagId === data[i]);
        tagsNameList.push(tagObject ? tagObject : translatedStrings.none);
      }
      return tagsNameList;
    } else {
      return tagsNameList;
    }
  };

  const getChannelList = (data) => {
    const channelsNameList = intersectionWith(
      channelData,
      data,
      (channel, id) => channel?.channelId === id
    ).map((channel) => channel);
    return channelsNameList;
  };

  const submitHandler = (values) => {
    // Data massage
    const userList = getUsersId(values.userList);
    const tagsList = getTagsId(values.tagList);
    const channelList = getChannelId(values.channelList);

    setSaveDialog(true);
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

    setFormData(payloadData);
  };

  const validationHook = vaultValidationHook(submitHandler);

  const getResetDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.vaultReset}
        message={translatedStrings.vaultResetMessage}
        primaryButtonText={translatedStrings.resetAllField}
        secondaryButtonText={translatedStrings.keepChangesMSG}
        onSubmit={() => {
          validationHook.resetForm();
          channelRef.current = 0;
          getNotificationMediumList();
          fetchUsers();
          fetchTags();
          getVaultDetails();
          setResetDialog(false);
          flushEditVault();
          openNotification({
            type: 'success',
            title: translatedStrings.vaultResetNotification,
            open: true,
            duration: null,
          });
        }}
        onCancel={() => setResetDialog(false)}
      />
    );
  };

  const getSaveDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.vaultSaveTitle}
        message={translatedStrings.vaultSaveMessage}
        primaryButtonText={translatedStrings.yesSave}
        secondaryButtonText={translatedStrings.noLabel}
        onSubmit={() => {
          setSaveDialog(false);
          editVaultDetailsRequest(formData, vaultID, history);
          validationHook.resetForm();
        }}
        onCancel={() => setSaveDialog(false)}
      />
    );
  };

  const getCancelDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.cancelDialogTitle}
        message={translatedStrings.vaultCancelMessage}
        primaryButtonText={translatedStrings.yesDiscard}
        secondaryButtonText={translatedStrings.noLabel}
        onSubmit={() => {
          setShowCancelDialog(false);
          flushEditVault();
          history.push('/admin/secret-manager');
        }}
        onCancel={() => setShowCancelDialog(false)}
      />
    );
  };

  const buttonHeader = () => {
    return (
      <>
        <div className={classes.createVaultButton}>
          <Button
            size="medium"
            onClick={() => {
              validationHook.handleSubmit();
            }}
          >
            {buttonType.save}
          </Button>
          <div className={classes.cancelBtn}>
            <Button size="medium" variant="secondary" onClick={() => setResetDialog(true)}>
              {buttonType.reset}
            </Button>
          </div>
          <div className={classes.cancelBtn}>
            <Button size="medium" variant="secondary" onClick={() => setShowCancelDialog(true)}>
              {buttonType.cancel}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {buttonHeader()}
      {showSaveDialog && getSaveDialog()}
      {resetDialog && getResetDialog()}
      {showCancelDialog && getCancelDialog()}
      {!editVaultRequestLoading && (
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

EditVault.propTypes = {
  history: PropTypes.any,
  openNotification: PropTypes.oneOf(['general', 'success', 'error', 'warning']),
  getVaultDetails: PropTypes.func,
  editVaultDetailsRequest: PropTypes.func,
  vaultFormError: PropTypes.object,
  setPageHeader: PropTypes.func,
  editVaultRequestLoading: PropTypes.bool,
  flushEditVault: PropTypes.func,
  spinnerOverlay: PropTypes.func,
  getNotificationMediumList: PropTypes.func,
  notificationMediumList: PropTypes.array,
  notificationMediumLoading: PropTypes.bool,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersLoading: PropTypes.bool,
  fetchTags: PropTypes.func,
  tagsData: PropTypes.array,
  tagsLoading: PropTypes.bool,
  fetchChannelList: PropTypes.func,
  channelData: PropTypes.array,
  channelLoading: PropTypes.bool,
};

export default EditVault;
