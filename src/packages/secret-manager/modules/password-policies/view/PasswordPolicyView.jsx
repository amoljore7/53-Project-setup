import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Typography from 'britive-design-system/core/components/typography';
import { useParams } from 'react-router-dom';
import './PasswordPolicyView.scss';
import {
  translatedStrings,
  passwordPolicyConstants,
  viewAlphaPasswordPolicyDetailsLayout,
  classes,
  passwordPolicyButton,
  viewPinPasswordPolicyDetailsLayout,
} from './constants';
import {
  RESOURCE_STATUS,
  typeOfStatus,
  ppListingPath,
  ALLOW,
} from '../../../../../utils/common-constants';
import { isSuccess } from '../../../../../utils/common-utils';
import { isEmpty } from 'lodash';
import { passwordPolicyActions } from '../../../../../components/batch-eval/constants';

const PasswordPolicyView = ({
  setPageHeader,
  fetchPasswordPolicyData,
  passwordPolicyLoading,
  deletePasswordPolicyById,
  passwordPolicyData,
  deletePasswordPolicyLoading,
  resetPasswordPolicyView,
  history,
  initSpinnerOverlay,
  smEvalData,
}) => {
  const [openDeleteDialog, setDeleteDialogue] = useState(false);
  const [passwordPolicyEvalData, setPasswordPolicyEvalData] = useState({});

  const { id: passwordPolicyId } = useParams();

  useEffect(() => {
    fetchPasswordPolicyData(passwordPolicyId, history);
    setPageHeader(translatedStrings?.pageTitle, []);
  }, []);

  useEffect(() => {
    if (!isEmpty(smEvalData)) {
      const { create, update, list, read } = passwordPolicyActions;
      setPasswordPolicyEvalData({
        add: smEvalData[create] === ALLOW,
        edit: smEvalData[update] === ALLOW,
        delete: smEvalData[passwordPolicyActions?.delete] === ALLOW,
        view: smEvalData[read] === ALLOW,
        list: smEvalData[list] === ALLOW,
      });
    }
  }, [smEvalData]);

  useEffect(() => {
    if (isSuccess(deletePasswordPolicyLoading)) {
      history.push(ppListingPath);
    }
  }, [deletePasswordPolicyLoading]);

  useEffect(() => {
    setPageHeader(translatedStrings?.pageTitle + ' : ' + (passwordPolicyData?.name ?? ''), []);
  }, [passwordPolicyData?.name]);

  useEffect(() => {
    initSpinnerOverlay({
      open: passwordPolicyLoading || deletePasswordPolicyLoading === RESOURCE_STATUS.LOADING,
      size: passwordPolicyConstants?.spinnerSize,
      message:
        deletePasswordPolicyLoading === RESOURCE_STATUS.LOADING
          ? translatedStrings?.deleteLoadingMessage
          : translatedStrings?.loadingMessage,
    });
  }, [passwordPolicyLoading, deletePasswordPolicyLoading]);

  const handleEditClick = () => {
    history.push(`${ppListingPath}/edit/${passwordPolicyId}`);
  };
  const clonePassPolicy = () => {
    history?.push(`${ppListingPath}/clone/${passwordPolicyData?.id}`);
  };

  const viewPasswordPolicyActionButtons = () => {
    return (
      <div className={classes?.passwordPolicyButtonContainer}>
        {passwordPolicyEvalData?.edit ? (
          <Button
            variant={passwordPolicyButton?.variant}
            size={passwordPolicyButton?.size}
            onClick={handleEditClick}
          >
            {translatedStrings?.editText}
          </Button>
        ) : (
          <Button
            variant={passwordPolicyButton?.variant}
            size={passwordPolicyButton?.size}
            onClick={() => {
              history.goBack();
              resetPasswordPolicyView();
            }}
          >
            {translatedStrings?.closeText}
          </Button>
        )}
        {passwordPolicyEvalData?.add && (
          <Button
            variant={passwordPolicyButton?.secVariant}
            size={passwordPolicyButton?.size}
            onClick={() => {
              clonePassPolicy();
            }}
          >
            {translatedStrings?.cloneText}
          </Button>
        )}
        {passwordPolicyEvalData?.delete && (
          <Button
            variant={passwordPolicyButton?.secVariant}
            size={passwordPolicyButton?.size}
            onClick={() => setDeleteDialogue(true)}
          >
            {translatedStrings?.deleteText}
          </Button>
        )}
        {passwordPolicyEvalData?.edit && (
          <Button
            variant={passwordPolicyButton?.secVariant}
            size={passwordPolicyButton?.size}
            onClick={() => {
              history.goBack();
              resetPasswordPolicyView();
            }}
          >
            {translatedStrings?.closeText}
          </Button>
        )}
      </div>
    );
  };
  const viewAlphaPasswordPolicyData = () => {
    return viewAlphaPasswordPolicyDetailsLayout.map((viewPasswordPolicy, index) => (
      <div
        className={classes?.marginTop32px}
        key={`${passwordPolicyConstants?.viewFieldKey}${index}`}
      >
        <Typography variant="label2">{viewPasswordPolicy.label}</Typography>
        <div className={classes?.marginTop8px}>
          <Typography variant="label1">
            {typeof passwordPolicyData[viewPasswordPolicy.key] === passwordPolicyConstants?.boolType
              ? passwordPolicyData[viewPasswordPolicy.key]
                ? translatedStrings?.yesText
                : translatedStrings?.noText
              : passwordPolicyData[viewPasswordPolicy.key] ?? translatedStrings.noneText}
          </Typography>
        </div>
      </div>
    ));
  };

  const viewPinPasswordPolicyData = () => {
    return viewPinPasswordPolicyDetailsLayout.map((viewPasswordPolicy, index) => (
      <div
        className={classes?.marginTop32px}
        key={`${passwordPolicyConstants?.viewFieldKey}${index}`}
      >
        <Typography variant="label2">{viewPasswordPolicy.label}</Typography>
        <div className={classes?.marginTop8px}>
          <Typography variant="label1">
            {typeof passwordPolicyData[viewPasswordPolicy.key] === passwordPolicyConstants?.boolType
              ? passwordPolicyData[viewPasswordPolicy.key]
                ? translatedStrings?.yesText
                : translatedStrings?.noText
              : passwordPolicyData[viewPasswordPolicy.key] ?? translatedStrings.noneText}
          </Typography>
        </div>
      </div>
    ));
  };

  return (
    <div className={classes?.passwordPolicyMainContainer} role={passwordPolicyConstants?.mainText}>
      {viewPasswordPolicyActionButtons()}
      <div className={classes?.passwordPolicyViewDataMainContainer}>
        {passwordPolicyData?.passwordType === passwordPolicyConstants?.alphaNumeric
          ? viewAlphaPasswordPolicyData()
          : viewPinPasswordPolicyData()}
        {passwordPolicyData?.passwordType !== passwordPolicyConstants?.alphaNumeric ? (
          <div className={classes?.marginTop32px}>
            <Typography variant="label2">{translatedStrings.pinMandatoryText}</Typography>
          </div>
        ) : (
          ''
        )}
      </div>
      {openDeleteDialog && (
        <DialogPopup
          width={400}
          height={250}
          type={passwordPolicyConstants?.alertDialog}
          title={translatedStrings?.deleteTitle}
          message={translatedStrings?.deleteMessage}
          primaryButtonText={translatedStrings?.deletePrimaryButton}
          secondaryButtonText={translatedStrings?.noText}
          onSubmit={() => {
            deletePasswordPolicyById(passwordPolicyId);
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
PasswordPolicyView.propTypes = {
  setPageHeader: PropTypes.func,
  fetchPasswordPolicyData: PropTypes.func,
  deletePasswordPolicyById: PropTypes.func,
  passwordPolicyLoading: PropTypes.bool,
  deletePasswordPolicyLoading: PropTypes.oneOf(typeOfStatus),
  resetPasswordPolicyView: PropTypes.func,
  passwordPolicyData: PropTypes.object,
  history: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  smEvalData: PropTypes.object,
};
export default PasswordPolicyView;
