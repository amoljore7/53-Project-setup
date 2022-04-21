import ApiServices from '../utils/api-service';
import { PAGE_TOKEN } from '../utils/common-constants';
import { getQueryParamsFromUrl } from '../utils/common-utils';

export const fetchMyRequestsList = async (payload = {}) => {
  const params = {};
  if (payload.search) {
    params.filter = `status%20eq%20${payload.search}`;
  }
  if (payload.next) {
    params.pageToken = getQueryParamsFromUrl(payload.next, PAGE_TOKEN);
  }

  let queryParams = 'requestType=myRequests';
  if (payload.consumer) {
    queryParams = `${queryParams}&consumer=${payload.consumer}`;
  }

  const listData = await ApiServices.get(`/api/v1/approvals/?${queryParams}`, { params });
  return listData;
};

export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.data;
};

export const fetchTags = async () => {
  const response = await ApiServices.get('/api/user-tags', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.data;
};

export const approveRejectRequest = async (payload) => {
  const response = await ApiServices.patch(
    `/api/v1/approvals/${payload.approvalId}?approveRequest=${payload.value}`,
    { approverComment: payload.commandText }
  );
  return response;
};

export const fetchApplicationsList = async () => {
  const ApplicationsList = await ApiServices.get(`/api/apps?view=extended`);
  return ApplicationsList.data;
};
