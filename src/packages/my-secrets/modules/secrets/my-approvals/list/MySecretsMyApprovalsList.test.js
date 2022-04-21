/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import MySecretsMyApprovalsList from './MySecretsMyApprovalsList';
import { translatedStrings } from './constants';

const props = {
  history: {},
  match: {},
  setPageHeader: jest.fn(),
  getMyApprovalsListData: jest.fn(),
  myApprovalsListState: {
    loading: false,
    result: [
      {
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
        status: 'APPROVED',
        approverComment: 'test',
        validFor: 1490,
        actionBy: 'yv7q8g111qxy1s863lm5',
        timeToApprove: 1490,
        expirationTimeForApproveRequest: '2022-01-21T13:16:31.073Z',
        expirationTimeApproval: '2022-01-21T13:17:54.606Z',
      },
    ],
    pagination: {
      next: '',
      prev: '',
    },
  },
  updateApprovalsListSearchTerm: jest.fn(),
  requestToApprove: jest.fn(),
  requestToReject: jest.fn(),
  getMyApprovalsListDataLoadMore: jest.fn(),
  fetchUsers: jest.fn(),
  usersData: [],
  usersLoading: false,
};

describe('My Secrets - My Approvals Page', () => {
  it('displays the my approvals table list', () => {
    const { getByTestId } = render(<MySecretsMyApprovalsList {...props} />);
    const secretTemplateTable = getByTestId('my-approvals-table');
    expect(secretTemplateTable).toBeInTheDocument();
  });

  it('displays the search field inside my approvals table', () => {
    const { getByPlaceholderText } = render(<MySecretsMyApprovalsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.myApprovalsSearchText);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside my request table should be working', () => {
    const { getByPlaceholderText } = render(<MySecretsMyApprovalsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.myApprovalsSearchText);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });

    expect(searchField.value).toEqual(inputValue);
    expect(props.getMyApprovalsListData).toBeCalledTimes(1);
  });

  it('displays the static record inside my approvals table', () => {
    const { getByTitle } = render(<MySecretsMyApprovalsList {...props} />);
    const row = getByTitle(props.myApprovalsListState.result[0].resource).closest('tr');
    expect(row).toBeInTheDocument();
  });

  it('displays the loading for get my approvals inside my approvals table', async () => {
    props.myApprovalsListState.loading = true;
    const { getByText, rerender } = render(<MySecretsMyApprovalsList {...props} />);
    const loading = getByText(translatedStrings.loadingMessage);
    expect(loading).toBeInTheDocument();

    props.myApprovalsListState.loading = false;
    rerender(<MySecretsMyApprovalsList {...props} />);
    expect(loading).not.toBeInTheDocument();
  });
});
