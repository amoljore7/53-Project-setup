import axios from 'axios';
import Cookie from 'js-cookie';

//read tenant base url from cookie
// eslint-disable-next-line no-undef
axios.defaults.baseURL = Cookie.get('tenantUrl');
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.headers = {
  'content-type': 'application/json',
};
//read tenant base url from cookie

const create = (url, data, config) => {
  return axios.post(`${url}`, data, config);
};

const remove = (url, config) => {
  return axios.delete(`${url}`, config);
};

const update = (url, data, config) => {
  return axios.patch(`${url}`, data, config);
};

const put = (url, data, config) => {
  return axios.put(`${url}`, data, config);
};

const get = (url, config) => {
  return axios.get(`${url}`, config);
};

const ApiServices = {
  get,
  post: create,
  patch: update,
  delete: remove,
  put,
};

export default ApiServices;
