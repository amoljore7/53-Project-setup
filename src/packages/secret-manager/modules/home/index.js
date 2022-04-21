import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../components/page-header/constants';
import SecretManagerHome from './SecretManager';

const mapStateToProps = (state) => {
  const { result: smEvalData } = state?.batchEvalReducer;
  return {
    smEvalData,
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

export default connect(mapStateToProps, mapDispatchToProps)(SecretManagerHome);
