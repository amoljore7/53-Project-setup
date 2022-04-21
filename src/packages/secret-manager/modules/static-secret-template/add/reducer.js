import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { AddStaticSecretTypes, GetPwdPoliciesTypes } from './constants';

const addInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
};

export const addStaticSecretTemplate = (state = addInitialState, action) => {
  switch (action.type) {
    case AddStaticSecretTypes.ADD_STATIC_SECRET_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case AddStaticSecretTypes.ADD_STATIC_SECRET_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
      };
    case AddStaticSecretTypes.ADD_STATIC_SECRET_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case AddStaticSecretTypes.ADD_STATIC_SECRET_RESET:
      return {
        ...addInitialState,
      };
    default:
      return state;
  }
};

const policyInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  result: [],
};

export const policiesList = (state = policyInitialState, action) => {
  switch (action.type) {
    case GetPwdPoliciesTypes.GET_STATIC_SECRET_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case GetPwdPoliciesTypes.GET_STATIC_SECRET_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        ...action.payload,
      };
    case GetPwdPoliciesTypes.GET_STATIC_SECRET_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};
