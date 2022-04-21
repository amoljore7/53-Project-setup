/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import RolesList from './RolesList';
import {
  addRoleLabel,
  deleteRoleTitle,
  loadingMessage,
  noLabel,
  roleSearchPlaceholder,
  yesDeleteLabel,
} from './constants';

const testRoleData = [
  {
    id: 'some_id',
    name: 'testRole',
    description: 'test',
    permissions: [
      {
        id: 'some_permission_id',
        name: 'testPerm',
        description: 'test',
        consumer: 'test',
        actions: ['test'],
        resources: ['test'],
        isInline: false,
        isReadOnly: false,
      },
    ],
    isReadOnly: false,
  },
];

const props = {
  rolesListState: {
    loading: false,
    pagination: {
      next: '',
      prev: '',
    },
    result: [],
  },
  getRolesListData: jest.fn(),
  history: {},
  match: {},
  setPageHeader: jest.fn(),
  deleteRoleRequest: jest.fn(),
  updateRoleListSearchTerm: jest.fn(),
  getRolesListLoadMoreData: jest.fn(),
  policyEvalData: {
    'authz.role.create': 'Allow',
    'authz.role.delete': 'Allow',
  },
};

describe('Policy Management - Roles Listing Page', () => {
  it('displays the add role button', async () => {
    const { getByRole } = render(<RolesList {...props} />);
    const addButton = getByRole('button', { name: addRoleLabel });
    expect(addButton).toBeInTheDocument();
  });

  it('displays the role table list', async () => {
    const { getByTestId } = render(<RolesList {...props} />);
    const roleTable = getByTestId('roles-table');
    expect(roleTable).toBeInTheDocument();
  });

  it('displays the search field inside role table', async () => {
    const { getByPlaceholderText } = render(<RolesList {...props} />);
    const searchField = getByPlaceholderText(roleSearchPlaceholder);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside role table should be working', async () => {
    const { getByPlaceholderText } = render(<RolesList {...props} />);
    const searchField = getByPlaceholderText(roleSearchPlaceholder);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });

    expect(searchField.value).toEqual(inputValue);
    expect(props.getRolesListData).toBeCalledTimes(1);
  });

  it('displays the static record inside role table', async () => {
    props.rolesListState.result = testRoleData;
    const { getByTitle } = render(<RolesList {...props} />);
    const row = getByTitle(props.rolesListState.result[0].name).closest('tr');
    expect(row).toBeInTheDocument();
  });

  it('displays the loading for get roles list inside role table', async () => {
    props.rolesListState.loading = true;
    const { getByText, rerender } = render(<RolesList {...props} />);
    const loading = getByText(loadingMessage);
    expect(loading).toBeInTheDocument();

    rerender(<RolesList {...props} rolesListState={{ ...props.rolesListState, loading: false }} />);
    expect(loading).not.toBeInTheDocument();
  });

  it('displays the manage, clone and delete icon inside role table', async () => {
    props.rolesListState.result = testRoleData;
    const { getByTitle } = render(<RolesList {...props} />);
    const row = getByTitle(props.rolesListState.result[0].name).closest('tr');

    const manageActionContainer = row.querySelector('.roles-table-action-edit');
    const manageIcon = manageActionContainer.querySelector('svg');
    expect(manageIcon).toBeInTheDocument();

    const cloneActionContainer = row.querySelector('.roles-table-action-clone');
    const cloneIcon = cloneActionContainer.querySelector('svg');
    expect(cloneIcon).toBeInTheDocument();

    const deleteActionContainer = row.querySelector('.roles-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('displays the delete dialog on clicking of delete icon inside role table', async () => {
    props.rolesListState.result = testRoleData;
    const { getByTitle, getByText } = render(<RolesList {...props} />);
    const row = getByTitle(props.rolesListState.result[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.roles-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const deleteDialog = getByText(deleteRoleTitle);
    expect(deleteDialog).toBeInTheDocument();
  });

  it('Yes click inside Delete Dialog should be working', async () => {
    props.rolesListState.result = testRoleData;
    const { getByTitle, getByRole } = render(<RolesList {...props} />);
    const row = getByTitle(props.rolesListState.result[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.roles-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const yesButton = getByRole('button', { name: yesDeleteLabel });
    fireEvent.click(yesButton);
    expect(props.deleteRoleRequest).toBeCalledTimes(1);
  });

  it('No click inside Delete Dialog should be working', async () => {
    props.rolesListState.result = testRoleData;
    const { getByTitle, getByRole } = render(<RolesList {...props} />);
    const row = getByTitle(props.rolesListState.result[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.roles-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const noButton = getByRole('button', { name: noLabel });
    fireEvent.click(noButton);
    expect(noButton).not.toBeInTheDocument();
  });

  it('displays the load more button inside role list table', async () => {
    const { getByRole } = render(
      <RolesList
        {...props}
        rolesListState={{
          loading: false,
          pagination: {
            next: 'test_page_token',
            prev: '',
          },
          result: testRoleData,
        }}
      />
    );
    const loadMoreButton = getByRole('button', { name: 'Load More...' });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('load more inside role table should be working', async () => {
    const { getByRole } = render(
      <RolesList
        {...props}
        rolesListState={{
          loading: false,
          pagination: {
            next: 'test_page_token',
            prev: '',
          },
          result: testRoleData,
        }}
      />
    );
    const loadMoreButton = getByRole('button', { name: 'Load More...' });
    fireEvent.click(loadMoreButton);

    expect(props.getRolesListLoadMoreData).toBeCalledTimes(1);
  });
});
