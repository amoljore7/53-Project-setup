/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import AddPolicy from './SMAddPolicy';
import testUtils from '../../../../../../../utils/test-utils';
import { translatedStrings } from './constants';
import {
  allSecretsPath,
  errorNotificationType,
  successNotificationType,
} from '../../../../../../../utils/common-constants';
import { RESOURCE_STATUS } from '../../../../../../../utils/common-constants';
import { translate } from '../../../../../externalization';
import { accessLevelOptions, isDateTimeData } from './add-policy-form/constants';

const policyReducer = {
  add: {
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
      STATUS: RESOURCE_STATUS.INITIAL,
      error: null,
      data: {},
    },
  },
};

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

const props = {
  usersData: membersReducer.users.data.result,
  usersDataStatus: membersReducer.users.STATUS,
  groupsData: membersReducer.groups.data.result,
  groupsDataStatus: membersReducer.groups.STATUS,
  serviceIdentitiesData: membersReducer.serviceIdentities,
  serviceIdentitiesDataStatus: membersReducer.serviceIdentities.STATUS,
  tokensData: membersReducer.tokens,
  tokensDataStatus: membersReducer.tokens.STATUS,
  addPolicyErrors: policyReducer.add.addPolicy.error,
  addPolicyStatus: policyReducer.add.addPolicy.STATUS,
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
  featureFlags: {
    secretManagerEnabled: true,
  },
  setPageHeader: jest.fn(),
  fetchUsers: jest.fn(),
  fetchGroups: jest.fn(),
  fetchServiceIdentities: jest.fn(),
  fetchTokens: jest.fn(),
  createPolicy: jest.fn(),
  openNotification: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  fetchSecretDetails: jest.fn(),
  history: {
    back: jest.fn(),
    push: jest.fn(),
    location: { state: { isFormMode: true } },
  },
};

const expectedCreatePolicyBody = {
  data: {
    name: 'Admin Policy 4',
    isActive: true,
    description: 'policy for Admin',
    isDraft: false,
    accessType: 'Allow',
    condition:
      '{"ipAddress":"10.25.52.47","timeOfAccess":{"from":"15:30:00","to":"16:00:00"},"approval":{"notificationMedium":"013aa169-4a6d-437a-93ac-5611fff5984f","timeToApprove":60,"validFor":10,"approvers":{"userIds":["heuyo6camuk74vh69urz"]}}}',
    isReadOnly: false,
    accessLevel: 'SM_Manage',
    consumer: 'secretmanager',
    resource: '/*',
    members: { users: [{ id: '*' }], tags: [], tokens: [], serviceIdentities: [] },
  },
};

const expectedCratePolicyDraftBody = {
  data: {
    name: 'Admin Policy 4',
    isActive: false,
    description: 'policy for Admin',
    isDraft: true,
    accessType: 'Allow',
    condition: '',
    isReadOnly: false,
    accessLevel: 'SM_View',
    consumer: 'secretmanager',
    resource: '/*',
    members: { users: [{ id: '*' }], tags: [], tokens: [], serviceIdentities: [] },
  },
};

const store = testUtils.storeFake({
  policyReducer,
  secretsReducer: {
    addPolicyReducer: {
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
          {
            id: '266dfcce-1c83-47be-af50-3b736378f88e',
            name: 'slack notification medium',
            description: 'Notification Medium instance',
            type: 'slack',
            connectionParameters: {
              slackAttribute: 'email',
              tenantAttribute: 'email',
              URL: 'https://gslab1711.slack.com/api/',
              token: 'xoxb-2721824988759-2736764502019-N3y4qoZvWR6ElvKynZSntHFw',
            },
            referenceCount: 0,
          },
        ],
      },
      channelList: {
        status: RESOURCE_STATUS.SUCCESS,
        data: [
          {
            channelId: 'C02MKF72621',
            channelName: 'general',
          },
          {
            channelId: 'C02MNF5167M',
            channelName: 'policy-admin',
          },
          {
            channelId: 'C02NC5AAY0Y',
            channelName: 'random',
          },
        ],
      },
    },
  },
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

jest.mock('../../../../../../../utils/common-utils', () => ({
  ...jest.requireActual('../../../../../../../utils/common-utils'), // use actual for all non-hook parts
  useQuery: () => {
    return {
      get: () => '/',
    };
  },
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => {
    return {
      state: { allAncestorItems: [] },
    };
  },
}));

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

beforeEach(cleanup);

