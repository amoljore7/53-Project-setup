/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ViewPermission from './ViewPermission';
import testUtils from '../../../../../utils/test-utils';
import { buttonType as jsonButtonType } from '../add/add-permissions-json/constants';

const permissionId = '056aad89-a4c7-4a9e-a58a-1f09ec261807';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: permissionId,
  }),
}));

import { ALLOW, permissionListingPath } from '../../../../../utils/common-constants';
import {
  buttonType,
  deleteNoLabel,
  deletePermissionTitle,
  deleteYesLabel,
  switchToEntity,
  switchToJSON,
} from './constants';
import { permissionActions } from '../../../../../components/batch-eval/constants';

const policyEvalData = {
  [permissionActions.create]: ALLOW,
  [permissionActions.update]: ALLOW,
  [permissionActions.delete]: ALLOW,
  [permissionActions.read]: ALLOW,
  [permissionActions.list]: ALLOW,
};

const permissionsReducer = {
  viewPermissions: {
    status: 'SUCCESS',
    error: '',
    data: {
      id: permissionId,
      name: 'Test Permission',
      description: 'Vault Admin Permission',
      consumer: 'authz',
      actions: [
        'authz.permission.list',
        'authz.permission.create',
        'authz.permission.delete',
        'authz.permission.update',
        'authz.permission.read',
      ],
      resources: ['*'],
      isInline: false,
      isReadOnly: false,
    },
  },
  addPermission: {
    status: 'INITIAL',
    error: '',
    data: [],
  },
  permissionActionsList: {
    status: 'INITIAL',
    error: '',
    data: {
      result: [
        { description: 'Condition read action', name: 'iam.condition.read', consumer: 'iam' },
        { description: 'Condition delete action', name: 'iam.condition.delete', consumer: 'iam' },
        { description: 'Action list actions', name: 'iam.action.list', consumer: 'iam' },
        { description: 'Permission create action', name: 'iam.permission.create', consumer: 'iam' },
      ],
    },
  },
};

const props = {
  viewPermissionData: permissionsReducer.viewPermissions.data,
  viewPermissionStatus: permissionsReducer.viewPermissions.status,
  viewPermissionFormError: permissionsReducer.viewPermissions.error,
  policyEvalData,
  setPageHeader: jest.fn(),
  getConsumerList: jest.fn(),
  getActionsList: jest.fn(),
  flushAddPermissions: jest.fn(),
  addPermissionsAction: jest.fn(),
  getViewPermissions: jest.fn(),
  deletePermission: jest.fn(),
  openNotification: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
};

const store = testUtils.storeFake({
  permissionsReducer,
});

const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Policy Management - Add Permissions', () => {
  it('Display Edit permission button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const editBtn = queryByRole('button', { name: buttonType.edit });
    expect(editBtn).toBeInTheDocument();
  });

  it('On Edit click page should be redirected to edit permission page', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const editBtn = queryByRole('button', { name: buttonType.edit });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(props.history.push).toBeCalledWith(`${permissionListingPath}/edit/${permissionId}`);
  });

  it('Display Clone permission button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const cloneBtn = queryByRole('button', { name: buttonType.clone });
    expect(cloneBtn).toBeInTheDocument();
  });

  it('On Clone click page should be redirected to clone permission page', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const cloneBtn = queryByRole('button', { name: buttonType.clone });
    expect(cloneBtn).toBeInTheDocument();
    fireEvent.click(cloneBtn);
    expect(props.history.push).toBeCalledWith(`${permissionListingPath}/clone/${permissionId}`);
  });

  it('Display Delete permission button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const deleteBtn = queryByRole('button', { name: buttonType.delete });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('On Delete click popup confirmation dialog should be open', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const deleteBtn = queryByRole('button', { name: buttonType.delete });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);

    const confirmationDialogTitle = queryByText(deletePermissionTitle);
    expect(confirmationDialogTitle).toBeInTheDocument();
  });

  it('On Yes Delete button click confirmation dialog should be closed and appropriate method should be called', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const deleteBtn = queryByRole('button', { name: buttonType.delete });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);

    const yesDeleteBtn = queryByRole('button', { name: deleteYesLabel });
    expect(yesDeleteBtn).toBeInTheDocument();

    fireEvent.click(yesDeleteBtn);

    expect(yesDeleteBtn).not.toBeInTheDocument();
    expect(props.deletePermission).toBeCalledWith(permissionId, props.history);
  });

  it('On No button click confirmation dialog should be closed', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const deleteBtn = queryByRole('button', { name: buttonType.delete });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);

    const noDeleteBtn = queryByRole('button', { name: deleteNoLabel });
    expect(noDeleteBtn).toBeInTheDocument();

    fireEvent.click(noDeleteBtn);

    expect(noDeleteBtn).not.toBeInTheDocument();
  });

  it('Display Close button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.close });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Close button page should be redirected to permission listing page', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const closeBtn = queryByRole('button', { name: buttonType.close });
    fireEvent.click(closeBtn);
    expect(props.history.push).toBeCalled();
  });

  it('Display Switch to JSON button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONBtn).toBeInTheDocument();
  });

  it('On Switch To JSON button click view should be changed', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONBtn).toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    expect(switchToJSONBtn).not.toBeInTheDocument();
  });

  it('On JSON view switch to form should be visible', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONBtn).toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    expect(switchToJSONBtn).not.toBeInTheDocument();

    const switchToFormBtn = queryByRole('button', { name: switchToEntity });
    expect(switchToFormBtn).toBeInTheDocument();
  });

  it('Switch to Form button click view should changed back to form', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONBtn).toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    expect(switchToJSONBtn).not.toBeInTheDocument();

    const switchToFormBtn = queryByRole('button', { name: switchToEntity });
    expect(switchToFormBtn).toBeInTheDocument();

    fireEvent.click(switchToFormBtn);
    const switchToJSONButton = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONButton).toBeInTheDocument();
  });

  it('Should display the all data of permission', () => {
    const { queryByText } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    waitFor(() => expect(queryByText(props.viewPermissionData.name)).toBeInTheDocument());
    waitFor(() => expect(queryByText(props.viewPermissionData.description)).toBeInTheDocument());
    waitFor(() => expect(queryByText(props.viewPermissionData.consumer)).toBeInTheDocument());
    waitFor(() => expect(queryByText(props.viewPermissionData.resources[0])).toBeInTheDocument());
  });

  it('Copy button should not work when there is no input', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ViewPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSON });
    expect(switchToJSONBtn).toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    expect(switchToJSONBtn).not.toBeInTheDocument();

    const copyBtn = queryByRole('button', { name: jsonButtonType.copy });
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalled();
  });
});
