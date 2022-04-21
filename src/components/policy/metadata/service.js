import ApiServices from '../../../utils/api-service';

export const fetchMetadata = async ({ actionsList = [] }) => {
  const response = await ApiServices.post('/api/v1/policy-admin/batchevaluate', actionsList);
  return response.data;
};
