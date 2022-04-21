/* eslint-disable no-undef */
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import DataTable from './DataTable';

const columns = [
  {
    field: 'id',
    headerName: 'Id',
    sortable: true,
    width: '150px',
    horizontalAlign: 'right',
    isNumeric: true,
  },
  {
    field: 'firstName',
    headerName: 'Firstname',
    sortable: true,
    horizontalAlign: 'center',
  },
  {
    field: 'lastName',
    headerName: 'Lastname',
    horizontalAlign: 'left',
  },
  {
    field: 'age',
    headerName: 'Age',
    isNumeric: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 50 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Stark', firstName: 'Arya', age: 16 },
];

const props = {
  loadMore: true,
  loadMoreHandler: jest.fn(),
  searchBar: {
    isSearchEmpty: true,
    isDisabled: false,
    onSearch: jest.fn(),
    placeholder: 'search',
  },
  rows,
  columns,
  loading: false,
  loadingMessage: 'Successfully loaded data',
  sortHandler: jest.fn(),
  inLineSort: true,
  trim: jest.fn(),
};

beforeEach(cleanup);

describe('Unit tests for table component', () => {
  it('Number of columns match the number of columns provided', () => {
    const { getByRole, getByTitle } = render(<DataTable {...props} />);
    expect(getByRole('grid').getElementsByClassName('bds-table-header-cell')).toHaveLength(
      columns.length
    );

    const firstRow = getByTitle(props.columns[0].headerName).closest('tr');
    waitFor(() => expect(firstRow).toBeInTheDocument());

    const viewActionContainer = firstRow.querySelector('.bds-table-header-icon');
    const viewIcon = viewActionContainer.querySelector('img');

    fireEvent.click(viewIcon);

    waitFor(() => expect(viewIcon).toBeInTheDocument());
  });

  it('Should display Load more button on screen', () => {
    const { queryByRole } = render(<DataTable {...props} />);
    let loadBtn = queryByRole('button', { name: 'Load More...' });

    fireEvent.click(loadBtn);
    loadBtn = queryByRole('button', { name: 'Load More...' });
    waitFor(() => expect(loadBtn).toBeInTheDocument());
  });

  it('Sorting icons are reflected on respective sorting ', () => {
    render(<DataTable {...props} />);
    const sortIcon = document
      .getElementsByClassName('bds-table-header-icon')[0]
      .getElementsByTagName('img')[0];
    expect(sortIcon.getAttribute('alt')).toEqual('unsorted-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('unsorted-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('ascending-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('descending-sort-icon');
  });
});
