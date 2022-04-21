import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'britive-design-system/core/components/button';
import Typography from 'britive-design-system/core/components/typography';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import DialogPopup from 'britive-design-system/core/components/dialog';
import SecretFieldDetail from './secret-modal/SecretFieldDetail';
import SecretFieldsTable from './secret-modal/SecretFieldsTable';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS, ALLOW, sstListingPath } from '../../../../../utils/common-constants';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { translate } from '../../../externalization';
import {
  mainRole,
  classes,
  viewSecretTemplateActionContainerTestId,
  secretButton,
  translatedStrings,
  spinnerSize,
} from './constants';
import './StaticSecretTemplateView.scss';
import { staticSecretTemplateActions } from '../../../../../components/batch-eval/constants';

const SecretView = ({
  secretViewData,
  getSecretById,
  setPageHeader,
  history,
  secretViewStatus,
  resetSecretData,
  deleteStaticSecretById,
  deleteSecretStatus,
  spinnerOverlay,
  getPwdPoliciesList,
  pwdPoliciesList,
  smEvalData,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openFieldModal, setFieldModal] = useState(false);
  const [fieldTitle, setFieldTitle] = useState('');
  const [fieldData, setFieldData] = useState({});
  const [sstEvalData, setSstEvalData] = useState({});
  const { id } = useParams();
  let spinnerMessage =
    secretViewStatus === RESOURCE_STATUS.LOADING
      ? translatedStrings?.loadingSecretTemplate
      : deleteSecretStatus === RESOURCE_STATUS.LOADING
      ? translatedStrings?.deleteLoadingMessage
      : null;

  useEffect(() => {
    getSecretById(id, history);
    setPageHeader(translatedStrings?.pageTitle, []);
    getPwdPoliciesList();
  }, []);

  useEffect(() => {
    if (!isEmpty(smEvalData)) {
      const { create, update, list, read } = staticSecretTemplateActions;
      setSstEvalData({
        add: smEvalData[create] === ALLOW,
        edit: smEvalData[update] === ALLOW,
        delete: smEvalData[staticSecretTemplateActions?.delete] === ALLOW,
        view: smEvalData[read] === ALLOW,
        list: smEvalData[list] === ALLOW,
      });
    }
  }, [smEvalData]);

  useEffect(() => {
    setPageHeader(translatedStrings?.pageTitle + ' : ' + (secretViewData?.secretType ?? ''), []);
  }, [secretViewData?.secretType]);

  useEffect(() => {
    spinnerOverlay({
      open: spinnerMessage ? true : false,
      size: spinnerSize,
      message: spinnerMessage,
    });
  }, [deleteSecretStatus, secretViewStatus]);

  const buttonChildContainerClass = {
    [classes.buttonChildContainer]: true,
  };

  const viewFieldModal = (data) => {
    setFieldTitle(`${translatedStrings.field} : ${data?.name}`);
    setFieldData(data);
    setFieldModal(true);
  };

  const cancelFieldModal = () => {
    setFieldModal(false);
  };

  const goBackToList = () => {
    history.push(sstListingPath);
    resetSecretData();
  };

  const handleOpenDialog = () => {
    setDeleteTitle(translatedStrings?.deleteSecretTitle);
    setDeleteMessage(translatedStrings?.deleteSecretMsg);
    setOpenDialog(true);
  };

  const onYesClick = () => {
    deleteStaticSecretById(id, history);
    setOpenDialog(false);
  };

  const onNoClick = () => {
    setOpenDialog(false);
  };

  const handleEditClick = () => {
    history.push(`${sstListingPath}/edit/${id}`);
  };

  const handleCloneClick = () => {
    history.push(`${sstListingPath}/clone/${id}`);
  };

  const headerActionButtons = () => {
    return (
      <div className={classes?.buttonMainContainer}>
        <div
          className={classNames({ ...buttonChildContainerClass })}
          data-testid={viewSecretTemplateActionContainerTestId}
        >
          {!secretViewData?.isReadOnly && sstEvalData?.edit ? (
            <Button
              variant={secretButton?.variant}
              size={secretButton?.size}
              onClick={handleEditClick}
            >
              {translatedStrings.editButtonText}
            </Button>
          ) : (
            <Button variant={secretButton.variant} size={secretButton?.size} onClick={goBackToList}>
              {translatedStrings?.closeButtonText}
            </Button>
          )}
          {sstEvalData?.add && (
            <Button
              variant={secretButton?.secVariant}
              size={secretButton?.size}
              onClick={handleCloneClick}
            >
              {translatedStrings.cloneButtonText}
            </Button>
          )}
          {!secretViewData?.isReadOnly && sstEvalData?.delete && (
            <Button
              variant={secretButton?.secVariant}
              size={secretButton?.size}
              onClick={handleOpenDialog}
            >
              {translatedStrings?.deleteButtonText}
            </Button>
          )}
          {sstEvalData?.edit && (
            <Button
              variant={secretButton.secVariant}
              size={secretButton?.size}
              onClick={goBackToList}
            >
              {translatedStrings?.closeButtonText}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const secretDetails = () => {
    return (
      <>
        <div>
          <Typography variant="label2">{translatedStrings?.secretTemplateName}</Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {secretViewData?.secretType || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.description} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {secretViewData?.description || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.secretRotationIntervalView} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {secretViewData?.rotationInterval === 1
                ? translate('NUMBER_OF_DAY')
                : secretViewData?.rotationInterval
                ? translate('NUMBER_OF_DAYS', {
                    days: secretViewData?.rotationInterval,
                  })
                : translatedStrings.naText}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings.passwordPolicy} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {getPwdPolicyName(secretViewData?.passwordPolicyId) || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
      </>
    );
  };

  const getPwdPolicyName = (ID) => {
    if (pwdPoliciesList && pwdPoliciesList.length) {
      const policyName = pwdPoliciesList.find((policy) => (policy.id === ID ? policy.name : ''));
      return policyName ? policyName.name : translatedStrings?.noneText;
    } else {
      return translatedStrings?.noneText;
    }
  };

  const secretFieldContainer = () => {
    return (
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.fields} </Typography>
        <div className={classes?.marginTop8}>
          {
            <SecretFieldsTable
              secretTableData={secretViewData?.parameters}
              onClickViewField={viewFieldModal}
            />
          }
        </div>
      </div>
    );
  };

  const secretViewContainer = () => {
    return (
      <div className={classes?.viewSecretMainContainer}>
        {secretDetails()}
        {secretFieldContainer()}
      </div>
    );
  };

  return (
    <div role={mainRole}>
      {!spinnerMessage && (
        <>
          {headerActionButtons()}
          {secretViewContainer()}
          {openDialog && (
            <DialogPopup
              width={400}
              height={250}
              type={'alert'}
              title={deleteTitle}
              message={deleteMessage}
              primaryButtonText={translatedStrings?.deleteYesLabel}
              secondaryButtonText={translatedStrings?.deleteNoLabel}
              onSubmit={onYesClick}
              onCancel={onNoClick}
            />
          )}
          {openFieldModal && (
            <ModalPopup width={464} title={fieldTitle} onCancel={cancelFieldModal}>
              <SecretFieldDetail fieldData={fieldData} />
            </ModalPopup>
          )}
        </>
      )}
    </div>
  );
};

SecretView.propTypes = {
  secretViewData: PropTypes.object,
  getSecretById: PropTypes.func,
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  secretViewStatus: PropTypes.string,
  resetSecretData: PropTypes.func,
  deleteStaticSecretById: PropTypes.func,
  deleteSecretStatus: PropTypes.string,
  spinnerOverlay: PropTypes.func,
  getPwdPoliciesList: PropTypes.func,
  pwdPoliciesList: PropTypes.object,
  smEvalData: PropTypes.object,
};

export default SecretView;
