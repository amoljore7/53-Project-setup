import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import AddSecret from './AddSecret';
import { Route } from 'react-router-dom';
import { translatedStrings } from '../add/constants';
import testUtils from '../../../../../utils/test-utils';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
const secretsReducer = {
  addSecret: {
    status: RESOURCE_STATUS.INITIAL,
    error: {},
    data: {},
  },
};

const props = {
  newSecretError: 'test',
  setPageHeader: jest.fn(),
  createSecret: jest.fn(),
  resetSecretData: jest.fn(),
  staticSecretTemplateList: [
    {
      id: '00b098c6-3781-45d7-bd5f-89bf171fee51',
      secretType: 'p-autotestRvhdqgeyLbew',
      description: 'Secret template test description',
      rotationInterval: 30,
      parameters: [
        {
          name: 'username',
          description: 'Description',
          mask: true,
          required: false,
          type: 'singleLine',
        },
        {
          name: 'user2',
          description: 'Description',
          mask: true,
          required: true,
          type: 'singleLine',
        },
      ],
      passwordPolicyId: '89eaaed4-ab5b-4e46-863e-f97b5a35561c',
    },
    {
      id: '01910908-51bd-49fa-9d0c-057f6b10b08b',
      secretType: 'p-autotestXszoidqqIfex',
      description: 'Secret template test description',
      rotationInterval: 30,
      parameters: [
        {
          name: 'username',
          description: 'Description',
          mask: true,
          required: false,
          type: 'singleLine',
        },
        {
          name: 'user2',
          description: 'Description',
          mask: true,
          required: true,
          type: 'singleLine',
        },
      ],
      passwordPolicyId: '63a0c079-ab0c-40cd-aaea-abdf8d01616b',
    },
  ],
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
  secretTemplateDetailsStatus: 'INITIAL',
  staticSecretTemplateListStatus: 'INITIAL',
  vaultId: '1',
  history: {
    goBack: jest.fn(),
    push: jest.fn(),
  },
  location: {
    search: 'admin/secret-manager/vault/secrets/edit?path=/ibm-autotestDbksDhmt',
  },
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

describe('Add Secret - Add Secret', () => {
  it('Display Save button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const saveBtn = queryByRole('button', { name: translatedStrings.saveButtonText });
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    await waitFor(() => fireEvent.click(saveBtn));
    await new Promise((r) => setTimeout(r, 2000));
    expect(props.createSecret).not.toBeCalled();
  });

  it('page title Should be there', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    expect(props.setPageHeader).toBeCalledTimes(1);
  });

  it('Status change', async () => {
    props.staticSecretTemplateListStatus = 'ERROR';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    expect(props.history.push('/admin/secret-manager/vault/secrets'));
  });

  it('display Cancel button on screen', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings?.cancelButtonText });
    expect(cancelBtn).toBeInTheDocument();
  });

  it('On Cancel button popup should be open', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButtonText });
    fireEvent.click(cancelBtn);
    let cancelBtnPopup = queryByText(translatedStrings.cancelDialogTitle);
    expect(cancelBtnPopup).toBeInTheDocument();
  });

  it('Button(No) on Cancel button popup should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
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
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const cancelBtn = queryByRole('button', { name: translatedStrings.cancelButtonText });
    fireEvent.click(cancelBtn);
    const yesBtn = queryByText(translatedStrings.cancelDialogPrimaryButtonText);
    fireEvent.click(yesBtn);
    expect(yesBtn).not.toBeInTheDocument();
    expect(props.history.push('/admin/secret-manager/vault/secrets'));
  });

  it('Name label should be on screen', async () => {
    const { getByText, getByTestId } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const nameLabel = getByText(translatedStrings.nameLabel);
    expect(nameLabel).toBeInTheDocument();
    const textField = getByTestId('input-test-id');
    fireEvent.change(textField, {
      target: {
        value: 'test',
      },
    });
  });
  it('Description label should be on screen', async () => {
    const { getByText, container } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
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
  it('Add Secret error snackbar should be working', async () => {
    props.newSecretError = 'error message';
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const errorSnackBarTitle = getByText(translatedStrings.errorSnackbarTitle);
    expect(errorSnackBarTitle).toBeInTheDocument();
  });

  it('Auto complete Working', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
      }
    );
    const sstListAutoCompleteContainer = getByText(translatedStrings.secretTypeLabel);
    expect(sstListAutoCompleteContainer).toBeInTheDocument();
  });
  it('generate button', async () => {
    props.secretTemplateDetailsStatus = 'SUCCESS';
    let type = props?.secretTemplateDetails?.parameters[0]['type'];
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
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
      <Route path="admin/secret-manager/vault/secrets/add">
        <WithRedux>
          <AddSecret {...props} />
        </WithRedux>
      </Route>,
      {
        route: 'admin/secret-manager/vault/secrets/add',
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
