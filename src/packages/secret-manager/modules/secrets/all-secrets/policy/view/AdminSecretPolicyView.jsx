import Button from 'britive-design-system/core/components/button';
import DialogPopup from 'britive-design-system/core/components/dialog';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import {
  ALLOW,
  allSecretsPath,
  deletePolicyAction,
  editSMPolicyPath,
  medium,
  smallModalPopupWidth,
  successNotificationDuration,
} from '../../../../../../../utils/common-constants';
import {
  allowStatus,
  approvalLabels,
  classes,
  conditionsLabels,
  denyStatus,
  disabledPolicy,
  editPolicyAction,
  enabledPolicy,
  getTogglePolicyConfirmMessage,
  getTogglePolicyConfirmTitle,
  getTogglePolicyLabel,
  memberLabels,
  policyButton,
  policyConstantLabels,
  tenantAdminPolicyName,
  translatedStrings,
  viewPolicyHeaders,
} from './constants';
import PolicyGenericConditions from '../../../../../../../components/policy-admin/view-policy/generic-conditions';
import PolicyPermissionModal from '../../../../../../../components/policy-admin/view-policy/permission-modal';
import PolicyRolesModal from '../../../../../../../components/policy-admin/view-policy/role-modal';
import PolicyViewApprovals from '../../../../../../../components/policy-admin/view-policy/approvals';
import PolicyViewGenerals from '../../../../../../../components/policy-admin/view-policy/general';
import PolicyViewMembers from '../../../../../../../components/policy-admin/view-policy/members';
import PolicyViewPermissionTable from '../../../../../../../components/policy-admin/view-policy/permission-table';
import PolicyViewRolesTable from '../../../../../../../components/policy-admin/view-policy/roles-table';
import {
  getMembers,
  isLoading,
  isSuccess,
  useQuery,
} from '../../../../../../../utils/common-utils';
import { viewString } from '../../../all-secrets/constants';
import './AdminSecretPolicyView.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMetadataRequest } from '../../../../../../../components/policy/metadata/actions';
import { getPolicyActions } from '../list/constants';
import { isPolicyEditable, removeIdsFromMembers, roleFields } from '../utils';

