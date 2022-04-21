import React from 'react';
import Card from 'britive-design-system/core/components/card';
import { classes } from './constants';
import PropTypes from 'prop-types';
import adminIcon from '../assets/cog-solid.svg';
import mySecretsIcon from '../assets/key-solid.svg';

import './Home.scss';

const applications = [
  {
    title: 'Admin',
    path: '/admin',
    img: adminIcon,
    testId: 'home-101',
    id: 101,
  },
  {
    title: 'My Secrets',
    path: '/my-secrets',
    img: mySecretsIcon,
    testId: 'home-102',
    id: 102,
  },
];

const Home = (props) => {
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

Home.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default Home;
