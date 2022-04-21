import { uniqueId } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import * as moment from 'moment';
import { COLON_SEPARATOR, RESOURCE_STATUS } from '../../utils/common-constants';
import { getLocalDateTime } from '../../utils/common-utils';
import { IS_SLACK } from './add/constants';
import { translatedStrings } from './view/constants';

const timeFormat = 'HH:mm:ss';
const dateFormatFinal = 'yyyy-MM-DD HH:mm:ss';
const SIXTY = 60;

export const getTimeInHMFromMinutes = (minutes) => {
  const hours = parseInt(minutes / SIXTY);
  const minute = minutes - hours * SIXTY;
  return `${hours ? translatedStrings.hours(hours) : ''} ${
    minute ? translatedStrings.minutes(minute) : ''
  } `;
};

export const getTimeInHMWithColonsFromMinutes = (minutes) => {
  if (isNaN(Number(minutes))) {
    return '';
  }
  const hours = parseInt(minutes / SIXTY);
  const minute = minutes - hours * SIXTY;
  return `${hours}:${minute}`;
};

export const getMinutesFromHMTime = (time) => {
  let [hours = 0, minutes = 0] = time.split(COLON_SEPARATOR);
  hours = Number(hours) || 0;
  minutes = Number(minutes) || 0;
  return hours * SIXTY + minutes;
};

export const massageLoadedPolicy = (
  {
    policy,
    usersData,
    groupsData,
    tokensData,
    serviceIdentitiesData,
    isEditMode,
    notificationMediumDetails,
    channelList,
  },
  { cloneNamePrefix, dummyDate, dateSearchCharacter, consumersList }
) => {
  const {
    id,
    name,
    description,
    members,
    permissions,
    roles,
    accessType,
    condition,
    isReadOnly,
    isActive,
    isDraft,
  } = policy;
  const conditionJSON = condition && JSON.parse(condition);
  const users = members?.users?.map(({ id }) => id);
  const tags = members?.tags?.map(({ id }) => id);
  const tokens = members?.tokens?.map(({ id }) => id);
  const serviceIdentities = members?.serviceIdentities?.map(({ id }) => id);

  const approvalUsers = conditionJSON?.approval?.approvers?.userIds || [];
  const approvalGroups = conditionJSON?.approval?.approvers?.tags || [];
  const approvalChannels = conditionJSON?.approval?.approvers?.channelIds || [];

  const allUser = getAllMember(users);
  const allGroup = getAllMember(tags);
  const allToken = getAllMember(tokens);
  const allServiceIdentity = getAllMember(serviceIdentities);

  const { isDateTime, startDate, startTime, endDate, endTime } = getConditionFields(conditionJSON, {
    dummyDate,
    dateSearchCharacter,
  });

  let massagedPolicy = {
    id,
    name: isEditMode ? name : `${cloneNamePrefix}${name}`,
    description,
    allUser,
    allServiceIdentity,
    allToken,
    allGroup,
    isReadOnly: isEditMode ? isReadOnly : false,
    isActive,
    isDraft,
    permissions: permissions
      ? permissions.map((permission) => {
          const { isInline, actions, resources, name, id, description, consumer } = permission;
          const consumerObject = consumersList?.find(
            (consumerItem) => consumerItem.name === consumer
          );
          return isInline
            ? {
                id: isEditMode ? id : uniqueId('inline-permission-'),
                actions: actions.join(','),
                resources: resources.join(','),
                name: isEditMode ? name : `${cloneNamePrefix}${name}`,
                description,
                consumer: consumerObject,
                isExistingInline: isEditMode,
                isInline,
              }
            : { ...permission, isInline: false, isExistingInline: false, consumer: consumerObject };
        })
      : [],
    roles: roles
      ? roles.map((role) => {
          if (!isEmpty(role.permissions)) {
            const permissions = role.permissions.map((permission) => {
              const consumerObject = consumersList?.find(
                (consumerItem) => consumerItem.name === permission.consumer
              );
              return { ...permission, consumer: consumerObject };
            });
            return { ...role, permissions };
          } else {
            return role;
          }
        })
      : [],
    allowDeny: accessType,

    isIpAddress: Boolean(conditionJSON?.ipAddress),
    ipAddress: conditionJSON?.ipAddress || '',
    isDateTime,
    startDate,
    endDate,
    startTime,
    endTime,
    isApprovals: conditionJSON?.approval ? true : false,
    notificationMedium: isEmpty(notificationMediumDetails) ? '' : notificationMediumDetails,
    isChannelsRequired: notificationMediumDetails?.type === IS_SLACK,
    channelList: getMemberObjects(approvalChannels, channelList, 'channelId') || [],
    tagList: getMemberObjects(approvalGroups, groupsData, 'userTagId'),
    userList: getMemberObjects(approvalUsers, usersData, 'userId'),
    validFor: getTimeInHMWithColonsFromMinutes(conditionJSON?.approval?.validFor),
    approvalMaxTime: getTimeInHMWithColonsFromMinutes(conditionJSON?.approval?.timeToApprove),
  };

  let actualUsers = getMemberObjects(users, usersData, 'userId');
  let actualGroups = getMemberObjects(tags, groupsData, 'userTagId');
  let actualTokens = getMemberObjects(tokens, tokensData, 'id');
  let actualServiceIdentities = getMemberObjects(
    serviceIdentities,
    serviceIdentitiesData,
    'userId'
  );

  massagedPolicy['user'] = users ? actualUsers : [];
  massagedPolicy['group'] = tags ? actualGroups : [];
  massagedPolicy['token'] = tokens ? actualTokens : [];
  massagedPolicy['serviceIdentity'] = serviceIdentities ? actualServiceIdentities : [];
  return massagedPolicy;
};

