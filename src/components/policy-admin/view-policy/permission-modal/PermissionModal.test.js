/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import PermissionModal from './PermissionModal';

const props = {
  permissionData: {
    name: 'test-permission-1',
    isInline: true,
    description: 'test permission 1',
    consumer: {
      name: 'apps',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Applications',
    },
    actions: ['apps.app.view'],
    resources: ['*'],
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
  title: 'Permission : test-permission-1',
  translatedStrings: {
    permissionName: 'Permission Name',
    noneText: 'None',
    sourceName: 'Source',
    inlineText: 'Inline',
    preDefinedText: 'Pre-defined',
    description: 'Description',
    consumer: 'Consumer',
    actions: 'Actions',
    resources: 'Resources',
  },
  onCancel: jest.fn(),
};

beforeEach(cleanup);

describe('View permission details in side modal', () => {
  it('Should display provided permission details', () => {
    const { queryByText } = render(<PermissionModal {...props} />);

    const permissionTitleName = queryByText(props.title);
    expect(permissionTitleName).toBeInTheDocument();

    const permissionLabel = queryByText(props.translatedStrings.permissionName);
    expect(permissionLabel).toBeInTheDocument();

    const permissionName = queryByText(props.permissionData.name);
    expect(permissionName).toBeInTheDocument();

    const sourceLabel = queryByText(props.translatedStrings.sourceName);
    expect(sourceLabel).toBeInTheDocument();

    const source = queryByText(props.translatedStrings.inlineText);
    expect(source).toBeInTheDocument();

    const descriptionLabel = queryByText(props.translatedStrings.description);
    expect(descriptionLabel).toBeInTheDocument();

    const description = queryByText(props.permissionData.description);
    expect(description).toBeInTheDocument();

    const consumerLabel = queryByText(props.translatedStrings.consumer);
    expect(consumerLabel).toBeInTheDocument();

    const consumer = queryByText(props.permissionData.consumer.description);
    expect(consumer).toBeInTheDocument();

    const resourceLabel = queryByText(props.translatedStrings.resources);
    expect(resourceLabel).toBeInTheDocument();

    const resource = queryByText(props.permissionData.resources);
    expect(resource).toBeInTheDocument();

    const actionLabel = queryByText(props.translatedStrings.actions);
    expect(actionLabel).toBeInTheDocument();

    const action = queryByText(props.permissionData.actions[0]);
    expect(action).toBeInTheDocument();
  });

  it('Click on cross icon should call onCancel', () => {
    render(<PermissionModal {...props} />);

    const closeIcon = document.querySelector('svg');
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(props.onCancel).toBeCalledTimes(1);
  });
});
