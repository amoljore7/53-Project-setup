/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import AddPolicy from './AddPolicy';
import testUtils from '../../../../../utils/test-utils';
import { translatedStrings } from './constants';
import { translate } from '../../../externalization';
import { isDateTimeData } from './add-policy-form/constants';
import {
  errorNotificationType,
  policyListingPath,
  RESOURCE_STATUS,
  successNotificationType,
} from '../../../../../utils/common-constants';

const policyReducer = {
  add: {
    notificationMedium: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: [
        {
          id: '123',
          name: 'email',
          type: 'email',
        },
        {
          id: '013aa169-4a6d-437a-93ac-5611fff5984f',
          name: 'n-autotestWkupgzbkOkvf',
          description: 'Test Notification Medium',
          type: 'email',
          connectionParameters: {
            senderEmailAddress: 'tushal.dahibhate@britive.com',
          },
          referenceCount: 0,
        },
      ],
    },
    channelList: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        result: [],
      },
    },
    addPolicy: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {},
    },
    permissionList: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: [
        {
          id: '1',
          name: 'An existing Permission',
          description: '',
          consumer: 'authz',
          actions: [
            'authz.policy.create',
            'authz.policy.update',
            'authz.policy.delete',
            'authz.policy.read',
          ],
          resources: ['*'],
          isInline: false,
          isReadOnly: false,
        },
      ],
    },
    consumerList: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        result: [
          {
            name: 'authz',
            consumerURL: null,
            nameToIdURL: null,
            idToNameURL: null,
            responseType: null,
            description: 'Policy Administration',
          },
        ],
      },
    },
    permissionActionsList: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        result: [
          {
            description: 'policy update',
            name: 'authz.policy.update',
            consumer: 'authz',
          },
        ],
      },
    },
    permissionDetails: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        id: '1',
        name: 'An existing Permission',
        description: '',
        consumer: 'authz',
        actions: [
          'authz.policy.create',
          'authz.policy.update',
          'authz.policy.delete',
          'authz.policy.read',
        ],
        resources: ['*'],
        isInline: false,
        isReadOnly: false,
      },
    },
    rolesList: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: [
        {
          id: '1',
          name: 'Some Role',
          permissions: [
            {
              id: '1',
              name: 'An existing Permission',
              description: '',
              consumer: 'authz',
              actions: [
                'authz.policy.create',
                'authz.policy.update',
                'authz.policy.delete',
                'authz.policy.read',
              ],
              resources: ['*'],
              isInline: false,
              isReadOnly: false,
            },
          ],
        },
      ],
    },
    roleDetails: {
      status: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        id: '1',
        name: 'Some Role',
        permissions: [
          {
            id: '1',
            name: 'An existing Permission',
            description: '',
            consumer: 'authz',
            actions: [
              'authz.policy.create',
              'authz.policy.update',
              'authz.policy.delete',
              'authz.policy.read',
            ],
            resources: ['*'],
            isInline: false,
            isReadOnly: false,
          },
        ],
      },
    },
  },
};

const membersReducer = {
  users: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          type: 'User',
          email: 'abcd@gmail.com',
          username: 'abcd@gmail.com',
          firstName: 'Abcd',
          lastName: 'abcd',
          name: 'Abcd abcd',
          userId: 'abc1234',
          status: 'active',
        },
        {
          status: 'active',
          adminRoles: [],
          type: 'User',
          created: '2021-07-23T06:17:31Z',
          modified: '2021-07-23T06:17:34Z',
          email: 'dev@britive.com',
          username: 'dev.user',
          firstName: 'dev',
          lastName: 'user',
          name: 'dev user',
          externalId: null,
          mobile: '9999999999',
          phone: '8888888888',
          identityProvider: {
            id: '1HhvrKWjoFPXvOcbJSDx',
            name: 'Britive',
            type: 'DEFAULT',
          },
          mappedAccounts: [],
          external: false,
          userId: 'heuyo6ca3lb74vh69urz',
        },
      ],
    },
  },
  groups: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          userTagId: 'xyz123er',
          name: 'some group tag',
          status: 'active',
        },
      ],
    },
  },
  serviceIdentities: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          type: 'ServiceIdentity',
          name: 'Test_admin_token',
          userId: 'aert23400op0',
          status: 'active',
        },
      ],
    },
  },
  tokens: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          id: 'x1536484ui',
          name: 'some token',
          type: 'DEFAULT',
          status: 'active',
        },
      ],
    },
  },
};

