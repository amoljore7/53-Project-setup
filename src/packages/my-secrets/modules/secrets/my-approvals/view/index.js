import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import MySecretsMyApprovalsDetails from './MySecretMyApprovalsDetails';
import Notification from '../../../../../../components/notification';
import configureStore from '../store';

const MyApprovalsDetailsContainer = ({ history, match, redirectPath }) => {
  return (
    <Provider store={configureStore()}>
      <Notification />
      <MySecretsMyApprovalsDetails
        history={history}
        approvalId={match?.params?.id}
        redirectPath={redirectPath}
      />
    </Provider>
  );
};

MyApprovalsDetailsContainer.propTypes = {
  redirectPath: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object,
};

export default MyApprovalsDetailsContainer;
