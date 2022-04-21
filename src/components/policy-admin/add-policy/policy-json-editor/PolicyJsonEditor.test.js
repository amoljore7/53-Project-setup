/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../use-validation-hook';
import PolicyJsonEditor from './PolicyJsonEditor';
import * as yup from 'yup';
import { errorNotificationType, successNotificationType } from '../../../../utils/common-constants';
import React from 'react';

const props = {
  editReadOnly: false,
  validationErrors: null,
  translatedStrings: {
    readOnlyPolicyJSONMessage: "Can't edit policy ",
    policySuccessCopy: 'Json copied successfully',
    policyFailedCopy: 'Fail to copy json',
    copyBtn: 'Copy',
    policyFormat: 'Policy in Json Format',
  },
  openNotification: jest.fn(),
};

const ParentTestComponent = (props) => {
  const jsonValidationHook = useValidation({
    initialValues: {
      JSONInputData: "{policyName: 'test-2'}",
    },
    validationSchema: yup.object({
      JSONInputData: yup
        .string()
        .required('The Policy JSON can not be empty')
        .test('JSONInputData', 'Invalid Json', (value) => {
          try {
            if (isEmpty(value)) {
              return true;
            }
            JSON.parse(value);
            return true;
          } catch (error) {
            return false;
          }
        }),
    }),
    onSubmit: jest.fn(),
  });
  return <PolicyJsonEditor {...props} validationHook={jsonValidationHook} />;
};

const testInput = "{policyName: 'test'}";

// mocking navigator object
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

beforeEach(cleanup);

describe('Json Editor', () => {
  it('Should display json editor', () => {
    const { queryByText, queryByTestId } = render(<ParentTestComponent {...props} />);

    const jsonEditorLabel = queryByText(props.translatedStrings.policyFormat);
    expect(jsonEditorLabel).toBeInTheDocument();

    const jsonEditor = queryByTestId('textarea-test-id');
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: testInput } });
    expect(jsonEditor.value).toBe(testInput);
  });

  it('Valid JSON should be copied', () => {
    const { queryByRole } = render(<ParentTestComponent {...props} />);

    const copyBtn = queryByRole('button', { name: props.translatedStrings.copyBtn });
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      successNotificationType,
      props.translatedStrings.policySuccessCopy
    );
  });

  it('InValid JSON should be not copied', () => {
    const { queryByTestId, queryByRole } = render(<ParentTestComponent {...props} />);

    const jsonEditor = queryByTestId('textarea-test-id');
    expect(jsonEditor).toBeInTheDocument();

    fireEvent.change(jsonEditor, { target: { value: '' } });
    expect(jsonEditor.value).toBe('');

    const copyBtn = queryByRole('button', { name: props.translatedStrings.copyBtn });
    fireEvent.click(copyBtn);
    expect(props.openNotification).toBeCalledTimes(1);
    expect(props.openNotification).toBeCalledWith(
      errorNotificationType,
      props.translatedStrings.policyFailedCopy
    );
  });
});
