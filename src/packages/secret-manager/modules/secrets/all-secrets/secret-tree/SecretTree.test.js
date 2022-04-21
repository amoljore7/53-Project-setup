import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import SecretsTree from './SecretTree';
import { translatedStrings } from './constants';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';

const usersData = { result: [] };

const url = { pathname: '/admin/secret-manager/vault/secrets/add' };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    allUsers: usersData.result,
  }),
  useDispatch: () => jest.fn(),
}));

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const props = {
  createNode: jest.fn(),
  getImmediateNodes: jest.fn(),
  saveSelectionAndExpansion: jest.fn(),
  treeData: {
    nodes: [
      {
        label: 'Node1',
        description: '',
        details: { entityType: 'node' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Add Folder' }, { title: 'Delete Folder' }],
      },
      {
        label: 'Node2',
        description: '',
        details: { entityType: 'node' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Add Folder' }, { title: 'Delete Folder' }],
      },
      {
        label: 'Node3',
        description: '',
        details: { entityType: 'node' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Add Folder' }, { title: 'Delete Folder' }],
      },
    ],
    leaves: [
      {
        label: 'Secret1',
        description: '',
        details: { entityType: 'secret' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Delete Secret' }],
      },
      {
        label: 'Secret2',
        description: '',
        details: { entityType: 'secret' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Delete Secret' }],
      },
      {
        label: 'Secret3',
        description: '',
        details: { entityType: 'secret' },
        metadata: {
          ['sm.node.create']: 'Allow',
          ['sm.node.delete']: 'Deny',
          ['sm.node.list']: 'Allow',
          ['sm.secret.update']: 'Deny',
        },
        actionItems: [{ title: 'Add Secret' }],
      },
    ],
  },
  deleteEntity: jest.fn(),
  vaultName: 'abc',
  selectedItemAncestors: [],
  parentsOfSelectedItem: [
    {
      label: 'abc',
      hasChildren: true,
      details: {
        entityType: 'node',
      },
    },
  ],
  expandedItems: [],
  selectionHandler: jest.fn(),
  history: {
    push: jest.fn(),
  },
  vaultId: '123',
  openNotification: jest.fn(),
  rootNodeMetadata: {
    ['sm.node.create']: 'Allow',
    ['sm.node.delete']: 'Allow',
    ['sm.node.list']: 'Allow',
    ['sm.secret.update']: 'Deny',
  },
};

describe.only('Secret Tree Component test cases', () => {
  it('root node appears on the screen', async () => {
    const { getByText } = render(<SecretsTree {...props} />);
    expect(getByText('abc')).toBeInTheDocument();
  });

  it('immediate nodes and secrets appear on the screen', async () => {
    const treeNodeDirIconClass = 'tree-node-dir-icon';
    const secretIconClass = 'tree-node-content-box-icon';
    render(<SecretsTree {...props} />);
    fireEvent.click(document.querySelector(`.${treeNodeDirIconClass} > svg`));
    const allNodes = document.getElementsByClassName(treeNodeDirIconClass);
    const allSecrets = document.getElementsByClassName(secretIconClass);
    expect(allNodes.length).toEqual(4);
    expect(allSecrets.length).toEqual(3);
  });

  it('overflow menu options appear on the screen', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText } = render(<SecretsTree {...props} />);
    fireEvent.mouseOver(document.getElementsByClassName(treeNodeClass)[0]);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    expect(getByText('Delete Folder')).toBeInTheDocument();
    expect(getByText('Add Folder')).toBeInTheDocument();
    expect(getByText('Add Secret')).toBeInTheDocument();
  });

  it('delete modal appears on the screen', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText } = render(<SecretsTree {...props} />);
    fireEvent.mouseOver(document.getElementsByClassName(treeNodeClass)[0]);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const deleteFolderMenuOption = getByText('Delete Folder');
    fireEvent.click(deleteFolderMenuOption);
    expect(getByText('Delete Folder?')).toBeInTheDocument();
  });

  it('add folder modal appears on the screen', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText } = render(<SecretsTree {...props} />);
    fireEvent.mouseOver(document.getElementsByClassName(treeNodeClass)[0]);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const addFolderMenuOption = getByText('Add Folder');
    fireEvent.click(addFolderMenuOption);
    expect(getByText('Add New Folder')).toBeInTheDocument();
  });

  it('Redirect to add secret page', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText } = render(<SecretsTree {...props} />);
    fireEvent.mouseOver(document.getElementsByClassName(treeNodeClass)[0]);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const addSecretMenuOption = getByText('Add Secret');
    fireEvent.click(addSecretMenuOption);
    expect(props.history.push).toBeCalled();
  });

  it('Yes delete button working on delete modal working correctly', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText, queryByRole, rerender } = render(<SecretsTree {...props} />);
    const record = document.getElementsByClassName(treeNodeClass)[0];
    fireEvent.mouseOver(record);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const deleteFolderMenuOption = getByText('Delete Folder');
    fireEvent.click(deleteFolderMenuOption);
    const yesDeletePopUpBtn = queryByRole('button', {
      name: translatedStrings.deleteNodeModalPrimaryBtn,
    });
    fireEvent.click(yesDeletePopUpBtn);
    expect(props.deleteEntity).toBeCalledTimes(1);
    rerender(<SecretsTree deleteNodeStatus={RESOURCE_STATUS.SUCCESS} {...props} />);
  });

  it('No button working on delete modal working correctly', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText, queryByRole } = render(<SecretsTree {...props} />);
    const record = document.getElementsByClassName(treeNodeClass)[0];
    expect(record).toBeInTheDocument();
    fireEvent.mouseOver(record);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const deleteFolderMenuOption = getByText('Delete Folder');
    fireEvent.click(deleteFolderMenuOption);
    const noDeletePopUpBtn = queryByRole('button', {
      name: translatedStrings.deleteNodeModalNoBtn,
    });
    fireEvent.click(noDeletePopUpBtn);
    expect(record).toBeInTheDocument();
  });

  it('Cancel button working on add folder modal working correctly', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText, queryByRole } = render(<SecretsTree {...props} />);
    const record = document.getElementsByClassName(treeNodeClass)[0];
    expect(record).toBeInTheDocument();
    fireEvent.mouseOver(record);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const addFolderMenuOption = getByText('Add Folder');
    fireEvent.click(addFolderMenuOption);
    const cancelPopUpBtn = queryByRole('button', {
      name: translatedStrings.addNewFolderModalCancelText,
    });
    fireEvent.click(cancelPopUpBtn);
    expect(getByText('Discard Changes?')).toBeInTheDocument();
  });

  it('Yes, Discard without saving button working on Cancel of add folder modal', async () => {
    const treeNodeClass = 'tree-node-parent-node-container';
    const overflowMenuIconClass = 'icon-wrapper';
    const { getByText, queryByRole } = render(<SecretsTree {...props} />);
    const record = document.getElementsByClassName(treeNodeClass)[0];
    expect(record).toBeInTheDocument();
    fireEvent.mouseOver(record);
    const overflowMenu = document.getElementsByClassName(overflowMenuIconClass)[0];
    fireEvent.click(overflowMenu);
    const addFolderMenuOption = getByText('Add Folder');
    fireEvent.click(addFolderMenuOption);
    const cancelPopUpBtn = queryByRole('button', {
      name: translatedStrings.addNewFolderModalCancelText,
    });
    fireEvent.click(cancelPopUpBtn);
    const discardBtn = queryByRole('button', {
      name: translatedStrings.cancelModalPrimaryBtn,
    });
    fireEvent.click(discardBtn);
    expect(discardBtn).not.toBeInTheDocument();
  });
});
