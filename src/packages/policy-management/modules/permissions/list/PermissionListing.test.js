/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import PermissionsListing from './PermissionListing';
import {
  addPermissionsTxt,
  classes,
  deleteNoLabel,
  deleteYesLabel,
  loadingMessage,
  permissionListTableTestId,
  permissionSearchText,
} from './constants';
import { ALLOW, RESOURCE_STATUS } from '../../../../../utils/common-constants';
import testUtils from '../../../../../utils/test-utils';
import { permissionActions } from '../../../../../components/batch-eval/constants';

const store = testUtils.storeFake({
  PermissionsTableListReducer: {
    tableList: {},
    tableLoading: false,
    tableError: null,
  },
  pageHeader: {
    title: 'mock',
    routeToNameList: [],
  },
});

const permissionsReducer = {
  permissionsTableList: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          id: 'permission_0086030d-8277-4022-b2be-4a6a53f336e8',
          name: 'IAMAdminPermission',
          description: 'default iam admin permission',
          consumer: 'iam',
          actions: ['iam.condition.create', 'iam.policy.update', 'iam.permission.read'],
          resources: ['*'],
          isInline: false,
          isReadOnly: true,
        },
        {
          id: 'permission_0b202440-b0b2-4084-93de-b62dbab265d5',
          name: 'HC_permissionEval9',
          description: 'permission for eval',
          consumer: 'iam',
          actions: ['iam.condition.create', 'iam.policy.update', 'iam.role.read'],
          resources: ['*'],
          isInline: false,
          isReadOnly: false,
        },
      ],
      pagination: { prev: '', next: '' },
    },
  },
  deletePermissions: {
    status: RESOURCE_STATUS.INITIAL,
  },
};

const policyEvalData = {
  [permissionActions?.create]: ALLOW,
  [permissionActions?.update]: ALLOW,
  [permissionActions?.delete]: ALLOW,
  [permissionActions?.read]: ALLOW,
  [permissionActions?.list]: ALLOW,
};

const props = {
  setPageHeader: jest.fn(),
  openNotification: jest.fn(),
  getPermissionsTableList: jest.fn(),
  deletePermission: jest.fn(),
  updatePermissionListSearchTerm: jest.fn(),
  getApplicationsList: jest.fn(),
  policyEvalData,
  tableList: permissionsReducer['permissionsTableList']['data'],
  tableStatus: permissionsReducer['permissionsTableList']['status'],
  error: permissionsReducer['permissionsTableList']['error'],
  history: {
    push: jest.fn(),
  },
  match: {
    url: '/admin/policy-management/permissions',
  },
  consumerList: [],
};

const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

beforeEach(cleanup);

