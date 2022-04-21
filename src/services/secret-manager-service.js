import ApiServices from '../utils/api-service';
import { getRequiredString, getQueryParamsFromUrl } from '../utils/common-utils';
import { active, PAGE_TOKEN } from '../utils/common-constants';

//NOTE: Common Headers Services
const headers = {
  'content-type': 'application/json',
};

export const getSecretDetails = async ({ parents, vaultId, data }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  params.path = requiredString;
  const response = await ApiServices.post(
    `/api/v1/secretmanager/vault/${vaultId}/accesssecrets`,
    data || {},
    { params }
  );

  return response.data;
};

export const fetchSecretDetails = async (payload) => {
  const { parentPath, vaultId } = payload;
  const params = {};
  params.path = parentPath;
  params.getmetadata = true;
  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};
// *************************************************************************************************************
//NOTE: Vault CRUD Services

/***** Create Vault Api Call */
export const createVault = async (payload) => {
  const create = await ApiServices.post(`/api/v1/secretmanager/vault`, payload, {
    headers,
  });
  return create.status;
};
/***** Get Notification List Api Call */
export const fetchNotificationMediumList = async () => {
  const response = await ApiServices.get('/api/v1/notification-service/notificationmediums');
  return response;
};
/***** Get Users Api Call */
export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User', {
    headers,
  });
  return (response?.data || []).filter((user) => user.status.toLowerCase() === active);
};
/***** Get Tags Api Call */
export const fetchTags = async () => {
  const response = await ApiServices.get('/api/user-tags', {
    headers,
  });
  return (response?.data || []).filter((tag) => tag.status.toLowerCase() === active);
};
/***** Get Channels Api Call */
export const fetchChannelList = async (channelId) => {
  const response = await ApiServices.get(
    `/api/v1/notification-service/notificationmediums/${channelId}/channels`
  );
  return response?.data || [];
};
/***** Edit Vault Api Call */
export const editVault = async (payload, id) => {
  const update = await ApiServices.patch(`/api/v1/secretmanager/vault/${id}`, payload, {
    headers,
  });
  return update;
};
/***** Delete Vault Api Call */
export const deleteVault = async (id) => {
  const response = await ApiServices.delete(`/api/v1/secretmanager/vault/${id}`);
  return response.data;
};
/***** Rotate Vault Api Call */
export const rotateVaultKey = async () => {
  const response = await ApiServices.post('/api/v1/secretmanager/keys/rotate', {
    headers,
  });
  return response;
};
// *************************************************************************************************************
//NOTE: SST CRUD Services

/***** Add SST Api Call */
export const addStaticSecret = async (data) => {
  const response = await ApiServices.post(
    '/api/v1/secretmanager/secret-templates/static',
    JSON.parse(data),
    {
      headers,
    }
  );
  return response.data;
};
/***** Get PwdPolicies on SST Api Call */
export const getPwdPolicies = async () => {
  const response = await ApiServices.get('/api/v1/secretmanager/pwdpolicies');
  return response.data;
};
/***** Get SST Details Api Call */
export const staticSecretTemplateByIdAPI = async (secretId) => {
  const response = await ApiServices.get(
    `/api/v1/secretmanager/secret-templates/static/${secretId}`
  );
  return response?.data;
};
/***** Edit SST Api Call */
export const editStaticSecretReq = async (data, id) => {
  const response = await ApiServices.patch(
    `/api/v1/secretmanager/secret-templates/static/${id}`,
    JSON.parse(data),
    {
      headers,
    }
  );
  return response.data;
};
/***** Get SST List Api Call */
export const staticSecretTemplateListAPI = async ({ search, next, filter = 'co' }) => {
  const params = {};
  if (search) {
    params.filter = `name%20${filter}%20'${search}'`;
  }
  if (next) {
    params.pageToken = getQueryParamsFromUrl(next, PAGE_TOKEN);
  }
  const tableList = await ApiServices.get('/api/v1/secretmanager/secret-templates/static', {
    params,
  });
  return tableList.data;
};
/***** Delete SST Api Call */
export const staticSecretTemplateDeleteAPI = async (id) => {
  const response = await ApiServices.delete(`/api/v1/secretmanager/secret-templates/static/${id}`);
  return response.status;
};
/*Add password policy api*/
export const addPasswordPolicy = async (passwordPolicyData) => {
  const response = await ApiServices.post('/api/v1/secretmanager/pwdpolicies', passwordPolicyData);
  return response.data;
};

/*Edit password policy api*/
export const editPasswordPolicy = async (passwordPolicyId, payloadData) => {
  const response = await ApiServices.patch(
    `/api/v1/secretmanager/pwdpolicies/${passwordPolicyId}`,
    payloadData
  );
  return response.data;
};

/*Password policy list api*/
export const fetchPasswordPolicyList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const response = await ApiServices.get('/api/v1/secretmanager/pwdpolicies', { params });
  return response.data;
};

/* Delete Password policy api */
export const deletePasswordPolicy = async (payload = {}) => {
  const { id } = payload;
  const response = await ApiServices.delete(`/api/v1/secretmanager/pwdpolicies/${id}`);
  return response.data;
};

export const updateSecret = async ({ payloadBody, parents, vaultId }) => {
  const requiredString = getRequiredString(parents);
  const response = await ApiServices.patch(
    `/api/v1/secretmanager/vault/${vaultId}/secrets?path=${requiredString}`,
    payloadBody
  );
  return response.data;
};

export const createSecret = async ({ payloadBody, parents, vaultId }) => {
  const requiredString = getRequiredString(parents);
  const response = await ApiServices.post(
    `/api/v1/secretmanager/vault/${vaultId}/secrets?path=${requiredString}`,
    payloadBody
  );
  return response.data;
};
