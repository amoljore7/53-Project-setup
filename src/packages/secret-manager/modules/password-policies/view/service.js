import ApiServices from '../../../../../utils/api-service';
export const fetchPasswordPolicyData = async (id) => {
  const response = await ApiServices.get(`/api/v1/secretmanager/pwdpolicies/${id}`);
  return response.data;
};
