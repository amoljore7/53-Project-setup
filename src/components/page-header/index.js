import { connect } from 'react-redux';
import PageHeader from './PageHeader';

const mapStateToProps = (state) => {
  return {
    title: state.pageHeader.title,
    routeToNameList: state.pageHeader.routeToNameList,
  };
};

export default connect(mapStateToProps, null)(PageHeader);
