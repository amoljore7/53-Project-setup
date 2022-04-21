/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import MyRequestsList from './MyRequestsList';
import { translatedStrings } from './constants';

const props = {
  history: {},
  match: {},
  setPageHeader: jest.fn(),
  getMyRequestsListData: jest.fn(),
  myRequestsListState: {
    loading: false,
    result: [
      {
        requestId: 'd7b2398b-3975-4266-9ce9-316941016104',
        userId: 'yv7q8g111qxy1s863lm5',
        resource: '/testsecret11',
        action: 'sm.secret.read',
        justification: 'testing',
        approvers: {
          userIds: ['q41ll9v78zfluhhsacez'],
          channelIds: ['C02RLRZMRD4'],
        },
        createdAt: '2022-01-20T14:23:19.796Z',
        status: 'TIMEOUT',
        validFor: 5,
        timeToApprove: 5,
        expirationTimeForApproveRequest: '2022-01-20T14:28:19.796Z',
      },
    ],
    pagination: {
      next: '',
      prev: '',
    },
  },
  updateRequestsListSearchTerm: jest.fn(),
  getMyRequestsListDataLoadMore: jest.fn(),
  fetchUsers: jest.fn(),
  usersData: [],
  usersLoading: false,
  fetchTags: jest.fn(),
  tagsData: [],
  tagsLoading: false,
};

describe('My Secrets - My Request Page', () => {
  it('displays the my request table list', () => {
    const { getByTestId } = render(<MyRequestsList {...props} />);
    const secretTemplateTable = getByTestId('my-requests-table');
    expect(secretTemplateTable).toBeInTheDocument();
  });

  it('displays the search field inside my request table', () => {
    const { getByPlaceholderText } = render(<MyRequestsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.myRequestsSearchText);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside my request table should be working', () => {
    const { getByPlaceholderText } = render(<MyRequestsList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.myRequestsSearchText);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });

    expect(searchField.value).toEqual(inputValue);
    expect(props.getMyRequestsListData).toBeCalledTimes(1);
  });

  it('displays the static record inside my request table', () => {
    props.usersData = [
      {
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
      },
    ];
    props.tagsData = [
      {
        userTagId: '00mbsdfbajiyz9mpygez',
        name: 'BrendaTuckerOhaivautotestHhmqemrp',
        description: 'tag description',
        status: 'Active',
        userCount: 0,
        created: '2022-01-04T05:07:07Z',
        modified: null,
        external: false,
        userTagIdentityProviders: [
          {
            identityProvider: {
              id: '1HhvrKWjoFPXvOcbJSDx',
              name: 'Britive',
              type: 'DEFAULT',
            },
            externalId: null,
          },
        ],
      },
    ];
    const { getByTitle } = render(<MyRequestsList {...props} />);
    const row = getByTitle(props.myRequestsListState.result[0].resource).closest('tr');
    expect(row).toBeInTheDocument();
  });

  it('displays the loading for get my request inside my request table', async () => {
    props.myRequestsListState.loading = true;
    const { getByText, rerender } = render(<MyRequestsList {...props} />);
    const loading = getByText(translatedStrings.loadingMessage);
    expect(loading).toBeInTheDocument();

    props.myRequestsListState.loading = false;
    rerender(<MyRequestsList {...props} />);
    expect(loading).not.toBeInTheDocument();
  });
});
