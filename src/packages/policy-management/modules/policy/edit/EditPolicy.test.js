/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import EditPolicy from './EditPolicy';
import testUtils from '../../../../../utils/test-utils';
import { translatedStrings as editConstants } from './constants';
import { translatedStrings as addConstants } from '../add/constants';
const translatedStrings = { ...editConstants, ...addConstants };
import { Route, Router } from 'react-router-dom';
import {
  errorNotificationType,
  policyListingPath,
  RESOURCE_STATUS,
  successNotificationType,
} from '../../../../../utils/common-constants';

const membersReducer = {
  users: {
    STATUS: 'SUCCESS',
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
    STATUS: 'SUCCESS',
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
    STATUS: 'SUCCESS',
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
    STATUS: 'SUCCESS',
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

const policyId = '02f48f55-75d2-4302-860d-91d6a7b22112';

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
  },
  edit: {
    notificationMedium: {
      STATUS: 'SUCCESS',
      error: null,
      data: [
        {
          id: '123',
          name: 'email',
          type: 'email',
        },
      ],
    },
    channelList: {
      STATUS: 'SUCCESS',
      error: null,
      data: {
        result: [],
      },
    },
    addPolicy: {
      STATUS: 'SUCCESS',
      error: null,
      data: {},
    },
    permissionList: {
      STATUS: 'SUCCESS',
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
      STATUS: 'SUCCESS',
      error: null,
      data: {
        result: [
          {
            name: 'authz',
            consumerURL: null,
            nameToIdURL: null,
            idToNameURL: null,
            responseType: null,
            description: 'Consumer for role and policy management',
          },
        ],
      },
    },
    permissionActionsList: {
      STATUS: 'SUCCESS',
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
      STATUS: 'SUCCESS',
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
      STATUS: 'SUCCESS',
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
      STATUS: 'SUCCESS',
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
    editPolicy: { error: null, status: RESOURCE_STATUS.INITIAL },
    loadPolicy: {
      data: {
        id: '02f48f55-75d2-4302-860d-91d6a7b22112',
        name: 'NJ TestSMAddEdit',
        description: '',
        isActive: false,
        isDraft: false,
        isReadOnly: false,
        permissions: [
          {
            id: 'df8ca364-1125-488b-a634-983e87eb5370',
            name: 'NJ TestAddEcit',
            description: '',
            consumer: 'secretmanager',
            actions: [
              'sm.secret.list',
              'sm.node.update',
              'sm.secret.create',
              'sm.secret.delete',
              'sm.node.delete',
              'sm.secret.update',
              'sm.node.list',
              'sm.node.create',
              'sm.node.read',
              'sm.secret.read',
            ],
            resources: [],
            isInline: true,
            isReadOnly: false,
          },
        ],
        members: {
          users: [
            {
              id: 'gdjz92zquajbqpec41d6',
              name: 'nitishag',
            },
            {
              id: 'lx4iuwhsflz2lir2kp5r',
              name: 'arpitas',
            },
          ],
        },
        accessType: 'Allow',
      },
      status: RESOURCE_STATUS.SUCCESS,
    },
    loadPolicyJSON: {
      data: {
        id: '02f48f55-75d2-4302-860d-91d6a7b22112',
        name: 'NJ TestSMAddEdit',
        description: '',
        isActive: false,
        isDraft: false,
        isReadOnly: false,
        permissions: [
          {
            id: 'df8ca364-1125-488b-a634-983e87eb5370',
            name: 'NJ TestAddEcit',
            description: '',
            consumer: 'secretmanager',
            actions: [
              'sm.secret.list',
              'sm.node.update',
              'sm.secret.create',
              'sm.secret.delete',
              'sm.node.delete',
              'sm.secret.update',
              'sm.node.list',
              'sm.node.create',
              'sm.node.read',
              'sm.secret.read',
            ],
            resources: [],
            isInline: true,
            isReadOnly: false,
          },
        ],
        members: {
          users: [
            {
              id: 'gdjz92zquajbqpec41d6',
              name: 'nitishag',
            },
            {
              id: 'lx4iuwhsflz2lir2kp5r',
              name: 'arpitas',
            },
          ],
        },
        accessType: 'Allow',
      },
      status: RESOURCE_STATUS.SUCCESS,
    },
  },
};

const props = {
  featureFlags: {
    secretManagerEnabled: true,
  },
  usersData: membersReducer.users.data.result,
  usersDataStatus: membersReducer.users.STATUS,
  groupsData: membersReducer.groups.data.result,
  groupsDataStatus: membersReducer.groups.STATUS,
  serviceIdentitiesData: membersReducer.serviceIdentities.data.result,
  serviceIdentitiesDataStatus: membersReducer.serviceIdentities.STATUS,
  tokensData: membersReducer.tokens.data.result,
  tokensDataStatus: membersReducer.tokens.STATUS,
  permissionsList: policyReducer.edit.permissionList.data,
  permissionDetails: policyReducer.edit.permissionDetails.data,
  consumersList: policyReducer.edit.consumerList.data.result,
  permissionActionsList: policyReducer.edit.permissionActionsList.data.result,
  permissionActionsListStatus: policyReducer.edit.permissionActionsList.STATUS,
  permissionDetailsStatus: policyReducer.edit.permissionDetails.STATUS,
  rolesListStatus: policyReducer.edit.rolesList.STATUS,
  rolesList: policyReducer.edit.rolesList.data,
  roleDetails: policyReducer.edit.roleDetails.data,
  roleDetailsStatus: policyReducer.edit.roleDetails.STATUS,
  addPolicyErrors: policyReducer.edit.addPolicy.error,
  addPolicyStatus: policyReducer.edit.addPolicy.STATUS,
  permissionsListStatus: policyReducer.edit.permissionList.STATUS,
  applicationsListData: [],
  applicationsListStatus: 'SUCCESS',
  loadedPolicy: policyReducer.edit.loadPolicy.data,
  loadedPolicyStatus: policyReducer.edit.loadPolicy.status,
  editPolicyErrors: policyReducer.edit.editPolicy.error,
  editPolicyStatus: policyReducer.edit.editPolicy.status,
  loadedPolicyJSON: policyReducer.edit.loadPolicyJSON.data,
  loadedPolicyJSONStatus: policyReducer.edit.loadPolicyJSON.status,
  notificationMediumDetailsStatus: RESOURCE_STATUS.INITIAL,
  channelListStatus: RESOURCE_STATUS.SUCCESS,
  consumersListStatus: RESOURCE_STATUS.SUCCESS,
  openNotification: jest.fn(),
  setPageHeader: jest.fn(),
  fetchUsers: jest.fn(),
  fetchGroups: jest.fn(),
  fetchServiceIdentities: jest.fn(),
  fetchTokens: jest.fn(),
  fetchPermissionsList: jest.fn(),
  fetchConsumersList: jest.fn(),
  fetchPermissionDetails: jest.fn(),
  fetchPermissionActions: jest.fn(),
  fetchRolesList: jest.fn(),
  fetchRoleDetails: jest.fn(),
  history: {
    back: jest.fn(),
    push: jest.fn(),
    location: { state: { isFormMode: true } },
  },
  resetActionsData: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  getApplicationsList: jest.fn(),
  updatePolicy: jest.fn(),
  loadPolicy: jest.fn(),
  loadPolicyJSON: jest.fn(),
  resetPolicy: jest.fn(),
  resetPolicyJSON: jest.fn(),
};

const expectedCreatePolicyBody = {
  accessType: 'Allow',
  condition: '{"ipAddress":"10.25.52.47","timeOfAccess":{"from":"15:30:00","to":"16:00:00"}}',
  description: 'policy for Admin',
  isActive: true,
  isDraft: false,
  isReadOnly: false,
  members: { serviceIdentities: [], tags: [], tokens: [], users: [{ id: '*' }] },
  name: 'Admin Policy 4',
  permissions: [{ id: '1' }],
  roles: [{ id: '1' }],
};

const store = testUtils.storeFake({
  policyReducer,
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: policyId,
  }),
}));

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

// mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: policyId,
  }),
}));

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

beforeEach(cleanup);
beforeEach(() => {
  jest.setTimeout(600000);
});

describe('Add Policy Test', () => {
  it('Should load the policy id and name', async () => {
    const { rerender } = testUtils.renderWithRouter(
      <Route path="/admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: `/admin/policy-management/policies/edit/${policyId}`,
      }
    );
    expect(props.loadPolicy).toBeCalledWith(policyId, props.history);

    rerender(
      <Router>
        <Route path="/admin/policy-management/policies/edit/:id">
          <WithRedux>
            <EditPolicy {...props} loadedPolicyStatus={RESOURCE_STATUS.SUCCESS} />
          </WithRedux>
        </Route>
      </Router>
    );

    expect(props.loadPolicyJSON).toBeCalledWith(props.loadedPolicy.name, props.history);
  });

  it('Policy should be updated if all data present', async () => {
    const {
      getByTitle,
      getByTestId,
      getByText,
      queryByAltText,
      getByPlaceholderText,
      queryByText,
      getByRole,
    } = testUtils.renderWithRouter(
      <Route path="/admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: `/admin/policy-management/policies/edit/${policyId}`,
      }
    );

    const inputName = getByTestId(usedSelectors.nameTestId);
    expect(inputName).toBeInTheDocument();
    await waitFor(() => fireEvent.change(inputName, { target: { value: newPolicy.name } }));

    const inputDescription = getByTestId(usedSelectors.descriptionTestId);
    expect(inputDescription).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(inputDescription, { target: { value: newPolicy.description } })
    );

    const membersTab = getByText(addConstants.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = document.querySelector(usedSelectors.radioUsersAllSelector);
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionsTab = getByText(addConstants.permissionsTabTitle);
    expect(permissionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionsTab));

    const addExistingPermissionButton = getByText(translatedStrings.addExistingPermissionBtn);
    expect(addExistingPermissionButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const searchInputPermissions = getByPlaceholderText('Enter Text');
    expect(searchInputPermissions).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchInputPermissions));

    const existingPermissionOption = getByTitle(policyReducer.edit.permissionList.data[0].name);
    expect(existingPermissionOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingPermissionOption));

    const permissionModalAdd = queryByText(translatedStrings.addBtn);
    expect(permissionModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionModalAdd));

    await waitFor(() => fireEvent.click(getByText(addConstants.membersTabTitle)));

    const rolesTab = getByText(addConstants.rolesTabTitle);
    expect(rolesTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(rolesTab));

    const addRoleButton = getByText(translatedStrings.addRole);
    expect(addRoleButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(addRoleButton));

    const searchRoleInput = getByPlaceholderText('Enter Text');
    expect(searchRoleInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(searchRoleInput));

    const existingRoleOption = getByTitle(policyReducer.edit.rolesList.data[0].name);
    expect(existingRoleOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(existingRoleOption));

    const roleModalAdd = getByText(translatedStrings.addBtn);
    expect(roleModalAdd).toBeInTheDocument();
    await waitFor(() => fireEvent.click(roleModalAdd));

    await waitFor(() => fireEvent.click(getByText(addConstants.genericConditionsTabTitle)));

    const yesIPAddressRadio = getByText(addConstants.yesLabel);
    expect(yesIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesIPAddressRadio));

    const IpAddressInput = getByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.47' } }));

    const dateTimeRangeRadio = getByRole('radio', { name: /Schedule Daily/i });

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

    const approvalsTab = queryByText(addConstants.approvalsTabTitle);
    expect(approvalsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(approvalsTab));

    const yesApprovalRequiredBtn = queryByText(addConstants.yesLabel);
    expect(yesApprovalRequiredBtn).toBeInTheDocument();
    fireEvent.click(yesApprovalRequiredBtn);

    const selectNotificationMedium = queryByText(addConstants.notificationPlaceHolder);
    expect(selectNotificationMedium).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMedium));

    const selectNotificationMediumOption = queryByText(
      store.getState().policyReducer.add.notificationMedium.data[1].name
    );
    expect(selectNotificationMediumOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMediumOption));

    const userListAutoCompleteContainer = queryByText(addConstants.userListPlaceholder).parentNode;
    const userListAutoComplete = userListAutoCompleteContainer.querySelector('svg');
    expect(userListAutoComplete).toBeInTheDocument();
    await waitFor(() => fireEvent.click(userListAutoComplete));

    const devUser = queryByText(membersReducer.users.data.result[1].name);
    expect(devUser).toBeInTheDocument();
    await waitFor(() => fireEvent.click(devUser));

    const maxTimeToApprove = queryByText(addConstants.approverTime).parentNode.querySelector(
      'input'
    );
    expect(maxTimeToApprove).toBeInTheDocument();
    fireEvent.change(maxTimeToApprove, { target: { value: '1:00' } });

    const maxValidityAfterApproval = queryByText(
      addConstants.accessValidityAfterApprovalLabel
    ).parentNode.querySelector('input');
    expect(maxValidityAfterApproval).toBeInTheDocument();
    fireEvent.change(maxValidityAfterApproval, { target: { value: '00:10' } });

    const saveAndEnableButton = getByRole('button', { name: /save/i });

    await waitFor(() => fireEvent.click(getByText(addConstants.rolesTabTitle)));
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.updatePolicy).toHaveBeenCalledTimes(1);
  });

  it('Policy should not be updated if data is missing present', async () => {
    const {
      queryByTestId,
      queryByRole,
      queryByAltText,
      getByText,
      getByRole,
    } = testUtils.renderWithRouter(
      <Route path="/admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: `/admin/policy-management/policies/edit/${policyId}`,
      }
    );

    const inputName = queryByTestId(usedSelectors.nameTestId);
    expect(inputName).toBeInTheDocument();
    await waitFor(() => fireEvent.change(inputName, { target: { value: '' } }));

    const saveButton = queryByRole('button', { name: /save/i });

    await waitFor(() => fireEvent.click(getByText(addConstants.rolesTabTitle)));
    expect(saveButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(saveButton));
    await new Promise((r) => setTimeout(r, 1000));

    const yesDisableBtn = getByRole('button', { name: /Disable policy and save changes/i });
    await waitFor(() => fireEvent.click(yesDisableBtn));
    await new Promise((r) => setTimeout(r, 1000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).toBeInTheDocument();
    expect(props.updatePolicy).toHaveBeenCalledTimes(0);
  });

  it('Cancel button should be visible and working', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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

  it('Switch to json button should be visible and working', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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
    const {
      queryByRole,
      queryByText,
      queryByTestId,
      getByRole,
      queryByAltText,
    } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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

    const saveJSONButton = getByRole('button', { name: usedSelectors.saveJSONBtn });
    expect(saveJSONButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveJSONButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.updatePolicy).toHaveBeenCalledTimes(1);
    // expect(props.updatePolicy).toHaveBeenCalledWith(expectedCreatePolicyBody, props.history);
  });

  it('Should not Create policy with invalid JSON', async () => {
    const { queryByRole, queryByText, queryByTestId, getByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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

    expect(props.updatePolicy).not.toBeCalled();
  });

  it('Copy button, in json view should be not be working when json editor is empty', async () => {
    const { queryByRole, queryByText, queryByTestId } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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
    const { queryByRole, queryByText, queryByTestId } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
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

  it('Header should be set', () => {
    testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
    );

    expect(props.setPageHeader).toBeCalled();
  });

  it('Reset button should be working', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
    );
    const resetButton = getByRole('button', { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(resetButton));
    await new Promise((r) => setTimeout(r, 2000));

    const yesResetConfirmBtn = getByRole('button', { name: 'Yes, Reset All fields' });
    expect(yesResetConfirmBtn).toBeInTheDocument();

    await waitFor(() => fireEvent.click(yesResetConfirmBtn));
    await new Promise((r) => setTimeout(r, 2000));

    expect(props.loadPolicy).toBeCalled();
    expect(props.fetchUsers).toBeCalled();
    expect(props.fetchGroups).toBeCalled();
    expect(props.fetchTokens).toBeCalled();
    expect(props.fetchServiceIdentities).toBeCalled();
  });

  it('Cancel button on Reset confirmation popup should be working', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/edit/:id">
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/edit/policyId',
      }
    );
    const resetButton = getByRole('button', { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(resetButton));
    await new Promise((r) => setTimeout(r, 2000));

    const noResetConfirmBtn = getByRole('button', { name: 'No, Keep Changes' });
    expect(noResetConfirmBtn).toBeInTheDocument();

    await waitFor(() => fireEvent.click(noResetConfirmBtn));
    await new Promise((r) => setTimeout(r, 2000));

    expect(noResetConfirmBtn).not.toBeInTheDocument();
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