describe('Secret Manager - Add Policy Test', () => {
  it('Policy should be created if all data present', async () => {
    jest.setTimeout(100000);
    const { getByTestId, getByText, queryByText, getByRole } = render(
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

    const allowTextRadioBtn = queryByText(translatedStrings.allow);
    expect(allowTextRadioBtn).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allowTextRadioBtn));

    const membersTab = queryByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = queryByText('All Users');
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const permissionTab = queryByText(translatedStrings.permissionsTabTitle);
    expect(permissionTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(permissionTab));

    const manageAccessLevel = queryByText(accessLevelOptions[2].label);
    expect(manageAccessLevel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(manageAccessLevel));

    const genericConditionsTab = queryByText(translatedStrings.genericConditionsTabTitle);
    expect(genericConditionsTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(genericConditionsTab));

    const yesIPAddressRadio = getByText(translatedStrings.yesLabel);
    expect(yesIPAddressRadio).toBeInTheDocument();
    await waitFor(() => fireEvent.click(yesIPAddressRadio));

    const IpAddressInput = getByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    await waitFor(() => fireEvent.change(IpAddressInput, { target: { value: '10.25.52.47' } }));
    fireEvent.blur(IpAddressInput);

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
      store.getState().secretsReducer.addPolicyReducer.notificationMedium.data[0].name
    );
    expect(selectNotificationMediumOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMediumOption));

    const userListAutoCompleteContainer = queryByText(
      translatedStrings.userListPlaceholder
    ).parentNode;
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
    await new Promise((r) => setTimeout(r, 500));

    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveAndEnable });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 1000));

    await waitFor(() => fireEvent.click(genericConditionsTab));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();

    expect(props.createPolicy).toBeCalledWith(expectedCreatePolicyBody, props.history, '/*');
  });

  it('Policy should not be created if data is missing present', async () => {
    const { getByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const membersTab = queryByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = queryByText('All Users');
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveAndEnable });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).toBeInTheDocument();

    expect(props.createPolicy).not.toHaveBeenCalled();
  });

  it('Draft policy should be created on save draft button', async () => {
    const { getByText, getByRole, queryByText } = render(
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

    const allUsersLabel = getByRole('radio', { name: /All Users/i });
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveDraft });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));

    expect(props.createPolicy).toHaveBeenCalledTimes(1);
    expect(props.createPolicy).toHaveBeenCalledWith(
      expectedCratePolicyDraftBody,
      props.history,
      '/*'
    );
  });

  it('Cancel button should be visible and working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const yesDiscardBtn = queryByText(translatedStrings.cancelModalPrimaryBtn);
    expect(yesDiscardBtn).toBeInTheDocument();
    fireEvent.click(yesDiscardBtn);
    expect(props.history.push).toBeCalledTimes(1);
    expect(props.history.push).toBeCalledWith({
      pathname: allSecretsPath,
      state: { previousPath: 'add' },
    });
  });

  it('No Button on Cancel dialog should be working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelBtn });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const noDiscardBtn = queryByText(translatedStrings.noBtn);
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

    const switchToJSONBtn = queryByRole('button', { name: translatedStrings.switchMode(false) });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();
  });

  it('Switch to form button should be visible and working', () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', {
      name: translatedStrings.switchMode(false),
    });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    let policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();

    // switching to form
    const switchToFormBtn = queryByRole('button', {
      name: translatedStrings.switchMode(true),
    });
    expect(switchToFormBtn).toBeInTheDocument();
    fireEvent.click(switchToFormBtn);

    const yesSwitchToFormBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(true),
    });
    expect(yesSwitchToFormBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchToFormBtn);

    policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).not.toBeInTheDocument();
  });

  it('Create policy with JSON', async () => {
    const { queryByRole, queryByText, getByRole } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: translatedStrings.switchMode(false) });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = document.querySelector('textarea');
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, {
      target: { value: JSON.stringify(expectedCreatePolicyBody.data) },
    });
    await new Promise((r) => setTimeout(r, 2000));
    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveBtn });
    expect(saveAndEnableButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    const errorBar = queryByText(translatedStrings.errorBarTitle);
    expect(errorBar).not.toBeInTheDocument();
    expect(props.createPolicy).toHaveBeenCalledTimes(1);
    expect(props.createPolicy).toHaveBeenCalledWith(expectedCreatePolicyBody, props.history, '/*');
  });

  it('Should not Create policy with invalid JSON', async () => {
    const { queryByRole, queryByText, getByRole } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: translatedStrings.switchMode(false) });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = document.querySelector('textarea');
    expect(jsonEditor).toBeInTheDocument();

    // invalid json
    fireEvent.change(jsonEditor, { target: { value: "'" } });

    const saveAndEnableButton = getByRole('button', { name: translatedStrings.saveBtn });
    expect(saveAndEnableButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(saveAndEnableButton));
    await new Promise((r) => setTimeout(r, 2000));

    expect(props.createPolicy).not.toBeCalled();
  });

  it('Copy button, in json view should be not be working when json editor is empty', async () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: translatedStrings.switchMode(false) });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = document.querySelector('textarea');
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, {
      target: { value: JSON.stringify(expectedCreatePolicyBody.data) },
    });

    const copyButton = queryByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      successNotificationType,
      translatedStrings.policySuccessCopy
    );
  });

  it('Copy button, in json view should be working - provide error notification', async () => {
    const { queryByRole, queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const switchToJSONBtn = queryByRole('button', { name: translatedStrings.switchMode(false) });
    expect(switchToJSONBtn).toBeInTheDocument();
    fireEvent.click(switchToJSONBtn);

    const yesSwitchBtn = queryByRole('button', {
      name: translatedStrings.switchModeChangeDialogButton(false),
    });
    expect(yesSwitchBtn).toBeInTheDocument();
    fireEvent.click(yesSwitchBtn);

    // view changed to JSON
    const policyJsonTextArea = queryByText(translatedStrings.policyFormat);
    expect(policyJsonTextArea).toBeInTheDocument();

    const jsonEditor = document.querySelector('textarea');
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: '' } });

    const copyButton = queryByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      errorNotificationType,
      translatedStrings.policyFailedCopy
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
    const { queryByText, queryByTestId } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

    const membersTab = queryByText(translatedStrings.membersTabTitle);
    expect(membersTab).toBeInTheDocument();
    await waitFor(() => fireEvent.click(membersTab));

    const allUsersLabel = queryByText(translate('POLICIES_MODULE.USERS_LABEL'));
    expect(allUsersLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allUsersLabel));

    const allTagsLabel = queryByText(translate('POLICIES_MODULE.GROUPS_LABEL'));
    expect(allTagsLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allTagsLabel));

    const allSILabel = queryByText(translate('POLICIES_MODULE.SERVICE_IDENTITIES_LABEL'));
    expect(allSILabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allSILabel));

    const allTokenLabel = queryByText(translate('POLICIES_MODULE.TOKEN_LABEL'));
    expect(allTokenLabel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(allTokenLabel));

    const selectUserOptions = queryByText('Select Users');
    expect(selectUserOptions).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectUserOptions));

    const userListAutoComplete = document.querySelector('svg');
    expect(userListAutoComplete).toBeInTheDocument();
    await waitFor(() => fireEvent.click(userListAutoComplete));

    // fireEvent.blur(userListAutoComplete);

    const devUserOption = queryByText(membersReducer.users.data.result[0].name);
    expect(devUserOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(devUserOption));

    let devUser = queryByText(membersReducer.users.data.result[0].name);
    expect(devUser).toBeInTheDocument();

    const devUserRemoveBtn = queryByTestId('pill-close-icon').querySelector('svg');
    expect(devUserRemoveBtn).toBeInTheDocument();
    fireEvent.click(devUserRemoveBtn);

    // user should be removed from user select field
    devUser = queryByText(membersReducer.users.data.result[0].name);
    expect(devUser).not.toBeInTheDocument();
  });

  it('If notification type is slack user should able to select tags', async () => {
    const { queryByText } = render(
      <WithRedux>
        <AddPolicy {...props} />
      </WithRedux>
    );

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
      store.getState().secretsReducer.addPolicyReducer.notificationMedium.data[1].name
    );
    expect(selectNotificationMediumOption).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectNotificationMediumOption));

    const channelListAutoCompleteContainer = queryByText(
      translatedStrings.channelListLabel
    ).parentNode;
    const channelListAutoComplete = channelListAutoCompleteContainer.querySelector('svg');
    expect(channelListAutoComplete).toBeInTheDocument();
    await waitFor(() => fireEvent.click(channelListAutoComplete));

    let policyAdminChannel = queryByText(/policy-admin/i);
    expect(policyAdminChannel).toBeInTheDocument();
    await waitFor(() => fireEvent.click(policyAdminChannel));

    const noApprovalRequiredBtn = queryByText(translatedStrings.noLabel);
    expect(noApprovalRequiredBtn).toBeInTheDocument();
    fireEvent.click(noApprovalRequiredBtn);

    policyAdminChannel = queryByText(/policy-admin/i);
    expect(policyAdminChannel).not.toBeInTheDocument();
    fireEvent.blur(channelListAutoComplete);
  });
});

const newPolicy = {
  name: 'Admin Policy 4',
  description: 'policy for Admin',
};
