import Button from 'britive-design-system/core/components/button';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Spinner from 'britive-design-system/core/components/spinner';
import Tooltip from 'britive-design-system/core/components/tooltip';
import Typography from 'britive-design-system/core/components/typography';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import DataTable from '../../../../../../components/data-table/DataTable';
import { RESOURCE_STATUS, typeOfStatus } from '../../../../../../utils/common-constants';
import { isSuccess, isError } from '../../../../../../utils/common-utils';
import { getSecretStatus } from '../../utils';
import { classes } from '../constants';
import {
  classes as secretViewClasses,
  copyNotificationTime,
  iconSize,
  maskedRepeatCount,
  searchDebounceTime,
  secretListConstants,
  templateKey,
  translatedStrings,
  translatedStringsForApprovalsModal,
  translatedStringsForWaitingApproval,
} from './constants';
import './MySecretList.scss';
import SecretApprovalModal from '../../secret-approval-modal/SecretApprovalModal';
import WaitingApprovalDialog from '../../../../../../common-widgets/waiting-approval-dialog/WaitingApprovalDialog';
import {
  errorNotificationDuration,
  errorNotificationType,
} from '../../../../../../utils/common-constants';
import { translate } from '../../../../externalization';

const SecretList = ({
  secretListLoading,
  getSecretList,
  secretListData,
  secretListPagination,
  selectedItemAncestors,
  vaultId,
  getSecretDetails,
  secretDetailStatus,
  secretDetailData,
  secretTemplateDetailStatus,
  secretTemplateDetailError,
  secretTemplateData,
  openNotification,
  getSecretLoadMoreList,
  updateSecretListSearchTerm,
  secretSearchTerm,
  secretDetailError,
  resetSecretDetails,
}) => {
  const [secretTableData, setSecretTableData] = useState([]);
  const [openViewSecretModal, setOpenViewSecretModal] = useState(false);
  const [secretViewName, setSecretViewName] = useState('');
  const [maskedFields, setMaskedFields] = useState({});
  const [openWaitingForApprovalDialog, setOpenWaitingForApprovalDialog] = useState(false);
  const [openRequiredApprovalModal, setOpenRequiredApprovalModal] = useState(false);
  const [isApprovalPendingAfterApprovalSent, setIsApprovalPendingAfterApprovalSent] = useState();
  const [approversDetails, setApproversDetails] = useState(secretDetailError?.data?.extraInfo);
  const [clickedSecret, setClickedSecret] = useState();
  const [isSearchEmpty, setSearchEmpty] = useState(false);

  const handleSecretSearch = useCallback(
    debounce((nextValue) => {
      updateSecretListSearchTerm(nextValue);
      setSearchEmpty(!nextValue);
      /* To make get all call for empty search value */
      !nextValue && getSecretList(selectedItemAncestors.slice(1));
    }, searchDebounceTime),
    [] // will be created only once initially
  );

  useEffect(() => {
    if (!isEmpty(vaultId)) {
      updateSecretListSearchTerm('');
      setSearchEmpty(true);
      getSecretList(selectedItemAncestors.slice(1));
    }
  }, [selectedItemAncestors, vaultId]);

  useEffect(() => {
    if (isSuccess(secretDetailStatus) && isSuccess(secretTemplateDetailStatus)) {
      setOpenViewSecretModal(true);
    } else if (isError(secretDetailStatus) || isError(secretTemplateDetailStatus)) {
      if (isError(secretDetailStatus)) {
        if (
          secretDetailError?.status === 403 &&
          secretDetailError?.data?.errorCode === secretListConstants.approvalRequiredErrorCode_11
        ) {
          setOpenRequiredApprovalModal(true);
          setApproversDetails(secretDetailError?.data?.extraInfo);
          return;
        }
        if (
          secretDetailError?.status === 403 &&
          secretDetailError?.data?.errorCode === secretListConstants.pendingSecretErrorCode_10
        ) {
          if (isApprovalPendingAfterApprovalSent) {
            setOpenWaitingForApprovalDialog(false);
            return;
          }
          setOpenWaitingForApprovalDialog(true);
          return;
        }
      }
      const reason = secretDetailError?.message || secretTemplateDetailError?.message;
      openNotification(
        errorNotificationType,
        translate('SECRETS_MODULE.DETAILS_FAILURE_MESSAGE', { reason }),
        errorNotificationDuration
      );
    }
  }, [secretDetailStatus, secretTemplateDetailStatus, isApprovalPendingAfterApprovalSent]);

  useEffect(() => {
    if (secretSearchTerm) {
      getSecretList(selectedItemAncestors.slice(1));
    }
  }, [secretSearchTerm]);

  useEffect(() => {
    const tableData = secretListData.map((secret) => {
      const { name, description, path, status } = secret;
      return {
        name,
        description,
        path,
        status: getSecretStatus(status),
      };
    });
    setSecretTableData(tableData);
  }, [secretListData]);

  useEffect(() => {
    if (!isEmpty(secretTemplateData)) {
      secretTemplateData?.parameters.forEach((templateData) => {
        setMaskedFields((maskedFields) => {
          return { ...maskedFields, [templateData.name]: templateData.mask };
        });
      });
    }
  }, [secretTemplateData]);

  useEffect(() => {
    if (
      secretDetailStatus === RESOURCE_STATUS.ERROR ||
      secretTemplateDetailStatus === RESOURCE_STATUS.ERROR
    ) {
      // Close the Secret Detail Modal if API gets error
      setOpenViewSecretModal(false);
      resetSecretDetails();
    }
  }, [secretDetailStatus, secretTemplateDetailStatus]);

  const secretsColumns = [
    {
      width: '25%',
      field: 'name',
      headerName: translatedStrings.secretsNameColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '27%',
      field: 'description',
      headerName: translatedStrings.secretsDescriptionColumnHeader,
      horizontalAlignment: 'left',
    },
    {
      width: '30%',
      field: 'path',
      headerName: translatedStrings.secretsPathColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      width: '18%',
      field: 'status',
      headerName: translatedStrings.secretsStatusColumnHeader,
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      headerName: translatedStrings.secretsActionColumnHeader,
      width: '152px',
      renderColumn: (row) => {
        const { status, path, name } = row;
        return (
          <div className={classes.secretsEyeIcon}>
            {status !== secretListConstants.accessDenyText ? (
              <Tooltip
                title={translatedStrings.viewSecretTooltip}
                position={secretListConstants.leftText}
              >
                <div>
                  <BsEye
                    onClick={() => {
                      resetSecretDetails();
                      getSecretDetails(path, {});
                      setSecretViewName(name);
                      setIsApprovalPendingAfterApprovalSent();
                      //clickedSecret will store appropriate array for path to the secret which is clicked
                      const clickedSecret = [];
                      const pathArray = path.split('/');
                      for (let i = 0; i < pathArray.length; i++) {
                        clickedSecret.push({ label: pathArray[i] });
                      }
                      clickedSecret.splice(-1, 1);
                      setClickedSecret(clickedSecret);
                    }}
                    size={iconSize}
                    data-testid="view-icon"
                  />
                </div>
              </Tooltip>
            ) : (
              <>
                <Tooltip
                  title={translatedStrings.accessDeniedText}
                  position={secretListConstants.leftText}
                >
                  <div>
                    <BsEye className={secretViewClasses.disabledIcon} size={iconSize} />
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const copyAllHandler = () => {
    const secretData = [
      `${translatedStrings.secretNameLabel} = ${secretDetailData?.name}`,
      `${translatedStrings.secretDescriptionLabel} = ${
        secretDetailData?.description || translatedStrings.noneText
      }`,
    ];
    for (const name in secretDetailData?.value) {
      secretData.push(`${name} = ${secretDetailData?.value[name]}`);
    }
    const secretDataString = secretData.join('\n');
    navigator.clipboard.writeText(secretDataString);
    openNotification(
      secretListConstants.successText,
      translatedStrings.copyNotificationMessage,
      copyNotificationTime
    );
  };

  const onCloseHandler = () => {
    setSecretViewName('');
    setOpenViewSecretModal(false);
    resetSecretDetails();
  };

  const secretViewActionButtons = [
    {
      text: translatedStrings.copyAllText,
      variant: secretListConstants.priVariant,
      onClick: copyAllHandler,
      size: secretListConstants.largeSize,
    },
    {
      text: translatedStrings.closeText,
      variant: secretListConstants.secVariant,
      onClick: onCloseHandler,
      size: secretListConstants.largeSize,
    },
  ];

  const secretViewModal = () => {
    return (
      <ModalPopup
        width={secretListConstants.secretViewModalWidth}
        title={secretViewName}
        buttons={secretViewActionButtons}
        onCancel={onCloseHandler}
      >
        {secretViewDetails()}
      </ModalPopup>
    );
  };

  const secretViewDetails = () => {
    return (
      <>
        {secretDetailStatus === RESOURCE_STATUS.LOADING ||
        secretTemplateDetailStatus === RESOURCE_STATUS.LOADING ? (
          <div className={secretViewClasses.secretViewLoader}>
            <Spinner
              size={secretListConstants.mediumSize}
              message={translatedStrings.secretDetailLoadingMessage}
            />
          </div>
        ) : (
          <div className={secretViewClasses.secretViewLayout}>
            <div className={secretViewClasses.secretViewSpacing}>
              <div className={secretViewClasses.secretViewLabel}>
                <Typography variant="label2">{translatedStrings.secretNameLabel}</Typography>
              </div>
              <div className={secretViewClasses.secretViewValue}>
                <Typography variant="label1">{secretDetailData?.name}</Typography>
              </div>
            </div>
            <div className={secretViewClasses.secretViewSpacing}>
              <div className={secretViewClasses.secretViewLabel}>
                <Typography variant="label2">{translatedStrings.secretDescriptionLabel}</Typography>
              </div>
              <div className={secretViewClasses.secretViewValue}>
                <Typography variant="label1">
                  {secretDetailData?.description || translatedStrings.noneText}
                </Typography>
              </div>
            </div>
            {!isEmpty(secretTemplateData) && getDynamicFieldsLayout()}
          </div>
        )}
      </>
    );
  };

  const maskedButtonHandler = (name) => {
    setMaskedFields({ ...maskedFields, [name]: !maskedFields[name] });
  };

  const getDynamicFieldsLayout = () => {
    return secretTemplateData?.parameters.map((templateData, index) => {
      if (templateData?.name in secretDetailData?.value) {
        // If the parameters are present in the secret details as well then only will display it
        return (
          <div key={`${templateKey}${index}`} className={secretViewClasses.secretViewSpacing}>
            <div className={secretViewClasses.secretViewLabel}>
              <Typography variant="label2">{templateData?.name}</Typography>
            </div>
            <div className={secretViewClasses.secretViewValue}>
              {templateData?.mask ? getMaskedActionButtons(templateData) : null}
              <Typography variant="label1">
                {maskedFields[templateData?.name]
                  ? '*'.repeat(maskedRepeatCount)
                  : secretDetailData?.value[templateData?.name]}
              </Typography>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  const copyHandler = (templateData) => {
    navigator.clipboard.writeText(secretDetailData?.value[templateData?.name]);
    openNotification(
      secretListConstants.successText,
      translatedStrings.copyNotificationMessage,
      copyNotificationTime
    );
  };

  const getMaskedActionButtons = (templateData) => {
    return (
      <div className={secretViewClasses.maskedActionButtons}>
        <div className={secretViewClasses.showButton}>
          <Button
            variant={secretListConstants.priVariant}
            onClick={() => maskedButtonHandler(templateData?.name)}
          >
            {maskedFields[templateData?.name]
              ? translatedStrings.showText
              : translatedStrings.hideText}
          </Button>
        </div>
        <Button variant={secretListConstants.secVariant} onClick={() => copyHandler(templateData)}>
          {translatedStrings.copyText}
        </Button>
      </div>
    );
  };

  const loadMoreHandler = () => {
    getSecretLoadMoreList(selectedItemAncestors.slice(1));
  };

  const handleApprovalModal = (isApprovalPending) => {
    setOpenRequiredApprovalModal(false);
    if (isApprovalPending) {
      setIsApprovalPendingAfterApprovalSent(isApprovalPending);
      getSecretList(selectedItemAncestors.slice(1));
    }
  };

  const handleWaitingApprovalDialog = (isOpen) => {
    setOpenWaitingForApprovalDialog(isOpen);
  };

  return (
    <div data-testid="all-secrets-table" className={classes.secretsTabTableContainer}>
      <DataTable
        inLineSort={true}
        rows={secretTableData}
        columns={secretsColumns}
        loading={secretListLoading}
        loadingMessage={translatedStrings.secretsLoadingMessage}
        loadMoreHandler={loadMoreHandler}
        loadMore={!secretListLoading && Boolean(secretListPagination?.next)}
        searchBar={{
          onSearch: handleSecretSearch,
          placeholder: translatedStrings.searchPlaceholderText,
          isSearchEmpty: isSearchEmpty,
        }}
      ></DataTable>
      {openViewSecretModal && secretViewModal()}
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
          selectedItemAncestors={clickedSecret}
          handleApprovalModal={handleApprovalModal}
          approversDetails={approversDetails}
          translatedStringsForApprovalsModal={translatedStringsForApprovalsModal}
        />
      )}
    </div>
  );
};

SecretList.propTypes = {
  secretListLoading: PropTypes.bool,
  getSecretList: PropTypes.func,
  secretListData: PropTypes.array,
  secretListPagination: PropTypes.func,
  selectedItemAncestors: PropTypes.array,
  vaultId: PropTypes.string,
  getSecretDetails: PropTypes.func,
  secretDetailStatus: PropTypes.oneOf(typeOfStatus),
  secretDetailData: PropTypes.object,
  secretTemplateDetailStatus: PropTypes.oneOf(typeOfStatus),
  secretTemplateData: PropTypes.object,
  openNotification: PropTypes.func,
  getSecretLoadMoreList: PropTypes.func,
  updateSecretListSearchTerm: PropTypes.func,
  secretSearchTerm: PropTypes.string,
  getUsersStatus: PropTypes.oneOf(typeOfStatus),
  initSpinnerOverlay: PropTypes.func,
  secretDetailError: PropTypes.any,
  secretTemplateDetailError: PropTypes.any,
  getGroupsStatus: PropTypes.oneOf(typeOfStatus),
  selectionHandler: PropTypes.func,
  resetSecretDetails: PropTypes.func,
};

export default SecretList;
