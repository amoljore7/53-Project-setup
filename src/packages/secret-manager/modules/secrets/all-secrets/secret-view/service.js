import ApiServices from '../../../../../../utils/api-service';

export const getRequiredString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const fetchSecretTemplateDetails = async ({ id }) => {
  const response = await ApiServices.get(`/api/v1/secretmanager/secret-templates/static/${id}`);
  return response.data;
};

export const fetchSecretDetails = async ({ parents, vaultId, data }) => {
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
