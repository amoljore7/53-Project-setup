import { HeaderConstants } from '../../../../../../components/page-header/constants';
import { mySecretMyApprovalPath } from '../../../../../../utils/common-constants';
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

const detailsApproveRequest = (approvalId, value, history, commandText, showNotification = true, redirectPath = mySecretMyApprovalPath) => {
  return {
    type: ApproveRequestDataTypes.APPROVE_REQUEST_DETAILS_REQUEST,
    payload: { approvalId, value, history, commandText, redirectPath, showNotification },
  };
};

const detailsRejectRequest = (approvalId, value, history, commandText, showNotification = true, redirectPath = mySecretMyApprovalPath) => {
  return {
    type: RejectRequestDataTypes.REJECT_REQUEST_DETAILS_REQUEST,
    payload: { approvalId, value, history, commandText, redirectPath, showNotification },
  };
};

export { setPageHeader, getApprovalsDetailsById, detailsApproveRequest, detailsRejectRequest };
