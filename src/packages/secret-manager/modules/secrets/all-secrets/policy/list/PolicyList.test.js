/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import PolicyList from './PolicyList';
import testUtils from '../../../../../../../utils/test-utils';
import { translatedStrings } from './constants';
import { classes } from '../../constants';
import { translate } from '../../../../../externalization';
import { allSecretsPath } from '../../../../../../../utils/common-constants';

const usedSelectors = {
  searchRole: 'searchbox',
  tableRowClass: 'bds-table-row',
};

const policyListReducer = {
  policyList: {
    loading: false,
    result: [
      {
        id: '1',
        name: 'Admin Policy 1',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
        accessType: 'Allow',
        resources: ['*'],
        consumer: 'secretmanager',
        accessLevel: 'SM_View',
        resource: '/*',
        listPolicyPath: '/',
      },
      {
        id: '2',
        name: 'Admin Policy 2',
        description: '',
        isActive: false,
        isDraft: false,
        isReadOnly: false,
        accessType: 'Allow',
        resources: ['*'],
        consumer: 'secretmanager',
        accessLevel: 'SM_View',
        resource: '/*',
        listPolicyPath: '/',
      },
      {
        id: '3',
        name: 'Admin Policy 3',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
        resources: ['*', '/*', '/'],
        resource: '/*',
        accessLevel: 'SM_View',
        accessType: 'Allow',
        listPolicyPath: '/',
      },
      {
        id: '4',
        name: 'Admin Policy 4',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
        accessLevel: 'SM_CRUD',
        accessType: 'Allow',
        consumer: 'secretmanager',
        resource: '/*',
        resources: ['*', '/*', '/'],
      },
    ],
    error: null,
    pagination: {
      next: '',
      prev: '',
    },
    searchTerm: '',
  },
};

const policyActions = {
  create: 'authz.policy.create',
  update: 'authz.policy.update',
  delete: 'authz.policy.delete',
  read: 'authz.policy.read',
};

const policyEvalData = {
  [policyActions.create]: 'Allow',
  [policyActions.update]: 'Allow',
  [policyActions.delete]: 'Allow',
  [policyActions.read]: 'Allow',
};

const props = {
  policyListState: policyListReducer.policyList,
  deletePolicyRequest: jest.fn(),
  togglePolicyRequest: jest.fn(),
  getPolicyListData: jest.fn(),
  setPageHeader: jest.fn(),
  history: {
    back: jest.fn(),
    push: jest.fn(),
  },
  match: {
    url: '/admin/secret-manager/vault/secrets/all-secrets',
  },
  updatePolicyListSearchTerm: jest.fn(),
  getPolicyListLoadMoreData: jest.fn(),
  policyEvalData,
  selectedItemAncestors: [
    {
      label: 'GSLab Vault 2',
      hasChildren: true,
      details: {
        entityType: 'node',
      },
      actionItems: [
        {
          title: 'Add Folder',
        },
        {
          title: 'Add Secret',
        },
      ],
      nodes: [],
      leaves: [],
    },
  ],
  nodeSecretMetadataState: {
    loading: false,
    error: null,
    result: {
      'authz.policy.update': 'Allow',
      'authz.policy.read': 'Allow',
      'authz.policy.delete': 'Allow',
      'authz.policy.create': 'Allow',
    },
  },
  batchEvalData: {
    'sm.passwordpolicy.update': 'Allow',
    'sm.passwordpolicy.read': 'Allow',
    'sm.passwordpolicy.delete': 'Allow',
    'sm.passwordpolicy.create': 'Allow',
    'sm.passwordpolicy.list': 'Allow',
    'sm.secrettemplate.update': 'Allow',
    'sm.secrettemplate.read': 'Allow',
    'sm.secrettemplate.delete': 'Allow',
    'sm.secrettemplate.create': 'Allow',
    'sm.secrettemplate.list': 'Allow',
    'sm.vault.update': 'Allow',
    'sm.vault.read': 'Allow',
    'sm.vault.delete': 'Allow',
    'sm.vault.create': 'Allow',
    'sm.vault.list': 'Allow',
    'identity.user.list': 'Allow',
    'securityadmin.security.list': 'Allow',
    'nm.notification.list': 'Allow',
  },
};