const props = {
  featureFlags: {
    secretManagerEnabled: true,
  },
  editPolicy: undefined,
  openNotification: jest.fn(),
  createPolicy: jest.fn(),
  setPageHeader: jest.fn(),
  fetchUsers: jest.fn(),
  usersData: membersReducer.users.data.result,
  usersDataStatus: membersReducer.users.status,
  fetchGroups: jest.fn(),
  groupsData: membersReducer.groups.data.result,
  groupsDataStatus: membersReducer.groups.status,
  fetchServiceIdentities: jest.fn(),
  serviceIdentitiesData: membersReducer.serviceIdentities.data.result,
  serviceIdentitiesDataStatus: membersReducer.serviceIdentities.status,
  fetchTokens: jest.fn(),
  tokensData: membersReducer.tokens,
  tokensDataStatus: membersReducer.tokens.status,
  fetchPermissionsList: jest.fn(),
  permissionsList: policyReducer.add.permissionList.data,
  fetchConsumersList: jest.fn(),
  consumersList: policyReducer.add.consumerList.data.result,
  fetchPermissionDetails: jest.fn(),
  permissionDetails: policyReducer.add.permissionDetails.data,
  fetchPermissionActions: jest.fn(),
  permissionActionsList: policyReducer.add.permissionActionsList.data.result,
  permissionActionsListStatus: policyReducer.add.permissionActionsList.status,
  permissionDetailsStatus: policyReducer.add.permissionDetails.status,
  fetchRolesList: jest.fn(),
  rolesListStatus: policyReducer.add.rolesList.status,
  fetchRoleDetails: jest.fn(),
  rolesList: policyReducer.add.rolesList.data,
  roleDetails: policyReducer.add.roleDetails.data,
  roleDetailsStatus: policyReducer.add.roleDetails.status,
  history: {
    back: jest.fn(),
    push: jest.fn(),
    location: { state: { isFormMode: true } },
  },
  addPolicyErrors: policyReducer.add.addPolicy.error,
  addPolicyStatus: policyReducer.add.addPolicy.status,
  resetActionsData: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  permissionsListStatus: policyReducer.add.permissionList.status,
  getApplicationsList: jest.fn(),
  applicationsListData: [],
  applicationsListStatus: RESOURCE_STATUS.SUCCESS,
};

const expectedCreatePolicyBody = {
  accessType: 'Allow',
  condition:
    '{"ipAddress":"10.25.52.47","timeOfAccess":{"from":"15:30:00","to":"16:00:00"},"approval":{"notificationMedium":"013aa169-4a6d-437a-93ac-5611fff5984f","timeToApprove":60,"validFor":10,"approvers":{"userIds":["heuyo6ca3lb74vh69urz"]}}}',
  description: 'policy for Admin',
  isActive: true,
  isDraft: false,
  isReadOnly: false,
  members: { serviceIdentities: [], tags: [], tokens: [], users: [{ id: '*' }] },
  name: 'Admin Policy 4',
  permissions: [{ id: '1' }],
  roles: [{ id: '1' }],
};

const expectedCratePolicyDraftBody = {
  accessType: 'Allow',
  condition: '',
  description: 'policy for Admin',
  isActive: false,
  isDraft: true,
  isReadOnly: false,
  members: { serviceIdentities: [], tags: [], tokens: [], users: [{ id: '*' }] },
  name: 'Admin Policy 4',
  permissions: [{ id: '1' }],
  roles: [{ id: '1' }],
};

const store = testUtils.storeFake({
  policyReducer,
});

// eslint-disable-next-line react/prop-types
const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

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

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

beforeEach(cleanup);

