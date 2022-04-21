/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import RoleTable from './RoleTable';

const props = {
  rolesData: [
    {
      id: '9386d4f6-1e9b-4324-90a0-26e8ea753851',
      name: 'test-role-1',
      description: 'test role 1',
      permissions: [
        {
          id: '5a7af0af-ae06-40ac-a4bb-5ae79eeb36bc',
          name: 'test-permission-1',
          description: 'test permission 1',
          consumer: 'notificationmanager',
          actions: [
            'nm.*.*',
            'nm.channels.list',
            'nm.notification.*',
            'nm.notification.create',
            'nm.notification.delete',
            'nm.notification.list',
          ],
          resources: ['*'],
          isInline: false,
          isReadOnly: true,
        },
      ],
    },
    {
      id: '9386d4f6-1e9b-4324-90a0-26e8ea753852',
      name: 'test-role-2',
      description: 'test role 2',
      permissions: [
        {
          id: '36d744d1-4223-4c7e-8ee3-ab9003eac56a',
          name: 'test-permission-2',
          description: 'test permission 2',
          consumer: 'identity',
          actions: ['identity.user.list', 'identity.user.manage', 'identity.user.view'],
          resources: ['*'],
          isInline: false,
          isReadOnly: true,
        },
      ],
    },
  ],
  policyConstantLabels: {
    defaultButtonSize: '24',
    viewPolicyButtonTestId: 'view-policy',
    permissionTableTestId: 'permission-table',
    roleTableTestId: 'role-table',
  },
  translatedStrings: {
    roleName: 'Role Name',
    sourceName: 'Source',
    inlineText: 'Inline',
    preDefinedText: 'Pre-defined',
    description: 'Description',
    viewTooltip: 'View role',
    rolesLabel: 'Role',
  },
  onClickRoles: jest.fn(),
};

const onClickRolesResponse = {
  description: 'test role 1',
  name: 'test-role-1',
  permissions: [
    {
      actions: [
        'nm.*.*',
        'nm.channels.list',
        'nm.notification.*',
        'nm.notification.create',
        'nm.notification.delete',
        'nm.notification.list',
      ],
      consumer: 'notificationmanager',
      description: 'test permission 1',
      id: '5a7af0af-ae06-40ac-a4bb-5ae79eeb36bc',
      isInline: false,
      isReadOnly: true,
      name: 'test-permission-1',
      resources: ['*'],
    },
  ],
};

beforeEach(cleanup);

describe('View role table ', () => {
  it('Should display 2 records in table ', () => {
    render(<RoleTable {...props} />);
    expect(document.getElementsByClassName('bds-table-row').length).toBe(2);
  });

  it('Should display tooltip on view icon on action column', () => {
    const { queryByText } = render(<RoleTable {...props} />);
    const permission = queryByText(props.rolesData[0].name).closest('tr');
    expect(permission).toBeInTheDocument();
    const actionIcon = permission.querySelector('svg');
    let viewPermissionToolTip = queryByText(props.translatedStrings.viewTooltip);
    expect(viewPermissionToolTip).not.toBeInTheDocument();
    fireEvent.mouseOver(actionIcon);
    viewPermissionToolTip = queryByText(props.translatedStrings.viewTooltip);
    expect(viewPermissionToolTip).toBeInTheDocument();
  });

  it('Should called onClickRoles ', () => {
    const { queryByText } = render(<RoleTable {...props} />);
    const permission = queryByText(props.rolesData[0].name).closest('tr');
    expect(permission).toBeInTheDocument();
    const actionIcon = permission.querySelector('svg');
    fireEvent.click(actionIcon);
    expect(props.onClickRoles).toBeCalledTimes(1);
    expect(props.onClickRoles).toBeCalledWith(onClickRolesResponse);
  });
});
