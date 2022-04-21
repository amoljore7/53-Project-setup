/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
  queryByAltText,
} from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import AddPasswordPolicy from './AddPasswordPolicy';
import { translatedStrings } from './constants';
import { translatedStrings as translatedFormStrings, testIDList } from '../form/constants';

const props = {
  setPageHeader: jest.fn(),
  history: {},
  postPasswordPolicyData: jest.fn(),
  resetPasswordPolicyData: jest.fn(),
  addPasswordPolicyStatus: RESOURCE_STATUS.INITIAL,
  addPasswordPolicyError: {},
  initSpinnerOverlay: jest.fn(),
};

beforeEach(cleanup);

describe('Secret Manager - Add Password Policy Form Page', () => {
  it('displays the save password policy button', async () => {
    const { getByRole } = render(<AddPasswordPolicy {...props} />);
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays the cancel password policy button', async () => {
    const { getByRole } = render(<AddPasswordPolicy {...props} />);
    const cancelButton = getByRole('button', { name: translatedStrings.cancelButton });
    expect(cancelButton).toBeInTheDocument();
  });

  it('displays the error snackbar if form gets error', async () => {
    props.addPasswordPolicyError = { message: 'error message' };
    const { getByTestId } = render(<AddPasswordPolicy {...props} />);
    expect(getByTestId('password-policy-error')).toBeInTheDocument();
  });

  it('displays the cancel dialog', async () => {
    const { getByRole, getByText } = render(<AddPasswordPolicy {...props} />);
    const cancelButton = getByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelButton);

    expect(getByText(translatedStrings.cancelDialogTitle)).toBeInTheDocument();
  });

  it('displays the password policy form validations for Alphanumeric password type', async () => {
    const { getByRole, getByText } = render(<AddPasswordPolicy {...props} />);
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translatedStrings.passwordPolicyNameValidation)).toBeInTheDocument();
  });

  it('displays the PIN Length field on selection of PIN Password Type', async () => {
    const { getByTestId, queryByText } = render(<AddPasswordPolicy {...props} />);
    expect(queryByText(translatedFormStrings.pinLengthLabel)).not.toBeInTheDocument();
    const passwordTypeRadio = getByTestId(testIDList.passwordTypeRadio);
    const pinRadioButton = passwordTypeRadio.querySelectorAll('input')[1];
    fireEvent.click(pinRadioButton);

    const pinLengthField = queryByText(translatedFormStrings.pinLengthLabel);
    expect(pinLengthField).toBeInTheDocument();
  });

  it('displays the password policy form validations for PIN password type', async () => {
    const { getByTestId, getByRole, getByText } = render(<AddPasswordPolicy {...props} />);
    const passwordTypeRadio = getByTestId(testIDList.passwordTypeRadio);
    const pinRadioButton = passwordTypeRadio.querySelectorAll('input')[1];
    fireEvent.click(pinRadioButton);
    const saveButton = getByRole('button', { name: translatedStrings.saveButton });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translatedStrings.passwordPolicyNameValidation)).toBeInTheDocument();
    expect(getByText(translatedStrings.pinLengthValidation)).toBeInTheDocument();
  });

  it('displays the Allowed Special Characters field only if selected Yes', async () => {
    const { getByTestId, queryByText } = render(<AddPasswordPolicy {...props} />);
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
    const { getByTestId, queryByText } = render(<AddPasswordPolicy {...props} />);
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
    const { getByTestId, queryByText } = render(<AddPasswordPolicy {...props} />);
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
    const { getByTestId, getByText, queryByText } = render(<AddPasswordPolicy {...props} />);
    expect(getByText(translatedFormStrings.minimumPasswordLengthLabel)).toBeInTheDocument();
    const minimumPasswordLengthField = getByTestId(testIDList.minimumPasswordLengthField);
    const inputField = minimumPasswordLengthField.querySelector('input');
    fireEvent.change(inputField, {
      target: {
        value: '1',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));
    fireEvent.blur(inputField);
    waitFor(() =>
      expect(getByText(translatedStrings.passwordLengthMinValidation)).toBeInTheDocument()
    );

    /* ReChanging the input field value to 1 so as to check whether min validation gets removed or not */
    fireEvent.change(inputField, {
      target: {
        value: '4',
      },
    });
    await waitFor(() => fireEvent.blur(inputField));

    expect(queryByText(translatedStrings.passwordLengthMinValidation)).toEqual(null);
  });
});
