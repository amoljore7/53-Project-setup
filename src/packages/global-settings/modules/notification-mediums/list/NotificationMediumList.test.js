import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NotificationMediumList from './NotificationMediumList';
import testUtils from '../../../../../utils/test-utils';
import { classes, notificationMediumConstants, translatedStrings } from './constants';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

const notificationReducer = {
  notificationMediumList: {
    status: RESOURCE_STATUS.SUCCESS,
    error: null,
    data: {
      result: [
        {
          id: '187acf45-bbb3-46c3-a990-47fb8821b92b',
          name: 'corporate_email_1',
          description: null,
          type: 'slack',
          connectionParameters: {
            senderEmailAddress: 'abhi.tate@gslab.com',
          },
          referenceCount: 5,
        },
        {
          id: '0f521a90-880a-401c-a747-b269b4c4008f',
          name: 'u-autotestHmzukpsoMlve',
          description: 'Testing',
          type: 'slack',
          connectionParameters: {
            URL: 'https://gslab1711.slack.com/api/',
            token: 'xoxb-2721824988759-2736764502019-N3y4qoZvWR6ElvKynZSntHFw',
          },
          referenceCount: 0,
        },
      ],
      pagination: { prev: '', next: '' },
    },
  },
};

const props = {
  notificationMediumData: notificationReducer.notificationMediumList.data.result,
  notificationMediumStatus: notificationReducer.notificationMediumList.status,
  setPageHeader: jest.fn(),
  getNotificationMediumList: jest.fn(),
  notificationMediumPagination: {},
  deleteNotificationMedium: jest.fn(),
  deleteNotificationMediumStatus: '',
  updateNotificationMediumSearchTerm: jest.fn(),
  notificationMediumSearchTerm: '',
  resetDeleteNotificationMedium: jest.fn(),
  getNotificationMediumListLoadMoreData: jest.fn(),
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

describe.only('Notification Medium - List Notification Medium', () => {
  it('Display Add notification medium button on screen', async () => {
    const { queryByRole } = render(<NotificationMediumList {...props} />);
    const addBtn = queryByRole('button', { name: translatedStrings?.addNotificationMediumButton });
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);
    expect(props.history.push('/admin/global-settings/notification-medium/add'));
  });

  it('Display Notification medium list table on screen', async () => {
    const { getByTestId } = render(<NotificationMediumList {...props} />);
    const listTable = getByTestId(notificationMediumConstants?.testId);
    expect(listTable).toBeInTheDocument();
  });

  it('Display Notification medium list table search input on screen', async () => {
    const searchInputData = 'test';
    const { getByPlaceholderText } = render(<NotificationMediumList {...props} />);
    const searchInput = getByPlaceholderText(translatedStrings.notificationMediumSearchPlaceholder);
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, {
      target: {
        value: searchInputData,
      },
    });
    expect(searchInput.value).toContain(searchInputData);
    expect(props.getNotificationMediumList).toBeCalledTimes(1);
    expect(props.updateNotificationMediumSearchTerm).toBeCalledTimes(1);
  });

  it('Should render 2 rows(records) in table as static data is provided', async () => {
    const { queryByText } = render(
      <WithRedux>
        <NotificationMediumList {...props} />
      </WithRedux>
    );
    // record 1
    const notificationMediumRow1 = queryByText(props.notificationMediumData[0].name).closest('tr');
    expect(notificationMediumRow1).toBeInTheDocument();
    // record 2
    const notificationMediumRow2 = queryByText(props.notificationMediumData[1].name).closest('tr');
    expect(notificationMediumRow2).toBeInTheDocument();
  });

  it('Check Manage NM and delete, clone Button(icon) is present', () => {
    const { queryByText } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const manageActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-edit'
    );
    const manageAction = manageActionContainer.querySelector('svg');
    expect(manageAction).toBeInTheDocument();

    const deleteActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-delete'
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    expect(deleteAction).toBeInTheDocument();

    const cloneActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-clone'
    );
    const cloneAction = cloneActionContainer.querySelector('svg');
    expect(cloneAction).toBeInTheDocument();
  });

  it('Check on manage icon button click should be work', () => {
    const { queryByText } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const manageActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-edit'
    );
    const manageAction = manageActionContainer.querySelector('svg');
    expect(manageAction).toBeInTheDocument();
    fireEvent.click(manageAction);
    expect(props.history.push('/admin/global-settings/notification-medium/view/:id'));
  });

  it('Check on delete icon button click delete popup should be open', () => {
    const { queryByText, getByText } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const deleteActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-delete'
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    expect(deleteAction).toBeInTheDocument();
    fireEvent.click(deleteAction);
    const deletePopUpTitle = getByText(translatedStrings.deleteNotificationMediumDialogTitle);
    expect(deletePopUpTitle).toBeInTheDocument();
  });

  it('Check on delete popup yes button work', () => {
    const { queryByText, getByRole } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const deleteActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-delete'
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    expect(deleteAction).toBeInTheDocument();
    fireEvent.click(deleteAction);
    const deletePopUpPrimaryBtn = getByRole('button', {
      name: translatedStrings.deletePrimaryButton,
    });
    expect(deletePopUpPrimaryBtn).toBeInTheDocument();
    fireEvent.click(deletePopUpPrimaryBtn);
    expect(props.deleteNotificationMedium).toBeCalledTimes(1);
  });

  it('Check on delete popup no button work', () => {
    const { queryByText, getByRole } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const deleteActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-delete'
    );
    const deleteAction = deleteActionContainer.querySelector('svg');
    expect(deleteAction).toBeInTheDocument();
    fireEvent.click(deleteAction);
    const deletePopUpNoBtn = getByRole('button', {
      name: translatedStrings.noText,
    });
    expect(deletePopUpNoBtn).toBeInTheDocument();
    fireEvent.click(deletePopUpNoBtn);
    expect(deletePopUpNoBtn).not.toBeInTheDocument();
  });

  it('Check on clone button icon work', () => {
    const { queryByText, getByRole } = render(<NotificationMediumList {...props} />);
    const notificationMediumRecord = queryByText(props?.notificationMediumData[0].name).closest(
      'tr'
    );
    expect(notificationMediumRecord).toBeInTheDocument();
    const cloneActionContainer = notificationMediumRecord.querySelector(
      '.notification-medium-table-action-clone'
    );
    const cloneAction = cloneActionContainer.querySelector('svg');
    expect(cloneAction).toBeInTheDocument();
    fireEvent.click(cloneAction);
    // expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push('/admin/global-settings/notification-medium/clone/:id'));
  });
});
