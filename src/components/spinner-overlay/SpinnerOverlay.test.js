/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SpinnerOverlay from './SpinnerOverlay';

const props = {
  open: true,
  size: 'medium',
  message: 'Loading Message...',
};

describe('Spinner Overlay test cases', () => {
  it('Size passed as a props appears on the screen', () => {
    const { getByTestId } = render(<SpinnerOverlay {...props} />);
    expect(getByTestId('bds-loader').classList.contains('bds-loader-medium')).toBe(true);
  });

  it('Message passed as a props appears on the screen', () => {
    const { getByText } = render(<SpinnerOverlay {...props} />);
    expect(getByText(props.message)).toBeInTheDocument();
  });
});
