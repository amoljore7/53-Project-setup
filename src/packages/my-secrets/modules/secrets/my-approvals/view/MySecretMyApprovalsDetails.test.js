/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import MySecretMyApprovalsDetails from './MySecretMyApprovalsDetails';
import testUtils from '../../../../../../utils/test-utils';
import { buttonType } from './constants';

const approvalId = '8702d328-9a4e-40c7-af9e-2c99d4c13135';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: approvalId,
  }),
}));

const store = testUtils.storeFake({
  userSecretsReducer: {
    myApprovalsReducer: {
      myApprovalsDetails: {
        data: {
          requestId: '8702d328-9a4e-40c7-af9e-2c99d4c13135',
          userId: 'q41ll9v78zfluhhsacez',
          resource: '/ajsecret3',
          action: 'sm.secret.read',
          justification: 'test',
          approvers: {
            userIds: ['yv7q8g111qxy1s863lm5'],
          },
          createdAt: '2022-01-20T12:26:24.731Z',
          status: 'PENDING',
          validFor: 1490,
          timeToApprove: 1490,
          expirationTimeForApproveRequest: '2022-01-21T13:16:24.731Z',
        },
      },
      usersList: {
        data: {
          status: 'active',
          adminRoles: [],
          type: 'User',
          created: '2021-07-23T06:17:31Z',
          modified: '2021-07-23T06:17:34Z',
          email: 'kartiswara.reddy@britive.com',
          username: 'kartiswara.reddy@britive.com',
          firstName: 'Reddy',
          lastName: 'Kartiswara',
          name: 'Reddy Kartiswara',
          externalId: null,
          mobile: '9999999999',
          phone: '8888888888',
          identityProvider: {
            id: '1HhvrKWjoFPXvOcbJSDx',
            name: 'Britive',
            type: 'DEFAULT',
          },
          mappedAccounts: [],
          external: false,
          userId: 'heuyo6ca3lb74vh69urz',
        },
      },
    },
  },
});

const props = {
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  setPageHeader: jest.fn(),
};
beforeEach(cleanup);

describe('My Secrets - My Approvals Details Page', () => {
  it('display Approve button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MySecretMyApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: buttonType.approve });
    expect(approveButton).toBeInTheDocument;
  });

  it('display Reject button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MySecretMyApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: buttonType.reject });
    expect(approveButton).toBeInTheDocument;
  });

  it('display Close button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MySecretMyApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: buttonType.close });
    expect(approveButton).toBeInTheDocument;
  });
});