describe('Add Policy Test', () => {
  it('Policy should be created if all data present', async () => {
    jest.setTimeout(600000);
    const {
      getByTitle,
      getByTestId,
      getByText,
      getByPlaceholderText,
      queryByText,
      getByRole,
    } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const permissionNameInput = queryByText(
      translatedStrings.policyNameLabel
    ).parentElement.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(permissionNameInput, { target: { value: newPolicy.name } })
    );

    const permissionDescriptionInput = queryByText(
      translatedStrings.description
    ).parentElement.querySelector('textarea');
    expect(permissionDescriptionInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(permissionDescriptionInput, { target: { value: newPolicy.description } })
    );

    const membersTab = getByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = document.querySelector(usedSelectors.radioUsersAllSelector);
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionsTab = getByText(translatedStrings.permissionsTabTitle);
    expect(permissionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionsTab));

    const addExistingPermissionButton = getByText(translatedStrings.addExistingPermissionBtn);
    expect(addExistingPermissionButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const searchInputPermissions = getByPlaceholderText('Enter Text');
    expect(searchInputPermissions).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchInputPermissions));

    const existingPermissionOption = getByTitle(policyReducer.add.permissionList.data[0].name);
    expect(existingPermissionOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingPermissionOption));

    const permissionModalAdd = queryByText(translatedStrings.addBtn);
    expect(permissionModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionModalAdd));

    const rolesTab = getByText(translatedStrings.rolesTabTitle);
    expect(rolesTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(rolesTab));

    const addRoleButton = getByText(translatedStrings.addRole);
    expect(addRoleButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addRoleButton));

    const searchRoleInput = getByPlaceholderText('Enter Text');
    expect(searchRoleInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchRoleInput));

    const existingRoleOption = getByTitle(policyReducer.add.rolesList.data[0].name);
    expect(existingRoleOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingRoleOption));

    const roleModalAdd = getByText(translatedStrings.addBtn);
    expect(roleModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(roleModalAdd));

    await waitFor(() => fireEvent.click(getByText(translatedStrings.genericConditionsTabTitle)));

    const yesIPAddressRadio = getByText(translatedStrings.yesLabel);
    expect(yesIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesIPAddressRadio));

    const IpAddressInput = getByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.47' } }));

    const dateTimeRangeRadio = getByRole('radio', { name: isDateTimeData[2].label });

    expect(dateTimeRangeRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(dateTimeRangeRadio));

    const allDatePickerInputBoxes = document.querySelectorAll(
      'div.react-datepicker-wrapper > div > input[type=text]'
    );
    const startTimeInput = allDatePickerInputBoxes[0];
    const endTimeInput = allDatePickerInputBoxes[1];

    expect(startTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(startTimeInput));

    const _9pm = getByText('9:00 PM');
    expect(_9pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_9pm));

    expect(endTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(endTimeInput));

    const _930pm = getByText('9:30 PM');
    expect(_930pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_930pm));

    const approvalsTab = queryByText(translatedStrings.approvalsTabTitle);
    expect(approvalsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(approvalsTab));

    const yesApprovalRequiredBtn = queryByText(translatedStrings.yesLabel);
    expect(yesApprovalRequiredBtn).toBeInTheDocument();
    fireEvent.click(yesApprovalRequiredBtn);

    const selectNotificationMedium = queryByText(translatedStrings.notificationPlaceHolder);
    expect(selectNotificationMedium).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMedium));

    const selectNotificationMediumOption = queryByText(
      store.getState().policyReducer.add.notificationMedium.data[1].name
    );
    expect(selectNotificationMediumOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMediumOption));

    const userListAutoCompleteContainer = queryByText(translatedStrings.userListPlaceholder)
      .parentNode;
    const userListAutoComplete = userListAutoCompleteContainer.querySelector('svg');
    expect(userListAutoComplete).toBeInTheDocument();
    await waitFor(() => fireEvent.click(userListAutoComplete));

    const devUser = queryByText(membersReducer.users.data.result[1].name);
    expect(devUser).toBeInTheDocument();
    await waitFor(() => fireEvent.click(devUser));

    const maxTimeToApprove = queryByText(translatedStrings.approverTime).parentNode.querySelector(
      'input'
    );
    expect(maxTimeToApprove).toBeInTheDocument();
    fireEvent.change(maxTimeToApprove, { target: { value: '1:00' } });

    const maxValidityAfterApproval = queryByText(
      translatedStrings.accessValidityAfterApprovalLabel
    ).parentNode.querySelector('input');
    expect(maxValidityAfterApproval).toBeInTheDocument();
    fireEvent.change(maxValidityAfterApproval, { target: { value: '00:10' } });

    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveAndEnable });

    await waitFor(() => fireEvent.click(getByText(translatedStrings.rolesTabTitle)));
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.createPolicy).toHaveBeenCalledTimes(1);
    expect(props.createPolicy).toHaveBeenCalledWith(expectedCreatePolicyBody, props.history);
  });

  it('Policy should not be created if form is partially filled', async () => {
    const {
      getByTestId,
      getByText,
      getAllByRole,
      getByTitle,
      getByRole,
      getByPlaceholderText,
      queryByText,
    } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const inputDescription = getByTestId(usedSelectors.descriptionTestId);
    expect(inputDescription).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(inputDescription, { target: { value: newPolicy.description } })
    );

    const membersTab = getByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = getByRole('radio', { name: /All Users/i });
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionsTab = getByText(translatedStrings.permissionsTabTitle);
    expect(permissionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionsTab));

    const addNewPermissionBtn = getByText(translatedStrings.addNewPermissionBtn);
    expect(addNewPermissionBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addNewPermissionBtn));

    const consumerDropdown = getByText(translatedStrings.consumerPlaceholder);
    expect(consumerDropdown).toBeInTheDocument();
    await waitFor(() => fireEvent.click(consumerDropdown));

    const authzConsumerOption = getByTitle('Policy Administration');
    await waitFor(() => fireEvent.click(authzConsumerOption));

    const searchActionsInput = getByPlaceholderText('Enter Text');
    expect(searchActionsInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchActionsInput));

    const authzUpdateAction = getByTitle('authz.policy.update');
    expect(authzUpdateAction).toBeInTheDocument();
    await waitFor(() => fireEvent.click(authzUpdateAction));

    const allTextBoxes = getAllByRole('textbox');
    const nameTextBox = allTextBoxes[0];
    const descriptionTextBox = allTextBoxes[1];
    const resourcesTextBox = allTextBoxes[2];

    expect(nameTextBox).toBeInTheDocument();
    expect(descriptionTextBox).toBeInTheDocument();
    expect(resourcesTextBox).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.change(descriptionTextBox, { target: { value: newInlinePermission.description } })
    );
    await waitFor(() =>
      fireEvent.change(resourcesTextBox, { target: { value: newInlinePermission.resources } })
    );
    await waitFor(() =>
      fireEvent.change(nameTextBox, { target: { value: newInlinePermission.name } })
    );

    const permissionModalAdd = queryByText(translatedStrings.addBtn);
    expect(permissionModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionModalAdd));

    const rolesTab = getByText(translatedStrings.rolesTabTitle);
    expect(rolesTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(rolesTab));

    const addRoleButton = getByText(translatedStrings.addRole);
    expect(addRoleButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addRoleButton));

    const searchRoleInput = getByPlaceholderText('Enter Text');
    expect(searchRoleInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchRoleInput));

    const existingRoleOption = getByTitle(policyReducer.add.rolesList.data[0].name);
    expect(existingRoleOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingRoleOption));

    const roleModalAdd = getByText(translatedStrings.addBtn);
    expect(roleModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(roleModalAdd));

    const saveAndEnableButton = getByRole('button', { name: /save and enable/i });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).toBeInTheDocument();

    expect(props.createPolicy).not.toHaveBeenCalled();
  });

  it('Draft policy should be created on save draft button', async () => {
    const {
      getByTitle,
      getByTestId,
      getByText,
      getByPlaceholderText,
      queryByText,
      getByRole,
    } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const inputName = getByTestId(usedSelectors.nameTestId);
    expect(inputName).toBeInTheDocument();
    await waitFor(() => fireEvent.change(inputName, { target: { value: newPolicy.name } }));

    const inputDescription = getByTestId(usedSelectors.descriptionTestId);
    expect(inputDescription).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(inputDescription, { target: { value: newPolicy.description } })
    );

    const membersTab = getByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = getByRole('radio', { name: /All Users/i });
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionsTab = getByText(translatedStrings.permissionsTabTitle);
    expect(permissionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionsTab));

    const addExistingPermissionButton = getByText(translatedStrings.addExistingPermissionBtn);
    expect(addExistingPermissionButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const searchInputPermissions = getByPlaceholderText('Enter Text');
    expect(searchInputPermissions).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchInputPermissions));

    const existingPermissionOption = getByTitle(policyReducer.add.permissionList.data[0].name);
    expect(existingPermissionOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingPermissionOption));

    const permissionModalAdd = queryByText(translatedStrings.addBtn);
    expect(permissionModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionModalAdd));

    await waitFor(() => fireEvent.click(getByText(translatedStrings.membersTabTitle)));

    const rolesTab = getByText(translatedStrings.rolesTabTitle);
    expect(rolesTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(rolesTab));

    const addRoleButton = getByText(translatedStrings.addRole);
    expect(addRoleButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addRoleButton));

    const searchRoleInput = getByPlaceholderText('Enter Text');
    expect(searchRoleInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchRoleInput));

    const existingRoleOption = getByTitle(policyReducer.add.rolesList.data[0].name);
    expect(existingRoleOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingRoleOption));

    const roleModalAdd = getByText(translatedStrings.addBtn);
    expect(roleModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(roleModalAdd));

    const saveAndEnableButton = getByRole('button', { name: /save draft/i });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));

    expect(props.createPolicy).toHaveBeenCalledTimes(1);
    expect(props.createPolicy).toHaveBeenCalledWith(expectedCratePolicyDraftBody, props.history);
  });

  it('Cancel button should be visible and working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const cancelBtn = queryByRole('button', { name: usedSelectors.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const yesDiscardBtn = queryByText(usedSelectors.cancelYesBtn);
    expect(yesDiscardBtn).toBeInTheDocument();
    fireEvent.click(yesDiscardBtn);
    expect(props.history.push).toBeCalledTimes(1);
    expect(props.history.push).toBeCalledWith(policyListingPath);
  });

  it('No Button on Cancel dialog should be working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const cancelBtn = queryByRole('button', { name: usedSelectors.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const noDiscardBtn = queryByText(usedSelectors.cancelNoBtn);
    expect(noDiscardBtn).toBeInTheDocument();
    fireEvent.click(noDiscardBtn);
    expect(props.history.push).not.toBeCalled();
  });

  it('Switch to json button should be visible and working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: usedSelectors.switchToJSONBtn });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', { name: usedSelectors.switchToJSONModalBtn });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(usedSelectors.jsonTextAreaLabel);
    expect(policyJsonTextArea).toBeInTheDocument();
  });

  it('Create policy with JSON', async () => {
    const { queryByRole, queryByTestId, getByRole, queryByAltText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: usedSelectors.switchToJSONBtn });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', { name: usedSelectors.switchToJSONModalBtn });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    const jsonEditor = queryByTestId(usedSelectors.jsonInputTestId);
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: JSON.stringify(expectedCreatePolicyBody) } });
    await new Promise((r) => setTimeout(r, 2000));
    const saveAndEnableButton = getByRole('button', { name: usedSelectors.saveJSONBtn });
    expect(saveAndEnableButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.createPolicy).toHaveBeenCalledTimes(1);
    expect(props.createPolicy).toHaveBeenCalledWith(expectedCreatePolicyBody, props.history);
  });

  it('Should not Create policy with invalid JSON', async () => {
    const { queryByRole, queryByText, queryByTestId, getByRole } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: usedSelectors.switchToJSONBtn });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', { name: usedSelectors.switchToJSONModalBtn });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(usedSelectors.jsonTextAreaLabel);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = queryByTestId(usedSelectors.jsonInputTestId);
    expect(jsonEditor).toBeInTheDocument();

    // invalid json
    fireEvent.change(jsonEditor, { target: { value: "'" } });

    const saveAndEnableButton = getByRole('button', { name: usedSelectors.saveJSONBtn });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    expect(props.createPolicy).not.toBeCalled();
  });

  it('Copy button, in json view should not be working when json editor is empty', async () => {
    const { queryByRole, queryByText, queryByTestId } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: usedSelectors.switchToJSONBtn });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', { name: usedSelectors.switchToJSONModalBtn });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(usedSelectors.jsonTextAreaLabel);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = queryByTestId(usedSelectors.jsonInputTestId);
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: JSON.stringify(expectedCreatePolicyBody) } });

    const copyButton = queryByRole('button', { name: 'Copy' });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      successNotificationType,
      usedSelectors.copyJsonMessage
    );
  });

  it('Copy button, in json view should be working - provide error notification', async () => {
    const { queryByRole, queryByText, queryByTestId } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: usedSelectors.switchToJSONBtn });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', { name: usedSelectors.switchToJSONModalBtn });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(usedSelectors.jsonTextAreaLabel);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = queryByTestId(usedSelectors.jsonInputTestId);
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: '' } });

    const copyButton = queryByRole('button', { name: 'Copy' });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      errorNotificationType,
      usedSelectors.copyJsonFailMessage
    );
  });

  it('Should open confirmation popup on policy access type - Deny', async () => {
    const { queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    let approvalsTab = queryByText(translatedStrings.approvalsTabTitle);
    expect(approvalsTab).toBeInTheDocument();

    const denyTextRadioBtn = queryByText(translatedStrings.deny);
    expect(denyTextRadioBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(denyTextRadioBtn));

    const confirmationPop = queryByText(translatedStrings.removeApprovalsTitle);
    expect(confirmationPop).toBeInTheDocument();

    const yesRemoveBtn = queryByText(translatedStrings.yesRemoveApprovals);
    expect(confirmationPop).toBeInTheDocument();
    fireEvent.click(yesRemoveBtn);

    approvalsTab = queryByText(translatedStrings.approvalsTabTitle);
    expect(approvalsTab).not.toBeInTheDocument();
  });

  it('Without member click on save should show policy will disable popup', async () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    let errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();

    const saveAndEnableButton = queryByRole('button', {
      name: translatedStrings.saveAndEnable,
    });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const confirmationPopUp = queryByText(translatedStrings.membersDialogTitle);
    expect(confirmationPopUp).toBeInTheDocument();

    const yesBtn = queryByRole('button', {
      name: translatedStrings.membersDialogPrimaryBtnText,
    });
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn);

    errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).toBeInTheDocument();
  });

  it('Should not save policy if member is empty and user click on no button on the policy will disable popup', async () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    let errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();

    const saveAndEnableButton = queryByRole('button', {
      name: translatedStrings.saveAndEnable,
    });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const confirmationPopUp = queryByText(translatedStrings.membersDialogTitle);
    expect(confirmationPopUp).toBeInTheDocument();

    // used classes because on screen more than 1 cancel button are present
    const noBtn = document.querySelector('.button-container .bds-btn-secondary');
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);

    errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
  });

  it('For invalid IP, error should display ', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    await waitFor(() => fireEvent.click(getByText(translatedStrings.genericConditionsTabTitle)));

    const yesIPAddressRadio = getByText(translatedStrings.yesLabel);
    expect(yesIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesIPAddressRadio));

    const IpAddressInput = getByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.' } }));
    fireEvent.blur(IpAddressInput);

    let invalidError = queryByText(translatedStrings.ipAddressInvalidMsg);
    expect(invalidError).toBeInTheDocument();

    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.2' } }));
    fireEvent.blur(IpAddressInput);
    expect(invalidError).not.toBeInTheDocument();

    const noIPAddressRadio = getByText(translatedStrings.noLabel);
    expect(noIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(noIPAddressRadio));
  });

  it('Date time should be working in generic tab', async () => {
    const { getByText, getByRole } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    await waitFor(() => fireEvent.click(getByText(translatedStrings.genericConditionsTabTitle)));

    const dateTimeRangeRadio = getByRole('radio', { name: isDateTimeData[1].label });

    expect(dateTimeRangeRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(dateTimeRangeRadio));

    const allDatePickerInputBoxes = document.querySelectorAll(
      'div.react-datepicker-wrapper > div > input[type=text]'
    );

    const startTimeInput = allDatePickerInputBoxes[0];
    const endTimeInput = allDatePickerInputBoxes[1];

    expect(startTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(startTimeInput));
    await waitFor(() => fireEvent.blur(startTimeInput));

    const _9pm = getByText('9:00 PM');
    expect(_9pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_9pm));
    await waitFor(() => fireEvent.blur(_9pm));

    expect(endTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(endTimeInput));
    await waitFor(() => fireEvent.blur(endTimeInput));

    const _930pm = getByText('9:30 PM');
    expect(_930pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_930pm));
    await waitFor(() => fireEvent.blur(_930pm));

    const notRequired = getByRole('radio', { name: isDateTimeData[0].label });
    expect(notRequired).toBeInTheDocument();
    await waitFor(() => fireEvent.click(notRequired));
  });

  it('All radio button in member tab should be working', async () => {
    const { getByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const membersTab = getByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = getByText(translate('POLICIES_MODULE.USERS_LABEL'));
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const allTagsLabel = getByText(translate('POLICIES_MODULE.GROUPS_LABEL'));
    expect(allTagsLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allTagsLabel));

    const allSILabel = getByText(translate('POLICIES_MODULE.SERVICE_IDENTITIES_LABEL'));
    expect(allSILabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allSILabel));

    const allTokenLabel = getByText(translate('POLICIES_MODULE.TOKEN_LABEL'));
    expect(allTokenLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allTokenLabel));
  });

  it('Selected inline permission should be open in side popup and delete should also be working', async () => {
    jest.setTimeout(10000);
    const { getByTitle, queryByRole, getByText, getByPlaceholderText, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const permissionsTab = getByText(translatedStrings.permissionsTabTitle);
    expect(permissionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionsTab));

    const addExistingPermissionButton = getByText(translatedStrings.addExistingPermissionBtn);
    expect(addExistingPermissionButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const searchInputPermissions = getByPlaceholderText('Enter Text');
    expect(searchInputPermissions).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchInputPermissions));

    let existingPermissionOption = getByTitle(policyReducer.add.permissionList.data[0].name);
    expect(existingPermissionOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingPermissionOption));

    const permissionModalAdd = queryByText(translatedStrings.addBtn);
    expect(permissionModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionModalAdd));

    const selectedPermission = queryByText(policyReducer.add.permissionList.data[0].name).closest(
      'tr'
    );
    const viewIcon = selectedPermission.querySelector(`.permission-action-view svg`);
    await waitFor(() => fireEvent.click(viewIcon));

    let permissionTitle = queryByText(
      `${translatedStrings.permissionTitle} : ${policyReducer.add.permissionList.data[0].name}`
    );
    expect(permissionTitle).toBeInTheDocument();

    // close modal popup
    const closeBtn = document.querySelector('.modal-container svg');
    await waitFor(() => fireEvent.click(closeBtn));

    permissionTitle = queryByText(
      `${translatedStrings.permissionTitle} : ${policyReducer.add.permissionList.data[0].name}`
    );
    expect(permissionTitle).not.toBeInTheDocument();

    const deleteIcon = selectedPermission.querySelector(`.permission-action-delete svg`);
    await waitFor(() => fireEvent.click(deleteIcon));

    const deleteConfirmPopup = queryByText(/Remove Permission?/i);
    expect(deleteConfirmPopup).toBeInTheDocument();

    const yesDeleteBtn = queryByRole('button', { name: /Yes, Remove/i });
    expect(yesDeleteBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesDeleteBtn));

    // permission should be removed from table
    existingPermissionOption = queryByText(policyReducer.add.permissionList.data[0].name);
    expect(existingPermissionOption).not.toBeInTheDocument();
  });
});

