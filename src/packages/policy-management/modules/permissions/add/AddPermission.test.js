/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddPermission from './AddPermission';
import testUtils from '../../../../../utils/test-utils';

import {
  buttonType,
  cancelNoLabel,
  cancelPermissionTitle,
  cancelYesLabel,
  switchFormLabel,
  switchJsonLabel,
  switchToFormButton,
  switchToJSONButton,
  switchToJsonMsg,
  validation,
} from './constants';
import {
  permissionActionsLabel,
  permissionConsumerLabel,
  permissionNameLabel,
  permissionResourcesLabel,
} from './add-permissions-form/constants';

const permissionsReducer = {
  permissionConsumerList: {
    status: 'SUCCESS',
    error: '',
    data: {
      result: [{ name: 'iam' }, { name: 'secretmanager' }],
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
  addPermissionData: permissionsReducer.addPermission.data,
  addPermissionStatus: permissionsReducer.addPermission.status,
  addPermissionFormError: permissionsReducer.addPermission.error,
  consumerList: permissionsReducer.permissionConsumerList.data,
  consumerListStatus: permissionsReducer.permissionConsumerList.status,
  consumerListError: permissionsReducer.permissionConsumerList.error,
  actionListData: permissionsReducer.permissionActionsList.data,
  actionListStatus: permissionsReducer.permissionActionsList.status,
  actionListError: permissionsReducer.permissionActionsList.error,
  setPageHeader: jest.fn(),
  getConsumerList: jest.fn(),
  getActionsList: jest.fn(),
  flushAddPermissions: jest.fn(),
  addPermissionsAction: jest.fn(),
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

describe('Policy Management - Add Permissions', () => {
  it('Display Save permission button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <AddPermission {...props} />
      </WithRedux>
    );
    const saveBtn = queryByRole('button', { name: buttonType.save });
    expect(saveBtn).toBeInTheDocument();
  });

  it('Display Cancel button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <AddPermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPermission {...props} />
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
        <AddPermission {...props} />
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
        <AddPermission {...props} />
      </WithRedux>
    );
    const cancelBtn = queryByRole('button', { name: buttonType.cancel });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(cancelYesLabel);
    fireEvent.click(yesBtn);
    expect(props.history.goBack).toBeCalledTimes(1);
  });

  it('Display Switch to JSON button on screen', () => {
    const { queryByRole } = render(
      <WithRedux>
        <AddPermission {...props} />
      </WithRedux>
    );
    const switchToJSONBtn = queryByRole('button', { name: switchToJSONButton });
    expect(switchToJSONBtn).toBeInTheDocument();
  });

  it('On Switch To JSON button click popup should be open', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPermission {...props} />
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
        <AddPermission {...props} />
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
        <AddPermission {...props} />
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
        <AddPermission {...props} />
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
        <AddPermission {...props} />
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
        <AddPermission {...props} />
      </WithRedux>
    );
    const permissionNameInputLabel = queryByText(permissionNameLabel);
    expect(permissionNameInputLabel).toBeInTheDocument();
  });

  it('Permission Name input field should be visible and working', () => {
    const inputText = 'input-test';
    const { container } = render(
      <WithRedux>
        <AddPermission {...props} />
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
        <AddPermission {...props} addPermissionFormError={snackBarData} />
      </WithRedux>
    );

    const snackBarTitleText = queryByText(snackBarData.title);
    expect(snackBarTitleText).toBeInTheDocument();
  });

  it('Save permission button should not called addPermissionsAction if some data in form is missing', async () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPermission {...props} />
      </WithRedux>
    );
    const saveBtn = queryByRole('button', { name: buttonType.save });
    expect(saveBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveBtn));
    const nameValidationError = queryByText(validation.permissionNameEnter);
    expect(nameValidationError).toBeInTheDocument();
    expect(props.addPermissionsAction).not.toBeCalled();
  });

  it('Save permission button should called addPermissionsAction if some contains data', async () => {
    const inputData = 'input-data';
    const requestBody = {
      actions: ['iam.condition.read'],
      consumer: 'iam',
      description: '',
      name: 'input-data',
      resources: ['*'],
    };
    const { queryByRole, getAllByRole, queryByText } = render(
      <WithRedux>
        <AddPermission {...props} />
      </WithRedux>
    );

    // permission name field
    const permissionInputLabel = queryByText(permissionNameLabel);
    const permissionNameInputContainer = permissionInputLabel.parentElement;
    const permissionNameInputElement = permissionNameInputContainer.querySelector('input');
    fireEvent.change(permissionNameInputElement, {
      target: {
        value: inputData,
      },
    });

    // consumer field
    const consumerLabel = queryByText(permissionConsumerLabel);
    const selectContainer = consumerLabel.parentElement.querySelector('.bds-select-value');
    await waitFor(() => fireEvent.click(selectContainer));
    const consumerFirstOption = getAllByRole('option')[0];
    await waitFor(() => fireEvent.click(consumerFirstOption));

    // resource field
    const resourceLabel = queryByText(permissionResourcesLabel);
    const resourceInputField = resourceLabel.parentElement.querySelector('input');
    fireEvent.change(resourceInputField, {
      target: {
        value: '*',
      },
    });

    // Action field
    const actionLabel = queryByText(permissionActionsLabel);
    const actionLabelInputField = actionLabel.parentElement.querySelector('input');
    await waitFor(() => fireEvent.click(actionLabelInputField));
    const firstActionOption = getAllByRole('option')[0];
    await waitFor(() => fireEvent.click(firstActionOption));

    // save button click
    const saveBtn = queryByRole('button', { name: buttonType.save });
    expect(saveBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveBtn));
    await new Promise((r) => setTimeout(r, 1000));
    expect(props.addPermissionsAction).toBeCalledTimes(1);
    expect(props.addPermissionsAction).toBeCalledWith(requestBody, props.history);
  });
});
