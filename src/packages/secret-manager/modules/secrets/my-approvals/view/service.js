import ApiServices from '../../../../../../utils/api-service';

export const fetchMyApprovalsDetails = async (payload = {}) => {
  const listData = await ApiServices.get(`/api/v1/approvals/${payload}`);
  return listData;
};
