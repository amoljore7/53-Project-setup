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
  smallModalPopupWidth,
  policyListingPath,
  medium,
} from '../../../../../utils/common-constants';
import {
  approvalLabels,
  classes,
  conditionsLabels,
  disabledPolicy,
  enabledPolicy,
  getTogglePolicyConfirmMessage,
  getTogglePolicyConfirmTitle,
  getTogglePolicyLabel,
  memberLabels,
  policyButton,
  policyConstantLabels,
  roleFields,
  tenantAdminPolicyName,
  translatedStrings,
  viewPolicyHeaders,
} from './constants';
import PolicyGenericConditions from '../../../../../components/policy-admin/view-policy/generic-conditions';
import PolicyPermissionModal from '../../../../../components/policy-admin/view-policy/permission-modal';
import PolicyRolesModal from '../../../../../components/policy-admin/view-policy/role-modal';
import PolicyViewApprovals from '../../../../../components/policy-admin/view-policy/approvals';
import PolicyViewGenerals from '../../../../../components/policy-admin/view-policy/general';
import PolicyViewMembers from '../../../../../components/policy-admin/view-policy/members';
import PolicyViewPermissionTable from '../../../../../components/policy-admin/view-policy/permission-table';
import PolicyViewRolesTable from '../../../../../components/policy-admin/view-policy/roles-table';
import { isLoading, isSuccess } from '../../../../../utils/common-utils';
import { policyActions } from '../../../../../components/batch-eval/constants';
import { secretManagerFlag } from '../../../../../components/feature-flag/constants';
import './PolicyView.scss';
import { massageLoadedPolicyJSON } from '../utils';
import { useSelector } from 'react-redux';

