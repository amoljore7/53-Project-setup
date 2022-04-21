import React, { useEffect, useState } from 'react';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import RadioGroup from 'britive-design-system/core/components/radio';
import Typography from 'britive-design-system/core/components/typography';
import {
  userField,
  groupField,
  siField,
  tokenField,
  medium,
  papServiceConsumer,
} from '../../../../../utils/common-constants';
import PropTypes from 'prop-types';
import {
  isError,
  isLoading,
  isSuccess,
  capitalizeFirstLetter,
} from '../../../../../utils/common-utils';
import { isEmpty } from 'lodash';
import { classes } from './constants';
import './AddMembers.scss';

const Members = ({
  validationHook,
  fetchUsers,
  usersData,
  usersDataStatus,
  fetchGroups,
  groupsData,
  groupsDataStatus,
  fetchServiceIdentities,
  serviceIdentitiesData,
  serviceIdentitiesDataStatus,
  fetchTokens,
  tokensData,
  tokensDataStatus,
  initSpinnerOverlay,
  translatedStrings,
  consumer,
}) => {
  const [usersOptions, setUsersOptions] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState([]);
  const [tokensOptions, setTokensOptions] = useState([]);
  const [serviceIdentitiesOptions, setServiceIdentitiesOptions] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);

  useEffect(() => {
    if (isSuccess(groupsDataStatus) && groupsData && groupsData.length) {
      setGroupsOptions(groupsData);
      setResourcesLoading(false);
    }
    if (isLoading(groupsDataStatus)) {
      setResourcesLoading(true);
    }
    if (isError(groupsDataStatus)) {
      setResourcesLoading(false);
    }
  }, [groupsDataStatus]);
  useEffect(() => {
    if (isSuccess(tokensDataStatus) && tokensData && tokensData.length) {
      setTokensOptions(tokensData);
      setResourcesLoading(false);
    }
    if (isLoading(tokensDataStatus)) {
      setResourcesLoading(true);
    }
    if (isError(tokensDataStatus)) {
      setResourcesLoading(false);
    }
  }, [tokensDataStatus]);
  useEffect(() => {
    if (
      isSuccess(serviceIdentitiesDataStatus) &&
      serviceIdentitiesData &&
      serviceIdentitiesData.length
    ) {
      setServiceIdentitiesOptions(serviceIdentitiesData);
      setResourcesLoading(false);
    }
    if (isLoading(serviceIdentitiesDataStatus)) {
      setResourcesLoading(true);
    }
    if (isError(serviceIdentitiesDataStatus)) {
      setResourcesLoading(false);
    }
  }, [serviceIdentitiesDataStatus]);

  useEffect(() => {
    if (isSuccess(usersDataStatus) && usersData && usersData.length) {
      setUsersOptions(usersData);
      setResourcesLoading(false);
    }
    if (isLoading(usersDataStatus)) {
      setResourcesLoading(true);
    }
    if (isError(usersDataStatus)) {
      setResourcesLoading(false);
    }
  }, [usersDataStatus]);

  useEffect(() => {
    initSpinnerOverlay({
      open: resourcesLoading,
      size: medium,
      message: translatedStrings.loadingMembers,
    });
  }, [resourcesLoading]);

  const allFields = [
    { name: userField, label: translatedStrings.userLabel },
    { name: groupField, label: translatedStrings.groupLabel },
    { name: siField, label: translatedStrings.serviceIdentityLabel },
  ];

  const getFields = () => {
    if (consumer !== papServiceConsumer) {
      allFields.push({ name: tokenField, label: translatedStrings.tokenLabel });
      return allFields
    }

    return allFields;
  }

  const getOptions = (name) => {
    switch (name) {
      case userField:
        return usersOptions;
      case groupField:
        return groupsOptions;
      case siField:
        return serviceIdentitiesOptions;
      case tokenField:
        return tokensOptions;
    }
  };

  const fetchMembers = (name) => {
    switch (name) {
      case userField:
        fetchUsers();
        break;
      case groupField:
        fetchGroups();
        break;
      case siField:
        fetchServiceIdentities();
        break;
      case tokenField:
        fetchTokens();
        break;
    }
  };
  const getField = (name, label) => {
    const fieldName = getPropertyName(name);
    const membersProps = {
      label,
      direction: 'vertical',
      defaultValue: validationHook.values[fieldName],
      name,
      options: getRadioOptions(label),
      onChange: (e) => {
        if (e.target.value === 'select') {
          fetchMembers(name);
        } else if (e.target.value === 'none') {
          validationHook.handleChange(validationHook.names[name], []);
        } else {
          validationHook.handleChange(validationHook.names[name], []);
        }
        validationHook.handleChange(validationHook.names[fieldName], e.target.value);
      },
    };

    const membersListProps = {
      width: '512px',
      value: validationHook.values[name],
      options: getOptions(name),
      multiple: true,
      error: validationHook.touched[name] && Boolean(validationHook.errors[name]),
      errorMessage: validationHook.errors[name],
      onBlur: () => validationHook.handleBlur(validationHook.names[name]),
      onChange: (_, value) => {
        validationHook.handleChange(validationHook.names[name], value);
      },
      onInputChange: () => {},
      getOptionLabel: (option) => getLabel(name, option),
      disablePortal: true,
    };
    return (
      <>
        <div className={classes.addPolicyFieldWrapper}>
          <RadioGroup {...membersProps} />
        </div>
        {validationHook.values[fieldName] === 'select' && (
          <div className={classes.addPolicyFieldWrapper}>
            <Autocomplete {...membersListProps} />
          </div>
        )}
      </>
    );
  };

  const isMembersListEmpty = (name) => {
    switch (name) {
      case userField:
        return isEmpty(usersData);
      case groupField:
        return isEmpty(groupsData);
      case siField:
        return isEmpty(serviceIdentitiesData);
      case tokenField:
        return isEmpty(tokensData);
    }
  };
  const getFieldLabel = (name) => {
    switch (name) {
      case userField:
        return translatedStrings.users;
      case groupField:
        return translatedStrings.tags;
      case siField:
        return translatedStrings.si;
      case tokenField:
        return translatedStrings.tokens;
    }
  };

  const getFieldEmptyResultText = (name) => {
    switch (name) {
      case userField: {
        return translatedStrings.noUsersFound;
      }
      case groupField: {
        return translatedStrings.noTagsFound;
      }
      case siField: {
        return translatedStrings.noSIFound;
      }
      case tokenField: {
        return translatedStrings.noTokensFound;
      }
    }
  };
  const getNoDataField = (name) => {
    return (
      <div className={classes.addPolicyFieldWrapper}>
        <Typography variant="heading7">{getFieldLabel(name)}</Typography>
        <div className={classes.valueWrapper}>
          <Typography variant="label1">{getFieldEmptyResultText(name)}</Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.stepperMainContainer}>
      {getFields().map((item) => {
        const { name, label } = item;
        return isMembersListEmpty(name) ? getNoDataField(name) : getField(name, label);
      })}
    </div>
  );
};

