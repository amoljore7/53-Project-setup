/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import CloneRole from './CloneRole';
import { translate } from '../../../externalization';
import { Route, Router } from 'react-router-dom';
import testUtils from '../../../../../utils/test-utils';

const props = {
  setPageHeader: jest.fn(),
  history: {},
  getRoleById: jest.fn(),
  roleDataStatus: RESOURCE_STATUS.INITIAL,
  roleData: {
    id: 'role_id',
    name: 'role_1',
    description: 'test role',
    permissions: [],
  },
  getConsumerData: jest.fn(),
  consumerList: {},
  getActionData: jest.fn(),
  actionStatus: RESOURCE_STATUS.INITIAL,
  actionList: {},
  getAllPermissionsData: jest.fn(),
  permissionListStatus: RESOURCE_STATUS.INITIAL,
  permissionList: {},
  getPermissionData: jest.fn(),
  permissionDataStatus: RESOURCE_STATUS.INITIAL,
  permissionData: {},
  openNotification: jest.fn(),
  resetPermissionData: jest.fn(),
  resetActionData: jest.fn(),
  CloneRoleStatus: RESOURCE_STATUS.INITIAL,
  CloneRoleError: {},
  resetCloneRoleData: jest.fn(),
  CloneRoleData: jest.fn(),
  addRoleError: '',
  getApplicationsList: jest.fn(),
  applicationsListData: [{ appContainerId: '*', applicationName: 'All' }],
  applicationsListStatus: RESOURCE_STATUS.INITIAL,
  initSpinnerOverlay: jest.fn(),
  resetRoleData: jest.fn(),
};

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

beforeEach(cleanup);

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const path = 'admin/policy-management/roles/clone/:id';
const route = 'admin/policy-management/roles/clone/1';

describe('Policy Management - Clone Role Input Form Page', () => {
  it('Should display the save role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const saveButton = getByRole('button', { name: translate('SAVE') });
    expect(saveButton).toBeInTheDocument();
  });

  it('Should display the cancel role button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const cancelButton = getByRole('button', { name: translate('CANCEL') });
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should display the switch to JSON button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON'),
    });
    expect(switchToJSONButton).toBeInTheDocument();
  });

  it('Should display the error snackbar if form gets error', async () => {
    props.CloneRoleError = { message: 'error message' };
    const { getByTestId } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} addRoleError="test" />
      </Route>,
      {
        route,
      }
    );
    expect(getByTestId('role-error')).toBeInTheDocument();
  });

  it('Should display the switch dialog', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    expect(getByText(translate('ROLES_MODULE.SWITCH_TO_JSON_HEADER'))).toBeInTheDocument();
  });

  it('Should display the cancel dialog', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const cancelButton = getByRole('button', { name: translate('CANCEL') });
    fireEvent.click(cancelButton);

    expect(getByText(translate('ROLES_MODULE.CANCEL_MODAL_TITLE'))).toBeInTheDocument();
  });

  it('Role form validations should be working', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const saveButton = getByRole('button', { name: translate('SAVE') });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translate('ROLES_MODULE.ROLE_NAME_VALIDATION'))).toBeInTheDocument();
    expect(getByText(translate('ROLES_MODULE.PERMISSION_VALIDATION'))).toBeInTheDocument();
  });

  it('Should display the Add Existing Permission Modal', async () => {
    const { getByRole, getAllByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addExistingPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
    });

    fireEvent.click(addExistingPermissionButton);
    const modalTitle = getAllByText(translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'));
    expect(modalTitle.length).toEqual(2);
  });

  it('Should display the add button inside Add Existing Permission Modal', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addExistingPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
    });

    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const addButton = getByRole('button', { name: translate('ADD') });
    expect(addButton).toBeInTheDocument();
  });

  it('Should display the cancel button inside Add Existing Permission Modal', async () => {
    const { getAllByRole, getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addExistingPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
    });

    await waitFor(() => fireEvent.click(addExistingPermissionButton));

    const cancelButton = getAllByRole('button', { name: translate('CANCEL') });
    expect(cancelButton.length).toEqual(2);
  });

  it('Should display the Cancel Dialog inside Add Existing Permission Modal', async () => {
    const { getAllByRole, getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addExistingPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
    });
    fireEvent.click(addExistingPermissionButton);
    const cancelButton = getAllByRole('button', { name: translate('CANCEL') })[1];
    fireEvent.click(cancelButton);

    expect(getByText(translate('ROLES_MODULE.CANCEL_MODAL_TITLE'))).toBeInTheDocument();
  });

  it('Form validations inside Add Existing Permission Modal should be working', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addExistingPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
    });
    fireEvent.click(addExistingPermissionButton);
    const addButton = getByRole('button', { name: translate('ADD') });

    await waitFor(() => fireEvent.click(addButton));

    expect(getByText(translate('ROLES_MODULE.PERMISSION_NAME_VALIDATION'))).toBeInTheDocument();
  });

  it('Should display the Add New Permission Modal', async () => {
    const { getByRole, getAllByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addNewPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
    });

    await waitFor(() => fireEvent.click(addNewPermissionButton));

    const modalTitle = getAllByText(translate('ROLES_MODULE.ADD_NEW_PERMISSION'));
    expect(modalTitle.length).toEqual(2);
  });

  it('Should display the add button inside Add New Permission Modal', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addNewPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
    });

    await waitFor(() => fireEvent.click(addNewPermissionButton));

    const addButton = getByRole('button', { name: translate('ADD') });
    expect(addButton).toBeInTheDocument();
  });

  it('Should display the cancel button inside Add New Permission Modal', async () => {
    const { getAllByRole, getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addNewPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
    });

    await waitFor(() => fireEvent.click(addNewPermissionButton));

    const cancelButton = getAllByRole('button', { name: translate('CANCEL') });
    expect(cancelButton.length).toEqual(2);
  });

  it('Should display the Cancel Dialog inside Add New Permission Modal', async () => {
    const { getAllByRole, getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addNewPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
    });
    fireEvent.click(addNewPermissionButton);
    const cancelButton = getAllByRole('button', { name: translate('CANCEL') })[1];
    fireEvent.click(cancelButton);
    expect(getByText(translate('ROLES_MODULE.CANCEL_MODAL_TITLE'))).toBeInTheDocument();
  });

  it('Form validations inside Add New Permission Modal should be working', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const addNewPermissionButton = getByRole('button', {
      name: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
    });
    fireEvent.click(addNewPermissionButton);
    const addButton = getByRole('button', { name: translate('ADD') });

    await waitFor(() => fireEvent.click(addButton));

    expect(getByText(translate('PERMISSION_MODULE.PERMISSION_CONSUMER'))).toBeInTheDocument();
    expect(getByText(translate('PERMISSION_MODULE.PERMISSION_RESOURCE'))).toBeInTheDocument();
  });

  it('Spinner should be visible and gets hidden', async () => {
    const { rerender } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} roleDataStatus={RESOURCE_STATUS.LOADING} />
      </Route>,
      {
        route,
      }
    );

    expect(props.initSpinnerOverlay).toBeCalledTimes(1);
    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: 'Loading Role Details...',
      open: true,
      size: 'medium',
    });

    rerender(
      <Router history={history}>
        <Route path={path}>
          <CloneRole {...props} roleDataStatus={RESOURCE_STATUS.SUCCESS} />
        </Route>
      </Router>,
      {
        route,
      }
    );

    expect(props.initSpinnerOverlay).toBeCalledTimes(2);
    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: 'Loading Role Details...',
      open: false,
      size: 'medium',
    });
  });

  it('Form should be pre-filled when role data is available', async () => {
    const { getByDisplayValue } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} roleDataStatus={RESOURCE_STATUS.SUCCESS} />
      </Route>,
      {
        route,
      }
    );
    const roleName = getByDisplayValue(`copy_of_${props.roleData.name}`);
    expect(roleName).toBeInTheDocument();
  });
});

