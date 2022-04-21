import ApiServices from '../../../../../../utils/api-service';

export const getRequiredString = (parents) => {
  if (!parents?.length) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const createNode = async (payload) => {
  const { name, entityType } = payload.payloadData;
  const requiredString = getRequiredString(payload.parents);
  const params = {};
  params.path = requiredString;
  const response = await ApiServices.post(
    `/api/v1/secretmanager/vault/${payload.vaultId}/secrets`,
    {
      name: name,
      entityType,
    },
    { params }
  );
  return response.data;
};

export const deleteNode = async ({ parents, vaultId }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  params.path = requiredString;
  const response = await ApiServices.delete(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response;
};

export const getImmediateNodes = async ({ parents, vaultId, pageToken }) => {
  const requiredString = getRequiredString(parents);
  const params = {};
  params.path = requiredString;
  params.getmetadata = true;
  if (pageToken) {
    params.pageToken = pageToken;
  }
  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};
