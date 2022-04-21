import { MyApprovalsStatus, translateStrings } from '../secrets/constants';

export const getApprovalStatus = (status) => {
  switch (status?.toLowerCase()) {
    case MyApprovalsStatus.pending:
      return translateStrings.approvalPending;

    case MyApprovalsStatus.rejected:
      return translateStrings.rejected;

    case MyApprovalsStatus.timeout:
      return translateStrings.timeout;

    case MyApprovalsStatus.approved:
      return translateStrings.approvedText;

    default:
      return translateStrings.noneText;
  }
};

export const getApprovalsActionTooltip = (status) => {
  switch (status?.toLowerCase()) {
    case MyApprovalsStatus.approved:
      return translateStrings.requestApproved;

    case MyApprovalsStatus.rejected:
      return translateStrings.requestRejected;

    case MyApprovalsStatus.requestExpiredText:
      return translateStrings.requestExpired;

    default:
      return translateStrings.noneText;
  }
};

export const getParentStringFromArray = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const getActionLabel = (action) => {
  if (action) {
    if (action === MyApprovalsStatus.secretReadActionName) {
      return translateStrings.viewSecret;
    }
    return action;
  }
  return translateStrings.noneText;
};
