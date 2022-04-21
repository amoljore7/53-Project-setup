import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import { isSuccess } from '../../utils/common-utils';
import {
  getGroupsRequest,
  getServiceIdentitiesRequest,
  getTokensRequest,
  getUsersRequest,
} from '../policy/Members/actions';
import AddPolicy from './add';
import PolicyView from './view';
import EditPolicy from './edit';
import ClonePolicy from './clone';

const PolicyRoutes = ({ match, appManage = true }) => {
  const dispatch = useDispatch();

  const urlPaths = match.url.split("/");
  const redirectPath = urlPaths.splice(0, urlPaths.length - 1).join("/");

  const { status: usersStatus } = useSelector((state) => state?.membersReducer?.users);
  const { status: groupsStatus } = useSelector((state) => state?.membersReducer?.groups);
  const { status: tokensStatus } = useSelector((state) => state?.membersReducer?.tokens);
  const { status: serviceIdentitiesStatus } = useSelector(
    (state) => state?.membersReducer?.serviceIdentities
  );

  useEffect(() => {
    if (
      !isSuccess(usersStatus) &&
      !isSuccess(groupsStatus) &&
      !isSuccess(tokensStatus) &&
      !isSuccess(serviceIdentitiesStatus)
    ) {
      dispatch(getUsersRequest());
      dispatch(getTokensRequest());
      dispatch(getGroupsRequest());
      dispatch(getServiceIdentitiesRequest());
    }
  }, []);

  const consumerEntityId = match.params.profileId
  return (
    <Switch>
      <Redirect exact from={match.url} to={`${match.url}/add`} />
      <Route 
        path={`${match.url}/view/:id`} 
        render={(props) => 
          <PolicyView 
            consumerEntityId={consumerEntityId} 
            redirectPath={redirectPath}
            {...props}
          />
        } 
      />
      {appManage ? (
        <>
          <Route 
            exact 
            path={`${match.url}/add`} 
            render={(props) => 
              <AddPolicy 
                consumerEntityId={consumerEntityId}
                redirectPath={redirectPath} 
                {...props}
              />
            } 
          />
          <Route 
            exact 
            path={`${match.url}/edit/:id`} 
            render={(props) => 
              <EditPolicy 
                consumerEntityId={consumerEntityId}
                redirectPath={redirectPath} 
                {...props}
              />
            } 
          />
          <Route 
            exact 
            path={`${match.url}/clone/:id`} 
            render={(props) => 
              <ClonePolicy 
                consumerEntityId={consumerEntityId}
                redirectPath={redirectPath} 
                {...props}
              />
            } 
          />
        </>
      ) : (
        <>
          <Redirect from={`${match.url}/add`} to={redirectPath} />
          <Redirect from={`${match.url}/edit/:id`} to={redirectPath} />
          <Redirect from={`${match.url}/clone/:id`} to={redirectPath} />
        </>
      )}
    </Switch>
  );
};

PolicyRoutes.propTypes = {
  match: PropTypes.any,
  appManage: PropTypes.bool,
};

export default PolicyRoutes;
