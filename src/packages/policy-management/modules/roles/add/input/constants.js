import { translate } from '../../../../externalization';

export const classes = {
  roleInputFormContainer: 'role-input-form-container',
  roleInputSpacing: 'role-input-spacing',
  alignWithLoader: 'align-with-loader',
  formLoader: 'form-loader',
  addPermissionAction: 'add-permission-action',
  newPermissionSpace: 'new-permission-space',
  permissionTableSpacing: 'permission-table-spacing',
  permissionActionIcons: 'permission-action-icons',
  permissionActionEdit: 'permission-action-edit',
  permissionActionView: 'permission-action-view',
  permissionActionDelete: 'permission-action-delete',
  permissionModalScroll: 'permission-modal-scroll',
  permissionInputSpacing: 'permission-input-spacing',
  permissionDataLoader: 'permission-data-loader',
  formLoaderModal: 'form-loader-modal',
  viewPermissionModalLabel: 'view-permission-modal-label',
  viewPermissionModalValue: 'view-permission-modal-value',
  viewActionPill: 'view-action-pill',
  pillAdjust: 'pill-adjust',
  permissionEmptyError: 'permission-empty-error',
  permissionNameFieldContainer: 'permission-name-field-container',
  permissionNameLoaderContainer: 'permission-name-loader-container',
  readOnlyConsumer: 'read-only-consumer',
};

//Labels and Messages
export const translatedStrings = {
  roleLabel: translate('ROLES_MODULE.ROLE_LABEL'),
  descriptionLabel: translate('ROLES_MODULE.DESCRIPTION_LABEL'),
  descriptionHelperLabel: translate('ROLES_MODULE.DESCRIPTION_HELPER_LABEL'),
  permissionLabel: translate('ROLES_MODULE.PERMISSION_LABEL'),
  addExistingPermissionBtn: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
  addNewPermissionBtn: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
  permissionNameLabel: translate('ROLES_MODULE.PERMISSION_NAME_LABEL'),
  sourceLabel: translate('ROLES_MODULE.SOURCE_LABEL'),
  consumerLabel: translate('ROLES_MODULE.CONSUMER_LABEL'),
  actionLabel: translate('ROLES_MODULE.ACTION_LABEL'),
  resourceLabel: translate('ROLES_MODULE.RESOURCE_LABEL'),
  resourceHelperLabel: translate('ROLES_MODULE.RESOURCE_HELPER_LABEL'),
  actionColumn: translate('ROLES_MODULE.ACTION_COLUMN'),
  addNewPermissionTitle: translate('ROLES_MODULE.ADD_NEW_PERMISSION'),
  editPermissionTitle: translate('ROLES_MODULE.EDIT_PERMISSION_TITLE'),
  saveBtn: translate('SAVE'),
  resetBtn: translate('RESET'),
  cancelBtn: translate('CANCEL'),
  addBtn: translate('ADD'),
  addExistingPermissionTitle: translate('ROLES_MODULE.ADD_EXISTING_PERMISSION'),
  searchPermissionLabel: translate('ROLES_MODULE.SEARCH_PERMISSION_LABEL'),
  permissionTitle: translate('ROLES_MODULE.PERMISSION_TITLE'),
  deleteInlineNotification: translate('ROLES_MODULE.DELETE_INLINE_NOTIFICATION'),
  deletePermissionNotification: translate('ROLES_MODULE.DELETE_PERMISSION_NOTIFICATION'),
  addInlineNotification: translate('ROLES_MODULE.ADD_INLINE_NOTIFICATION'),
  addPermissionNotification: translate('ROLES_MODULE.ADD_PERMISSION_NOTIFICATION'),
  saveInlineNotification: translate('ROLES_MODULE.SAVE_INLINE_PERMISSION'),
  cancelModalTitle: translate('ROLES_MODULE.CANCEL_MODAL_TITLE'),
  cancelModalMessage: translate('ROLES_MODULE.CANCEL_MODAL_MESSAGE', {
    entity: 'permission',
  }),
  cancelModalPrimaryBtn: translate('ROLES_MODULE.CANCEL_MODAL_PRIMARY_BTN'),
  noBtn: translate('NO'),
  resetModalTitle: translate('ROLES_MODULE.RESET_MODAL_TITLE'),
  resetModalMessage: translate('ROLES_MODULE.RESET_MODAL_MESSAGE'),
  resetModalPrimaryBtn: translate('ROLES_MODULE.RESET_MODAL_PRIMARY_BTN'),
  resetModalSecondaryBtn: translate('ROLES_MODULE.RESET_MODAL_SECONDARY_BTN'),
  resetNotification: translate('ROLES_MODULE.RESET_NOTIFICATION'),
  saveModalTitle: translate('ROLES_MODULE.SAVE_MODAL_TITLE'),
  saveModalMessage: translate('ROLES_MODULE.SAVE_MODAL_MESSAGE'),
  saveModalPrimaryBtn: translate('ROLES_MODULE.SAVE_MODAL_PRIMARY_BTN'),
  deleteModalTitle: translate('ROLES_MODULE.DELETE_MODAL_TITLE'),
  deleteModalInlineMessage: translate('ROLES_MODULE.DELETE_MODAL_INLINE_MESSAGE'),
  deleteModalPermissionMessage: translate('ROLES_MODULE.DELETE_MODAL_PERMISSION_MESSAGE'),
  deleteModalPrimaryBtn: translate('ROLES_MODULE.DELETE_MODAL_PRIMARY_BTN'),
  permissionNameValidation: translate('ROLES_MODULE.PERMISSION_NAME_VALIDATION'),
  consumerValidation: translate('ROLES_MODULE.CONSUMER_VALIDATIONS'),
  resourcesValidation: translate('ROLES_MODULE.RESOURCE_VALIDATION'),
  actionsValidation: translate('ROLES_MODULE.ACTION_VALIDATION'),
  noneText: translate('NONE'),
  consumerPlaceholder: translate('ROLES_MODULE.CONSUMER_PLACEHOLDER'),
  searchPlaceholder: translate('SEARCH'),
  permissionDataLoader: translate('ROLES_MODULE.PERMISSION_LOADING'),
  editPermissionTooltip: translate('ROLES_MODULE.EDIT_PERMISSION_TITLE'),
  deletePermissionTooltip: translate('ROLES_MODULE.DELETE_PERMISSION_TOOLTIP'),
  viewPermissionTooltip: translate('PERMISSION_MODULE.VIEW_PERMISSION_TOOLTIP'),
  loadingPermissions: translate('PERMISSION_MODULE.PERMISSIONS_LOADING'),
};

