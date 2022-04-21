import React from 'react';
import PropTypes from 'prop-types';
import Textfield from 'britive-design-system/core/components/textfield';
import Textarea from 'britive-design-system/core/components/textarea';
import Typography from 'britive-design-system/core/components/typography';
import Select from 'britive-design-system/core/components/select';
import Autocomplete from 'britive-design-system/core/components/autocomplete';
import { classes, translatedStrings, defaultWidth } from '../constants';

import '../CreateVault.scss';

export const CreateVaultForm = ({
  validationHook,
  formContainer,
  IS_SLACK,
  fetchChannelList,
  notificationMediumList,
  usersData,
  tagsData,
  channelData,
}) => {
  return (
    <>
      <div className={classes.createVaultForm} role="textField" ref={formContainer}>
        <Textfield
          label={translatedStrings.vaultName}
          width={defaultWidth}
          value={validationHook.values.name}
          onChange={(e) => {
            validationHook.handleChange(validationHook.names.name, e.target.value);
          }}
          onBlur={() => {
            validationHook.handleBlur(validationHook.names.name);
          }}
          error={validationHook.touched.name && Boolean(validationHook.errors.name)}
          errorMsg={validationHook.errors.name}
        />
        <div className={classes.textfieldClass}>
          <Textarea
            label={translatedStrings.vaultDescription}
            helperText={translatedStrings.vaultDescriptionOptional}
            width={defaultWidth}
            value={validationHook.values.description}
            onChange={(e) => {
              validationHook.handleChange(validationHook.names.description, e.target.value);
            }}
          />
        </div>
        <div className={classes.textfieldClass}>
          <Textfield
            label={translatedStrings.vaultRotationName}
            helperText={translatedStrings.vaultRotationOptional}
            placeholder={translatedStrings.vaultRotationPlaceholder}
            width={defaultWidth}
            value={validationHook.values.rotationTime}
            onChange={(e) => {
              validationHook.handleChange(validationHook.names.rotationTime, e.target.value);
            }}
            onBlur={() => {
              validationHook.handleBlur(validationHook.names.rotationTime);
            }}
            error={
              validationHook.touched.rotationTime && Boolean(validationHook.errors.rotationTime)
            }
            errorMsg={validationHook.errors.rotationTime}
          />
        </div>
        <div className={classes?.vaultHeaderClass}>
          <Typography variant="pageSectionHeader">
            {translatedStrings.notificationMediumSettings}
          </Typography>
        </div>
        <div className={classes.textfieldClass}>
          <Select
            label={translatedStrings.notificationMediumLabel}
            helperText={translatedStrings.notificationMediumOptional}
            width={defaultWidth}
            options={notificationMediumList || []}
            getOptionLabel={(option) => option.name || option}
            value={validationHook.values.notificationList}
            onChange={(event, value) => {
              validationHook.handleChange(validationHook.names.notificationList, value.name);
              validationHook.handleChange(validationHook.names.channelList, []);
              validationHook.handleChange(
                validationHook.names.isChannelRequired,
                value.type === IS_SLACK
              );
              //fetching channel list depends on notification medium type
              value.type === IS_SLACK && fetchChannelList(value.id);
            }}
            onBlur={() => {
              validationHook.handleBlur(validationHook.names.notificationList);
            }}
            error={
              validationHook.touched.notificationList &&
              Boolean(validationHook.errors.notificationList)
            }
            errorMessage={
              validationHook.touched.notificationList &&
              Boolean(validationHook.errors.notificationList)
                ? validationHook.errors.notificationList
                : ''
            }
          />
        </div>

        {usersData?.length > 0 && (
          <div className={classes.textfieldClass}>
            <Autocomplete
              label={translatedStrings.userListLabel}
              placeholder={translatedStrings.userListHelperText}
              width={defaultWidth}
              multiple={true}
              options={usersData ?? []}
              getOptionLabel={(option) => option.name || option}
              value={validationHook.values.userList}
              onChange={(event, value) => {
                validationHook.handleChange(validationHook.names.userList, value);
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.userList);
              }}
              error={validationHook.touched.userList && Boolean(validationHook.errors.userList)}
              errorMessage={
                validationHook.touched.userList && Boolean(validationHook.errors.userList)
                  ? validationHook.errors.userList
                  : ''
              }
            />
          </div>
        )}
        {!usersData?.length && notifiersEmpty('users')}
        {tagsData?.length > 0 && (
          <div className={classes.textfieldClass}>
            <Autocomplete
              label={translatedStrings.tagListLabel}
              placeholder={translatedStrings.tagListHelperText}
              width={defaultWidth}
              multiple={true}
              options={tagsData ?? []}
              getOptionLabel={(option) => option.name || option}
              value={validationHook.values.tagList}
              onChange={(event, value) => {
                validationHook.handleChange(validationHook.names.tagList, value);
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.tagList);
              }}
              error={validationHook.touched.tagList && Boolean(validationHook.errors.tagList)}
              errorMessage={
                validationHook.touched.tagList && Boolean(validationHook.errors.tagList)
                  ? validationHook.errors.tagList
                  : ''
              }
            />
          </div>
        )}
        {!tagsData?.length && notifiersEmpty('tags')}
        {validationHook.values.isChannelRequired && channelData?.length > 0 && (
          <div className={classes.textfieldClass}>
            <Autocomplete
              options={channelData ?? []}
              label={translatedStrings.channelListLabel}
              placeholder={translatedStrings.channelListHelperText}
              multiple={true}
              width={defaultWidth}
              value={validationHook.values.channelList}
              getOptionLabel={(option) => option?.channelName || option}
              onChange={(event, value) => {
                validationHook.handleChange(validationHook.names.channelList, value);
              }}
              onBlur={() => {
                validationHook.handleBlur(validationHook.names.channelList);
              }}
              error={
                validationHook.touched.channelList && Boolean(validationHook.errors.channelList)
              }
              errorMessage={
                validationHook.touched.channelList && Boolean(validationHook.errors.channelList)
                  ? validationHook.errors.channelList
                  : ''
              }
            />
          </div>
        )}
        {validationHook.values.isChannelRequired &&
          !channelData?.length &&
          IS_SLACK &&
          notifiersEmpty('channels')}
      </div>
    </>
  );
};

export const notifiersEmpty = (fieldName) => {
  return (
    <div className={classes.textfieldClass}>
      <Typography variant="heading7">{fieldName}</Typography>
      <div className={classes.valueWrapper}>
        <Typography variant="label1">{getNotifiersEmptyText(fieldName)}</Typography>
      </div>
    </div>
  );
};

const getNotifiersEmptyText = (name) => {
  switch (name) {
    case 'users': {
      return translatedStrings.noUsersFound;
    }
    case 'tags': {
      return translatedStrings.noTagsFound;
    }
    case 'channels': {
      return translatedStrings.noChannelsFound;
    }
  }
};

CreateVaultForm.propTypes = {
  validationHook: PropTypes.object.isRequired,
  notificationMediumList: PropTypes.array,
  IS_SLACK: PropTypes.string,
  usersData: PropTypes.array,
  tagsData: PropTypes.array,
  fetchChannelList: PropTypes.func,
  channelData: PropTypes.array,
  formContainer: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
