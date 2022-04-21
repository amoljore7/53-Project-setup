import ApiServices from '../../../../../utils/api-service';
import { PAGE_TOKEN } from '../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../utils/common-utils';

export const getActionByConsumer = async (consumerName) => {
  const response = await ApiServices.get(
    `/api/v1/policy-admin/actions?filter=consumer%20eq%20${consumerName}`
  );
  return response.data;
};

export const getPermissionById = async (permissionId) => {
  const response = await ApiServices.get(`/api/v1/policy-admin/permissions/${permissionId}`);
  return response.data;
};

export const getAllPermissions = async (payload = {}) => {
  const params = {};
  if (payload?.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }
  const response = await ApiServices.get('/api/v1/policy-admin/permissions', {
    headers: {
      'content-type': 'application/json',
    },
    params,
  });
  return response.data;
};
