import Typography from 'britive-design-system/core/components/typography';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { classes } from './constants';
import './datePickerWrapper.scss';

const DatePickerWrapper = ({ error, errorMessage, width, height, ...rest }) => {
  const calender = useRef(null);
  const wrapperClasses = {
    [classes.dateWrapper]: true,
    [classes.error]: Boolean(error),
  };
  const opendatePicker = () => {
    if (calender?.current) calender?.current.setOpen(true);
  };
  return (
    <>
      <div className={classnames(wrapperClasses)} style={{ width: width, height: height }}>
        <DatePicker {...rest} ref={calender} />
        <div
          onClick={() => {
            opendatePicker();
          }}
        >
          <AiOutlineCalendar />
        </div>
      </div>

      {error && errorMessage && (
        <div className={classes.errorLabel}>
          <Typography variant="helper1"> {errorMessage} </Typography>
        </div>
      )}
    </>
  );
};

DatePickerWrapper.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  style: PropTypes.any,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default DatePickerWrapper;
