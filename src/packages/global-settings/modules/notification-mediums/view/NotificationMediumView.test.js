import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import NotificationMediumView from './NotificationMediumView';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';
import { translate } from '../../../externalization';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
const notificationReducer = {
  notificationMediumView: {
    status: RESOURCE_STATUS.INITIAL,
    error: {
      message: 'errorViewTest',
    },
    data: {
      type: 'slack',
    },
  },
};

const props = {
  notificationMediumData: notificationReducer.notificationMediumView.data,
  notificationMediumViewStatus: notificationReducer.notificationMediumView.status,
  setPageHeader: jest.fn(),
  fetchNotificationMediumData: jest.fn(),
  resetNotificationMediumView: jest.fn(),
  deleteNotificationMediumById: jest.fn(),
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

describe.only('Notification Medium - View Notification Medium', () => {
  it('Display Edit notification medium button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const editBtn = queryByRole('button', { name: translatedStrings?.editText });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(props.history.push('/admin/global-settings/notification-medium/edit/:id'));
  });

  it('Display Clone notification medium button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const cloneBtn = queryByRole('button', { name: translatedStrings.cloneText });
    expect(cloneBtn).toBeInTheDocument();
    fireEvent.click(cloneBtn);
    expect(props.history.push('/admin/global-settings/notification-medium/clone/:id'));
  });

  it('Display Delete notification medium button on screen', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteText });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('On delete button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteText });
    fireEvent.click(deleteBtn);
    let deleteBtnPopup = queryByText(translatedStrings.deleteTitle);
    expect(deleteBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Delete popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteText });
    fireEvent.click(deleteBtn);
    let noBtn = queryByText(translatedStrings.noText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.noText);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes) on Delete popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const deleteBtn = queryByRole('button', { name: translatedStrings.deleteText });
    fireEvent.click(deleteBtn);
    let yesDeleteBtn = queryByText(translatedStrings.deletePrimaryButton);
    expect(yesDeleteBtn).toBeInTheDocument();
    fireEvent.click(yesDeleteBtn);
    expect(props.deleteNotificationMediumById).toBeCalledTimes(1);
  });

  it('Display Name label notification medium on screen', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const mediumName = getByText(translate('NOTIFICATION_MEDIUM_MODULE.MEDIUM_NAME'));
    expect(mediumName).toBeInTheDocument();
  });

  it('Display Slack URL label notification medium on screen', async () => {
    props.notificationMediumData.type = 'slack';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/global-settings/notification-medium/view/:id">
        <WithRedux>
          <NotificationMediumView {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/global-settings/notification-medium/view/1',
      }
    );
    const slackUrl = getByText(translatedStrings.slackUrlLabel);
    expect(slackUrl).toBeInTheDocument();
  });
});
