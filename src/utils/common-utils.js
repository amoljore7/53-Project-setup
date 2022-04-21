import React from 'react';
import { useLocation } from 'react-router';
import { RESOURCE_STATUS, viewDateFormat, dateFormat } from './common-constants';
import moment from 'moment';

export const getQueryParamsFromUrl = (apiUrl, param) => {
  const url = new URL(apiUrl);
  const urlParams = new URLSearchParams(url.search);
  return urlParams.get(param);
};

export const getHeightFromTop = (element) => {
  const totalHeightAboveElement = element?.getBoundingClientRect().top;
  const elementTopPadding = Number(
    window.getComputedStyle(element, null).getPropertyValue('padding-top').replace('px', '')
  );
  const elementBottomPadding = Number(
    window.getComputedStyle(element, null).getPropertyValue('padding-bottom').replace('px', '')
  );
  return totalHeightAboveElement + elementBottomPadding + elementTopPadding;
};
export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const isLoading = (value) => value === RESOURCE_STATUS.LOADING;
export const isSuccess = (value) => value === RESOURCE_STATUS.SUCCESS;
export const isError = (value) => value === RESOURCE_STATUS.ERROR;

export const convertTimeToCurrentTimezone = (UTCString) => {
  return moment(UTCString).format(dateFormat);
};

export const getRequiredString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};

export const getLocalDateTime = (dateStr) => {
  return new Date(moment.utc(dateStr).local());
};

export const getFormattedLocalDateString = (dateStr, dateFormat = viewDateFormat) => {
  return moment.utc(dateStr).local().format(dateFormat);
};

export const getFormattedLocalTimeString = (dateStr, dateFormat = viewDateFormat) => {
  let timeString = moment.utc(dateStr).local().format(dateFormat).toString();
  timeString = timeString.substring(timeString.indexOf(' ') + 1);
  return timeString;
};

export const resetMembers = (validationHook) => {
  validationHook.handleChange(validationHook.names.allUser, 'none');
  validationHook.handleChange(validationHook.names.allGroup, 'none');
  validationHook.handleChange(validationHook.names.allToken, 'none');
  validationHook.handleChange(validationHook.names.allServiceIdentity, 'none');
};

export const fetchMembers = (members, action) => {
  if (!members.length) return;
  if (members.length >= 1 && members[0].id != '*') {
    action();
  }
};

export const nameCharacterValidation = (value) => {
  const nameRegex = /[a-zA-Z_\- 0-9]+/;
  const compareString = value || '';
  const matches = compareString.match(nameRegex);
  // matches array should only have one match i.e the name
  return Boolean(matches) && matches.length === 1 && matches[0].length === compareString.length;
};
export function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const getApplicationName = (resources, applicationsListData) => {
  return resources.map((value) => {
    if (value === '*') return value;
    else {
      return applicationsListData?.find((application) => application?.appContainerId === value)
        ?.applicationName;
    }
  });
};

export const getTimeInHMFromMinutes = (minutes, translatedStrings) => {
  const SIXTY = 60;
  const hours = parseInt(minutes / SIXTY);
  const minute = minutes - hours * SIXTY;
  return `${hours ? translatedStrings.hours(hours) : ''} ${
    minute ? translatedStrings.minutes(minute) : ''
  } `;
};

const getMemberObjects = (members, membersData, idProperty) => {
  let actualMembers = [];
  if (members) {
    let actualMember = null;
    for (let itr = 0; itr < members.length; itr++) {
      actualMember = membersData.find((member) => member[idProperty] === members[itr]);
      if (actualMember) actualMembers.push(actualMember);
    }
    if (!actualMember && members.length === 1 && members[0].length === 1) {
      actualMembers.push('*');
    }
  }
  return actualMembers;
};
/* Exported this function to reuse it under PolicyViewApprovals */
export const getMembers = (members, fetchedMembers, isApproval) => {
  let actualUsers = [],
    actualGroups = [],
    actualServiceIdentities = [],
    actualTokens = [],
    actualChannels = [];

  const users = isApproval ? members?.users : members?.users?.map(({ id }) => id);
  const serviceIdentities = members?.serviceIdentities?.map(({ id }) => id);
  const tags = isApproval ? members?.tags : members?.tags?.map(({ id }) => id);
  const tokens = members?.tokens?.map(({ id }) => id);
  const channels = members?.channels;

  actualUsers = getMemberObjects(users, fetchedMembers?.users, 'userId');
  actualGroups = getMemberObjects(tags, fetchedMembers?.groups, 'userTagId');
  actualTokens = getMemberObjects(tokens, fetchedMembers?.tokens, 'id');
  actualServiceIdentities = getMemberObjects(
    serviceIdentities,
    fetchedMembers?.serviceIdentities,
    'userId'
  );
  actualChannels = getMemberObjects(channels, fetchedMembers?.channels, 'channelId');

  return {
    users: actualUsers && Boolean(actualUsers.length) ? actualUsers : undefined,
    tags: actualGroups && Boolean(actualGroups.length) ? actualGroups : undefined,
    tokens: actualTokens && Boolean(actualTokens.length) ? actualTokens : undefined,
    serviceIdentities:
      actualServiceIdentities && Boolean(actualServiceIdentities.length)
        ? actualServiceIdentities
        : undefined,
    channels: actualChannels && Boolean(actualChannels.length) ? actualChannels : undefined,
  };
};

export const getParentString = (parents) => {
  if (parents?.length === 0) return '/';
  let parentsString = '';
  for (let i in parents) {
    parentsString += `/${parents[i].label}`;
  }
  return parentsString;
};
