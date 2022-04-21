import React from 'react';
import { Provider } from 'react-redux';
import ApprovalModal from './ApprovalModal';
import Notification from '../../components/notification'
import SpinnerOverlay from '../../components/spinner-overlay';
import configureStore from './store';

const ApprovalModalContainer = (props) => {
  return (
    <Provider store={configureStore()}>
      <Notification />
      <SpinnerOverlay />
      <ApprovalModal {...props} />
    </Provider>
  );
};

export default ApprovalModalContainer;
