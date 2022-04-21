import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../../../../../utils/common-constants';
import {
  PolicyViewDataTypes,
  PolicyDeleteDataTypes,
  approvalNotificationMediumDetailsType,
  SmViewPolicy,
  ApplicationsListTypes,
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

const policyViewJSONState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};
const policyViewJSONReducer = (state = policyViewJSONState, action) => {
  switch (action.type) {
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_LOADING:
      return {
        status: RESOURCE_STATUS.LOADING,
        data: null,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_SUCCESS:
      return {
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case PolicyViewDataTypes.POLICY_VIEW_DATA_JSON_FAILURE:
      return {
        status: RESOURCE_STATUS.ERROR,
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

const metadataInitialState = {
  selectedNodeMetadata: {},
  loading: false,
  error: null,
};
export const nodeSecretMetadata = (state = metadataInitialState, action) => {
  switch (action.type) {
    case SmViewPolicy.POLICY_VIEW_SECRET_METADATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SmViewPolicy.POLICY_VIEW_SECRET_METADATA_SUCCESS:
      return {
        ...state,
        selectedNodeMetadata: action.payload?.selectedNodeMetadata,
        loading: false,
      };
    case SmViewPolicy.POLICY_VIEW_SECRET_METADATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SmViewPolicy.POLICY_VIEW_SECRET_METADATA_RESET:
      return {
        ...metadataInitialState,
      };
    default:
      return state;
  }
};

const allApplications = { appContainerId: '*', applicationName: 'All' };

const applicationsListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: [allApplications],
};
const permissionApplicationsList = (state = applicationsListInitialState, action) => {
  switch (action.type) {
    case ApplicationsListTypes.APPLICATION_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case ApplicationsListTypes.APPLICATION_LIST_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: [...applicationsListInitialState.data, ...action.payload],
        error: null,
      };
    case ApplicationsListTypes.APPLICATION_LIST_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
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
  nodeSecretMetadata,
  permissionApplicationsList,
  policyViewJSONReducer,
});
export default viewPolicyReducer;
