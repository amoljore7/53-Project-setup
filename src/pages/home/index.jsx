import React from 'react';
import PropTypes from 'prop-types';
import HomeRoutes from './routes';

const HomePage = () => {
  return <HomeRoutes />;
};

HomePage.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default HomePage;
