import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DialogPopup from 'britive-design-system/core/components/dialog';
import TextField from 'britive-design-system/core/components/textfield';
import { translate } from '../../../externalization';
import Button from 'britive-design-system/core/components/button';
import Typography from 'britive-design-system/core/components/typography';
import Pill from 'britive-design-system/core/components/pill';
import isEmpty from 'lodash/isEmpty';
import { convertTimeToCurrentTimezone, getHeightFromTop } from '../../../../../utils/common-utils';
import {
  setPageHeader,
  deleteVault,
  spinnerOverlay,
  openNotification,
  rotateVaultKey,
} from './actions';
import {
  requestNotificationMediumList,
  requestChannelList,
  requestUsersList,
  requestTagsList,
  flushUsersList,
  flushTagsList,
  flushChannelsList,
  flushNotificationMediumList,
} from '../create/action';
import {
  classes,
  buttonType,
  translatedStrings,
  vaultAccess,
  isAllow,
  defaultWidth,
  ROTATION_IN_PROGRESS,
} from './constants';
import { IS_SLACK } from '../../../../../utils/common-constants';
import './VaultDetails.scss';
import { vaultActions } from '../../../../../components/batch-eval/constants';
import { ALLOW } from '../../../../../utils/common-constants';
const VaultDetails = ({ history }) => {
  const dispatch = useDispatch();
  const vaultDetail = useSelector((state) => state.vaultLanding);
  const vaultDelete = useSelector((state) => state.vaultReducer.deleteVault);
  const vaultRotation = useSelector((state) => state.vaultReducer.rotateVaultKey);
  const { result: smEvalData } = useSelector((state) => state?.batchEvalReducer);

  const { result: notificationMediumList, loading: notificationMediumLoading } = useSelector(
    (state) => state?.vaultReducer?.notificationMediumListReducer
  );
  const { data: usersData, loading: usersLoading } = useSelector(
    (state) => state?.vaultReducer?.usersList
  );
  const { data: tagsData, loading: tagsLoading } = useSelector(
    (state) => state?.vaultReducer?.tagsList
  );
  const { data: channelData, loading: channelLoading } = useSelector(
    (state) => state?.vaultReducer?.channelList
  );

  const [showDeleteDialogPopup, setShowDeleteDialogPopup] = useState(false);
  const [showRotateVaultDialogPopup, setShowRotateVaultDialogPopup] = useState(false);
  const [matchInputText, setMatchInputText] = useState('');
  const [notificationDetails, setNotificationDetails] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [tagDetails, setTagDetails] = useState([]);
  const [channelDetails, setChannelDetails] = useState([]);
  const [vaultEvalData, setvaultEvalData] = useState({});
  const formContainer = useRef(null);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer.current]);

  if (vaultDetail?.vaultStatusCode === 404 || vaultDetail?.vaultStatusCode === 403) {
    dispatch(
      openNotification({
        open: true,
        type: vaultDetail?.vaultStatusCode === 404 ? 'warning' : 'error',
        title:
          vaultDetail?.vaultStatusCode === 404
            ? translatedStrings.vaultNotCreatedWarning
            : translatedStrings.accessDenied,
        duration: null,
      })
    );
    return <Redirect to="/admin/secret-manager" />;
  }

  useEffect(() => {
    dispatch(requestNotificationMediumList());
    dispatch(requestUsersList());
    dispatch(requestTagsList());
  }, []);

  useEffect(() => {
    if (!isEmpty(vaultDetail?.data?.defaultNotificationMediumId)) {
      setNotificationDetails(
        getDefaultNotificationMediumName(vaultDetail?.data?.defaultNotificationMediumId)
      );
    }
  }, [notificationMediumList, vaultDetail?.data?.defaultNotificationMediumId]);

  useEffect(() => {
    if (!isEmpty(vaultDetail?.data?.recipients?.userIds)) {
      setUserDetails(getUserList(vaultDetail?.data?.recipients?.userIds));
    }
  }, [usersData, vaultDetail?.data?.recipients?.userIds]);

  useEffect(() => {
    if (!isEmpty(vaultDetail?.data?.recipients?.tags)) {
      setTagDetails(getTagList(vaultDetail?.data?.recipients?.tags));
    }
  }, [tagsData, vaultDetail?.data?.recipients?.tags]);

  useEffect(() => {
    if (!isEmpty(vaultDetail?.data?.recipients?.channelIds)) {
      setChannelDetails(getChannelList(vaultDetail?.data?.recipients?.channelIds));
    }
  }, [channelData, vaultDetail?.data?.recipients?.channelIds]);

  useEffect(() => {
    dispatch(
      setPageHeader(`${translatedStrings.pageTitle} : ${vaultDetail?.data?.name ?? ''}`, [])
    );
  }, [vaultDetail?.data?.name]);

  useEffect(() => {
    if (!isEmpty(smEvalData)) {
      const { create, read, update, list } = vaultActions;
      setvaultEvalData({
        add: smEvalData[create] === ALLOW,
        edit: smEvalData[update] === ALLOW,
        delete: smEvalData[vaultActions?.delete] === ALLOW,
        view: smEvalData[read] === ALLOW,
        list: smEvalData[list] === ALLOW,
      });
    }
  }, [smEvalData]);

  useEffect(() => {
    dispatch(
      spinnerOverlay({
        open:
          notificationMediumLoading ||
          usersLoading ||
          tagsLoading ||
          channelLoading ||
          vaultDelete?.loading ||
          vaultRotation?.loading,
        size: 'medium',
        message: translatedStrings.loadingMessage,
      })
    );
  }, [
    notificationMediumLoading,
    usersLoading,
    tagsLoading,
    channelLoading,
    vaultDelete?.loading,
    vaultRotation?.loading,
  ]);

  const editHandler = (id) => {
    dispatch(flushUsersList());
    dispatch(flushTagsList());
    dispatch(flushChannelsList());
    dispatch(flushNotificationMediumList());
    history.push(`/admin/secret-manager/vault/edit/${id}`);
  };

  const cancelHandler = () => {
    history.push('/admin/secret-manager');
  };

  const buttonHeader = () => {
    return (
      <>
        <div className={classes.vaultDetailsButton}>
          {vaultEvalData?.edit ? (
            <Button
              size="medium"
              disabled={
                (!isEmpty(vaultDetail?.data?.metadata) &&
                  vaultDetail?.data?.metadata[vaultAccess.updateVault] !== isAllow) ||
                vaultDetail?.data?.status === ROTATION_IN_PROGRESS
              }
              onClick={() => editHandler(vaultDetail?.data?.id)}
            >
              {buttonType.edit}
            </Button>
          ) : (
            <div className={classes.cancelBtn}>
              <Button size="medium" variant="primary" onClick={cancelHandler}>
                {buttonType.close}
              </Button>
            </div>
          )}
          {vaultEvalData?.delete && (
            <div className={classes.cancelBtn}>
              <Button
                size="medium"
                variant="secondary"
                onClick={() => setShowDeleteDialogPopup(true)}
                disabled={
                  (!isEmpty(vaultDetail?.data?.metadata) &&
                    vaultDetail?.data?.metadata[vaultAccess.deleteVault] !== isAllow) ||
                  vaultDetail?.data?.status === ROTATION_IN_PROGRESS
                }
              >
                {buttonType.delete}
              </Button>
            </div>
          )}
          {vaultEvalData?.edit && (
            <div className={classes.cancelBtn}>
              <Button
                size="medium"
                variant="secondary"
                onClick={() => setShowRotateVaultDialogPopup(true)}
                disabled={
                  (!isEmpty(vaultDetail?.data?.metadata) &&
                    vaultDetail?.data?.metadata[vaultAccess.rotateVault] !== isAllow) ||
                  vaultDetail?.data?.status === ROTATION_IN_PROGRESS
                }
              >
                {buttonType.rotateVault}
              </Button>
            </div>
          )}
          {vaultEvalData?.edit && (
            <div className={classes.cancelBtn}>
              <Button size="medium" variant="secondary" onClick={cancelHandler}>
                {buttonType.close}
              </Button>
            </div>
          )}
        </div>
      </>
    );
  };

  const getDeleteModal = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.deleteVaultTitle}
        message={translatedStrings.deleteVaultMsg}
        primaryButtonText={translatedStrings.deleteYesLabel}
        secondaryButtonText={translatedStrings.deleteNoLabel}
        onSubmit={() => {
          setShowDeleteDialogPopup(false);
          dispatch(deleteVault(vaultDetail?.data?.id, history));
        }}
        onCancel={() => {
          setShowDeleteDialogPopup(false), setMatchInputText('');
        }}
        primaryButtonDisabled={matchInputText.trim() !== 'DELETE'}
      >
        <TextField
          label={translatedStrings.deleteVaultInputLabel}
          value={matchInputText || ''}
          onChange={(e) => setMatchInputText(e.target.value)}
        />
      </DialogPopup>
    );
  };

  const getRotateVaultDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={translatedStrings.rotateVaultTitle}
        message={translatedStrings.rotateVaultMsg}
        primaryButtonText={translatedStrings.rotateVaultYesLabel}
        secondaryButtonText={translatedStrings.deleteNoLabel}
        onSubmit={() => {
          setShowRotateVaultDialogPopup(false);
          dispatch(rotateVaultKey(vaultDetail?.data?.id, history));
        }}
        onCancel={() => {
          setShowRotateVaultDialogPopup(false);
        }}
      ></DialogPopup>
    );
  };

  const vaultRotationMessage = () => {
    return (
      <div className={classes.rotationMessageWrapper}>
        <Typography variant="label2">{translatedStrings.rotateVaultInProgressMsg}</Typography>
      </div>
    );
  };
  const getDefaultNotificationMediumName = (id) => {
    if (notificationMediumList && notificationMediumList.length) {
      const mediumName = notificationMediumList.find((element) => element?.id === id);
      if (mediumName?.type === IS_SLACK) {
        dispatch(requestChannelList(id));
      }
      return mediumName ? mediumName : {};
    }
  };

  const getUserList = (data) => {
    const userNameList = [];
    if (usersData?.result && usersData?.result.length) {
      for (let i = 0; i < data?.length; i++) {
        const usersName = usersData?.result?.find((element) => element?.userId === data[i]);
        userNameList.push(usersName ? usersName?.name : translatedStrings.none);
      }
      return userNameList;
    } else {
      return userNameList;
    }
  };
  const getTagList = (data) => {
    const tagsNameList = [];
    if (tagsData?.result && tagsData?.result.length) {
      for (let i = 0; i < data?.length; i++) {
        const usersName = tagsData?.result?.find((element) => element?.userTagId === data[i]);
        tagsNameList.push(usersName ? usersName?.name : translatedStrings.none);
      }
      return tagsNameList;
    } else {
      return tagsNameList;
    }
  };

  const getChannelList = (data) => {
    const channelsNameList = [];
    if (channelData?.result && channelData?.result.length) {
      for (let i = 0; i < data?.length; i++) {
        const usersName = channelData?.result?.find((element) => element?.channelId === data[i]);
        channelsNameList.push(usersName ? usersName?.channelName : translatedStrings.none);
      }
      return channelsNameList;
    } else {
      return channelsNameList;
    }
  };

  return (
    <>
      {buttonHeader()}
      {showDeleteDialogPopup && getDeleteModal()}
      {showRotateVaultDialogPopup && getRotateVaultDialog()}
      <div className={classes.vaultDetailsForm} ref={formContainer}>
        {vaultDetail?.data?.status === ROTATION_IN_PROGRESS && vaultRotationMessage()}
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.vaultName} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {vaultDetail?.data?.name || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.vaultDescription} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {vaultDetail?.data?.description || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2">{translatedStrings.keyRotation}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {vaultDetail?.data?.rotationTime === 1
                ? translate('NUMBER_OF_DAY')
                : translate('NUMBER_OF_DAYS', { days: vaultDetail?.data?.rotationTime || '0' })}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2">{translatedStrings.lastKeyRotation}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {convertTimeToCurrentTimezone(vaultDetail?.data?.lastRotation) ||
                translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2">{translatedStrings.nextKeyRotation}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {convertTimeToCurrentTimezone(vaultDetail?.data?.nextRotation) ||
                translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2">{translatedStrings.vaultStatusLabel}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {vaultDetail?.data?.status || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.vaultHeaderClass}>
          <Typography variant="pageSectionHeader">
            {translatedStrings.notificationMediumSettings}
          </Typography>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2">{translatedStrings.notificationMediumLabel}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {notificationDetails?.name || translatedStrings.noneValue}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32} style={{ width: defaultWidth }}>
          <Typography variant="label2">{translatedStrings.userListLabel}</Typography>
          <div className={classes?.marginTop8}>
            <div className={classes.viewPillMainContainer}>
              {!isEmpty(userDetails)
                ? userDetails.map((value) => {
                    return (
                      <div key={value} className={classes.viewPillContainer}>
                        <Pill readOnly={true} label={value} />
                      </div>
                    );
                  })
                : translatedStrings.noneValue}
            </div>
          </div>
        </div>
        <div className={classes?.marginTop32} style={{ width: defaultWidth }}>
          <Typography variant="label2">{translatedStrings.tagListLabel}</Typography>
          <div className={classes?.marginTop8}>
            <div className={classes.viewPillMainContainer}>
              {!isEmpty(tagDetails)
                ? tagDetails.map((value) => {
                    return (
                      <div key={value} className={classes.viewPillContainer}>
                        <Pill readOnly={true} label={value} />
                      </div>
                    );
                  })
                : translatedStrings.noneValue}
            </div>
          </div>
        </div>
        <div className={classes?.marginTop32} style={{ width: defaultWidth }}>
          <Typography variant="label2">{translatedStrings.channelListLabel}</Typography>
          <div className={classes?.marginTop8}>
            <div className={classes.viewPillMainContainer}>
              {!isEmpty(channelDetails)
                ? channelDetails.map((value) => {
                    return (
                      <div key={value} className={classes.viewPillContainer}>
                        <Pill readOnly={true} label={value} />
                      </div>
                    );
                  })
                : translatedStrings.noneValue}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

VaultDetails.propTypes = {
  history: PropTypes.any,
};

export default VaultDetails;