const AdminSecretPolicyView = ({
  policyViewData,
  policyViewLoading,
  deletePolicyRequest,
  openNotification,
  getPolicyById,
  setPageHeader,
  history,
  resetPolicyView,
  togglePolicyRequest,
  policyToggleLoading,
  fetchedUsers,
  fetchedUsersStatus,
  fetchedGroups,
  fetchedGroupsStatus,
  fetchedServiceIdentities,
  fetchedServiceIdentitiesStatus,
  fetchedTokens,
  fetchedTokensStatus,
  initSpinnerOverlay,
  selectedNodeMetadata,
  selectedNodeMetadataLoading,
  selectedNodeMetadataError,
  getApplicationsList,
  applicationsListData,
  consumerListStatus,
  consumerList,
  getPolicyByName,
  policyViewJSONData,
  policyViewJSONStatus,
  getPolicyByNameReset,
}) => {
  const [openRoleModal, setRoleModal] = useState(false);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleData, setRoleData] = useState({});
  const [openPermissionModal, setPermissionModal] = useState(false);
  const [permissionTitle, setPermissionTitle] = useState('');
  const [permissionData, setPermissionData] = useState({});
  const [mode, setMode] = useState('entity');
  const [showEdit, setShowEdit] = useState(true);
  const [openDeleteDialog, setDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deletePolicy, setDeletePolicy] = useState(null);

  const [openToggleDialog, setOpenToggleDialog] = useState(false);
  const [togglePolicy, setTogglePolicy] = useState({ id: '', status: '', history: history });
  const [toggleLoadingMessage, setToggleLoadingMessage] = useState('');
  const [membersData, setMembersData] = useState(null);
  const { id: policyId } = useParams();
  const resourcePath = useQuery().get('path');
  const dispatch = useDispatch();

  const { data: notificationMediumData, status: notificationMediumDataStatus } = useSelector(
    (state) => state.secretsReducer.policyView.notificationMedium
  );
  const { status: channelListStatus, data: channelListData } = useSelector(
    (state) => state?.secretsReducer?.addPolicyReducer?.channelList
  );
  useEffect(() => {
    setPageHeader(translatedStrings?.pageTitle, []);

    !Object.keys(selectedNodeMetadata).length &&
      !selectedNodeMetadataLoading &&
      dispatch(getMetadataRequest(getPolicyActions(resourcePath), resourcePath));
    getPolicyById(policyId, history, resourcePath);
    getApplicationsList();
    return () => getPolicyByNameReset();
  }, []);

  useEffect(() => {
    if (selectedNodeMetadataLoading) {
      initSpinnerOverlay({
        open: selectedNodeMetadataLoading,
        size: medium,
        message: translatedStrings.loadingMetadata,
      });
    }
  }, [selectedNodeMetadataLoading]);

  const areResourcesLoaded = () => {
    return (
      isSuccess(fetchedUsersStatus) &&
      isSuccess(fetchedGroupsStatus) &&
      isSuccess(fetchedServiceIdentitiesStatus) &&
      isSuccess(fetchedTokensStatus) &&
      isSuccess(consumerListStatus) &&
      !selectedNodeMetadataLoading
    );
  };

  useEffect(() => {
    if (
      areResourcesLoaded() &&
      !policyViewLoading &&
      !isEmpty(policyViewData) &&
      !selectedNodeMetadataLoading
    ) {
      if (
        (Object.keys(selectedNodeMetadata).length &&
          selectedNodeMetadata[editPolicyAction] === denyStatus) ||
        !isPolicyEditable(resourcePath, policyViewData) ||
        selectedNodeMetadataError
      ) {
        setShowEdit(false);
      }
      const fetchedMembers = {
        users: fetchedUsers?.result,
        groups: fetchedGroups?.result,
        tokens: fetchedTokens?.result,
        serviceIdentities: fetchedServiceIdentities?.result,
      };
      const members = getMembers(policyViewData.members, fetchedMembers, false);
      setMembersData(members);
    }
  }, [
    fetchedUsersStatus,
    fetchedGroupsStatus,
    fetchedServiceIdentitiesStatus,
    fetchedTokensStatus,
    policyViewLoading,
    selectedNodeMetadata,
    selectedNodeMetadataLoading,
    selectedNodeMetadataError,
  ]);

  useEffect(() => {
    if (!policyViewLoading && !isEmpty(policyViewData?.name) && isEmpty(policyViewJSONData)) {
      setPageHeader(translatedStrings?.pageTitle + ' : ' + (policyViewData?.name ?? ''), []);
      getPolicyByName(policyViewData.name, history);
    }
  }, [policyViewData?.name]);

  useEffect(() => {
    initSpinnerOverlay({
      open:
        isLoading(fetchedUsersStatus) ||
        isLoading(fetchedGroupsStatus) ||
        isLoading(fetchedServiceIdentitiesStatus) ||
        isLoading(fetchedTokensStatus) ||
        isLoading(policyToggleLoading) ||
        isLoading(consumerListStatus) ||
        isLoading(policyViewJSONStatus) ||
        policyViewLoading ||
        policyToggleLoading ||
        selectedNodeMetadataLoading,
      size: policyConstantLabels?.spinnerSize,
      message: policyToggleLoading ? toggleLoadingMessage : translatedStrings?.loadingMessage,
    });
  }, [
    policyViewLoading,
    policyToggleLoading,
    fetchedUsersStatus,
    fetchedGroupsStatus,
    fetchedServiceIdentitiesStatus,
    fetchedTokensStatus,
    selectedNodeMetadataLoading,
    consumerListStatus,
    policyViewJSONStatus,
  ]);

  const handleOpenModal = () => {
    const { id, resource } = policyViewData;
    setDeleteTitle(translatedStrings?.deleteText);
    setDeleteMessage(translatedStrings?.deletePolicyConfirmMessage);
    setDeleteModal(true);
    setDeletePolicy({
      id,
      resource,
      history,
    });
  };
  const handleDeleteDialogSubmit = () => {
    deletePolicyRequest(deletePolicy);
    setDeleteModal(false);
    setDeletePolicy(null);
  };
  const handleDeleteDialogCancel = () => {
    setDeleteModal(false);
  };
  const viewRoleModal = (data) => {
    setRoleTitle(`${translatedStrings?.roleTitle} :  ${data?.name}`);
    setRoleData(data);
    setRoleModal(true);
  };
  const viewPermissionModal = (data) => {
    setPermissionTitle(`${translatedStrings?.permissionTitle} : ${data?.name}`);
    setPermissionData(data);
    setPermissionModal(true);
  };
  const cancelRoleModal = () => {
    setRoleModal(false);
  };
  const cancelPermissionModal = () => {
    setPermissionModal(false);
  };

  const goToListPage = () => {
    history.push({ pathname: allSecretsPath, state: { previousPath: viewString } });
    resetPolicyView();
  };

  const handleTogglePolicyCancel = () => {
    setOpenToggleDialog(false);
    setTogglePolicy({});
  };

  const openPolicyToggle = () => {
    const { id, isActive, resource } = policyViewData;
    const status = isActive ? enabledPolicy : disabledPolicy;
    if (isActive) {
      setToggleLoadingMessage(translatedStrings?.disableLoadingMessage);
    } else {
      setToggleLoadingMessage(translatedStrings?.enableLoadingMessage);
    }
    setTogglePolicy({ id, status, resource });
    setOpenToggleDialog(true);
  };

  const handleTogglePolicy = () => {
    setOpenToggleDialog(false);
    togglePolicyRequest(togglePolicy);
  };

  const editPolicyHandler = () => {
    const { id } = policyViewData;
    history.push(`${editSMPolicyPath}?path=${resourcePath}&id=${id}`, {
      isFormMode: mode === 'entity',
    });
  };

  const viewPolicyActionButtons = () => {
    return (
      <div className={classes?.buttonMainContainer}>
        <div
          className={classes?.buttonChildContainer}
          data-testid={policyConstantLabels?.viewPolicyButtonTestId}
        >
          {showEdit && (
            <Button
              variant={policyButton?.variant}
              size={policyButton?.size}
              onClick={editPolicyHandler}
            >
              {translatedStrings?.editText}
            </Button>
          )}
          {policyViewData?.name.toLowerCase() !== tenantAdminPolicyName && (
            <>
              {policyViewData?.isActive && !policyViewData?.isDraft && showEdit && (
                <Button
                  variant={policyButton?.secVariant}
                  size={policyButton?.size}
                  onClick={openPolicyToggle}
                >
                  {translatedStrings?.disableText}
                </Button>
              )}
              {!policyViewData?.isActive && !policyViewData?.isDraft && showEdit && (
                <Button
                  variant={policyButton?.secVariant}
                  size={policyButton?.size}
                  onClick={openPolicyToggle}
                >
                  {translatedStrings?.enableText}
                </Button>
              )}
              {!selectedNodeMetadataError &&
                selectedNodeMetadata[deletePolicyAction] === ALLOW &&
                showEdit && (
                  <Button
                    variant={policyButton?.secVariant}
                    size={policyButton?.size}
                    onClick={() => {
                      handleOpenModal();
                    }}
                  >
                    {translatedStrings?.deleteLabel}
                  </Button>
                )}
            </>
          )}
          <Button
            variant={policyButton?.secVariant}
            size={policyButton?.size}
            onClick={goToListPage}
          >
            {translatedStrings?.closeLabel}
          </Button>
        </div>
        <div>
          <Button
            variant={policyButton?.secVariant}
            size={policyButton?.size}
            onClick={() => (mode === 'entity' ? setMode('json') : setMode('entity'))}
          >
            {mode === 'entity' ? translatedStrings?.viewJson : translatedStrings?.viewEntity}
          </Button>
        </div>
      </div>
    );
  };

  const viewPolicyData = () => {
    return (
      <div className={classes?.viewPolicyMainContainer}>
        {
          <PolicyViewGenerals
            generalData={policyViewData}
            translatedStrings={translatedStrings}
            viewPolicyHeaders={viewPolicyHeaders}
          />
        }
        {
          <PolicyViewMembers
            memberData={membersData}
            memberLabels={memberLabels}
            translatedStrings={translatedStrings}
            viewPolicyHeaders={viewPolicyHeaders}
          />
        }
        {
          <PolicyViewPermissionTable
            permissionData={policyViewData?.permissions}
            onClickPermission={viewPermissionModal}
            consumerList={consumerList}
            applicationsListData={applicationsListData}
            translatedStrings={translatedStrings}
            policyConstantLabels={policyConstantLabels}
          />
        }
        {
          <PolicyViewRolesTable
            rolesData={policyViewData?.roles}
            onClickRoles={viewRoleModal}
            translatedStrings={translatedStrings}
            policyConstantLabels={policyConstantLabels}
          />
        }
        {
          <PolicyGenericConditions
            policyViewData={policyViewData}
            translatedStrings={translatedStrings}
            conditionsLabels={conditionsLabels}
            viewPolicyHeaders={viewPolicyHeaders}
          />
        }
        {!isEmpty(policyViewData) &&
          !isLoading(fetchedUsersStatus) &&
          !isLoading(fetchedGroupsStatus) &&
          policyViewData?.accessType === allowStatus && (
            <PolicyViewApprovals
              policyViewData={policyViewData?.condition}
              fetchedUsers={fetchedUsers?.result}
              fetchedGroups={fetchedGroups?.result}
              notificationMediumData={notificationMediumData}
              notificationMediumDataStatus={notificationMediumDataStatus}
              channelListStatus={channelListStatus}
              channelListData={channelListData}
              viewPolicyHeaders={viewPolicyHeaders}
              approvalLabels={approvalLabels}
              translatedStrings={translatedStrings}
            />
          )}
      </div>
    );
  };
  const viewJsonData = () => {
    const policyJSON = {
      ...policyViewJSONData,
      ...(policyViewJSONData?.accessLevel
        ? {
            permissions: undefined,
            roles: undefined,
            id: undefined,
            members: removeIdsFromMembers(policyViewJSONData.members),
          }
        : {}),
    };
    return (
      <div className={classes?.viewPolicyMainContainer}>
        <div className={classes?.marginTop32}>
          <Button
            variant={policyButton?.secVariant}
            size={policyButton?.size}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(policyJSON, undefined, 4));
              openNotification({
                open: true,
                type: 'success',
                title: translatedStrings?.copyMessage,
                duration: successNotificationDuration,
              });
            }}
          >
            {translatedStrings?.copyText}
          </Button>
        </div>
        <div className={classes?.marginTop8}>
          <Typography variant="label2"> {translatedStrings?.policyJsonText} </Typography>
          <Textarea
            height="60vh"
            value={JSON.stringify(policyJSON, undefined, 4)}
            readOnly={true}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div role={translatedStrings?.mainRoleText} className={classes.secretViewMainWrapper}>
      {viewPolicyActionButtons()}
      {mode === 'entity' ? viewPolicyData() : viewJsonData()}
      {openDeleteDialog && (
        <DialogPopup
          width={400}
          height={250}
          type={'alert'}
          title={deleteTitle}
          message={deleteMessage}
          primaryButtonText={translatedStrings?.yesDeleteText}
          secondaryButtonText={translatedStrings?.noText}
          onSubmit={handleDeleteDialogSubmit}
          onCancel={handleDeleteDialogCancel}
        />
      )}
      {openPermissionModal && (
        <PolicyPermissionModal
          permissionData={permissionData}
          applicationsListData={applicationsListData}
          translatedStrings={translatedStrings}
          width={smallModalPopupWidth}
          title={permissionTitle}
          onCancel={cancelPermissionModal}
        />
      )}
      {openRoleModal && (
        <PolicyRolesModal
          width={smallModalPopupWidth}
          title={roleTitle}
          onCancel={cancelRoleModal}
          roleData={roleData}
          applicationsListData={applicationsListData}
          consumerList={consumerList}
          consumerListStatus={consumerListStatus}
          translatedStrings={translatedStrings}
          roleFields={roleFields}
        />
      )}
      {openToggleDialog && (
        <DialogPopup
          type={'alert'}
          title={getTogglePolicyConfirmTitle(togglePolicy.status)}
          message={getTogglePolicyConfirmMessage(togglePolicy.status)}
          primaryButtonText={getTogglePolicyLabel(togglePolicy.status)}
          secondaryButtonText={translatedStrings?.noText}
          onSubmit={handleTogglePolicy}
          onCancel={handleTogglePolicyCancel}
        />
      )}
    </div>
  );
};