describe('Policy Management - Clone Role JSON Form Page', () => {
  it('Should display the Edit Role JSON Form on switch', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });

    await waitFor(() => fireEvent.click(switchToJSONButton));

    expect(getByText(translate('ROLES_MODULE.JSON_TEXTAREA_LABEL'))).toBeInTheDocument();
  });

  it('Should display the Copy button in Edit Role JSON Form', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });

    await waitFor(() => fireEvent.click(switchToJSONButton));

    const copyButton = getByRole('button', { name: translate('COPY') });
    expect(copyButton).toBeInTheDocument();
  });

  it('Form validations in Edit Role JSON Form should be working', async () => {
    const { getByRole, getByText, container } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });
    fireEvent.click(switchToJSONButton);
    const textArea = container.querySelector('textarea');
    fireEvent.change(textArea, {
      target: {
        value: '',
      },
    });
    const saveButton = getByRole('button', { name: translate('SAVE') });

    await waitFor(() => fireEvent.click(saveButton));

    expect(getByText(translate('ROLES_MODULE.ROLE_JSON_VALIDATION'))).toBeInTheDocument();
  });

  it('Should display the switch to Form button', async () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });
    fireEvent.click(switchToJSONButton);
    const switchToFormButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_FORM'),
    });

    expect(switchToFormButton).toBeInTheDocument();
  });

  it('Should display the switch dialog', async () => {
    const { getByRole, getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);
    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });
    fireEvent.click(switchToJSONButton);
    const switchToFormButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_FORM'),
    });
    fireEvent.click(switchToFormButton);

    expect(getByText(translate('ROLES_MODULE.SWITCH_TO_FORM_HEADER'))).toBeInTheDocument();
  });

  it('Copy to clipboard should be working when data is present', async () => {
    const { getByRole, container } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);

    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });
    fireEvent.click(switchToJSONButton);

    const copyButton = getByRole('button', { name: translate('COPY') });
    const textArea = container.querySelector('textarea');
    fireEvent.change(textArea, {
      target: {
        value: 'test',
      },
    });

    fireEvent.click(copyButton);
    expect(props.openNotification).toBeCalledTimes(1);
  });

  it('Copy to clipboard should be not work when there is no data', async () => {
    const { getByRole, container } = testUtils.renderWithRouter(
      <Route path={path}>
        <CloneRole {...props} />
      </Route>,
      {
        route,
      }
    );
    const switchButton = getByRole('button', { name: translate('ROLES_MODULE.SWITCH_TO_JSON') });
    fireEvent.click(switchButton);

    const switchToJSONButton = getByRole('button', {
      name: translate('ROLES_MODULE.SWITCH_TO_JSON_BTN'),
    });
    fireEvent.click(switchToJSONButton);

    const copyButton = getByRole('button', { name: translate('COPY') });
    const textArea = container.querySelector('textarea');
    fireEvent.change(textArea, {
      target: {
        value: '',
      },
    });

    fireEvent.click(copyButton);
    expect(props.openNotification).toBeCalledTimes(0);
  });
});
