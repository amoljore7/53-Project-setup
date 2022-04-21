import { setPageHeaderAction } from "../../../../../../../components/page-header/action";
import {
  requestMyApprovalsList,
  requestUsersList
} from '../action';
import { connect } from "react-redux";
import MySecretsMyApprovalsListMobileView from "./MySecretsMyApprovalsListMobileView";

const mapStateToProps = (state) => {
  const { myApprovalsList: myApprovalsListState } = state?.userSecretsReducer?.myApprovalsReducer;
    const { data: usersData, loading: usersLoading } =
    state?.userSecretsReducer?.myApprovalsReducer?.usersList;
  return {
    myApprovalsListState,

    usersData: usersData?.result || [],
    usersLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getMyApprovalsListData: () => dispatch(requestMyApprovalsList()),
    fetchUsers: () => dispatch(requestUsersList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySecretsMyApprovalsListMobileView);