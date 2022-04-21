/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent, act } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import Permissions from './Permissions';
import * as yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { classes } from './constants';

// added to suppress warning
const originalError = global.console.error;
beforeAll(() => {
  global.console.error = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Please upgrade to at least react-dom@16.9.0')
    ) {
      return;
    }
    return originalError.call(console, args);
  });
});

const props = {
  fetchPermissionDetails: jest.fn(),
  fetchConsumersList: jest.fn(),
  fetchPermissionsList: jest.fn(),
  openNotification: jest.fn(),
  fetchPermissionActions: jest.fn(),
  getApplicationsList: jest.fn(),
  resetActionsData: jest.fn(),
  permissionsList: [
    {
      id: '00e90ed9-92b2-4804-b41e-2303534582a4',
      name: 'vault_17',
      description: 'Vault Permission Adiós',
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
      id: '099d9690-e597-4268-8da0-e5d2e7262690',
      name: 'SecurityAdminPermission',
      description: 'Permission to manage API Tokens, SAML Configurations and SecurityPolicies',
      consumer: 'securityadmin',
      actions: [
        'securityadmin.security.view',
        'securityadmin.security.list',
        'securityadmin.security.manage',
      ],
      resources: ['*'],
      isInline: false,
      isReadOnly: true,
    },
  ],
  consumersList: [
    {
      name: 'apps',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Applications',
    },
    {
      name: 'ada',
      consumerURL: null,
      nameToIdURL: null,
      idToNameURL: null,
      responseType: null,
      description: 'Risk Analytics & Query Engine',
    },
  ],
  permissionDetails: {
    id: '00e90ed9-92b2-4804-b41e-2303534582a4',
    name: 'vault_17',
    description: 'Vault Permission',
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
  permissionActionsList: [
    {
      tenantId: 'default',
      name: 'ada.queryengine.view',
      description: 'Queryengine view action',
      consumer: 'ada',
      isApprovalApplicable: false,
    },
    {
      tenantId: 'default',
      name: 'ada.riskanalytics.view',
      description: 'Riskanalytics view action',
      consumer: 'ada',
      isApprovalApplicable: false,
    },
  ],
  permissionActionsListStatus: RESOURCE_STATUS.SUCCESS,
  permissionDetailsStatus: RESOURCE_STATUS.SUCCESS,
  permissionsListStatus: RESOURCE_STATUS.SUCCESS,
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
  applicationsListStatus: RESOURCE_STATUS.SUCCESS,
  translatedStrings: {
    accessType: 'Access Type',
    accessLevel: 'Access Level',
    permissionNameValidation: 'Please enter name of the permission.',
    addExistingPermissionBtn: 'Add Existing Permission',
    addNewPermissionBtn: 'Add New Permission',
    inlinePermissionAddSuccess: 'Inline permission added successfully',
    permissionAddSuccess: 'Permission added successfully',
    predefinedType: 'Predefined',
    permissionNameLabel: 'Permission Name',
    sourceLabel: 'Source',
    inlineType: 'Description',
    consumerLabel: 'Consumer',
    actionLabel: 'Actions',
    resourceLabel: 'Resources',
    actionColumn: 'Action',
    editPermissionTooltip: 'Edit Permission',
    viewPermissionTooltip: 'View permission',
    deletePermissionTooltip: 'Delete permission',
    deletePermissionModalTitle: 'Remove Permission?',
    deleteModalPermissionMessage: 'The permission will be removed from the list.',
    deleteModalPrimaryBtn: 'Yes, Remove',
    noBtn: 'No',
    permissionTitle: 'Permission',
    permissionsLabel: 'Permissions',
    cancelBtn: 'Cancel',
    saveBtn: 'Save',
    resetBtn: 'Reset',
    addNewPermissionTitle: 'Add New Permission',
    editPermissionTitle: 'Edit Permission',
    descriptionLabel: 'Description',
    descriptionHelperLabel: 'Optional',
    consumerPlaceholder: 'Select Consumer',
    resourceHelperLabel: 'Comma separated list of resources',
    saveModalTitle: 'Save Permission?',
    saveModalMessage: 'Changes to the inline permission are saved.',
    saveModalPrimaryBtn: 'Yes, Save',
    cancelModalTitle: 'Discard Changes?',
    permissionCancelModalMessage: 'The unsaved changes to the permission will be discarded.',
    cancelModalPrimaryBtn: 'Yes, Discard Without Saving',
    resetModalTitle: 'Reset Permission?',
    resetModalMessage: 'All fields will be replaced with the saved permission.',
    resetModalPrimaryBtn: 'Yes, Reset All Fields',
    resetModalSecondaryBtn: 'No, Keep Changes',
    addBtn: 'Add',
    searchPermissionLabel: 'Search Permission',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      isDraft: false,
      permissions: [],
      allowDeny: 'Allow',
      roles: [],
    },
    validationSchema: yup.object({
      permissions: yup
        .array()
        .test('permissions', translatedStrings.rolesAndPermissionValidation, function (value) {
          const { roles, isDraft } = this.parent;
          if (isDraft) return true;
          if (roles && roles.length === 0) {
            if (value && value.length === 0) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <Permissions
      {...others}
      translatedStrings={translatedStrings}
      validationHook={validationHook}
    />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add/Edit Permissions Tab', () => {
  it('Should display permission form', () => {
    const { queryByText, queryByRole } = render(<ParentTestComponent {...props} />);

    const accessTypeLabel = queryByText(props.translatedStrings.accessType);
    expect(accessTypeLabel).toBeInTheDocument();

    const accessType = queryByText('Allow');
    expect(accessType).toBeInTheDocument();

    const permissionLabel = queryByText(props.translatedStrings.permissionsLabel);
    expect(permissionLabel).toBeInTheDocument();

    const addExistingPermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addExistingPermissionBtn,
    });
    expect(addExistingPermissionBtn).toBeInTheDocument();

    const addInlinePermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addNewPermissionBtn,
    });
    expect(addInlinePermissionBtn).toBeInTheDocument();
  });

  it('Should able to add existing permission', async () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addExistingPermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addExistingPermissionBtn,
    });
    expect(addExistingPermissionBtn).toBeInTheDocument();
    act(() => fireEvent.click(addExistingPermissionBtn));

    const searchLabel = queryByText(props.translatedStrings.searchPermissionLabel);
    expect(searchLabel).toBeInTheDocument();

    const searchInput = document.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: props.permissionsList[0].name } });

    const testPermission = queryByText(props.permissionsList[0].name);
    expect(testPermission).toBeInTheDocument();
    fireEvent.click(testPermission);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);
  });

  it('Should able to add inline permission', async () => {
    const inputData = 'input-test';
    const { queryByRole, queryByText, queryByTestId, getAllByRole } = render(
      <ParentTestComponent {...props} />
    );

    const addInlinePermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addNewPermissionBtn,
    });
    expect(addInlinePermissionBtn).toBeInTheDocument();
    fireEvent.click(addInlinePermissionBtn);

    const permissionLabel = queryByText(props.translatedStrings.permissionNameLabel);
    expect(permissionLabel).toBeInTheDocument();

    const permissionInput = permissionLabel.parentNode.querySelector('input');
    fireEvent.change(permissionInput, {
      target: {
        value: inputData,
      },
    });

    const consumerLabel = queryByText(props.translatedStrings.consumerLabel);
    expect(consumerLabel).toBeInTheDocument();

    const selectContainer = queryByTestId('select-value');
    fireEvent.click(selectContainer);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);

    const resourceLabel = queryByText(props.translatedStrings.resourceLabel);
    expect(resourceLabel).toBeInTheDocument();
    const resourceTextarea = resourceLabel.parentNode.querySelector('input');
    fireEvent.change(resourceTextarea, {
      target: {
        value: 'A',
      },
    });

    const allApplicationOptions = queryByText(props.applicationsListData[0].applicationName);
    expect(allApplicationOptions).toBeInTheDocument();
    fireEvent.click(allApplicationOptions);

    const actionLabel = queryByText(props.translatedStrings.actionLabel);
    expect(actionLabel).toBeInTheDocument();

    const actionInput = actionLabel.parentNode.querySelector('input');
    expect(actionInput).toBeInTheDocument();
    fireEvent.click(actionInput, { target: { value: props.permissionActionsList[0].name } });

    const firstActionOption = queryByText(props.permissionActionsList[0].name);
    expect(firstActionOption).toBeInTheDocument();
    firstActionOption.click(firstActionOption);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);
  });

  it('Should able to delete added existing permission', async () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addExistingPermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addExistingPermissionBtn,
    });
    expect(addExistingPermissionBtn).toBeInTheDocument();
    act(() => fireEvent.click(addExistingPermissionBtn));

    const searchInput = document.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: props.permissionsList[0].name } });

    const testPermission = queryByText(props.permissionsList[0].name);
    expect(testPermission).toBeInTheDocument();
    fireEvent.click(testPermission);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);

    const deleteIcon = document.querySelector(`.${classes.permissionActionDelete}`);
    expect(deleteIcon).toBeInTheDocument();
    fireEvent.click(deleteIcon);

    const removeConfirmationDialogTitle = queryByText(
      props.translatedStrings.deletePermissionModalTitle
    );
    expect(removeConfirmationDialogTitle).toBeInTheDocument();

    const yesDeleteButton = queryByRole('button', {
      name: props.translatedStrings.deleteModalPrimaryBtn,
    });
    expect(yesDeleteButton).toBeInTheDocument();
    fireEvent.click(yesDeleteButton);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);
  });

  it('Should able to view added existing permission', async () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addExistingPermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addExistingPermissionBtn,
    });
    expect(addExistingPermissionBtn).toBeInTheDocument();
    act(() => fireEvent.click(addExistingPermissionBtn));

    const searchInput = document.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: props.permissionsList[0].name } });

    const testPermission = queryByText(props.permissionsList[0].name);
    expect(testPermission).toBeInTheDocument();
    fireEvent.click(testPermission);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);

    const viewIcon = document.querySelector(`.${classes.permissionActionView}`);
    expect(viewIcon).toBeInTheDocument();
    fireEvent.click(viewIcon);

    let sideModalTitle = queryByText(
      `${props.translatedStrings.permissionTitle} : ${props.permissionDetails.name}`
    );
    expect(sideModalTitle).toBeInTheDocument();

    const sideModalCloseBtn = document.querySelector('.heading-container svg');
    expect(sideModalCloseBtn).toBeInTheDocument();
    fireEvent.click(sideModalCloseBtn);

    sideModalTitle = queryByText(
      `${props.translatedStrings.permissionTitle} : ${props.permissionDetails.name}`
    );
    expect(sideModalTitle).not.toBeInTheDocument();
  });

  it('Should able to edit the added inline permission', async () => {
    const inputData = 'input-test';
    const { queryByRole, queryByText, queryByTestId, getAllByRole } = render(
      <ParentTestComponent {...props} />
    );

    const addInlinePermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addNewPermissionBtn,
    });
    expect(addInlinePermissionBtn).toBeInTheDocument();
    fireEvent.click(addInlinePermissionBtn);

    const permissionLabel = queryByText(props.translatedStrings.permissionNameLabel);
    expect(permissionLabel).toBeInTheDocument();

    const permissionInput = permissionLabel.parentNode.querySelector('input');
    fireEvent.change(permissionInput, {
      target: {
        value: inputData,
      },
    });

    const consumerLabel = queryByText(props.translatedStrings.consumerLabel);
    expect(consumerLabel).toBeInTheDocument();

    const selectContainer = queryByTestId('select-value');
    fireEvent.click(selectContainer);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);

    const resourceLabel = queryByText(props.translatedStrings.resourceLabel);
    expect(resourceLabel).toBeInTheDocument();
    const resourceTextarea = resourceLabel.parentNode.querySelector('input');
    fireEvent.change(resourceTextarea, {
      target: {
        value: 'A',
      },
    });

    const allApplicationOptions = queryByText(props.applicationsListData[0].applicationName);
    expect(allApplicationOptions).toBeInTheDocument();
    fireEvent.click(allApplicationOptions);

    const actionLabel = queryByText(props.translatedStrings.actionLabel);
    expect(actionLabel).toBeInTheDocument();

    const actionInput = actionLabel.parentNode.querySelector('input');
    expect(actionInput).toBeInTheDocument();
    fireEvent.click(actionInput, { target: { value: props.permissionActionsList[0].name } });

    const firstActionOption = queryByText(props.permissionActionsList[0].name);
    expect(firstActionOption).toBeInTheDocument();
    firstActionOption.click(firstActionOption);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);
    const viewIcon = document.querySelector(`.${classes.permissionActionEdit}`);
    expect(viewIcon).toBeInTheDocument();
    fireEvent.click(viewIcon);

    const sideModalTitle = queryByText(props.translatedStrings.editPermissionTitle);
    expect(sideModalTitle).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 500));

    const permissionNameInput = document.querySelector('input');
    fireEvent.change(permissionNameInput, {
      target: {
        value: 'new-permission-name',
      },
    });

    await new Promise((r) => setTimeout(r, 500));

    const saveBtn = queryByRole('button', { name: props.translatedStrings.saveBtn });
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);

    const updateConfirmationDialogTitle = queryByText(props.translatedStrings.saveModalTitle);
    expect(updateConfirmationDialogTitle).toBeInTheDocument();

    const yesSaveBtn = queryByRole('button', { name: props.translatedStrings.saveModalPrimaryBtn });
    expect(yesSaveBtn).toBeInTheDocument();
    fireEvent.click(yesSaveBtn);
    await new Promise((r) => setTimeout(r, 500));

    const updatedPermissionName = queryByText('new-permission-name');
    expect(updatedPermissionName).toBeInTheDocument();
  });

  it('Should able to reset permission data in edit permission form ', async () => {
    const inputData = 'input-test';
    const { queryByRole, queryByText, queryByTestId, getAllByRole } = render(
      <ParentTestComponent {...props} />
    );

    const addInlinePermissionBtn = queryByRole('button', {
      name: props.translatedStrings.addNewPermissionBtn,
    });
    expect(addInlinePermissionBtn).toBeInTheDocument();
    fireEvent.click(addInlinePermissionBtn);

    const permissionLabel = queryByText(props.translatedStrings.permissionNameLabel);
    expect(permissionLabel).toBeInTheDocument();

    const permissionInput = permissionLabel.parentNode.querySelector('input');
    fireEvent.change(permissionInput, {
      target: {
        value: inputData,
      },
    });

    const consumerLabel = queryByText(props.translatedStrings.consumerLabel);
    expect(consumerLabel).toBeInTheDocument();

    const selectContainer = queryByTestId('select-value');
    fireEvent.click(selectContainer);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);

    const resourceLabel = queryByText(props.translatedStrings.resourceLabel);
    expect(resourceLabel).toBeInTheDocument();
    const resourceTextarea = resourceLabel.parentNode.querySelector('input');
    fireEvent.change(resourceTextarea, {
      target: {
        value: 'A',
      },
    });

    const allApplicationOptions = queryByText(props.applicationsListData[0].applicationName);
    expect(allApplicationOptions).toBeInTheDocument();
    fireEvent.click(allApplicationOptions);

    const actionLabel = queryByText(props.translatedStrings.actionLabel);
    expect(actionLabel).toBeInTheDocument();

    const actionInput = actionLabel.parentNode.querySelector('input');
    expect(actionInput).toBeInTheDocument();
    fireEvent.click(actionInput, { target: { value: props.permissionActionsList[0].name } });

    const firstActionOption = queryByText(props.permissionActionsList[0].name);
    expect(firstActionOption).toBeInTheDocument();
    firstActionOption.click(firstActionOption);

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    await new Promise((r) => setTimeout(r, 500));

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);
    const viewIcon = document.querySelector(`.${classes.permissionActionEdit}`);
    expect(viewIcon).toBeInTheDocument();
    fireEvent.click(viewIcon);

    const sideModalTitle = queryByText(props.translatedStrings.editPermissionTitle);
    expect(sideModalTitle).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 500));

    const permissionNameInput = document.querySelector('input');
    fireEvent.change(permissionNameInput, {
      target: {
        value: 'new-permission-name',
      },
    });

    await new Promise((r) => setTimeout(r, 500));

    const resetBtn = queryByRole('button', { name: props.translatedStrings.resetBtn });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);

    const resetConfirmationDialogTitle = queryByText(props.translatedStrings.resetModalTitle);
    expect(resetConfirmationDialogTitle).toBeInTheDocument();

    const yesResetBtn = queryByRole('button', {
      name: props.translatedStrings.resetModalPrimaryBtn,
    });
    expect(yesResetBtn).toBeInTheDocument();
    fireEvent.click(yesResetBtn);

    const saveBtn = queryByRole('button', { name: props.translatedStrings.saveBtn });
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);

    const updateConfirmationDialogTitle = queryByText(props.translatedStrings.saveModalTitle);
    expect(updateConfirmationDialogTitle).toBeInTheDocument();

    const yesSaveBtn = queryByRole('button', {
      name: props.translatedStrings.saveModalPrimaryBtn,
    });
    expect(yesSaveBtn).toBeInTheDocument();
    fireEvent.click(yesSaveBtn);
    await new Promise((r) => setTimeout(r, 500));

    const updatedPermissionName = queryByText('new-permission-name');
    expect(updatedPermissionName).not.toBeInTheDocument();
  });
});
