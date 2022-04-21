import ApiServices from '../utils/api-service';
import { PAGE_TOKEN, smConsumer, papServiceConsumer } from '../utils/common-constants';
import { getQueryParamsFromUrl } from '../utils/common-utils';

const headers = {
  'content-type': 'application/json',
};

// ROLES CRUD

export const createRole = async ({ data }) => {
  const response = await ApiServices.post('/api/v1/policy-admin/roles', JSON.parse(data), {
    headers,
  });
  return response.data;
};

export const getRoleById = async ({ roleId }) => {
  const response = await ApiServices.get(`/api/v1/policy-admin/roles/${roleId}`);
  return response?.data;
};

export const deleteRoleById = async ({ roleId }) => {
  const response = await ApiServices.delete(`/api/v1/policy-admin/roles/${roleId}`);
  return response?.data;
};

// here roleId can be both Id as well as name
export const editRoleById = async ({ roleId, data }) => {
  const response = await ApiServices.patch(`/api/v1/policy-admin/roles/${roleId}`, data);
  return response.data;
};

export const getRolesList = async (payload = {}) => {
  const params = {};
  if (payload?.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }
  const response = await ApiServices.get('/api/v1/policy-admin/roles', {
    headers,
    params,
  });
  return response.data;
};

//NOTE: Policy CRUD Services

const getPolicyRequestUrl = (consumer, consumerEntityId) => {
  if(consumer === papServiceConsumer) {
    return `/api/paps/${consumerEntityId}/policies`
  }
  return `/api/v1/policy-admin/policies`
}

export const createPolicy = async ({ data, resource, consumer, consumerEntityId }) => {
  const params = {};
  
  if (resource) {
    params.resource = resource;
  }
  if (consumer && consumer !== papServiceConsumer) {
    params.consumer = consumer;
  }

  const response = await ApiServices.post(getPolicyRequestUrl(consumer, consumerEntityId), data, {
    headers,
    params,
  });
  return response.data;
};

//policyEntity can be policyId or policyName
export const getPolicyByEntity = async (policyEntity, resourcePath, consumer, consumerEntityId) => {
  const params = {};
  if (resourcePath) {
    params.resource = resourcePath;
  }
  if (consumer && consumer !== papServiceConsumer) {
    params.consumer = consumer;
  }
  const response = await ApiServices.get(`${getPolicyRequestUrl(consumer, consumerEntityId)}/${policyEntity}`, {
    params,
  });
  return response.data;
};

export const deletePolicyId = async ({ id = '' , consumer, consumerEntityId} = {}) => {
  const deleteRoleResp = await ApiServices.delete(`${getPolicyRequestUrl(consumer, consumerEntityId)}/${id}`);
  return deleteRoleResp;
};

//policyEntity can be policyId or policyName
export const editPolicyByEntity = async (data, policyEntity, consumer, consumerEntityId) => {
  const response = await ApiServices.patch(`${getPolicyRequestUrl(consumer, consumerEntityId)}/${policyEntity}`, data, {
    headers,
  });
  return response.data;
};

export const getPolicyList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const policyListData = await ApiServices.get('/api/v1/policy-admin/policies', { params });
  return policyListData;
};

export const getSMPolicyList = async (payload = {}) => {
  const params = {};
  params.resource = '*';
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  params.consumer = smConsumer;
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const policyListData = await ApiServices.get('/api/v1/policy-admin/policies', { params });
  return policyListData;
};

export const editPolicySM = async (data, resource,entity) => {
  const { id } = data;
  const params = { consumer: smConsumer };
  if (resource) {
    params.resource = resource;
  }
  let response = null;
  
  if(entity){
    response = await ApiServices.patch(`/api/v1/policy-admin/policies/${entity}`, data, {
      params,
    });
  }else{
    response = await ApiServices.patch(`/api/v1/policy-admin/policies/${id}`, data, {
      params,
    });
  }
  return response.data;
 
};

export const deletePolicySM = async (payload = {}) => {
  const { id = '' } = payload;
  const params = { consumer: smConsumer };
  if (payload.resource) {
    params.resource = payload.resource;
  }
  const deleteRoleResp = await ApiServices.delete(`/api/v1/policy-admin/policies/${id}`, {
    params,
  });
  return deleteRoleResp;
};

export const fetchPolicyListSM = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  if (payload.resource) {
    params.resource = payload.resource;
  }
  params.consumer = smConsumer;
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const policyListData = await ApiServices.get('/api/v1/policy-admin/policies', { params });
  return policyListData;
};

export const getConsumerList = async () => {
  const consumerList = await ApiServices.get('/api/v1/policy-admin/consumers');
  return consumerList.data;
};

// Permission CRUD

export const getPermissionsList = async (payload = {}) => {
  const params = {};
  if (payload?.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }
  const response = await ApiServices.get('/api/v1/policy-admin/permissions', {
    headers,
    params,
  });
  return response.data;
};

export const getPermissionById = async (id) => {
  const response = await ApiServices.get(`/api/v1/policy-admin/permissions/${id}`, {
    headers,
  });
  return response.data;
};

export const getPermissionActions = async (consumer) => {
  const response = await ApiServices.get(
    `/api/v1/policy-admin/actions?filter=consumer%20eq%20${consumer}`,
    {
      headers,
    }
  );
  return response.data;
};

//NOTE: Permission CRUD Services

/***** Action List Api Call */
export const fetchActionsList = async (consumer) => {
  const actionList = await ApiServices.get(
    `/api/v1/policy-admin/actions?filter=consumer%20eq%20${consumer}`
  );
  return actionList.data;
};
/***** Application List Api Call */
export const fetchApplicationsList = async () => {
  const ApplicationsList = await ApiServices.get(`/api/apps?view=extended`);
  return ApplicationsList.data;
};
/***** Create Permission Api Call */
export const createPermission = async (payload) => {
  const create = await ApiServices.post(`/api/v1/policy-admin/permissions`, payload, {
    headers,
  });
  return create.status;
};
/***** Edit Permission Api Call */
export const editPermission = async (payload, id) => {
  const response = await ApiServices.patch(`/api/v1/policy-admin/permissions/${id}`, payload, {
    headers,
  });
  return response.data;
};
/***** Get Permissions List Api Call */
export const fetchPermissionTableList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }
  const tableList = await ApiServices.get('/api/v1/policy-admin/permissions', { params });
  return tableList.data;
};
/***** Delete Permission Api Call */
export const deletePermissions = async (id) => {
  const response = await ApiServices.delete(`/api/v1/policy-admin/permissions/${id}`);
  return response.status;
};
/***** Get Permission Details Api Call */
export const fetchViewPermissions = async (id) => {
  const viewPermissions = await ApiServices.get(`/api/v1/policy-admin/permissions/${id}`);
  return viewPermissions.data;
};
