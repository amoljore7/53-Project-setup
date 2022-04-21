import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoutes = ({ component: Component, toPath, ...others }) => {
  const vaultStatus = useSelector((state) => state.vaultLanding);
  return (
    <>
      <Route
        {...others}
        render={(props) =>
          vaultStatus?.data?.status === 'ready' ||
          vaultStatus?.data?.status === 'rotation_in_progress' ? (
            <Redirect to={toPath} />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
};

PrivateRoutes.propTypes = {
  component: PropTypes.any,
  toPath: PropTypes.any,
};
export default PrivateRoutes;
