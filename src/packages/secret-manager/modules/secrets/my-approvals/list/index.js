import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../../components/page-header/action';
import MyApprovalsList from './MyApprovalsList';
import {
  requestMyApprovalsList,
  requestUpdateMyApprovalsListSearchTerm,
  approveRequest,
  rejectRequest,
  requestMyApprovalsListLoadMore,
} from './action';
import { secretManagerConsumer } from '../../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const { myApprovalsList: myApprovalsListState } = state?.secretsReducer;
  return {
    myApprovalsListState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getMyApprovalsListData: () => dispatch(requestMyApprovalsList(secretManagerConsumer)),
    updateApprovalsListSearchTerm: (search) => {
      dispatch(requestUpdateMyApprovalsListSearchTerm(search));
    },
    requestToApprove: (approvalId, value, commandText) => {
      dispatch(approveRequest(approvalId, value, commandText));
    },
    requestToReject: (approvalId, value, commandText) => {
      dispatch(rejectRequest(approvalId, value, commandText));
    },
    getMyApprovalsListDataLoadMore: () => dispatch(requestMyApprovalsListLoadMore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApprovalsList);
