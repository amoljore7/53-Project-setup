import Button from 'britive-design-system/core/components/button';
import Dialog from 'britive-design-system/core/components/dialog';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RESOURCE_STATUS, typeOfStatus } from '../../../../../utils/common-constants';
import {
  classes,
  notificationMediumConstants,
  translatedStrings,
  viewNotificationMediumDetailsLayout,
} from './constants';
import './NotificationMediumView.scss';
import startCase from 'lodash/startCase';
import { webHookUrl } from '../utils';

const notificationMediumView = ({
  setPageHeader,
  fetchNotificationMediumData,
  notificationMediumViewStatus,
  deleteNotificationMediumById,
  notificationMediumData,
  deleteNotificationMediumStatus,
  history,
  initSpinnerOverlay,
  resetNotificationMediumView,
}) => {
  const [openDeleteDialog, setDeleteDialogue] = useState(false);
  const { id: notificationMediumId } = useParams();
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    fetchNotificationMediumData(notificationMediumId, history);
    setPageHeader(translatedStrings.pageTitle, []);
  }, []);

  useEffect(() => {
    if (deleteNotificationMediumStatus === RESOURCE_STATUS.SUCCESS) {
      history.push(notificationMediumConstants.listUrl);
    }
  }, [deleteNotificationMediumStatus]);

  useEffect(() => {
    setPageHeader(translatedStrings.pageTitle + ' : ' + (notificationMediumData?.name ?? ''), []);
  }, [notificationMediumData?.name]);

  useEffect(() => {
    initSpinnerOverlay({
      open:
        notificationMediumViewStatus === RESOURCE_STATUS.LOADING ||
        deleteNotificationMediumStatus === RESOURCE_STATUS.LOADING,
      size: notificationMediumConstants.mediumSize,
      message:
        deleteNotificationMediumStatus === RESOURCE_STATUS.LOADING
          ? translatedStrings.deleteLoadingMessage
          : translatedStrings.loadingMessage,
    });
  }, [notificationMediumViewStatus, deleteNotificationMediumStatus]);

  const viewNotificationMediumActionButtons = () => {
    return (
      <div className={classes.notificationMediumButtonContainer}>
        {notificationMediumData?.type !== notificationMediumConstants.emailText && (
          <>
            <Button
              variant={notificationMediumConstants.variant}
              size={notificationMediumConstants.mediumSize}
              onClick={() => {
                history.push(
                  `/admin/global-settings/notification-medium/edit/${notificationMediumId}`
                );
              }}
            >
              {translatedStrings.editText}
            </Button>
            <Button
              variant={notificationMediumConstants.secVariant}
              size={notificationMediumConstants.mediumSize}
              onClick={() => {
                history?.push(
                  `/admin/global-settings/notification-medium/clone/${notificationMediumId}`
                );
              }}
            >
              {translatedStrings.cloneText}
            </Button>
            <Button
              variant={notificationMediumConstants.secVariant}
              size={notificationMediumConstants.mediumSize}
              onClick={() => setDeleteDialogue(true)}
            >
              {translatedStrings.deleteText}
            </Button>
          </>
        )}
        <Button
          variant={notificationMediumConstants.secVariant}
          size={notificationMediumConstants.mediumSize}
          onClick={() => {
            history.goBack();
            resetNotificationMediumView();
          }}
        >
          {translatedStrings.closeText}
        </Button>
      </div>
    );
  };
  const viewNotificationMediumData = () => {
    return (
      <>
        {viewNotificationMediumDetailsLayout.map((viewNotificationMedium, index) => (
          <div
            className={classes.fieldWrapper}
            key={`${notificationMediumConstants.viewFieldKey}${index}`}
          >
            <Typography variant="label2">{viewNotificationMedium?.label}</Typography>
            <div className={classes.fieldSpacing}>
              <Typography variant="label1">
                {notificationMediumData[viewNotificationMedium?.key] ===
                  notificationMediumConstants.emailText ||
                notificationMediumData[viewNotificationMedium?.key] ===
                  notificationMediumConstants.slackText ||
                notificationMediumData[viewNotificationMedium?.key] ===
                  notificationMediumConstants.teamsText
                  ? startCase(notificationMediumData[viewNotificationMedium?.key])
                  : notificationMediumData[viewNotificationMedium?.key] ??
                    translatedStrings.noneText}
              </Typography>
            </div>
          </div>
        ))}
      </>
    );
  };

  const viewNotificationMediumSlackData = () => {
    return (
      <>
        <div className={classes.fieldWrapper}>
          <Typography variant="label2">{translatedStrings.slackUrlLabel}</Typography>
          <div className={classes.fieldSpacing}>
            <Typography variant="label1">
              {notificationMediumData?.connectionParameters?.URL || translatedStrings.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes.fieldWrapper}>
          <Typography variant="label2">{translatedStrings.slackTokenLabel}</Typography>

          <div className={classes.fieldSpacing}>
            <Button
              variant={notificationMediumConstants.variant}
              size={notificationMediumConstants.mediumSize}
              onClick={() => {
                setShowToken(!showToken);
              }}
            >
              {showToken ? translatedStrings.hideText : translatedStrings.showText}
            </Button>
          </div>

          <div className={classes.fieldSpacing}>
            <Typography variant="label1">
              {showToken
                ? notificationMediumData?.connectionParameters?.token || translatedStrings.noneText
                : notificationMediumConstants.starText}
            </Typography>
          </div>
        </div>
        <div className={classes.fieldWrapper}>
          <Typography variant="label2">{translatedStrings.slackAttributeText} </Typography>
        </div>
      </>
    );
  };
  const viewNotificationMediumTeamsData = () => {
    return (
      <>
        <div className={classes.fieldWrapper}>
          <Typography variant="label2">{translatedStrings.teamsUrlLabel}</Typography>
          <div className={classes.fieldSpacing}>
            <Typography variant="label1">
              {notificationMediumData?.connectionParameters?.[webHookUrl] ||
                translatedStrings.noneText}
            </Typography>
          </div>
        </div>
      </>
    );
  };

  const returnNotificationMediumView = (type) => {
    if (type == notificationMediumConstants.slackText) {
      return viewNotificationMediumSlackData();
    } else if (type == notificationMediumConstants.teamsText) {
      return viewNotificationMediumTeamsData();
    }
  };

  return (
    <div role={notificationMediumConstants.mainText}>
      {viewNotificationMediumActionButtons()}
      <div className={classes.notificationMediumViewDataMainContainer}>
        {viewNotificationMediumData()}
        {returnNotificationMediumView(notificationMediumData?.type)}
      </div>
      {openDeleteDialog && (
        <Dialog
          width={400}
          height={250}
          type={notificationMediumConstants.alertDialog}
          title={translatedStrings.deleteTitle}
          message={translatedStrings.deleteMessage}
          primaryButtonText={translatedStrings.deletePrimaryButton}
          secondaryButtonText={translatedStrings.noText}
          onSubmit={() => {
            deleteNotificationMediumById(notificationMediumId);
            setDeleteDialogue(false);
          }}
          onCancel={() => {
            setDeleteDialogue(false);
          }}
        />
      )}
    </div>
  );
};

notificationMediumView.propTypes = {
  setPageHeader: PropTypes.func,
  fetchNotificationMediumData: PropTypes.func,
  deleteNotificationMediumById: PropTypes.func,
  notificationMediumViewStatus: PropTypes.oneOf(typeOfStatus),
  deleteNotificationMediumStatus: PropTypes.oneOf(typeOfStatus),
  notificationMediumData: PropTypes.object,
  history: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  resetNotificationMediumView: PropTypes.func,
};

export default notificationMediumView;