//Used as a variable constant value in component
export const inlineType = 'Inline';
export const preDefinedType = 'Pre-defined';
export const newType = 'new';
export const existType = 'exist';
export const keyName = 'key';
export const viewFieldKey = 'view-field-';
export const pillKey = 'pill-';
export const viewPermissionLayout = [
  {
    key: 'name',
    label: 'Permission Name',
  },
  {
    key: 'source',
    label: 'Source',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'consumer',
    label: 'Consumer',
  },
  {
    key: 'resources',
    label: 'Resources',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export const addPermissionDetailsLayout = [
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'consumer',
    label: 'Consumer',
  },
  {
    key: 'resources',
    label: 'Resources',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export const validation = {
  permissionNameExit: translate('PERMISSION_MODULE.PERMISSION_NAME_EXIT'),
  permissionNameEnter: translate('PERMISSION_MODULE.PERMISSION_NAME_ENTER'),
  permissionConsumer: translate('PERMISSION_MODULE.PERMISSION_CONSUMER'),
  permissionResource: translate('PERMISSION_MODULE.PERMISSION_RESOURCE'),
  permissionResourceSelect: translate('PERMISSION_MODULE.PERMISSION_RESOURCE_SELECT'),
  permissionAction: translate('PERMISSION_MODULE.PERMISSION_ACTION'),
  descriptionMaxChar: translate('DESCRIPTION_MAX_CHAR'),
  inputNameMaxChar: translate('INPUT_NAME_MAX_CHAR'),
};

export const spinnerSizeSmall = 'small';
export const asterisk = '*';
