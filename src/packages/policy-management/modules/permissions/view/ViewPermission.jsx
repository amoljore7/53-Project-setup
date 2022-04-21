import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Button from 'britive-design-system/core/components/button';
import ViewPermissionEntity from './view-form/ViewForm';
import ViewPermissionJSON from './view-json/ViewJson';
import { useParams } from 'react-router-dom';
import './ViewPermission.scss';
import {
  classes,
  pageTitle,
  buttonType,
  deletePermissionMsg,
  deletePermissionTitle,
  deleteYesLabel,
  deleteNoLabel,
  switchToJSON,
  switchToEntity,
  defaultModalType,
} from './constants';
import { appsConsumer } from '../add/constants';
import { ALLOW, permissionListingPath } from '../../../../../utils/common-constants';
import { isEmpty } from 'lodash';
import { permissionActions } from '../../../../../components/batch-eval/constants';

const ViewPermission = ({
  history,
  setPageHeader,
  openNotification,
  deletePermission,
  getViewPermissions,
  viewPermissionData,
  viewPermissionStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  deletePermissionStatus,
  policyEvalData,
  consumerListStatus,
  consumerList,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [permissionEvalData, setPermissionEvalData] = useState({});

  const { id: permissionViewID } = useParams();
  useEffect(() => {
    setPageHeader(pageTitle, []);
    getViewPermissions(permissionViewID, history);
  }, []);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setPermissionEvalData({
        add: policyEvalData[permissionActions?.create] === ALLOW,
        edit: policyEvalData[permissionActions?.update] === ALLOW,
        delete: policyEvalData[permissionActions?.delete] === ALLOW,
        view: policyEvalData[permissionActions?.read] === ALLOW,
        list: policyEvalData[permissionActions?.list] === ALLOW,
      });
    }
  }, [policyEvalData]);

  useEffect(() => {
    setPageHeader(pageTitle + ' : ' + (viewPermissionData?.name ?? ''), []);
    viewPermissionData?.consumer === appsConsumer && getApplicationsList();
  }, [viewPermissionData?.name]);

  const editHandler = (id) => {
    history.push(`${permissionListingPath}/edit/${id}`);
  };
  const cloneHandler = (id) => {
    history.push(`${permissionListingPath}/clone/${id}`);
  };

  const EditCloneDeleteCloseBtn = () => {
    return (
      <div className={classes.viewPermissionLeftAction}>
        {!viewPermissionData?.isReadOnly && permissionEvalData?.edit ? (
          <div className={classes.viewPermissionBtnPadding}>
            <Button
              variant={buttonType.primaryBtn}
              size={buttonType.mediumBtn}
              onClick={() => editHandler(permissionViewID)}
            >
              {buttonType.edit}
            </Button>
          </div>
        ) : (
          <div className={classes.viewPermissionBtnPadding}>
            <Button
              variant={buttonType.primaryBtn}
              size={buttonType.mediumBtn}
              onClick={() => history.push(permissionListingPath)}
            >
              {buttonType.close}
            </Button>
          </div>
        )}
        {permissionEvalData?.add && (
          <div className={classes.viewPermissionBtnPadding}>
            <Button
              variant={buttonType.secondaryBtn}
              size={buttonType.mediumBtn}
              onClick={() => cloneHandler(permissionViewID)}
            >
              {buttonType.clone}
            </Button>
          </div>
        )}

        {!viewPermissionData?.isReadOnly && permissionEvalData?.delete && (
          <div className={classes.viewPermissionBtnPadding}>
            <Button
              variant={buttonType.secondaryBtn}
              size={buttonType.mediumBtn}
              onClick={() => setShowDeleteModal(true)}
            >
              {buttonType.delete}
            </Button>
          </div>
        )}
        {!viewPermissionData?.isReadOnly && permissionEvalData?.edit && (
          <div className={classes.viewPermissionBtnPadding}>
            <Button
              variant={buttonType.secondaryBtn}
              size={buttonType.mediumBtn}
              onClick={() => history.push(permissionListingPath)}
            >
              {buttonType.close}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const SwitchBtn = () => {
    return (
      <div className={classes.viewPermissionRightAction}>
        <Button
          variant={buttonType.secondaryBtn}
          size={buttonType.mediumBtn}
          onClick={() => {
            setIsForm(!isForm);
          }}
        >
          {isForm ? switchToJSON : switchToEntity}
        </Button>
      </div>
    );
  };
  const AddPermissionButtonHeader = () => {
    return (
      <div className={classes.viewPermissionButtonContainer}>
        <EditCloneDeleteCloseBtn />
        <SwitchBtn />
      </div>
    );
  };

  const GetDeleteModal = () => {
    return (
      <DialogPopup
        type={defaultModalType}
        title={deletePermissionTitle}
        message={deletePermissionMsg}
        primaryButtonText={deleteYesLabel}
        secondaryButtonText={deleteNoLabel}
        onSubmit={() => {
          setShowDeleteModal(false);
          deletePermission(permissionViewID, history);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    );
  };

  return (
    <>
      <AddPermissionButtonHeader />
      {showDeleteModal && <GetDeleteModal />}
      <div className={classes.viewPermissionJSONFormContainer}>
        {isForm ? (
          <ViewPermissionEntity
            viewPermissionData={viewPermissionData}
            viewPermissionStatus={viewPermissionStatus}
            deletePermissionStatus={deletePermissionStatus}
            applicationsListData={applicationsListData}
            applicationsListStatus={applicationsListStatus}
            consumerListStatus={consumerListStatus}
            consumerList={consumerList}
          />
        ) : (
          <ViewPermissionJSON
            openNotification={openNotification}
            deletePermissionStatus={deletePermissionStatus}
            viewPermissionData={viewPermissionData}
            viewPermissionStatus={viewPermissionStatus}
          />
        )}
      </div>
    </>
  );
};

ViewPermission.propTypes = {
  history: PropTypes.any,
  setPageHeader: PropTypes.func,
  deletePermission: PropTypes.func,
  openNotification: PropTypes.any,
  getViewPermissions: PropTypes.any,
  viewPermissionData: PropTypes.object,
  viewPermissionStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.object,
  applicationsListStatus: PropTypes.string,
  deletePermissionStatus: PropTypes.string,
  policyEvalData: PropTypes.object,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};
export default ViewPermission;
