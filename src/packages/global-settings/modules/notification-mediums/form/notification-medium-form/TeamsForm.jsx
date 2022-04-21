import Textfield from 'britive-design-system/core/components/textfield';
import React from 'react';
import { formConstants, translatedStrings, classes } from '../constants';
import '../NotificationMediumForm.scss';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';

const TeamsForm = ({ notificationMediumValidation }) => {
  return (
    <>
      <Typography variant="label2">{translatedStrings.separateTeamsText}</Typography>
      <div className={classes.fieldSpacing}>
        <a
          target={formConstants.targetText}
          rel={formConstants.relText}
          className={classes.webHookUrlText}
          href={formConstants.webhookUrl}
        >
          <Typography variant="label1">{translatedStrings.teamsLink}</Typography>
        </a>
      </div>
      <div className={classes.fieldWrapper}>
        <Textfield
          value={notificationMediumValidation?.values?.teamsWebHookUrl}
          onChange={(e) =>
            notificationMediumValidation.handleChange(
              notificationMediumValidation?.names?.teamsWebHookUrl,
              e?.target?.value
            )
          }
          label={translatedStrings.teamsUrlLabel}
          type="text"
          width={formConstants.defaultWidth}
          onBlur={() =>
            notificationMediumValidation.handleBlur(
              notificationMediumValidation?.names?.teamsWebHookUrl
            )
          }
          error={
            notificationMediumValidation?.touched?.teamsWebHookUrl &&
            Boolean(notificationMediumValidation?.errors?.teamsWebHookUrl)
          }
          errorMsg={notificationMediumValidation?.errors?.teamsWebHookUrl}
        />
      </div>
    </>
  );
};

TeamsForm.propTypes = {
  notificationMediumValidation: PropTypes.any,
  notificationMediumFilterLoading: PropTypes.bool,
  isEdit: PropTypes.bool,
  formError: PropTypes.any,
};

export default TeamsForm;
