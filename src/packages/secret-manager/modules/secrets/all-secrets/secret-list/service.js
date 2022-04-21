import ApiServices from '../../../../../../utils/api-service';

const getRequiredString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const fetchSecretList = async ({ parents, search, vaultId, pageToken, filter = 'co' }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  if (search) {
    params.filter = `name%20${filter}%20'${search}'`;
  }
  if (pageToken) params.pageToken = pageToken;
  params.path = requiredString;
  params.type = 'secret';
  params.getmetadata = true;
  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};

export const fetchNodeList = async ({ parents, vaultId, pageToken }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  params.path = requiredString;
  params.type = 'node';
  params.getmetadata = true;
  if (pageToken) params.pageToken = pageToken;
  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};

export const deleteSecret = async ({ parents, vaultId }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  params.path = requiredString;
  params.type = 'secret';
  const response = await ApiServices.delete(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response;
};
export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User');
  return response?.data || [];
};

export const fetchGroups = async () => {
  const response = await ApiServices.get('/api/user-tags');
  return response.data;
};
