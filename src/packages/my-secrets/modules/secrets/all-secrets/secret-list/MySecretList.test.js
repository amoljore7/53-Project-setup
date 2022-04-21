/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import MySecretList from './MySecretList';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import testUtils from '../../../../../../utils/test-utils';
import {
  translatedStrings,
  translatedStringsForApprovalsModal,
  translatedStringsForWaitingApproval,
} from './constants';

const userData = { result: [] };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    loading: userData.result,
  }),
}));

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const store = testUtils.storeFake({});

const vaultId = '123';

const secretListData = [
  {
    description: '',
    entityType: 'secret',
    id: '04265cd3-5e30-48a1-9370-7383d799a616',
    metadata: { ['sm.secret.read']: 'Allow' },
    name: 'TestSecret1',
    path: '/TestFolder/TestSecret1',
    rotationInterval: 30,
    secretNature: 'static',
    secretType: 'p-autotestMkivdxtfCdta',
    status: 'Allow',
  },
  {
    description: '',
    entityType: 'secret',
    id: '3ecaddc8-491a-4e4b-a428-f8f9b4d24b89',
    metadata: { ['sm.secret.read']: 'Deny' },
    name: 'cli_secret4',
    path: '/cli_node/cli_secret4',
    rotationInterval: 1,
    secretNature: 'static',
    secretType: 'secretT and test',
    status: 'ApprovalRequired',
  },
];
const selectedItemAncestors = [
  {
    label: 'abc',
    hasChildren: true,
    details: {
      entityType: 'node',
    },
  },
];
const secretSearchTerm = '';
const secretDetailErrorForApprovalRequest = {
  status: 403,
  data: {
    errorCode: 'PE-0011',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};

const secretDetailErrorForApprovalPending = {
  status: 403,
  data: {
    errorCode: 'PE-0010',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};
const props = {
  getSecretList: jest.fn(),
  secretListData: secretListData,
  secretListPagination: jest.fn(),
  getSecretDetails: jest.fn(),
  openNotification: jest.fn(),
  getSecretLoadMoreList: jest.fn(),
  updateSecretListSearchTerm: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  selectionHandler: jest.fn(),
  resetSecretDetails: jest.fn(),
  groupsData: [],
  selectedItemAncestors: selectedItemAncestors,
  usersData: [],
  secretListLoading: false,
  vaultId: vaultId,
  secretDetailData: {},
  secretTemplateData: {},
  secretSearchTerm: secretSearchTerm,
  secretDetailStatus: RESOURCE_STATUS.INITIAL,
  secretTemplateDetailStatus: RESOURCE_STATUS.INITIAL,
  getUsersStatus: RESOURCE_STATUS.INITIAL,
  getGroupsStatus: RESOURCE_STATUS.INITIAL,
  secretDetailError: {},
  secretTemplateDetailError: {},
};

beforeEach(cleanup);

describe.only('My Secrets - Secrets Listing Page', () => {
  it('three rows of secrets appear on the screen', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    expect(getAllByRole('row').length).toEqual(3);
  });

  it('displays the secrets table list', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const allSecretsTable = getByTestId('all-secrets-table');
    expect(allSecretsTable).toBeInTheDocument();
  });

  it('Should render 2 rows(records) in table as static data is provided', () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    // record 1
    const secretRecord1 = getByTitle(props.secretListData[0].name).closest('tr');
    expect(secretRecord1).toBeInTheDocument();
    // record 2
    const secretRecord2 = getByTitle(props.secretListData[1].name).closest('tr');
    expect(secretRecord2).toBeInTheDocument();
  });

  it('getSecretList gets called', async () => {
    const updatedProps = { ...props };
    updatedProps.secretSearchTerm = 'abc';
    updatedProps.updateSecretListSearchTerm = props.secretSearchTerm;
    render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    expect(props.getSecretList).toBeCalled();
  });

  it('displays the search field inside all secrets table', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const searchField = getByPlaceholderText(translatedStrings.searchPlaceholderText);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside secrets table should be working', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const searchField = getByPlaceholderText(translatedStrings.searchPlaceholderText);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });
  });

  it('displays the loading for get all secrets inside secrets table', async () => {
    props.secretListLoading = true;
    const { getByText, rerender } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const loading = getByText(translatedStrings.secretsLoadingMessage);
    expect(loading).toBeInTheDocument();
    props.secretListLoading = false;
    rerender(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    expect(loading).not.toBeInTheDocument();
  });

  it('displays the view secret page on clicking of view icon inside secrets table', async () => {
    const { getByTitle, getByRole, rerender } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[0].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.SUCCESS}
          secretDetailStatus={RESOURCE_STATUS.SUCCESS}
        />
      </Provider>
    );
    const copyAllButton = getByRole('button', { name: translatedStrings.copyAllText });
    await waitFor(() => fireEvent.click(copyAllButton));
    expect(props.openNotification).toBeCalledTimes(1);
  });

  it('On view secret page on clicking of copy all button', async () => {
    const { getByTitle, getByRole, rerender } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[0].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.SUCCESS}
          secretDetailStatus={RESOURCE_STATUS.SUCCESS}
        />
      </Provider>
    );
    const copyAllButton = getByRole('button', { name: translatedStrings.copyAllText });
    await waitFor(() => fireEvent.click(copyAllButton));
    expect(copyAllButton).toBeInTheDocument();
  });

  it('On view secret page on clicking of close button modal should get close', async () => {
    const { getByTitle, getByRole, rerender } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[0].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.SUCCESS}
          secretDetailStatus={RESOURCE_STATUS.SUCCESS}
        />
      </Provider>
    );
    const copyAllButton = getByRole('button', { name: translatedStrings.copyAllText });
    const closeButton = getByRole('button', { name: translatedStrings.closeText });
    await waitFor(() => fireEvent.click(closeButton));
    expect(copyAllButton).not.toBeInTheDocument();
  });

  it('On click of view secret for approval request status Approval Request popup should get called', async () => {
    const { getByTitle, rerender, getByRole } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailError={secretDetailErrorForApprovalRequest}
        />
      </Provider>
    );
    const sendRequestButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.sendRequestButton,
    });
    await waitFor(() => fireEvent.click(sendRequestButton));
    expect(sendRequestButton).toBeInTheDocument();
  });

  it('In view secret modal for approval request, popup should get closed on click of close button', async () => {
    const { getByTitle, rerender, getByRole } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailError={secretDetailErrorForApprovalRequest}
        />
      </Provider>
    );
    const sendRequestButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.sendRequestButton,
    });
    const closeButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.cancelText,
    });
    await waitFor(() => fireEvent.click(closeButton));
    expect(sendRequestButton).not.toBeInTheDocument();
  });
  it('displays the waiting for approval dialog on clicking of view Secret icon', async () => {
    const { getByTitle, rerender, getByText } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailError={secretDetailErrorForApprovalPending}
        />
      </Provider>
    );
    const notifiedText = getByText(translatedStringsForWaitingApproval.notifiedText);
    expect(notifiedText).toBeInTheDocument();
  });

  it('On click of view secret for approval pending status Approval Pending popup should get open', async () => {
    const { getByTitle, rerender, getByText } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailError={secretDetailErrorForApprovalPending}
        />
      </Provider>
    );
    const approvalPendingText = getByText(
      translatedStringsForWaitingApproval.waitingApprovalDialogTitle
    );
    expect(approvalPendingText).toBeInTheDocument();
  });

  it('On click of OK button Approval Pending popup, popup should get closed', async () => {
    const { getByTitle, rerender, getByRole, getByText } = render(
      <Provider store={store}>
        <MySecretList {...props} />
      </Provider>
    );
    const row = getByTitle(props.secretListData[1].name).closest('tr');
    const viewActionContainer = row.querySelector('.secrets-eye-icon');
    const viewIcon = viewActionContainer.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIcon));
    rerender(
      <Provider store={store}>
        <MySecretList
          {...props}
          secretTemplateDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailStatus={RESOURCE_STATUS.ERROR}
          secretDetailError={secretDetailErrorForApprovalPending}
        />
      </Provider>
    );
    const approvalPendingText = getByText(
      translatedStringsForWaitingApproval.waitingApprovalDialogTitle
    );
    const okButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.waitingApprovalDialogPrimaryButton,
    });
    await waitFor(() => fireEvent.click(okButton));
    expect(approvalPendingText).not.toBeInTheDocument();
  });
});
