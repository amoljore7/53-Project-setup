/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import General from './General';

const props = {
  generalData: { name: 'test_policy', description: 'Test policy Description', accessType: 'Allow' },
  viewPolicyHeaders: {
    general: 'General',
    members: 'Members',
    generic: 'Generic Conditions',
    approvals: 'Approvals',
  },
  translatedStrings: {
    policyName: 'Policy Name',
    description: 'Description',
    noneText: 'None',
    accessType: 'Access Type',
  },
};

beforeEach(cleanup);

describe('View General Tab Details', () => {
  it('Should display provided policy general details', () => {
    const { queryByText } = render(<General {...props} />);
    const permissionNameLabel = queryByText(props.translatedStrings.policyName);
    expect(permissionNameLabel).toBeInTheDocument();

    const permissionName = queryByText(props.generalData.name);
    expect(permissionName).toBeInTheDocument();

    const descriptionLabel = queryByText(props.translatedStrings.description);
    expect(descriptionLabel).toBeInTheDocument();

    const description = queryByText(props.generalData.description);
    expect(description).toBeInTheDocument();

    const accessTypeLabel = queryByText(props.translatedStrings.accessType);
    expect(accessTypeLabel).toBeInTheDocument();

    const accessType = queryByText(props.generalData.accessType);
    expect(accessType).toBeInTheDocument();
  });

  it('Should display the None if description is not present', () => {
    const temp_policy = { ...props.generalData };
    temp_policy.description = '';
    const { queryByText } = render(<General {...props} generalData={temp_policy} />);
    const description = queryByText(props.translatedStrings.noneText);
    expect(description).toBeInTheDocument();
  });

  it('Should display the None if accessType is not present', () => {
    const temp_policy = { ...props.generalData };
    temp_policy.accessType = '';
    const { queryByText } = render(<General {...props} generalData={temp_policy} />);
    const accessType = queryByText(props.translatedStrings.noneText);
    expect(accessType).toBeInTheDocument();
  });

  it('Should display the None if policy name is not present', () => {
    const temp_policy = { ...props.generalData };
    temp_policy.name = '';
    const { queryByText } = render(<General {...props} generalData={temp_policy} />);
    const policyName = queryByText(props.translatedStrings.noneText);
    expect(policyName).toBeInTheDocument();
  });
});
