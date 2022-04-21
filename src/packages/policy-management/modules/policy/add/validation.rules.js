import { isEmpty } from 'lodash';
import * as yup from 'yup';
import ApiServices from '../../../../../utils/api-service';
import { COLON_SEPARATOR } from '../../../../../utils/common-constants';
import { getMinutesFromHMTime } from '../utils';
import { nameCharacterValidation } from '../../../../../utils/common-utils';
import { errorNotificationTime, ipNewRegex, translatedStrings } from './constants';
const allContextField = 'all';
const nameContextField = 'name';
const policyNameTest = 'Policy name';
export const getJSONValidationSchema = () =>
  yup.object({
    JSONInputData: yup
      .string()
      .min(1, translatedStrings.policyJSONValidation)
      .required(translatedStrings.policyJSONValidation)
      .test('JSONInputData', translatedStrings.invalidJson, (value) => {
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
  });
export const getValidationSchema = (
  setPolicyFilterLoading,
  isEditMode,
  editPolicy,
  openNotification
) =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required(translatedStrings.policyNameValidation)
      .max(30, translatedStrings.inputNameMaxCharsValidation)
      .test(
        policyNameTest,
        translatedStrings.policyNameCharacterValidation,
        nameCharacterValidation
      )
      .test(
        policyNameTest,
        translatedStrings.policyUniqueNameValidation,
        async (value, context) => {
          if (value.length > 30 || !nameCharacterValidation(value)) {
            return true;
          }
          const contextField = context?.options?.context;
          if (
            (contextField === nameContextField || contextField === allContextField) &&
            value !== ''
          ) {
            setPolicyFilterLoading(true);
            try {
              const response = await ApiServices.get(
                `/api/v1/policy-admin/policies?filter=name%20eq%20'${value}'`
              );
              setPolicyFilterLoading(false);
              if (isEditMode && editPolicy?.loadedPolicy) {
                if (value === editPolicy?.loadedPolicy.name) {
                  return true;
                }
              }
              if (response?.data?.result?.length === 0) {
                return true;
              } else {
                if (
                  isEditMode &&
                  editPolicy?.loadedPolicy?.name?.toLowerCase() === value.toLowerCase() &&
                  response?.data?.result[0].name.toLowerCase() === value.toLowerCase()
                ) {
                  return true;
                } else {
                  return false;
                }
              }
            } catch ({ response }) {
              setPolicyFilterLoading(false);
              const reason = response?.data?.message || '';
              openNotification('error', reason, errorNotificationTime);
              return true;
            }
          } else {
            return true;
          }
        }
      ),
    description: yup.string().max(255, translatedStrings.descriptionMaxCharValidation),
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
      then: yup.array().min(1, translatedStrings.usersValidation),
    }),
    group: yup.array().when('allGroup', {
      is: (value) => value === 'select',
      then: yup.array().min(1, translatedStrings.groupsValidation),
    }),
    token: yup.array().when('allToken', {
      is: (value) => value === 'select',
      then: yup.array().min(1, translatedStrings.tokenValidation),
    }),
    ipAddress: yup.string().when('isIpAddress', {
      is: true,
      then: yup
        .string()
        .required(translatedStrings.ipAddrValidation)
        .test('ipAddress', translatedStrings.ipAddressInvalidMsg, (value) => {
          return !value || !value.trim()
            ? true
            : value.split(',').find((ip) => !ip.trim().match(ipNewRegex)) === undefined;
        }),
      otherwise: yup.string().nullable().default(null),
    }),
    isDateTime: yup.string().oneOf(['none', 'date', 'time']),
    startDate: yup.date().when('isDateTime', {
      is: (value) => value === 'date',
      then: yup
        .date()
        .required(translatedStrings.startDateTimeValidation)
        .typeError(translatedStrings.startDateTimeValidation)
        .test('startDate', translatedStrings.startDateTimeMessage, function (value) {
          const startDate = value;
          const { isDateTime, endDate } = this.parent;
          if (isDateTime !== 'date') return true;
          if (startDate?.getTime() >= endDate?.getTime()) {
            return false;
          }
          if (startDate?.getTime() > new Date().getTime() || !isEmpty(editPolicy)) {
            return true;
          }
          return false;
        }),
      otherwise: yup.date().nullable().default(null),
    }),
    endDate: yup.date().when('isDateTime', {
      is: (value) => value === 'date',
      then: yup
        .date()
        .required(translatedStrings.endDateTimeValidation)
        .typeError(translatedStrings.endDateTimeValidation)
        .test('endDate', translatedStrings.endDateTimeValidationMsg, function (value, context) {
          const { startDate, isDateTime } = this.parent;
          const endDate = value;
          if (isDateTime !== 'date') return true;
          if (startDate?.getTime() >= endDate?.getTime()) {
            return false;
          }
          if (endDate?.getTime() < new Date().getTime()) {
            return context.createError({
              path: context.path,
              message: translatedStrings.endDateShouldGreaterThanTodayValidationMsg,
            });
          }
          return true;
        }),
      otherwise: yup.date().nullable().default(null),
    }),
    startTime: yup
      .date()
      .when('isDateTime', {
        is: (value) => value === 'time',
        then: yup
          .date()
          .required(translatedStrings.startTimeValidation)
          .typeError(translatedStrings.startTimeValidation),
        otherwise: yup.date().nullable().default(null),
      })
      .test('startTime', translatedStrings.startTimeBeforeEndTimeValidation, function (value) {
        const { endTime, isDateTime } = this.parent;
        const startTime = value;
        if (isDateTime !== 'time' || isNaN(endTime) || !endTime) {
          return true;
        }

        if (startTime?.getHours() < endTime?.getHours()) {
          return true;
        } else if (
          startTime?.getHours() === endTime?.getHours() &&
          startTime?.getMinutes() < endTime?.getMinutes()
        ) {
          return true;
        } else {
          return false;
        }
      }),
    endTime: yup
      .date()
      .when('isDateTime', {
        is: (value) => value === 'time',
        then: yup
          .date()
          .required(translatedStrings.endTimeValidation)
          .typeError(translatedStrings.endTimeValidation),
        otherwise: yup.date().nullable().default(null),
      })
      .test('endTime', translatedStrings.endTimeValidationMsg, function (value) {
        const { startTime, isDateTime } = this.parent;
        const endTime = value;
        if (isDateTime !== 'time') return true;
        if (startTime?.getHours() < endTime?.getHours()) {
          return true;
        } else if (
          startTime?.getHours() === endTime?.getHours() &&
          startTime?.getMinutes() < endTime?.getMinutes()
        ) {
          return true;
        } else {
          return false;
        }
      }),
    isApprovals: yup.boolean(),
    notificationMedium: yup.object().when('isApprovals', {
      is: true,
      then: yup.object().required(translatedStrings.notifMediumValidation).nullable(),
      otherwise: yup.object().default('').nullable(),
    }),
    approvalMaxTime: yup.string().when('isApprovals', {
      is: true,
      then: yup
        .string()
        .required(translatedStrings.maxApprovalTimeValidation)
        .test('approvalMaxTime', translatedStrings.maxApprovalFormatValidation, (value) => {
          if (isEmpty(value)) {
            return true;
          }
          if (!value.includes(COLON_SEPARATOR)) {
            return false;
          }
          const [hours, minutes] = value
            .split(COLON_SEPARATOR)
            .map((data) => (data.length > 0 ? Number(data) : -1));
          const isTimeValid =
            isNaN(hours) ||
            isNaN(minutes) ||
            hours < 0 ||
            minutes < 0 ||
            minutes > 59 ||
            !getMinutesFromHMTime(value);
          return !isTimeValid;
        }),
    }),
    validFor: yup.string().when('isApprovals', {
      is: true,
      then: yup
        .string()
        .required(translatedStrings.maxTimeAfterApprovalValidation)
        .test('validFor', translatedStrings.maxTimeAfterApprovaltValidation, (value) => {
          if (isEmpty(value)) {
            return true;
          }
          if (!value.includes(COLON_SEPARATOR)) {
            return false;
          }
          const [hours, minutes] = value
            .split(COLON_SEPARATOR)
            .map((data) => (data.length > 0 ? Number(data) : -1));
          const isTimeValid =
            isNaN(hours) ||
            isNaN(minutes) ||
            hours < 0 ||
            minutes < 0 ||
            minutes > 59 ||
            !getMinutesFromHMTime(value);
          return !isTimeValid;
        }),
    }),
    permissions: yup
      .array()
      .test('permissions', translatedStrings.rolesAndPermissionValidation, function (value) {
        const { roles, isDraft } = this.parent;
        if (isDraft) return true;
        if (roles && roles.length === 0) {
          if (value && value.length === 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    roles: yup
      .array()
      .test('roles', translatedStrings.rolesAndPermissionValidation, function (value) {
        const { permissions, isDraft } = this.parent;
        if (isDraft) return true;
        if (permissions && permissions.length === 0) {
          if (value && value.length === 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    isReadOnly: yup.boolean(),
    isActive: yup.boolean(),
    isDraft: yup.boolean(),
    isChannelsRequired: yup.boolean(),
    tagList: yup.array().when('isApprovals', {
      is: true,
      then: yup.array().test('tagList', translatedStrings.groupsValidation, (value, context) => {
        const channelList = !isEmpty(context.parent.channelList);
        const isChannelsRequired = context.parent.isChannelsRequired;
        const userList = !isEmpty(context.parent.userList);
        const tagList = !isEmpty(context.parent.tagList);
        return tagList || userList || (isChannelsRequired && channelList);
      }),
      otherwise: yup.array().nullable(true),
    }),
    channelList: yup.array().when(['isApprovals', 'isChannelsRequired'], {
      is: (isApprovals, isChannelsRequired) => isApprovals && isChannelsRequired,
      then: yup
        .array()
        .test('channelList', translatedStrings.channelValidation, (value, context) => {
          const channelList = !isEmpty(context.parent.channelList);
          const userList = !isEmpty(context.parent.userList);
          const tagList = !isEmpty(context.parent.tagList);
          return tagList || userList || channelList;
        }),
      otherwise: yup.array().nullable(true),
    }),
    userList: yup.array().when('isApprovals', {
      is: true,
      then: yup.array().test('userList', translatedStrings.usersValidation, (value, context) => {
        const userList = !isEmpty(value);
        const channelList = !isEmpty(context.parent.channelList);
        const isChannelsRequired = context.parent.isChannelsRequired;
        const tagList = !isEmpty(context.parent.tagList);
        return userList || tagList || (isChannelsRequired && channelList);
      }),
      otherwise: yup.array().nullable(true),
    }),
  });
