/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import AddStaticSecretTemplate from './AddStaticSecretTemplate';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { translatedStrings } from './constants';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';

const path = '/admin/secret-manager/vault/static-secret/add';
const route = '/admin/secret-manager/vault/static-secret/add';

const props = {
  // history: {},
  // match: {},
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  setPageHeader: jest.fn(),
  sstPostData: jest.fn(),
  getPwdPoliciesList: jest.fn(),
  pwdPoliciesList: {},
  openNotification: jest.fn(),
  sstAddFormError: '',
  sstAddStatus: RESOURCE_STATUS.INITIAL,
  spinnerOverlay: jest.fn(),
  resetAddStaticSecretData: jest.fn(),
};

beforeEach(cleanup);

describe('Secret Manager - Add Static Secret Templates Page', () => {
  it('displays the save secret template button', () => {
    const { getByRole } = render(<AddStaticSecretTemplate {...props} />);
    const saveButton = getByRole('button', { name: translatedStrings.saveBtn });
    expect(saveButton).toBeInTheDocument();
  });

  it('displays the cancel secret template button', () => {
    const { getByRole } = render(<AddStaticSecretTemplate {...props} />);
    const saveButton = getByRole('button', { name: translatedStrings.cancelBtn });
    expect(saveButton).toBeInTheDocument();
  });

  it('Modal Should be open on click of Cancel Button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <AddStaticSecretTemplate {...props} />
      </Route>,
      {
        route,
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
      <Route path={path}>
        <AddStaticSecretTemplate {...props} />
      </Route>,
      {
        route,
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: translatedStrings.cancelBtn });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalDeleteButton = queryByRole('button', { name: translatedStrings.yesDiscard });
    expect(props.resetAddStaticSecretData).toBeCalledTimes(0);
    fireEvent.click(modalDeleteButton);
    expect(props.resetAddStaticSecretData).toBeCalledTimes(1);
  });

  it('Yes, Cancel Button history goBack should be work', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <AddStaticSecretTemplate {...props} />
      </Route>,
      {
        route,
      }
    );
    let modalTitle = queryByText(translatedStrings.cancelDialogTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const cancelButton = queryByRole('button', { name: translatedStrings.cancelBtn });
    await waitFor(() => fireEvent.click(cancelButton));

    const modalDeleteButton = queryByRole('button', { name: translatedStrings.yesDiscard });
    expect(props.history.goBack).toBeCalledTimes(0);
    fireEvent.click(modalDeleteButton);
    expect(props.history.goBack).toBeCalledTimes(1);
  });
});
