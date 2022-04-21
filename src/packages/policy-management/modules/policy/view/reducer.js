import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import {
  PolicyViewDataTypes,
  PolicyDeleteDataTypes,
  approvalNotificationMediumDetailsType,
} from './constants';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const policyViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case PolicyViewDataTypes.POLICY_VIEW_DATA_LOADING:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

const deleteInitialState = {
  loading: false,
};

const policyDeleteReducer = (state = deleteInitialState, action) => {
  switch (action.type) {
    case PolicyDeleteDataTypes.POLICY_DELETE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyDeleteDataTypes.POLICY_DELETE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PolicyDeleteDataTypes.POLICY_DELETE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const toggleInitialState = {
  loading: false,
};
const policyToggleReducer = (state = toggleInitialState, action) => {
  switch (action.type) {
    case PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    case PolicyViewDataTypes.POLICY_VIEW_TOGGLE_REQUEST_INIT:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const initialNotificationMediumState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const notificationMedium = (state = initialNotificationMediumState, action) => {
  switch (action.type) {
    case approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case approvalNotificationMediumDetailsType.APPROVAL_NOTIFICATION_MEDIUM_DETAILS_RESET:
      return {
        ...initialNotificationMediumState,
      };
    default:
      return state;
  }
};

const jsonInitialState = {
  loading: false,
  error: null,
  data: null,
};

const policyViewJSONReducer = (state = jsonInitialState, action) => {
  switch (action.type) {
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_FAILURE:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const viewPolicyReducer = combineReducers({
  policyViewReducer,
  policyDeleteReducer,
  policyToggleReducer,
  notificationMedium,
  policyViewJSONReducer,
});
export default viewPolicyReducer;
