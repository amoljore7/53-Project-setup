/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SecretManagerHome from './SecretManager';
import testUtils from '../../../../utils/test-utils';
import {
  groupTilesDetails,
  backToSysAdminBtnTxt,
  noAccessOnSecretManagerTxt,
} from '../home/constants';
import { adminPath } from '../../../../utils/common-constants';

const store = testUtils.storeFake({});
const vaultDetail = { loading: false };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    loading: vaultDetail.loading,
  }),
}));

const props = {
  setPageHeader: jest.fn(),
  history: { push: jest.fn() },
  match: { url: '/admin/secret-manager' },
  smEvalData: {
    'sm.passwordpolicy.update': 'Allow',
    'sm.passwordpolicy.read': 'Allow',
    'sm.passwordpolicy.delete': 'Allow',
    'sm.passwordpolicy.create': 'Allow',
    'sm.passwordpolicy.list': 'Allow',
    'sm.secrettemplate.update': 'Allow',
    'sm.secrettemplate.read': 'Allow',
    'sm.secrettemplate.delete': 'Allow',
    'sm.secrettemplate.create': 'Allow',
    'sm.secrettemplate.list': 'Allow',
    'sm.vault.update': 'Allow',
    'sm.vault.read': 'Allow',
    'sm.vault.delete': 'Allow',
    'sm.vault.create': 'Allow',
    'sm.vault.list': 'Allow',
  },
  vaultDetail: vaultDetail,
};

const denyVault = {
  'sm.vault.update': 'Deny',
  'sm.vault.read': 'Deny',
  'sm.vault.delete': 'Deny',
  'sm.vault.create': 'Deny',
  'sm.vault.list': 'Deny',
};

const denyPasswordPolicy = {
  'sm.passwordpolicy.update': 'Deny',
  'sm.passwordpolicy.read': 'Deny',
  'sm.passwordpolicy.delete': 'Deny',
  'sm.passwordpolicy.create': 'Deny',
  'sm.passwordpolicy.list': 'Deny',
};

const denySecretTemplate = {
  'sm.secrettemplate.update': 'Deny',
  'sm.secrettemplate.read': 'Deny',
  'sm.secrettemplate.delete': 'Deny',
  'sm.secrettemplate.create': 'Deny',
  'sm.secrettemplate.list': 'Deny',
};

const groupTitles = ['Britive Vault', 'Governance', 'Configuration'];

beforeEach(cleanup);

describe('Secret Manager Landing Page', () => {
  it('Should set the page header', () => {
    render(
      <Provider store={store}>
        <SecretManagerHome {...props} />
      </Provider>
    );
    expect(props.setPageHeader).toBeCalledTimes(1);
  });

  it('displays all the cards/tiles on the secret manager landing page', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <SecretManagerHome {...props} />
      </Provider>
    );
    expect(getAllByTestId('card').length).toEqual(4);
  });

  it('Should display all tile', async () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <SecretManagerHome {...props} />
      </Provider>
    );

    const britiveVaultTile = getAllByText(groupTilesDetails[0].tilesDetails[0].title);
    //length is 2 because tile name and header of group is same.
    expect(britiveVaultTile).toHaveLength(2);

    const britiveVaultDetailsTile = getByText(groupTilesDetails[1].tilesDetails[0].title);
    expect(britiveVaultDetailsTile).toBeInTheDocument();

    const passwordPolicyTile = getByText(groupTilesDetails[1].tilesDetails[1].title);
    expect(passwordPolicyTile).toBeInTheDocument();

    const secretTemplateTile = getByText(groupTilesDetails[1].tilesDetails[2].title);
    expect(secretTemplateTile).toBeInTheDocument();
  });

  it('displays the Britive Vault group on the secret manager landing page', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SecretManagerHome {...props} />
      </Provider>
    );
    expect(getByTestId(groupTitles[0])).toBeInTheDocument();
  });
  it('Should hide the britive vault tile', () => {
    const newProps = { ...props, smEvalData: { ...props.smEvalData, ...denyVault } };
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <SecretManagerHome {...props} />
      </Provider>
    );
    const britiveVaultTile = queryByDisplayValue(groupTilesDetails[0].groupTitle);
    expect(britiveVaultTile).not.toBeInTheDocument();
  });

  it('Should hide the britive vault details tile', () => {
    const newProps = { ...props, smEvalData: { ...props.smEvalData, ...denyVault } };
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );
    const britiveVaultDetailsTile = queryByDisplayValue(groupTilesDetails[1].tilesDetails[0].title);
    expect(britiveVaultDetailsTile).not.toBeInTheDocument();
  });

  it('Should hide the password policy tile', () => {
    const newProps = { ...props, smEvalData: { ...props.smEvalData, ...denyPasswordPolicy } };
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );

    const passwordPolicyTile = queryByDisplayValue('Password Policies');
    expect(passwordPolicyTile).not.toBeInTheDocument();
  });

  it('Should hide the static secret template tile', () => {
    const newProps = { ...props, smEvalData: { ...props.smEvalData, ...denySecretTemplate } };
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );
    const secretTemplateTile = queryByDisplayValue('Static Secret Templates');
    expect(secretTemplateTile).not.toBeInTheDocument();
  });

  it('Should hide all tile', () => {
    const newProps = {
      ...props,
      smEvalData: { ...denyVault, ...denyPasswordPolicy, ...denySecretTemplate },
    };
    const { queryByText, queryByDisplayValue } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );

    const britiveVaultTile = queryByText('Britive Vault');
    expect(britiveVaultTile).not.toBeInTheDocument();

    const britiveVaultDetailsTile = queryByDisplayValue('Britive Vault Details');
    expect(britiveVaultDetailsTile).not.toBeInTheDocument();

    const passwordPolicyTile = queryByDisplayValue('Password Policies');
    expect(passwordPolicyTile).not.toBeInTheDocument();

    const secretTemplateTile = queryByDisplayValue('Static Secret Templates');
    expect(secretTemplateTile).not.toBeInTheDocument();
  });

  it('Should show add back to system administrator button when all tiles are hidden', () => {
    const newProps = {
      ...props,
      smEvalData: { ...denyVault, ...denyPasswordPolicy, ...denySecretTemplate },
    };
    const { queryByRole } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );
    const backButton = queryByRole('button', { name: backToSysAdminBtnTxt });
    expect(backButton).toBeInTheDocument();
  });

  it('Should show no access text(banner) when all tiles are hidden', () => {
    const newProps = {
      ...props,
      smEvalData: { ...denyVault, ...denyPasswordPolicy, ...denySecretTemplate },
    };
    const { queryByText } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );
    const backButton = queryByText(noAccessOnSecretManagerTxt);
    expect(backButton).toBeInTheDocument();
  });

  it('Back To System Administration button should redirect the user to /admin path ', () => {
    const newProps = {
      ...props,
      smEvalData: { ...denyVault, ...denyPasswordPolicy, ...denySecretTemplate },
    };
    const { queryByRole } = render(
      <Provider store={store}>
        <SecretManagerHome {...newProps} />
      </Provider>
    );
    const backButton = queryByRole('button', { name: backToSysAdminBtnTxt });
    fireEvent.click(backButton);
    expect(props.history.push).toBeCalledWith(adminPath);
  });
});
