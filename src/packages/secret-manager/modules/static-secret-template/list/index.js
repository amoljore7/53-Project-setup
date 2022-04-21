import { connect } from 'react-redux';
import { openNotification } from '../../../../../components/notification/action';
import { setPageHeaderAction } from '../../../../../components/page-header/action';
import {
  requestStaticSecretTemplateList,
  requestStaticSecretTemplateDelete,
  updateStaticSecretTemplateListSearchTerm,
  requestStaticSecretTemplateListLoadMore,
} from './action';
import StaticSecretTemplateListing from './StaticSecretTemplateListing';

const mapStateToProps = (state) => {
  const {
    result: tableList,
    status: tableStatus,
    error: tableError,
    pagination: tablePagination,
    searchTerm: tableSearchTerm,
  } = state?.staticSecretTemplateReducer?.list;
  const { status: deleteStaticSecretStatus } = state?.staticSecretTemplateReducer?.delete;
  const { result: smEvalData } = state?.batchEvalReducer;
  return {
    tableList,
    tableStatus,
    tableError,
    tablePagination,
    tableSearchTerm,
    deleteStaticSecretStatus,
    smEvalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeader: (title, routeToNameList) =>
      dispatch(setPageHeaderAction(title, routeToNameList)),
    openNotification: ({ type, title, open, duration }) =>
      dispatch(openNotification(type, title, open, duration)),
    getStaticSecretTableList: () => dispatch(requestStaticSecretTemplateList()),
    deleteStaticSecret: (id, history) => {
      dispatch(requestStaticSecretTemplateDelete(id, history));
    },
    updateStaticSecretTemplateListSearchTerm: (search) =>
      dispatch(updateStaticSecretTemplateListSearchTerm(search)),
    getStaticSecretTableLoadMoreList: () => dispatch(requestStaticSecretTemplateListLoadMore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticSecretTemplateListing);
