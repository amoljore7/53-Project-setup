import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { setPageHeaderAction } from '../../../../../../components/page-header/action';
import MySecretsMyApprovalsList from './MySecretsMyApprovalsList';
import Notification from '../../../../../../components/notification';
import configureStore from '../store';
import {
  requestMyApprovalsList,
  requestUpdateMyApprovalsListSearchTerm,
  approveRequest,
  rejectRequest,
  requestMyApprovalsListLoadMore,
} from './action';
import { secretManagerConsumer } from '../../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const { myApprovalsList: myApprovalsListState } = state?.userSecretsReducer?.myApprovalsReducer;
  return {
    myApprovalsListState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getMyApprovalsListData: () => dispatch(requestMyApprovalsList(ownProps?.consumer)),
    updateApprovalsListSearchTerm: (search) => {
      dispatch(requestUpdateMyApprovalsListSearchTerm(search));
    },
    requestToApprove: (approvalId, value, commandText, consumer) => {
      dispatch(approveRequest(approvalId, value, commandText, consumer));
    },
    requestToReject: (approvalId, value, commandText, consumer) => {
      dispatch(rejectRequest(approvalId, value, commandText, consumer));
    },
    getMyApprovalsListDataLoadMore: () => dispatch(requestMyApprovalsListLoadMore()),
  };
};

const MyApprovalsListConnectedWithStore = connect(mapStateToProps, mapDispatchToProps)(MySecretsMyApprovalsList);

// eslint-disable-next-line react/display-name
const MyApprovalsListContainer = memo(({ consumer, match, history }) => {
  if (consumer) {
    return (
      <Provider store={configureStore()}>
        <Notification />
        <MyApprovalsListConnectedWithStore consumer={consumer} match={match} history={history} />
      </Provider>
    );
  }

  return <MyApprovalsListConnectedWithStore consumer={secretManagerConsumer} match={match} history={history}/>;
}, (prevProps, nextProps) => prevProps.consumer === nextProps.consumer);

MyApprovalsListContainer.propTypes = {
  consumer: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object,
};

export default MyApprovalsListContainer;
