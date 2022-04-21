import ApiServices from '../../../../../../utils/api-service';
import { PAGE_TOKEN } from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';

const getRequiredString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const fetchSecretList = async ({ parents, search, vaultId, next, filter = 'co' }) => {
  const params = {};
  const requiredString = getRequiredString(parents);
  if (search) {
    params.filter = `name%20${filter}%20'${search}'`;
  }
  if (next) {
    params.pageToken = getQueryParamsFromUrl(next, PAGE_TOKEN);
  }
  params.path = requiredString;
  params.recursiveSecrets = true;
  params.getmetadata = true;

  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};

export const fetchSecretDetails = async (path = {}, data = {}, vaultId) => {
  const params = {};
  params.path = path;
  const response = await ApiServices.post(
    `/api/v1/secretmanager/vault/${vaultId}/accesssecrets`,
    data,
    {
      params,
    }
  );
  return response.data;
};

export const fetchSecretTemplateDetails = async (payload) => {
  const id = payload.id;
  const response = await ApiServices.get(`/api/v1/secretmanager/secret-templates/static/${id}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User');
  return response?.data || [];
};

export const fetchGroups = async () => {
  const response = await ApiServices.get('/api/user-tags');
  return response.data;
};
