import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS, ALLOW } from '../../../../../utils/common-constants';
import DialogPopup from 'britive-design-system/core/components/dialog';
import DataTable from '../../../../../components/data-table/DataTable';
import BackToTop from 'britive-design-system/core/components/backToTop';
import { FiSliders } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import Button from 'britive-design-system/core/components/button';
import Tooltip from 'britive-design-system/core/components/tooltip';
import './StaticSecretTemplateListing.scss';
import { isEmpty, debounce } from 'lodash';
import { staticSecretTemplateActions } from '../../../../../components/batch-eval/constants';
import classNames from 'classnames';
import {
  classes,
  translateStrings,
  routeToNameList,
  defaultBtnSize,
  searchDebounceTime,
  defaultModalType,
  tableColumns,
  addSecret,
  backToTopId,
} from './constants';

const StaticSecretTemplateListing = ({
  history,
  match,
  setPageHeader,
  getStaticSecretTableList,
  tableList,
  tableStatus,
  deleteStaticSecret,
  deleteStaticSecretStatus,
  tablePagination,
  updateStaticSecretTemplateListSearchTerm,
  tableSearchTerm,
  getStaticSecretTableLoadMoreList,
  smEvalData,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [staticSecretList, setStaticSecretList] = useState([]);
  const [sstEvalData, setSstEvalData] = useState({});
  const handleStaticSecretSearch = useCallback(
    debounce((nextValue) => {
      updateStaticSecretTemplateListSearchTerm(nextValue);
      /* To make get all call for empty search value */
      !nextValue && getStaticSecretTableList();
    }, searchDebounceTime),
    []
  );
  const tableContainer = useRef(null);
  const loading = tableStatus == RESOURCE_STATUS.LOADING;
  const deleteLoading = deleteStaticSecretStatus == RESOURCE_STATUS.LOADING;

  useEffect(() => {
    if (!isEmpty(smEvalData)) {
      const { create, read, update, list } = staticSecretTemplateActions;
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
    setPageHeader(translateStrings.pageTitle, routeToNameList);
    updateStaticSecretTemplateListSearchTerm('');
    getStaticSecretTableList();
  }, []);

  useEffect(() => {
    if (tableStatus === RESOURCE_STATUS.SUCCESS) {
      const staticSecrets = tableList?.map((secret) => {
        return {
          id: secret.id,
          name: secret.secretType,
          description: secret.description,
          rotationInterval: secret.rotationInterval || translateStrings.naText,
        };
      });
      setStaticSecretList(staticSecrets);
    }
  }, [tableStatus]);

  useEffect(() => {
    if (tableSearchTerm) {
      getStaticSecretTableList();
    }
  }, [tableSearchTerm]);

  const viewHandler = (id) => {
    updateStaticSecretTemplateListSearchTerm('');
    history.push(match.url + `/view/${id}`);
  };
  const cloneHandler = (id) => {
    updateStaticSecretTemplateListSearchTerm('');
    history.push(match.url + `/clone/${id}`);
  };

  const noAccessToManageSSTClasses = {
    [classes.staticSecretActionEdit]: true,
    [classes.disabledIcon]: !sstEvalData?.view,
  };
  const cloneSSTClasses = {
    [classes.staticSecretActionCopy]: true,
    [classes.disabledIcon]: !sstEvalData?.add,
  };

  const columns = [
    {
      field: 'name',
      headerName: tableColumns.staticSecretName,
      width: '30%',
      horizontalAlignment: 'left',
      sortable: true,
    },
    {
      field: 'description',
      headerName: tableColumns.description,
      width: '45%',
      horizontalAlignment: 'left',
    },
    {
      field: 'rotationInterval',
      headerName: tableColumns.rotationInterval,
      width: '25%',
      horizontalAlignment: 'left',
      sortable: true,
      isNumeric: true,
    },
    {
      headerName: tableColumns.action,
      width: '130px',
      horizontalAlignment: 'left',
      // eslint-disable-next-line react/display-name
      renderColumn: (row) => {
        const { isReadOnly } = row;
        const deleteSSTClasses = {
          [classes.staticSecretActionDelete]: true,
          [classes.disabledIcon]: !sstEvalData?.delete || isReadOnly,
        };
        return (
          <div className={classes.staticSecretActionItems}>
            <div className={classNames({ ...noAccessToManageSSTClasses })}>
              <Tooltip
                title={
                  sstEvalData?.view
                    ? translateStrings.manageTooltip
                    : translateStrings.noAccessToManageSstTooltip
                }
                position="left"
              >
                <div>
                  <FiSliders
                    size={defaultBtnSize}
                    onClick={() => sstEvalData?.view && viewHandler(row?.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...cloneSSTClasses })}>
              <Tooltip
                title={
                  sstEvalData?.add
                    ? translateStrings.cloneTooltip
                    : translateStrings.noAccessToCloneSstTooltip
                }
                position="left"
              >
                <div>
                  <IoCopyOutline
                    size={defaultBtnSize}
                    onClick={() => sstEvalData?.add && cloneHandler(row.id)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={classNames({ ...deleteSSTClasses })}>
              <Tooltip
                title={
                  isReadOnly
                    ? translateStrings.disabledDeleteTooltip
                    : sstEvalData?.delete
                    ? translateStrings.deleteTooltip
                    : translateStrings.noAccessToDeleteSstTooltip
                }
                position="left"
              >
                <div>
                  <BsTrash
                    size={defaultBtnSize}
                    onClick={() => {
                      if (!isReadOnly && sstEvalData?.delete) {
                        setShowDeleteDialog(true);
                        setDeleteID(row.id);
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

  const loadMoreHandler = () => {
    getStaticSecretTableLoadMoreList();
  };

  const staticSecretListTable = () => {
    return (
      <>
        <div
          data-testid="secret-template-table"
          className={classes.staticSecretTableListingContainer}
        >
          <DataTable
            inLineSort={true}
            rows={staticSecretList}
            columns={columns}
            loading={loading || deleteLoading}
            loadingMessage={
              loading ? translateStrings.loadingMessage : translateStrings.deleteLoadingMessage
            }
            loadMoreHandler={loadMoreHandler}
            loadMore={tableStatus !== RESOURCE_STATUS.LOADING && Boolean(tablePagination?.next)}
            searchBar={{
              onSearch: handleStaticSecretSearch,
              placeholder: translateStrings.staticSecretSearchText,
            }}
          />
        </div>
        {showDeleteDialog && (
          <DialogPopup
            type={defaultModalType}
            title={translateStrings.deleteSecretTitle}
            message={translateStrings.deleteSecretMsg}
            primaryButtonText={translateStrings.deleteYesLabel}
            secondaryButtonText={translateStrings.deleteNoLabel}
            onSubmit={() => {
              setShowDeleteDialog(false);
              deleteStaticSecret(deleteID, history);
              setDeleteID(null);
            }}
            onCancel={() => {
              setShowDeleteDialog(false);
              setDeleteID(null);
            }}
          />
        )}
      </>
    );
  };

  const clickHandler = () => {
    history.push(match.url + '/add');
  };

  const addStaticSecretBtn = () => {
    return (
      <div className={classes.addSecretBtn} role={classes.addSecretBtnTestId}>
        <Button size={addSecret.size} onClick={clickHandler}>
          {translateStrings.addSecretTxt}
        </Button>
      </div>
    );
  };
  return (
    <>
      {sstEvalData?.add && addStaticSecretBtn()}
      <div className={classes.staticSecretListContainer} ref={tableContainer}>
        {staticSecretListTable()}
      </div>
      <BackToTop id={backToTopId} parentRef={tableContainer} />
    </>
  );
};

StaticSecretTemplateListing.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  deleteStaticSecret: PropTypes.func,
  setPageHeader: PropTypes.func,
  getStaticSecretTableList: PropTypes.func,
  tableList: PropTypes.array,
  tableStatus: PropTypes.string,
  deleteStaticSecretStatus: PropTypes.string,
  tablePagination: PropTypes.object,
  updateStaticSecretTemplateListSearchTerm: PropTypes.func,
  tableSearchTerm: PropTypes.string,
  getStaticSecretTableLoadMoreList: PropTypes.func,
  smEvalData: PropTypes.object,
};
export default StaticSecretTemplateListing;
