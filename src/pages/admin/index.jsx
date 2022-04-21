import React from 'react';
import PropTypes from 'prop-types';
import AdminRoutes from './routes';

const AdminPage = () => {
  return <AdminRoutes />;
};

AdminPage.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default AdminPage;
