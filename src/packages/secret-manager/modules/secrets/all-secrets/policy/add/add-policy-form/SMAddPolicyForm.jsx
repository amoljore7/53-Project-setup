import VerticalTabs from 'britive-design-system/core/components/vertical-tabs';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { getHeightFromTop } from '../../../../../../../../utils/common-utils';
import { classes, accessLevelOptions, verticalTabTopPadding, verticalTabWidth } from './constants';
import General from '../../../../../../../../components/policy-admin/add-policy/steps/general';
import GenericConditions from '../../../../../../../../components/policy-admin/add-policy/steps/generic-conditions';
import Approvals from '../../../../../../../../components/policy-admin/add-policy/steps/approval-tab';
import Members from '../../../../../../../../components/policy-admin/add-policy/steps/members-tab';
import Permissions from '../../../../../../../../components/policy-admin/add-policy/steps/sm-permission-tab';
import { isDateTimeData, isIPAddressData } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  recursiveApprovalChannelListLoading,
  recursiveApprovalChannelListRequest,
  recursiveApprovalChannelListReset,
  approvalNotificationMediumListRequest,
} from '../actions';
import { translatedStrings } from '../constants';
import './SMAddPolicyForm.scss';

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
  validationErrors,
  editReadOnly,
  isEditMode,
  initSpinnerOverlay,
  hideIncludeBelowHierarchyOption,
}) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const formContainer = useRef();
  const isAllowPolicy = validationHook.values.allowDeny === 'Allow';

  const { status: notificationMediumStatus, data: notificationMediumData } = useSelector(
    (state) => state?.secretsReducer?.addPolicyReducer?.notificationMedium
  );
  const { status: channelListStatus, data: channelListData } = useSelector(
    (state) => state?.secretsReducer?.addPolicyReducer?.channelList
  );

  useLayoutEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
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
    isEditMode,
    hideIncludeBelowHierarchyOption,
    classes,
    translatedStrings,
    isSMPolicy: true,
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
    classes,
  };

  const permissionsTabProps = {
    validationHook,
    translatedStrings,
    accessLevelOptions,
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
            items={getPolicyTabItems(editReadOnly, isAllowPolicy)}
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
            <GenericConditions {...genericConditionTab} />
          </TabPanel>
        )}
        {!editReadOnly && isAllowPolicy && (
          <TabPanel value={currentStep} index={4}>
            <Approvals {...approvalsTabProps} />
          </TabPanel>
        )}
      </div>
    </>
  );
};

const getPolicyTabItems = (editReadOnly, isAllowPolicy) => {
  const generalTab = { title: translatedStrings.generalTabTitle };
  const membersTab = { title: translatedStrings.membersTabTitle };
  const permissionsTabTitle = { title: translatedStrings.permissionsTabTitle };
  const genericConditionsTab = { title: translatedStrings.genericConditionsTabTitle };
  const approvalsTab = { title: translatedStrings.approvalsTabTitle };

  const allTabs = [generalTab, membersTab, permissionsTabTitle, genericConditionsTab, approvalsTab];
  if (editReadOnly) return membersTab;
  else {
    if (isAllowPolicy) return allTabs;
    else return allTabs.slice(0, allTabs.length - 1);
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
  fetchConsumersList: PropTypes.func,
  consumersList: PropTypes.array,
  fetchPermissionActions: PropTypes.func,
  permissionActionsList: PropTypes.array,
  permissionActionsListStatus: PropTypes.string,
  validationErrors: PropTypes.any,
  editReadOnly: PropTypes.bool,
  resetActionsData: PropTypes.func,
  isEditMode: PropTypes.bool,
  initSpinnerOverlay: PropTypes.func,
  hideIncludeBelowHierarchyOption: PropTypes.bool,
};

export default AddPolicyForm;
