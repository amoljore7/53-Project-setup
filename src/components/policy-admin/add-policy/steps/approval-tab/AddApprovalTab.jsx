import React, { useEffect, useState } from 'react';
import Typography from 'britive-design-system/core/components/typography';
import RadioGroup from 'britive-design-system/core/components/radio';
import Select from 'britive-design-system/core/components/select';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import Textfield from 'britive-design-system/core/components/textfield';
import { isError, isLoading, isSuccess } from '../../../../../utils/common-utils';
import { IS_SLACK, fieldWidth, classes } from './constants';
import { isEmpty } from 'lodash';
import { medium, papServiceConsumer } from '../../../../../utils/common-constants';
import './AddApprovalTab.scss';

const Approvals = ({
  validationHook,
  usersDataStatus,
  usersData,
  groupsDataStatus,
  groupsData,
  fetchGroups,
  fetchUsers,
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
  consumer,
}) => {
  const [usersOptions, setUsersOptions] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState([]);
  const [notificationMediumOptions, setNotificationMediumOptions] = useState([]);
  const [channelListOptions, setChannelListOptions] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);

  useEffect(() => {
    if ((isEditMode || isCloneMode) && validationHook.values.isApprovals) {
      if (!isSuccess(usersDataStatus)) {
        fetchUsers();
      }
      if (!isSuccess(groupsDataStatus)) {
        fetchGroups();
      }
      if (!isSuccess(notificationMediumStatus)) {
        dispatch(approvalNotificationMediumListRequest());
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess(usersDataStatus) && !isEmpty(usersData)) {
      setUsersOptions(usersData);
    }
    if (isSuccess(notificationMediumStatus) && !isEmpty(notificationMediumData)) {
      setNotificationMediumOptions(notificationMediumData);
    }
    if (isSuccess(groupsDataStatus) && !isEmpty(groupsData)) {
      setGroupsOptions(groupsData);
    }
    if (isSuccess(channelListStatus) && !isEmpty(channelListData)) {
      setChannelListOptions(channelListData);
    }

    if (
      isLoading(usersDataStatus) ||
      isLoading(groupsDataStatus) ||
      isLoading(notificationMediumStatus) ||
      isLoading(channelListStatus)
    ) {
      setResourcesLoading(true);
    }
    if (
      isError(usersDataStatus) ||
      isError(groupsDataStatus) ||
      isError(notificationMediumStatus) ||
      isError(channelListStatus)
    ) {
      setResourcesLoading(false);
    }
    if (
      !isLoading(usersDataStatus) &&
      !isLoading(groupsDataStatus) &&
      !isLoading(notificationMediumStatus) &&
      !isLoading(channelListStatus)
    ) {
      setResourcesLoading(false);
    }
  }, [usersDataStatus, groupsDataStatus, notificationMediumStatus, channelListStatus]);
  useEffect(() => {
    initSpinnerOverlay({
      open: resourcesLoading,
      size: medium,
      message: translatedStrings.loadingMembers,
    });
  }, [resourcesLoading]);
  return (
    <div className={classes.stepperMainContainer}>
      {consumer !== papServiceConsumer && (
        <div className={classes.addPolicyFieldWrapper}>
          <Typography variant="label2"> {translatedStrings.accessType} </Typography>
          <div className={classes.addPolicyFieldValueWrapper}>
            <Typography variant="label1"> {validationHook.values.allowDeny} </Typography>
          </div>
        </div>
      )}
      <div className={classes.addPolicyFieldWrapper}>
        <RadioGroup
          label={translatedStrings.approvalLabel}
          defaultValue={`${validationHook.values.isApprovals + ''}`}
          name="isApprovals"
          options={[
            {
              label: translatedStrings.yesLabel,
              value: 'true',
            },
            {
              label: translatedStrings.noLabel,
              value: 'false',
            },
          ]}
          direction="vertical"
          onChange={(e) => {
            const value = e.target.value === 'true';
            validationHook.handleChange(validationHook.names.isApprovals, value);
            if (e.target.value === 'true') {
              fetchGroups();
              fetchUsers();
              dispatch(approvalNotificationMediumListRequest());
            } else {
              validationHook.handleChange(validationHook.names.notificationMedium, '');
              validationHook.handleChange(validationHook.names.userList, []);
              validationHook.handleChange(validationHook.names.tagList, []);
              validationHook.handleChange(validationHook.names.channelList, []);
              validationHook.handleChange(validationHook.names.approvalMaxTime, '');
              validationHook.handleChange(validationHook.names.validFor, '');
            }
          }}
        />
      </div>
      {validationHook.values.isApprovals && !resourcesLoading && (
        <>
          <div className={classes.addPolicyFieldWrapper}>
            <Select
              label={translatedStrings.notification}
              placeholder={translatedStrings.notificationPlaceHolder}
              width={fieldWidth}
              value={validationHook.values.notificationMedium}
              options={notificationMediumOptions}
              onChange={(_, value) => {
                validationHook.handleChange(validationHook.names.notificationMedium, value);
                validationHook.handleChange(
                  validationHook.names.isChannelsRequired,
                  value.type === IS_SLACK
                );
                validationHook.handleChange(validationHook.names.channelList, []);
                if (value?.type === IS_SLACK) {
                  dispatch(recursiveApprovalChannelListReset());
                  dispatch(recursiveApprovalChannelListLoading());
                  dispatch(recursiveApprovalChannelListRequest({ notificationMediumId: value.id }));
                }
              }}
              onBlur={() => validationHook.handleBlur(validationHook.names.notificationMedium)}
              errorMessage={
                validationHook.touched.notificationMedium &&
                Boolean(validationHook.errors.notificationMedium)
                  ? validationHook.errors.notificationMedium
                  : ''
              }
              error={
                validationHook.touched.notificationMedium &&
                Boolean(validationHook.errors.notificationMedium)
              }
              getOptionLabel={(option) => option?.name || option}
              onInputChange={() => {}}
            />
          </div>
          <div className={classes.addPolicyFieldWrapper}>
            <Autocomplete
              label={translatedStrings.userListLabel}
              placeholder={translatedStrings.userListPlaceholder}
              width={fieldWidth}
              value={validationHook.values.userList}
              options={usersOptions}
              multiple={true}
              error={validationHook.touched.userList && Boolean(validationHook.errors.userList)}
              errorMessage={validationHook.errors.userList}
              onBlur={() => validationHook.handleBlur(validationHook.names.userList)}
              onChange={(_, value) => {
                validationHook.handleChange(validationHook.names.userList, value);
              }}
              onInputChange={() => {}}
              getOptionLabel={(option) => option?.name || option}
              disablePortal={true}
            />
          </div>
          <div className={classes.addPolicyFieldWrapper}>
            <Autocomplete
              label={translatedStrings.tagListLabel}
              placeholder={translatedStrings.tagListPlaceholder}
              width={fieldWidth}
              value={validationHook.values.tagList}
              options={groupsOptions}
              multiple={true}
              error={validationHook.touched.tagList && Boolean(validationHook.errors.tagList)}
              errorMessage={validationHook.errors.tagList}
              onBlur={() => validationHook.handleBlur(validationHook.names.tagList)}
              onChange={(_, value) => {
                validationHook.handleChange(validationHook.names.tagList, value);
              }}
              onInputChange={() => {}}
              getOptionLabel={(option) => option?.name || option}
              disablePortal={true}
            />
          </div>
          {validationHook.values.isChannelsRequired && (
            <div className={classes.addPolicyFieldWrapper}>
              <Autocomplete
                label={translatedStrings.channelListLabel}
                placeholder={translatedStrings.channelListPlaceholder}
                width={fieldWidth}
                multiple={true}
                value={validationHook.values.channelList}
                options={channelListOptions}
                error={
                  validationHook.touched.channelList && Boolean(validationHook.errors.channelList)
                }
                errorMessage={validationHook.errors.channelList}
                onBlur={() => validationHook.handleBlur(validationHook.names.channelList)}
                onChange={(_, value) => {
                  validationHook.handleChange(validationHook.names.channelList, value);
                }}
                getOptionLabel={(option) => option?.channelName || option}
                onInputChange={() => {}}
                disablePortal={true}
              />
            </div>
          )}
          <div className={classes.addPolicyFieldWrapper}>
            <Textfield
              type="text"
              width={fieldWidth}
              label={translatedStrings.approverTime}
              helperText={translatedStrings.hhmm}
              value={validationHook.values.approvalMaxTime}
              onChange={(e) =>
                validationHook.handleChange(validationHook.names.approvalMaxTime, e.target.value)
              }
              onBlur={() => validationHook.handleBlur(validationHook.names.approvalMaxTime)}
              error={
                validationHook.touched.approvalMaxTime &&
                Boolean(validationHook.errors.approvalMaxTime)
              }
              errorMsg={validationHook.errors.approvalMaxTime}
            />
          </div>
          {consumer !== papServiceConsumer && (
            <div className={classes.addPolicyFieldWrapper}>
              <Textfield
                type="text"
                width={fieldWidth}
                label={translatedStrings.accessValidityAfterApprovalLabel}
                helperText={translatedStrings.hhmm}
                value={validationHook.values.validFor}
                onChange={(e) =>
                  validationHook.handleChange(validationHook.names.validFor, e.target.value)
                }
                onBlur={() => validationHook.handleBlur(validationHook.names.validFor)}
                error={validationHook.touched.validFor && Boolean(validationHook.errors.validFor)}
                errorMsg={validationHook.errors.validFor}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

Approvals.propTypes = {
  validationHook: PropTypes.object,
  usersDataStatus: PropTypes.string,
  usersData: PropTypes.array,
  fetchGroups: PropTypes.func,
  fetchUsers: PropTypes.func,
  initSpinnerOverlay: PropTypes.func,
  groupsDataStatus: PropTypes.string,
  groupsData: PropTypes.array,
  isEditMode: PropTypes.bool,
  isCloneMode: PropTypes.bool,
  recursiveApprovalChannelListLoading: PropTypes.func,
  recursiveApprovalChannelListRequest: PropTypes.func,
  recursiveApprovalChannelListReset: PropTypes.func,
  approvalNotificationMediumListRequest: PropTypes.func,
  notificationMediumStatus: PropTypes.string,
  notificationMediumData: PropTypes.array,
  channelListStatus: PropTypes.string,
  channelListData: PropTypes.array,
  dispatch: PropTypes.func,
  translatedStrings: PropTypes.object,
  consumer: PropTypes.string,
};
export default Approvals;
