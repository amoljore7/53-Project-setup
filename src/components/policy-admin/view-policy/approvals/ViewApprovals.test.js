/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../utils/common-constants';
import ViewApprovals from './ViewApprovals';

const props = {
  policyViewData:
    '{"ipAddress":"10.10.10.10","timeOfAccess":{"from":"2022-03-03 08:00:00","to":"2022-03-04 06:30:00"},"approval":{"approvers":{"userIds":["yv7q8g111qxy1s863lm5"]},"validFor":30,"timeToApprove":10,"notificationMedium":"7905a432-0c46-41c8-8ef7-fa529ed874f9"}}',
  fetchedUsers: [
    {
      status: 'active',
      adminRoles: [],
      type: 'User',
      created: '2021-07-23T06:17:31Z',
      modified: '2021-07-23T06:17:34Z',
      email: 'dev.user@britive.com',
      username: 'Dev User',
      firstName: 'Dev',
      lastName: 'User',
      name: 'Dev User',
      externalId: null,
      mobile: '9999999999',
      phone: '8888888888',
      identityProvider: {
        id: 'yv7q8g111qxy1s863lm5',
        name: 'Britive',
        type: 'DEFAULT',
      },
      mappedAccounts: [],
      external: false,
      userId: 'yv7q8g111qxy1s863lm5',
    },
    {
      status: 'active',
      adminRoles: [],
      type: 'User',
      created: '2021-07-23T11:47:15Z',
      modified: null,
      email: 'Qa.user@britive.com',
      username: 'Qa User',
      firstName: 'Qa',
      lastName: 'User',
      name: 'qa user',
      externalId: null,
      mobile: null,
      phone: null,
      identityProvider: {
        id: '1HhvrKWjoFPXvOcbJSDx',
        name: 'Britive',
        type: 'DEFAULT',
      },
    },
  ],
  fetchedGroups: [
    {
      userTagId: '00mbsdfbajiyz9mpygez',
      name: 'BrendaTuckerOhaivautotestHhmqemrp',
      description: 'tag description',
      status: 'Active',
      userCount: 0,
      created: '2022-01-04T05:07:07Z',
      modified: null,
      external: false,
      userTagIdentityProviders: [
        {
          identityProvider: {
            id: '1HhvrKWjoFPXvOcbJSDx',
            name: 'Britive',
            type: 'DEFAULT',
          },
          externalId: null,
        },
      ],
    },
    {
      userTagId: '02jz80020o4pwbma0jl7',
      name: 'AngelOliverJhelkautotestPnhbkuwa',
      description: 'tag description',
      status: 'Active',
      userCount: 0,
      created: '2022-01-04T05:17:06Z',
      modified: null,
      external: false,
      userTagIdentityProviders: [
        {
          identityProvider: {
            id: '1HhvrKWjoFPXvOcbJSDx',
            name: 'Britive',
            type: 'DEFAULT',
          },
          externalId: null,
        },
      ],
    },
  ],
  notificationMediumData: {
    id: '7905a432-0c46-41c8-8ef7-fa529ed874f9',
    name: 'Email',
    description: 'Default Email Notification Medium',
    type: 'email',
    connectionParameters: null,
    referenceCount: 0,
  },
  notificationMediumDataStatus: RESOURCE_STATUS.SUCCESS,
  channelListStatus: RESOURCE_STATUS.INITIAL,
  channelListData: [],
  approvalLabels: {
    approvalRequired: 'Approval Required?',
    notification: 'Notification Medium',
    type: 'Approver Type',
    approvers: 'Approvers',
    time: 'Maximum Time to Approve',
    userListLabel: 'User List',
    tagListLabel: 'Tag List',
    channelListLabel: 'Channel List',
    maxValidTimeLabel: 'Access Validity after Approval',
  },
  viewPolicyHeaders: {
    general: 'General',
    members: 'Members',
    generic: 'Generic Conditions',
    approvals: 'Approvals',
  },
  translatedStrings: {
    yesText: 'Yes',
    noText: 'No',
    noneText: 'None',
    hours: (hours) => `${hours} Hours`,
    minutes: (minutes) => `${minutes} Minutes`,
  },
};

beforeEach(cleanup);

describe('View Approval Details', () => {
  it('Should display provided notification details', () => {
    const { queryByText } = render(<ViewApprovals {...props} />);
    const yesApprovalRequiredText = queryByText(props.translatedStrings.yesText);
    expect(yesApprovalRequiredText).toBeInTheDocument();

    const notificationMediumName = queryByText(props.notificationMediumData.name);
    expect(notificationMediumName).toBeInTheDocument();

    const devUser = queryByText(props.fetchedUsers[0].name);
    expect(devUser).toBeInTheDocument();

    const noneTags = queryByText(props.translatedStrings.noneText);
    expect(noneTags).toBeInTheDocument();

    const timeToApprove = queryByText(props.translatedStrings.minutes(30));
    expect(timeToApprove).toBeInTheDocument();

    const validFor = queryByText(props.translatedStrings.minutes(10));
    expect(validFor).toBeInTheDocument();
  });

  it('Should display the loader when notification API is being called', () => {
    const { queryByTestId, rerender } = render(
      <ViewApprovals {...props} channelListStatus={RESOURCE_STATUS.LOADING} />
    );
    let spinner = queryByTestId('bds-loader');
    expect(spinner).toBeInTheDocument();
    rerender(<ViewApprovals {...props} channelListStatus={RESOURCE_STATUS.SUCCESS} />);
    spinner = queryByTestId('bds-loader');
    expect(spinner).not.toBeInTheDocument();
  });

  it('Should display No when condition data is not present in response', () => {
    const { queryByText } = render(
      <ViewApprovals {...props} policyViewData={null} notificationMediumData={null} />
    );

    const displayNoApproval = queryByText(props.translatedStrings.noText);
    expect(displayNoApproval).toBeInTheDocument();
  });
});
