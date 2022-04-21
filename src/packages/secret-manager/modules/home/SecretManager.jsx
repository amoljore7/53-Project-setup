import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Card from 'britive-design-system/core/components/card';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import {
  cardKeyPrefix,
  classes,
  groupTileKeyPrefix,
  groupTilesDetails,
  mainRole,
  pageTitle,
  routeToNameList,
  title,
  vaultAccess,
  isAllow,
  backToSysAdminBtnTxt,
  noAccessOnSecretManagerTxt,
} from './constants';
import './SecretManager.scss';
import isEmpty from 'lodash/isEmpty';
import { adminPath, ALLOW, medium } from '../../../../utils/common-constants';

const haveAccess = (permissions, evalData) => {
  return permissions.some((permission) => evalData[permission] === ALLOW);
};

const SecretManagerHome = ({ setPageHeader, history, match, smEvalData }) => {
  const vaultDetail = useSelector((state) => state?.vaultLanding);

  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  const clickHandler = (link) => {
    history.push(match.url + link);
  };

  const getCardTitleWithImg = (tilesDetails) => {
    return tilesDetails.map((card, index) => (
      <div key={`${cardKeyPrefix}${index}`} className={classes.secretCardWrapper}>
        <Card
          data-testid="card"
          title={card.title}
          image={card.img}
          clickHandler={() => clickHandler(card.link)}
        />
      </div>
    ));
  };

  const getGroupTitle = (groupTitle) => (
    <Typography variant="pageSectionHeader">{groupTitle}</Typography>
  );

  const filterTile = (tile) => {
    if (
      tile.titleName === title.britiveVault &&
      !isEmpty(vaultDetail?.data?.metadata) &&
      vaultDetail?.data?.metadata[vaultAccess.readVault] !== isAllow &&
      vaultDetail?.data?.metadata[vaultAccess.vaultList] !== isAllow
    )
      return false;
    else if (
      tile.titleName === title.britiveVaultDetails &&
      !isEmpty(vaultDetail?.data?.metadata) &&
      vaultDetail?.data?.metadata[vaultAccess.readVault] !== isAllow
    )
      return false;
    return haveAccess(tile.allPermissions, smEvalData);
  };

  const filterCardGroups = (groupTilesDetails) => {
    groupTilesDetails.forEach((group) => {
      group.tilesDetails = group?.tilesDetails?.filter((data) => filterTile(data));
    });

    return groupTilesDetails.filter((group) => group?.tilesDetails?.length !== 0) || [];
  };

  const getGroupTiles = () => {
    return filterCardGroups(groupTilesDetails).map((group, index) => (
      <div key={`${groupTileKeyPrefix}${index}`} className={classes.groupTilesContainer}>
        <div className={classes.groupTitle}>{getGroupTitle(group.groupTitle)}</div>
        <div data-testid={group.groupTitle} className={classes.groupCard}>
          {getCardTitleWithImg(group.tilesDetails)}
        </div>
      </div>
    ));
  };

  return (
    <>
      {isEmpty(getGroupTiles()) && (
        <>
          <div className={classes.backButton}>
            <Button size={medium} onClick={() => history.push(adminPath)}>
              {backToSysAdminBtnTxt}
            </Button>
          </div>
          <div className={classes.noAccessBanner} role="typography">
            <Typography variant="heading2">{noAccessOnSecretManagerTxt}</Typography>
          </div>
        </>
      )}
      <div role={mainRole} className={classes.secretLandingContainer}>
        {!vaultDetail.loading && getGroupTiles()}
      </div>
    </>
  );
};

SecretManagerHome.propTypes = {
  setPageHeader: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.any,
  smEvalData: PropTypes.object,
};

export default SecretManagerHome;
