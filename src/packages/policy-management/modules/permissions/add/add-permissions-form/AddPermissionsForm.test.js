/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import AddPermissionsForm from './AddPermissionsForm';
import { translate } from '../../../../externalization';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import {
  errorAndHelperText,
  permissionActionsLabel,
  permissionDescriptionLabel,
  permissionNameLabel,
  permissionResourcesLabel,
} from './constants';

const props = {
  validationHook: {
    values: {
      name: 'permission_name',
      description: 'description',
      resources: 'resources',
      consumer: '',
      actions: [],
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    touched: {},
    errors: {},
    names: {
      name: 'name',
      description: 'description',
      consumer: 'consumer',
      actions: 'actions',
      resources: 'resources',
    },
  },
  getActionsList: jest.fn(),
  consumerList: { result: ['iam', 'secretmanager'] },
  consumerListStatus: RESOURCE_STATUS.SUCCESS,
  actionListData: {
    result: ['iam.condition.read', 'iam.condition.*'],
  },
  actionListStatus: RESOURCE_STATUS.SUCCESS,
  addPermissionStatus: RESOURCE_STATUS.SUCCESS,
  addPermissionFormError: null,
  nameFilterLoading: false,
};

beforeEach(cleanup);

describe('Policy Management - Add Permissions From', () => {
  it('Display permission name label', () => {
    const { queryByText } = render(<AddPermissionsForm {...props} />);
    const permissionLabel = queryByText(permissionNameLabel);
    expect(permissionLabel).toBeInTheDocument();
  });

  it('Display permission name input and should be working', () => {
    const inputData = 'input-test';
    const { queryByDisplayValue } = render(<AddPermissionsForm {...props} />);
    const permissionInput = queryByDisplayValue(props.validationHook.values.name);
    fireEvent.change(permissionInput, {
      target: {
        value: inputData,
      },
    });
    expect(props.validationHook.handleChange).toBeCalledTimes(1);
    expect(props.validationHook.handleChange).toBeCalledWith('name', inputData);
  });

  it('Display description and optional label', () => {
    const { queryByText } = render(<AddPermissionsForm {...props} />);
    const descriptionLabel = queryByText(permissionDescriptionLabel);
    expect(descriptionLabel).toBeInTheDocument();
    const descriptionHelperText = queryByText(errorAndHelperText.descriptionHelperTxt);
    expect(descriptionHelperText).toBeInTheDocument();
  });

  it('Description field should be working', () => {
    const inputData = 'input-test';
    const { queryByDisplayValue } = render(<AddPermissionsForm {...props} />);
    const descriptionTextarea = queryByDisplayValue(props.validationHook.values.description);
    fireEvent.change(descriptionTextarea, {
      target: {
        value: inputData,
      },
    });
    expect(props.validationHook.handleChange).toBeCalledTimes(1);
    expect(props.validationHook.handleChange).toBeCalledWith('description', inputData);
  });

  it('Display Consumer label and Select Consumer placeholder', () => {
    const { queryByText } = render(<AddPermissionsForm {...props} />);
    const consumerLabel = queryByText(translate('CONSUMER'));
    expect(consumerLabel).toBeInTheDocument();

    // because static data is provided, so consumer list will not be empty
    const consumerSelectBoxPlaceHolder = queryByText(errorAndHelperText.consumerPlaceholder);
    expect(consumerSelectBoxPlaceHolder).toBeInTheDocument();
  });

  it('Select Consumer drop should be working', () => {
    const { queryByTestId, getAllByRole } = render(<AddPermissionsForm {...props} />);
    const selectContainer = queryByTestId('select-value');
    fireEvent.click(selectContainer);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);
    // props.validationHook.handleChange will be calls 2 times because id consume is changed
    // we need to clear the all previous actions
    waitFor(() => expect(props.validationHook.handleChange).toBeCalledTimes(2));
    expect(props.validationHook.handleChange).toBeCalledWith(
      'consumer',
      props.consumerList.result[0]
    );
    expect(props.validationHook.handleChange).toBeCalledWith('actions', []);
  });

  it('Display Resources Label and Comma separated list of resource helper text', () => {
    const { queryByText } = render(<AddPermissionsForm {...props} />);
    const resourceLabel = queryByText(permissionResourcesLabel);
    expect(resourceLabel).toBeInTheDocument();

    const resourceHelperText = queryByText(errorAndHelperText.resourcesHelperTxt);
    expect(resourceHelperText).toBeInTheDocument();
  });

  it('Resources field should be working', () => {
    const inputData = 'input-test';
    const { queryByDisplayValue } = render(<AddPermissionsForm {...props} />);
    const descriptionTextarea = queryByDisplayValue(props.validationHook.values.resources);
    fireEvent.change(descriptionTextarea, {
      target: {
        value: inputData,
      },
    });
    expect(props.validationHook.handleChange).toBeCalledTimes(1);
    expect(props.validationHook.handleChange).toBeCalledWith('resources', inputData);
  });

  it('Display Action Label and search placeholder text', () => {
    const { queryByText, queryByPlaceholderText } = render(<AddPermissionsForm {...props} />);

    const resourceLabel = queryByText(permissionActionsLabel);
    expect(resourceLabel).toBeInTheDocument();

    const resourceHelperText = queryByPlaceholderText(errorAndHelperText.actionsPlaceholder);
    expect(resourceHelperText).toBeInTheDocument();
  });

  it('Action Label and search placeholder text should not be display if actionData is null', () => {
    const { queryByText, queryByPlaceholderText } = render(
      <AddPermissionsForm {...props} actionListData={{ result: null }} />
    );
    const resourceLabel = queryByText(permissionActionsLabel);
    expect(resourceLabel).not.toBeInTheDocument();

    const resourceHelperText = queryByPlaceholderText(errorAndHelperText.actionsPlaceholder);
    expect(resourceHelperText).not.toBeInTheDocument();
  });

  it('Action field should be hidden and visible base on actionData', () => {
    const { queryByText, queryByPlaceholderText, rerender } = render(
      <AddPermissionsForm {...props} actionListData={{ result: null }} />
    );
    let resourceLabel = queryByText(permissionActionsLabel);
    expect(resourceLabel).not.toBeInTheDocument();

    let resourceHelperText = queryByPlaceholderText(errorAndHelperText.actionsPlaceholder);
    expect(resourceHelperText).not.toBeInTheDocument();

    rerender(<AddPermissionsForm {...props} />);
    resourceLabel = queryByText(permissionActionsLabel);
    expect(resourceLabel).toBeInTheDocument();

    resourceHelperText = queryByPlaceholderText(errorAndHelperText.actionsPlaceholder);
    expect(resourceHelperText).toBeInTheDocument();
  });

  it('Loader should visible and hidden base on status', () => {
    const { container, rerender } = render(
      <AddPermissionsForm {...props} viewPermissionStatus={RESOURCE_STATUS.LOADING} />
    );
    let spinner = container.querySelector('.bds-loader');
    expect(spinner).toBeInTheDocument();
    rerender(<AddPermissionsForm {...props} viewPermissionStatus={RESOURCE_STATUS.SUCCESS} />);
    expect(spinner).not.toBeInTheDocument();
  });
});
