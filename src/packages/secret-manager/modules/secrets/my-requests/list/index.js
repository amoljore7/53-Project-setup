import { connect } from 'react-redux';
import { setPageHeaderAction } from '../../../../../../components/page-header/action';
import MyRequestsList from './MyRequestsList';
import {
  requestMyRequestsList,
  requestMyRequestsListLoadMore,
  requestUpdateMyRequestsListSearchTerm,
} from './action';
import { secretManagerConsumer } from '../../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const { myRequestsList: myRequestsListState } = state?.secretsReducer;
  return {
    myRequestsListState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getMyRequestsListData: () => dispatch(requestMyRequestsList(secretManagerConsumer)),
    updateRequestsListSearchTerm: (search) => {
      dispatch(requestUpdateMyRequestsListSearchTerm(search));
    },
    getMyRequestsListDataLoadMore: () => dispatch(requestMyRequestsListLoadMore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsList);
