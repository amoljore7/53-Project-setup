/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import SMPermissions from './SMPermissions';
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
  accessLevelOptions: [
    {
      label: 'View',
      value: 'SM_View',
    },
    {
      label: 'Create, Edit',
      value: 'SM_CRUD',
    },
    {
      label: 'Manage',
      value: 'SM_Manage',
    },
  ],
  translatedStrings: {
    accessType: 'Access Type',
    accessLevel: 'Access Level',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      allowDeny: 'Allow',
      accessLevel: 'SM_View',
    },
    validationSchema: yup.object({
      allowDeny: yup.string().oneOf(['Allow', 'Deny']),
      accessLevel: yup.string().oneOf(['SM_CRUD', 'SM_View', 'SM_Manage']),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <SMPermissions
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

describe('Add/Edit Permissions Tab(SM)', () => {
  it('Should display permission form', () => {
    const { queryByText, queryByRole } = render(<ParentTestComponent {...props} />);

    const accessTypeLabel = queryByText(props.translatedStrings.accessType);
    expect(accessTypeLabel).toBeInTheDocument();

    const accessTypeAllow = queryByText('Allow');
    expect(accessTypeAllow).toBeInTheDocument();

    const accessLevelLabel = queryByText(props.translatedStrings.accessLevel);
    expect(accessLevelLabel).toBeInTheDocument();

    const viewRadioBtn = queryByRole('radio', { name: props.accessLevelOptions[0].label });
    expect(viewRadioBtn).toBeInTheDocument();

    const createRadioBtn = queryByRole('radio', { name: props.accessLevelOptions[1].label });
    expect(createRadioBtn).toBeInTheDocument();

    const manageRadioBtn = queryByRole('radio', { name: props.accessLevelOptions[2].label });
    expect(manageRadioBtn).toBeInTheDocument();
  });

  it('Should able to select Create,Edit option', () => {
    const { queryByRole } = render(<ParentTestComponent {...props} />);

    const createRadioBtn = queryByRole('radio', { name: props.accessLevelOptions[1].label });
    expect(createRadioBtn).toBeInTheDocument();
    fireEvent.click(createRadioBtn);
  });

  it('Should able to select Manage option', () => {
    const { queryByRole } = render(<ParentTestComponent {...props} />);

    const manageRadioBtn = queryByRole('radio', { name: props.accessLevelOptions[2].label });
    expect(manageRadioBtn).toBeInTheDocument();
    fireEvent.click(manageRadioBtn);
  });
});
