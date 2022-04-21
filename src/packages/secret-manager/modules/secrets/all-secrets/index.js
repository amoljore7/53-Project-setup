/* eslint-disable  no-unused-vars*/
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { requestTabIndex } from './action';
import AllSecrets from './AllSecrets';

const mapStateToProps = (state) => {
  const { tabIndex: currentTabIndex } = state?.secretsReducer?.secretPolicyTabIndex;
  const { status: consumerListStatus, error: consumerListError } = state?.consumerReducer;

  return {
    currentTabIndex,
    consumerListStatus,
    consumerListError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    openNotification: (type, title, open, duration) =>
      dispatch(openNotification(type, title, open, duration)),
    storeTabIndex: (tabIndex) => dispatch(requestTabIndex(tabIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSecrets);