const getMemberObjects = (members, membersData, idProperty) => {
  const memberObjects = [];
  if (members) {
    for (let itr = 0; itr < members.length; itr++) {
      const actualUser = membersData?.find((member) => member[idProperty] === members[itr]);
      if (actualUser) {
        memberObjects.push(actualUser);
      }
    }
  }
  memberObjects.sort((member1, member2) => (member1?.name || '').localeCompare(member2?.name));
  return memberObjects;
};

const getAllMember = (members) => {
  let allMember = 'none';
  if (members && members.length >= 1) {
    if (members[0] === '*') allMember = 'all';
    else allMember = 'select';
  }
  return allMember;
};

const getConditionFields = (conditionJSON, { dummyDate, dateSearchCharacter }) => {
  if (!conditionJSON && !conditionJSON?.timeOfAccess) {
    return {
      isDateTime: 'none',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    };
  }

  const isDateTime = conditionJSON.timeOfAccess
    ? conditionJSON?.timeOfAccess.from.includes(dateSearchCharacter)
      ? 'date'
      : 'time'
    : 'none';
  const startDate =
    isDateTime === 'date' ? getLocalDateTime(conditionJSON?.timeOfAccess.from) : null;
  const endDate = isDateTime === 'date' ? getLocalDateTime(conditionJSON?.timeOfAccess.to) : null;
  const startTime =
    isDateTime === 'time'
      ? getLocalDateTime(`${dummyDate} ${conditionJSON?.timeOfAccess.from}`)
      : null;
  const endTime =
    isDateTime === 'time'
      ? getLocalDateTime(`${dummyDate} ${conditionJSON?.timeOfAccess.to}`)
      : null;
  return {
    isDateTime,
    startDate,
    endDate,
    startTime,
    endTime,
  };
};

export const massageLoadedPolicyJSON = (policy, isEditMode, { cloneNamePrefix }) => {
  const { name, permissions, roles, members } = policy ?? {};

  const getMemberNames = (entity) => {
    if (!isEmpty(entity)) {
      return entity.map(({ name }) => ({ name }));
    } else {
      return undefined;
    }
  };
  //Assigning attribute values such as id to undefined so as to ignore it from the object formed.
  return {
    JSONInputData: JSON.stringify(
      {
        ...policy,
        id: undefined,
        isReadOnly: undefined,
        roles: roles && roles.length ? roles : undefined,
        name: isEditMode ? name : `${cloneNamePrefix}${name}`,
        permissions: permissions?.map((permission) => {
          const { isInline, name } = permission;
          if (isInline) {
            return {
              ...permission,
              name: isEditMode ? name : `${cloneNamePrefix}${name}`,
              isInline: undefined,
              id: undefined,
              isReadOnly: undefined,
            };
          } else {
            return {
              name,
            };
          }
        }),
        members: !isEmpty(members)
          ? {
              tags: getMemberNames(members?.tags),
              tokens: getMemberNames(members?.tokens),
              users: getMemberNames(members?.users),
              serviceIdentities: getMemberNames(members?.serviceIdentities),
            }
          : undefined,
      },
      null,
      4
    ),
  };
};

