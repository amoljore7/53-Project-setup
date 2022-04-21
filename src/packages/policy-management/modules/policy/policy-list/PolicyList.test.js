/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import PolicyList from './PolicyList';
import testUtils from '../../../../../utils/test-utils';
import { classes, routeToNameList, title, yesDeleteLabel } from './constants';
import { translate } from '../../../externalization';
import { policyListingPath } from '../../../../../utils/common-constants';

const usedSelectors = {
  backToTopButtonClass: 'bds-back-to-top-container',
  searchRole: 'searchbox',
  tableRowClass: 'bds-table-row',
  tableCell: 'bds-table-cell',
  toggleButtonClass: 'policy-action-toggle',
  deleteButtonClass: 'policy-action-delete',
  cloneButtonClass: 'policy-action-copy',
  manageButtonClass: 'policy-action-edit',
  dialogBoxQuery: 'div.heading-container',
  dialogBoxYesButtonQuery:
    'div.dialog-container > div.button-container > div:nth-child(2) > button',
  dialogBoxNoButtonQuery: 'div.dialog-container > div.button-container > div:nth-child(1) > button',
  dialogPopupClass: 'dialog-container',
};

const policyListReducer = {
  policyList: {
    loading: false,
    result: [
      {
        id: '1',
        name: 'Admin Policy 1',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
      },
      {
        id: '2',
        name: 'Admin Policy 2',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
      },
      {
        id: '3',
        name: 'Admin Policy 3',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
      },
      {
        id: '4',
        name: 'Admin Policy 4',
        description: '',
        isActive: true,
        isDraft: false,
        isReadOnly: false,
      },
    ],
    error: null,
    pagination: {
      next: '',
      prev: '',
    },
    searchTerm: '',
  },
};

const policyActions = {
  create: 'authz.policy.create',
  update: 'authz.policy.update',
  delete: 'authz.policy.delete',
  read: 'authz.policy.read',
};

const policyEvalData = {
  [policyActions.create]: 'Allow',
  [policyActions.update]: 'Allow',
  [policyActions.delete]: 'Allow',
  [policyActions.read]: 'Allow',
};

const props = {
  policyListState: policyListReducer.policyList,
  deletePolicyRequest: jest.fn(),
  togglePolicyRequest: jest.fn(),
  getPolicyListData: jest.fn(),
  setPageHeader: jest.fn(),
  history: {
    back: jest.fn(),
    push: jest.fn(),
  },
  match: {
    url: 'URL',
  },
  updatePolicyListSearchTerm: jest.fn(),
  getPolicyListLoadMoreData: jest.fn(),
  policyEvalData,
};

const store = testUtils.storeFake({
  policyListReducer,
});

// eslint-disable-next-line react/prop-types
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

describe('Policy Listing unit tests ', () => {
  it('Table with policy and search filter and back to top button on scroll', async () => {
    const { queryByRole } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );

    const search = queryByRole(usedSelectors.searchRole);
    expect(search).toBeInTheDocument();
    fireEvent.scroll(document.getElementsByClassName(classes.policyListContainer)[0], {
      target: { scrollY: 30 },
    });
    const BackToTopButton = document.getElementsByClassName(usedSelectors.backToTopButtonClass)[0];
    expect(BackToTopButton).toBeInTheDocument();
  });

  it('Table shows four rows', async () => {
    render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    expect(document.getElementsByClassName(usedSelectors.tableRowClass).length).toBe(4);
  });

  it('Searching updates search term in reducer and data is fetched', async () => {
    const { queryByRole } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const search = queryByRole(usedSelectors.searchRole);
    fireEvent.change(search, { target: { value: 'Admin' } });
    expect(props.updatePolicyListSearchTerm).toBeCalled();
    expect(props.getPolicyListData).toBeCalled();
  });

  it('Can toggle policies enable to disable?', async () => {
    const { getByTitle, getByText } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const toggleActionContainer = firstRow.querySelector(`.${usedSelectors.toggleButtonClass}`);
    const toggleIcon = toggleActionContainer.querySelector('svg');
    expect(toggleIcon).toBeInTheDocument();

    const deleteActionContainer = firstRow.querySelector(`.${usedSelectors.deleteButtonClass}`);
    const deleteIcon = deleteActionContainer.querySelector('svg');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(toggleIcon);

    const dialogBoxToggle = document.querySelector(usedSelectors.dialogBoxQuery);
    expect(dialogBoxToggle).toBeInTheDocument();

    const yesButton = getByText(translate('YES_DISABLE'));
    expect(yesButton).toBeInTheDocument();

    fireEvent.click(yesButton);
    expect(props.togglePolicyRequest).toBeCalled();
  });

  it('Can delete policies', () => {
    const { getByTitle, getByText } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const deleteActionContainer = firstRow.querySelector(`.${usedSelectors.deleteButtonClass}`);
    const deleteIcon = deleteActionContainer.querySelector('svg');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    const dialogBoxDelete = document.querySelector(usedSelectors.dialogBoxQuery);
    expect(dialogBoxDelete).toBeInTheDocument();

    const yesButton = getByText(yesDeleteLabel);
    expect(yesButton).toBeInTheDocument();

    fireEvent.click(yesButton);
    expect(props.deletePolicyRequest).toBeCalled();
  });

  it('Can Search policies', () => {
    const { queryByRole } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );

    const search = queryByRole(usedSelectors.searchRole);
    expect(search).toBeInTheDocument();

    fireEvent.change(search, { target: { value: policyListReducer.policyList.result[3].name } });
    expect(props.updatePolicyListSearchTerm).toBeCalled();
  });

  it('on clone action button click user should be navigated add page', async () => {
    const { getByTitle } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const cloneActionContainer = firstRow.querySelector(`.${usedSelectors.cloneButtonClass}`);
    const cloneIcon = cloneActionContainer.querySelector('svg');

    fireEvent.click(cloneIcon);

    expect(cloneIcon).toBeInTheDocument();
    expect(props.history.push).toBeCalledWith(
      `${policyListingPath}/clone/${policyListReducer.policyList.result[0].id}`
    );
  });

  it('on manage action button click user should be navigated to view page', async () => {
    const { getByTitle } = render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    const firstRow = getByTitle(policyListReducer.policyList.result[0].name).closest('tr');
    expect(firstRow).toBeInTheDocument();

    const viewActionContainer = firstRow.querySelector(`.${usedSelectors.manageButtonClass}`);
    const viewIcon = viewActionContainer.querySelector('svg');

    fireEvent.click(viewIcon);

    expect(viewIcon).toBeInTheDocument();
    expect(props.history.push).toBeCalledWith(
      `${policyListingPath}/view/${policyListReducer.policyList.result[0].id}`
    );
  });

  it('Should update the tile of page when page is loaded', async () => {
    render(
      <WithRedux>
        <PolicyList {...props} />
      </WithRedux>
    );
    expect(props.setPageHeader).toBeCalledWith(title, routeToNameList);
  });
});
