import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  actionIconSize,
  alphanumericType,
  classes,
  mainRole,
  pageTitle,
  pinType,
  routeToNameList,
  searchDebounceTime,
  tableColumns,
  translatedStrings,
  backToTopId,
} from './constants';
import Button from 'britive-design-system/core/components/button';
import Tooltip from 'britive-design-system/core/components/tooltip';
import Dialog from 'britive-design-system/core/components/dialog';
import BackToTop from 'britive-design-system/core/components/backToTop';
import { BsTrash } from 'react-icons/bs';
import { FiSliders } from 'react-icons/fi';
import DataTable from '../../../../../components/data-table/DataTable';
import {
  RESOURCE_STATUS,
  typeOfStatus,
  ALLOW,
  ppListingPath,
} from '../../../../../utils/common-constants';
import { passwordPolicyActions } from '../../../../../components/batch-eval/constants';
import './PasswordPoliciesList.scss';
import { IoCopyOutline } from 'react-icons/io5';
import { isEmpty, debounce } from 'lodash';
import { isSuccess } from '../../../../../utils/common-utils';
import classNames from 'classnames';

const PasswordPoliciesList = ({
  setPageHeader,
  getPasswordPolicyList,
  passwordPolicyStatus,
  passwordPolicyData,
  passwordPolicyPagination,
  deletePasswordPolicy,
  deletePasswordPolicyStatus,
  history,
  match,
  resetDeletePasswordPolicy,
  getPasswordPolicyListLoadMore,
  updatePasswordPolicyListSearchTerm,
  passwordPolicySearchTerm,
  smEvalData,
}) => {
  const [passwordPolicyTableData, setPasswordPolicyTableData] = useState([]);
  const [deletePasswordPolicyId, setDeletePasswordPolicyId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwordPolicyEvalData, setPasswordPolicyEvalData] = useState({});
  const tableContainer = useRef(null);
  const loading = passwordPolicyStatus === RESOURCE_STATUS.LOADING;
  const loadingDeletePasswordPolicy = deletePasswordPolicyStatus === RESOURCE_STATUS.LOADING;

  const handlePasswordPolicySearch = useCallback(
    debounce((nextValue) => {
      updatePasswordPolicyListSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getPasswordPolicyList();
    }, searchDebounceTime),
    [] // will be created only once initially
  );

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
    setPageHeader(pageTitle, routeToNameList);
    updatePasswordPolicyListSearchTerm('');
    getPasswordPolicyList();
  }, []);

  useEffect(() => {
    if (isSuccess(deletePasswordPolicyStatus)) {
      getPasswordPolicyList();
    }
  }, [deletePasswordPolicyStatus]);

  useEffect(() => {
    if (passwordPolicySearchTerm) {
      getPasswordPolicyList();
    }
  }, [passwordPolicySearchTerm]);

  const getDisplayTextForBoolean = (value) =>
    value ? translatedStrings.yesText : translatedStrings.noText;

  useEffect(() => {
    if (isSuccess(passwordPolicyStatus)) {
      const tableData = (passwordPolicyData || []).map((passwordPolicy) => {
        return {
          ...passwordPolicy,
          hasUpperCaseChars: !passwordPolicy?.pinLength
            ? getDisplayTextForBoolean(passwordPolicy?.hasUpperCaseChars)
            : translatedStrings.naText,
          hasLowerCaseChars: !passwordPolicy?.pinLength
            ? getDisplayTextForBoolean(passwordPolicy?.hasLowerCaseChars)
            : translatedStrings.naText,
          hasNumbers:
            passwordPolicy?.passwordType === pinType
              ? translatedStrings.yesText
              : getDisplayTextForBoolean(passwordPolicy?.hasNumbers),
          hasSpecialChars: !passwordPolicy?.pinLength
            ? getDisplayTextForBoolean(passwordPolicy?.hasSpecialChars)
            : translatedStrings.naText,
          minPasswordLength:
            passwordPolicy.passwordType === alphanumericType
              ? passwordPolicy.minPasswordLength
              : passwordPolicy.pinLength,
        };
      });
      setPasswordPolicyTableData(tableData);
    }
  }, [passwordPolicyStatus]);

  const noAccessToManagePasswordPolicyClasses = {
    [classes.passwordPolicyTableActionEdit]: true,
    [classes.disabledIcon]: !passwordPolicyEvalData?.view,
  };
  const clonePasswordPolicyClasses = {
    [classes.passwordPolicyTableActionClone]: true,
    [classes.disabledIcon]: !passwordPolicyEvalData?.add,
  };
  const deletePasswordPolicyClasses = {
    [classes.passwordPolicyTableActionDelete]: true,
    [classes.disabledIcon]: !passwordPolicyEvalData?.delete,
  };

  const columns = [
    {
      field: 'name',
      headerName: tableColumns.passwordPolicyName,
      width: '20%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'description',
      headerName: tableColumns.description,
      width: '22%',
      horizontalAlignment: 'left',
    },
    {
      field: 'hasUpperCaseChars',
      headerName: tableColumns.mustIncludeAZ,
      width: '10%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'hasLowerCaseChars',
      headerName: tableColumns.mustIncludeaz,
      width: '10%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'hasNumbers',
      headerName: tableColumns.mustInclude09,
      width: '10%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'hasSpecialChars',
      headerName: tableColumns.mustIncludeSpecialCharacters,
      width: '17%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'minPasswordLength',
      headerName: tableColumns.minimumLength,
      width: '11%',
      horizontalAlignment: 'left',
      sortable: true,
      isNumeric: true,
    },
    {
      headerName: tableColumns.action,
      width: '130px',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        return (
          <div className={classes.passwordPolicyTableActionCell}>
            {/* Will be used when implementation of View Password Policy Page */}
            <div className={classNames({ ...noAccessToManagePasswordPolicyClasses })}>
              <Tooltip
                title={
                  passwordPolicyEvalData?.view
                    ? translatedStrings.manageTooltip
                    : translatedStrings.noAccessToManagePasswordPolicyTooltip
                }
                position="left"
              >
                <div>
                  <FiSliders
                    size={actionIconSize}
                    onClick={() => passwordPolicyEvalData?.view && goToViewPage(row?.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...clonePasswordPolicyClasses })}>
              <Tooltip
                title={
                  passwordPolicyEvalData?.add
                    ? translatedStrings.cloneTooltip
                    : translatedStrings.noAccessToClonePasswordPolicyTooltip
                }
                position="left"
              >
                <div>
                  <IoCopyOutline
                    size={actionIconSize}
                    onClick={() => passwordPolicyEvalData?.add && clonePassPolicy(row?.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...deletePasswordPolicyClasses })}>
              <Tooltip
                title={
                  passwordPolicyEvalData?.delete
                    ? translatedStrings.deleteTooltip
                    : translatedStrings.noAccessToDeletePasswordPolicyTooltip
                }
                position="left"
              >
                <div>
                  <BsTrash
                    size={actionIconSize}
                    onClick={() => {
                      if (passwordPolicyEvalData?.delete) {
                        setDeletePasswordPolicyId(row?.id);
                        setShowDeleteDialog(true);
                      }
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handlePasswordPolicy = () => {
    history.push(`${match?.url}/add`);
  };

  const addPasswordPolicyButton = () => {
    return (
      <div className={classes.addPasswordPolicyButtonContainer}>
        <Button variant="primary" size="medium" onClick={handlePasswordPolicy}>
          {translatedStrings.addPasswordPolicyButton}
        </Button>
      </div>
    );
  };
  const goToViewPage = (id) => {
    resetDeletePasswordPolicy();
    updatePasswordPolicyListSearchTerm('');
    history?.push(`${match?.url}/view/${id}`);
  };
  const clonePassPolicy = (id) => {
    updatePasswordPolicyListSearchTerm('');
    history?.push(`${ppListingPath}/clone/${id}`);
  };
  const loadMoreHandler = () => {
    getPasswordPolicyListLoadMore();
  };

  const passwordPolicyListTable = () => {
    return (
      <>
        <div className={classes.passwordPolicyListContainer} ref={tableContainer}>
          <div data-testid="password-policy-table" className={classes.passwordPolicyTableContainer}>
            <DataTable
              inLineSort={true}
              rows={passwordPolicyTableData}
              columns={columns}
              loading={loading || loadingDeletePasswordPolicy}
              loadingMessage={
                loading
                  ? translatedStrings.passwordPolicyLoadingMessage
                  : translatedStrings.passwordPolicyDeleteLoadingMessage
              }
              loadMoreHandler={loadMoreHandler}
              loadMore={!loading && Boolean(passwordPolicyPagination?.next)}
              searchBar={{
                onSearch: handlePasswordPolicySearch,
                placeholder: translatedStrings.passwordPolicySearchPlaceholder,
              }}
            />
          </div>
        </div>
        <BackToTop id={backToTopId} parentRef={tableContainer} />
      </>
    );
  };

  const deleteDialog = () => {
    return (
      <Dialog
        type={'alert'}
        title={translatedStrings.deletePasswordPolicyDialogTitle}
        message={translatedStrings.deletePasswordPolicyDialogMessage}
        primaryButtonText={translatedStrings.deletePrimaryButton}
        secondaryButtonText={translatedStrings.noText}
        onSubmit={() => {
          setShowDeleteDialog(false);
          deletePasswordPolicy(deletePasswordPolicyId);
          setDeletePasswordPolicyId(null);
        }}
        onCancel={() => {
          setShowDeleteDialog(false);
          setDeletePasswordPolicyId(null);
        }}
      />
    );
  };

  return (
    <div role={mainRole}>
      {passwordPolicyEvalData?.add && addPasswordPolicyButton()}
      {passwordPolicyListTable()}
      {showDeleteDialog && deleteDialog()}
    </div>
  );
};

PasswordPoliciesList.propTypes = {
  setPageHeader: PropTypes.func,
  getPasswordPolicyList: PropTypes.func,
  passwordPolicyStatus: PropTypes.oneOf(typeOfStatus),
  passwordPolicyData: PropTypes.array,
  passwordPolicyPagination: PropTypes.object,
  deletePasswordPolicy: PropTypes.func,
  deletePasswordPolicyStatus: PropTypes.oneOf(typeOfStatus),
  match: PropTypes.any,
  history: PropTypes.any,
  resetDeletePasswordPolicy: PropTypes.func,
  getPasswordPolicyListLoadMore: PropTypes.func,
  updatePasswordPolicyListSearchTerm: PropTypes.func,
  passwordPolicySearchTerm: PropTypes.string,
  smEvalData: PropTypes.object,
};

export default PasswordPoliciesList;
