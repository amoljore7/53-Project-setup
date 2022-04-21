/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import RolesView from './RolesView';
import { Route } from 'react-router-dom';
import testUtils from '../../../../../utils/test-utils';
import { translatedStrings } from './constants';
import RolePermissionTable from './role-modal/RolePermissionTable';

const props = {
  roleViewData: {},
  openNotification: jest.fn(),
  getRoleById: jest.fn(),
  deleteRoleById: jest.fn(),
  setPageHeader: jest.fn(),
  history: {},
  roleViewStatus: RESOURCE_STATUS.INITIAL,
  roleDeleteData: false,
  resetRoleData: jest.fn(),
  policyEvalData: {
    'authz.role.create': 'Allow',
    'authz.role.update': 'Allow',
    'authz.role.delete': 'Allow',
    'authz.role.read': 'Allow',
    'authz.role.list': 'Allow',
  },
  getApplicationsList: jest.fn(),
  applicationsListData: [{ appContainerId: '*', applicationName: 'All' }],
  initSpinnerOverlay: jest.fn(),
  resetRoleById: jest.fn(),
};

const roleTableProps = {
  permissionTableData: [],
  onClickViewPermission: jest.fn(),
  applicationsListData: [{ appContainerId: '*', applicationName: 'All' }],
};

beforeEach(cleanup);

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const routePath = 'admin/policy-management/roles/view/:id';
const routeUrl = 'admin/policy-management/roles/view/1';

describe('Policy Management - Role View Read-Only & JSON Form Page', () => {
  it('displays the edit role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const editButton = getByRole('button', { name: translatedStrings.editButtonText });
    expect(editButton).toBeInTheDocument();
  });

  it('displays the clone role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const cloneButton = getByRole('button', { name: translatedStrings.cloneButtonText });
    expect(cloneButton).toBeInTheDocument();
  });

  it('displays the delete role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const deleteButton = getByRole('button', { name: translatedStrings.deleteButtonText });
    expect(deleteButton).toBeInTheDocument();
  });

  it('displays the close role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const closeButton = getByRole('button', { name: translatedStrings.closeButtonText });
    expect(closeButton).toBeInTheDocument();
  });

  it('displays the view JSON button and on switch shows view Entity button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const jsonButton = getByRole('button', { name: translatedStrings.viewJsonButtonText });
    expect(jsonButton).toBeInTheDocument();
    fireEvent.click(jsonButton);

    const entityButton = getByRole('button', { name: translatedStrings.viewEntityButtonText });
    expect(entityButton).toBeInTheDocument();
  });

  it('displays the copy button inside JSON view', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const jsonButton = getByRole('button', { name: translatedStrings.viewJsonButtonText });
    fireEvent.click(jsonButton);

    const copyButton = getByRole('button', { name: translatedStrings.copyText });
    expect(copyButton).toBeInTheDocument();
  });

  it('displays the notification on click of copy button inside JSON view', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const jsonButton = getByRole('button', { name: translatedStrings.viewJsonButtonText });
    fireEvent.click(jsonButton);

    const copyButton = getByRole('button', { name: translatedStrings.copyText });
    fireEvent.click(copyButton);
    expect(props.openNotification).toBeCalledTimes(1);
  });

  it('displays the permission table inside Read-only Form view', async () => {
    const { getByTestId } = render(<RolePermissionTable {...roleTableProps} />);
    expect(getByTestId('permission-table')).toBeInTheDocument();
  });

  it('displays the delete dialog on clicking of delete button', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const deleteButton = getByRole('button', { name: translatedStrings.deleteButtonText });
    fireEvent.click(deleteButton);

    const deleteDialog = getByText(translatedStrings.deleteRoleText);
    expect(deleteDialog).toBeInTheDocument();
  });

  it('Yes click inside Delete Dialog should be working', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const deleteButton = getByRole('button', { name: translatedStrings.deleteButtonText });
    fireEvent.click(deleteButton);

    const yesButton = getByRole('button', { name: translatedStrings.yesDeleteLabel });
    fireEvent.click(yesButton);
    expect(props.deleteRoleById).toBeCalledTimes(1);
  });

  it('No click inside Delete Dialog should be working', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={routePath}>
        <RolesView {...props} />
      </Route>,
      {
        route: routeUrl,
      }
    );
    const deleteButton = getByRole('button', { name: translatedStrings.deleteButtonText });
    fireEvent.click(deleteButton);

    const noButton = getByRole('button', { name: translatedStrings.noLabel });
    fireEvent.click(noButton);
    expect(noButton).not.toBeInTheDocument();
  });
});