describe.only('Policy Management', () => {
  it('Display add permissions button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const addPermissionBtn = queryByRole('button', {
      name: addPermissionsTxt,
    });
    expect(addPermissionBtn).toBeInTheDocument();
  });

  it('Add permissions button should redirect user to add policy form', () => {
    const { queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const addPermissionBtn = queryByRole('button', {
      name: addPermissionsTxt,
    });
    expect(addPermissionBtn).toBeInTheDocument();
    fireEvent.click(addPermissionBtn);
    expect(props.history.push).toBeCalledWith(`${props.match.url}/add`);
  });

  it('Table component should be render', () => {
    const { queryByTestId } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    // table div(wrapper)
    const permissionListingTable = queryByTestId(permissionListTableTestId);
    expect(permissionListingTable).toBeInTheDocument();
  });

  it('Search field on table should be working', () => {
    const searchInputData = 'test';
    const { queryByPlaceholderText } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const searchFieldOfTable = queryByPlaceholderText(permissionSearchText);
    expect(searchFieldOfTable).toBeInTheDocument();
    fireEvent.change(searchFieldOfTable, {
      target: {
        value: searchInputData,
      },
    });
    expect(searchFieldOfTable.value).toContain(searchInputData);
    expect(props.updatePermissionListSearchTerm).toBeCalledTimes(1);
  });

  it('Should render 2 rows(records) in table as static data is provided', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    // record 1
    const iAMAdminPermissionRow = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(iAMAdminPermissionRow).toBeInTheDocument();
    // record 2
    const hC_permissionEval9 = getByTitle(
      permissionsReducer.permissionsTableList.data.result[1].name
    ).closest('tr');
    expect(hC_permissionEval9).toBeInTheDocument();
  });

  it('Should display and hide loading', () => {
    const { queryByText, rerender } = render(
      <WithRedux>
        <PermissionsListing
          {...props}
          deletePermissionStatus={RESOURCE_STATUS.LOADING}
          tableStatus={RESOURCE_STATUS.LOADING}
        />
      </WithRedux>
    );
    const loading = queryByText(loadingMessage);
    expect(loading).toBeInTheDocument();
    rerender(
      <WithRedux>
        <PermissionsListing
          deletePermissionStatus={RESOURCE_STATUS.SUCCESS}
          tableStatus={RESOURCE_STATUS.SUCCESS}
        />
      </WithRedux>
    );
    expect(loading).not.toBeInTheDocument();
  });

  it('ReadOnly records actions should be disabled', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const iAMAdminPermissionRow = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(iAMAdminPermissionRow).toBeInTheDocument();

    const deleteAction = iAMAdminPermissionRow.querySelector(`.${classes.permissionActionDelete}`);
    expect(deleteAction).toHaveClass('disabled-icon');
    // screen.debug(iAMAdminPermissionRow);
  });

  it('Not readOnly records actions should be enable', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const hC_permissionEval9 = getByTitle(
      permissionsReducer.permissionsTableList.data.result[1].name
    ).closest('tr');
    expect(hC_permissionEval9).toBeInTheDocument();
    const deleteAction = hC_permissionEval9.querySelector(`.${classes.permissionActionDelete}`);
    expect(deleteAction).not.toHaveClass(`.${classes.disabledIcon}`);
  });

  it('View specific permission', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const editActionContainer = permissionRecord.querySelector(`.${classes.permissionActionView}`);
    const editAction = editActionContainer.querySelector('svg');
    fireEvent.click(editAction);
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(
      `${props.match.url}/view/${permissionsReducer.permissionsTableList.data.result[0].id}`
    );
  });

  it('Clone specific permission', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const editActionContainer = permissionRecord.querySelector(`.${classes.permissionActionCopy}`);
    const editAction = editActionContainer.querySelector('svg');
    fireEvent.click(editAction);
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(
      `${props.match.url}/clone/${permissionsReducer.permissionsTableList.data.result[0].id}`
    );
  });

  it('Check Manage permission and delete Button(icon) is present', () => {
    const { getByTitle } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );
    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();

    const viewActionContainer = permissionRecord.querySelector(`.${classes.permissionActionView}`);
    const viewAction = viewActionContainer.querySelector('svg');
    expect(viewAction).toBeInTheDocument();

    const deleteActionContainer = permissionRecord.querySelector(
      `.${classes.permissionActionDelete}`
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    expect(deleteAction).toBeInTheDocument();
  });

  it('Delete confirmation popup should be open for not readOnly records', () => {
    const { getByTitle, queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[1].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const deleteActionContainer = permissionRecord.querySelector(
      `.${classes.permissionActionDelete}`
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteAction);
    const yesDeletePopUpBtn = queryByRole('button', { name: deleteYesLabel });
    expect(yesDeletePopUpBtn).toBeInTheDocument();
  });

  it('Delete confirmation popup should be not be open for readOnly records', () => {
    const { getByTitle, queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[0].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const deleteActionContainer = permissionRecord.querySelector(
      `.${classes.permissionActionDelete}`
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteAction);
    const yesDeletePopUpBtn = queryByRole('button', { name: deleteYesLabel });
    expect(yesDeletePopUpBtn).not.toBeInTheDocument();
  });

  it('Delete button(Yes, Delete) on delete popup of permission should be working', () => {
    const { getByTitle, queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[1].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const deleteActionContainer = permissionRecord.querySelector(
      `.${classes.permissionActionDelete}`
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteAction);
    const deletePopUpYesBtn = queryByRole('button', { name: deleteYesLabel });
    fireEvent.click(deletePopUpYesBtn);
    expect(props.deletePermission).toBeCalledTimes(1);
  });

  it('No button on delete popup of permission should be working', () => {
    const { getByTitle, queryByRole } = render(
      <WithRedux>
        <PermissionsListing {...props} />
      </WithRedux>
    );

    const permissionRecord = getByTitle(
      permissionsReducer.permissionsTableList.data.result[1].name
    ).closest('tr');
    expect(permissionRecord).toBeInTheDocument();
    const deleteActionContainer = permissionRecord.querySelector(
      `.${classes.permissionActionDelete}`
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteAction);
    const deletePopUpNoBtn = queryByRole('button', { name: deleteNoLabel });
    expect(deletePopUpNoBtn).toBeInTheDocument();
    fireEvent.click(deletePopUpNoBtn);
    expect(deletePopUpNoBtn).not.toBeInTheDocument();
  });
});
