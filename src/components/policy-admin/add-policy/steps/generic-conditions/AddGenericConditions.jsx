import React from 'react';
import RadioGroup from 'britive-design-system/core/components/radio';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import DatePickerWrapper from '../../../../date-picker-with-validation';
import { setMinutes } from 'date-fns';
import moment from 'moment';
import { papServiceConsumer } from '../../../../../utils/common-constants';
import { dateFormat, timeFormat, datePickerHeight, datePickerWidth, classes } from './constants';
import './AddGenericConditions.scss';

const GenericConditions = ({
  validationHook,
  translatedStrings,
  isDateTimeData,
  isIPAddressData,
  consumer
}) => {
  return (
    <div className={classes.stepperMainContainer}>
      {consumer !== papServiceConsumer && (
        <div className={classes.addPolicyFieldWrapper}>
          <Typography variant="label2"> {translatedStrings.accessType} </Typography>
          <div className={classes.addPolicyFieldValueWrapper}>
            <Typography variant="label1"> {validationHook.values.allowDeny} </Typography>
          </div>
        </div>
      )}
      <div className={classes.addPolicyFieldWrapper}>
        <RadioGroup
          defaultValue={`${validationHook.values.isIpAddress}`}
          direction="vertical"
          label={translatedStrings.conditionsIpAddr}
          name="ipAddr"
          options={isIPAddressData}
          onChange={(e) => {
            const values = e.target.value === 'true';
            validationHook.handleChange(validationHook.names.isIpAddress, values);
            if (!values) {
              validationHook.handleChange(validationHook.names.ipAddress, '');
            }
          }}
        />
      </div>
      {validationHook.values.isIpAddress && (
        <div className={classes.addPolicyFieldWrapper}>
          <Textarea
            height="72px"
            width="512px"
            label={translatedStrings.ipLabel}
            helperText={translatedStrings.ipLabelHelperText}
            subLabel={translatedStrings.ipSubLabel}
            value={validationHook.values.ipAddress}
            onChange={(e) =>
              validationHook.handleChange(validationHook.names.ipAddress, e.target.value)
            }
            onBlur={() => validationHook.handleBlur(validationHook.names.ipAddress)}
            error={validationHook.touched.ipAddress && Boolean(validationHook.errors.ipAddress)}
            errorMsg={validationHook.errors.ipAddress}
          />
        </div>
      )}
      <div className={classes.addPolicyFieldWrapper}>
        <RadioGroup
          defaultValue={validationHook.values.isDateTime}
          direction="vertical"
          label={translatedStrings.conditionsDateTime}
          name="dateTime"
          options={isDateTimeData}
          onChange={(e) => {
            const radioValue = e.target.value;
            validationHook.handleChange(validationHook.names.isDateTime, e.target.value);
            switch (radioValue) {
              case 'date':
                validationHook.handleChange(validationHook.names.startTime, null);
                validationHook.handleChange(validationHook.names.endTime, null);
                break;
              case 'time':
                validationHook.handleChange(validationHook.names.startDate, null);
                validationHook.handleChange(validationHook.names.endDate, null);
                break;
            }
          }}
        />
      </div>
      {validationHook.values.isDateTime === 'date' && (
        <>
          <div className={classes.addPolicyFieldWrapper}>
            <div className={classes.addPolicyFieldValueWrapper}>
              <Typography variant="label2">{translatedStrings.startDate}</Typography>
            </div>

            <DatePickerWrapper
              width={datePickerWidth}
              height={datePickerHeight}
              dateFormat={dateFormat}
              selected={
                validationHook.values.startDate ? new Date(validationHook.values.startDate) : null
              }
              showTimeSelect={true}
              onChange={(date) => {
                validationHook.handleChange(validationHook.names.startDate, new Date(date));
                if (validationHook.touched.startDate) {
                  validationHook.handleBlur(validationHook.names.startDate);
                }
              }}
              required={true}
              onSelect={(date) => {
                validationHook.handleBlur(validationHook.names.startDate);
                validationHook.handleChange(
                  validationHook.names.startDate,
                  new Date(date) > new Date()
                    ? new Date(date)
                    : new Date(setMinutes(new Date(), new Date().getMinutes() > 30 ? 60 : 30))
                );
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.startDate);
              }}
              error={validationHook.touched.startDate && Boolean(validationHook.errors.startDate)}
              errorMessage={validationHook.errors.startDate ? validationHook.errors.startDate : ''}
              minDate={new Date()}
              showDisabledMonthNavigation
            />
          </div>
          <div className={classes.addPolicyFieldWrapper}>
            <div className={classes.valueWrapper}>
              <Typography variant="label2"> {translatedStrings.endDate} </Typography>
            </div>
            <DatePickerWrapper
              width={datePickerWidth}
              height={datePickerHeight}
              dateFormat={dateFormat}
              selected={
                validationHook.values.endDate ? new Date(validationHook.values.endDate) : null
              }
              showTimeSelect={true}
              onChange={(date) => {
                validationHook.handleChange(validationHook.names.endDate, new Date(date));
                if (validationHook.touched.endDate) {
                  validationHook.handleBlur(validationHook.names.endDate);
                }
              }}
              required={true}
              onSelect={(date) => {
                validationHook.handleBlur(validationHook.names.endDate);
                const endDate = new Date(date);
                const startDate = new Date(validationHook.values.startDate);
                validationHook.handleChange(
                  validationHook.names.endDate,
                  endDate > startDate ? endDate : new Date(setMinutes(startDate, 30))
                );
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.endDate);
              }}
              error={validationHook.touched.endDate && Boolean(validationHook.errors.endDate)}
              errorMessage={validationHook.errors.endDate ? validationHook.errors.endDate : ''}
              minDate={new Date(validationHook.values.startDate)}
              showDisabledMonthNavigation
            />
          </div>
        </>
      )}
      {validationHook.values.isDateTime === 'time' && (
        <>
          <div className={classes.addPolicyFieldWrapper}>
            <div className={classes.addPolicyFieldValueWrapper}>
              <Typography variant="label2">{translatedStrings.startTime}</Typography>
            </div>
            <DatePickerWrapper
              width={datePickerWidth}
              height={datePickerHeight}
              selected={
                validationHook.values.startTime ? new Date(validationHook.values.startTime) : null
              }
              onChange={(date) => {
                validationHook.handleChange(validationHook.names.startTime, new Date(date));
                validationHook.handleBlur(validationHook.names.startTime);
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.startTime);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Time"
              dateFormat={timeFormat}
              error={validationHook.touched.startTime && Boolean(validationHook.errors.startTime)}
              errorMessage={validationHook.errors.startTime ? validationHook.errors.startTime : ''}
            />
          </div>
          <div className={classes.addPolicyFieldWrapper}>
            <div className={classes.valueWrapper}>
              <Typography variant="label2"> {translatedStrings.endTime} </Typography>
            </div>
            <DatePickerWrapper
              width={datePickerWidth}
              height={datePickerHeight}
              selected={
                validationHook.values.endTime ? new Date(validationHook.values.endTime) : null
              }
              onChange={(date) => {
                validationHook.handleChange(validationHook.names.endTime, new Date(date));
                if (validationHook.touched.endTime) {
                  validationHook.handleBlur(validationHook.names.endTime);
                }
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.endTime);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Time"
              dateFormat={timeFormat}
              error={validationHook.touched.endTime && Boolean(validationHook.errors.endTime)}
              errorMessage={validationHook.errors.endTime ? validationHook.errors.endTime : ''}
              excludeTimes={[new Date(validationHook.values.startTime)]}
              minTime={setMinutes(new Date(validationHook.values.startTime), 10)}
              maxTime={moment().endOf('day').toDate()}
              onSelect={() => validationHook.handleBlur(validationHook.names.endTime)}
            />
          </div>
        </>
      )}
    </div>
  );
};

GenericConditions.propTypes = {
  validationHook: PropTypes.object,
  translatedStrings: PropTypes.object,
  isDateTimeData: PropTypes.array,
  isIPAddressData: PropTypes.array,
  consumer: PropTypes.string
};
export default GenericConditions;