const PolicyView = ({
  policyViewData,
  policyViewLoading,
  policyDeleteLoading,
  deletePolicyById,
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
  featureFlags,
  policyEvalData,
  getApplicationsList,
  applicationsListData,
  getPolicyByName,
  getPolicyByIdReset,
  getPolicyByNameReset,
  policyViewJSONLoading,
  policyViewJSONData,
  initSpinnerOverlay,
  consumerList,
  consumerListStatus,
}) => {
  const [openRoleModal, setRoleModal] = useState(false);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleData, setRoleData] = useState({});
  const [openPermissionModal, setPermissionModal] = useState(false);
  const [permissionTitle, setPermissionTitle] = useState('');
  const [permissionData, setPermissionData] = useState({});
  const [isFormMode, setIsFormMode] = useState(true);
  const [openDeleteDialog, setDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openToggleDialog, setOpenToggleDialog] = useState(false);
  const [togglePolicy, setTogglePolicy] = useState({ id: '', status: '', history: history });
  const [toggleLoadingMessage, setToggleLoadingMessage] = useState('');
  const [membersData, setMembersData] = useState(null);
  const [policiesEvalData, setPoliciesEvalData] = useState({});
  const [jsonPolicy, setJsonPolicy] = useState({});
  const { id: policyId } = useParams();

  const { data: notificationMediumData, status: notificationMediumDataStatus } = useSelector(
    (state) => state?.policyReducer?.view?.notificationMedium
  );
  const { status: channelListStatus, data: channelListData } = useSelector(
    (state) => state?.policyReducer?.add?.channelList
  );

  useEffect(() => {
    getApplicationsList();
    getPolicyById(policyId, history);
    setPageHeader(translatedStrings?.pageTitle, []);
    return () => {
      getPolicyByIdReset();
      getPolicyByNameReset();
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(policyEvalData)) {
      setPoliciesEvalData({
        add: policyEvalData[policyActions?.create] === ALLOW,
        edit: policyEvalData[policyActions?.update] === ALLOW,
        delete: policyEvalData[policyActions?.delete] === ALLOW,
        view: policyEvalData[policyActions?.read] === ALLOW,
        list: policyEvalData[policyActions?.list] === ALLOW,
      });
    }
  }, [policyEvalData]);

  const areResourcesLoaded = () => {
    return (
      isSuccess(fetchedUsersStatus) &&
      isSuccess(fetchedGroupsStatus) &&
      isSuccess(fetchedServiceIdentitiesStatus) &&
      isSuccess(fetchedTokensStatus)
    );
  };

  useEffect(() => {
    if (areResourcesLoaded() && !policyViewLoading && !isEmpty(policyViewData)) {
      const fetchedMembers = {
        users: fetchedUsers.result,
        groups: fetchedGroups.result,
        tokens: fetchedTokens.result,
        serviceIdentities: fetchedServiceIdentities.result,
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
  ]);

  useEffect(() => {
    initSpinnerOverlay({
      open:
        isLoading(fetchedUsersStatus) ||
        isLoading(fetchedGroupsStatus) ||
        isLoading(fetchedServiceIdentitiesStatus) ||
        isLoading(fetchedTokensStatus) ||
        policyViewLoading ||
        policyDeleteLoading ||
        policyToggleLoading ||
        policyViewJSONLoading ||
        isLoading(consumerListStatus),
      size: medium,
      message: policyToggleLoading ? toggleLoadingMessage : translatedStrings?.loadingMessage,
    });
  }, [
    policyViewLoading,
    policyDeleteLoading,
    policyToggleLoading,
    policyViewJSONLoading,
    fetchedUsersStatus,
    fetchedGroupsStatus,
    fetchedServiceIdentitiesStatus,
    fetchedTokensStatus,
    consumerListStatus,
  ]);

  useEffect(() => {
    setPageHeader(translatedStrings?.pageTitle + ' : ' + (policyViewData?.name ?? ''), []);
  }, [policyViewData?.name]);

  useEffect(() => {
    if (!isEmpty(policyViewJSONData)) {
      setJsonPolicy(massageLoadedPolicyJSON(policyViewJSONData, true));
    }
  }, [policyViewJSONData]);

  const handleOpenModal = () => {
    setDeleteTitle(translatedStrings?.deleteText);
    setDeleteMessage(translatedStrings?.deletePolicyConfirmMessage);
    setDeleteModal(true);
  };
  const handleDeleteDialogSubmit = () => {
    deletePolicyById(policyId, history);
    setDeleteModal(false);
  };

  const handleDeleteDialogCancel = () => {
    setDeleteModal(false);
  };
  const viewRoleModal = (data) => {
    setRoleTitle(`${translatedStrings?.roleTitle} :  ${data?.name}`);
    setRoleData({ ...data });
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
    history.push(policyListingPath);
    resetPolicyView();
  };
  const handleTogglePolicyCancel = () => {
    setOpenToggleDialog(false);
    setTogglePolicy({});
  };
  const openPolicyToggle = () => {
    const { id, isActive } = policyViewData;
    const status = isActive ? enabledPolicy : disabledPolicy;
    if (isActive) {
      setToggleLoadingMessage(translatedStrings?.disableLoadingMessage);
    } else {
      setToggleLoadingMessage(translatedStrings?.enableLoadingMessage);
    }
    setTogglePolicy({ id, status, history });
    setOpenToggleDialog(true);
  };
  const handleTogglePolicy = () => {
    setOpenToggleDialog(false);
    togglePolicyRequest(togglePolicy);
  };

  const editPolicy = () => {
    const { id } = policyViewData;
    history.push(`${policyListingPath}/edit/${id}`, { isFormMode });
  };
  const handlePolicyClone = (id) => {
    history.push(`${policyListingPath}/clone/${id}`);
  };
  const handleModeChange = () => {
    if (isFormMode) {
      if (isEmpty(policyViewJSONData)) {
        getPolicyByName(policyViewData?.name, history);
      }
      setIsFormMode(false);
    } else {
      setIsFormMode(true);
    }
  };
  const ViewPolicyActionButtons = () => {
    return (
      <div className={classes?.buttonMainContainer}>
        <div
          className={classes?.buttonChildContainer}
          data-testid={policyConstantLabels?.viewPolicyButtonTestId}
        >
          {policiesEvalData?.edit &&
            !policyViewLoading &&
            !isEmpty(policyViewData) &&
            !policyViewData?.accessLevel && (
              <Button
                variant={policyButton?.variant}
                size={policyButton?.size}
                onClick={() => {
                  editPolicy();
                }}
              >
                {translatedStrings?.editText}
              </Button>
            )}
          {policiesEvalData?.add && (
            <Button
              variant={policyButton?.secVariant}
              size={policyButton?.size}
              onClick={() => handlePolicyClone(policyId)}
            >
              {translatedStrings?.cloneText}
            </Button>
          )}
          {!policyViewLoading &&
            policyViewData?.name.toLowerCase() !== tenantAdminPolicyName.toLowerCase() &&
            policiesEvalData?.edit && (
              <>
                {policyViewData?.isActive &&
                  !policyViewData?.isDraft &&
                  !isEmpty(policyViewData) &&
                  !policyViewData?.accessLevel && (
                    <Button
                      variant={policyButton?.secVariant}
                      size={policyButton?.size}
                      onClick={() => {
                        openPolicyToggle();
                      }}
                    >
                      {translatedStrings?.disableText}
                    </Button>
                  )}
                {!policyViewData?.isActive &&
                  !policyViewData?.isDraft &&
                  !isEmpty(policyViewData) &&
                  !policyViewData?.accessLevel && (
                    <Button
                      variant={policyButton?.secVariant}
                      size={policyButton?.size}
                      onClick={() => {
                        openPolicyToggle();
                      }}
                    >
                      {translatedStrings?.enableText}
                    </Button>
                  )}
              </>
            )}
          {!policyViewLoading &&
            !policyViewData?.isReadOnly &&
            !isEmpty(policyViewData) &&
            !policyViewData?.accessLevel && (
              <Button
                variant={policyButton?.secVariant}
                size={policyButton?.size}
                onClick={handleOpenModal}
              >
                {translatedStrings?.deleteLabel}
              </Button>
            )}
          {policiesEvalData?.edit && (
            <Button
              variant={policyButton?.secVariant}
              size={policyButton?.size}
              onClick={goToListPage}
            >
              {translatedStrings?.closeLabel}
            </Button>
          )}
        </div>
        <div>
          <Button
            variant={policyButton?.secVariant}
            size={policyButton?.size}
            onClick={handleModeChange}
          >
            {isFormMode ? translatedStrings?.viewJson : translatedStrings?.viewEntity}
          </Button>
        </div>
      </div>
    );
  };

  const ViewPolicyData = () => {
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
            applicationsListData={applicationsListData}
            consumerList={consumerList}
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
          policyViewData?.accessType === ALLOW &&
          featureFlags[secretManagerFlag] && (
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
  const ViewJsonData = () => {
    return (
      <div className={classes?.viewPolicyMainContainer}>
        <div className={classes?.marginTop32}>
          <Button
            variant={policyButton?.secVariant}
            size={policyButton?.size}
            onClick={() => {
              navigator.clipboard.writeText(jsonPolicy?.JSONInputData);
              openNotification({
                open: true,
                type: 'success',
                title: translatedStrings?.copyMessage,
                duration: 3000,
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
            value={jsonPolicy?.JSONInputData}
            readOnly={true}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div role={translatedStrings?.mainRoleText} className={classes.viewPolicyOuterWrapper}>
      {<ViewPolicyActionButtons />}
      {isFormMode ? <ViewPolicyData /> : <ViewJsonData />}
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
          width={smallModalPopupWidth}
          title={permissionTitle}
          onCancel={cancelPermissionModal}
          permissionData={permissionData}
          applicationsListData={applicationsListData}
          translatedStrings={translatedStrings}
        />
      )}
      {openRoleModal && (
        <PolicyRolesModal
          roleData={roleData}
          applicationsListData={applicationsListData}
          consumerList={consumerList}
          consumerListStatus={consumerListStatus}
          translatedStrings={translatedStrings}
          roleFields={roleFields}
          width={smallModalPopupWidth}
          title={roleTitle}
          onCancel={cancelRoleModal}
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
const getMemberObjects = (members, membersData, idProperty) => {
  let actualMembers = [];
  if (members) {
    let actualMember = null;
    for (let itr = 0; itr < members.length; itr++) {
      actualMember = membersData?.find((member) => member[idProperty] === members[itr]);
      if (actualMember) {
        actualMembers.push({
          name: actualMember.name || actualMember.channelName,
          status: actualMember.status,
        });
      }
    }
    if (!actualMember && members.length === 1 && members[0].length === 1) {
      actualMembers.push('*');
    }
  }
  actualMembers.sort((member1, member2) => (member1?.name || '').localeCompare(member2?.name));
  return actualMembers;
};

// This function has been used in policyViewApproval.jsx
export const getMembers = (members, fetchedMembers, isApproval) => {
  let actualUsers = [],
    actualGroups = [],
    actualServiceIdentities = [],
    actualTokens = [],
    actualChannels = [];

  const users = isApproval ? members?.users : members?.users?.map(({ id }) => id);
  const serviceIdentities = members?.serviceIdentities?.map(({ id }) => id);
  const tags = isApproval ? members?.tags : members?.tags?.map(({ id }) => id);
  const tokens = members?.tokens?.map(({ id }) => id);
  const channels = members?.channels;

  actualUsers = getMemberObjects(users, fetchedMembers?.users, 'userId');
  actualGroups = getMemberObjects(tags, fetchedMembers?.groups, 'userTagId');
  actualTokens = getMemberObjects(tokens, fetchedMembers?.tokens, 'id');
  actualServiceIdentities = getMemberObjects(
    serviceIdentities,
    fetchedMembers?.serviceIdentities,
    'userId'
  );
  actualChannels = getMemberObjects(channels, fetchedMembers?.channels, 'channelId');

  return {
    users: actualUsers && Boolean(actualUsers.length) ? actualUsers : undefined,
    tags: actualGroups && Boolean(actualGroups.length) ? actualGroups : undefined,
    tokens: actualTokens && Boolean(actualTokens.length) ? actualTokens : undefined,
    serviceIdentities:
      actualServiceIdentities && Boolean(actualServiceIdentities.length)
        ? actualServiceIdentities
        : undefined,
    channels: actualChannels && Boolean(actualChannels.length) ? actualChannels : undefined,
  };
};

PolicyView.propTypes = {
  policyViewData: PropTypes.object,
  getPolicyById: PropTypes.func,
  deletePolicyById: PropTypes.func,
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
  featureFlags: PropTypes.object,
  policyEvalData: PropTypes.object,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  getPolicyByName: PropTypes.func,
  getPolicyByIdReset: PropTypes.func,
  getPolicyByNameReset: PropTypes.func,
  policyViewJSONLoading: PropTypes.bool,
  policyViewJSONData: PropTypes.object,
  initSpinnerOverlay: PropTypes.func,
  consumerList: PropTypes.array,
  consumerListStatus: PropTypes.string,
};

export default PolicyView;
