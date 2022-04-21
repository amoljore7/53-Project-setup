import VerticalTabs from 'britive-design-system/core/components/vertical-tabs';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { classes, verticalTabTopPadding, verticalTabWidth } from './constants';
import { translatedStrings } from '../constants';
import { getHeightFromTop } from '../../../../../../utils/common-utils';
import Approvals from '../../../../../../components/policy-admin/add-policy/steps/approval-tab';
import General from '../../../../../../components/policy-admin/add-policy/steps/general';
import GenericConditions from '../../../../../../components/policy-admin/add-policy/steps/generic-conditions';
import Members from '../../../../../../components/policy-admin/add-policy/steps/members-tab';
import Permissions from '../../../../../../components/policy-admin/add-policy/steps/permission-tab';
import Roles from '../../../../../../components/policy-admin/add-policy/steps/roles-tab';
import { secretManagerFlag } from '../../../../../../components/feature-flag/constants';
import { isIPAddressData, isDateTimeData } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  recursiveApprovalChannelListLoading,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListReset,
  approvalNotificationMediumListRequest,
} from '../actions';
import { roleFields } from './constants';
import './AddPolicyForm.scss';

const TabPanel = (props) => {
  const { value, index } = props;
  return value === index && <>{props.children}</>;
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
};

