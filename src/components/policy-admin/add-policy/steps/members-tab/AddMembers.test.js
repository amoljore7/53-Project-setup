/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useValidation from '../../../../use-validation-hook';
import AddMembers from './AddMembers';
import * as yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';

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
  usersData: [
    {
      status: 'active',
      username: 'Dev User',
      name: 'Dev User',
      userId: 'yv7q8g111qxy1s863lm5',
    },
    {
      status: 'active',
      username: 'Qa User',
      name: 'qa user',
      userId: '1HhvrKWjoFPXvOcbJSDx',
    },
  ],
  usersDataStatus: RESOURCE_STATUS.SUCCESS,
  fetchUsers: jest.fn(),
  fetchGroups: jest.fn(),
  groupsData: [
    {
      userTagId: '00mbsdfbajiyz9mpygez',
      name: 'DevTags',
      description: 'tag description',
      status: 'Active',
    },
    {
      userTagId: '02jz80020o4pwbma0jl7',
      name: 'QaTags',
      description: 'tag description',
      status: 'Active',
    },
  ],
  groupsDataStatus: RESOURCE_STATUS.SUCCESS,
  serviceIdentitiesData: [
    {
      status: 'active',
      name: 'Dev_User_Token',
      description: 'Dev User SI for testing',
      userId: 'icjmwxnwayaow89nvgmb',
    },
    {
      status: 'active',
      name: 'Qa_Admin_Token',
      description: 'Qa User SI for testing',
      userId: 'r4dnbgjjf0n7fu83vzxy',
    },
  ],
  serviceIdentitiesDataStatus: RESOURCE_STATUS.SUCCESS,
  fetchServiceIdentities: jest.fn(),
  fetchTokens: jest.fn(),
  tokensData: [
    {
      id: 'qm9cezkoycz9xysx58x5',
      name: 'Dev_token',
      status: 'Active',
    },
    {
      id: 'u8z516jcj0sbt8zo7pnu',
      name: 'Qa_token',
      status: 'Active',
    },
  ],
  tokensDataStatus: RESOURCE_STATUS.SUCCESS,
  initSpinnerOverlay: jest.fn(),
  translatedStrings: {
    accessType: 'Access Type',
    loadingMembers: 'loading members',
    users: 'Users',
    tags: 'Tags',
    si: 'Service Identities',
    tokens: 'API Tokens',
    noUsersFound: '*No users present in the system',
    noTagsFound: '*No tags in the system',
    noSIFound: '*No service identities present in the system',
    noTokensFound: '*No tokens present in the system',
    userLabel: 'Users',
    groupLabel: 'Tags',
    serviceIdentityLabel: 'Service Identities',
    tokenLabel: 'API Tokens',
    usersValidation: 'At least one user is required.',
    siValidation: 'At least one tag is required.',
    groupsValidation: 'At least one user is required.',
    tokenValidation: 'At least one token is required.',
  },
};

const ParentTestComponent = ({ translatedStrings, ...others }) => {
  const validationHook = useValidation({
    initialValues: {
      allowDeny: 'Allow',
      allUser: 'allUser',
      allServiceIdentity: 'allServiceIdentity',
      allToken: 'allToken',
      allGroup: 'allGroup',
      user: 'user',
      group: 'group',
      serviceIdentity: 'serviceIdentity',
      token: 'token',
    },
    validationSchema: yup.object({
      allUser: yup.string().oneOf(['all', 'select', 'none']),
      allServiceIdentity: yup.string().oneOf(['all', 'select', 'none']),
      allToken: yup.string().oneOf(['all', 'select', 'none']),
      allGroup: yup.string().oneOf(['all', 'select', 'none']),
      isIpAddress: yup.boolean(),
      user: yup.array().when('allUser', {
        is: (value) => value === 'select',
        then: yup.array().min(1, translatedStrings.usersValidation),
      }),
      serviceIdentity: yup.array().when('allServiceIdentity', {
        is: (value) => value === 'select',
        then: yup.array().min(1, translatedStrings.siValidation),
      }),
      group: yup.array().when('allGroup', {
        is: (value) => value === 'select',
        then: yup.array().min(1, translatedStrings.groupsValidation),
      }),
      token: yup.array().when('allToken', {
        is: (value) => value === 'select',
        then: yup.array().min(1, translatedStrings.tokenValidation),
      }),
    }),
    onSubmit: jest.fn(),
  });

  return (
    <AddMembers {...others} translatedStrings={translatedStrings} validationHook={validationHook} />
  );
};

ParentTestComponent.propTypes = {
  translatedStrings: PropTypes.object,
};

beforeEach(cleanup);

