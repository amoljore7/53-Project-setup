/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import GenericConditions from './GenericConditions';

const props = {
  policyViewData: {
    condition:
      '{"ipAddress":"10.10.10.10","timeOfAccess":{"from":"2022-03-03 08:00:00","to":"2022-03-04 06:30:00"},"approval":{"approvers":{"userIds":["yv7q8g111qxy1s863lm5"]},"validFor":30,"timeToApprove":10,"notificationMedium":"7905a432-0c46-41c8-8ef7-fa529ed874f9"}}',
  },
  viewPolicyHeaders: {
    general: 'General',
    members: 'Members',
    generic: 'Generic Conditions',
    approvals: 'Approvals',
  },
  translatedStrings: {
    noneText: 'None',
  },
  conditionsLabels: {
    ip: 'IP Addresses',
    startTime: 'Start Time',
    endTime: 'End Time',
    startDate: 'Start Date/Time',
    endDate: 'End Date/Time',
  },
};

beforeEach(cleanup);

describe('View Generic-condition Tab Details', () => {
  it('Should display provided policy general details', () => {
    const { queryByText } = render(<GenericConditions {...props} />);

    const ipAddressLabel = queryByText(props.conditionsLabels.ip);
    expect(ipAddressLabel).toBeInTheDocument();

    const ipAddress = queryByText('10.10.10.10');
    expect(ipAddress).toBeInTheDocument();

    const startDateLabel = queryByText(props.conditionsLabels.startDate);
    expect(startDateLabel).toBeInTheDocument();

    const startDate = queryByText('03/03/2022 1:30 PM');
    expect(startDate).toBeInTheDocument();

    const endDateLabel = queryByText(props.conditionsLabels.endDate);
    expect(endDateLabel).toBeInTheDocument();

    const endDate = queryByText('04/03/2022 12:00 PM');
    expect(endDate).toBeInTheDocument();
  });

  it('Should display the Start and End Time', () => {
    const condition =
      '{"ipAddress":"10.10.10.10","timeOfAccess":{"from":"12:00:00","to":"13:00:00"}}';
    const { queryByText } = render(<GenericConditions {...props} policyViewData={{ condition }} />);

    const startDateLabel = queryByText(props.conditionsLabels.startTime);
    expect(startDateLabel).toBeInTheDocument();

    const startDate = queryByText('5:30 PM');
    expect(startDate).toBeInTheDocument();

    const endDateLabel = queryByText(props.conditionsLabels.endTime);
    expect(endDateLabel).toBeInTheDocument();

    const endDate = queryByText('6:30 PM');
    expect(endDate).toBeInTheDocument();
  });

  it('Should display the None if IP Address is not present', () => {
    const condition = '{"ipAddress":"","timeOfAccess":{"from":"12:00:00","to":"13:00:00"}}';
    const { queryByText } = render(<GenericConditions {...props} policyViewData={{ condition }} />);
    const ipAddress = queryByText(props.translatedStrings.noneText);
    expect(ipAddress).toBeInTheDocument();
  });
});
