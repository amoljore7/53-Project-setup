import { connect } from 'react-redux';
import { HeaderConstants } from '../../../../components/page-header/constants';
import GlobalSettingsHome from './GlobalSettings';

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

export default connect(null, mapDispatchToProps)(GlobalSettingsHome);
