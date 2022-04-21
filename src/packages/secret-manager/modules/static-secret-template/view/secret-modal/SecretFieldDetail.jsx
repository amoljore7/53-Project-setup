import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import { classes, translatedStrings } from '../constants';
import '../StaticSecretTemplateView.scss';

const SecretFieldDetail = ({ fieldData }) => {
  return (
    <div className={classes.viewSecretModalPopupWrapper}>
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.fieldName} </Typography>
        <div className={classes?.marginTop8}>
          <Typography variant="label1"> {fieldData?.name} </Typography>
        </div>
      </div>
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.description} </Typography>
        <div className={classes?.marginTop8}>
          <Typography variant="label1">
            {fieldData?.description || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.fieldType} </Typography>
        <div className={classes?.marginTop8}>
          <Typography variant="label1">
            {fieldData?.fieldType || translatedStrings?.noneText}
          </Typography>
        </div>
      </div>
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings?.isMandatoryField} </Typography>
        <div className={classes?.marginTop8}>
          <Typography variant="label1">{fieldData?.isMandatory}</Typography>
        </div>
      </div>
      <div className={classes?.marginTop32}>
        <Typography variant="label2"> {translatedStrings.isMaskedField} </Typography>
        <div className={classes?.marginTop8}>
          <Typography variant="label1">{fieldData?.isMask}</Typography>
        </div>
      </div>
    </div>
  );
};

SecretFieldDetail.propTypes = {
  fieldData: PropTypes.object,
};

export default SecretFieldDetail;
