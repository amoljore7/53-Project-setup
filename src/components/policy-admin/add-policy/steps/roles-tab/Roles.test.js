/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent, act } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import Roles from './Roles';
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
  translatedStrings: {
    roleNameRequiredValidation: 'Please enter name of the role.',
    addBtn: 'Add',
    cancelBtn: 'Cancel',
    addRole: 'Add Role',
    cancelModalTitle: 'Discard Changes?',
    roleCancelModalMessage: 'The unsaved changes to the role will be discarded.',
    cancelModalPrimaryBtn: 'Yes, Discard Without Saving',
    noBtn: 'No',
    description: 'Description',
    noneText: 'None',
    deleteModalTitle: 'Delete Role?',
    deleteModalRoleMessage: 'The role will be removed from the list.',
    deleteModalPrimaryBtn: 'Yes, Remove',
    roleNameLabel: 'Role Name',
    roleDescriptionLabel: 'Description',
    permissionsLabel: 'Permissions',
    roleActionsLabel: 'Action',
    viewRoleTooltip: 'View Role',
    deleteRoleTooltip: 'Delete Role',
    viewRoleTitle: (name) => `Role : ${name}`,
    accessType: 'Access Type',
    rolesLabel: 'Roles',
  },
  rolesList: [
    {
      id: '0a53a18f-07c3-4a73-a1c3-1df35eb591fd',
      name: 'test-role',
      description: 'Test Role Description',
      permissions: [
        {
          id: 'dd61f7f6-0d47-4cb9-b407-19bb17288e9f',
          name: 'test-permission',
          description: 'Test Permission Description',
          consumer: 'workflows',
          actions: [
            'workflows.notification.list',
            'workflows.notification.manage',
            'workflows.notification.view',
          ],
          resources: ['*'],
          isInline: false,
          isReadOnly: true,
        },
      ],
      isReadOnly: true,
    },
    {
      id: '0a53a18f-07c3-4a73-a1c3-1df35eb591fm',
      name: 'test-role-2',
      description: 'Test Role 2 Description',
      permissions: [
        {
          id: 'dd61f7f6-0d47-4cb9-b407-19bb17288e9g',
          name: 'test-permission-2',
          description: 'Test Permission-2 Description',
          consumer: 'workflows',
          actions: [
            'workflows.notification.list',
            'workflows.notification.manage',
            'workflows.notification.view',
          ],
          resources: ['*'],
          isInline: false,
          isReadOnly: true,
        },
      ],
      isReadOnly: true,
    },
  ],
  rolesListStatus: RESOURCE_STATUS.SUCCESS,
  fetchRolesList: jest.fn(),
  fetchRoleDetails: jest.fn(),
  openNotification: jest.fn(),
  roleDetailsStatus: RESOURCE_STATUS.SUCCESS,
  consumerListStatus: RESOURCE_STATUS.SUCCESS,
  roleDetails: {
    id: '0a53a18f-07c3-4a73-a1c3-1df35eb591fd',
    name: 'test-role',
    description: 'Test Role Description',
    permissions: [
      {
        id: 'dd61f7f6-0d47-4cb9-b407-19bb17288e9f',
        name: 'test-permission',
        description: 'Test Permission Description',
        consumer: 'workflows',
        actions: [
          'workflows.notification.list',
          'workflows.notification.manage',
          'workflows.notification.view',
        ],
        resources: ['*'],
        isInline: false,
        isReadOnly: true,
      },
    ],
    isReadOnly: true,
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
  consumersList: [
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
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      allowDeny: 'Allow',
      roles: [],
      isDraft: false,
      permissions: [],
    },
    validationSchema: yup.object({
      roles: yup
        .array()
        .test('roles', translatedStrings.rolesAndPermissionValidation, function (value) {
          const { permissions, isDraft } = this.parent;
          if (isDraft) return true;
          if (permissions && permissions.length === 0) {
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
    <Roles {...others} translatedStrings={translatedStrings} validationHook={validationHook} />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add/Edit Roles Tab', () => {
  it('Should display roles form', () => {
    const { queryByText, queryByRole } = render(<ParentTestComponent {...props} />);

    const accessType = queryByText(props.translatedStrings.accessType);
    expect(accessType).toBeInTheDocument();

    const rolesLabel = queryByText(props.translatedStrings.rolesLabel);
    expect(rolesLabel).toBeInTheDocument();

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
  });

  it('Should open side popup when click on add role button', async () => {
    const { queryByRole } = render(<ParentTestComponent {...props} />);

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    // add btn is present on side modal popup
    let addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
  });

  it('Should ask for confirmation on cancel button click in side modal popup', () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    // add btn is present on side modal popup
    let addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();

    const cancelBtn = queryByRole('button', { name: props.translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(cancelBtn);
    });

    const confirmationDialogTitle = queryByText(props.translatedStrings.cancelModalTitle);
    expect(confirmationDialogTitle).toBeInTheDocument();

    const yesDiscardBtn = queryByRole('button', {
      name: props.translatedStrings.cancelModalPrimaryBtn,
    });
    expect(yesDiscardBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(yesDiscardBtn);
    });

    addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).not.toBeInTheDocument();
  });

  it('On Cancel button, confirmation popup should be close', () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    // add btn is present on side modal popup
    let addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();

    const cancelBtn = queryByRole('button', { name: props.translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(cancelBtn);
    });

    const confirmationDialogTitle = queryByText(props.translatedStrings.cancelModalTitle);
    expect(confirmationDialogTitle).toBeInTheDocument();

    const noDiscardBtn = queryByRole('button', {
      name: props.translatedStrings.noBtn,
    });
    expect(noDiscardBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(noDiscardBtn);
    });

    addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
  });

  it('Should display the roles(list) in side modal popup', () => {
    const { queryByRole, queryByText } = render(
      <ParentTestComponent {...props} roleDetails={{}} />
    );

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    let testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).not.toBeInTheDocument();

    let testRoleTwo = queryByText(props.rolesList[1].name);
    expect(testRoleTwo).not.toBeInTheDocument();

    const dropDownBtnIcon = document.querySelector('svg.bds-autocomplete-icon');
    expect(dropDownBtnIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(dropDownBtnIcon);
    });

    testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).toBeInTheDocument();

    testRoleTwo = queryByText(props.rolesList[1].name);
    expect(testRoleTwo).toBeInTheDocument();
  });

  it('Should call fetch roleDetails method on click of role in drop down options', () => {
    const { queryByRole, queryByText } = render(
      <ParentTestComponent {...props} roleDetails={{}} />
    );

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    const dropDownBtnIcon = document.querySelector('svg.bds-autocomplete-icon');
    expect(dropDownBtnIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(dropDownBtnIcon);
    });

    const testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).toBeInTheDocument();

    act(() => {
      fireEvent.click(testRoleOne);
    });

    expect(props.fetchRoleDetails).toBeCalledTimes(1);
    expect(props.fetchRoleDetails).toBeCalledWith(props.rolesList[0].id);
  });

  it('Should display role details base on selected role from drop down list', () => {
    const { queryByRole, queryByText, rerender } = render(
      <ParentTestComponent
        {...props}
        roleDetails={{}}
        roleDetailsStatus={RESOURCE_STATUS.INITIAL}
      />
    );

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    const dropDownBtnIcon = document.querySelector('svg.bds-autocomplete-icon');
    expect(dropDownBtnIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(dropDownBtnIcon);
    });

    const testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).toBeInTheDocument();

    act(() => {
      fireEvent.click(testRoleOne);
    });

    rerender(<ParentTestComponent {...props} />);

    const descriptionLabel = queryByText(props.translatedStrings.description);
    expect(descriptionLabel).toBeInTheDocument();

    const description = queryByText(props.roleDetails.description);
    expect(description).toBeInTheDocument();

    const permissionName = queryByText(props.roleDetails.permissions[0].name);
    expect(permissionName);

    const permissionDescription = queryByText(props.roleDetails.permissions[0].description);
    expect(permissionDescription);

    const permissionConsumer = queryByText(props.roleDetails.permissions[0].consumer);
    expect(permissionConsumer);

    const permissionResources = queryByText(props.roleDetails.permissions[0].resources);
    expect(permissionResources);

    const permissionActionsLabel = queryByText(props.translatedStrings.roleActionsLabel);
    expect(permissionActionsLabel);

    const permissionActions = queryByText(props.roleDetails.permissions[0].actions[0]);
    expect(permissionActions);
  });

  it('Role Should be added roles table', async () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    const dropDownBtnIcon = document.querySelector('svg.bds-autocomplete-icon');
    expect(dropDownBtnIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(dropDownBtnIcon);
    });

    const testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).toBeInTheDocument();
    act(() => {
      fireEvent.click(testRoleOne);
    });

    expect(document.getElementsByClassName('bds-table-row').length).toBe(0);

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addBtn);
    });
    await new Promise((r) => setTimeout(r, 100));
    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      'success',
      'The role is added to the list.',
      3000
    );

    expect(document.getElementsByClassName('bds-table-row').length).toBe(1);
  });

  it('Should able to view roles details from roles table', async () => {
    const { queryByRole, queryByText } = render(<ParentTestComponent {...props} />);

    const addRoleBtn = queryByRole('button', { name: props.translatedStrings.addRole });
    expect(addRoleBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addRoleBtn);
    });

    const dropDownBtnIcon = document.querySelector('svg.bds-autocomplete-icon');
    expect(dropDownBtnIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(dropDownBtnIcon);
    });

    const testRoleOne = queryByText(props.rolesList[0].name);
    expect(testRoleOne).toBeInTheDocument();
    act(() => {
      fireEvent.click(testRoleOne);
    });

    const addBtn = queryByRole('button', { name: props.translatedStrings.addBtn });
    expect(addBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addBtn);
    });
    await new Promise((r) => setTimeout(r, 100));

    const roleRows = document.getElementsByClassName('bds-table-row');
    expect(roleRows.length).toBe(1);

    const viewActionContainer = roleRows[0].querySelector(`.${classes.permissionActionView}`);
    const viewIcon = viewActionContainer.querySelector('svg');
    expect(viewIcon).toBeInTheDocument();
    act(() => {
      fireEvent.click(viewIcon);
    });

    const sideModalPopup = queryByText(
      props.translatedStrings.viewRoleTitle(props.roleDetails.name)
    );
    expect(sideModalPopup).toBeInTheDocument();
  });
});
