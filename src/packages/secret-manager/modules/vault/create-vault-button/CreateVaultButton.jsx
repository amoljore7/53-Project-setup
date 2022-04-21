import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'britive-design-system/core/components/typography';
import Button from 'britive-design-system/core/components/button';
import { Redirect } from 'react-router-dom';
import { openNotification } from '../../../../../components/notification/action';
import './CreateVaultButton.scss';
import {
  vaultActions,
  notificationMediumActions,
} from '../../../../../components/batch-eval/constants';
import { classes, routeToNameList, pageTitle, translatedStrings, isAllow } from './constants';

const BritiveVault = ({ setPageHeader, history, match }) => {
  const dispatch = useDispatch();
  const vaultDetail = useSelector((state) => state.vaultLanding);
  const { result: smEvalData } = useSelector((state) => state?.batchEvalReducer);

  if (vaultDetail?.vaultStatusCode === 403) {
    dispatch(openNotification('error', translatedStrings.accessDenied, true, null));
    return <Redirect to="/admin/secret-manager" />;
  }

  useEffect(() => {
    setPageHeader(pageTitle, routeToNameList);
  }, []);

  const clickHandler = () => {
    smEvalData[vaultActions?.create] !== isAllow ||
    smEvalData[notificationMediumActions?.list] !== isAllow
      ? history.push('/admin/secret-manager')
      : history.push(match.url + '/create');
  };

  return (
    <>
      <div className={classes.createVaultButton} role="create-britive-vault">
        <Button size="medium" onClick={clickHandler}>
          {smEvalData[vaultActions?.create] !== isAllow ||
          smEvalData[notificationMediumActions?.list] !== isAllow
            ? translatedStrings.britiveVaultNoAccess
            : translatedStrings.britiveVaultButton}
        </Button>
      </div>
      <div className={classes.createVaultPage} role="typography">
        <Typography variant="heading2">
          {smEvalData[vaultActions?.create] !== isAllow ||
          smEvalData[notificationMediumActions?.list] !== isAllow
            ? translatedStrings.britiveVaultNotCreatedLabel
            : translatedStrings.britiveVaultLabel}
        </Typography>
      </div>
    </>
  );
};

BritiveVault.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
  setPageHeader: PropTypes.func,
};

export default BritiveVault;
