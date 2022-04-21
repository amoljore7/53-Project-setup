/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import PolicyManagementHome from './PolicyManagement';
import testUtils from '../../../../utils/test-utils';
import { backToSysAdminBtnTxt, cardTitleWithImg, noAccessOnPolicyAdminTxt } from './constants';
import { adminPath } from '../../../../utils/common-constants';

const store = testUtils.storeFake({});

const props = {
  setPageHeader: jest.fn(),
  history: { push: jest.fn() },
  match: { url: '/admin/policy-management' },
  policyEvalData: {
    'authz.policy.update': 'Allow',
    'authz.policy.read': 'Allow',
    'authz.policy.delete': 'Allow',
    'authz.policy.create': 'Allow',
    'authz.policy.list': 'Allow',
    'authz.role.update': 'Allow',
    'authz.role.read': 'Allow',
    'authz.role.delete': 'Allow',
    'authz.role.create': 'Allow',
    'authz.role.list': 'Allow',
    'authz.permission.update': 'Allow',
    'authz.permission.read': 'Allow',
    'authz.permission.delete': 'Allow',
    'authz.permission.create': 'Allow',
    'authz.permission.list': 'Allow',
  },
};

const denyRoles = {
  'authz.role.update': 'Deny',
  'authz.role.read': 'Deny',
  'authz.role.delete': 'Deny',
  'authz.role.create': 'Deny',
  'authz.role.list': 'Deny',
};

const denyPermission = {
  'authz.permission.update': 'Deny',
  'authz.permission.read': 'Deny',
  'authz.permission.delete': 'Deny',
  'authz.permission.create': 'Deny',
  'authz.permission.list': 'Deny',
};

const denyPolicy = {
  'authz.policy.update': 'Deny',
  'authz.policy.read': 'Deny',
  'authz.policy.delete': 'Deny',
  'authz.policy.create': 'Deny',
  'authz.policy.list': 'Deny',
};

describe('Policy Admin Landing Page', () => {
  it('Should set the page header', () => {
    render(
      <Provider store={store}>
        <PolicyManagementHome {...props} />
      </Provider>
    );
    expect(props.setPageHeader).toBeCalledTimes(1);
  });

  it('Should display all tile ', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...props} />
      </Provider>
    );
    const permissionTile = getByText(cardTitleWithImg[0].title);
    expect(permissionTile).toBeInTheDocument();

    const roleTile = getByText(cardTitleWithImg[1].title);
    expect(roleTile).toBeInTheDocument();

    const policyTile = getByText(cardTitleWithImg[2].title);
    expect(policyTile).toBeInTheDocument();
  });

  it('Should hide the permission tile', () => {
    const newProps = { ...props, policyEvalData: { ...props.policyEvalData, ...denyPermission } };
    const { queryByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const permissionTile = queryByText(cardTitleWithImg[0].title);
    expect(permissionTile).not.toBeInTheDocument();
  });

  it('Should hide the role tile', () => {
    const newProps = { ...props, policyEvalData: { ...props.policyEvalData, ...denyRoles } };
    const { queryByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const roleTile = queryByText(cardTitleWithImg[1].title);
    expect(roleTile).not.toBeInTheDocument();
  });

  it('Should hide the policy tile', () => {
    const newProps = { ...props, policyEvalData: { ...props.policyEvalData, ...denyPolicy } };
    const { queryByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const policyTile = queryByText(cardTitleWithImg[2].title);
    expect(policyTile).not.toBeInTheDocument();
  });

  it('Should hide all tile', () => {
    const newProps = {
      ...props,
      policyEvalData: { ...denyRoles, ...denyPolicy, ...denyPermission },
    };
    const { queryByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const permissionTile = queryByText(cardTitleWithImg[0].title);
    expect(permissionTile).not.toBeInTheDocument();

    const roleTile = queryByText(cardTitleWithImg[1].title);
    expect(roleTile).not.toBeInTheDocument();

    const policyTile = queryByText(cardTitleWithImg[2].title);
    expect(policyTile).not.toBeInTheDocument();
  });

  it('Should show add back to system administrator button when all tiles are hidden', () => {
    const newProps = {
      ...props,
      policyEvalData: { ...denyRoles, ...denyPolicy, ...denyPermission },
    };
    const { queryByRole } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const backButton = queryByRole('button', { name: backToSysAdminBtnTxt });
    expect(backButton).toBeInTheDocument();
  });

  it('Should show no access text(banner) when all tiles are hidden', () => {
    const newProps = {
      ...props,
      policyEvalData: { ...denyRoles, ...denyPolicy, ...denyPermission },
    };
    const { queryByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const backButton = queryByText(noAccessOnPolicyAdminTxt);
    expect(backButton).toBeInTheDocument();
  });

  it('Back To System Administration button should redirect the user to /admin path ', () => {
    const newProps = {
      ...props,
      policyEvalData: { ...denyRoles, ...denyPolicy, ...denyPermission },
    };
    const { queryByRole } = render(
      <Provider store={store}>
        <PolicyManagementHome {...newProps} />
      </Provider>
    );
    const backButton = queryByRole('button', { name: backToSysAdminBtnTxt });
    fireEvent.click(backButton);
    expect(props.history.push).toBeCalledWith(adminPath);
  });

  it('Click on card(tile) should redirect user to appropriate page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PolicyManagementHome {...props} />
      </Provider>
    );
    const permissionTile = getByText(cardTitleWithImg[0].title);
    expect(permissionTile).toBeInTheDocument();
    fireEvent.click(permissionTile);
    expect(props.history.push).toBeCalledWith(props.match.url + cardTitleWithImg[0].link);
  });
});
