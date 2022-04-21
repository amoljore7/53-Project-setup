import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import { papServiceConsumer } from '../../../../utils/common-constants';
import { classes } from './constants';
import './General.scss';

const PolicyViewGenerals = ({ generalData, translatedStrings, viewPolicyHeaders, consumer }) => {
  return (
    <div className={classes.container}>
      <div className={classes.headerClass}>
        <Typography variant="pageSectionHeader"> {viewPolicyHeaders?.general} </Typography>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.policyName} </Typography>
        <div className={classes.marginTop8}>
          <Typography variant="label1">
            {generalData?.name || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      <div className={classes.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.description} </Typography>
        <div className={classes.marginTop8}>
          <Typography variant="label1">
            {generalData?.description || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      {consumer !== papServiceConsumer && (
        <div className={classes.marginTop32}>
          <Typography variant="label2"> {translatedStrings?.accessType} </Typography>
          <div className={classes.marginTop8}>
            <Typography variant="label1">
              {generalData?.accessType || translatedStrings?.noneText}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

PolicyViewGenerals.propTypes = {
  generalData: PropTypes.object,
  translatedStrings: PropTypes.object,
  viewPolicyHeaders: PropTypes.shape({
    general: PropTypes.string,
    members: PropTypes.string,
    generic: PropTypes.string,
    approvals: PropTypes.string,
  }),
  consumer: PropTypes.string,
};

export default PolicyViewGenerals;
