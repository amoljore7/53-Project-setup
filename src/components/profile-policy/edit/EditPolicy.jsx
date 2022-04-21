import DialogPopup from 'britive-design-system/core/components/dialog';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMembers, isError, isLoading, isSuccess } from '../../../utils/common-utils';
import { papServiceConsumer } from '../../../utils/common-constants';
import AddPolicy from '../add/AddPolicy';
import { massageLoadedPolicy, massageLoadedPolicyJSON } from '../utils';
import { dateSearchCharacter, dummyDate, translatedStrings } from './constants';
import isEmpty from 'lodash/isEmpty';

const EditPolicy = ({
  usersData,
  groupsData,
  serviceIdentitiesData,
  tokensData,
  usersDataStatus,
  groupsDataStatus,
  serviceIdentitiesDataStatus,
  tokensDataStatus,
  consumersList,
  resetActionsData,
  editPolicyErrors,
  editPolicyStatus,
  loadedPolicy,
  loadedPolicyStatus,
  setPageHeader,
  fetchUsers,
  fetchGroups,
  fetchServiceIdentities,
  fetchTokens,
  fetchPermissionsList,
  fetchConsumersList,
  fetchPermissionDetails,
  fetchPermissionActions,
  fetchRolesList,
  fetchRoleDetails,
  initSpinnerOverlay,
  updatePolicy,
  loadPolicy,
  openNotification,
  history,
  permissionsListStatus,
  notificationMediumDetails,
  notificationMediumDetailsStatus,
  channelList,
  channelListStatus,
  getApplicationsList,
  applicationsListStatus,
  applicationsListData,
  loadedPolicyJSON,
  loadedPolicyJSONStatus,
  loadPolicyJSON,
  resetPolicy,
  resetPolicyJSON,
  consumersListStatus,
  consumerEntityId,
  redirectPath,
}) => {
  const { id } = useParams();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [policy, setPolicy] = useState(null);
  const [policyJSON, setPolicyJSON] = useState(null);
  const [resourcesLoading, setResourcesLoading] = useState(true);

  useEffect(() => {
    if (!policy) {
      if (
        isLoading(loadedPolicyStatus) ||
        isLoading(usersDataStatus) ||
        isLoading(groupsDataStatus) ||
        isLoading(serviceIdentitiesDataStatus) ||
        isLoading(tokensDataStatus) ||
        isLoading(notificationMediumDetailsStatus) ||
        isLoading(channelListStatus) ||
        isLoading(loadedPolicyJSONStatus) ||
        isLoading(consumersListStatus)
      ) {
        setResourcesLoading(true);
      }
      if (
        isError(loadedPolicyStatus) ||
        isError(usersDataStatus) ||
        isError(groupsDataStatus) ||
        isError(serviceIdentitiesDataStatus) ||
        isError(tokensDataStatus) ||
        isError(loadedPolicyJSONStatus) ||
        isError(notificationMediumDetailsStatus) ||
        isError(channelListStatus) ||
        isError(consumersListStatus)
      ) {
        setResourcesLoading(false);
      }
    }

    if (
      !isLoading(loadedPolicyStatus) &&
      !isLoading(usersDataStatus) &&
      !isLoading(groupsDataStatus) &&
      !isLoading(serviceIdentitiesDataStatus) &&
      !isLoading(tokensDataStatus) &&
      !isLoading(notificationMediumDetailsStatus) &&
      !isLoading(channelListStatus) &&
      !isLoading(loadedPolicyJSONStatus) &&
      !isLoading(consumersListStatus)
    ) {
      setResourcesLoading(false);
    }
  }, [
    loadedPolicyStatus,
    usersDataStatus,
    groupsDataStatus,
    tokensDataStatus,
    serviceIdentitiesDataStatus,
    notificationMediumDetailsStatus,
    channelListStatus,
    loadedPolicyJSONStatus,
    consumersListStatus,
  ]);

  useEffect(() => {
    loadPolicy(id, history, papServiceConsumer, consumerEntityId, redirectPath);
    setResourcesLoading(true);
    return () => {
      resetPolicy();
      resetPolicyJSON();
    };
  }, []);

  useEffect(() => {
    if (isSuccess(loadedPolicyStatus)) {
      loadPolicyJSON(loadedPolicy?.name, history, papServiceConsumer, consumerEntityId, redirectPath);
    }
  }, [loadedPolicyStatus]);

  useEffect(() => {
    initSpinnerOverlay({
      open: resourcesLoading,
      size: 'medium',
      message: translatedStrings.loadingPolicy,
    });
  }, [resourcesLoading]);

  useEffect(() => {
    if (!resourcesLoading) {
      const isEditMode = true;
      const constants = {
        inlineType: translatedStrings.inlineType,
        preDefinedType: translatedStrings.preDefinedType,
        dummyDate,
        dateSearchCharacter,
        consumersList,
      };
      if (!isEmpty(loadedPolicy) && !policy) {
        const members = loadedPolicy?.members || null;
        if (members) {
          fetchMembers(members?.users || [], fetchUsers);
          fetchMembers(members?.tags || [], fetchGroups);
          fetchMembers(members?.serviceIdentities || [], fetchServiceIdentities);
          fetchMembers(members?.tokens || [], fetchTokens);
        }

        setPolicy(
          massageLoadedPolicy(
            {
              policy: loadedPolicy,
              usersData,
              groupsData,
              tokensData,
              serviceIdentitiesData,
              isEditMode,
              notificationMediumDetails,
              channelList,
            },
            {
              ...constants,
            }
          )
        );
      }
      if (!isEmpty(loadedPolicyJSON) && !policyJSON) {
        setPolicyJSON(massageLoadedPolicyJSON(loadedPolicyJSON, isEditMode, { ...constants }));
      }
    }
  }, [resourcesLoading]);

  const resetHandler = () => {
    setResetModalOpen(true);
  };

  const addPolicyFormProps = {
    usersData,
    usersDataStatus,
    groupsData,
    groupsDataStatus,
    serviceIdentitiesData,
    serviceIdentitiesDataStatus,
    tokensData,
    tokensDataStatus,
    consumersList,
    resetActionsData,
    setPageHeader,
    fetchUsers,
    fetchGroups,
    fetchServiceIdentities,
    fetchTokens,
    fetchPermissionsList,
    fetchConsumersList,
    fetchPermissionDetails,
    fetchPermissionActions,
    fetchRolesList,
    fetchRoleDetails,
    history,
    editPolicy: {
      updatePolicy,
      loadedPolicy: resourcesLoading ? null : policy,
      loadedPolicyJSON: resourcesLoading && !policy ? null : policyJSON,
      resetHandler,
      editPolicyErrors,
      editPolicyStatus,
      editReadOnly: loadedPolicy?.isReadOnly,
    },
    openNotification,
    initSpinnerOverlay,
    permissionsListStatus,
    getApplicationsList,
    applicationsListStatus,
    applicationsListData,
    consumerEntityId,
    redirectPath
  };

  return (
    <>
      <AddPolicy {...addPolicyFormProps} />
      {resetModalOpen && (
        <DialogPopup
          type="alert"
          title={translatedStrings.resetEditTitle}
          message={translatedStrings.resetEditMessage}
          primaryButtonText={translatedStrings.resetEditPrimaryBtn}
          secondaryButtonText={translatedStrings.resetEditSecondaryBtn}
          onSubmit={() => {
            setPolicy(null);
            setPolicyJSON(null);
            loadPolicy(id, history, papServiceConsumer, consumerEntityId, redirectPath);
            fetchUsers();
            fetchGroups();
            fetchTokens();
            fetchServiceIdentities();
            setResetModalOpen(false);
          }}
          onCancel={() => {
            setResetModalOpen(false);
          }}
        />
      )}
    </>
  );
};

