import React, { useEffect, useState } from 'react';
import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import ModalPopup from 'britive-design-system/core/components/modal-popup';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { roleActions } from '../../../../../components/batch-eval/constants';
import {
  ALLOW,
  medium,
  roleListingPath,
  successNotificationDuration,
  successNotificationType,
  smallModalPopupWidth,
} from '../../../../../utils/common-constants';
import { isLoading } from '../../../../../utils/common-utils';
import {
  classes,
  mainRole,
  roleButton,
  translatedStrings,
  viewRoleButtonTestId,
} from './constants';
import RolePermissionDetail from './role-modal/RolePermissionDetail';
import RolePermissionTable from './role-modal/RolePermissionTable';
import './RolesView.scss';

const massageRoleData = (data) => {
  const tempData = { ...data };
  delete tempData.id;
  const tempPermission = tempData?.permissions?.map((permission) => {
    delete permission?.id;
    return permission;
  });
  tempData.permissions = tempPermission;
  return tempData;
};

const RolesView = ({
  roleViewData,
  openNotification,
  getRoleById,
  deleteRoleById,
  setPageHeader,
  history,
  roleViewStatus,
  policyEvalData,
  getApplicationsList,
  applicationsListData,
  initSpinnerOverlay,
  resetRoleById,
  consumerListStatus,
  consumerList,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openRoleModal, setRoleModal] = useState(false);
  const [permissionTitle, setPermissionTitle] = useState('');
  const [permissionData, setPermissionData] = useState({});
  const [rolesEvaluatedData, setRolesEvaluatedData] = useState({});
  const [rolesJsonData, setRolesJsonData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getApplicationsList();
    getRoleById(id, history);
    setPageHeader(translatedStrings?.pageTitle, []);
  }, []);

  useEffect(() => {
    setPageHeader(translatedStrings?.pageTitle + ': ' + (roleViewData?.name ?? ''), []);
    setRolesJsonData(massageRoleData(roleViewData));
  }, [roleViewData?.name]);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setRolesEvaluatedData({
        add: policyEvalData[roleActions?.create] === ALLOW,
        edit: policyEvalData[roleActions?.update] === ALLOW,
        delete: policyEvalData[roleActions?.delete] === ALLOW,
        view: policyEvalData[roleActions?.read] === ALLOW,
        list: policyEvalData[roleActions?.list] === ALLOW,
      });
    }
  }, [policyEvalData]);

  useEffect(() => {
    initSpinnerOverlay({
      open: isLoading(roleViewStatus) || isLoading(consumerListStatus),
      size: medium,
      message: translatedStrings.roleLoadingMessage,
    });
  }, [roleViewStatus, consumerListStatus]);

  const buttonChildContainerClass = {
    [classes.buttonChildContainer]: true,
    [classes.buttonChildContainerReadOnly]: roleViewData?.isReadOnly || !rolesEvaluatedData?.edit,
  };

  const handleOpenModal = () => {
    setDeleteTitle(translatedStrings?.deleteRoleText);
    setDeleteMessage(translatedStrings?.deleteMessagePost);
    setOpenModal(true);
  };
  const onYesClick = () => {
    deleteRoleById(id, history);
    setOpenModal(false);
  };

  const onNoClick = () => {
    setOpenModal(false);
  };

  const viewRoleModal = (data) => {
    setPermissionTitle(`${translatedStrings?.permission} : ${data?.name}`);
    setPermissionData(data);
    setRoleModal(true);
  };
  const cancelRoleModal = () => {
    setRoleModal(false);
  };
  const goBackToList = () => {
    resetRoleById();
    history.push(roleListingPath);
  };

  const handleEditClick = () => {
    history.push(`${roleListingPath}/edit/${id}`);
  };

  const handleCloneClick = () => {
    history.push(`${roleListingPath}/clone/${id}`);
  };

  const formJsonViewHandler = () => {
    setIsForm((isForm) => !isForm);
  };

  const ViewRoleActionButtons = () => {
    return (
      <div className={classes?.buttonMainContainer}>
        <div
          className={classNames({ ...buttonChildContainerClass })}
          data-testid={viewRoleButtonTestId}
        >
          {!roleViewData?.isReadOnly && rolesEvaluatedData?.edit && (
            <Button variant={roleButton.variant} size={roleButton?.size} onClick={handleEditClick}>
              {translatedStrings.editButtonText}
            </Button>
          )}

          {rolesEvaluatedData?.add && (
            <Button
              variant={roleButton.secVariant}
              size={roleButton?.size}
              onClick={handleCloneClick}
            >
              {translatedStrings.cloneButtonText}
            </Button>
          )}

          {!roleViewData?.isReadOnly && rolesEvaluatedData?.delete && (
            <Button
              variant={roleButton?.secVariant}
              size={roleButton?.size}
              onClick={handleOpenModal}
            >
              {translatedStrings?.deleteButtonText}
            </Button>
          )}
          <Button
            variant={
              roleViewData?.isReadOnly || !rolesEvaluatedData?.edit
                ? roleButton.variant
                : roleButton.secVariant
            }
            size={roleButton?.size}
            onClick={goBackToList}
          >
            {translatedStrings?.closeButtonText}
          </Button>
        </div>
        <div>
          <Button
            variant={roleButton?.secVariant}
            size={roleButton?.size}
            onClick={formJsonViewHandler}
          >
            {isForm
              ? translatedStrings?.viewJsonButtonText
              : translatedStrings?.viewEntityButtonText}
          </Button>
        </div>
      </div>
    );
  };
  const ViewRoles = () => {
    return (
      <React.Fragment>
        <div>
          <Typography variant="label2"> {translatedStrings?.roleName} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {roleViewData?.name || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
        <div className={classes?.marginTop32}>
          <Typography variant="label2"> {translatedStrings?.description} </Typography>
          <div className={classes?.marginTop8}>
            <Typography variant="label1">
              {roleViewData?.description || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const ViewPermissions = () => {
    return (
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.permission} </Typography>
        <div className={classes?.marginTop8}>
          {
            <RolePermissionTable
              permissionTableData={roleViewData?.permissions}
              onClickViewPermission={viewRoleModal}
              applicationsListData={applicationsListData}
              consumerList={consumerList}
            />
          }
        </div>
      </div>
    );
  };

  const ViewRoleData = () => {
    return (
      <div className={classes?.viewRoleMainContainer}>
        {<ViewRoles />}
        {<ViewPermissions />}
      </div>
    );
  };

  const jsonTextAreaClasses = {
    [classes.marginTop8]: true,
    [classes.viewRoleJsonTextarea]: true,
  };

  const ViewJsonData = () => {
    return (
      <div className={classes?.viewRoleMainContainer}>
        <Button
          variant={roleButton?.secVariant}
          size={roleButton?.size}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(roleViewData, undefined, 4));
            openNotification({
              open: true,
              type: successNotificationType,
              title: translatedStrings?.copyMessage,
              duration: successNotificationDuration,
            });
          }}
        >
          {translatedStrings?.copyText}
        </Button>
        <div className={classNames({ ...jsonTextAreaClasses })}>
          <Typography variant="label2"> {translatedStrings?.roleJsonText} </Typography>
          <Textarea
            height="64vh"
            value={JSON.stringify(rolesJsonData, undefined, 4)}
            readOnly={true}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div role={mainRole} className={classes.viewRoleOuterWrapper}>
      {!isLoading(roleViewStatus) && (
        <>
          {<ViewRoleActionButtons />}
          {isForm ? <ViewRoleData /> : <ViewJsonData />}
          {openModal && (
            <DialogPopup
              width={400}
              height={250}
              type={'alert'}
              title={deleteTitle}
              message={deleteMessage}
              primaryButtonText={translatedStrings?.yesDeleteLabel}
              secondaryButtonText={translatedStrings?.noLabel}
              onSubmit={onYesClick}
              onCancel={onNoClick}
            />
          )}
          {openRoleModal && (
            <ModalPopup
              width={smallModalPopupWidth}
              title={permissionTitle}
              onCancel={cancelRoleModal}
            >
              <RolePermissionDetail
                permissionData={permissionData}
                applicationsListData={applicationsListData}
              />
            </ModalPopup>
          )}
        </>
      )}
    </div>
  );
};

RolesView.propTypes = {
  roleViewData: PropTypes.object,
  getRoleById: PropTypes.func,
  deleteRoleById: PropTypes.func,
  setPageHeader: PropTypes.func,
  openNotification: PropTypes.func,
  match: PropTypes.any,
  history: PropTypes.any,
  roleViewStatus: PropTypes.string,
  policyEvalData: PropTypes.object,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  initSpinnerOverlay: PropTypes.func,
  resetRoleById: PropTypes.func,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};

export default RolesView;
