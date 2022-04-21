import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PolicyView from './PolicyView';
import testUtils from '../../../utils/test-utils';
import { Route } from 'react-router-dom';
import {
  conditionsLabels,
  memberLabels,
  policyConstantLabels,
  translatedStrings,
} from './constants';
import { translate } from '../../../packages/policy-management/externalization';
import { ALLOW, RESOURCE_STATUS } from '../../../utils/common-constants';
import { policyActions } from '../../batch-eval/constants';
const policyViewReducer = {
  policyView: {
    status: RESOURCE_STATUS.INITIAL,
    error: {
      message: 'errorViewTest',
    },
    data: {
      name: 'test',
    },
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
  setPageHeader: jest.fn(),
  getPolicyById: jest.fn(),
  resetPolicyView: jest.fn(),
  deletePolicyById: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  togglePolicyRequest: jest.fn(),
  fetchedUsers: jest.fn(),
  fetchedGroups: jest.fn(),
  fetchedServiceIdentities: jest.fn(),
  fetchedTokens: jest.fn(),
  policyEvalData: policiesEvalData,
  getApplicationsList: jest.fn(),
  applicationsListData: [],
  getPolicyByName: jest.fn(),
  getPolicyByIdReset: jest.fn(),
  getPolicyByNameReset: jest.fn(),
  openNotification: jest.fn(),
  policyViewJSONData: {},
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
};

const store = testUtils.storeFake({
  policyViewReducer,
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
describe.only('Policy - View Policy', () => {
  it('Display edit button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const editBtn = queryByRole('button', { name: translatedStrings?.editText });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(props.history.push('/admin/policy-management/policies/edit/:id'));
  });

  it('Display clone button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const cloneBtn = queryByRole('button', { name: translatedStrings?.cloneText });
    expect(cloneBtn).toBeInTheDocument();
    fireEvent.click(cloneBtn);
    expect(props.history.push('/admin/policy-management/policies/clone/:id'));
  });

  it('Display close button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const closeBtn = queryByRole('button', { name: translatedStrings?.closeLabel });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(props.history.push('/admin/policy-management/policies'));
  });

  it('Display disable button on screen', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings?.disableText });
    expect(disableBtn).toBeInTheDocument();
  });

  it('Display disable popup on screen', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings?.disableText });
    expect(disableBtn).toBeInTheDocument();
    fireEvent.click(disableBtn);
    let disablePopup = getByText(translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_DISABLE'));
    expect(disablePopup).toBeInTheDocument();
  });

  it('Yes disable button should be working', async () => {
    props.policyViewData.isActive = true;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings?.disableText });
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
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const disableBtn = queryByRole('button', { name: translatedStrings?.disableText });
    expect(disableBtn).toBeInTheDocument();
    fireEvent.click(disableBtn);
    let disableNoBtn = getByText(translatedStrings?.noText);
    expect(disableNoBtn).toBeInTheDocument();
    fireEvent.click(disableNoBtn);
    expect(disableNoBtn).not.toBeInTheDocument();
  });

  it('Display enable button on screen', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings?.enableText });
    expect(enableBtn).toBeInTheDocument();
  });

  it('Display enable popup on screen', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings?.enableText });
    expect(enableBtn).toBeInTheDocument();
    fireEvent.click(enableBtn);
    let enablePopup = getByText(translate('POLICIES_MODULE.TOGGLE_POLICY_CONFIRM_TITLE_ENABLE'));
    expect(enablePopup).toBeInTheDocument();
  });

  it('Yes enable button should be working', async () => {
    props.policyViewData.isActive = false;
    props.policyViewData.isDraft = false;
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings?.enableText });
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
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const enableBtn = queryByRole('button', { name: translatedStrings?.enableText });
    expect(enableBtn).toBeInTheDocument();
    fireEvent.click(enableBtn);
    let noBtn = getByText(translatedStrings.noText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Display delete button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteLabel });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('On delete button popup should be open', async () => {
    const { queryByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteLabel });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    let deleteBtnPopup = getByText(translatedStrings?.deleteText);
    expect(deleteBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Delete popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
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
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteLabel });
    fireEvent.click(deleteBtn);
    let yesDeleteBtn = queryByText(translatedStrings?.yesDeleteText);
    expect(yesDeleteBtn).toBeInTheDocument();
    fireEvent.click(yesDeleteBtn);
    expect(props.deletePolicyById).toBeCalledTimes(1);
  });

  it('Display Name label policy on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const policyName = getByText(translatedStrings.policyName);
    expect(policyName).toBeInTheDocument();
  });

  it('Display User label policy on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const userName = getByText(memberLabels?.user);
    expect(userName).toBeInTheDocument();
  });
  it('Display View JSON button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings?.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(props.getPolicyByName).toBeCalledTimes(1);
  });
  it('Display View entity button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings?.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(viewJsonBtn).not.toBeInTheDocument();
    const viewEntityBtn = queryByRole('button', { name: translatedStrings?.viewEntity });
    expect(viewEntityBtn).toBeInTheDocument();
  });

  it('Display Copy button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const viewJsonBtn = queryByRole('button', { name: translatedStrings?.viewJson });
    expect(viewJsonBtn).toBeInTheDocument();
    fireEvent.click(viewJsonBtn);
    expect(viewJsonBtn).not.toBeInTheDocument();
    const copyBtn = queryByRole('button', { name: translatedStrings?.copyText });
    expect(copyBtn).toBeInTheDocument();
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalled();
  });

  it('Display Role Table on Policy View screen', async () => {
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const roleTable = getByTestId(policyConstantLabels?.roleTableTestId);
    expect(roleTable).toBeInTheDocument();
  });
  it('Display Permission Table on Policy View screen', async () => {
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const permissionTable = getByTestId(policyConstantLabels?.permissionTableTestId);
    expect(permissionTable).toBeInTheDocument();
  });
  it('Display IP Addresses label on Policy View screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/policy-management/policies/view/:id">
        <WithRedux>
          <PolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/policy-management/policies/view/1',
      }
    );
    const ipAddressLabel = getByText(conditionsLabels?.ip);
    expect(ipAddressLabel).toBeInTheDocument();
  });
});
