/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import Members from './Members';

const props = {
  memberData: {
    tags: [
      {
        name: 'DevTags',
        status: 'Active',
      },
    ],
    users: [
      {
        name: 'Qa User',
        status: 'active',
      },
      {
        name: 'Dev User',
        status: 'active',
      },
    ],
    channels: [],
    serviceIdentities: [
      {
        name: 'DevIdentities',
        status: 'Active',
      },
    ],
    tokens: [
      {
        name: 'DevToken',
        status: 'Active',
      },
    ],
  },
  viewPolicyHeaders: {
    general: 'General',
    members: 'Members',
    generic: 'Generic Conditions',
    approvals: 'Approvals',
  },
  translatedStrings: {
    noneText: 'None',
    allUsers: 'All Users',
    allTags: 'All tags',
    allSeviceIdentities: 'All Service Identities',
    allTokens: 'All Tokens',
    inactiveText: 'Inactive',
  },
  memberLabels: {
    user: 'Users',
    tags: 'Tags',
    identities: 'Service identities',
    tokens: 'API Tokens',
  },
};

beforeEach(cleanup);

describe('View Members Tab Details', () => {
  it('Should display provided policy general details', () => {
    const { queryByText } = render(<Members {...props} />);

    const usersLabel = queryByText(props.memberLabels.user);
    expect(usersLabel).toBeInTheDocument();

    const qaUser = queryByText(props.memberData.users[0].name);
    expect(qaUser).toBeInTheDocument();

    const devUser = queryByText(props.memberData.users[1].name);
    expect(devUser).toBeInTheDocument();

    const tagsLabel = queryByText(props.memberLabels.tags);
    expect(tagsLabel).toBeInTheDocument();

    const devTag = queryByText(props.memberData.tags[0].name);
    expect(devTag).toBeInTheDocument();

    const serviceIdentitiesLabel = queryByText(props.memberLabels.identities);
    expect(serviceIdentitiesLabel).toBeInTheDocument();

    const devIdentities = queryByText(props.memberData.tags[0].name);
    expect(devIdentities).toBeInTheDocument();

    const apiTokensLabel = queryByText(props.memberLabels.tokens);
    expect(apiTokensLabel).toBeInTheDocument();

    const devToken = queryByText(props.memberData.tokens[0].name);
    expect(devToken).toBeInTheDocument();
  });

  it('Should display inactive user if any inactive user present and all tokens', () => {
    const users = [
      {
        name: 'Qa User',
        status: 'inactive',
      },
    ];
    const memberData = { users, tokens: ['*'] };

    const { queryByText, queryAllByText } = render(<Members {...props} memberData={memberData} />);

    const qaInactiveUser = queryByText('Qa User (Inactive)');
    expect(qaInactiveUser).toBeInTheDocument();

    const allTokens = queryByText(props.translatedStrings.allTokens);
    expect(allTokens).toBeInTheDocument();

    const noneApiTokensAndSi = queryAllByText(props.translatedStrings.noneText);
    expect(noneApiTokensAndSi).toHaveLength(2);
  });
});
