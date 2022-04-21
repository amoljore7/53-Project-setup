import Select from 'britive-design-system/core/components/select';
import Spinner from 'britive-design-system/core/components/spinner';
import Textarea from 'britive-design-system/core/components/textarea';
import Textfield from 'britive-design-system/core/components/textfield';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { getHeightFromTop } from '../../../../../utils/common-utils';
import { applicationList, classes, formConstants, translatedStrings } from './constants';
import './NotificationMediumForm.scss';
import SlackForm from './notification-medium-form/SlackForm';
import Typography from 'britive-design-system/core/components/typography';
import startCase from 'lodash/startCase';
import TeamsForm from './notification-medium-form/TeamsForm';

const NotificationMediumForm = ({
  notificationMediumValidation,
  notificationMediumFilterLoading,
  formError,
  isEdit,
}) => {
  const formContainer = useRef(null);

  useEffect(() => {
    // below code is to handle form container div height in all cases(with error and without error) to avoid extra scroll bar
    if (formContainer?.current) {
      formContainer.current.style.height = `calc(100vh - ${getHeightFromTop(
        formContainer.current
      )}px)`;
    }
  }, [formContainer, formError]);

  const returnNotificationMediumForm = (type) => {
    if (type === formConstants.slackText) {
      return <SlackForm notificationMediumValidation={notificationMediumValidation} />;
    } else {
      return <TeamsForm notificationMediumValidation={notificationMediumValidation} />;
    }
  };

  return (
    <div ref={formContainer} className={classes.notificationMediumFormContainer}>
      <div className={classes.alignWithLoader}>
        <Textfield
          value={notificationMediumValidation.values.name}
          onChange={(e) =>
            notificationMediumValidation.handleChange(
              notificationMediumValidation.names.name,
              e.target.value
            )
          }
          label={translatedStrings.nameLabel}
          type="text"
          width={formConstants.defaultWidth}
          onBlur={() =>
            notificationMediumValidation.handleBlur(notificationMediumValidation.names.name)
          }
          error={
            notificationMediumValidation.touched.name &&
            Boolean(notificationMediumValidation.errors.name)
          }
          errorMsg={notificationMediumValidation.errors.name}
        />
        <div className={classes.formLoader}>
          {notificationMediumFilterLoading && <Spinner size={formConstants.smallSize} />}
        </div>
      </div>
      <div className={classes.fieldWrapper}>
        <Textarea
          value={notificationMediumValidation.values.description}
          onChange={(e) =>
            notificationMediumValidation.handleChange(
              notificationMediumValidation.names.description,
              e.target.value
            )
          }
          label={translatedStrings.descriptionLabel}
          helperText={translatedStrings.descriptionHelperLabel}
          type="text"
          width={formConstants.defaultWidth}
          height={'72px'}
          onBlur={() => {
            notificationMediumValidation.handleBlur(notificationMediumValidation.names.description);
          }}
          error={
            notificationMediumValidation.touched.description &&
            Boolean(notificationMediumValidation.errors.description)
          }
          errorMsg={notificationMediumValidation.errors.description}
        />
      </div>
      <div className={classes.fieldWrapper}>
        {isEdit ? (
          <>
            <Typography variant="label2">{translatedStrings.applicationLabel}</Typography>
            <div className={classes.fieldSpacing}>
              <Typography variant="label1">
                {startCase(notificationMediumValidation?.values?.type) ??
                  translatedStrings.noneText}
              </Typography>
            </div>
          </>
        ) : (
          <Select
            label={translatedStrings.applicationLabel}
            placeholder={translatedStrings.selectPlaceholder}
            width={formConstants.defaultWidth}
            options={applicationList || []}
            value={notificationMediumValidation?.values?.type?.value}
            getOptionLabel={(option) => option?.name}
            onChange={(event, option) => {
              notificationMediumValidation.handleChange(
                notificationMediumValidation?.names?.type,
                option?.value
              );
            }}
            onBlur={() => {
              notificationMediumValidation.handleBlur(notificationMediumValidation?.names?.type);
            }}
            error={
              notificationMediumValidation?.touched?.type &&
              Boolean(notificationMediumValidation?.errors?.type)
            }
            errorMessage={
              notificationMediumValidation?.touched?.type &&
              Boolean(notificationMediumValidation?.errors?.type)
                ? notificationMediumValidation?.errors?.type
                : ''
            }
          />
        )}
      </div>
      {notificationMediumValidation?.values?.type && (
        <div className={classes.fieldWrapper}>
          {returnNotificationMediumForm(notificationMediumValidation?.values?.type)}
        </div>
      )}
    </div>
  );
};

NotificationMediumForm.propTypes = {
  notificationMediumValidation: PropTypes.any,
  notificationMediumFilterLoading: PropTypes.bool,
  isEdit: PropTypes.bool,
  formError: PropTypes.any,
};

export default NotificationMediumForm;
