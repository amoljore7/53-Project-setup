import ApiServices from '../../../utils/api-service';

export const fetchUsers = async () => {
  const response = await ApiServices.get('/api/users?type=User', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response?.data;
};

export const fetchGroups = async () => {
  const response = await ApiServices.get('/api/user-tags', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response?.data;
};

export const fetchServiceIdentities = async () => {
  const response = await ApiServices.get('/api/users?type=ServiceIdentity', {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response?.data;
};

export const fetchTokens = async () => {
  const response = await ApiServices.get('/api/token/all', {
    headers: {
      'content-type': 'application/json',
    },
  });
  let tokens = response?.data;
  if (tokens && tokens.length) {
    tokens = tokens.filter((token) => {
      const { type } = token;
      return type !== 'ServiceIdentity';
    });
  }
  return tokens || [];
};
