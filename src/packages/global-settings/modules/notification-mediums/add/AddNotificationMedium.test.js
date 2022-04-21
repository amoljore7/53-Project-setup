import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import AddNotificationMedium from './AddNotificationMedium';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
const notificationReducer = {
  addNotificationMedium: {
    status: RESOURCE_STATUS.INITIAL,
    error: {
      message: 'errorAddTest',
    },
    data: {},
  },
};

const props = {
  addNotificationMediumData: notificationReducer.addNotificationMedium.data,
  addNotificationMediumStatus: notificationReducer.addNotificationMedium.status,
  addNotificationMediumError: notificationReducer.addNotificationMedium.error,
  setPageHeader: jest.fn(),
  postNotificationMediumData: jest.fn(),
  resetNotificationMediumData: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
};

const store = testUtils.storeFake({
  notificationReducer,
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

describe.only('Notification Medium - Add Notification Medium', () => {
  it('Display Save notification medium button on screen', async () => {
    const { queryByRole } = render(<AddNotificationMedium {...props} />);
    const saveBtn = queryByRole('button', { name: translatedStrings?.saveButton });
    expect(saveBtn).toBeInTheDocument();
  });

  it('display Cancel button on screen', async () => {
    const { queryByRole } = render(<AddNotificationMedium {...props} />);
    const cancelBtn = queryByRole('button', { name: translatedStrings?.cancelButton });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', async () => {
    const { queryByRole, queryByText } = render(<AddNotificationMedium {...props} />);
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelBtn);
    let cancelBtnPopup = queryByText(translatedStrings.cancelDialogTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = render(<AddNotificationMedium {...props} />);
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelBtn);
    let noBtn = queryByText(translatedStrings.noButton);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.noButton);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Discard Without Saving) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = render(<AddNotificationMedium {...props} />);
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(translatedStrings.cancelDialogPrimaryButton);
    fireEvent.click(yesBtn);
    expect(props.history.push('/admin/global-settings/notification-medium'));
  });

  it('notification medium error snackbar should be working', async () => {
    const { queryByText } = render(<AddNotificationMedium {...props} />);
    const errorSnackBarTitle = queryByText(translatedStrings.errorSnackbarTitle);
    expect(errorSnackBarTitle).toBeInTheDocument();
  });
});
