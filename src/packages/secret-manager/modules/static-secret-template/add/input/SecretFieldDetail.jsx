import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import { classes } from '../constants';
import { translatedStrings } from './constants';
import '../AddStaticSecretTemplate.scss';

const SecretFieldDetail = ({ fieldData }) => {
  return (
    <>
      <div className={classes?.sstMarginTop32}>
        <Typography variant="label2"> {translatedStrings.fieldName} </Typography>
        <div className={classes?.sstMarginTop8}>
          <Typography variant="label1"> {fieldData?.name} </Typography>
        </div>
      </div>
      <div className={classes?.sstMarginTop32}>
        <Typography variant="label2"> {translatedStrings.descriptionLabel} </Typography>
        <div className={classes?.sstMarginTop8}>
          <Typography variant="label1">
            {fieldData?.description || translatedStrings.none}
          </Typography>
        </div>
      </div>
      <div className={classes?.sstMarginTop32}>
        <Typography variant="label2"> {translatedStrings.fieldType} </Typography>
        <div className={classes?.sstMarginTop8}>
          <Typography variant="label1">
            {fieldData?.fieldTypeDisplayValue || translatedStrings.none}
          </Typography>
        </div>
      </div>
      <div className={classes?.sstMarginTop32}>
        <Typography variant="label2"> {translatedStrings.mandatoryField} </Typography>
        <div className={classes?.sstMarginTop8}>
          <Typography variant="label1">{fieldData?.required || translatedStrings.none}</Typography>
        </div>
      </div>
      <div className={classes?.sstMarginTop32}>
        <Typography variant="label2"> {translatedStrings.maskedField} </Typography>
        <div className={classes?.sstMarginTop8}>
          <Typography variant="label1">{fieldData?.mask}</Typography>
        </div>
      </div>
    </>
  );
};
SecretFieldDetail.propTypes = {
  fieldData: PropTypes.object,
};
export default SecretFieldDetail;
