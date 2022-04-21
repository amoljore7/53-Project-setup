/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import StaticSecretTemplateView from './StaticSecretTemplateView';
import { RESOURCE_STATUS, ALLOW } from '../../../../../utils/common-constants';
import testUtils from '../../../../../utils/test-utils';
import { Route } from 'react-router-dom';
import { translatedStrings } from './constants';
import { staticSecretTemplateActions } from '../../../../../components/batch-eval/constants';

const smEvalData = {
  [staticSecretTemplateActions.create]: ALLOW,
  [staticSecretTemplateActions.update]: ALLOW,
  [staticSecretTemplateActions.delete]: ALLOW,
  [staticSecretTemplateActions.read]: ALLOW,
  [staticSecretTemplateActions.list]: ALLOW,
};

const props = {
  secretViewStatus: RESOURCE_STATUS.INITIAL,
  secretViewData: {
    id: '1bcc1159-e785-4437-a26f-128bb3f48b01',
    secretType: 'TEST_10',
    description: 'MySQL database parameters',
    rotationInterval: 30,
    passwordPolicyId: 'N/A',
    parameters: [
      {
        name: 'url',
        description: 'DB Hostname',
        mask: false,
        required: true,
      },
      {
        name: 'username',
        description: 'DB Username',
        mask: false,
        required: true,
      },
      {
        name: 'password',
        description: 'DB Password',
        mask: true,
        required: true,
      },
    ],
  },
  deleteSecretStatus: RESOURCE_STATUS.INITIAL,
  getSecretById: jest.fn(),
  deleteStaticSecretById: jest.fn(),
  resetSecretData: jest.fn(),
  openNotification: jest.fn(),
  setPageHeader: jest.fn(),
  match: { url: '' },
  history: { push: jest.fn(), goBack: jest.fn() },
  spinnerOverlay: jest.fn(),
  getPwdPoliciesList: jest.fn(),
  smEvalData,
};

const path = '/admin/secret-manager/vault/static-secret/view/:id';
const route = '/admin/secret-manager/vault/static-secret/view/1bcc1159-e785-4437-a26f-128bb3f48b01';

beforeEach(cleanup);

describe.only('Static Secret Template', () => {
  it('Should display Edit Button', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const editButton = queryByRole('button', { name: translatedStrings.editButtonText });
    expect(editButton).toBeInTheDocument();
  });

  it('Should display Clone Button', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const cloneButton = queryByRole('button', { name: translatedStrings.cloneButtonText });
    expect(cloneButton).toBeInTheDocument();
  });

  it('Should display Delete Button', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const deleteButton = queryByRole('button', { name: translatedStrings.deleteButtonText });
    expect(deleteButton).toBeInTheDocument();
  });

  it('Modal Should be open on click of Delete Button', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );
    let modalTitle = queryByText(translatedStrings.deleteSecretTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const deleteButton = queryByRole('button', { name: translatedStrings.deleteButtonText });
    await waitFor(() => fireEvent.click(deleteButton));

    modalTitle = queryByText(translatedStrings.deleteSecretTitle);
    expect(modalTitle).toBeInTheDocument();
  });

  it('Yes, Delete Button of Delete Modal Should be working', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const deleteButton = queryByRole('button', { name: translatedStrings.deleteButtonText });
    await waitFor(() => fireEvent.click(deleteButton));

    const modalDeleteButton = queryByRole('button', { name: translatedStrings.deleteYesLabel });
    expect(props.deleteStaticSecretById).toBeCalledTimes(0);
    fireEvent.click(modalDeleteButton);
    expect(props.deleteStaticSecretById).toBeCalledTimes(1);
  });

  it('No Button of Delete Modal Should be working', async () => {
    const { queryByRole, queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    let modalTitle = queryByText(translatedStrings.deleteSecretTitle);
    expect(modalTitle).not.toBeInTheDocument();

    const deleteButton = queryByRole('button', { name: translatedStrings.deleteButtonText });
    await waitFor(() => fireEvent.click(deleteButton));

    const noDeleteButtonmodal = queryByRole('button', { name: translatedStrings.deleteNoLabel });
    fireEvent.click(noDeleteButtonmodal);

    modalTitle = queryByText(translatedStrings.deleteSecretTitle);
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('Should display Close Button', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const closeButton = queryByRole('button', { name: translatedStrings.closeButtonText });
    expect(closeButton).toBeInTheDocument();
  });

  it('Close Button Should be Working', async () => {
    const { queryByRole } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );

    const closeButton = queryByRole('button', { name: translatedStrings.closeButtonText });

    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(props.history.push).toBeCalled();
  });

  it('Static Secret Template Data loading spinner with appropriate message', async () => {
    testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} secretViewStatus={RESOURCE_STATUS.LOADING} />
      </Route>,
      {
        route,
      }
    );
    expect(props.spinnerOverlay).toBeCalledWith({
      message: translatedStrings.loadingSecretTemplate,
      open: true,
      size: 'medium',
    });
  });

  it('Static Secret Template Delete spinner with appropriate message', async () => {
    testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} deleteSecretStatus={RESOURCE_STATUS.LOADING} />
      </Route>,
      {
        route,
      }
    );
    expect(props.spinnerOverlay).toBeCalledWith({
      message: translatedStrings.deleteLoadingMessage,
      open: true,
      size: 'medium',
    });
  });

  it('Form should be filled data present in state', async () => {
    const { queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );
    const secretTemplateName = queryByText(props.secretViewData.secretType);
    expect(secretTemplateName).toBeInTheDocument();
    const description = queryByText(props.secretViewData.description);
    expect(description).toBeInTheDocument();
    const secretRotationInterval = queryByText(props.secretViewData.rotationInterval);
    expect(secretRotationInterval).toBe;
  });

  it('Should render fileds(parameters) in table', async () => {
    const { getByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );
    const firstField = getByText(props.secretViewData.parameters[0].name).closest('tr');
    expect(firstField).toBeInTheDocument();

    const totalCols = firstField.querySelectorAll('td');

    const feildName = totalCols[0];
    expect(feildName.innerHTML).toBe(props.secretViewData.parameters[0].name);

    const fieldDescription = totalCols[1];
    expect(fieldDescription.innerHTML).toBe(props.secretViewData.parameters[0].description);

    const isMandatory = totalCols[3];
    expect(isMandatory.innerHTML).toBe(
      `${
        props.secretViewData.parameters[0].required ? translatedStrings.yes : translatedStrings.no
      }`
    );

    const isMask = totalCols[4];
    expect(isMask.innerHTML).toBe(
      `${props.secretViewData.parameters[0].mask ? translatedStrings.yes : translatedStrings.no}`
    );

    const viewFieldDetails = totalCols[5];
    expect(viewFieldDetails.innerHTML).not.toBeNull();
  });

  it('Should render fileds(parameters) in sidebar(view)', async () => {
    const { getByText, queryByText } = testUtils.renderWithRouter(
      <Route path={path}>
        <StaticSecretTemplateView {...props} />
      </Route>,
      {
        route,
      }
    );
    const firstField = getByText(props.secretViewData.parameters[0].name).closest('tr');
    expect(firstField).toBeInTheDocument();

    const viewIconButton = firstField.querySelector('svg');
    await waitFor(() => fireEvent.click(viewIconButton));

    const modalTitle = queryByText(
      `${translatedStrings.field} : ${props.secretViewData.parameters[0].name}`
    );

    expect(modalTitle).toBeInTheDocument();
  });
});
