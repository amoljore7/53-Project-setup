import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import StaticSecretTemplateListing from './StaticSecretTemplateListing';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { translateStrings } from './constants';

const props = {
  history: {},
  match: {},
  setPageHeader: jest.fn(),
  getStaticSecretTableList: jest.fn(),
  tableList: [],
  tableStatus: RESOURCE_STATUS.INITIAL,
  deleteStaticSecret: jest.fn(),
  deleteStaticSecretStatus: RESOURCE_STATUS.INITIAL,
  tablePagination: {},
  updateStaticSecretTemplateListSearchTerm: jest.fn(),
  tableSearchTerm: '',
  getStaticSecretTableLoadMoreList: jest.fn(),
  smEvalData: {
    'sm.secrettemplate.create': 'Allow',
    'sm.secrettemplate.update': 'Allow',
    'sm.secrettemplate.delete': 'Allow',
    'sm.secrettemplate.read': 'Allow',
    'sm.secrettemplate.list': 'Allow',
  },
};

describe('Secret Manager - Static Secret Templates Page', () => {
  it('displays the add secret template button', async () => {
    const { getByRole } = render(<StaticSecretTemplateListing {...props} />);
    const addButton = getByRole('button', { name: translateStrings.addSecretTxt });
    expect(addButton).toBeInTheDocument();
  });

  it('displays the secret template table list', async () => {
    const { getByTestId } = render(<StaticSecretTemplateListing {...props} />);
    const secretTemplateTable = getByTestId('secret-template-table');
    expect(secretTemplateTable).toBeInTheDocument();
  });

  it('displays the search field inside secret template table', async () => {
    const { getByPlaceholderText } = render(<StaticSecretTemplateListing {...props} />);
    const searchField = getByPlaceholderText(translateStrings.staticSecretSearchText);
    expect(searchField).toBeInTheDocument();
  });

  it('search field inside secret template table should be working', async () => {
    const { getByPlaceholderText } = render(<StaticSecretTemplateListing {...props} />);
    const searchField = getByPlaceholderText(translateStrings.staticSecretSearchText);

    const inputValue = 'test';
    fireEvent.change(searchField, {
      target: {
        value: inputValue,
      },
    });

    expect(searchField.value).toEqual(inputValue);
    expect(props.getStaticSecretTableList).toBeCalledTimes(1);
  });

  it('displays the static record inside secret template table', async () => {
    props.tableStatus = RESOURCE_STATUS.SUCCESS;
    props.tableList = [
      {
        id: 'test',
        secretType: 'test',
        description: '',
        rotationInterval: 5,
      },
    ];
    const { getByTitle } = render(<StaticSecretTemplateListing {...props} />);
    const row = getByTitle(props.tableList[0].secretType).closest('tr');
    expect(row).toBeInTheDocument();
  });

  it('displays the loading for get secret template inside  secret template table', async () => {
    props.tableStatus = RESOURCE_STATUS.LOADING;
    const { getByText, rerender } = render(<StaticSecretTemplateListing {...props} />);
    const loading = getByText(translateStrings.loadingMessage);
    expect(loading).toBeInTheDocument();

    rerender(<StaticSecretTemplateListing {...props} tableStatus={RESOURCE_STATUS.SUCCESS} />);
    expect(loading).not.toBeInTheDocument();
  });

  it('displays the manage, clone and delete icon inside secret template table', async () => {
    props.tableStatus = RESOURCE_STATUS.SUCCESS;
    props.tableList = [
      {
        id: 'test',
        secretType: 'test',
        description: '',
        rotationInterval: 5,
      },
    ];
    const { getByTitle } = render(<StaticSecretTemplateListing {...props} />);
    const row = getByTitle(props.tableList[0].secretType).closest('tr');

    const manageActionContainer = row.querySelector('.static-secret-action-edit');
    const manageIcon = manageActionContainer.querySelector('svg');
    expect(manageIcon).toBeInTheDocument();

    const deleteActionContainer = row.querySelector('.static-secret-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('displays the delete dialog on clicking of delete icon inside secret template table', async () => {
    props.tableStatus = RESOURCE_STATUS.SUCCESS;
    props.tableList = [
      {
        id: 'test',
        secretType: 'test',
        description: '',
        rotationInterval: 5,
      },
    ];
    const { getByTitle, getByText } = render(<StaticSecretTemplateListing {...props} />);
    const row = getByTitle(props.tableList[0].secretType).closest('tr');
    const deleteActionContainer = row.querySelector('.static-secret-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const deleteDialog = getByText(translateStrings.deleteSecretTitle);
    expect(deleteDialog).toBeInTheDocument();
  });

  it('Yes click inside Delete Dialog should be working', async () => {
    props.tableStatus = RESOURCE_STATUS.SUCCESS;
    props.tableList = [
      {
        id: 'test',
        secretType: 'test',
        description: '',
        rotationInterval: 5,
      },
    ];
    const { getByTitle, getByRole } = render(<StaticSecretTemplateListing {...props} />);
    const row = getByTitle(props.tableList[0].secretType).closest('tr');
    const deleteActionContainer = row.querySelector('.static-secret-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const yesButton = getByRole('button', { name: translateStrings.deleteYesLabel });
    fireEvent.click(yesButton);
    expect(props.deleteStaticSecret).toBeCalledTimes(1);
  });

  it('No click inside Delete Dialog should be working', async () => {
    props.tableStatus = RESOURCE_STATUS.SUCCESS;
    props.tableList = [
      {
        id: 'test',
        secretType: 'test',
        description: '',
        rotationInterval: 5,
      },
    ];
    const { getByTitle, getByRole } = render(<StaticSecretTemplateListing {...props} />);
    const row = getByTitle(props.tableList[0].secretType).closest('tr');
    const deleteActionContainer = row.querySelector('.static-secret-action-delete');
    const deleteIcon = deleteActionContainer.querySelector('svg');
    fireEvent.click(deleteIcon);

    const noButton = getByRole('button', { name: translateStrings.deleteNoLabel });
    fireEvent.click(noButton);
    expect(noButton).not.toBeInTheDocument();
  });
});
