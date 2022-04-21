/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import GlobalSettingsHome from '.';
import testUtils from '../../../../utils/test-utils';

const store = testUtils.storeFake({});

describe('global settings Landing Page', () => {
  it('displays all the cards/tiles on the global settings landing page', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <GlobalSettingsHome />
      </Provider>
    );
    expect(getAllByTestId('card').length).toEqual(1);
  });
});