const getRadioOptions = (label) => {
  return [
    {
      label: `Select ${label}`,
      value: 'select',
    },
    {
      label: `All ${label}`,
      value: 'all',
    },
    {
      label: 'None',
      value: 'none',
    },
  ];
};

const getLabel = (name, option) => {
  switch (name) {
    case userField:
      return option ? option.name : null;
    case groupField:
      return option.name;
    case siField:
      return option.name;
    case tokenField:
      return option.name;
  }
};

const getPropertyName = (name) => {
  return `all${capitalizeFirstLetter(name)}`;
};

Members.propTypes = {
  validationHook: PropTypes.object,
  fetchUsers: PropTypes.func,
  usersData: PropTypes.array,
  usersDataStatus: PropTypes.string,
  fetchGroups: PropTypes.func,
  groupsData: PropTypes.array,
  groupsDataStatus: PropTypes.string,
  fetchServiceIdentities: PropTypes.func,
  serviceIdentitiesData: PropTypes.array,
  serviceIdentitiesDataStatus: PropTypes.string,
  fetchTokens: PropTypes.func,
  tokensData: PropTypes.array,
  tokensDataStatus: PropTypes.string,
  initSpinnerOverlay: PropTypes.func,
  translatedStrings: PropTypes.object,
  consumer: PropTypes.string,
};
export default Members;