const AddPolicyForm = ({
  openNotification,
  validationHook,
  fetchUsers,
  usersData,
  usersDataStatus,
  fetchGroups,
  groupsData,
  groupsDataStatus,
  fetchServiceIdentities,
  serviceIdentitiesData,
  serviceIdentitiesDataStatus,
  fetchTokens,
  tokensData,
  tokensDataStatus,
  fetchPermissionsList,
  permissionsList,
  fetchConsumersList,
  consumersList,
  fetchPermissionDetails,
  permissionDetails,
  fetchPermissionActions,
  permissionActionsList,
  permissionActionsListStatus,
  permissionDetailsStatus,
  fetchRolesList,
  fetchRoleDetails,
  rolesList,
  rolesListStatus,
  roleDetails,
  roleDetailsStatus,
  policyFilterLoading,
  validationErrors,
  editReadOnly,
  resetActionsData,
  isEditMode,
  initSpinnerOverlay,
  permissionsListStatus,
  getApplicationsList,
  applicationsListData,
  applicationsListStatus,
  isCloneMode,
  featureFlags,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const formContainer = useRef();
  const dispatch = useDispatch();
  const { status: notificationMediumStatus, data: notificationMediumData } = useSelector(
    (state) => state?.policyReducer?.add?.notificationMedium
  );
  const { status: channelListStatus, data: channelListData } = useSelector(
    (state) => state?.policyReducer?.add?.channelList
  );
  const isAllowPolicy = validationHook.values.allowDeny === 'Allow';

  useLayoutEffect(() => {
    // below code is to handle form container div height
    // in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer && formContainer.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer, validationErrors]);

  const stepChangeHandler = (value) => {
    setCurrentStep(value);
  };

  const generalTabProps = {
    validationHook,
    policyFilterLoading,
    isEditMode,
    hideIncludeBelowHierarchyOption: true,
    translatedStrings,
    isSMPolicy: false,
  };

  const membersTabProps = {
    validationHook,
    fetchUsers,
    usersData,
    usersDataStatus,
    fetchGroups,
    groupsData,
    groupsDataStatus,
    fetchServiceIdentities,
    serviceIdentitiesData,
    serviceIdentitiesDataStatus,
    fetchTokens,
    tokensData,
    tokensDataStatus,
    openNotification,
    initSpinnerOverlay,
    translatedStrings,
  };

  const permissionsTabProps = {
    openNotification,
    validationHook,
    fetchPermissionsList,
    permissionsList,
    fetchConsumersList,
    consumersList,
    fetchPermissionDetails,
    permissionDetails,
    fetchPermissionActions,
    permissionActionsList,
    permissionActionsListStatus,
    permissionDetailsStatus,
    resetActionsData,
    isEditMode,
    permissionsListStatus,
    getApplicationsList,
    applicationsListData,
    applicationsListStatus,
    translatedStrings,
  };

  const rolesTabProps = {
    openNotification,
    validationHook,
    fetchRolesList,
    fetchRoleDetails,
    rolesListStatus,
    rolesList,
    roleDetails,
    roleDetailsStatus,
    getApplicationsList,
    applicationsListData,
    consumersList,
    translatedStrings,
    roleFields,
  };

  const genericConditionTab = {
    validationHook,
    translatedStrings,
    isDateTimeData,
    isIPAddressData,
  };

  const approvalsTabProps = {
    openNotification,
    validationHook,
    fetchUsers,
    usersData,
    usersDataStatus,
    fetchGroups,
    groupsData,
    groupsDataStatus,
    initSpinnerOverlay,
    isEditMode,
    isCloneMode,
    notificationMediumStatus,
    notificationMediumData,
    channelListStatus,
    channelListData,
    dispatch,
    recursiveApprovalChannelListLoading,
    recursiveApprovalChannelListRequest,
    recursiveApprovalChannelListReset,
    approvalNotificationMediumListRequest,
    translatedStrings,
  };

  return (
    <>
      <div ref={formContainer} className={classes.addPolicyWrapper}>
        <div className={classes.verticalTabWrap}>
          <VerticalTabs
            value={currentStep}
            handleChange={stepChangeHandler}
            items={getPolicyTabItems(editReadOnly, isAllowPolicy, featureFlags)}
            width={verticalTabWidth}
            topPadding={verticalTabTopPadding}
          />
        </div>
        {!editReadOnly && (
          <TabPanel value={currentStep} index={0}>
            <General {...generalTabProps} />
          </TabPanel>
        )}
        <TabPanel value={currentStep} index={editReadOnly ? 0 : 1}>
          <Members {...membersTabProps} />
        </TabPanel>
        {!editReadOnly && (
          <TabPanel value={currentStep} index={2}>
            <Permissions {...permissionsTabProps} />
          </TabPanel>
        )}
        {!editReadOnly && (
          <TabPanel value={currentStep} index={3}>
            <Roles {...rolesTabProps} />
          </TabPanel>
        )}
        {!editReadOnly && (
          <TabPanel value={currentStep} index={4}>
            <GenericConditions {...genericConditionTab} />
          </TabPanel>
        )}
        {!editReadOnly && isAllowPolicy && featureFlags[secretManagerFlag] && (
          <TabPanel value={currentStep} index={5}>
            <Approvals {...approvalsTabProps} />
          </TabPanel>
        )}
      </div>
    </>
  );
};

const getPolicyTabItems = (editReadOnly, isAllowPolicy, featureFlags) => {
  const generalTab = { title: translatedStrings.generalTabTitle };
  const membersTab = { title: translatedStrings.membersTabTitle };
  const permissionsTabTitle = { title: translatedStrings.permissionsTabTitle };
  const rolesTabTitle = { title: translatedStrings.rolesTabTitle };
  const genericConditionsTab = { title: translatedStrings.genericConditionsTabTitle };
  const approvalsTab = { title: translatedStrings.approvalsTabTitle };

  const allTabs = [
    generalTab,
    membersTab,
    permissionsTabTitle,
    rolesTabTitle,
    genericConditionsTab,
    approvalsTab,
  ];
  if (editReadOnly) {
    return [membersTab];
  } else if (isAllowPolicy) {
    if (!featureFlags[secretManagerFlag]) {
      return allTabs.slice(0, allTabs.length - 1);
    } else {
      return allTabs;
    }
  } else {
    return allTabs.slice(0, allTabs.length - 1);
  }
};

AddPolicyForm.propTypes = {
  addPolicyErrors: PropTypes.any,
  openNotification: PropTypes.func,
  validationHook: PropTypes.any,
  formFields: PropTypes.any,
  setFormFields: PropTypes.any,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersDataStatus: PropTypes.string,
  fetchGroups: PropTypes.func,
  groupsData: PropTypes.array,
  groupsDataStatus: PropTypes.string,
  fetchServiceIdentities: PropTypes.func,
  serviceIdentitiesData: PropTypes.array,
  serviceIdentitiesDataStatus: PropTypes.string,
  fetchTokens: PropTypes.func,
  tokensData: PropTypes.array,
  tokensDataStatus: PropTypes.string,
  fetchPermissionsList: PropTypes.func,
  permissionsList: PropTypes.array,
  fetchConsumersList: PropTypes.func,
  consumersList: PropTypes.array,
  fetchPermissionDetails: PropTypes.func,
  permissionDetails: PropTypes.any,
  fetchPermissionActions: PropTypes.func,
  permissionActionsList: PropTypes.array,
  permissionActionsListStatus: PropTypes.string,
  permissionDetailsStatus: PropTypes.string,
  fetchRolesList: PropTypes.func,
  fetchRoleDetails: PropTypes.func,
  rolesList: PropTypes.array,
  rolesListStatus: PropTypes.any,
  roleDetails: PropTypes.any,
  roleDetailsStatus: PropTypes.string,
  policyFilterLoading: PropTypes.bool,
  validationErrors: PropTypes.any,
  editReadOnly: PropTypes.bool,
  resetActionsData: PropTypes.func,
  isEditMode: PropTypes.bool,
  initSpinnerOverlay: PropTypes.func,
  permissionsListStatus: PropTypes.string,
  getApplicationsList: PropTypes.func,
  applicationsListData: PropTypes.array,
  applicationsListStatus: PropTypes.string,
  isCloneMode: PropTypes.bool,
  featureFlags: PropTypes.object,
};

export default AddPolicyForm;
