import ApiServices from '../../../../../utils/api-service';
import { PAGE_TOKEN } from '../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../utils/common-utils';

export const fetchRolesList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `name%20co%20'${payload.search}'`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const rolesListResp = await ApiServices.get('/api/v1/policy-admin/roles', { params });
  return rolesListResp;
};

export const deleteRole = async (payload = {}) => {
  const { id = '' } = payload;
  const deleteRoleResp = await ApiServices.delete(`/api/v1/policy-admin/roles/${id}`);
  return deleteRoleResp;
};
