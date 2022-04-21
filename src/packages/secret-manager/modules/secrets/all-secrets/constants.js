import { translate } from '../../../externalization';

export const classes = {
  secretsManagerContainer: 'manage-secrets-container',
  secretsPoliciesTabsContainer: 'secrets-policies-tabs-container',
  secretsPoliciesTabsWrapper: 'secrets-policies-tabs-wrapper',
  secretsTabButtonContainer: 'secrets-tab-button-container',
  secretsTabTableContainer: 'secrets-tab-table-container',
  nodesSecretsTreeContainer: 'nodes-secrets-tree-container',
  secretDetailsContainer: 'secret-details-container',
  detailsActionButtonsContainer: 'details-action-buttons-container',
  detailsActionButtonContainer: 'details-action-button-container',
  fieldWrapper: 'field-wrapper',
  fieldValueWrapper: 'field-value-wrapper',
  passwordTypeButtonsWrapper: 'password-type-buttons-wrapper',
  showButtonWrapper: 'show-button-wrapper',
  actionColumnContainer: 'action-column-container',
  editActionContainer: 'edit-action-container',
  actionContainer: 'action-container',
  disabledIcon: 'disabled-icon',
  policyActionItems: 'secrets-policy-action-items',
  policyActionToggle: 'secrets-policy-action-toggle',
  policyActionDeleteDisabled: 'secrets-policy-action-delete-disabled',
  policyActionToggleDisabled: 'secrets-policy-action-toggle-disabled',
  policyActionViewDisabled: 'secret-policy-action-view-disabled',
  policyActionView: 'secrets-policy-action-view',
  policyActionDelete: 'secrets-policy-action-delete',
  fieldSpacing: 'sm-approval-pending-popup-field-spacing',
  secretViewLayout: 'sm-secret-view-layout',
  secretViewSpacing: 'secret-view-spacing',
  secretViewLabel: 'secret-view-label',
  secretDetailsMessageContainer: 'message-container',
};

export const createNodeTypes = {
  CREATE_NODE_REQUEST: 'CREATE_NODE_REQUEST',
  CREATE_NODE_LOADING: 'CREATE_NODE_LOADING',
  CREATE_NODE_SUCCESS: 'CREATE_NODE_SUCCESS',
  CREATE_NODE_FAILURE: 'CREATE_NODE_FAILURE',
};

export const deleteNodeTypes = {
  DELETE_NODE_REQUEST: 'DELETE_NODE_REQUEST',
  DELETE_NODE_LOADING: 'DELETE_NODE_LOADING',
  DELETE_NODE_SUCCESS: 'DELETE_NODE_SUCCESS',
  DELETE_NODE_FAILURE: 'DELETE_NODE_FAILURE',
};

export const getImmediateNodesTypes = {
  GET_IMMEDIATE_NODES_REQUEST: 'GET_IMMEDIATE_NODES_REQUEST',
  GET_IMMEDIATE_NODES_LOADING: 'GET_IMMEDIATE_NODES_LOADING',
  GET_IMMEDIATE_NODES_SUCCESS: 'GET_IMMEDIATE_NODES_SUCCESS',
  GET_IMMEDIATE_NODES_FAILURE: 'GET_IMMEDIATE_NODES_FAILURE',
};

export const tabIndexType = {
  TAB_INDEX_REQUEST: 'TAB_INDEX_REQUEST',
};

export const deleteSuccessStatusCode = 204;
export const pageTitle = translate('BRITIVE_VAULT');
export const addString = 'add';
export const editString = 'edit';
export const viewString = 'view';
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
  addNodeActionTitle: translate('SECRETS_MODULE.ADD_NODE_ACTION_TITLE'),
  deleteNodeActionTitle: translate('SECRETS_MODULE.DELETE_NODE_ACTION_TITLE'),
  secretTabTitle: translate('SECRETS_MODULE.SECRET_TAB_TITLE'),
  secretDetailsTabTitle: translate('SECRETS_MODULE.SECRET_DETAILS_TAB_TITLE'),
  policyTabTitle: translate('SECRETS_MODULE.POLICY_TAB_TITLE'),
  secretsNameColumnHeader: translate('SECRETS_MODULE.SECRETS_NAME_HEADER'),
  secretsRotationPeriodColumnHeader: translate('SECRETS_MODULE.SECRETS_ROTATION_PERIOD_HEADER'),
  secretsCategoryColumnHeader: translate('SECRETS_MODULE.SECRETS_CATEGORY_HEADER'),
  secretsTypeColumnHeader: translate('SECRETS_MODULE.SECRETS_TYPE_HEADER'),
  secretsActionColumnHeader: translate('SECRETS_MODULE.SECRETS_ACTION_HEADER'),
  secretsSearchPlaceholder: translate('SECRETS_MODULE.SECRETS_SEARCH_PLACEHOLDER'),
  policiesSearchPlaceholder: translate('SECRETS_MODULE.POLICIES_SEARCH_PLACEHOLDER'),
  addSecretButtonText: translate('SECRETS_MODULE.ADD_SECRET_BUTTON_TEXT'),
  addPolicyButtonText: translate('SECRETS_MODULE.ADD_POLICY_BUTTON_TEXT'),
};

export const backToTopId = 'all-secrets-list-back-to-top';
