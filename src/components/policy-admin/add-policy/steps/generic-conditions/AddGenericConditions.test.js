/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import AddGenericConditions from './AddGenericConditions';
import * as yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';

// added to suppress warning
const originalError = global.console.error;
beforeAll(() => {
  global.console.error = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Please upgrade to at least react-dom@16.9.0')
    ) {
      return;
    }
    return originalError.call(console, args);
  });
});

const props = {
  isDateTimeData: [
    {
      label: 'Not required',
      value: 'none',
    },
    {
      label: 'Date-time range',
      value: 'date',
    },
    {
      label: 'Schedule Daily',
      value: 'time',
    },
  ],
  isIPAddressData: [
    {
      label: 'Yes',
      value: 'true',
    },
    {
      label: 'No',
      value: 'false',
    },
  ],
  translatedStrings: {
    accessType: 'Access Type',
    conditionsIpAddr: 'Do you want to specify conditions based on IP address?',
    ipLabel: 'IP Addresses',
    ipLabelHelperText: 'Specify comma separated IP addresses in CIDR or dotted decimal format',
    conditionsDateTime: 'Do you want to specify conditions based on Date/Time?',
    startDate: 'Start Date/Time',
    endDate: 'End Date/Time',
    startTime: 'Start Time',
    endTime: 'End Time',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      allowDeny: 'Allow',
      isIpAddress: false,
      ipAddress: '',
      isDateTime: 'none',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    },
    validationSchema: yup.object({
      isIpAddress: yup.boolean(),
      ipAddress: yup.string().when('isIpAddress', {
        is: true,
        then: yup
          .string()
          .required(translatedStrings.ipAddrValidation)
          .test('ipAddress', translatedStrings.ipAddressInvalidMsg, (value) => {
            return !value || !value.trim()
              ? true
              : value.split(',').find((ip) => !ip.trim().match(ipNewRegex)) === undefined;
          }),
        otherwise: yup.string().nullable().default(null),
      }),
      isDateTime: yup.string().oneOf(['none', 'date', 'time']),
      startDate: yup.date().when('isDateTime', {
        is: (value) => value === 'date',
        then: yup
          .date()
          .required(translatedStrings.startDateTimeValidation)
          .typeError(translatedStrings.startDateTimeValidation)
          .test('startDate', translatedStrings.startDateTimeMessage, function (value) {
            const startDate = value;
            const { isDateTime, endDate } = this.parent;
            if (isDateTime !== 'date') return true;
            if (startDate?.getTime() >= endDate?.getTime()) {
              return false;
            }
            if (startDate?.getTime() > new Date().getTime() || !isEmpty(editPolicy)) {
              return true;
            }
            return false;
          }),
        otherwise: yup.date().nullable().default(null),
      }),
      endDate: yup.date().when('isDateTime', {
        is: (value) => value === 'date',
        then: yup
          .date()
          .required(translatedStrings.endDateTimeValidation)
          .typeError(translatedStrings.endDateTimeValidation)
          .test('endDate', translatedStrings.endDateTimeValidationMsg, function (value, context) {
            const { startDate, isDateTime } = this.parent;
            const endDate = value;
            if (isDateTime !== 'date') return true;
            if (startDate?.getTime() >= endDate?.getTime()) {
              return false;
            }
            if (endDate?.getTime() < new Date().getTime()) {
              return context.createError({
                path: context.path,
                message: translatedStrings.endDateShouldGreaterThanTodayValidationMsg,
              });
            }
            return true;
          }),
        otherwise: yup.date().nullable().default(null),
      }),
      startTime: yup
        .date()
        .when('isDateTime', {
          is: (value) => value === 'time',
          then: yup
            .date()
            .required(translatedStrings.startTimeValidation)
            .typeError(translatedStrings.startTimeValidation),
          otherwise: yup.date().nullable().default(null),
        })
        .test('startTime', translatedStrings.startTimeBeforeEndTimeValidation, function (value) {
          const { endTime, isDateTime } = this.parent;
          const startTime = value;
          if (isDateTime !== 'time' || isNaN(endTime) || !endTime) {
            return true;
          }

          if (startTime?.getHours() < endTime?.getHours()) {
            return true;
          } else if (
            startTime?.getHours() === endTime?.getHours() &&
            startTime?.getMinutes() < endTime?.getMinutes()
          ) {
            return true;
          } else {
            return false;
          }
        }),
      endTime: yup
        .date()
        .when('isDateTime', {
          is: (value) => value === 'time',
          then: yup
            .date()
            .required(translatedStrings.endTimeValidation)
            .typeError(translatedStrings.endTimeValidation),
          otherwise: yup.date().nullable().default(null),
        })
        .test('endTime', translatedStrings.endTimeValidationMsg, function (value) {
          const { startTime, isDateTime } = this.parent;
          const endTime = value;
          if (isDateTime !== 'time') return true;
          if (startTime?.getHours() < endTime?.getHours()) {
            return true;
          } else if (
            startTime?.getHours() === endTime?.getHours() &&
            startTime?.getMinutes() < endTime?.getMinutes()
          ) {
            return true;
          } else {
            return false;
          }
        }),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <AddGenericConditions
      {...others}
      translatedStrings={translatedStrings}
      validationHook={validationHook}
    />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add/Edit Generic Condition', () => {
  it('Should display Access type and radio button for specifying generic condition required', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const accessType = queryByText('Allow');
    expect(accessType).toBeInTheDocument();

    const yesBtn = queryByText(props.isIPAddressData[0].label);
    expect(yesBtn).toBeInTheDocument();

    const noBtn = queryByText(props.isIPAddressData[1].label);
    expect(noBtn).toBeInTheDocument();
  });

  it('Should show/hide generic condition form base on radio button', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    let ipLabel = queryByText(props.translatedStrings.ipLabel);
    expect(ipLabel).not.toBeInTheDocument();

    const yesRadioBtn = queryByText(props.isIPAddressData[0].label);
    fireEvent.click(yesRadioBtn);

    ipLabel = queryByText(props.translatedStrings.ipLabel);
    expect(ipLabel).toBeInTheDocument();
  });

  it('Should able to select/fill the form', () => {
    const { queryByTestId, queryByText, getByRole } = render(<ParentTestComponent {...props} />);

    const yesRadioBtn = queryByText(props.isIPAddressData[0].label);
    fireEvent.click(yesRadioBtn);

    const IpAddressInput = queryByTestId('textarea-test-id');
    expect(IpAddressInput).toBeInTheDocument();
    fireEvent.change(IpAddressInput, { target: { value: '10.25.52.47' } });

    const dateTimeRangeRadio = getByRole('radio', { name: props.isDateTimeData[2].label });

    expect(dateTimeRangeRadio).toBeInTheDocument();
    fireEvent.click(dateTimeRangeRadio);

    const allDatePickerInputBoxes = document.querySelectorAll(
      'div.react-datepicker-wrapper > div > input[type=text]'
    );
    const startTimeInput = allDatePickerInputBoxes[0];
    const endTimeInput = allDatePickerInputBoxes[1];

    expect(startTimeInput).toBeInTheDocument();
    fireEvent.click(startTimeInput);

    const _9pm = queryByText('9:00 PM');
    expect(_9pm).toBeInTheDocument();
    fireEvent.click(_9pm);

    expect(endTimeInput).toBeInTheDocument();
    fireEvent.click(endTimeInput);

    const _930pm = queryByText('9:30 PM');
    expect(_930pm).toBeInTheDocument();
    fireEvent.click(_930pm);
  });

  it('Should able to select generic date ', () => {
    const { queryByText, getByRole } = render(<ParentTestComponent {...props} />);

    const yesRadioBtn = queryByText(props.isIPAddressData[0].label);
    fireEvent.click(yesRadioBtn);

    const dateTimeRangeRadio = getByRole('radio', { name: props.isDateTimeData[1].label });

    expect(dateTimeRangeRadio).toBeInTheDocument();
    fireEvent.click(dateTimeRangeRadio);

    const allDatePickerInputBoxes = document.querySelectorAll(
      'div.react-datepicker-wrapper > div > input[type=text]'
    );
    const startTimeInput = allDatePickerInputBoxes[0];
    const endTimeInput = allDatePickerInputBoxes[1];

    expect(startTimeInput).toBeInTheDocument();
    fireEvent.click(startTimeInput);

    const _9pm = queryByText('9:00 PM');
    expect(_9pm).toBeInTheDocument();
    fireEvent.click(_9pm);

    expect(endTimeInput).toBeInTheDocument();
    fireEvent.click(endTimeInput);

    const _930pm = queryByText('9:30 PM');
    expect(_930pm).toBeInTheDocument();
    fireEvent.click(_930pm);
  });

  it('Should hide generic condition when click No', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    let ipLabel = queryByText(props.translatedStrings.ipLabel);
    expect(ipLabel).not.toBeInTheDocument();

    const yesRadioBtn = queryByText(props.isIPAddressData[0].label);
    fireEvent.click(yesRadioBtn);

    ipLabel = queryByText(props.translatedStrings.ipLabel);
    expect(ipLabel).toBeInTheDocument();

    const noRadioBtn = queryByText(props.isIPAddressData[1].label);
    fireEvent.click(noRadioBtn);

    ipLabel = queryByText(props.translatedStrings.ipLabel);
    expect(ipLabel).not.toBeInTheDocument();
  });
});
