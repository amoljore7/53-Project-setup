/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import EditPolicy from './EditPolicy';
import testUtils from '../../../../../../../utils/test-utils';
import { translatedStrings as editConstants } from './constants';
import { translatedStrings as formTranslatedStrings } from '../add/constants';
import { accessLevelOptions, isDateTimeData } from '../add/add-policy-form/constants';
import { translatedStrings as addConstants } from '../add/constants';
const translatedStrings = { ...editConstants, ...addConstants };
import { Route } from 'react-router-dom';
import {
  allSecretsPath,
  errorNotificationType,
  RESOURCE_STATUS,
  successNotificationType,
} from '../../../../../../../utils/common-constants';

const membersReducer = {
  users: {
    STATUS: 'SUCCESS',
    error: null,
    data: {
      result: [
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
        {
          status: 'active',
          adminRoles: [],
          type: 'User',
          created: '2021-07-23T06:17:31Z',
          modified: '2021-07-23T06:17:34Z',
          email: 'qa@britive.com',
          username: 'qa.user',
          firstName: 'qa',
          lastName: 'user',
          name: 'qa user',
          externalId: null,
          mobile: '9999999999',
          phone: '8888888888',
          identityProvider: {
            id: '1HljmKWjoFPXvOcbJSDx',
            name: 'Britive',
            type: 'DEFAULT',
          },
          mappedAccounts: [],
          external: false,
          userId: 'heuyo6camuk74vh69urz',
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
      STATUS: RESOURCE_STATUS.SUCCESS,
      error: null,
      data: {
        result: [],
      },
    },
    editPolicy: { error: null, status: RESOURCE_STATUS.INITIAL },
    loadPolicy: {
      data: {
        id: '02f48f55-75d2-4302-860d-91d6a7b22112',
        name: 'Admin Policy 4',
        description: '',
        isActive: false,
        isDraft: false,
        isReadOnly: false,
        accessLevel: 'SM_View',
        accessType: 'Allow',
        consumer: 'secretmanager',
        resources: [],
        resource: '/*',
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
            resource: '/*',
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
      },
      status: RESOURCE_STATUS.SUCCESS,
    },
    loadPolicyJSON: {
      data: {
        id: '02f48f55-75d2-4302-860d-91d6a7b22112',
        name: 'Admin Policy 4',
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
  policyViewJSONData: {
    id: '02f48f55-75d2-4302-860d-91d6a7b22112',
    name: 'Admin Policy 4',
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
  usersData: membersReducer.users.data.result,
  usersDataStatus: membersReducer.users.STATUS,
  groupsData: membersReducer.groups.data.result,
  groupsDataStatus: membersReducer.groups.STATUS,
  serviceIdentitiesData: membersReducer.serviceIdentities,
  serviceIdentitiesDataStatus: membersReducer.serviceIdentities.STATUS,
  tokensData: membersReducer.tokens,
  tokensDataStatus: membersReducer.tokens.STATUS,
  editPolicyErrors: policyReducer.edit.editPolicy.error,
  editPolicyStatus: policyReducer.edit.editPolicy.status,
  loadedPolicy: policyReducer.edit.loadPolicy.data,
  loadedPolicyStatus: policyReducer.edit.loadPolicy.status,
  notificationMediumDetailsStatus: RESOURCE_STATUS.INITIAL,
  notificationMediumDetails: {},
  channelList: policyReducer.edit.channelList.data,
  channelListStatus: policyReducer.edit.channelList.STATUS,
  nodeSecretMetadataState: {
    loading: false,
    error: null,
    result: {
      'authz.policy.update': 'Allow',
      'authz.policy.read': 'Allow',
      'authz.policy.delete': 'Allow',
      'authz.policy.create': 'Allow',
    },
  },
  nodeSecretMetadataLoading: false,
  featureFlags: {
    secretManagerEnabled: true,
  },
  resetActionsData: jest.fn(),
  setPageHeader: jest.fn(),
  fetchUsers: jest.fn(),
  fetchGroups: jest.fn(),
  fetchServiceIdentities: jest.fn(),
  fetchTokens: jest.fn(),
  fetchConsumersList: jest.fn(),
  fetchPermissionActions: jest.fn(),
  updatePolicy: jest.fn(),
  loadPolicy: jest.fn(),
  openNotification: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  getPolicyByName: jest.fn(),
  getPolicyByNameReset: jest.fn(),
  history: {
    back: jest.fn(),
    push: jest.fn(),
    location: { state: { isFormMode: true } },
  },
};

const expectedCreatePolicyBody = {
  accessLevel: 'SM_Manage',
  condition:
    '{"ipAddress":"10.25.52.47","timeOfAccess":{"from":"15:30:00","to":"16:00:00"},"approval":{"notificationMedium":"013aa169-4a6d-437a-93ac-5611fff5984f","timeToApprove":60,"validFor":10,"approvers":{"userIds":["heuyo6camuk74vh69urz"]}}}',
  consumer: 'secretmanager',
  description: 'policy for Admin',
  id: '02f48f55-75d2-4302-860d-91d6a7b22112',
  isActive: false,
  isDraft: false,
  members: { serviceIdentities: [], tags: [], tokens: [], users: [{ id: '*' }] },
  name: 'Admin Policy 4',
  resource: '/*',
};

const store = testUtils.storeFake({
  policyReducer,
  secretsReducer: {
    nodeSecretMetadata: {
      loading: false,
      error: null,
      result: {
        'authz.policy.update': 'Allow',
        'authz.policy.read': 'Allow',
        'authz.policy.delete': 'Allow',
        'authz.policy.create': 'Allow',
      },
    },
    addPolicyReducer: {
      addPolicy: { error: '', status: '' },
      notificationMedium: {
        status: RESOURCE_STATUS.SUCCESS,
        data: [
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
      channelList: { status: RESOURCE_STATUS.SUCCESS, data: [] },
    },
  },
  membersReducer: {
    users: membersReducer.users,
    groups: membersReducer.groups,
    serviceIdentities: membersReducer.serviceIdentities,
    tokens: membersReducer.tokens,
  },
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: policyId,
  }),
}));

jest.mock('../../../../../../../utils/common-utils', () => ({
  ...jest.requireActual('../../../../../../../utils/common-utils'), // use actual for all non-hook parts
  useQuery: () => {
    return {
      get: (key) => {
        if (key === 'path') return '/';
        else return policyId;
      },
    };
  },
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

const pagePath = '/admin/secret-manager/vault/secrets/all-secrets/policy/edit';
const path = '/admin/secret-manager/vault/secrets/all-secrets/policy/edit';

describe('Secret Manager - Edit policy', () => {
  it('Should load the policy', async () => {
    const { queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    expect(props.loadPolicy).toBeCalledWith(policyId, props.history, '/');
    const policyName = queryByText(/Policy Name/i).parentNode;
    const policyNameInput = policyName.querySelector('input');
    expect(policyNameInput.value).toBe(policyReducer.edit.loadPolicy.data.name);
  });

  it('Policy should be updated if all data present', async () => {
    jest.setTimeout(10000);
    const { queryByText, getByTestId, getByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} notificationMediumDetailsStatus={RESOURCE_STATUS.ERROR} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const permissionNameInput = queryByText(
      formTranslatedStrings.policyNameLabel
    ).parentElement.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(permissionNameInput, { target: { value: newPolicy.name } })
    );

    const permissionDescriptionInput = queryByText(
      formTranslatedStrings.description
    ).parentElement.querySelector('textarea');
    expect(permissionDescriptionInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(permissionDescriptionInput, { target: { value: newPolicy.description } })
    );

    const allowTextRadioBtn = queryByText(formTranslatedStrings.allow);
    expect(allowTextRadioBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allowTextRadioBtn));

    const membersTab = queryByText(formTranslatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = queryByText('All Users');
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionTab = queryByText(formTranslatedStrings.permissionsTabTitle);
    expect(permissionTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionTab));

    const manageAccessLevel = queryByText(accessLevelOptions[2].label);
    expect(manageAccessLevel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(manageAccessLevel));

    const genericConditionsTab = queryByText(formTranslatedStrings.genericConditionsTabTitle);
    expect(genericConditionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(genericConditionsTab));

    const yesIPAddressRadio = queryByText(formTranslatedStrings.yesLabel);
    expect(yesIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesIPAddressRadio));

    const IpAddressInput = getByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.47' } }));

    const dateTimeRangeRadio = getByRole('radio', { name: isDateTimeData[2].label });
    expect(dateTimeRangeRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(dateTimeRangeRadio));

    const allTimePickerInputBoxes = document.querySelectorAll(
      'div.react-datepicker-wrapper > div > input[type=text]'
    );
    const startTimeInput = allTimePickerInputBoxes[0];
    const endTimeInput = allTimePickerInputBoxes[1];

    expect(startTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(startTimeInput));

    const _9pm = queryByText('9:00 PM');
    expect(_9pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_9pm));

    expect(endTimeInput).toBeInTheDocument();
    await waitFor(() => fireEvent.click(endTimeInput));

    const _930pm = queryByText('9:30 PM');
    expect(_930pm).toBeInTheDocument();
    await waitFor(() => fireEvent.click(_930pm));

    const approvalsTab = queryByText(formTranslatedStrings.approvalsTabTitle);
    expect(approvalsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(approvalsTab));

    const yesApprovalRequiredBtn = queryByText(formTranslatedStrings.yesLabel);
    expect(yesApprovalRequiredBtn).toBeInTheDocument();
    fireEvent.click(yesApprovalRequiredBtn);

    const selectNotificationMedium = queryByText(formTranslatedStrings.notificationPlaceHolder);
    expect(selectNotificationMedium).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMedium));

    const selectNotificationMediumOption = queryByText(
      store.getState().secretsReducer.addPolicyReducer.notificationMedium.data[0].name
    );
    expect(selectNotificationMediumOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMediumOption));

    const userListAutoCompleteContainer = queryByText(
      formTranslatedStrings.userListPlaceholder
    ).parentNode;
    const userListAutoComplete = userListAutoCompleteContainer.querySelector('svg');
    expect(userListAutoComplete).toBeInTheDocument();
    await waitFor(() => fireEvent.click(userListAutoComplete));

    const devUser = queryByText(membersReducer.users.data.result[1].name);
    expect(devUser).toBeInTheDocument();
    await waitFor(() => fireEvent.click(devUser));

    const maxTimeToApprove = queryByText(
      formTranslatedStrings.approverTime
    ).parentNode.querySelector('input');
    expect(maxTimeToApprove).toBeInTheDocument();
    fireEvent.change(maxTimeToApprove, { target: { value: '1:00' } });

    const maxValidityAfterApproval = queryByText(
      formTranslatedStrings.accessValidityAfterApprovalLabel
    ).parentNode.querySelector('input');
    expect(maxValidityAfterApproval).toBeInTheDocument();
    fireEvent.change(maxValidityAfterApproval, { target: { value: '00:10' } });
    await new Promise((r) => setTimeout(r, 500));

    const saveButton = getByRole('button', { name: translatedStrings.saveBtn });
    expect(saveButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveButton));
    await new Promise((r) => setTimeout(r, 500));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.updatePolicy).toBeCalledWith(
      expectedCreatePolicyBody,
      props.history,
      '/*',
      'secretmanager',
      expectedCreatePolicyBody.id
    );
  });

  it('Policy should not be updated if data is missing present', async () => {
    const { queryByRole, queryByAltText, getByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const permissionNameInput = queryByText(
      formTranslatedStrings.policyNameLabel
    ).parentElement.querySelector('input');
    expect(permissionNameInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(permissionNameInput, { target: { value: '' } }));

    const saveButton = queryByRole('button', { name: translatedStrings.saveBtn });
    expect(saveButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(saveButton));
    await new Promise((r) => setTimeout(r, 1000));

    const yesDisableBtn = getByRole('button', {
      name: translatedStrings.membersDialogPrimaryBtnText,
    });
    await waitFor(() => fireEvent.click(yesDisableBtn));
    await new Promise((r) => setTimeout(r, 1000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).toBeInTheDocument();
    expect(props.updatePolicy).toHaveBeenCalledTimes(0);
  });

  it('Cancel button should be visible and working', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const yesDiscardBtn = queryByRole('button', { name: translatedStrings.cancelModalPrimaryBtn });
    expect(yesDiscardBtn).toBeInTheDocument();
    fireEvent.click(yesDiscardBtn);
    expect(props.history.push).toBeCalledTimes(1);
    expect(props.history.push).toBeCalledWith({
      pathname: allSecretsPath,
      state: { previousPath: 'add' },
    });
  });

  it('No Button on Cancel dialog should be working', () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const noDiscardBtn = queryByRole('button', { name: translatedStrings.noBtn });
    expect(noDiscardBtn).toBeInTheDocument();
    fireEvent.click(noDiscardBtn);
    expect(props.history.push).not.toBeCalled();
  });

  it('Switch to json button should be visible and working', () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
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
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
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
    const { queryByRole, queryByText, queryByTestId, getByRole, queryByAltText } =
      testUtils.renderWithRouter(
        <Route path={pagePath}>
          <WithRedux>
            <EditPolicy {...props} />
          </WithRedux>
        </Route>,
        {
          route: path,
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
    fireEvent.blur(jsonEditor);

    const saveJSONButton = getByRole('button', { name: usedSelectors.saveJSONBtn });
    expect(saveJSONButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveJSONButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByAltText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.updatePolicy).toBeCalledWith(
      expectedCreatePolicyBody,
      props.history,
      '/*',
      'secretmanager',
      expectedCreatePolicyBody.name
    );
  });

  it('Should not Create policy with invalid JSON', async () => {
    const { queryByRole, queryByText, queryByTestId, getByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
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
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
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

    const copyButton = queryByRole('button', { name: /copy/i });
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
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
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

    const copyButton = queryByRole('button', { name: /copy/i });
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
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    expect(props.setPageHeader).toBeCalled();
  });

  it('Reset button should be working', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const resetButton = queryByRole('button', { name: translatedStrings.resetBtn });
    expect(resetButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(resetButton));
    await new Promise((r) => setTimeout(r, 2000));

    const yesResetConfirmBtn = queryByRole('button', {
      name: translatedStrings.resetEditPrimaryBtn,
    });
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
      <Route path={pagePath}>
        <WithRedux>
          <EditPolicy {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const resetButton = getByRole('button', { name: translatedStrings.resetBtn });
    expect(resetButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(resetButton));
    await new Promise((r) => setTimeout(r, 2000));

    const noResetConfirmBtn = getByRole('button', {
      name: translatedStrings.resetEditSecondaryBtn,
    });
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
