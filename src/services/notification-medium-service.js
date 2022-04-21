import { isEmpty } from 'lodash';
import ApiServices from '../utils/api-service';
import { PAGE_TOKEN } from '../utils/common-constants';
import { getQueryParamsFromUrl } from '../utils/common-utils';

const headers = {
  'content-type': 'application/json',
};

export const fetchChannelList = async ({ notificationMediumId, next }) => {
  const params = {};
  if (!isEmpty(next)) {
    params.pageToken = getQueryParamsFromUrl(next, PAGE_TOKEN);
  }
  const response = await ApiServices.get(
    `api/v1/notification-service/notificationmediums/${notificationMediumId}/channels`,
    {
      headers,
      params,
    }
  );
  return response.data;
};

export const fetchNotificationMediumList = async () => {
  const response = await ApiServices.get('/api/v1/notification-service/notificationmediums');
  return response.data;
};

export const fetchNotificationMediumById = async (id) => {
  const response = await ApiServices.get(`/api/v1/notification-service/notificationmediums/${id}`);
  return response.data;
};

// Notification Mediums CRUD

export const fetchNotificationMediumFilterList = async ({ search, filter = 'co', next = '' }) => {
  const params = {};
  if (search) {
    params.filter = `name%20${filter}%20'${search}'`;
  }
  if (next) {
    params.pageToken = getQueryParamsFromUrl(next, PAGE_TOKEN);
  }
  const response = await ApiServices.get('/api/v1/notification-service/notificationmediums', {
    params,
  });
  return response;
};

export const addNotificationMedium = async (notificationMediumData) => {
  const response = await ApiServices.post(
    '/api/v1/notification-service/notificationmediums',
    notificationMediumData
  );
  return response.data;
};

export const editNotificationMedium = async (id, notificationMediumData) => {
  const response = await ApiServices.patch(
    `/api/v1/notification-service/notificationmediums/${id}`,
    notificationMediumData
  );
  return response.data;
};

export const deleteNotificationMedium = async (payload = {}) => {
  const { id } = payload;
  const response = await ApiServices.delete(
    `/api/v1/notification-service/notificationmediums/${id}`
  );
  return response.data;
};
