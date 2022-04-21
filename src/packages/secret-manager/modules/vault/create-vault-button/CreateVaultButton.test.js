/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BritiveVault from '.';
import testUtils from '../../../../../utils/test-utils';

const store = testUtils.storeFake({
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

describe('Secret Manager - Britive Vault page', () => {
  it('displays Create a vault begin on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BritiveVault />
      </Provider>
    );
    expect(getByRole('typography')).toBeInTheDocument();
  });

  it('displays Create Vault Button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BritiveVault />
      </Provider>
    );
    expect(getByRole('create-britive-vault')).toBeInTheDocument();
  });
});
