import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'britive-design-system/core/components/card';
import {
  classes,
  cardTitleWithImg,
  keyPrefix,
  mainRole,
  pageTitle,
  routeToNameList,
} from './constants';

import './GlobalSettings.scss';

const GlobalSettingsHome = ({ setPageHeader, history, match }) => {
  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  const clickHandler = (link) => {
    history.push(match.url + link);
  };

  const getCardTitleWithImg = () => {
    return cardTitleWithImg.map((card, index) => (
      <div key={`${keyPrefix}${index}`} className={classes.cardWrapper}>
        <Card
          data-testid="card"
          title={card.title}
          image={card.img}
          clickHandler={() => card.link && clickHandler(card.link)}
        />
      </div>
    ));
  };

  return (
    <div role={mainRole} className={classes.globalSettingsMainContainer}>
      {getCardTitleWithImg()}
    </div>
  );
};

GlobalSettingsHome.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
};

export default GlobalSettingsHome;
