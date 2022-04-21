/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import testUtils from '../../../../../utils/test-utils';
import { ALLOW } from '../../../../../utils/common-constants';
import { passwordPolicyActions } from '../../../../../components/batch-eval/constants';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';
import PasswordPolicyView from './PasswordPolicyView';
const passwordPolicyReducer = {
  viewPasswordPolicy: {
    status: 'INITIAL',
    error: '',
    data: {
      name: '',
      description: '',
      passwordType: '',
      minPasswordLength: '',
      hasUpperCaseChars: false,
      hasLowerCaseChars: false,
      hasNumbers: false,
      hasSpecialChars: false,
      allowedSpecialChars: '',
    },
  },
};
const smEvalData = {
  [passwordPolicyActions?.create]: ALLOW,
  [passwordPolicyActions?.update]: ALLOW,
  [passwordPolicyActions?.delete]: ALLOW,
  [passwordPolicyActions?.read]: ALLOW,
  [passwordPolicyActions?.list]: ALLOW,
};
const props = {
  passwordPolicyData: passwordPolicyReducer?.viewPasswordPolicy?.data,
  viewPasswordPolicyStatus: passwordPolicyReducer.viewPasswordPolicy.status,
  viewPasswordPolicyError: passwordPolicyReducer.viewPasswordPolicy.error,
  setPageHeader: jest.fn(),
  fetchPasswordPolicyData: jest.fn(),
  deletePasswordPolicyById: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
  match: {},
  initSpinnerOverlay: jest.fn(),
  resetPasswordPolicyView: jest.fn(),
  smEvalData,
};

const store = testUtils.storeFake({
  passwordPolicyReducer,
});

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

// added to suppress warning
afterAll(() => {
  global.console.error.mockRestore();
});

describe.only('View Password Policy', () => {
  it('Display Edit button on screenn', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const editBtn = queryByRole('button', { name: translatedStrings?.editText });
    expect(editBtn).toBeInTheDocument();
  });

  it('Display Clone button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const cloneBtn = queryByRole('button', { name: translatedStrings?.cloneText });
    expect(cloneBtn).toBeInTheDocument();
  });

  it('display Delete button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteText });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('display Close button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const closeBtn = queryByRole('button', { name: translatedStrings?.closeText });
    expect(closeBtn).toBeInTheDocument();
  });

  it('On Delete button click popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteText });
    fireEvent.click(deleteBtn);
    const deletePopupTitle = queryByText(translatedStrings?.deleteTitle);
    expect(deletePopupTitle).toBeInTheDocument();
  });

  it('On Delete popup yes button click', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteText });
    fireEvent.click(deleteBtn);
    const deletePopupYesBtn = queryByText(translatedStrings?.deletePrimaryButton);
    expect(deletePopupYesBtn).toBeInTheDocument();
    fireEvent.click(deletePopupYesBtn);
    expect(props.deletePasswordPolicyById).toBeCalledTimes(1);
  });

  it('On Delete popup no button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings?.deleteText });
    fireEvent.click(deleteBtn);
    const deletePopupNoBtn = queryByText(translatedStrings?.noText);
    expect(deletePopupNoBtn).toBeInTheDocument();
  });

  it('On close button click go back', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/password-policies/view/:id">
        <WithRedux>
          <PasswordPolicyView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/password-policies/view/1',
      }
    );
    const closeBtn = queryByRole('button', { name: translatedStrings?.closeText });
    fireEvent.click(closeBtn);
    expect(props.history.goBack).toBeCalledTimes(1);
  });
});
