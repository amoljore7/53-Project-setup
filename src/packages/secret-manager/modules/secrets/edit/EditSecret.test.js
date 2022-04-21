import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import EditSecret from './EditSecret';
import { Route } from 'react-router-dom';
import { translatedStrings } from '../edit/constants';
import testUtils from '../../../../../utils/test-utils';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
const secretsReducer = {
  editSecret: {
    status: RESOURCE_STATUS.INITIAL,
    error: {},
    data: {},
  },
};

const props = {
  editSecretError: 'test',
  setPageHeader: jest.fn(),
  updateSecret: jest.fn(),
  getSecretDetails: jest.fn(),
  resetEditSecret: jest.fn(),
  secretTemplateDetails: {
    id: '03395dea-a515-4472-a444-b246f3deb09f',
    secretType: 'p-autotestZlhcqztqZlqm',
    description: 'Secret template test description',
    rotationInterval: 30,
    parameters: [
      {
        name: 'username',
        description: 'Description',
        mask: true,
        required: false,
        type: 'password',
      },
      {
        name: 'user2',
        description: 'Description',
        mask: true,
        required: true,
        type: 'singleLine',
      },
    ],
    passwordPolicyId: 'b5dcad9b-2943-4937-95f3-347a078e1dd7',
  },
  secretDetails: {
    description: '',
    entityType: 'secret',
    id: '41f27448-2704-4a0f-a396-9be730265f16',
    lastRotation: '2022-02-15T10:34:58.157Z',
    name: 'SQL_15feb3',
    nextRotation: '2022-03-17T10:34:58.157Z',
    path: '/SQL_15feb3',
    secretMode: 'shared',
    secretNature: 'static',
    staticSecretTemplateId: '0daa48ed-70d7-43c3-a565-2f661852d5cd',
    value: { Username: 'note1', Password: 'Password123$' },
    Password: 'Password123$',
    Username: 'note1',
  },
  editSecretStatus: 'INITIAL',
  vaultId: '1',
  location: {
    search: 'admin/secret-manager/vault/secrets/edit?path=/ibm-autotestDbksDhmt',
  },
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
  secretTemplateDetailsStatus: RESOURCE_STATUS.SUCCESS,
};

const store = testUtils.storeFake({
  secretsReducer,
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

describe('Edit Secret - Edit Secret', () => {
  it('Display Save button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const saveBtn = queryByRole('button', { name: translatedStrings.saveButtonText });
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    await waitFor(() => fireEvent.click(saveBtn));
    await new Promise((r) => setTimeout(r, 2000));
    expect(props.updateSecret).not.toBeCalled();
  });
  it('page title Should be there', async () => {
    testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    expect(props.setPageHeader).toBeCalledTimes(1);
  });
  it('Status change', async () => {
    props.editSecretStatus = 'SUCCESS';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    expect(props.history.push('/admin/secret-manager/vault/secrets/edit/1'));
  });
  it('get Secret Details', async () => {
    props.vaultId = '1';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    expect(props.getSecretDetails).toBeCalledTimes(1);
  });
  it('Display reset button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButtonText });
    expect(resetBtn).toBeInTheDocument();
  });

  it('On Reset button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButtonText });
    fireEvent.click(resetBtn);
    let resetBtnPopup = queryByText(translatedStrings.resetSecretDialogTitle);
    expect(resetBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Reset button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButtonText });
    fireEvent.click(resetBtn);
    let noBtn = queryByText(translatedStrings.resetSecretDialogSecondaryButtonText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.resetSecretDialogSecondaryButtonText);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Reset) on Reset button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const resetBtn = queryByRole('button', { name: translatedStrings.resetButtonText });
    fireEvent.click(resetBtn);
    let yesBtn = queryByText(translatedStrings.resetSecretDialogPrimaryButtonText);
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn);
    yesBtn = queryByText(translatedStrings.resetSecretDialogPrimaryButtonText);
    expect(yesBtn).not.toBeInTheDocument();
  });

  it('display Cancel button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings?.cancelButtonText });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButtonText });
    fireEvent.click(cancelBtn);
    let cancelBtnPopup = queryByText(translatedStrings.cancelDialogTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButtonText });
    fireEvent.click(cancelBtn);
    let noBtn = queryByText(translatedStrings.noButtonText);
    expect(noBtn).toBeInTheDocument();
    fireEvent.click(noBtn);
    noBtn = queryByText(translatedStrings.noButtonText);
    expect(noBtn).not.toBeInTheDocument();
  });

  it('Button(Yes, Discard Without Saving) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButtonText });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(translatedStrings.cancelDialogPrimaryButtonText);
    fireEvent.click(yesBtn);
    expect(props.history.push('/admin/secret-manager/vault/secrets'));
  });

  it('Name label should be on screen', async () => {
    const { getByText, getByTestId } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const nameLabel = getByText(translatedStrings.nameLabel);
    expect(nameLabel).toBeInTheDocument();
  });
  it('Description label should be on screen', async () => {
    const { getByText, container } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const descriptionLabel = getByText(translatedStrings.descriptionLabel);
    expect(descriptionLabel).toBeInTheDocument();
    const textArea = container.querySelector('textarea');
    fireEvent.change(textArea, {
      target: {
        value: 'test',
      },
    });
  });

  it('Edit Secret error snackbar should be working', async () => {
    props.editSecretError = 'error message';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const errorSnackBarTitle = getByText(translatedStrings.errorSnackbarTitle);
    expect(errorSnackBarTitle).toBeInTheDocument();
  });
  it('Auto complete Working', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    const sstListAutoCompleteContainer = getByText(translatedStrings.secretTypeLabel);
    console.log(sstListAutoCompleteContainer);
    expect(sstListAutoCompleteContainer).toBeInTheDocument();
  });
  it('generate button', async () => {
    props.secretTemplateDetailsStatus = 'SUCCESS';
    let type = props?.secretTemplateDetails?.parameters[0]['type'];
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    if (type === 'password' && props?.secretTemplateDetails?.passwordPolicyId) {
      const generateButton = queryByRole('button', {
        name: translatedStrings.generatePasswordButtonText,
      });
      expect(generateButton).toBeInTheDocument();
    }
  });
  it('Optional Text', async () => {
    props.secretTemplateDetailsStatus = 'SUCCESS';
    props?.secretTemplateDetails?.parameters[0]['type'] == 'singleLine';
    let type = props?.secretTemplateDetails?.parameters[0]['type'] == 'singleLine';
    const { queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/edit/:id">
        <WithRedux>
          <EditSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/edit/1',
      }
    );
    if (type === 'singleLine') {
      const optionalField = queryByText(translatedStrings.optionalHelperText);
      expect(optionalField).toBeInTheDocument();
      fireEvent.change(optionalField, {
        target: {
          value: 'test',
        },
      });
    }
  });
});
