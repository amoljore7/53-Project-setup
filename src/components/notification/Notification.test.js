import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Notification from './notification';

const props = {
  type: 'Success',
  duration: 300,
  open: false,
  title: 'Submit',
  closeNotification: jest.fn(),
};

describe.only('Unit tests for Notification component', () => {
  it('Title passed in the props appears on the screen', () => {
    const { queryByText } = render(<Notification {...props} />);
    waitFor(() => expect(queryByText(props.title)).toBeInTheDocument());
  });

  it('Type passed in the props appears on the screen', () => {
    const { queryByText } = render(<Notification {...props} />);
    waitFor(() => expect(queryByText(props.type)).toBeInTheDocument());
  });

  it('Duration passed in the props appears on the screen', () => {
    const { queryByText } = render(<Notification {...props} />);
    waitFor(() => expect(queryByText(props.duration)).toBeInTheDocument());
  });

  it('open passed in the props appears on the screen', () => {
    const { queryByText } = render(<Notification {...props} />);
    waitFor(() => expect(queryByText(props.open)).toBeInTheDocument());
  });
});
