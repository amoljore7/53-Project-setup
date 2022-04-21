import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../components/page-header/constants';
import PolicyManagementHome from './PolicyManagement';

const mapStateToProps = (state) => {
  const { result: policyEvalData } = state?.batchEvalReducer;
  return {
    policyEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch({
        type: HeaderConstants.HEADER_PROPS,
        payload: {
          title,
          routeToNameList,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyManagementHome);
