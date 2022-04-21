import { translate } from '../../../../externalization';

export const createNodeTypes = {
  CREATE_NODE_REQUEST: 'CREATE_NODE_REQUEST',
  CREATE_NODE_LOADING: 'CREATE_NODE_LOADING',
  CREATE_NODE_SUCCESS: 'CREATE_NODE_SUCCESS',
  CREATE_NODE_FAILURE: 'CREATE_NODE_FAILURE',
  CREATE_NODE_RESET: 'CREATE_NODE_RESET',
};

export const deleteNodeTypes = {
  DELETE_NODE_REQUEST: 'DELETE_NODE_REQUEST',
  DELETE_NODE_LOADING: 'DELETE_NODE_LOADING',
  DELETE_NODE_SUCCESS: 'DELETE_NODE_SUCCESS',
  DELETE_NODE_FAILURE: 'DELETE_NODE_FAILURE',
  DELETE_NODE_RESET: 'DELETE_NODE_RESET',
};

export const getImmediateNodesTypes = {
  GET_IMMEDIATE_NODES_REQUEST: 'GET_IMMEDIATE_NODES_REQUEST',
  GET_IMMEDIATE_NODES_LOADING: 'GET_IMMEDIATE_NODES_LOADING',
  GET_IMMEDIATE_NODES_SUCCESS: 'GET_IMMEDIATE_NODES_SUCCESS',
  GET_IMMEDIATE_NODES_FAILURE: 'GET_IMMEDIATE_NODES_FAILURE',
};

export const SAVE_SELECTION_AND_EXPANSION = 'SAVE_SELECTION_AND_EXPANSION';

export const deleteSuccessStatusCode = 204;
export const pageTitle = translate('BRITIVE_VAULT');
export const nodeCreatePermissionProperty = 'sm.node.create';
export const nodeDeletePermissionProperty = 'sm.node.delete';
export const nodeListPermissionProperty = 'sm.node.list';
export const secretUpdatePermissionProperty = 'sm.secret.update';
export const policyCreatePermissionProperty = 'authz.policy.create';
export const allowString = 'Allow';
export const denyString = 'Deny';
export const nodeString = 'node';
export const secretString = 'secret';

export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATOR'),
    route: '/admin',
  },
  {
    name: translate('SECRETS_MANAGER'),
    route: '/admin/secret-manager',
  },
  {
    name: translate('BRITIVE_VAULT'),
    route: '/admin/secret-manager/vault',
  },
];

export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';

export const translatedStrings = {
  addNewFolderModalTitle: translate('SECRETS_MODULE.ADD_NEW_FOLDER_MODAL_TITLE'),
  addNewFolderModalButtonText: translate('SECRETS_MODULE.ADD_NEW_FOLDER_MODAL_BUTTON_TEXT'),
  addNewFolderModalCancelText: translate('SECRETS_MODULE.ADD_NEW_FOLDER_MODAL_CANCEL_TEXT'),
  newFolderNameRequiredValidationMessage: translate(
    'SECRETS_MODULE.ADD_NEW_FOLDER_REQUIRED_NAME_VALIDATION_MESSAGE'
  ),
  cancelModalTitle: translate('SECRETS_MODULE.CANCEL_MODAL_TITLE'),
  cancelModalMessage: translate('SECRETS_MODULE.CANCEL_MODAL_MESSAGE'),
  cancelModalPrimaryBtn: translate('SECRETS_MODULE.CANCEL_MODAL_PRIMARY_BTN'),
  cancelModalNoBtn: translate('SECRETS_MODULE.CANCEL_MODAL_NO_BTN'),
  deleteNodeModalTitle: translate('SECRETS_MODULE.DELETE_NODE_MODAL_TITLE'),
  deleteNodeModalMessage: translate('SECRETS_MODULE.DELETE_NODE_MODAL_MESSAGE'),
  deleteNodeModalPrimaryBtn: translate('SECRETS_MODULE.DELETE_NODE_MODAL_PRIMARY_BTN'),
  deleteNodeModalNoBtn: translate('SECRETS_MODULE.DELETE_NODE_MODAL_NO_BTN'),
  deleteSecretModalTitle: translate('SECRETS_MODULE.DELETE_SECRET_MODAL_TITLE'),
  deleteSecretModalMessage: translate('SECRETS_MODULE.DELETE_SECRET_MODAL_MESSAGE'),
  addNodeActionTitle: translate('SECRETS_MODULE.ADD_NODE_ACTION_TITLE'),
  deleteNodeActionTitle: translate('SECRETS_MODULE.DELETE_NODE_ACTION_TITLE'),
  deleteSecretActionTitle: translate('SECRETS_MODULE.DELETE_SECRET_ACTION_TITLE'),
  editSecretActionTitle: translate('SECRETS_MODULE.EDIT_SECRET_ACTION_TITLE'),
  addSecretActionTitle: translate('SECRETS_MODULE.ADD_SECRET_ACTION_TITLE'),
  secretsTabTitle: translate('SECRETS_MODULE.SECRETS_TAB_TITLE'),
  policiesTabTitle: translate('SECRETS_MODULE.POLICIES_TAB_TITLE'),
  secretsNameColumnHeader: translate('SECRETS_MODULE.SECRETS_NAME_HEADER'),
  secretsRotationPeriodColumnHeader: translate('SECRETS_MODULE.SECRETS_ROTATION_PERIOD_HEADER'),
  secretsCategoryColumnHeader: translate('SECRETS_MODULE.SECRETS_CATEGORY_HEADER'),
  secretsTypeColumnHeader: translate('SECRETS_MODULE.SECRETS_TYPE_HEADER'),
  secretsActionColumnHeader: translate('SECRETS_MODULE.SECRETS_ACTION_HEADER'),
  secretsSearchPlaceholder: translate('SECRETS_MODULE.SECRETS_SEARCH_PLACEHOLDER'),
  policiesSearchPlaceholder: translate('SECRETS_MODULE.POLICIES_SEARCH_PLACEHOLDER'),
  addSecretButtonText: translate('SECRETS_MODULE.ADD_SECRET_BUTTON_TEXT'),
  addPolicyButtonText: translate('SECRETS_MODULE.ADD_POLICY_BUTTON_TEXT'),
  secretFolderAlreadyExists: translate('SECRETS_MODULE.SECRET_FOLDER_ALREADY_EXISTS'),
  folderName: translate('SECRETS_MODULE.FOLDER_NAME'),
  addPolicyActionItem: translate('POLICIES_MODULE.ADD_POLICY'),
};

export const spinnerSizeSmall = 'small';
export const defaultWidth = '448px';

export const adminSecretTreeConstants = {
  approvalRequiredErrorCode_11: 'PE-0011',
  pendingSecretErrorCode_10: 'PE-0010',
};
