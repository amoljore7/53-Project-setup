/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import { isError, isSuccess } from '../../../../../../utils/common-utils';
import {
  errorNotificationDuration,
  errorNotificationType,
  typeOfStatus,
} from '../../../../../../utils/common-constants';
import {
  translatedStrings,
  asteriskCount,
  templateParametersKeyPrefix,
  rotationIntervalSuffix,
} from './constants';
import { classes } from '../constants';
import {
  secretUpdatePermissionProperty,
  nodeDeletePermissionProperty,
  allowString,
  translatedStrings as secretsTreeTranslatedStrings,
} from '../secret-tree/constants';
import { resetSecretDetails, resetSecretTemplateDetails } from './action';
import { getRequiredString } from './service';
import { useDispatch } from 'react-redux';
import SecretApprovalModal from '../../../../../my-secrets/modules/secrets/secret-approval-modal/SecretApprovalModal';
import WaitingApprovalDialog from '../../../../../../common-widgets/waiting-approval-dialog/WaitingApprovalDialog';
import {
  translatedStringsForApprovalsModal,
  translatedStringsForWaitingApproval,
  adminSecretListConstants,
} from '../secret-list/constants';
import { translate } from '../../../../externalization/index';
import { adminSecretTreeConstants } from '../secret-tree/constants';

