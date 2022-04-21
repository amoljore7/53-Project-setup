import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import Breadcrumb from 'britive-design-system/core/components/breadcrumb';
import Typography from 'britive-design-system/core/components/typography';
import { breadcrumbRole, classes, pageTitleRole } from './constants';
import './PageHeader.scss';

const BreacrumbWithRouter = withRouter(Breadcrumb);

const PageHeader = ({ title, routeToNameList }) => {
  const showNavMenu = routeToNameList.length > 0;

  const titleClass = {
    [classes.titleContainer]: true,
    [classes.titleWithNoBreadcrumb]: !showNavMenu,
  };

  const getNavMenu = () => {
    return (
      <div className={classes.menuContainer}>
        <div data-testid="breadcrumb" role={breadcrumbRole} className={classes.breadcrumbWrapper}>
          {/* Todo: Implemented the breadcrumbs using a constant file. Can add different approach in future. */}

          <BreacrumbWithRouter routeToNameList={routeToNameList} />
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    return (
      <div role={pageTitleRole} data-testid="title" className={classNames({ ...titleClass })}>
        <Typography variant="pageTitle">{title}</Typography>
      </div>
    );
  };

  return (
    <>
      <div className={classes.headerContainer}>
        {showNavMenu && getNavMenu()}

        {getPageTitle()}
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,

  routeToNameList: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,

      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default PageHeader;
