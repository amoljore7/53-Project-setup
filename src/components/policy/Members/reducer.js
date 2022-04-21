import { combineReducers } from 'redux';
import { RESOURCE_STATUS } from '../../../utils/common-constants';
import { GroupsType, ServiceIdentitiesType, TokensType, UsersType } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case UsersType.USERS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };

    case UsersType.USERS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { result: action.payload || [] },
      };

    case UsersType.USERS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

const groups = (state = initialState, action) => {
  switch (action.type) {
    case GroupsType.GROUPS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };

    case GroupsType.GROUPS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { result: action.payload || [] },
      };

    case GroupsType.GROUPS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
};

const serviceIdentities = (state = initialState, action) => {
  switch (action.type) {
    case ServiceIdentitiesType.SERVICE_IDENTITY_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };

    case ServiceIdentitiesType.SERVICE_IDENTITY_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { result: action.payload || [] },
      };

    case ServiceIdentitiesType.SERVICE_IDENTITY_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
};

const tokens = (state = initialState, action) => {
  switch (action.type) {
    case TokensType.TOKENS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        data: null,
      };
    case TokensType.TOKENS_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: { result: action.payload || [] },
      };
    case TokensType.TOKENS_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

const membersReducer = combineReducers({
  users,
  groups,
  serviceIdentities,
  tokens,
});
export default membersReducer;