describe('Add/Edit Member Tab', () => {
  it('Should display members form', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const usersLabel = queryByText(props.translatedStrings.userLabel);
    expect(usersLabel).toBeInTheDocument();

    const selectUserBtn = queryByText(`Select ${props.translatedStrings.users}`);
    expect(selectUserBtn).toBeInTheDocument();

    const selectAllUserBtn = queryByText(`All ${props.translatedStrings.users}`);
    expect(selectAllUserBtn).toBeInTheDocument();

    const noneUser = document.querySelector('label[for=usernone]');
    expect(noneUser);

    const tagsLabel = queryByText(props.translatedStrings.groupLabel);
    expect(tagsLabel).toBeInTheDocument();

    const selectTagBtn = queryByText(`Select ${props.translatedStrings.tags}`);
    expect(selectTagBtn).toBeInTheDocument();

    const selectAllTagsBtn = queryByText(`All ${props.translatedStrings.tags}`);
    expect(selectAllTagsBtn).toBeInTheDocument();

    const noneTag = document.querySelector('label[for=groupnone]');
    expect(noneTag);

    const siLabel = queryByText(props.translatedStrings.serviceIdentityLabel);
    expect(siLabel).toBeInTheDocument();

    const selectSiBtn = queryByText(`Select ${props.translatedStrings.si}`);
    expect(selectSiBtn).toBeInTheDocument();

    const selectAllSiBtn = queryByText(`All ${props.translatedStrings.si}`);
    expect(selectAllSiBtn).toBeInTheDocument();

    const noneSi = document.querySelector('label[for=serviceIdentitynone]');
    expect(noneSi);

    const tokenLabel = queryByText(props.translatedStrings.tokenLabel);
    expect(tokenLabel).toBeInTheDocument();

    const selectTokenBtn = queryByText(`Select ${props.translatedStrings.tokens}`);
    expect(selectTokenBtn).toBeInTheDocument();

    const selectAllTokenBtn = queryByText(`All ${props.translatedStrings.tokens}`);
    expect(selectAllTokenBtn).toBeInTheDocument();

    const noneToken = document.querySelector('label[for=tokennone]');
    expect(noneToken);
  });

  it('On Select of member(user,tags, etc) should call appropriate function', () => {
    const { queryByText } = render(<ParentTestComponent {...props} />);

    const selectUserBtn = queryByText(`Select ${props.translatedStrings.users}`);
    expect(selectUserBtn).toBeInTheDocument();
    fireEvent.click(selectUserBtn);
    expect(props.fetchUsers).toBeCalledTimes(1);

    const selectTagBtn = queryByText(`Select ${props.translatedStrings.tags}`);
    expect(selectTagBtn).toBeInTheDocument();
    fireEvent.click(selectTagBtn);
    expect(props.fetchGroups).toBeCalledTimes(1);

    const selectSiBtn = queryByText(`Select ${props.translatedStrings.si}`);
    expect(selectSiBtn).toBeInTheDocument();
    fireEvent.click(selectSiBtn);
    expect(props.fetchServiceIdentities).toBeCalledTimes(1);

    const selectTokenBtn = queryByText(`Select ${props.translatedStrings.tokens}`);
    expect(selectTokenBtn).toBeInTheDocument();
    fireEvent.click(selectTokenBtn);
    expect(props.fetchTokens).toBeCalledTimes(1);
  });

  it('Should display no records(label), when data is not available', async () => {
    const { queryByText } = render(
      <ParentTestComponent
        {...props}
        usersData={[]}
        groupsData={[]}
        serviceIdentitiesData={[]}
        tokensData={[]}
      />
    );

    const noUser = queryByText(props.translatedStrings.noUsersFound);
    expect(noUser).toBeInTheDocument();

    const noTags = queryByText(props.translatedStrings.noTagsFound);
    expect(noTags).toBeInTheDocument();

    const noSI = queryByText(props.translatedStrings.noSIFound);
    expect(noSI).toBeInTheDocument();

    const noTokens = queryByText(props.translatedStrings.noTokensFound);
    expect(noTokens).toBeInTheDocument();
  });

  it('Should display Loader when data is being fetch', () => {
    const { rerender } = render(
      <ParentTestComponent {...props} usersData={[]} usersDataStatus={RESOURCE_STATUS.LOADING} />
    );

    expect(props.initSpinnerOverlay).toBeCalledTimes(2);
    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: props.translatedStrings.loadingMembers,
      open: true,
      size: 'medium',
    });

    rerender(<ParentTestComponent {...props} usersDataStatus={RESOURCE_STATUS.ERROR} />);
    expect(props.initSpinnerOverlay).toBeCalledTimes(3);
    expect(props.initSpinnerOverlay).toBeCalledWith({
      message: props.translatedStrings.loadingMembers,
      open: false,
      size: 'medium',
    });
  });
});
