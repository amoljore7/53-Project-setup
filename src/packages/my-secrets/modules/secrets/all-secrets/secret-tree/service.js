import ApiServices from '../../../../../../utils/api-service';

const getRequiredString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const getImmediateNodes = async (payload, vaultId) => {
  const params = {};
  const requiredString = getRequiredString(payload.parents);
  params.path = requiredString;
  params.type = 'node';

  const response = await ApiServices.get(`/api/v1/secretmanager/vault/${vaultId}/secrets`, {
    params,
  });
  return response.data;
};
