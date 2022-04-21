/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import EditStaticSecretTemplate from './EditStaticSecretTemplate';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { translatedStrings } from './constants';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';

const props = {
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  setPageHeader: jest.fn(),
  getPwdPoliciesList: jest.fn(),
  pwdPoliciesList: {},
  openNotification: jest.fn(),
  spinnerOverlay: jest.fn(),
  sstGetById: jest.fn(),
  sstEditRequest: jest.fn(),
  sstViewData: {},
  sstViewStatus: RESOURCE_STATUS.INITIAL,
  sstEditFormError: '',
  sstEditStatus: RESOURCE_STATUS.INITIAL,
  resetEditSecretTemplateData: jest.fn(),
};

beforeEach(cleanup);

describe('Secret Manager - Edit Static Secret Templates Page', () => {
  it('displays the Save SST button', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    const saveButton = getByRole('button', { name: translatedStrings.saveBtn });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays the Reset SST button', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    const saveButton = getByRole('button', { name: translatedStrings.resetBtn });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays the Cancel SST button', () => {
    const { getByRole } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    const saveButton = getByRole('button', { name: translatedStrings.cancelBtn });
    expect(saveButton).toBeInTheDocument();
  });

  it('Modal Should be open on click of Cancel Button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: translatedStrings.cancelBtn });
    await waitFor(() => fireEvent.click(cancelButton));

    modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).toBeInTheDocument();
  });

  it('Yes, Cancel Button of Cancel Modal Should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: translatedStrings.cancelBtn });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalDeleteButton = queryByRole('button', { name: translatedStrings.yesDiscard });
    expect(props.resetEditSecretTemplateData).toBeCalledTimes(0);
    fireEvent.click(modalDeleteButton);
    expect(props.resetEditSecretTemplateData).toBeCalledTimes(1);
  });

  it('Yes, Cancel Button history goBack should be work', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path="admin/secret-manager/vault/static-secret/edit/:id">
        <EditStaticSecretTemplate {...props} />
      </Route>,
      {
        route: 'admin/secret-manager/vault/static-secret/edit/1',
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: translatedStrings.cancelBtn });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalDeleteButton = queryByRole('button', { name: translatedStrings.yesDiscard });
    expect(props.history.goBack).toBeCalledTimes(0);
    fireEvent.click(modalDeleteButton);
    expect(props.history.goBack).toBeCalledTimes(0);
  });
});
