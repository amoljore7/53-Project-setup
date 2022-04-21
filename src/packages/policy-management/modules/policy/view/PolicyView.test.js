/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PolicyView from './PolicyView';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import {
  conditionsLabels,
  memberLabels,
  policyConstantLabels,
  translatedStrings,
} from './constants';
import { translate } from '../../../externalization';
import { ALLOW, RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { policyActions } from '../../../../../components/batch-eval/constants';

const policyViewReducer = {
  policyView: {
    status: RESOURCE_STATUS.INITIAL,
    error: {
      message: 'errorViewTest',
    },
    data: {
      id: '398d38bd-ce6a-42fb-b52f-d10e7f4b4eeb',
      name: 'Test policy',
      description: 'policy description',
      consumer: 'secretmanager',
      isActive: true,
      isDraft: false,
      isReadOnly: false,
      resource: '/*',
      condition:
        '{"ipAddress":"10.10.10.10","timeOfAccess":{"from":"15:30:00","to":"16:00:00"},"approval": {"approvers":{"userIds":["heuyo6camuk74vh69urz"]},"validFor":15,"timeToApprove":60,"notificationMedium":"fcb415f7-8e38-496a-80d9-1b787db76989"}}',
      members: {
        users: [
          {
            id: 'heuyo6ca3lb74vh69urz',
            name: 'dev.user',
          },
        ],
        tokens: [
          {
            id: '8xlo70nfy5dv4kp7i47f',
            name: 'WesleyGayautotestDbksXgrdik',
          },
        ],
        serviceIdentities: [{ id: 'icjmwxnwayaow89nvgmb', name: 'Test_Admin_Token' }],
        tags: [{ id: '00mbsdfbajiyz9mpygez', name: 'BrendaTuckerOhaivautotestHhmqemrp' }],
      },
      permissions: [
        {
          id: '9cda0761-969c-49ff-b468-a133bde2e078',
          name: 'NewQAFolder Admin policy_PM_4',
          description: 'Security admin read and list',
          consumer: 'securityadmin',
          actions: ['securityadmin.security.view', 'securityadmin.security.list'],
          resources: ['*'],
          isInline: true,
          isReadOnly: false,
        },
        {
          id: 'd70ff230-7075-4403-b652-1adfe63219ca',
          name: 'NewQAFolder Admin policy_PM_0',
          description: 'Vault and SST read',
          consumer: 'secretmanager',
          actions: ['sm.node.list'],
          resources: ['/NewQAFolder/*'],
          isInline: true,
          isReadOnly: false,
        },
      ],
      roles: [
        {
          id: '61b7e572-e1cd-4da3-8d7a-d5a1ba89994a',
          name: 'TenantAdminRole',
          description:
            'Default role which grants tenant administrators the list & view access to all actions, the list, view, create, update & delete access to all roles, permissions & policies and the list access to all consumers.',
          permissions: [
            {
              id: '04042230-8b7c-471d-ae25-06a1701852f1',
              name: 'ReportsViewPermission',
              description: 'Permission to view Reports and Dashboards of the system',
              consumer: 'reports',
              actions: ['reports.report.list', 'reports.report.view'],
              resources: ['*'],
              isInline: false,
              isReadOnly: true,
            },
          ],
          isReadOnly: true,
        },
      ],
      accessType: 'Allow',
    },
  },
  users: {
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
    status: RESOURCE_STATUS.SUCCESS,
  },
  groups: {
    data: {
      result: [
        {
          userTagId: '00mbsdfbajiyz9mpygez',
          name: 'BrendaTuckerOhaivautotestHhmqemrp',
          description: 'tag description',
          status: 'Active',
          userCount: 0,
          created: '2022-01-04T05:07:07Z',
          modified: null,
          external: false,
          userTagIdentityProviders: [
            {
              identityProvider: {
                id: '1HhvrKWjoFPXvOcbJSDx',
                name: 'Britive',
                type: 'DEFAULT',
              },
              externalId: null,
            },
          ],
        },
        {
          userTagId: '02jz80020o4pwbma0jl7',
          name: 'AngelOliverJhelkautotestPnhbkuwa',
          description: 'tag description',
          status: 'Active',
          userCount: 0,
          created: '2022-01-04T05:17:06Z',
          modified: null,
          external: false,
          userTagIdentityProviders: [
            {
              identityProvider: {
                id: '1HhvrKWjoFPXvOcbJSDx',
                name: 'Britive',
                type: 'DEFAULT',
              },
              externalId: null,
            },
          ],
        },
      ],
    },
    status: RESOURCE_STATUS.SUCCESS,
  },
  serviceIdentities: {
    data: {
      result: [
        {
          status: 'active',
          adminRoles: [],
          type: 'ServiceIdentity',
          created: '2021-09-02T08:34:05Z',
          modified: null,
          name: 'Test_User_Token',
          description: 'Britive User SI for testing',
          lastLogin: null,
          userId: 'icjmwxnwayaow89nvgmb',
        },
        {
          status: 'active',
          adminRoles: [],
          type: 'ServiceIdentity',
          created: '2021-09-02T08:36:22Z',
          modified: null,
          name: 'Test_Admin_Token',
          description: 'Britive Admin SI for testing',
          lastLogin: '2022-02-02T06:33:02Z',
          userId: 'r4dnbgjjf0n7fu83vzxy',
        },
      ],
    },
    status: RESOURCE_STATUS.SUCCESS,
  },
  permissionApplicationsList: {
    data: [
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
        profilesCount: 0,
        usersCount: 0,
        iconUrl: '/images/app_logos/okta.png',
      },
      {
        applicationName: 'Okta1',
        type: 'Okta',
        appContainerId: '6d2jf8c6u8pfzf86qpx2',
        description: ' ',
        status: 'active',
        environmentsCount: 1,
        profilesCount: 0,
        usersCount: 0,
        iconUrl: '/images/app_logos/okta.png',
      },
    ],
  },
  consumerReducer: {
    status: RESOURCE_STATUS.SUCCESS,
    data: [
      {
        name: 'reports',
        consumerURL: null,
        nameToIdURL: null,
        idToNameURL: null,
        responseType: null,
        description: 'Dashboards & Reports',
      },
      {
        name: 'secretmanager',
        consumerURL:
          'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/resourceContainers?path=${resource}',
        nameToIdURL:
          'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets?path=${name}',
        idToNameURL:
          'http://pod6-smdev-secmgr-svc.local:8080/api/v1/secretmanager/vault/secrets/${id}',
        responseType: 'entity-based',
        description: 'Secret Manager',
      },
    ],
  },
  policyToggleReducer: {
    loading: false,
  },
  tokens: {
    data: {
      result: [
        {
          id: '8xlo70nfy5dv4kp7i47f',
          name: 'WesleyGayautotestDbksXgrdik',
          expiresOn: '2022-03-02T15:24:11Z',
          createdOn: '2022-01-31T15:24:07Z',
          type: 'DEFAULT',
          tokenExpirationDays: 30,
          status: 'Active',
          lastAccessed: '2022-01-31T15:24:11Z',
          assignedTo: null,
          token: null,
          createdBy: 'RobinPerryautotestDbksOwry',
        },
        {
          id: 'fyuisdc3ionuvdvwfxd7',
          name: 'venkattoken1',
          expiresOn: '2022-02-03T14:54:05Z',
          createdOn: '2022-01-04T11:32:20Z',
          type: 'DEFAULT',
          tokenExpirationDays: 30,
          status: 'Active',
          lastAccessed: '2022-01-04T14:54:05Z',
          assignedTo: null,
          token: null,
          createdBy: 'venkat',
        },
      ],
    },
    status: RESOURCE_STATUS.SUCCESS,
  },
};