EditPolicy.propTypes = {
  usersData: PropTypes.any,
  groupsData: PropTypes.any,
  serviceIdentitiesData: PropTypes.any,
  tokensData: PropTypes.any,
  resetActionsData: PropTypes.func,
  consumersList: PropTypes.any,
  editPolicyErrors: PropTypes.any,
  editPolicyStatus: PropTypes.string,
  loadedPolicy: PropTypes.any,
  loadedPolicyStatus: PropTypes.string,
  resetLoadedPolicy: PropTypes.func,
  history: PropTypes.any,
  setPageHeader: PropTypes.func,
  fetchUsers: PropTypes.func,
  fetchGroups: PropTypes.func,
  fetchServiceIdentities: PropTypes.func,
  fetchTokens: PropTypes.func,
  fetchPermissionsList: PropTypes.func,
  fetchConsumersList: PropTypes.func,
  fetchPermissionDetails: PropTypes.func,
  fetchPermissionActions: PropTypes.func,
  fetchRolesList: PropTypes.func,
  fetchRoleDetails: PropTypes.func,
  updatePolicy: PropTypes.func,
  openNotification: PropTypes.func,
  loadPolicy: PropTypes.func,
  initSpinnerOverlay: PropTypes.any,
  usersDataStatus: PropTypes.string,
  groupsDataStatus: PropTypes.string,
  serviceIdentitiesDataStatus: PropTypes.string,
  tokensDataStatus: PropTypes.string,
  permissionsListStatus: PropTypes.string,
  notificationMediumDetails: PropTypes.any,
  notificationMediumDetailsStatus: PropTypes.string,
  channelList: PropTypes.any,
  channelListStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListStatus: PropTypes.string,
  applicationsListData: PropTypes.array,
  loadedPolicyJSON: PropTypes.any,
  loadedPolicyJSONStatus: PropTypes.string,
  loadPolicyJSON: PropTypes.func,
  resetPolicy: PropTypes.func,
  resetPolicyJSON: PropTypes.func,
  consumersListStatus: PropTypes.string,
  consumerEntityId: PropTypes.string,
  redirectPath: PropTypes.string,
};

export default EditPolicy;
