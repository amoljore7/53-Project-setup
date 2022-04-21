/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, waitFor, render } from '@testing-library/react';
import EditVault from './EditVault';
import testUtils from '../../../../../utils/test-utils';
import { buttonType } from './constants';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';

const store = testUtils.storeFake({
  vaultReducer: {
    deleteVault: {},
    notificationMediumListReducer: {},
    usersList: {},
    tagsList: {},
    channelList: {},
  },
  vaultLanding: {
    vaultStatusCode: 123,
  },
  batchEvalReducer: {
    result: {
      'sm.vault.create': 'Allow',
      'sm.vault.update': 'Allow',
      'sm.vault.delete': 'Allow',
      'sm.vault.read': 'Allow',
      'sm.vault.list': 'Allow',
    },
  },
});

const props = {
  // match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  setPageHeader: jest.fn(),
  openNotification: 'general',
  getVaultDetails: jest.fn(),
  editVaultDetailsRequest: jest.fn(),
  vaultFormError: {},
  setPageHeader: jest.fn(),
  editVaultRequestLoading: false,
  flushEditVault: jest.fn(),
  spinnerOverlay: jest.fn(),
  getNotificationMediumList: jest.fn(),
  notificationMediumList: [],
  notificationMediumLoading: false,
  fetchUsers: jest.fn(),
  usersData: [],
  usersLoading: false,
  fetchTags: jest.fn(),
  tagsData: [],
  tagsLoading: false,
  fetchChannelList: jest.fn(),
  channelData: [],
  channelLoading: false,
};

beforeEach(cleanup);

describe('Secret Manager - Britive Vault update page', () => {
  it('displays Save Vault Button on screen', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );

    const saveButton = getByRole('button', { name: buttonType.save });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays Reset Vault Button on screen', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );

    const resetButton = getByRole('button', { name: buttonType.reset });
    expect(resetButton).toBeInTheDocument();
  });

  it('displays Cancel Button on screen', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );

    const cancelButton = getByRole('button', { name: buttonType.cancel });
    expect(cancelButton).toBeInTheDocument();
  });

  it('Modal Should be open on click of Cancel Button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: buttonType.cancel });
    await waitFor(() => fireEvent.click(cancelButton));

    modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).toBeInTheDocument();
  });

  it('Yes, Cancel Button of Cancel Modal Should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: buttonType.cancel });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalCancelButton = queryByRole('button', { name: translatedStrings.yesDiscard });

    expect(props.flushEditVault).toBeCalledTimes(0);
    fireEvent.click(modalCancelButton);
    expect(props.flushEditVault).toBeCalledTimes(1);
  });

  it('Yes, Cancel Button history goBack should be work', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/edit/:id">
        <Provider store={store}>
          <EditVault {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager/vault/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: buttonType.cancel });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalCancelButton = queryByRole('button', { name: translatedStrings.yesDiscard });

    expect(props.history.goBack).toBeCalledTimes(0);
    fireEvent.click(modalCancelButton);
    expect(props.history.goBack).toBeCalledTimes(0);
  });
});
