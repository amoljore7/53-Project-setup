import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SecretsView from './SecretView';
import { Provider } from 'react-redux';
import testUtils from '../../../../../../utils/test-utils';
import { deleteIcon } from '../../../static-secret-template/list/constants';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';
import { translatedStringsForApprovalsModal } from '../secret-list/constants';
const store = testUtils.storeFake({});
const selectedItemAncestors = [
  {
    label: 'abc',
    hasChildren: true,
    details: {
      entityType: 'node',
    },
  },
];
const secretDetailErrorForApprovalRequest = {
  status: 403,
  data: {
    errorCode: 'PE-0011',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};

const secretDetailErrorWaitingForApproval = {
  status: 403,
  data: {
    errorCode: 'PE-0010',
    extraInfo: {
      userIds: ['q41ll9v78zfluhhsacez'],
    },
  },
};
const props = {
  getSecretDetails: jest.fn(),
  secretDetails: {
    name: 'Secret1',
    description: 'This is a secret',
    secretNature: 'shared',
    secretMode: '',
    metadata: {
      ['sm.node.create']: 'Allow',
      ['sm.node.delete']: 'Deny',
      ['sm.node.list']: 'Allow',
      ['sm.secret.update']: 'Deny',
    },
    value: {
      fieldName1: 'abc',
      fieldName2: 'xyz',
    },
  },
  deleteSecret: jest.fn(),
  secretDetailsError: '',
  secretTemplateDetails: {
    type: 'abc',
    rotationInterval: 10,
    parameters: [
      {
        name: 'fieldName1',
      },
      {
        name: 'fieldName2',
        mask: true,
      },
    ],
  },
  secretTemplateDetailsError: '',
  selectedItemAncestors: selectedItemAncestors,
  selectedSecretMetadata: {
    ['sm.node.create']: 'Allow',
    ['sm.node.delete']: 'Allow',
    ['sm.node.list']: 'Allow',
    ['sm.secret.update']: 'Allow',
  },
  backToList: jest.fn(),
  history: {
    push: jest.fn(),
  },
  secretDetailsStatus: RESOURCE_STATUS.SUCCESS,
  secretTemplateDetailsStatus: RESOURCE_STATUS.SUCCESS,
};

describe.only('Secret View Component test cases', () => {
  it('all the fields appear on the screen', async () => {
    const fieldWrapperClass = 'field-wrapper';
    render(
      <Provider store={store}>
        <SecretsView {...props} />
      </Provider>
    );
    const allFields = document.getElementsByClassName(fieldWrapperClass);
    expect(allFields.length).toEqual(8);
  });

  it('masked field values do not appear on the screen', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <SecretsView {...props} />
      </Provider>
    );
    expect(getByText('abc')).toBeInTheDocument();
    expect(queryByText('xyz')).toEqual(null);
  });

  it('edit and delete buttons appear on the screen', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SecretsView {...props} />
      </Provider>
    );
    expect(getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('delete modal appears on the screen', async () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <SecretsView {...props} />
      </Provider>
    );
    const deleteButton = getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(getByText('Delete Secret?')).toBeInTheDocument();
  });

  it('edit button redirects to edit page', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SecretsView {...props} />
      </Provider>
    );
    const editBtn = getByRole('button', { name: 'Edit' });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(props.history.push).toBeCalled();
  });

  it(' Approval Request popup appears on the screen', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SecretsView
          {...props}
          secretTemplateDetailsStatus={RESOURCE_STATUS.ERROR}
          secretDetailsStatus={RESOURCE_STATUS.ERROR}
          secretDetailsError={secretDetailErrorForApprovalRequest}
        />
      </Provider>
    );
    const sendRequestButton = getByRole('button', {
      name: translatedStringsForApprovalsModal.sendRequestButton,
    });
    await waitFor(() => fireEvent.click(sendRequestButton));
    expect(sendRequestButton).toBeInTheDocument();
  });

  it('waiting for approvals dialog appears the screen', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SecretsView
          {...props}
          secretTemplateDetailsStatus={RESOURCE_STATUS.ERROR}
          secretDetailsStatus={RESOURCE_STATUS.ERROR}
          secretDetailsError={secretDetailErrorWaitingForApproval}
        />
      </Provider>
    );
    expect(getByText('Waiting for Approval')).toBeInTheDocument();
  });
});
