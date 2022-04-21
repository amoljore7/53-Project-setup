import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { isError, isLoading, isSuccess } from '../../../../../utils/common-utils';
import AddPolicy from '../add/AddPolicy';
import { massageLoadedPolicy, massageLoadedPolicyJSON } from '../utils';
import { cloneNamePrefix, dateSearchCharacter, dummyDate, translatedStrings } from './constants';
import isEmpty from 'lodash/isEmpty';

const ClonePolicy = ({
  usersData,
  groupsData,
  serviceIdentitiesData,
  tokensData,
  usersDataStatus,
  groupsDataStatus,
  serviceIdentitiesDataStatus,
  tokensDataStatus,
  permissionsList,
  consumersList,
  rolesList,
  permissionActionsList,
  permissionActionsListStatus,
  resetActionsData,
  rolesListStatus,
  roleDetails,
  roleDetailsStatus,
  permissionDetails,
  permissionDetailsStatus,
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
  createPolicy,
  addPolicyStatus,
  addPolicyErrors,
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
  featureFlags,
  consumersListStatus,
}) => {
  const { id } = useParams();
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
    loadPolicy(id, history);
    setResourcesLoading(true);
    return () => {
      resetPolicy();
      resetPolicyJSON();
    };
  }, []);

  useEffect(() => {
    if (isSuccess(loadedPolicyStatus)) {
      loadPolicyJSON(loadedPolicy?.name, history);
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
      const isEditMode = false;
      const constants = {
        inlineType: translatedStrings.inlineType,
        preDefinedType: translatedStrings.preDefinedType,
        dummyDate,
        dateSearchCharacter,
        cloneNamePrefix,
        consumersList,
      };
      if (!isEmpty(loadedPolicy) && !policy) {
        loadedPolicy.isActive = true;
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

  const addPolicyFormProps = {
    usersData,
    usersDataStatus,
    groupsData,
    groupsDataStatus,
    serviceIdentitiesData,
    serviceIdentitiesDataStatus,
    tokensData,
    tokensDataStatus,
    permissionsList,
    consumersList,
    rolesList,
    permissionActionsList,
    permissionActionsListStatus,
    resetActionsData,
    rolesListStatus,
    roleDetails,
    roleDetailsStatus,
    permissionDetails,
    permissionDetailsStatus,
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
    clonePolicy: {
      loadedPolicy: resourcesLoading ? null : policy,
      loadedPolicyJSON: resourcesLoading && !policy ? null : policyJSON,
    },
    openNotification,
    history,
    createPolicy,
    addPolicyStatus,
    addPolicyErrors,
    initSpinnerOverlay,
    permissionsListStatus,
    getApplicationsList,
    applicationsListStatus,
    applicationsListData,
    featureFlags,
  };

  return (
    <>
      <AddPolicy {...addPolicyFormProps} />
    </>
  );
};

ClonePolicy.propTypes = {
  usersData: PropTypes.any,
  groupsData: PropTypes.any,
  serviceIdentitiesData: PropTypes.any,
  tokensData: PropTypes.any,
  permissionsList: PropTypes.any,
  consumersList: PropTypes.any,
  rolesList: PropTypes.any,
  permissionActionsList: PropTypes.any,
  permissionActionsListStatus: PropTypes.string,
  resetActionsData: PropTypes.func,
  rolesListStatus: PropTypes.any,
  roleDetails: PropTypes.any,
  roleDetailsStatus: PropTypes.any,
  permissionDetails: PropTypes.any,
  permissionDetailsStatus: PropTypes.any,
  editPolicyErrors: PropTypes.any,
  editPolicyStatus: PropTypes.string,
  loadedPolicy: PropTypes.any,
  loadedPolicyStatus: PropTypes.string,
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
  editPolicy: PropTypes.func,
  openNotification: PropTypes.func,
  loadPolicy: PropTypes.func,
  initSpinnerOverlay: PropTypes.any,
  loadedUser: PropTypes.any,
  loadedUserStatus: PropTypes.string,
  loadedGroup: PropTypes.any,
  loadedGroupStatus: PropTypes.string,
  loadedToken: PropTypes.any,
  loadedTokenStatus: PropTypes.string,
  loadedServiceIdentity: PropTypes.any,
  loadedServiceIdentityStatus: PropTypes.string,
  usersDataStatus: PropTypes.string,
  groupsDataStatus: PropTypes.string,
  serviceIdentitiesDataStatus: PropTypes.string,
  tokensDataStatus: PropTypes.string,
  createPolicy: PropTypes.func,
  addPolicyStatus: PropTypes.string,
  addPolicyErrors: PropTypes.any,
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
  featureFlags: PropTypes.object,
  consumersListStatus: PropTypes.string,
};

export default ClonePolicy;
