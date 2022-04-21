import Textfield from 'britive-design-system/core/components/textfield';
import React, { useState } from 'react';
import { classes, formConstants, translatedStrings } from '../constants';
import '../NotificationMediumForm.scss';
import PropTypes from 'prop-types';
import Typography from 'britive-design-system/core/components/typography';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const SlackForm = ({ notificationMediumValidation }) => {
  const [showToken, setShowToken] = useState(false);

  const toggleToken = () => {
    setShowToken(!showToken);
  };

  return (
    <>
      <Textfield
        value={notificationMediumValidation?.values?.URL}
        onChange={(e) =>
          notificationMediumValidation.handleChange(
            notificationMediumValidation?.names?.URL,
            e?.target?.value
          )
        }
        label={translatedStrings.slackUrlLabel}
        type="text"
        width={formConstants.defaultWidth}
        onBlur={() =>
          notificationMediumValidation.handleBlur(notificationMediumValidation?.names?.URL)
        }
        error={
          notificationMediumValidation?.touched?.URL &&
          Boolean(notificationMediumValidation?.errors?.URL)
        }
        errorMsg={notificationMediumValidation?.errors?.URL}
      />
      <div className={classes.fieldWrapper}>
        <Textfield
          value={notificationMediumValidation?.values?.token}
          onChange={(e) =>
            notificationMediumValidation.handleChange(
              notificationMediumValidation?.names?.token,
              e?.target?.value
            )
          }
          label={translatedStrings.slackTokenLabel}
          type={showToken ? 'text' : 'password'}
          icon={
            showToken ? (
              <BsEye size={formConstants.iconDefaultSize} />
            ) : (
              <BsEyeSlash size={formConstants.iconDefaultSize} />
            )
          }
          width={formConstants.defaultWidth}
          onBlur={() =>
            notificationMediumValidation.handleBlur(notificationMediumValidation?.names?.token)
          }
          error={
            notificationMediumValidation?.touched?.token &&
            Boolean(notificationMediumValidation?.errors?.token)
          }
          errorMsg={notificationMediumValidation?.errors?.token}
          onIconClick={toggleToken}
        />
      </div>
      <div className={classes.fieldWrapper}>
        <a
          target={formConstants.targetText}
          rel={formConstants.relText}
          className={classes.webHookUrlText}
          href={formConstants.slackUrl}
        >
          <Typography variant="label1"> {translatedStrings.slackLink} </Typography>
        </a>
      </div>
      <div className={classes.fieldWrapper}>
        <Typography variant="label2"> {translatedStrings.slackAttributeText} </Typography>
      </div>
    </>
  );
};
SlackForm.propTypes = {
  notificationMediumValidation: PropTypes.any,
  notificationMediumFilterLoading: PropTypes.bool,
  isEdit: PropTypes.bool,
  formError: PropTypes.any,
};
export default SlackForm;
