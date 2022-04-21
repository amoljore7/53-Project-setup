import {
  deletePolicyAction,
  listPolicyAction,
  readPolicyAction,
  smConsumer,
  updatePolicyAction,
  createPolicyAction,
  userTagListAction,
  identityConsumer,
  tokensListAction,
  securityAdminConsumer,
  notificationManager,
} from '../../utils/common-constants';

export const ALLOW = 'Allow';

export const getBatchEvalTypes = {
  GET_BATCH_EVAL_REQUEST: 'GET_BATCH_EVAL_REQUEST',
  GET_BATCH_EVAL_LOADING: 'GET_BATCH_EVAL_LOADING',
  GET_BATCH_EVAL_COMPLETE: 'GET_BATCH_EVAL_COMPLETE',
};

export const policyActions = {
  create: createPolicyAction,
  update: updatePolicyAction,
  delete: deletePolicyAction,
  read: readPolicyAction,
  list: listPolicyAction,
};

export const roleActions = {
  create: 'authz.role.create',
  update: 'authz.role.update',
  delete: 'authz.role.delete',
  read: 'authz.role.read',
  list: 'authz.role.list',
};

export const permissionActions = {
  create: 'authz.permission.create',
  update: 'authz.permission.update',
  delete: 'authz.permission.delete',
  read: 'authz.permission.read',
  list: 'authz.permission.list',
};

export const passwordPolicyActions = {
  create: 'sm.passwordpolicy.create',
  update: 'sm.passwordpolicy.update',
  delete: 'sm.passwordpolicy.delete',
  read: 'sm.passwordpolicy.read',
  list: 'sm.passwordpolicy.list',
};

export const staticSecretTemplateActions = {
  create: 'sm.secrettemplate.create',
  update: 'sm.secrettemplate.update',
  delete: 'sm.secrettemplate.delete',
  read: 'sm.secrettemplate.read',
  list: 'sm.secrettemplate.list',
};

export const vaultActions = {
  create: 'sm.vault.create',
  update: 'sm.vault.update',
  delete: 'sm.vault.delete',
  read: 'sm.vault.read',
  list: 'sm.vault.list',
};
export const notificationMediumActions = {
  list: 'nm.notification.list',
};

export const policyActionsPayload = [
  {
    action: updatePolicyAction,
    resource: '*',
    consumer: 'authz',
  },
  {
    action: readPolicyAction,
    resource: '*',
    consumer: 'authz',
  },
  {
    action: deletePolicyAction,
    resource: '*',
    consumer: 'authz',
  },
  {
    action: createPolicyAction,
    resource: '*',
    consumer: 'authz',
  },
  {
    action: listPolicyAction,
    resource: '*',
    consumer: 'authz',
  },
];

export const roleActionsPayload = [
  {
    action: 'authz.role.update',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.role.read',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.role.delete',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.role.create',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.role.list',
    resource: '*',
    consumer: 'authz',
  },
];

export const permissionActionsPayload = [
  {
    action: 'authz.permission.update',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.permission.read',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.permission.delete',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.permission.create',
    resource: '*',
    consumer: 'authz',
  },
  {
    action: 'authz.permission.list',
    resource: '*',
    consumer: 'authz',
  },
];

export const passwordPolicyActionsPayload = [
  {
    action: 'sm.passwordpolicy.update',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.passwordpolicy.read',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.passwordpolicy.delete',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.passwordpolicy.create',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.passwordpolicy.list',
    resource: '*',
    consumer: smConsumer,
  },
];

export const staticSecretTemplateActionsPayload = [
  {
    action: 'sm.secrettemplate.update',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.secrettemplate.read',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.secrettemplate.delete',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.secrettemplate.create',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.secrettemplate.list',
    resource: '*',
    consumer: smConsumer,
  },
];

export const vaultActionsPayload = [
  {
    action: 'sm.vault.update',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.vault.read',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.vault.delete',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.vault.create',
    resource: '*',
    consumer: smConsumer,
  },
  {
    action: 'sm.vault.list',
    resource: '*',
    consumer: smConsumer,
  },
];

export const identitySecurityActionsPayload = [
  {
    action: userTagListAction,
    resource: '*',
    consumer: identityConsumer,
  },
  {
    action: tokensListAction,
    resource: '*',
    consumer: securityAdminConsumer,
  },
];

export const notificationMediumActionsPayload = [
  {
    action: 'nm.notification.list',
    resource: '*',
    consumer: notificationManager,
  },
];