const store = testUtils.storeFake({
  policyListReducer,
});

// eslint-disable-next-line react/prop-types
const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

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

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

describe('Policy Listing unit tests ', () => {
  it('Search filter should be visible and working', async () => {
    const inputText = 'test';
    const { queryByRole } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );

    const searchInput = queryByRole(usedSelectors.searchRole);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: {
        value: inputText,
      },
    });

    expect(searchInput.value).toContain(inputText);
  });

  it('Table shows four rows', async () => {
    render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    expect(document.getElementsByClassName(usedSelectors.tableRowClass).length).toBe(4);
  });

  it('Searching updates search term in reducer and data is fetched', async () => {
    const inputText = 'test';
    const { queryByRole } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const search = queryByRole(usedSelectors.searchRole);
    fireEvent.change(search, { target: { value: inputText } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(props.updatePolicyListSearchTerm).toBeCalled();
    expect(props.updatePolicyListSearchTerm).toBeCalledWith(inputText);
    expect(props.getPolicyListData).toBeCalledWith('/');
  });

  it('Can toggle policies enable to disable?', async () => {
    const { getByTitle, queryByText } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const toggleActionContainer = firstRow.querySelector(`.${classes.policyActionToggle}`);
    const toggleIcon = toggleActionContainer.querySelector('svg');
    expect(toggleIcon).toBeInTheDocument();

    fireEvent.click(toggleIcon);

    const dialogBoxToggle = queryByText(/Disable Policy?/i);
    expect(dialogBoxToggle).toBeInTheDocument();

    const yesButton = queryByText(translate('YES_DISABLE'));
    expect(yesButton).toBeInTheDocument();

    fireEvent.click(yesButton);
    expect(props.togglePolicyRequest).toBeCalledWith({
      id: policyListReducer.policyList.result[0].id,
      status: 'Enabled',
      listPolicyPath: '/',
      resource: '/*',
    });
  });

  it('Can toggle policies disable to enable?', async () => {
    const { getByTitle, queryByText } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[1].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const toggleActionContainer = firstRow.querySelector(`.${classes.policyActionToggle}`);
    const toggleIcon = toggleActionContainer.querySelector('svg');
    expect(toggleIcon).toBeInTheDocument();

    fireEvent.click(toggleIcon);

    const dialogBoxToggle = queryByText(/Enable Policy?/i);
    expect(dialogBoxToggle).toBeInTheDocument();

    const yesButton = queryByText(translate('YES_ENABLE'));
    expect(yesButton).toBeInTheDocument();

    fireEvent.click(yesButton);
    expect(props.togglePolicyRequest).toBeCalledWith({
      id: policyListReducer.policyList.result[1].id,
      status: 'Disabled',
      listPolicyPath: '/',
      resource: '/*',
    });
  });

  it('Can delete policies', () => {
    const { getByTitle, getByText, queryByText } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const deleteActionContainer = firstRow.querySelector(`.${classes.policyActionDelete}`);
    const deleteIcon = deleteActionContainer.querySelector('svg');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    const dialogBoxDelete = queryByText(/Delete Policy?/i);
    expect(dialogBoxDelete).toBeInTheDocument();

    const yesButton = getByText(translatedStrings.delete.primaryText);
    expect(yesButton).toBeInTheDocument();

    fireEvent.click(yesButton);
    expect(props.deletePolicyRequest).toBeCalledWith({
      id: policyListReducer.policyList.result[0].id,
      resource: '/*',
      listPolicyPath: '/',
    });
  });

  it('on manage action button click user should be navigated to view page', async () => {
    const { getByTitle } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const viewActionContainer = firstRow.querySelector(`.${classes.policyActionView}`);
    const viewIcon = viewActionContainer.querySelector('svg');

    fireEvent.click(viewIcon);

    expect(viewIcon).toBeInTheDocument();
    expect(props.history.push).toBeCalledWith(
      `${allSecretsPath}/policy/view/${policyListReducer.policyList.result[0].id}?path=/`
    );
  });
});
