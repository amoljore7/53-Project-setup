/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../utils/common-constants';
import RoleModal from './RoleModal';

const props = {
  roleData: {
    name: 'test-role-1',
    description: 'test role 1',
    permissions: [
      {
        id: 'bbaaf321-2e9a-42ad-b31c-a6f079bcf38c',
        name: 'test-permission-1',
        description: 'test permission 1',
        consumer: 'apps',
        actions: ['apps.app.list', 'apps.app.manage', 'apps.app.view'],
        resources: ['*'],
        isInline: false,
        isReadOnly: true,
      },
    ],
  },
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
  consumerListStatus: RESOURCE_STATUS.SUCCESS,
  roleFields: [
    {
      key: 'consumer',
      label: 'Consumer',
    },
    {
      key: 'resources',
      label: 'Resources',
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ],
  consumerList: [
    {
      name: 'ada',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Risk Analytics & Query Engine',
    },
    {
      name: 'apps',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Applications',
    },
  ],
  title: 'Role : test-role-1',
  translatedStrings: {
    roleName: 'Role Name',
    noneText: 'None',
    description: 'Description',
  },
  onCancel: jest.fn(),
};

beforeEach(cleanup);

describe('View role details in side modal', () => {
  it('Should display provided role details', () => {
    const { queryByText } = render(<RoleModal {...props} />);

    const permissionTitleName = queryByText(props.title);
    expect(permissionTitleName).toBeInTheDocument();

    const roleLabel = queryByText(props.translatedStrings.roleName);
    expect(roleLabel).toBeInTheDocument();

    const roleName = queryByText(props.roleData.name);
    expect(roleName).toBeInTheDocument();

    const descriptionLabel = queryByText(props.translatedStrings.description);
    expect(descriptionLabel).toBeInTheDocument();

    const description = queryByText(props.roleData.description);
    expect(description).toBeInTheDocument();

    const consumer = queryByText(props.consumerList[1].description);
    expect(consumer).toBeInTheDocument();

    const resource = queryByText(props.roleData.permissions[0].resources);
    expect(resource).toBeInTheDocument();

    const action = queryByText(props.roleData.permissions[0].actions[0]);
    expect(action).toBeInTheDocument();
  });

  it('Click on cross icon should call onCancel', () => {
    render(<RoleModal {...props} />);

    const closeIcon = document.querySelector('svg');
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(props.onCancel).toBeCalledTimes(1);
  });
});
