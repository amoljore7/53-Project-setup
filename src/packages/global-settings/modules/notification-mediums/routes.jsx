import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NotificationMediumList from './list';
import NotificationMediumView from './view';
import AddNotificationMedium from './add';
import EditNotificationMedium from './edit';
import CloneNotificationMedium from './clone';

const NotificationMediumRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url} component={NotificationMediumList} />
      <Route path={`${match.url}/view/:id`} component={NotificationMediumView} />
      <Route path={`${match.url}/add`} component={AddNotificationMedium} />
      <Route path={`${match.url}/edit/:id`} component={EditNotificationMedium} />
      <Route path={`${match.url}/clone/:id`} component={CloneNotificationMedium} />
    </Switch>
  );
};

NotificationMediumRoutes.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
};

export default NotificationMediumRoutes;
