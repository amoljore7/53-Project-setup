import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../utils/common-constants';
import membersReducer from '../../policy/Members/reducer';
import {
  AddPolicyType,
  approvalChannelListType,
  approvalNotificationMediumListType,
} from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const notificationMedium = (state = initialState, action) => {
  switch (action.type) {
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    case approvalNotificationMediumListType.APPROVAL_NOTIFICATION_MEDIUM_LIST_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const channelListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [],
};

const channelList = (state = channelListInitialState, action) => {
  switch (action.type) {
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_RESET:
      return {
        ...channelListInitialState,
      };
    case approvalChannelListType.RECURSIVE_APPROVAL_CHANNEL_LIST_LOADING_DISABLE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
      };
    default:
      return state;
  }
};

const addPolicy = (state = initialState, action) => {
  switch (action.type) {
    case AddPolicyType.POLICY_CREATE_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case AddPolicyType.POLICY_CREATE_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { ...action.payload.result },
        error: null,
      };
    case AddPolicyType.POLICY_CREATE_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

const addPolicyReducer = combineReducers({
  addPolicy,
  notificationMedium,
  channelList,
  membersReducer,
});
export default addPolicyReducer;