export const massagePolicyBeforeSave = (values, translatedStrings) => {
  const {
    ipAddress,
    isDateTime,
    startDate,
    endDate,
    startTime,
    endTime,
    name,
    allUser,
    allGroup,
    allToken,
    allServiceIdentity,
    user,
    group,
    serviceIdentity,
    token,
    description,
    allowDeny,
    roles,
    permissions,
    isReadOnly,
    isActive,
    isDraft,
    isApprovals,
    notificationMedium,
    channelList,
    tagList,
    userList,
    approvalMaxTime,
    validFor,
  } = values;
  let rolesArr = [];
  let permissionsArr = [];
  if (roles && roles.length) {
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      const roleWithId = { id: role.id };
      rolesArr.push(roleWithId);
    }
  }
  if (permissions && permissions.length) {
    for (let index = 0; index < permissions.length; index++) {
      const permission = permissions[index];
      const { id, name, consumer, resources, actions, isInline, isExistingInline, description } =
        permission;
      if (isInline) {
        let inlinePermission = {
          id: isExistingInline ? id : undefined,
          name,
          consumer: consumer?.name,
          resources: resources.split(','),
          actions: actions.split(','),
          description,
        };
        permissionsArr.push(inlinePermission);
      } else {
        const permissionWithId = { id: permission.id };
        permissionsArr.push(permissionWithId);
      }
    }
  }
  let conditionsObject = {};
  let membersObj = {};

  if (allUser === 'all') {
    membersObj['users'] = [{ id: '*' }];
  } else {
    if (user) {
      membersObj['users'] = user.map(({ userId }) => ({ id: userId }));
    }
  }

  if (allGroup === 'all') {
    membersObj['tags'] = [{ id: '*' }];
  } else {
    if (group) {
      membersObj['tags'] = group.map(({ userTagId }) => ({ id: userTagId }));
    }
  }

  if (allToken === 'all') {
    membersObj['tokens'] = [{ id: '*' }];
  } else {
    if (token) {
      membersObj['tokens'] = token.map(({ id }) => ({ id }));
    }
  }

  if (allServiceIdentity === 'all') {
    membersObj['serviceIdentities'] = [{ id: '*' }];
  } else {
    if (serviceIdentity) {
      membersObj['serviceIdentities'] = serviceIdentity.map(({ userId }) => ({ id: userId }));
    }
  }

  if (ipAddress) conditionsObject['ipAddress'] = ipAddress.split(' ').join('');

  if (isDateTime === 'date' && startDate && endDate) {
    conditionsObject['timeOfAccess'] = {
      from: moment.utc(new Date(startDate)).format(dateFormatFinal),
      to: moment.utc(new Date(endDate)).format(dateFormatFinal),
    };
  }

  if (isDateTime === 'time' && startTime && endTime) {
    conditionsObject['timeOfAccess'] = {
      from: moment.utc(new Date(startTime)).format(timeFormat),
      to: moment.utc(new Date(endTime)).format(timeFormat),
    };
  }

  if (isApprovals) {
    const approvalsObj = {};
    const approvers = {};
    if (!isEmpty(userList)) {
      approvers['userIds'] = userList.map((user) => user.userId);
    }
    if (!isEmpty(tagList)) {
      approvers['tags'] = tagList.map((tag) => tag.userTagId);
    }
    if (!isEmpty(channelList)) {
      approvers['channelIds'] = channelList.map((channel) => channel.channelId);
    }
    if (!isEmpty(notificationMedium?.id)) {
      approvalsObj['notificationMedium'] = notificationMedium?.id;
    }
    const timeToApproveTime = getMinutesFromHMTime(approvalMaxTime);
    if (timeToApproveTime) {
      approvalsObj['timeToApprove'] = timeToApproveTime;
    }
    const validForTime = getMinutesFromHMTime(validFor);
    if (validForTime) {
      approvalsObj['validFor'] = validForTime;
    }
    if (!isEmpty(approvers)) {
      approvalsObj['approvers'] = approvers;
    }
    if (!isEmpty(approvalsObj)) {
      conditionsObject['approval'] = approvalsObj;
    }
  }

  const getActiveStatus = () => {
    if (isDraft) return false;
    else {
      if (
        areMembersEmpty({
          user,
          group,
          token,
          serviceIdentity,
          allUser,
          allGroup,
          allToken,
          allServiceIdentity,
        })
      )
        return false;
      else {
        return isActive;
      }
    }
  };

  let policyObj = {
    name,
    isActive: getActiveStatus(),
    description,
    isDraft: isDraft || false,
    accessType: allowDeny,
    condition: translatedStrings.placeHolderCondition,
    isReadOnly,
  };
  policyObj['members'] = membersObj;
  if (Object.keys(conditionsObject).length) {
    policyObj['condition'] = JSON.stringify(conditionsObject);
  } else {
    policyObj['condition'] = '';
  }
  if (roles && roles.length) policyObj['roles'] = rolesArr;
  if (permissions && permissions.length) policyObj['permissions'] = permissionsArr;
  if (isReadOnly) {
    return {
      members: membersObj,
    };
  }

  return policyObj;
};

export const areMembersEmpty = (values) => {
  const { user, group, token, serviceIdentity, allUser, allGroup, allToken, allServiceIdentity } =
    values;
  return (
    !user.length &&
    !group.length &&
    !token.length &&
    !serviceIdentity.length &&
    allUser !== 'all' &&
    allGroup !== 'all' &&
    allToken !== 'all' &&
    allServiceIdentity !== 'all'
  );
};

export const getApplicationName = (resources, applicationsListData) => {
  return resources.map((value) => {
    if (value === '*') return value;
    else {
      return applicationsListData?.find((application) => application?.appContainerId === value)
        ?.applicationName;
    }
  });
};

export const isLoading = (value) => value === RESOURCE_STATUS.LOADING;
export const isSuccess = (value) => value === RESOURCE_STATUS.SUCCESS;
export const isError = (value) => value === RESOURCE_STATUS.ERROR;
