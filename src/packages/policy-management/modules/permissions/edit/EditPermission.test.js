/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import EditPermission from './EditPermission';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import {
  buttonType,
  discardTitle,
  noLabel,
  discardCancelModal,
  switchToJSONButton,
  switchToJsonMsg,
  switchToFormButton,
  keepChangesMSG,
  resetPermissions,
  resetAllField,
  switchToJSONDialogButton,
  pageTitle,
} from './constants';

const permissionsReducer = {
  EditPermission: {
    status: 'INITIAL',
    error: '',
    data: {},
  },
  ViewPermission: {
    status: 'INITIAL',
    error: '',
    data: {
      name: 'Amol',
      description: 'Amol',
      consumer: 'Amol',
      resources: [],
    },
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
  EditPermissionData: permissionsReducer.EditPermission.data,
  EditPermissionStatus: permissionsReducer.EditPermission.status,
  EditPermissionFormError: permissionsReducer.EditPermission.error,

  actionListData: permissionsReducer.permissionActionsList.data,
  actionListStatus: permissionsReducer.permissionActionsList.status,
  actionListError: permissionsReducer.permissionActionsList.error,

  viewPermissionData: permissionsReducer?.ViewPermission?.data,
  viewPermissionStatus: permissionsReducer.ViewPermission.status,
  viewPermissionFormError: permissionsReducer.ViewPermission.error,

  setPageHeader: jest.fn(),
  getActionsList: jest.fn(),
  flushEditPermissions: jest.fn(),
  EditPermissionsAction: jest.fn(),
  getViewPermissions: jest.fn(),
  openNotification: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
  match: {},
};

const store = testUtils.storeFake({
  permissionsReducer,
});

const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

describe.only('Policy Management - Edit Permissions', () => {
  it('Should display Save permission button on screen', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const saveBtn = queryByRole('button', { name: buttonType.save });
    expect(saveBtn).toBeInTheDocument();
  });

  it('Should display Reset permission button on screen', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: buttonType.reset });
    expect(resetBtn).toBeInTheDocument();
  });

  it('On Reset button popup should be open', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: buttonType.reset });
    fireEvent.click(resetBtn);
    const resetBtnPopup = queryByText(resetPermissions);
    expect(resetBtnPopup).toBeInTheDocument();
    const noKeepChangesButton = queryByText(keepChangesMSG);
    expect(noKeepChangesButton).toBeInTheDocument();
    const resetAllButton = queryByText(resetAllField);
    expect(resetAllButton).toBeInTheDocument();
  });

  it('No, Keep change button Reset button popup should be open', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: buttonType.reset });
    fireEvent.click(resetBtn);
    const resetBtnPopup = queryByText(resetPermissions);
    expect(resetBtnPopup).toBeInTheDocument();

    const noKeepChangesButton = queryByText(keepChangesMSG);
    expect(noKeepChangesButton).toBeInTheDocument();

    const resetAllButton = queryByText(resetAllField);
    expect(resetAllButton).toBeInTheDocument();

    fireEvent.click(noKeepChangesButton);
    expect(resetAllButton).not.toBeInTheDocument();
    expect(noKeepChangesButton).not.toBeInTheDocument();
  });

  it('Yes, Reset button on Reset button popup should be open', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: buttonType.reset });
    fireEvent.click(resetBtn);
    const resetBtnPopup = queryByText(resetPermissions);
    expect(resetBtnPopup).toBeInTheDocument();

    const resetAllButton = queryByText(resetAllField);
    expect(resetAllButton).toBeInTheDocument();

    fireEvent.click(resetAllButton);
    // API call
    expect(props.getViewPermissions).toBeCalledWith('1', props.history);
    // notification
    expect(props.openNotification).toBeCalled();
  });

  it('Should display Cancel button on screen', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    let cancelBtnPopup = queryByText(discardTitle);
    expect(cancelBtnPopup).not.toBeInTheDocument();
    fireEvent.click(cancelBtn);
    cancelBtnPopup = queryByText(discardTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    fireEvent.click(cancelBtn);
    let noBtn = queryByText(noLabel);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(noLabel);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Discard Without Saving) on Cancel button popup should be working', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(discardCancelModal);
    fireEvent.click(yesBtn);
    expect(props.history.push('/admin/policy-management/permissions'));
  });

  it('Display Switch to JSON button on screen', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    expect(switchToJSONBtn).toBeInTheDocument();
  });

  it('On Switch To JSON button click popup should be open', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let popTitle = queryByText(switchToJsonMsg);
    expect(popTitle).not.toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);
    popTitle = queryByText(switchToJsonMsg);
    expect(popTitle).toBeInTheDocument();
  });

  it('Button(No) On Switch To JSON popup should be working', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let noBtn = queryByRole('button', { name: noLabel });
    expect(noBtn).not.toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    noBtn = queryByRole('button', { name: noLabel });
    expect(noBtn).toBeInTheDocument();

    fireEvent.click(noBtn);
    noBtn = queryByRole('button', { name: noLabel });
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Discard Changes and Switch to JSON?) On Switch To JSON popup should be working', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let yesBtn = queryByRole('button', { name: switchToJSONDialogButton });
    expect(yesBtn).not.toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    yesBtn = queryByRole('button', { name: switchToJSONDialogButton });
    expect(yesBtn).toBeInTheDocument();

    fireEvent.click(yesBtn);
    const switchToFormBtn = queryByRole('button', { name: switchToFormButton });
    expect(switchToFormBtn).toBeInTheDocument();
  });

  it('Permission Name input field should be visible and working', () => {
    const inputText = 'test';
    const { container } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    const permissionNameInputWrapper = container.querySelector('.permission-name-loader-wrapper');
    const permissionNameInput = permissionNameInputWrapper.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();

    fireEvent.change(permissionNameInput, {
      target: {
        value: inputText,
      },
    });
    expect(permissionNameInput.value).toBe(inputText);
  });

  it('Page Header should be set ', () => {
    testUtils.renderWithRouter(
      <Route path="admin/policy-management/permissions/edit/:id">
        <WithRedux>
          <EditPermission {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/permissions/edit/1',
      }
    );
    expect(props.setPageHeader).toBeCalledWith(pageTitle, []);
  });
});
