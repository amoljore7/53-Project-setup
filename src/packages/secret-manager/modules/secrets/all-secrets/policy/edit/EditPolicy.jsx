import DialogPopup from 'britive-design-system/core/components/dialog';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  fetchMembers,
  isError,
  isLoading,
  useQuery,
} from '../../../../../../../utils/common-utils';
import AddPolicy from '../add/SMAddPolicy';
import { massageLoadedPolicy, massageLoadedPolicyJSON, removeIdsFromMembers } from '../utils';
import { dateSearchCharacter, dummyDate, translatedStrings } from './constants';

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
  permissionActionsList,
  permissionActionsListStatus,
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
  fetchConsumersList,
  fetchPermissionActions,
  initSpinnerOverlay,
  updatePolicy,
  loadPolicy,
  openNotification,
  history,
  notificationMediumDetails,
  notificationMediumDetailsStatus,
  channelList,
  channelListStatus,
  nodeSecretMetadataLoading,
  getPolicyByName,
  policyViewJSONData,
  policyViewJSONStatus,
  getPolicyByNameReset,
  nodeSecretMetadataState,
}) => {
  const queryParams = useQuery();
  const [id] = useState(queryParams.get('id'));
  const [resourcePath] = useState(queryParams.get('path'));
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
        isLoading(policyViewJSONStatus) ||
        nodeSecretMetadataLoading
      ) {
        setResourcesLoading(true);
      }
      if (
        isError(loadedPolicyStatus) ||
        isError(usersDataStatus) ||
        isError(groupsDataStatus) ||
        isError(serviceIdentitiesDataStatus) ||
        isError(tokensDataStatus) ||
        isError(notificationMediumDetailsStatus) ||
        isError(policyViewJSONStatus) ||
        isError(channelListStatus)
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
      !isLoading(policyViewJSONStatus) &&
      !nodeSecretMetadataLoading
    ) {
      setResourcesLoading(false);
    }
  }, [
    loadedPolicyStatus,
    usersDataStatus,
    groupsDataStatus,
    tokensDataStatus,
    serviceIdentitiesDataStatus,
    channelListStatus,
    notificationMediumDetailsStatus,
    policyViewJSONStatus,
  ]);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    fetchTokens();
    fetchServiceIdentities();
    loadPolicy(id, history, resourcePath);
    return () => getPolicyByNameReset();
  }, []);

  useEffect(() => {
    initSpinnerOverlay({
      open: resourcesLoading,
      size: 'medium',
      message: translatedStrings.loadingPolicy,
    });
  }, [resourcesLoading]);

  useEffect(() => {
    if (!isEmpty(loadedPolicy?.name) && isEmpty(policyViewJSONData)) {
      getPolicyByName(loadedPolicy?.name, history);
    }
  }, [loadedPolicy?.name]);

  useEffect(() => {
    if (!resourcesLoading && !policy) {
      const isEditMode = true;
      const constants = {
        inlineType: translatedStrings.inlineType,
        preDefinedType: translatedStrings.preDefinedType,
        dummyDate,
        dateSearchCharacter,
      };
      if (loadedPolicy) {
        const members = loadedPolicy?.members || null;
        if (members) {
          fetchMembers(members?.users || [], fetchUsers);
          fetchMembers(members?.tags || [], fetchGroups);
          fetchMembers(members?.serviceIdentities || [], fetchServiceIdentities);
          fetchMembers(members?.tokens || [], fetchTokens);
        }
        const massageLoadedSMPolicy = massageLoadedPolicy(
          {
            policy: loadedPolicy,
            usersData,
            groupsData,
            tokensData,
            serviceIdentitiesData,
            isEditMode,
            notificationMediumDetails,
            channelList,
            resourcePath,
          },
          {
            ...constants,
          }
        );
        // permission and roles not allowed to edit/add from SecretManager
        setPolicy({ ...massageLoadedSMPolicy, roles: undefined, permissions: undefined });
        setPolicyJSON(
          massageLoadedPolicyJSON(
            {
              ...policyViewJSONData,
              id: undefined,
              permissions: undefined,
              roles: undefined,
              members: removeIdsFromMembers(policyViewJSONData.members),
            },
            isEditMode,
            { ...constants }
          )
        );
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
    permissionActionsList,
    permissionActionsListStatus,
    resetActionsData,
    setPageHeader,
    fetchUsers,
    fetchGroups,
    fetchServiceIdentities,
    fetchTokens,
    fetchConsumersList,
    fetchPermissionActions,
    history,
    nodeSecretMetadataState,
    editPolicy: {
      updatePolicy,
      loadedPolicy: resourcesLoading ? null : policy,
      loadedPolicyJSON: resourcesLoading && !policy ? null : policyJSON,
      resetHandler,
      editPolicyErrors,
      editPolicyStatus,
      editReadOnly: loadedPolicy?.isReadOnly,
      loadedPolicyStatus,
    },
    openNotification,
    initSpinnerOverlay,
  };

  return (
    <>
      {policy && !resourcesLoading && <AddPolicy {...addPolicyFormProps} />}
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
            loadPolicy(id, history, resourcePath);
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
  permissionActionsListStatus: PropTypes.string,
  resetActionsData: PropTypes.func,
  consumersList: PropTypes.any,
  permissionActionsList: PropTypes.any,
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
  fetchConsumersList: PropTypes.func,
  fetchPermissionActions: PropTypes.func,
  updatePolicy: PropTypes.func,
  openNotification: PropTypes.func,
  loadPolicy: PropTypes.func,
  initSpinnerOverlay: PropTypes.any,
  usersDataStatus: PropTypes.string,
  groupsDataStatus: PropTypes.string,
  serviceIdentitiesDataStatus: PropTypes.string,
  tokensDataStatus: PropTypes.string,
  notificationMediumDetails: PropTypes.any,
  notificationMediumDetailsStatus: PropTypes.string,
  channelList: PropTypes.any,
  channelListStatus: PropTypes.string,
  nodeSecretMetadataLoading: PropTypes.bool,
  getPolicyByName: PropTypes.func,
  getPolicyByNameReset: PropTypes.func,
  policyViewJSONData: PropTypes.object,
  policyViewJSONStatus: PropTypes.string,
  nodeSecretMetadataState: PropTypes.object,
};

export default EditPolicy;
