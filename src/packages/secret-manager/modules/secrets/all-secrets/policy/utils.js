import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { COLON_SEPARATOR } from '../../../../../../utils/common-constants';
import { translatedStrings } from './add/constants';
import { IS_SLACK, pathSeparator, rootNodePath, smConsumer } from './add/constants';
import { translate } from '../../../../externalization';
import { getLocalDateTime } from '../../../../../../utils/common-utils';

const timeFormat = 'HH:mm:ss';
const dateFormatFinal = 'yyyy-MM-DD HH:mm:ss';
const SIXTY = 60;

export const massageLoadedPolicyJSON = (policy, isEditMode, { cloneNamePrefix }) => {
  const { name, accessLevel, consumer, resource, permissions, roles } = policy;
  return {
    JSONInputData: JSON.stringify(
      {
        ...policy,
        id: undefined,
        isReadOnly: undefined,
        accessLevel,
        consumer,
        resource,
        name: isEditMode ? name : `${cloneNamePrefix}${name}`,
        roles,
        permissions: permissions?.map((permission) => {
          const { isInline, name, id } = permission;
          if (isInline) {
            return {
              ...permission,
              name: isEditMode ? name : `${cloneNamePrefix}${name}`,
              isInline: undefined,
              id: isEditMode ? id : undefined,
              isReadOnly: undefined,
            };
          } else {
            return {
              id,
            };
          }
        }),
      },
      null,
      4
    ),
  };
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
  { cloneNamePrefix, dummyDate, dateSearchCharacter }
) => {
  const {
    id,
    name,
    description,
    members,
    permissions,
    roles,
    accessLevel,
    resource,
    consumer,
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
          return isInline
            ? {
                id: isEditMode ? id : undefined,
                actions: actions.join(','),
                resources: resources.join(','),
                name: isEditMode ? name : `${cloneNamePrefix}${name}`,
                description,
                consumer,
                isExistingInline: true,
                isInline,
              }
            : { ...permission, isInline: false, isExistingInline: false };
        })
      : [],
    roles: roles || [],
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
    includeHierarchy:
      resource === rootNodePath ||
      resource === pathSeparator ||
      (resource || '').includes(rootNodePath),
    accessLevel,
    consumer,
    resource,
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
    accessLevel,
    consumer,
    resource,
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
    accessLevel,
    consumer,
    resource,
  };
  policyObj['members'] = membersObj;
  if (Object.keys(conditionsObject).length) {
    policyObj['condition'] = JSON.stringify(conditionsObject);
  } else {
    policyObj['condition'] = '';
  }
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

export const getTimeInHMFromMinutes = (minutes) => {
  const hours = parseInt(minutes / SIXTY);
  const minute = minutes - hours * SIXTY;
  return `${hours ? translatedStrings.hours(hours) : ''} ${
    minute ? translatedStrings.minutes(minute) : ''
  } `;
};

export const getMinutesFromHMTime = (time) => {
  let [hours = 0, minutes = 0] = time.split(COLON_SEPARATOR);
  hours = Number(hours) || 0;
  minutes = Number(minutes) || 0;
  return hours * SIXTY + minutes;
};

const getMemberObjects = (members, membersData, idProperty) => {
  const memberObjects = [];
  if (members) {
    for (let itr = 0; itr < members.length; itr++) {
      const actualUser = membersData.find((member) => member[idProperty] === members[itr]);
      if (actualUser) {
        memberObjects.push(actualUser);
      }
    }
  }
  memberObjects.sort((member1, member2) => (member1.name || '').localeCompare(member2.name));
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

export const getTimeInHMWithColonsFromMinutes = (minutes) => {
  if (isNaN(Number(minutes))) {
    return '';
  }
  const hours = parseInt(minutes / SIXTY);
  const minute = minutes - hours * SIXTY;
  return `${hours}:${minute}`;
};

export const roleFields = [
  { key: 'consumer', label: translate('CONSUMER') },
  { key: 'resources', label: translate('RESOURCES') },
  { key: 'actions', label: translate('ROLES_MODULE.ACTIONS') },
];

export const getApplicationName = (resources, applicationsListData) => {
  return resources.map((value) => {
    if (value === '*') return value;
    else {
      return applicationsListData?.find((application) => application?.appContainerId === value)
        ?.applicationName;
    }
  });
};

export const isPolicyEditable = (resourcePath, policyViewData) => {
  if (resourcePath === pathSeparator) {
    resourcePath = rootNodePath;
  }
  return (
    policyViewData?.consumer === smConsumer &&
    policyViewData?.accessLevel &&
    (policyViewData?.resource || '').includes(resourcePath)
  );
};

export const removeIdsFromMembers = (members = {}) => {
  const users = members?.users ? mapMembersName(members.users) : undefined;
  const tags = members?.tags ? mapMembersName(members.tags) : undefined;
  const tokens = members?.tokens ? mapMembersName(members.tokens) : undefined;
  const serviceIdentities = members?.serviceIdentities
    ? mapMembersName(members.serviceIdentities)
    : undefined;

  return { users, tags, tokens, serviceIdentities };
};

const mapMembersName = (member) => {
  return member.map(({ name }) => ({ name }));
};