const usedSelectors = {
  nameTestId: 'input-test-id',
  descriptionTestId: 'textarea-test-id',
  jsonInputTestId: 'textarea-test-id',
  radioUsersSelectSelector: "[for='userselect']",
  radioUsersAllSelector: '[for=userall]',
  generalTabSelector: "[title='General']",
  membersTabSelector: "[title='Members']",
  permissionsTabSelector: "[title='Permissions']",
  rolesTabSelector: "[title='Roles']",
  addExistingPermissionText: translatedStrings.addExistingPermissionBtn,
  existingPermissionInput: 'input.bds-autocomplete-single-select-input',
  existingRoleInput: 'input.bds-autocomplete-single-select-input',
  existingPermissionOption: "[title='An existing Permission']",
  addEntityModalText: translatedStrings.addBtn,
  addRoleButtonText: translatedStrings.addRole,
  existingRoleOption: "[title='Some Role']",
  saveAndEnable: translatedStrings.saveAndEnable,
  cancelBtn: translatedStrings.cancelBtn,
  cancelYesBtn: translatedStrings.cancelModalPrimaryBtn,
  cancelNoBtn: translatedStrings.noBtn,
  switchToJSONModalBtn: translatedStrings.switchModeChangeDialogButton(false),
  switchToFormModalBtn: translatedStrings.switchModeChangeDialogButton(true),
  switchToJSONBtn: translatedStrings.switchMode(false),
  switchToFormBtn: translatedStrings.switchMode(true),
  jsonTextAreaLabel: translatedStrings.policyFormat,
  saveJSONBtn: translatedStrings.saveBtn,
  copyJsonMessage: translatedStrings.policySuccessCopy,
  copyJsonFailMessage: translatedStrings.policyFailedCopy,
};

const newPolicy = {
  name: 'Admin Policy 4',
  description: 'policy for Admin',
};

const newInlinePermission = {
  name: 'UTTestInlinePerm',
  description: 'Unit test inline permission modal',
  resources: '*',
};
