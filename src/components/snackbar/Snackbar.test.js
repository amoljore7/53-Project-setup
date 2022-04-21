import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Snackbar from './Snackbar';

const props = {
  title: 'Submit Error',
  errorList: [
    '- This is a error list toast component.',
    '- This is a error list toast component.',
    '- This is a error list toast component.',
  ],
  hasError: false,
};

describe.only('Unit tests for Snackbar component', () => {
  it('Title passed in the props appears on the screen', () => {
    const { queryByText } = render(<Snackbar {...props} />);
    waitFor(() => expect(queryByText(props.title)).toBeInTheDocument());
  });

  it('form error list passed in the props appears on the screen', () => {
    const { queryByText } = render(<Snackbar {...props} />);
    waitFor(() => expect(queryByText(props.errorList).length).toEqual(3));
  });
});
