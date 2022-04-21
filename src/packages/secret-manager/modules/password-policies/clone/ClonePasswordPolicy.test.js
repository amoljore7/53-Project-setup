/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import ClonePasswordPolicy from './ClonePasswordPolicy';
import { translatedStrings } from '../add/constants';
import { translatedStrings as translatedFormStrings, testIDList } from '../form/constants';
import { Route } from 'react-router-dom';
import testUtils from '../../../../../utils/test-utils';

const props = {
  setPageHeader: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
  postPasswordPolicyData: jest.fn(),
  resetPasswordPolicyData: jest.fn(),
  getPasswordPolicyData: jest.fn(),
  addPasswordPolicyStatus: RESOURCE_STATUS.INITIAL,
  addPasswordPolicyError: {},
  initSpinnerOverlay: jest.fn(),
  match: {},
};

beforeEach(cleanup);

describe('Secret Manager - Clone Password Policy Form Page', () => {
  it('displays the save password policy button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays the cancel password policy button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const cancelButton = getByRole('button', { name: translatedStrings.cancelButton });
    expect(cancelButton).toBeInTheDocument();
  });

  it('displays the error snackbar if form gets error', async () => {
    props.addPasswordPolicyError = { message: 'error message' };
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(getByTestId('password-policy-error')).toBeInTheDocument();
  });

  it('displays the cancel dialog', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const cancelButton = getByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelButton);

    expect(getByText(translatedStrings.cancelDialogTitle)).toBeInTheDocument();
  });

  it('cancel dialog yes button click', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const cancelButton = getByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelButton);
    const cancelNoButton = getByRole('button', {
      name: translatedStrings.noButton,
    });
    expect(cancelNoButton).toBeInTheDocument();
    const cancelYesButton = getByRole('button', {
      name: translatedStrings.cancelDialogPrimaryButton,
    });
    expect(cancelYesButton).toBeInTheDocument();
  });

  it('displays the password policy form validations for Alphanumeric password type', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translatedStrings.passwordPolicyNameValidation)).toBeInTheDocument();
    expect(getByText(translatedStrings.passwordLengthValidation)).toBeInTheDocument();
  });

  it('displays the PIN Length field on selection of PIN Password Type', async () => {
    const { getByTestId, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(queryByText(translatedFormStrings.pinLengthLabel)).not.toBeInTheDocument();
    const passwordTypeRadio = getByTestId(testIDList.passwordTypeRadio);
    const pinRadioButton = passwordTypeRadio.querySelectorAll('input')[1];
    fireEvent.click(pinRadioButton);

    const pinLengthField = queryByText(translatedFormStrings.pinLengthLabel);
    expect(pinLengthField).toBeInTheDocument();
  });

  it('displays the password policy form validations for PIN password type', async () => {
    const { getByTestId, getByRole, getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    const passwordTypeRadio = getByTestId(testIDList.passwordTypeRadio);
    const pinRadioButton = passwordTypeRadio.querySelectorAll('input')[1];
    fireEvent.click(pinRadioButton);
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translatedStrings.passwordPolicyNameValidation)).toBeInTheDocument();
    expect(getByText(translatedStrings.pinLengthValidation)).toBeInTheDocument();
  });

  it('displays the Allowed Special Characters field only if selected Yes', async () => {
    const { getByTestId, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(queryByText(translatedFormStrings.allowedSpecialCharactersLabel)).toBeInTheDocument();
    const specialCharsRadio = getByTestId('hasSpecialChars');
    const noRadioButton = specialCharsRadio.querySelectorAll('input')[1];
    fireEvent.click(noRadioButton);

    const allowedSpecialCharsField = queryByText(
      translatedFormStrings.allowedSpecialCharactersLabel
    );
    expect(allowedSpecialCharsField).not.toBeInTheDocument();
  });

  it('displays the Validation for Allowed Special Characters field', async () => {
    const { getByTestId, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(queryByText(translatedFormStrings.allowedSpecialCharactersLabel)).toBeInTheDocument();
    const allowedSpecialCharsField = getByTestId(testIDList.allowedSpecialCharsField);
    const inputField = allowedSpecialCharsField.querySelector('input');
    fireEvent.change(inputField, {
      target: {
        value: '',
      },
    });

    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.allowedSpecialCharsValidation)).toBeInTheDocument();
  });

  it('displays the Min Validation for PIN Length field', async () => {
    const { getByTestId, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(queryByText(translatedFormStrings.pinLengthLabel)).not.toBeInTheDocument();
    const passwordTypeRadio = getByTestId(testIDList.passwordTypeRadio);
    const pinRadioButton = passwordTypeRadio.querySelectorAll('input')[1];
    fireEvent.click(pinRadioButton);

    const pinLengthField = getByTestId(testIDList.pinLengthField);
    const inputField = pinLengthField.querySelector('input');
    fireEvent.change(inputField, {
      target: {
        value: '0',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.pinLengthMinValidation)).toBeInTheDocument();

    /* ReChanging the input field value to 1 so as to check whether min validation gets removed or not */
    fireEvent.change(inputField, {
      target: {
        value: '1',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.pinLengthMinValidation)).not.toBeInTheDocument();
  });

  it('displays the Min Validation for Minimum Password Length field', async () => {
    const { getByTestId, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/clone/:id">
        <ClonePasswordPolicy {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/clone/1',
      }
    );
    expect(queryByText(translatedFormStrings.minimumPasswordLengthLabel)).toBeInTheDocument();
    const minimumPasswordLengthField = getByTestId(testIDList.minimumPasswordLengthField);
    const inputField = minimumPasswordLengthField.querySelector('input');
    fireEvent.change(inputField, {
      target: {
        value: '0',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.passwordLengthMinValidation)).toBeInTheDocument();

    /* ReChanging the input field value to 1 so as to check whether min validation gets removed or not */
    fireEvent.change(inputField, {
      target: {
        value: '4',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.passwordLengthMinValidation)).not.toBeInTheDocument();
  });
});