const SecretView = ({
  vaultId,
  secretTemplateDetailsError,
  secretDetailsError,
  secretTemplateDetailsStatus,
  secretDetailsStatus,
  getSecretDetails,
  secretDetails,
  deleteSecret,
  secretTemplateDetails,
  selectedItemAncestors,
  selectedSecretMetadata,
  openNotification,
  history,
}) => {
  const [maskedFields, setMaskedFields] = useState({});
  const [deleteSecretParents, setDeleteSecretParents] = useState(null);
  const [isDeleteSecretDialogOpen, setDeleteSecretDialogOpen] = useState(false);
  const [openWaitingForApprovalDialog, setOpenWaitingForApprovalDialog] = useState(false);
  const [openRequiredApprovalModal, setOpenRequiredApprovalModal] = useState(false);
  const [isFirstTimeApiResponseAvailable, setFirstTimeApiResponseAvailable] = useState(true);
  const [isApiResponseSuccessfull, setApiResponseSuccessfull] = useState(false);
  const [secretViewName, setSecretViewName] = useState('');
  const [approvalMessage, setApprovalMessage] = useState();
  const dispatch = useDispatch();
  const hasEditPermission =
    selectedSecretMetadata &&
    selectedSecretMetadata[secretUpdatePermissionProperty] === allowString;
  const hasDeletePermission =
    selectedSecretMetadata && selectedSecretMetadata[nodeDeletePermissionProperty] === allowString;

  useEffect(() => {
    if (
      selectedItemAncestors[selectedItemAncestors.length - 1].label !== secretDetails?.name ||
      !secretTemplateDetails?.secretType
    ) {
      setSecretViewName(selectedItemAncestors[selectedItemAncestors.length - 1].label);
      getSecretDetails(selectedItemAncestors);
    }
    return () => {
      dispatch(resetSecretTemplateDetails());
      dispatch(resetSecretDetails());
    };
  }, []);

  useEffect(() => {
    secretTemplateDetails?.parameters?.map((item) => {
      setMaskedFields((maskedFields) => {
        return { ...maskedFields, [item.name]: item.mask };
      });
    });
  }, [secretTemplateDetails]);

  useEffect(() => {
    if (isSuccess(secretDetailsStatus) || isSuccess(secretTemplateDetailsStatus)) {
      setApiResponseSuccessfull(true);
    }
    if (isFirstTimeApiResponseAvailable) {
      if (isSuccess(secretDetailsStatus) || isSuccess(secretTemplateDetailsStatus)) {
        setFirstTimeApiResponseAvailable(false);
      } else if (isError(secretDetailsStatus) || isError(secretTemplateDetailsStatus)) {
        setFirstTimeApiResponseAvailable(false);
        if (isError(secretDetailsStatus)) {
          if (
            secretDetailsError?.status === 403 &&
            secretDetailsError?.data?.errorCode ===
              adminSecretListConstants.approvalRequiredErrorCode_11
          ) {
            setApprovalMessage(translatedStringsForApprovalsModal.needApproval);
            setOpenRequiredApprovalModal(true);
            return;
          }
          if (
            secretDetailsError?.status === 403 &&
            secretDetailsError?.data?.errorCode ===
              adminSecretListConstants.pendingSecretErrorCode_10
          ) {
            setApprovalMessage(translatedStringsForWaitingApproval.approvalDialogMessage);
            setOpenWaitingForApprovalDialog(true);
            return;
          }
        }
        const reason = secretDetailsError?.message || secretTemplateDetailsError?.message;
        if (
          secretDetailsError?.data?.errorCode !==
            adminSecretTreeConstants.approvalRequiredErrorCode_11 &&
          secretDetailsError?.data?.errorCode !== adminSecretTreeConstants.pendingSecretErrorCode_10
        ) {
          openNotification(
            errorNotificationType,
            translate('SECRET_DETAILS_MODULE.DETAILS_FAILURE_MESSAGE', { reason }),
            errorNotificationDuration
          );
        }
      }
    }
  }, [secretDetailsStatus, secretTemplateDetailsStatus]);

  const handleApprovalModal = (isApprovalPending) => {
    setOpenRequiredApprovalModal(false);
    isApprovalPending &&
      setApprovalMessage(translatedStringsForWaitingApproval.approvalDialogMessage);
  };

  const clickHandler = (name) => {
    setMaskedFields({ ...maskedFields, [name]: !maskedFields[name] });
  };

  const editHandler = () => {
    const newParents = selectedItemAncestors.slice(1);
    history.push(`/admin/secret-manager/vault/secrets/edit?path=${getRequiredString(newParents)}`);
  };

  const deleteHandler = () => {
    const ancestors = [...selectedItemAncestors];
    setDeleteSecretParents(ancestors);
    setDeleteSecretDialogOpen(true);
  };

  const getDeleteSecretDialog = () => {
    return (
      <DialogPopup
        type="alert"
        title={secretsTreeTranslatedStrings.deleteSecretModalTitle}
        message={secretsTreeTranslatedStrings.deleteSecretModalMessage}
        primaryButtonText={secretsTreeTranslatedStrings.deleteNodeModalPrimaryBtn}
        secondaryButtonText={secretsTreeTranslatedStrings.deleteNodeModalNoBtn}
        onSubmit={() => {
          deleteSecret('secret', deleteSecretParents);
          setDeleteSecretDialogOpen(false);
        }}
        onCancel={() => setDeleteSecretDialogOpen(false)}
      />
    );
  };

  const handleWaitingApprovalDialog = (isOpen) => {
    setOpenWaitingForApprovalDialog(isOpen);
  };

  return (
    <>
      {(secretDetailsError?.data?.errorCode ===
        adminSecretListConstants.approvalRequiredErrorCode_11 ||
        secretDetailsError?.data?.errorCode ===
          adminSecretListConstants.pendingSecretErrorCode_10) &&
        !isApiResponseSuccessfull && (
          <div className={classes.secretDetailsContainer}>
            <div className={classes.secretDetailsMessageContainer}>
              <Typography variant="label2">{approvalMessage}</Typography>
            </div>
          </div>
        )}
      {isApiResponseSuccessfull && (
        <div className={classes.secretDetailsContainer}>
          <div className={classes.detailsActionButtonsContainer}>
            {hasEditPermission ? (
              <div className={classes.detailsActionButtonContainer}>
                <Button variant="primary" onClick={editHandler}>
                  {translatedStrings.editButtonText}
                </Button>
              </div>
            ) : null}
            {hasDeletePermission ? (
              <div className={classes.detailsActionButtonContainer}>
                <Button variant="secondary" onClick={deleteHandler}>
                  {translatedStrings.deleteButtonText}
                </Button>
              </div>
            ) : null}
          </div>
          <div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.nameLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretDetails?.name ?? translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.descriptionLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretDetails?.description
                    ? secretDetails?.description
                    : translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.categoryLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretDetails?.secretNature ?? translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.accessTypeLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretDetails?.secretMode ?? translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.typeLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretTemplateDetails?.secretType ?? translatedStrings.noneValue}
                </Typography>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant="label2"> {translatedStrings.rotationIntervalLabel} </Typography>
              <div className={classes.fieldValueWrapper}>
                <Typography variant="label1">
                  {secretTemplateDetails.rotationInterval ?? translatedStrings.noneValue}
                  {typeof secretTemplateDetails.rotationInterval === 'number'
                    ? `${rotationIntervalSuffix}`
                    : ''}
                </Typography>
              </div>
            </div>
            {secretTemplateDetails?.parameters?.map((item, index) => {
              if (`${item.name}` in secretDetails?.value) {
                return (
                  <div
                    className={classes.fieldWrapper}
                    key={`${templateParametersKeyPrefix}${index}`}
                  >
                    <Typography variant="label2"> {item?.name} </Typography>
                    {item.mask ? (
                      <div className={classes.passwordTypeButtonsWrapper}>
                        <div className={classes.showButtonWrapper}>
                          <Button variant="primary" onClick={() => clickHandler(item.name)}>
                            {maskedFields[item.name]
                              ? translatedStrings.showButtonText
                              : translatedStrings.hideButtonText}
                          </Button>
                        </div>
                      </div>
                    ) : null}
                    <div className={classes.fieldValueWrapper}>
                      <Typography variant="label1">
                        {maskedFields[item.name]
                          ? '*'.repeat(asteriskCount)
                          : secretDetails?.value[item.name]}
                      </Typography>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          {isDeleteSecretDialogOpen && getDeleteSecretDialog()}
        </div>
      )}
      {openWaitingForApprovalDialog && (
        <WaitingApprovalDialog
          handleWaitingApprovalDialog={handleWaitingApprovalDialog}
          translatedStringsForWaitingApproval={translatedStringsForWaitingApproval}
        />
      )}
      {openRequiredApprovalModal && (
        <SecretApprovalModal
          vaultId={vaultId}
          secretName={secretViewName}
          selectedItemAncestors={selectedItemAncestors.slice(0, selectedItemAncestors.length - 1)}
          handleApprovalModal={handleApprovalModal}
          approversDetails={secretDetailsError?.data?.extraInfo}
        />
      )}
    </>
  );
};
SecretView.propTypes = {
  getSecretDetails: PropTypes.func,
  secretDetails: PropTypes.object,
  secretTemplateDetails: PropTypes.object,
  selectedItemAncestors: PropTypes.array,
  selectedSecretMetadata: PropTypes.any,
  history: PropTypes.any,
  deleteSecret: PropTypes.func,
  vaultId: PropTypes.string,
  secretTemplateDetailsError: PropTypes.string,
  secretDetailsError: PropTypes.string,
  secretTemplateDetailsStatus: PropTypes.oneOf(typeOfStatus),
  secretDetailsStatus: PropTypes.oneOf(typeOfStatus),
  openNotification: PropTypes.func,
};
export default SecretView;
