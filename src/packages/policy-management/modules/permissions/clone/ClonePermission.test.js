/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ClonePermission from './ClonePermission';
import testUtils from '../../../../../utils/test-utils';

const permissionId = '056aad89-a4c7-4a9e-a58a-1f09ec261807';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: permissionId,
  }),
}));

import {
  buttonType,
  cancelNoLabel,
  cancelPermissionTitle,
  cancelYesLabel,
  cloneNamePrefix,
  switchFormLabel,
  switchJsonLabel,
  switchToFormButton,
  switchToJSONButton,
  switchToJsonMsg,
} from '../add/constants';
import { permissionNameLabel } from '../add/add-permissions-form/constants';
import { permissionListingPath } from '../../../../../utils/common-constants';

const permissionsReducer = {
  permissionConsumerList: {
    status: 'SUCCESS',
    error: '',
    data: {
      result: ['iam', 'secretmanager'],
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

const permissionRecord = {
  id: permissionId,
  name: 'Test Permission autogenerated',
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
};

const props = {
  addPermissionData: permissionsReducer.addPermission.data,
  addPermissionStatus: permissionsReducer.addPermission.status,
  addPermissionFormError: permissionsReducer.addPermission.error,
  consumerList: permissionsReducer.permissionConsumerList.data,
  consumerListStatus: permissionsReducer.permissionConsumerList.status,
  consumerListError: permissionsReducer.permissionConsumerList.error,
  actionListData: permissionsReducer.permissionActionsList.data,
  actionListStatus: permissionsReducer.permissionActionsList.status,
  actionListError: permissionsReducer.permissionActionsList.error,
  viewPermissionData: permissionRecord,
  setPageHeader: jest.fn(),
  getConsumerList: jest.fn(),
  getActionsList: jest.fn(),
  flushAddPermissions: jest.fn(),
  addPermissionsAction: jest.fn(),
  getViewPermissions: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
};

const store = testUtils.storeFake({
  permissionsReducer,
});

const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

describe.only('Policy Management - Clone Permissions', () => {
  it('Display Save permission button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const saveBtn = queryByRole('button', { name: buttonType.save });
    expect(saveBtn).toBeInTheDocument();
  });

  it('Display Cancel button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    let cancelBtnPopup = queryByText(cancelPermissionTitle);
    expect(cancelBtnPopup).not.toBeInTheDocument();
    fireEvent.click(cancelBtn);
    cancelBtnPopup = queryByText(cancelPermissionTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    fireEvent.click(cancelBtn);
    let noBtn = queryByText(cancelNoLabel);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(cancelNoLabel);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Discard Without Saving) on Cancel button popup should be working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(cancelYesLabel);
    fireEvent.click(yesBtn);
    expect(props.history.push).toBeCalledTimes(1);
    expect(props.history.push).toBeCalledWith(permissionListingPath);
  });

  it('Display Switch to JSON button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    expect(switchToJSONBtn).toBeInTheDocument();
  });

  it('On Switch To JSON button click popup should be open', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let popTitle = queryByText(switchToJsonMsg);
    expect(popTitle).not.toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);
    popTitle = queryByText(switchToJsonMsg);
    expect(popTitle).toBeInTheDocument();
  });

  it('Button(No) On Switch To JSON popup should be working', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let noBtn = queryByRole('button', { name: cancelNoLabel });
    expect(noBtn).not.toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    noBtn = queryByRole('button', { name: cancelNoLabel });
    expect(noBtn).toBeInTheDocument();

    fireEvent.click(noBtn);
    noBtn = queryByRole('button', { name: cancelNoLabel });
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Discard Changes and Switch to JSON?) On Switch To JSON popup should be working', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).not.toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).toBeInTheDocument();

    fireEvent.click(yesBtn);
    const switchToFormBtn = queryByRole('button', { name: switchToFormButton });
    expect(switchToFormBtn).toBeInTheDocument();
  });

  it('In JSON View Switch to form button should be visible', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).not.toBeInTheDocument();

    fireEvent.click(switchToJSONBtn);
    yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).toBeInTheDocument();

    fireEvent.click(yesBtn);
    const switchToFormBtn = queryByRole('button', { name: switchToFormButton });
    expect(switchToFormBtn).toBeInTheDocument();

    fireEvent.click(switchToFormBtn);
    const switchToFormConfirmBtn = queryByRole('button', { name: switchFormLabel });
    expect(switchToFormConfirmBtn).toBeInTheDocument();
  });

  it('Button(No) On Switch To Form popup should be working', () => {
    const { queryByRole } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    // switch to json
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    let yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).not.toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    // popup yes button
    yesBtn = queryByRole('button', { name: switchJsonLabel });
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn);

    // switch to form again
    const switchToFormBtn = queryByRole('button', { name: switchToFormButton });
    expect(switchToFormBtn).toBeInTheDocument();
    fireEvent.click(switchToFormBtn);

    // no button on switch to form popup
    let noBtn = queryByRole('button', { name: cancelNoLabel });
    expect(noBtn).toBeInTheDocument();

    const switchToFormConfirmBtn = queryByRole('button', { name: switchFormLabel });
    expect(switchToFormConfirmBtn).toBeInTheDocument();

    // on click of no, popup should be closed
    fireEvent.click(noBtn);
    expect(switchToFormConfirmBtn).not.toBeInTheDocument();
  });

  it('Permission Name Label should be on screen ', () => {
    const { queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const permissionNameInputLabel = queryByText(permissionNameLabel);
    expect(permissionNameInputLabel).toBeInTheDocument();
  });

  it('Permission Name input field should be visible and working', () => {
    const inputText = 'input-test';
    const { container } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );
    const permissionNameInputWrapper = container.querySelector('.permission-name-loader-wrapper');
    const permissionNameInput = permissionNameInputWrapper.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();

    expect(permissionNameInput.value).not.toBe(inputText);

    fireEvent.change(permissionNameInput, {
      target: {
        value: inputText,
      },
    });
    expect(permissionNameInput.value).toBe(inputText);
  });

  it('Snackbar should be working', () => {
    const snackBarData = {
      errorList: ['- Token validation failed.Please provide valid token'],
      title: 'The permission could not be created.',
    };
    const { queryByText } = render(
      <WithRedux>
        <ClonePermission {...props} addPermissionFormError={snackBarData} />
      </WithRedux>
    );

    const snackBarTitleText = queryByText(snackBarData.title);
    expect(snackBarTitleText).toBeInTheDocument();
  });

  it('Should call get permission API function to fetch the details', () => {
    render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );

    expect(props.getViewPermissions).toBeCalledWith(permissionId, props.history);
  });

  it('Permission name should be prefix with copy_of', () => {
    const { container } = render(
      <WithRedux>
        <ClonePermission {...props} />
      </WithRedux>
    );

    const permissionNameInputWrapper = container.querySelector('.permission-name-loader-wrapper');
    const permissionNameInput = permissionNameInputWrapper.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();

    expect(permissionNameInput.value).toBe(cloneNamePrefix(props.viewPermissionData.name));
  });
});