const policiesEvalData = {
  [policyActions.create]: ALLOW,
  [policyActions.update]: ALLOW,
  [policyActions.delete]: ALLOW,
  [policyActions.read]: ALLOW,
  [policyActions.list]: ALLOW,
};

const props = {
  policyViewData: policyViewReducer.policyView.data,
  policyViewViewStatus: policyViewReducer.policyView.status,
  featureFlags: {
    secretManagerEnabled: true,
  },
  policyEvalData: policiesEvalData,
  policyViewJSONData: {},
  policyViewLoading: policyViewReducer.policyView.loading,
  fetchedUsersStatus: policyViewReducer.users.status,
  fetchedUsers: policyViewReducer.users.data,
  fetchedGroups: policyViewReducer.groups.data,
  fetchedGroupsStatus: policyViewReducer.groups.status,
  fetchedServiceIdentities: policyViewReducer.serviceIdentities.data,
  fetchedServiceIdentitiesStatus: policyViewReducer.serviceIdentities.status,
  fetchedTokens: policyViewReducer.tokens.data,
  fetchedTokensStatus: policyViewReducer.tokens.status,
  applicationsListData: policyViewReducer.permissionApplicationsList.data,
  consumerList: policyViewReducer.consumerReducer.data,
  consumerListStatus: policyViewReducer.consumerReducer.status,
  setPageHeader: jest.fn(),
  getPolicyById: jest.fn(),
  resetPolicyView: jest.fn(),
  deletePolicyById: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  togglePolicyRequest: jest.fn(),
  getApplicationsList: jest.fn(),
  getPolicyByName: jest.fn(),
  getPolicyByIdReset: jest.fn(),
  getPolicyByNameReset: jest.fn(),
  openNotification: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
};

