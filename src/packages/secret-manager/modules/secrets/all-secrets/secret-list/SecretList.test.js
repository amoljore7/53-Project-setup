import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SecretsList from './SecretList';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';

import { translatedStrings, translatedStringsForApprovalsModal } from './constants';
const selectedItemAncestors = [
  {
    label: 'abc',
    hasChildren: true,
    details: {
      entityType: 'node',
    },
  },
];
const props = {
  vaultId: '123',
  secretListData: [
    {
      description: '',
      entityType: 'secret',
      name: 'Secret1',
      path: '/Secret1',
      metadata: {
        ['sm.node.create']: 'Allow',
        ['sm.node.delete']: 'Deny',
        ['sm.node.list']: 'Allow',
        ['sm.secret.update']: 'Deny',
      },
      status: 'Pending',
    },
    {
      description: '',
      entityType: 'secret',
      name: 'Secret2',
      path: '/Secret2',
      metadata: {
        ['sm.node.create']: 'Allow',
        ['sm.node.delete']: 'Allow',
        ['sm.node.list']: 'Allow',
        ['sm.secret.update']: 'Deny',
      },
      status: 'ApprovalRequired',
    },
    {
      description: '',
      entityType: 'secret',
      name: 'Secret3',
      path: '/Secret3',
      metadata: {
        ['sm.node.create']: 'Allow',
        ['sm.node.delete']: 'Deny',
        ['sm.node.list']: 'Allow',
        ['sm.secret.update']: 'Deny',
      },
      status: 'Allow',
    },
  ],
  secretSearchTerm: '',
  selectedNodeMetadata: {
    ['sm.node.create']: 'Allow',
    ['sm.node.delete']: 'Deny',
    ['sm.node.list']: 'Allow',
    ['sm.secret.update']: 'Deny',
  },
  updateSecretListSearchTerm: jest.fn(),
  selectionHandler: jest.fn(),
  getSecretList: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  secretListLoading: false,
  deleteSecret: jest.fn(),
  secretListPagination: jest.fn(),
  selectedItemAncestorsArray: [],
  selectedItemParents: [],
  history: {},
  getSecretLoadMoreList: jest.fn(),
  selectedNodeMetadata: {},
  secretDetails: jest.fn(),
  secretDetailsStatus: RESOURCE_STATUS.INITIAL,
  secretTemplateDetailsStatus: RESOURCE_STATUS.INITIAL,
  resetSecretDetails: jest.fn(),
  resetSecretTemplateDetails: jest.fn(),
  secretDetailsError: {},
  secretTemplateDetailsError: {},
  openNotification: jest.fn(),
};

const usersData = { result: [] };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    allUsers: usersData.result,
  }),
  useDispatch: () => jest.fn(),
}));

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const secretDetailErrorForApprovalRequest = {
  status: 403,
  data: {
    errorCode: 'PE-0011',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};

const secretDetailErrorWaitingForApproval = {
  status: 403,
  data: {
    errorCode: 'PE-0010',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};

describe.only('Secret Listing Page', () => {
  it('three rows of secrets appear on the screen', async () => {
    const { getAllByRole } = render(<SecretsList {...props} />);
    expect(getAllByRole('row').length).toEqual(4);
  });

  it('getSecretList gets called', async () => {
    render(<SecretsList {...props} secretSearchTerm="abc" />);
    expect(props.getSecretList).toBeCalled();
  });

  it('displays the search field inside all secrets table', async () => {
    const { getByPlaceholderText } = render(<SecretsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.secretsSearchPlaceholder);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside secrets table should be working', async () => {
    const { getByPlaceholderText } = render(<SecretsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.secretsSearchPlaceholder);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });
  });

  it('delete dialog appears on the screen', async () => {
    const { getAllByTestId, getByText } = render(<SecretsList {...props} />);
    const deleteIcon = getAllByTestId('delete-icon')[1];
    fireEvent.click(deleteIcon);
    expect(getByText('Delete Secret?')).toBeInTheDocument();
  });

  it('delete dialog appears on the screen', async () => {
    const { getAllByTestId, getByText } = render(<SecretsList {...props} />);
    const deleteIcon = getAllByTestId('delete-icon')[1];
    fireEvent.click(deleteIcon);
    expect(getByText('Delete Secret?')).toBeInTheDocument();
  });

  it('approvals modal appears on the screen', async () => {
    const { getByTitle } = render(<SecretsList {...props} />);
    const row = getByTitle(props.secretListData[0].name).closest('tr');
    const manageActionContainer = row.querySelector('.action-column-container');
    const manageIcon = manageActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(manageIcon));
    expect(props.secretDetails).toBeCalled();
  });

  it('Should render 2 rows(records) in table as static data is provided', () => {
    const { getByTitle } = render(<SecretsList {...props} />);
    // record 1
    const secretRecord1 = getByTitle(props.secretListData[0].name).closest('tr');
    expect(secretRecord1).toBeInTheDocument();
    // record 2
    const secretRecord2 = getByTitle(props.secretListData[1].name).closest('tr');
    expect(secretRecord2).toBeInTheDocument();
  });

  it('displays the loading for get secrets inside secrets table', async () => {
    props.secretListLoading = true;
    const { getByText, rerender } = render(<SecretsList {...props} />);
    const loading = getByText(translatedStrings.secretsLoadingMessage);
    expect(loading).toBeInTheDocument();
    props.secretListLoading = false;
    rerender(<SecretsList {...props} />);
    expect(loading).not.toBeInTheDocument();
  });

  it('waiting for approvals dialog appears appears on the screen', async () => {
    const { getByTitle, getByText, rerender } = render(<SecretsList {...props} />);
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const manageActionContainer = row.querySelector('.action-column-container');
    const manageIcon = manageActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(manageIcon));
    rerender(
      <SecretsList
        {...props}
        secretTemplateDetailsStatus={RESOURCE_STATUS.ERROR}
        secretDetailsStatus={RESOURCE_STATUS.ERROR}
        secretDetailsError={secretDetailErrorWaitingForApproval}
      />
    );
    expect(getByText('Waiting for Approval')).toBeInTheDocument();
  });

  it('On click of view secret for approval request status Approval Request popup should get called', async () => {
    const { getByTitle, rerender, getByRole } = render(<SecretsList {...props} />);
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const manageActionContainer = row.querySelector('.action-column-container');
    const manageIcon = manageActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(manageIcon));
    rerender(
      <SecretsList
        {...props}
        secretTemplateDetailsStatus={RESOURCE_STATUS.ERROR}
        secretDetailsStatus={RESOURCE_STATUS.ERROR}
        secretDetailsError={secretDetailErrorForApprovalRequest}
      />
    );
    const sendRequestButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.sendRequestButton,
    });
    await waitFor(() => fireEvent.click(sendRequestButton));
    expect(sendRequestButton).toBeInTheDocument();
  });
});
