import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { setPageHeaderAction } from '../../../../../../components/page-header/action';
import MySecretsMyRequestsList from './MySecretsMyRequestsList';
import configureStore from './store';
import {
  requestMyRequestsList,
  requestMyRequestsListLoadMore,
  requestUpdateMyRequestsListSearchTerm,
} from './action';
import { secretManagerConsumer } from '../../../../../../utils/common-constants';

const mapStateToProps = (state) => {
  const { myRequestsList: myRequestsListState } = state?.userSecretsReducer?.myRequestReducer;
  return {
    myRequestsListState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    getMyRequestsListData: () => dispatch(requestMyRequestsList(ownProps?.consumer)),
    updateRequestsListSearchTerm: (search) => {
      dispatch(requestUpdateMyRequestsListSearchTerm(search));
    },
    getMyRequestsListDataLoadMore: () => dispatch(requestMyRequestsListLoadMore()),
  };
};

const MyRequestsConnectedWithStore = connect(mapStateToProps, mapDispatchToProps)(MySecretsMyRequestsList);

const MyRequestsContainer = ({ consumer }) => {

  if (consumer) {
    return (
      <Provider store={configureStore()}>
        <MyRequestsConnectedWithStore consumer={consumer} />
      </Provider>
    );
  }

  return <MyRequestsConnectedWithStore consumer={secretManagerConsumer} />;
}

MyRequestsContainer.propTypes = {
  consumer: PropTypes.string,
};

export default MyRequestsContainer;
