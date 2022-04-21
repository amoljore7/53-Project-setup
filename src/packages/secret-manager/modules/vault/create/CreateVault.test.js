/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateVault from './CreateVault';
import { buttonType } from './constants';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';

const props = {
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  createVaultAction: jest.fn(),
  vaultFormError: {},
  setPageHeader: jest.fn(),
  vaultLoading: false,
  flushCreateVault: jest.fn(),
  spinnerOverlay: jest.fn(),
  getNotificationMediumList: jest.fn(),
  notificationMediumList: [],
  fetchUsers: jest.fn(),
  notificationMediumLoading: false,
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

describe.only('Secret Manager - Create Vault page', () => {
  it('displays Create Vault Button on screen', () => {
    const { getByRole } = render(<CreateVault {...props} />);
    const saveButton = getByRole('button', { name: buttonType.create });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays Cancel Button on screen', () => {
    const { getByRole } = render(<CreateVault {...props} />);
    const cancelButton = getByRole('button', { name: buttonType.cancel });
    expect(cancelButton).toBeInTheDocument();
  });

  it("displays Textfield's on screen", () => {
    const { getByRole } = render(<CreateVault {...props} />);
    expect(getByRole('textField')).toBeInTheDocument();
  });

  it('Cancel Button history goBack should be work', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/create">
        <CreateVault {...props} />
      </Route>,
      {
        route: '/admin/secret-manager/vault/create',
      }
    );

    const cancelButton = queryByRole('button', { name: buttonType.cancel });
    await waitFor(() => fireEvent.click(cancelButton));
    expect(props.history.goBack).toBeCalledTimes(1);
  });

  it('Flush vault before history goBack', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager/vault/create">
        <CreateVault {...props} />
      </Route>,
      {
        route: '/admin/secret-manager/vault/create',
      }
    );

    const cancelButton = queryByRole('button', { name: buttonType.cancel });
    await waitFor(() => fireEvent.click(cancelButton));
    expect(props.flushCreateVault).toBeCalledTimes(1);
    expect(props.history.goBack).toBeCalledTimes(1);
  });
});
