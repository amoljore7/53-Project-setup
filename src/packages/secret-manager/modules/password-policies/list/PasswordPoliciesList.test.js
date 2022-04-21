/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { RESOURCE_STATUS, ALLOW } from '../../../../../utils/common-constants';
import PasswordPoliciesList from './PasswordPoliciesList';
import { translatedStrings } from './constants';
import { passwordPolicyActions } from '../../../../../components/batch-eval/constants';

const smEvalData = {
  [passwordPolicyActions?.create]: ALLOW,
  [passwordPolicyActions?.update]: ALLOW,
  [passwordPolicyActions?.delete]: ALLOW,
  [passwordPolicyActions?.read]: ALLOW,
  [passwordPolicyActions?.list]: ALLOW,
};

const props = {
  setPageHeader: jest.fn(),
  getPasswordPolicyList: jest.fn(),
  passwordPolicyStatus: RESOURCE_STATUS.INITIAL,
  passwordPolicyData: [],
  passwordPolicyPagination: {},
  deletePasswordPolicy: jest.fn(),
  deletePasswordPolicyStatus: RESOURCE_STATUS.INITIAL,
  history: {},
  match: {},
  resetDeletePasswordPolicy: jest.fn(),
  getPasswordPolicyListLoadMore: jest.fn(),
  updatePasswordPolicyListSearchTerm: jest.fn(),
  passwordPolicySearchTerm: '',
  smEvalData,
};
beforeEach(cleanup);

describe.only('Secret Manager - Password Policies Listing Page', () => {
  it('displays the add password policy button', async () => {
    const { getByRole } = render(<PasswordPoliciesList {...props} />);
    const addButton = getByRole('button', { name: translatedStrings.addPasswordPolicyButton });
    expect(addButton).toBeInTheDocument();
  });

  it('displays the password policy table list', async () => {
    const { getByTestId } = render(<PasswordPoliciesList {...props} />);
    const passwordPolicyTable = getByTestId('password-policy-table');
    expect(passwordPolicyTable).toBeInTheDocument();
  });

  it('displays the search field inside password policy table', async () => {
    const { getByPlaceholderText } = render(<PasswordPoliciesList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.passwordPolicySearchPlaceholder);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside password policy table should be working', async () => {
    const { getByPlaceholderText } = render(<PasswordPoliciesList {...props} />);
    const searchField = getByPlaceholderText(translatedStrings.passwordPolicySearchPlaceholder);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });

    expect(searchField.value).toEqual(inputValue);
    expect(props.getPasswordPolicyList).toBeCalledTimes(1);
  });

  it('displays the static record inside password policy table', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.SUCCESS;
    props.passwordPolicyData = [
      {
        id: 'test',
        name: 'test',
        description: '',
        passwordType: 'alphanumeric',
        allowedSpecialChars: '@#$%',
        minPasswordLength: 5,
        hasUpperCaseChars: true,
        hasLowerCaseChars: false,
        hasNumbers: false,
        hasSpecialChars: true,
        pinLength: 0,
        passwordOrPin: null,
      },
    ];
    const { getByTitle } = render(<PasswordPoliciesList {...props} />);
    const row = getByTitle(props.passwordPolicyData[0].name).closest('tr');
    expect(row).toBeInTheDocument();
  });

  it('displays the loading for get password policies list inside  password policy table', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.LOADING;
    const { getByText, rerender } = render(<PasswordPoliciesList {...props} />);
    const loading = getByText(translatedStrings.passwordPolicyLoadingMessage);
    expect(loading).toBeInTheDocument();

    rerender(<PasswordPoliciesList {...props} passwordPolicyStatus={RESOURCE_STATUS.SUCCESS} />);
    expect(loading).not.toBeInTheDocument();
  });

  it('displays the manage, clone and delete icon inside password policy table', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.SUCCESS;
    props.passwordPolicyData = [
      {
        id: 'test',
        name: 'test',
        description: '',
        passwordType: 'alphanumeric',
        allowedSpecialChars: '@#$%',
        minPasswordLength: 5,
        hasUpperCaseChars: true,
        hasLowerCaseChars: false,
        hasNumbers: false,
        hasSpecialChars: true,
        pinLength: 0,
        passwordOrPin: null,
      },
    ];
    const { getByTitle } = render(<PasswordPoliciesList {...props} />);
    const row = getByTitle(props.passwordPolicyData[0].name).closest('tr');

    const manageActionContainer = row.querySelector('.password-policy-table-action-edit');
    const manageIcon = manageActionContainer.querySelector('svg');
    expect(manageIcon).toBeInTheDocument();

    /* Will Uncomment it once Clone Password Policy Page is implemented */
    // const cloneActionContainer = row.querySelector('.password-policy-table-action-clone');
    // const cloneIcon = cloneActionContainer.querySelector('svg');
    // expect(cloneIcon).toBeInTheDocument();

    const deleteActionContainer = row.querySelector('.password-policy-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('displays the delete dialog on clicking of delete icon inside password policy table', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.SUCCESS;
    props.passwordPolicyData = [
      {
        id: 'test',
        name: 'test',
        description: '',
        passwordType: 'alphanumeric',
        allowedSpecialChars: '@#$%',
        minPasswordLength: 5,
        hasUpperCaseChars: true,
        hasLowerCaseChars: false,
        hasNumbers: false,
        hasSpecialChars: true,
        pinLength: 0,
        passwordOrPin: null,
      },
    ];
    const { getByTitle, getByText } = render(<PasswordPoliciesList {...props} />);
    const row = getByTitle(props.passwordPolicyData[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.password-policy-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const deleteDialog = getByText(translatedStrings.deletePasswordPolicyDialogTitle);
    expect(deleteDialog).toBeInTheDocument();
  });

  it('Yes click inside Delete Dialog should be working', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.SUCCESS;
    props.passwordPolicyData = [
      {
        id: 'test',
        name: 'test',
        description: '',
        passwordType: 'alphanumeric',
        allowedSpecialChars: '@#$%',
        minPasswordLength: 5,
        hasUpperCaseChars: true,
        hasLowerCaseChars: false,
        hasNumbers: false,
        hasSpecialChars: true,
        pinLength: 0,
        passwordOrPin: null,
      },
    ];
    const { getByTitle, getByRole } = render(<PasswordPoliciesList {...props} />);
    const row = getByTitle(props.passwordPolicyData[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.password-policy-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const yesButton = getByRole('button', { name: translatedStrings.deletePrimaryButton });
    fireEvent.click(yesButton);
    expect(props.deletePasswordPolicy).toBeCalledTimes(1);
  });

  it('No click inside Delete Dialog should be working', async () => {
    props.passwordPolicyStatus = RESOURCE_STATUS.SUCCESS;
    props.passwordPolicyData = [
      {
        id: 'test',
        name: 'test',
        description: '',
        passwordType: 'alphanumeric',
        allowedSpecialChars: '@#$%',
        minPasswordLength: 5,
        hasUpperCaseChars: true,
        hasLowerCaseChars: false,
        hasNumbers: false,
        hasSpecialChars: true,
        pinLength: 0,
        passwordOrPin: null,
      },
    ];
    const { getByTitle, getByRole } = render(<PasswordPoliciesList {...props} />);
    const row = getByTitle(props.passwordPolicyData[0].name).closest('tr');
    const deleteActionContainer = row.querySelector('.password-policy-table-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const noButton = getByRole('button', { name: translatedStrings.noText });
    fireEvent.click(noButton);
    expect(noButton).not.toBeInTheDocument();
  });
});
