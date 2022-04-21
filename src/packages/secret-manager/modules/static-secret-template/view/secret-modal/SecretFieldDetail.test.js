/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import SecretFieldDetail from './SecretFieldDetail';

const props = {
  fieldData: {
    name: 'secret_1',
    description: 'test_description',
    fieldType: 'single',
    isMandatory: 'Yes',
    isMask: 'Yes',
  },
};

beforeEach(cleanup);

describe.only('Static Secret Template - View Field Details', () => {
  it.only('Should display provided details', async () => {
    const { queryByText } = render(<SecretFieldDetail {...props} />);

    const fieldName = queryByText(props.fieldData.name);
    expect(fieldName).toBeInTheDocument();

    const description = queryByText(props.fieldData.description);
    expect(description).toBeInTheDocument();
  });
});
