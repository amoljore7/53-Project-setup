/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PageHeaderContainer from './';
import testUtils from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

const store = testUtils.storeFake({
  pageHeader: {
    title: 'Role and Policy Management',
    routeToNameList: [
      {
        name: 'System Administrator',
        route: '/',
      },
      {
        name: 'Role and Policy Management',
      },
    ],
  },
});

const props = {
  setPageHeader: jest.fn(),
  match: {
    url: '/secret-manager',
  },
};

describe('Page header test cases', () => {
  it('Title passed as a props appears on the screen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeaderContainer {...props} />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('title')).toBeInTheDocument();
  });

  it('Breadcrumb list passed as a props appears on the screen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeaderContainer {...props} />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('breadcrumb')).toBeInTheDocument();
  });
});
