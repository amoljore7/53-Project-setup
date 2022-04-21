/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AddPermissionJSON from './AddPermissionJson';
import { buttonType, textAreaTestId } from './constants';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';

const props = {
  jsonObject: jest.fn(),
  addPermissionStatus: RESOURCE_STATUS.SUCCESS,
  addPermissionFormError: null,
  openNotification: jest.fn(),
};

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Policy Management - Add Permissions on JSON', () => {
  it('Display copy button on screen', () => {
    const { queryByRole } = render(<AddPermissionJSON />);
    const copyBtn = queryByRole('button', { name: buttonType.copy });
    expect(copyBtn).toBeInTheDocument();
  });

  it('Display textarea field on screen', () => {
    const { queryByTestId } = render(<AddPermissionJSON />);
    const textAreaWrapperContainer = queryByTestId(textAreaTestId);
    expect(textAreaWrapperContainer).toBeInTheDocument();
    screen.debug();
  });

  it('Check textarea is working', () => {
    const testData = 'test';
    const { queryByRole } = render(<AddPermissionJSON {...props} />);
    const textArea = queryByRole('textbox');
    fireEvent.change(textArea, {
      target: {
        value: testData,
      },
    });
    expect(textArea.value).toBe(testData);
  });

  it('Copy button should be working(copy to clipboard) when some input is present', () => {
    const testData = 'test';
    const { queryByRole } = render(<AddPermissionJSON {...props} />);
    const textArea = queryByRole('textbox');
    fireEvent.change(textArea, {
      target: {
        value: testData,
      },
    });
    const copyBtn = queryByRole('button', { name: buttonType.copy });
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalledTimes(1);
  });

  it('Copy button should not work when there is no input', () => {
    const { queryByRole } = render(<AddPermissionJSON {...props} />);
    const copyBtn = queryByRole('button', { name: buttonType.copy });
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalledTimes(0);
  });

  it('Loader should visible and hidden base on status', () => {
    const { container, rerender } = render(
      <AddPermissionJSON {...props} viewPermissionStatus={RESOURCE_STATUS.LOADING} />
    );
    let spinner = container.querySelector('.bds-loader');
    expect(spinner).toBeInTheDocument();
    rerender(<AddPermissionJSON {...props} viewPermissionStatus={RESOURCE_STATUS.SUCCESS} />);
    expect(spinner).not.toBeInTheDocument();
  });
});