const store = testUtils.storeFake({
  policyViewReducer,
  policyReducer: {
    view: {
      notificationMedium: { data: { name: 'test notification' }, status: RESOURCE_STATUS.INITIAL },
    },
    add: { channelList: { data: [], status: RESOURCE_STATUS.INITIAL } },
  },
});

const WithRedux = ({ children }) => <Provider store={store}>{children}</Provider>;

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

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

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const pagePath = 'admin/policy-management/policies/view/:id';
const path = 'admin/policy-management/policies/view/1';

describe('Policy Admin - View Policy', () => {
  it('Display edit button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const editBtn = queryByRole('button', { name: translatedStrings.editText });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(props.history.push('/admin/policy-management/policies/edit/:id'));
  });

  it('Display clone button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const cloneBtn = queryByRole('button', { name: translatedStrings.cloneText });
    expect(cloneBtn).toBeInTheDocument();
    fireEvent.click(cloneBtn);
    expect(props.history.push('/admin/policy-management/policies/clone/:id'));
  });

  it('Display close button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const closeBtn = queryByRole('button', { name: translatedStrings.closeLabel });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(props.history.push('/admin/policy-management/policies'));
  });

  it('Display disable button on screen', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings.disableText });
    expect(disableBtn).toBeInTheDocument();
  });

  it('Display disable popup on screen', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings.disableText });
    expect(disableBtn).toBeInTheDocument();
    fireEvent.click(disableBtn);
    let disablePopup = getByText(translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_DISABLE'));
    expect(disablePopup).toBeInTheDocument();
  });

  it('Yes disable button should be working', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings.disableText });
    expect(disableBtn).toBeInTheDocument();
    fireEvent.click(disableBtn);
    let disablePrimaryBtn = getByText(translate('YES_DISABLE'));
    expect(disablePrimaryBtn).toBeInTheDocument();
    fireEvent.click(disablePrimaryBtn);
    expect(props.togglePolicyRequest).toBeCalledTimes(1);
  });

  it('No disable popup button should be working', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings.disableText });
    expect(disableBtn).toBeInTheDocument();
    fireEvent.click(disableBtn);
    let disableNoBtn = getByText(translatedStrings.noText);
    expect(disableNoBtn).toBeInTheDocument();
    fireEvent.click(disableNoBtn);
    expect(disableNoBtn).not.toBeInTheDocument();
  });

  it('Display enable button on screen', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings.enableText });
    expect(enableBtn).toBeInTheDocument();
  });

  it('Display enable popup on screen', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings.enableText });
    expect(enableBtn).toBeInTheDocument();
    fireEvent.click(enableBtn);
    let enablePopup = getByText(translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_ENABLE'));
    expect(enablePopup).toBeInTheDocument();
  });

  it('Yes enable button should be working', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings.enableText });
    expect(enableBtn).toBeInTheDocument();
    fireEvent.click(enableBtn);
    let yesEnableBtn = getByText(translate('YES_ENABLE'));
    expect(yesEnableBtn).toBeInTheDocument();
    fireEvent.click(yesEnableBtn);
    expect(props.togglePolicyRequest).toBeCalledTimes(1);
  });

  it('No button should be working on enable policy popup', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings.enableText });
    expect(enableBtn).toBeInTheDocument();
    fireEvent.click(enableBtn);
    let noBtn = getByText(translatedStrings.noText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Display delete button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteLabel });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('On delete button popup should be open', async () => {
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteLabel });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    let deleteBtnPopup = getByText(translatedStrings.deleteText);
    expect(deleteBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Delete popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteLabel });
    fireEvent.click(deleteBtn);
    let noBtn = queryByText(translatedStrings.noText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.noText);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes) on Delete popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteLabel });
    fireEvent.click(deleteBtn);
    let yesDeleteBtn = queryByText(translatedStrings.yesDeleteText);
    expect(yesDeleteBtn).toBeInTheDocument();
    fireEvent.click(yesDeleteBtn);
    expect(props.deletePolicyById).toBeCalledTimes(1);
  });

  it('Display Name label policy on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const policyName = getByText(translatedStrings.policyName);
    expect(policyName).toBeInTheDocument();
  });

  it('Display User label policy on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const userName = getByText(memberLabels?.user);
    expect(userName).toBeInTheDocument();
  });

  it('Display View JSON button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(props.getPolicyByName).toBeCalledTimes(1);
  });

  it('Display View entity button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(viewJsonBtn).not.toBeInTheDocument();
    const viewEntityBtn = queryByRole('button', { name: translatedStrings.viewEntity });
    expect(viewEntityBtn).toBeInTheDocument();
  });

  it('Display Copy button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(viewJsonBtn).not.toBeInTheDocument();
    const copyBtn = queryByRole('button', { name: translatedStrings.copyText });
    expect(copyBtn).toBeInTheDocument();
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalled();
  });

  it('Display Role Table on Policy View screen', async () => {
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const roleTable = getByTestId(policyConstantLabels?.roleTableTestId);
    expect(roleTable).toBeInTheDocument();
  });

  it('Display Permission Table on Policy View screen', async () => {
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const permissionTable = getByTestId(policyConstantLabels?.permissionTableTestId);
    expect(permissionTable).toBeInTheDocument();
  });

  it('Display IP Addresses label on Policy View screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const ipAddressLabel = getByText(conditionsLabels?.ip);
    expect(ipAddressLabel).toBeInTheDocument();
  });

  it('Should display Tags, service identities and token label ', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const serviceIdentityLabel = getByText(memberLabels.identities);
    expect(serviceIdentityLabel).toBeInTheDocument();

    const tagsLabel = getByText(memberLabels.tags);
    expect(tagsLabel).toBeInTheDocument();

    const tokensLabel = getByText(memberLabels.tokens);
    expect(tokensLabel).toBeInTheDocument();
  });

  it('Display start and end time on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const startTimeLabel = getByText(conditionsLabels.startTime);
    expect(startTimeLabel).toBeInTheDocument();

    const startTime = getByText('9:00 PM');
    expect(startTime).toBeInTheDocument();

    const endTimeLabel = getByText(conditionsLabels.endTime);
    expect(endTimeLabel).toBeInTheDocument();

    const endTime = getByText('9:30 PM');
    expect(endTime).toBeInTheDocument();
  });

  it('Should display 1 record in role table ', async () => {
    const { queryByTestId } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const roleTable = queryByTestId(policyConstantLabels.roleTableTestId);
    expect(roleTable).toBeInTheDocument();

    const records = roleTable.getElementsByClassName('bds-table-row');
    expect(records.length).toBe(1);
  });

  it('Should open role in modal pop ', async () => {
    const { getByTitle, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );
    const firstRow = getByTitle(policyViewReducer.policyView.data.roles[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const viewRoleIcon = firstRow.querySelector('svg');
    expect(viewRoleIcon).toBeInTheDocument();

    fireEvent.click(viewRoleIcon);

    const roleName = queryByText(
      `${translatedStrings.roleTitle} : ${policyViewReducer.policyView.data.roles[0].name}`
    );
    expect(roleName).toBeInTheDocument();
  });

  it('Should display 2 record in permission table ', async () => {
    const { queryByTestId } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const permissionTable = queryByTestId(policyConstantLabels.permissionTableTestId);
    expect(permissionTable).toBeInTheDocument();

    const records = permissionTable.getElementsByClassName('bds-table-row');
    expect(records.length).toBe(2);
  });

  it('Should open permission in modal pop', async () => {
    const { getByTitle, queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const firstRow = getByTitle(policyViewReducer.policyView.data.permissions[0].name).closest(
      'tr'
    );
    expect(firstRow).toBeInTheDocument();

    const viewPolicyIcon = firstRow.querySelector('svg');
    expect(viewPolicyIcon).toBeInTheDocument();

    fireEvent.click(viewPolicyIcon);

    const roleName = queryByText(
      `${translatedStrings.permissionTitle} : ${policyViewReducer.policyView.data.permissions[0].name}`
    );
    expect(roleName).toBeInTheDocument();
  });

  it('Should display approvals details', async () => {
    const { queryByText } = testUtils.renderWithRouter(
      <Route path={pagePath}>
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: path,
      }
    );

    const notificationName = queryByText(
      store.getState().policyReducer.view.notificationMedium.data.name
    );
    expect(notificationName).toBeInTheDocument();

    const maxTimeToApprove = queryByText('1 Hours');
    expect(maxTimeToApprove).toBeInTheDocument();

    const validityAfterApproval = queryByText('15 Minutes');
    expect(validityAfterApproval).toBeInTheDocument();

    const approvalUser = queryByText(policyViewReducer.users.data.result[1].name);
    expect(approvalUser).toBeInTheDocument();
  });
});
