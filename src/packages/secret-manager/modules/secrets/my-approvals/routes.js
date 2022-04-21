import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MyApprovalsList from './list';
const MyApprovalsRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={MyApprovalsList} />
      {/* {TODO: Add routes here} */}
    </Switch>
  );
};

MyApprovalsRoutes.propTypes = {
  match: PropTypes.any,
};

export default MyApprovalsRoutes;
