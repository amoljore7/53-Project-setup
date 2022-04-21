import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import EditNotificationMedium from './EditNotificationMedium';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
const notificationReducer = {
  editNotificationMedium: {
    status: RESOURCE_STATUS.INITIAL,
    error: {
      message: 'errorEditTest',
    },
    data: {},
  },
};

const props = {
  editNotificationMediumData: notificationReducer.editNotificationMedium.data,
  editNotificationMediumStatus: notificationReducer.editNotificationMedium.status,
  editNotificationMediumError: notificationReducer.editNotificationMedium.error,
  setPageHeader: jest.fn(),
  postNotificationMediumData: jest.fn(),
  resetNotificationMediumData: jest.fn(),
  getNotificationMediumById: jest.fn(),
  resetEditNotificationMediumData: jest.fn(),
  initSpinnerOverlay: jest.fn(),
  openNotification: jest.fn(),
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

describe.only('Notification Medium - Edit Notification Medium', () => {
  it('Display Save notification medium button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const saveBtn = queryByRole('button', { name: translatedStrings?.saveButton });
    expect(saveBtn).toBeInTheDocument();
  });

  it('On Save button popup', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const saveBtn = queryByRole('button', { name: translatedStrings.saveButton });
    fireEvent.click(saveBtn);
    let saveBtnPopup = queryByText(translatedStrings.saveDialogTitle);
    expect(saveBtnPopup).toBeInTheDocument();
    let savePrimaryBtn = queryByText(translatedStrings.saveDialogPrimaryButton);
    expect(savePrimaryBtn).toBeInTheDocument();
    fireEvent.click(savePrimaryBtn);
    expect(props.postNotificationMediumData).toBeCalledTimes(1);
  });

  it('On Save button popup Cancel button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const saveBtn = queryByRole('button', { name: translatedStrings.saveButton });
    fireEvent.click(saveBtn);
    let saveSecondaryBtn = queryByText(translatedStrings.saveDialogSecondaryButton);
    expect(saveSecondaryBtn).toBeInTheDocument();
    fireEvent.click(saveSecondaryBtn);
    expect(saveSecondaryBtn).not.toBeInTheDocument();
  });

  it('Display Reset notification medium button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings?.resetButton });
    expect(resetBtn).toBeInTheDocument();
  });

  it('On Reset button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButton });
    fireEvent.click(resetBtn);
    let resetBtnPopup = queryByText(translatedStrings.resetDialogTitle);
    expect(resetBtnPopup).toBeInTheDocument();
  });

  it('Button(No Keep Changes) on Reset button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButton });
    fireEvent.click(resetBtn);
    let noKeepChangesBtn = queryByText(translatedStrings.resetDialogSecondaryButton);
    expect(noKeepChangesBtn).toBeInTheDocument();
    fireEvent.click(noKeepChangesBtn);
    noKeepChangesBtn = queryByText(translatedStrings.resetDialogSecondaryButton);
    expect(noKeepChangesBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, reset all fields) on Reset button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const resetButton = queryByRole('button', { name: translatedStrings.resetButton });
    fireEvent.click(resetButton);
    const yesResetAllBtn = queryByText(translatedStrings.resetDialogPrimaryButton);
    fireEvent.click(yesResetAllBtn);
    expect(props.getNotificationMediumById).toBeCalledTimes(2);
  });

  it('display Cancel button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings?.cancelButton });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    let cancelBtnPopup = queryByText(translatedStrings.cancelDialogTitle);
    expect(cancelBtnPopup).not.toBeInTheDocument();
    fireEvent.click(cancelBtn);
    cancelBtnPopup = queryByText(translatedStrings.cancelDialogTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelBtn);
    let noBtn = queryByText(translatedStrings.noButton);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.noButton);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Discard Without Saving) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButton });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(translatedStrings.cancelDialogPrimaryButton);
    fireEvent.click(yesBtn);
    expect(props.history.push('/admin/global-settings/notification-medium'));
  });

  it('notification medium error snackbar should be working', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/edit/:id">
        <WithRedux>
          <EditNotificationMedium {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/edit/1',
      }
    );
    const errorSnackBarTitle = getByText(translatedStrings.errorSnackbarTitle);
    expect(errorSnackBarTitle).toBeInTheDocument();
  });
});
