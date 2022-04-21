import ApiServices from '../../../../../../utils/api-service';
import { PAGE_TOKEN } from '../../../../../../utils/common-constants';
import { getQueryParamsFromUrl } from '../../../../../../utils/common-utils';
import { active } from './constants';

export const fetchMyApprovalsList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `status%20eq%20${payload.search}`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  const listData = await ApiServices.get(`/api/v1/approvals/?requestType=myApprovals&consumer=${payload.consumer}`, {
    params,
  });
  return listData;
};

export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return (response?.data || []).filter((user) => user?.status?.toLowerCase() === active);
};
