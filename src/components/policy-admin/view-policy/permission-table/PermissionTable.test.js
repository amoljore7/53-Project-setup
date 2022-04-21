/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import PermissionTable from './PermissionTable';

const props = {
  permissionData: [
    {
      id: 'd75c4ed1-4c20-448e-9a6c-8c12fce73730',
      name: 'test-permission-1',
      description: 'test permission 1',
      consumer: 'secretmanager',
      actions: [
        'sm.passwordpolicy.read',
        'sm.passwordpolicy.list',
        'sm.passwordpolicy.update',
        'sm.passwordpolicy.create',
        'sm.passwordpolicy.delete',
      ],
      resources: ['*'],
      isInline: false,
      isReadOnly: false,
    },
    {
      id: 'd75c4ed1-4c20-448e-9a6c-8c12fce73731',
      name: 'test-permission-2',
      description: 'test permission 2',
      consumer: 'apps',
      actions: ['apps.app.view'],
      resources: ['*'],
      isInline: true,
      isReadOnly: false,
    },
  ],
  consumerList: [
    {
      name: 'apps',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Applications',
    },
    {
      name: 'secretmanager',
      consumerURL:
        'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/resourceContainers?path=${resource}',
      nameToIdURL:
        'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets?path=${name}',
      idToNameURL:
        'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets/${id}',
      responseType: 'entity-based',
      description: 'Secrets Manager',
    },
  ],
  applicationsListData: [
    {
      appContainerId: '*',
      applicationName: 'All',
    },
    {
      applicationName: 'OktaTest',
      type: 'Okta',
      appContainerId: '2l04zpko7xrpmo7pdirl',
      description: ' ',
      status: 'active',
      environmentsCount: 1,
      profilesCount: 1,
      usersCount: 0,
      iconUrl: '/images/app_logos/okta.png',
    },
  ],
  policyConstantLabels: {
    defaultButtonSize: '24',
    viewPolicyButtonTestId: 'view-policy',
    permissionTableTestId: 'permission-table',
    roleTableTestId: 'role-table',
  },
  translatedStrings: {
    permissionName: 'Permission Name',
    sourceName: 'Source',
    inlineText: 'Inline',
    preDefinedText: 'Pre-defined',
    description: 'Description',
    consumer: 'Consumer',
    actions: 'Actions',
    resources: 'Resources',
    actionText: 'Action',
    viewPermissionTooltip: 'View permission',
    permissionText: 'Permission',
  },
  onClickPermission: jest.fn(),
};

const onClickPermissionResponse = {
  actions: [
    'sm.passwordpolicy.read',
    'sm.passwordpolicy.list',
    'sm.passwordpolicy.update',
    'sm.passwordpolicy.create',
    'sm.passwordpolicy.delete',
  ],
  consumer: {
    consumerURL:
      'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/resourceContainers?path=${resource}',
    description: 'Secrets Manager',
    idToNameURL: 'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets/${id}',
    name: 'secretmanager',
    nameToIdURL:
      'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets?path=${name}',
    responseType: 'entity-based',
  },
  description: 'test permission 1',
  isInline: false,
  name: 'test-permission-1',
  resources: ['*'],
};

beforeEach(cleanup);

describe('View permission table ', () => {
  it('Should display 2 records in table ', () => {
    render(<PermissionTable {...props} />);
    expect(document.getElementsByClassName('bds-table-row').length).toBe(2);
  });

  it('Should display tooltip on view icon on action column', () => {
    const { queryByText } = render(<PermissionTable {...props} />);
    const permission = queryByText(props.permissionData[0].name).closest('tr');
    expect(permission).toBeInTheDocument();
    const actionIcon = permission.querySelector('svg');
    let viewPermissionToolTip = queryByText(props.translatedStrings.viewPermissionTooltip);
    expect(viewPermissionToolTip).not.toBeInTheDocument();
    fireEvent.mouseOver(actionIcon);
    viewPermissionToolTip = queryByText(props.translatedStrings.viewPermissionTooltip);
    expect(viewPermissionToolTip).toBeInTheDocument();
  });

  it('Should called onClickPermission ', () => {
    const { queryByText } = render(<PermissionTable {...props} />);
    const permission = queryByText(props.permissionData[0].name).closest('tr');
    expect(permission).toBeInTheDocument();
    const actionIcon = permission.querySelector('svg');
    fireEvent.click(actionIcon);
    expect(props.onClickPermission).toBeCalledTimes(1);
    expect(props.onClickPermission).toBeCalledWith(onClickPermissionResponse);
  });
});
