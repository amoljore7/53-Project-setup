import React from 'react';
import Card from 'britive-design-system/core/components/card';
import { classes } from './constants';
import PropTypes from 'prop-types';
import policyManagementIcon from '../assets/img_policy_management.svg';
import secretManagerIcon from '../assets/img_secret_manager.svg';
import globalSettingsIcon from '../assets/globe-solid.svg';

import './Admin.scss';

const applications = [
  {
    title: 'Policy Management',
    path: '/admin/policy-management',
    img: policyManagementIcon,
    testId: 'app-101',
    id: 101,
  },
  {
    title: 'Secret Manager',
    path: '/admin/secret-manager',
    img: secretManagerIcon,
    testId: 'app-102',
    id: 102,
  },
  {
    title: 'Global Settings',
    path: '/admin/global-settings',
    img: globalSettingsIcon,
    testId: 'app-103',
    id: 103,
  },
  {
    title: 'Profile Policy',
    path: '/admin/profiles/suh7bf9kwn0vzi3joub6/policy/manage',
    img: globalSettingsIcon,
    testId: 'app-104',
    id: 104,
  },
];

const Admin = (props) => {
  const { history } = props;
  return (
    <div className={classes.landingContainer}>
      {applications.map((application) => (
        <div key={application.id} className={classes.cardWrapper}>
          <Card
            data-testid={application.testId}
            title={application.title}
            image={application.img}
            clickHandler={() => {
              history.push(application.path);
            }}
          />
        </div>
      ))}
    </div>
  );
};

Admin.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default Admin;
