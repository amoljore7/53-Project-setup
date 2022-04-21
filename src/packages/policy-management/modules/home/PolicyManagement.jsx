import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'britive-design-system/core/components/card';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import {
  classes,
  cardTitleWithImg,
  keyPrefix,
  mainRole,
  pageTitle,
  routeToNameList,
  backToSysAdminBtnTxt,
  noAccessOnPolicyAdminTxt,
} from './constants';

import './PolicyManagement.scss';
import { adminPath, ALLOW, medium } from '../../../../utils/common-constants';
import { isEmpty } from 'lodash';

const haveAccess = (permissions, evalData) => {
  return permissions.some((permission) => evalData[permission] === ALLOW);
};

const PolicyManagementHome = ({ setPageHeader, history, match, policyEvalData }) => {
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  const clickHandler = (link) => {
    history.push(match.url + link);
  };

  useEffect(() => {
    const newCards = cardTitleWithImg.filter((card) => {
      return haveAccess(card.allPermissions, policyEvalData);
    });
    setTiles(newCards);
  }, [policyEvalData]);

  const getCardTitleWithImg = () => {
    return tiles.map((card, index) => (
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
    <>
      {isEmpty(tiles) && (
        <>
          <div className={classes.backButton}>
            <Button size={medium} onClick={() => history.push(adminPath)}>
              {backToSysAdminBtnTxt}
            </Button>
          </div>
          <div className={classes.noAccessBanner} role="typography">
            <Typography variant="heading2">{noAccessOnPolicyAdminTxt}</Typography>
          </div>
        </>
      )}
      <div role={mainRole} className={classes.landingContainer}>
        {getCardTitleWithImg()}
      </div>
    </>
  );
};

PolicyManagementHome.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  policyEvalData: PropTypes.object,
};

export default PolicyManagementHome;
