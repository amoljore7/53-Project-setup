/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import AddGeneral from './AddGeneral';
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
  policyFilterLoading: false,
  isEditMode: false,
  hideIncludeBelowHierarchyOption: false,
  isSMPolicy: true,
  translatedStrings: {
    allow: 'Allow',
    deny: 'Deny',
    yesLabel: 'Yes',
    noLabel: 'No',
    policyNameLabel: 'Policy Name',
    description: 'Description',
    descriptionHelperLabel: 'Optional',
    accessType: 'Access Type',
    includeHierarchyBelowPath: 'Include all resources in the hierarchy below the resource path?',
    resource: 'Resource',
    removeApprovalsTitle: 'Remove Approvals?',
    removeApprovalsMessage:
      "Deny' policy does not need approvals. 'Approvals' tab will be removed. Data on this tab will be lost",
    yesRemoveApprovals: 'Yes, remove approvals',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      name: '',
      description: null,
      resource: '/test',
      includeHierarchy: false,
      allowDeny: 'Allow',
    },
    validationSchema: yup.object({
      name: yup.string().trim().required(translatedStrings.policyNameValidation),
      description: yup.string().max(255, translatedStrings.descriptionMaxCharValidation),
      resource: yup.string(),
      includeHierarchy: yup.boolean(),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <AddGeneral {...others} translatedStrings={translatedStrings} validationHook={validationHook} />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add/Edit General Tab', () => {
  it('Should display General Tab Form', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const policyNameLabel = queryByText(props.translatedStrings.policyNameLabel);
    expect(policyNameLabel).toBeInTheDocument();

    const descriptionLabel = queryByText(props.translatedStrings.description);
    expect(descriptionLabel).toBeInTheDocument();

    const descriptionHelperLabel = queryByText(props.translatedStrings.descriptionHelperLabel);
    expect(descriptionHelperLabel).toBeInTheDocument();

    const accessTypeLabel = queryByText(props.translatedStrings.accessType);
    expect(accessTypeLabel).toBeInTheDocument();

    const resourceLabel = queryByText(props.translatedStrings.resource);
    expect(resourceLabel).toBeInTheDocument();

    const includeHierarchyLabel = queryByText(props.translatedStrings.includeHierarchyBelowPath);
    expect(includeHierarchyLabel).toBeInTheDocument();
  });

  it('Should hide access type radio buttons in edit mode', () => {
    const { queryByRole } = render(<ParentTestComponent {...props} isEditMode={true} />);

    const allowBtn = queryByRole('radio', { name: props.translatedStrings.allow });
    expect(allowBtn).not.toBeInTheDocument();
  });

  it('Should able to select/fill the form', async () => {
    const test_input = 'test';
    const { queryByTestId, queryByText } = render(<ParentTestComponent {...props} />);

    let policyNameInput = queryByTestId('input-test-id');
    expect(policyNameInput).toBeInTheDocument();
    fireEvent.change(policyNameInput, { target: { value: test_input } });
    policyNameInput = queryByTestId('input-test-id');
    expect(policyNameInput.value).toBe(test_input);

    let descriptionInput = queryByTestId('textarea-test-id');
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: test_input } });
    descriptionInput = queryByTestId('textarea-test-id');
    expect(descriptionInput.value).toBe(test_input);

    const allowBtn = queryByText(props.translatedStrings.allow);
    expect(allowBtn).toBeInTheDocument();
    fireEvent.click(allowBtn);

    const includeHierarchyNoBtn = queryByText(props.translatedStrings.noLabel);
    expect(includeHierarchyNoBtn).toBeInTheDocument();
    fireEvent.click(includeHierarchyNoBtn);
  });

  it('Should Display Confirmation dialog on access deny', () => {
    const { queryByText, queryByRole } = render(<ParentTestComponent {...props} />);

    const denyBtn = queryByText(props.translatedStrings.deny);
    expect(denyBtn).toBeInTheDocument();
    fireEvent.click(denyBtn);

    let confirmationDialogTitle = queryByText(props.translatedStrings.removeApprovalsTitle);
    expect(confirmationDialogTitle).toBeInTheDocument();

    const yesBtn = queryByRole('button', { name: props.translatedStrings.yesRemoveApprovals });
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn);

    confirmationDialogTitle = queryByText(props.translatedStrings.removeApprovalsTitle);
    expect(confirmationDialogTitle).not.toBeInTheDocument();
  });

  it('Should change resource path base on include hierarchy option ', () => {
    const { queryByText, queryByRole } = render(<ParentTestComponent {...props} />);

    let rootPath = queryByText('/test');
    expect(rootPath).toBeInTheDocument();

    let rootPathWithStar = queryByText('/test/*');
    expect(rootPathWithStar).not.toBeInTheDocument();

    const yesBtn = queryByRole('radio', { name: props.translatedStrings.yesLabel });
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn);

    rootPath = queryByText('/test');
    expect(rootPath).not.toBeInTheDocument();

    rootPathWithStar = queryByText('/test/*');
    expect(rootPathWithStar).toBeInTheDocument();
  });
});
