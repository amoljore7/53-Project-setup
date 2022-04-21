/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import ApprovalsDetails from './ApprovalsView';
import testUtils from '../../../utils/test-utils';

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
  history: {},
  approvalsDetails: {
    data: {
      requestId: '57e3babd-d871-4e23-ac93-af55aa33460c',
      userId: 'q41ll9v78zfluhhsacez',
      resource: '/ajsecret2',
      action: 'sm.secret.read',
      justification: 'test',
      approvers: {
        userIds: ['yv7q8g111qxy1s863lm5'],
      },
      createdAt: '2022-01-20T12:26:31.073Z',
      updatedAt: '2022-01-20T12:27:54.606Z',
      status: 'PENDING',
      approverComment: 'test',
      validFor: 1490,
      actionBy: 'yv7q8g111qxy1s863lm5',
      timeToApprove: 1490,
      expirationTimeForApproveRequest: '2022-01-21T13:16:31.073Z',
      expirationTimeApproval: '2022-01-21T13:17:54.606Z',
    },
  },
  getSecretStatus: jest.fn(),
  getActionLabel: jest.fn(),
  translate: jest.fn(),
  translatedStrings: {
    pageTitle: 'APPROVAL',
    noneValue: 'NONE',
    requestedBy: 'REQUESTED_BY',
    actionType: 'ACTION',
    resource: 'RESOURCE',
    approvalStatus: 'APPROVAL_STATUS',
    cancelLabel: 'CANCEL',
    yesApprove: 'YES_APPROVE',
    yesReject: 'YES_REJECT',
    forLabel: 'FOR',
    approveRequestTitle: 'APPROVE_REQUEST',
    rejectRequestTitle: 'REJECT_REQUEST',
    approveMessage: 'PERMISSION_GRANTED',
    rejectMessage: 'PERMISSION_DENIED',
    fetchingApprovals: 'LOADING',
    requestDate: 'REQUEST_DATE',
    justification: 'JUSTIFICATION',
    comments: 'COMMENTS',
    approvedBy: 'APPROVED_BY',
    approvedOn: 'APPROVED_ON',
    rejectedBy: 'REJECTED_BY',
    rejectedOn: 'REJECTED_ON',
    expiredOn: 'EXPIRED_ON',
    optional: 'OPTIONAL',
  },
  cancelHandler: jest.fn(),
  getApprovalsDetailsById: jest.fn(),
  approveRequest: jest.fn(),
  rejectRequest: jest.fn(),
  classes: {
    approvalsDetailsButton: 'my-secrets-my-approvals-details-button',
    approvalsDetailsForm: 'my-secrets-my-approvals-details-form',
    marginTop32: 'approvals-details-margin-top-32',
    marginTop20: 'approvals-details-margin-top-20',
    marginTop8: 'approvals-details-margin-top-8',
    cancelBtn: 'user-cancel-btn',
    detailsLabel: 'details-label',
  },
  buttonType: {
    approve: 'Approve',
    reject: 'Reject',
    close: 'Close',
  },
  statusLabel: {
    expired: 'MESSAGE_EXPIRED',
    approved: 'MESSAGE_APPROVED',
    expiredAfterApproval: 'APPROVAL_EXPIRED_MESSAGE',
    rejected: 'MESSAGE_REJECTED',
  },
};

beforeEach(cleanup);

describe('Approvals Details Page', () => {
  it('display Approve button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: props.buttonType.approve });
    expect(approveButton).toBeInTheDocument;
  });

  it('display Reject button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: props.buttonType.reject });
    expect(approveButton).toBeInTheDocument;
  });

  it('display Close button on screen', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ApprovalsDetails {...props} />
      </Provider>
    );
    const approveButton = getByRole('button', { name: props.buttonType.close });
    expect(approveButton).toBeInTheDocument;
  });

  it('display 6 fields on the page', () => {
    render(
      <Provider store={store}>
        <ApprovalsDetails {...props} />
      </Provider>
    );
    const allFields = document.getElementsByClassName('approvals-details-margin-top-32');
    expect(allFields).toHaveLength(6);
  });

  it('display 9 fields on the page when the request is rejected or approved', () => {
    const updatedProps = { ...props };
    updatedProps.approvalsDetails.data.status = 'APPROVED';
    render(
      <Provider store={store}>
        <ApprovalsDetails {...props} />
      </Provider>
    );
    const allFields = document.getElementsByClassName('approvals-details-margin-top-32');
    expect(allFields).toHaveLength(9);
  });
});