AdminSecretPolicyView.propTypes = {
  policyViewData: PropTypes.object,
  getPolicyById: PropTypes.func,
  deletePolicyRequest: PropTypes.func,
  resetPolicyView: PropTypes.func,
  setPageHeader: PropTypes.func,
  openNotification: PropTypes.func,
  history: PropTypes.any,
  policyViewLoading: PropTypes.bool,
  policyDeleteLoading: PropTypes.bool,
  togglePolicyRequest: PropTypes.func,
  policyToggleLoading: PropTypes.bool,
  fetchedUsers: PropTypes.any,
  fetchedUsersStatus: PropTypes.string,
  fetchedGroups: PropTypes.any,
  fetchedGroupsStatus: PropTypes.string,
  fetchedServiceIdentities: PropTypes.any,
  fetchedServiceIdentitiesStatus: PropTypes.string,
  fetchedTokens: PropTypes.any,
  fetchedTokensStatus: PropTypes.string,
  initSpinnerOverlay: PropTypes.func,
  selectedNodeMetadata: PropTypes.any,
  selectedNodeMetadataLoading: PropTypes.bool,
  selectedNodeMetadataError: PropTypes.any,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  consumerListStatus: PropTypes.string,
  consumerList: PropTypes.array,
  getPolicyByName: PropTypes.func,
  getPolicyByNameReset: PropTypes.func,
  policyViewJSONData: PropTypes.object,
  policyViewJSONStatus: PropTypes.string,
};

export default AdminSecretPolicyView;
