import ApiServices from '../../../../utils/api-service';

export const getVault = async () => {
  const create = await ApiServices.get(`/api/v1/secretmanager/vault`);
  return create;
};
