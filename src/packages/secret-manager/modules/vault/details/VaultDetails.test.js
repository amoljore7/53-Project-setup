/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import VaultDetails from './VaultDetails';
import testUtils from '../../../../../utils/test-utils';
import { buttonType } from './constants';
import { Route } from 'react-router-dom';

const store = testUtils.storeFake({
  vaultReducer: {
    deleteVault: {},
    notificationMediumListReducer: {},
    usersList: {},
    tagsList: {},
    channelList: {},
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
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  setPageHeader: jest.fn(),
};
beforeEach(cleanup);

describe('Secret Manager - Britive Vault Details page', () => {
  it('display Edit vault button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <VaultDetails {...props} />
      </Provider>
    );
    const editButton = getByRole('button', { name: buttonType.edit });
    expect(editButton).toBeInTheDocument();
  });

  it('display Delete vault button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <VaultDetails {...props} />
      </Provider>
    );
    const deleteButton = getByRole('button', { name: buttonType.delete });
    expect(deleteButton).toBeInTheDocument();
  });

  it('display Rotate vault button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <VaultDetails {...props} />
      </Provider>
    );
    const rotateVaultKeyButton = getByRole('button', { name: buttonType.rotateVault });
    expect(rotateVaultKeyButton).toBeInTheDocument();
  });
  it('display Close a vault button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <VaultDetails {...props} />
      </Provider>
    );
    const closetButton = getByRole('button', { name: buttonType.close });
    expect(closetButton).toBeInTheDocument();
  });

  it('Close Button history goBack should be work', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="/admin/secret-manager">
        <Provider store={store}>
          <VaultDetails {...props} />
        </Provider>
      </Route>,
      {
        route: '/admin/secret-manager',
      }
    );

    const cancelButton = queryByRole('button', { name: buttonType.close });
    await waitFor(() => fireEvent.click(cancelButton));
    expect(props.history.goBack).toBeCalledTimes(0);
  });
});
