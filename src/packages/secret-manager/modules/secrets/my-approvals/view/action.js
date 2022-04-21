import { HeaderConstants } from '../../../../../../components/page-header/constants';
import {
  MyApprovalsDetailsDataTypes,
  ApproveRequestDataTypes,
  RejectRequestDataTypes,
} from './constants';

const setPageHeader = (title, routeToNameList) => ({
  type: HeaderConstants.HEADER_PROPS,
  payload: {
    title,
    routeToNameList,
  },
});

const getApprovalsDetailsById = (id) => ({
  type: MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_REQUEST,
  payload: id,
});

const approveRequest = (approvalId, value, history, commandText) => {
  return {
    type: ApproveRequestDataTypes.APPROVE_REQUEST_DETAILS_REQUEST,
    payload: { approvalId, value, history, commandText },
  };
};

const rejectRequest = (approvalId, value, history, commandText) => {
  return {
    type: RejectRequestDataTypes.REJECT_REQUEST_DETAILS_REQUEST,
    payload: { approvalId, value, history, commandText },
  };
};

export { setPageHeader, getApprovalsDetailsById, approveRequest, rejectRequest };
