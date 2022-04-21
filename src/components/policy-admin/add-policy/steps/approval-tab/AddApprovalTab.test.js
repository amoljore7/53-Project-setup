/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import AddApprovalTab from './AddApprovalTab';
import * as yup from 'yup';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import React from 'react';
import PropTypes from 'prop-types';

// added to suppress warning
const originalError = global.console.error;
beforeAll(() => {
  global.console.error = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Please upgrade to at least react-dom@16.9.0')
    ) {
      return;
    }
    return originalError.call(console, args);
  });
});

const props = {
  usersDataStatus: RESOURCE_STATUS.SUCCESS,
  usersData: [
    {
      status: 'active',
      username: 'Dev User',
      name: 'Dev User',
      userId: 'yv7q8g111qxy1s863lm5',
    },
    {
      status: 'active',
      username: 'Qa User',
      name: 'qa user',
      userId: '1HhvrKWjoFPXvOcbJSDx',
    },
  ],
  groupsDataStatus: RESOURCE_STATUS.SUCCESS,
  groupsData: [
    {
      userTagId: '00mbsdfbajiyz9mpygez',
      name: 'DevTags',
      description: 'tag description',
      status: 'Active',
    },
    {
      userTagId: '02jz80020o4pwbma0jl7',
      name: 'QaTags',
      description: 'tag description',
      status: 'Active',
    },
  ],
  isEditMode: false,
  isCloneMode: false,
  fetchGroups: jest.fn(),
  fetchUsers: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  notificationMediumStatus: RESOURCE_STATUS.SUCCESS,
  notificationMediumData: [
    {
      id: '7905a432-0c46-41c8-8ef7-fa529ed874f9',
      name: 'Email',
      description: 'Default Email Notification Medium',
      type: 'email',
    },
    {
      id: '7905a432-0c46-41c8-8ef7-fa529ed874f1',
      name: 'Slack',
      description: 'Slack Notification Medium',
      type: 'slack',
    },
  ],
  channelListStatus: RESOURCE_STATUS.SUCCESS,
  channelListData: [
    {
      channelId: 'C02MKF72621',
      channelName: 'Dev Channel',
    },
  ],
  dispatch: jest.fn(),
  recursiveApprovalChannelListLoading: jest.fn(),
  recursiveApprovalChannelListRequest: jest.fn(),
  recursiveApprovalChannelListReset: jest.fn(),
  approvalNotificationMediumListRequest: jest.fn(),
  translatedStrings: {
    loadingMembers: 'loading members',
    accessType: 'Access Type',
    approvalLabel: 'Approval Required',
    yesLabel: 'Yes',
    noLabel: 'No',
    notification: 'Notification Medium',
    notificationPlaceHolder: 'Select Notification Medium',
    userListLabel: 'User List',
    userListPlaceholder: 'User List',
    tagListLabel: 'Tag List',
    tagListPlaceholder: 'Search tags',
    approverTime: 'Maximum time to Approve',
    hhmm: 'Hours:Minutes',
    accessValidityAfterApprovalLabel: 'Access Validity after Approval',
    notificationMediumValidation: 'At least one notification medium for approvals is required.',
    usersValidation: 'At least one user is required.',
    groupsValidation: 'At least one tag is required.',
    maxApprovalTimeValidation: 'Max approval time is required.',
    maxApprovalFormatValidation: 'Max approvals should be in hours:minutes format',
    maxTimeAfterApprovalValidation: 'Max validity after approval should be in hours:minutes format',
    channelListLabel: 'Channel List',
    channelListPlaceholder: 'Search Channel',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      isApprovals: false,
      notificationMedium: '',
      channelList: [],
      isChannelsRequired: false,
      tagList: [],
      userList: [],
      approvalMaxTime: '',
      validFor: '',
      allowDeny: 'Allow',
    },
    validationSchema: yup.object({
      isApprovals: yup.boolean(),
      notificationMedium: yup.object().when('isApprovals', {
        is: true,
        then: yup.object().required(translatedStrings.notificationMediumValidation).nullable(),
        otherwise: yup.object().default('').nullable(),
      }),
      approvalMaxTime: yup.string().when('isApprovals', {
        is: true,
        then: yup
          .string()
          .required(translatedStrings.maxApprovalTimeValidation)
          .test('approvalMaxTime', translatedStrings.maxApprovalFormatValidation, (value) => {
            if (isEmpty(value)) {
              return true;
            }
            if (!value.includes(COLON_SEPARATOR)) {
              return false;
            }
            const [hours, minutes] = value
              .split(COLON_SEPARATOR)
              .map((data) => (data.length > 0 ? Number(data) : -1));
            const isTimeValid =
              isNaN(hours) ||
              isNaN(minutes) ||
              hours < 0 ||
              minutes < 0 ||
              minutes > 59 ||
              !getMinutesFromHMTime(value);
            return !isTimeValid;
          }),
      }),
      validFor: yup.string().when('isApprovals', {
        is: true,
        then: yup
          .string()
          .required(translatedStrings.maxTimeAfterApprovalValidation)
          .test('validFor', translatedStrings.maxTimeAfterApprovalValidation, (value) => {
            if (isEmpty(value)) {
              return true;
            }
            if (!value.includes(COLON_SEPARATOR)) {
              return false;
            }
            const [hours, minutes] = value
              .split(COLON_SEPARATOR)
              .map((data) => (data.length > 0 ? Number(data) : -1));
            const isTimeValid =
              isNaN(hours) ||
              isNaN(minutes) ||
              hours < 0 ||
              minutes < 0 ||
              minutes > 59 ||
              !getMinutesFromHMTime(value);
            return !isTimeValid;
          }),
      }),
      isChannelsRequired: yup.boolean(),
      tagList: yup.array().when('isApprovals', {
        is: true,
        then: yup.array().test('tagList', translatedStrings.groupsValidation, (value, context) => {
          const channelList = !isEmpty(context.parent.channelList);
          const isChannelsRequired = context.parent.isChannelsRequired;
          const userList = !isEmpty(context.parent.userList);
          const tagList = !isEmpty(context.parent.tagList);
          return tagList || userList || (isChannelsRequired && channelList);
        }),
        otherwise: yup.array().nullable(true),
      }),
      channelList: yup.array().when(['isApprovals', 'isChannelsRequired'], {
        is: (isApprovals, isChannelsRequired) => isApprovals && isChannelsRequired,
        then: yup
          .array()
          .test('channelList', translatedStrings.channelValidation, (value, context) => {
            const channelList = !isEmpty(context.parent.channelList);
            const userList = !isEmpty(context.parent.userList);
            const tagList = !isEmpty(context.parent.tagList);
            return tagList || userList || channelList;
          }),
        otherwise: yup.array().nullable(true),
      }),
      userList: yup.array().when('isApprovals', {
        is: true,
        then: yup.array().test('userList', translatedStrings.usersValidation, (value, context) => {
          const userList = !isEmpty(value);
          const channelList = !isEmpty(context.parent.channelList);
          const isChannelsRequired = context.parent.isChannelsRequired;
          const tagList = !isEmpty(context.parent.tagList);
          return userList || tagList || (isChannelsRequired && channelList);
        }),
        otherwise: yup.array().nullable(true),
      }),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <AddApprovalTab
      {...others}
      translatedStrings={translatedStrings}
      validationHook={validationHook}
    />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add Approval Tab', () => {
  it('Should display Access type and radio button for approval required', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const accessType = queryByText('Allow');
    expect(accessType).toBeInTheDocument();

    const yesBtn = queryByText(props.translatedStrings.yesLabel);
    expect(yesBtn).toBeInTheDocument();

    const noBtn = queryByText(props.translatedStrings.noLabel);
    expect(noBtn).toBeInTheDocument();
  });

  it('Should show/hide approval form base on radio button', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    let notificationMediumLabel = queryByText(props.translatedStrings.notification);
    expect(notificationMediumLabel).not.toBeInTheDocument();

    const yesRadioBtn = queryByText(props.translatedStrings.yesLabel);
    fireEvent.click(yesRadioBtn);

    notificationMediumLabel = queryByText(props.translatedStrings.notification);
    expect(notificationMediumLabel).toBeInTheDocument();
  });

  it('Should able to select/fill the form', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const yesRadioBtn = queryByText(props.translatedStrings.yesLabel);
    fireEvent.click(yesRadioBtn);

    const selectNotificationMedium = queryByText(props.translatedStrings.notificationPlaceHolder);
    expect(selectNotificationMedium).toBeInTheDocument();
    fireEvent.click(selectNotificationMedium);

    const selectNotificationMediumOption = queryByText(props.notificationMediumData[0].name);
    expect(selectNotificationMediumOption).toBeInTheDocument();
    fireEvent.click(selectNotificationMediumOption);

    const userListAutoCompleteContainer = queryByText(
      props.translatedStrings.userListLabel
    ).parentNode;
    const userListAutoComplete = userListAutoCompleteContainer.querySelector('svg');
    expect(userListAutoComplete).toBeInTheDocument();
    fireEvent.click(userListAutoComplete);

    const devUser = queryByText(props.usersData[0].name);
    expect(devUser).toBeInTheDocument();
    fireEvent.click(devUser);

    const tagListAutoCompleteContainer = queryByText(
      props.translatedStrings.tagListLabel
    ).parentNode;
    const tagListAutoComplete = tagListAutoCompleteContainer.querySelector('svg');
    expect(tagListAutoComplete).toBeInTheDocument();
    fireEvent.click(tagListAutoComplete);

    const devTag = queryByText(props.groupsData[0].name);
    expect(devTag).toBeInTheDocument();
    fireEvent.click(devTag);

    const maxTimeToApprove = queryByText(
      props.translatedStrings.approverTime
    ).parentNode.querySelector('input');
    expect(maxTimeToApprove).toBeInTheDocument();
    fireEvent.change(maxTimeToApprove, { target: { value: '1:00' } });

    const maxValidityAfterApproval = queryByText(
      props.translatedStrings.accessValidityAfterApprovalLabel
    ).parentNode.querySelector('input');
    expect(maxValidityAfterApproval).toBeInTheDocument();
    fireEvent.change(maxValidityAfterApproval, { target: { value: '00:10' } });
  });

  it('Should display channel list when selected notification medium is of slack type ', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const yesRadioBtn = queryByText(props.translatedStrings.yesLabel);
    fireEvent.click(yesRadioBtn);

    const selectNotificationMedium = queryByText(props.translatedStrings.notificationPlaceHolder);
    expect(selectNotificationMedium).toBeInTheDocument();
    fireEvent.click(selectNotificationMedium);

    let channelListLabel = queryByText(props.translatedStrings.channelListLabel);
    expect(channelListLabel).not.toBeInTheDocument();

    const selectNotificationMediumOption = queryByText(props.notificationMediumData[1].name);
    expect(selectNotificationMediumOption).toBeInTheDocument();
    fireEvent.click(selectNotificationMediumOption);

    channelListLabel = queryByText(props.translatedStrings.channelListLabel);
    expect(channelListLabel).toBeInTheDocument();

    const channelListAutoCompleteContainer = queryByText(
      props.translatedStrings.channelListLabel
    ).parentNode;
    const channelListAutoComplete = channelListAutoCompleteContainer.querySelector('svg');
    expect(channelListAutoComplete).toBeInTheDocument();
    fireEvent.click(channelListAutoComplete);

    const devChannel = queryByText(props.channelListData[0].channelName);
    expect(devChannel).toBeInTheDocument();
    fireEvent.click(devChannel);
  });

  it('Should display loader if any of the resource is loading', () => {
    const { rerender } = render(
      <ParentTestComponent {...props} usersDataStatus={RESOURCE_STATUS.LOADING} />
    );

    expect(props.initSpinnerOverlay).toBeCalledTimes(2);
    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: props.translatedStrings.loadingMembers,
      open: true,
      size: 'medium',
    });

    rerender(<ParentTestComponent {...props} />);
    expect(props.initSpinnerOverlay).toBeCalledTimes(3);

    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: props.translatedStrings.loadingMembers,
      open: false,
      size: 'medium',
    });
  });
});
