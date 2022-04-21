import { secretDetailsTypes, secretTemplateDetailsTypes } from './constants';
import { RESOURCE_STATUS } from '../../../../../../utils/common-constants';

const secretTemplateInitialState = {
  data: {},
  error: null,
  status: RESOURCE_STATUS.INITIAL,
};

const secretDetailsInitialState = {
  data: {},
  selectedSecretMetadata: {},
  error: null,
  status: RESOURCE_STATUS.INITIAL,
};

export const secretTemplateDetails = (state = secretTemplateInitialState, action) => {
  switch (action.type) {
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        data: {},
        status: RESOURCE_STATUS.ERROR,
      };
    case secretTemplateDetailsTypes.SECRET_TEMPLATE_DETAILS_RESET:
      return {
        ...secretTemplateInitialState,
      };
    default:
      return state;
  }
};

export const secretDetails = (state = secretDetailsInitialState, action) => {
  switch (action.type) {
    case secretDetailsTypes.SECRET_DETAILS_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case secretDetailsTypes.SECRET_DETAILS_SUCCESS:
      return {
        data: action.payload.secretResponse,
        selectedSecretMetadata: action.payload.selectedSecretMetadata,
        error: null,
        status: RESOURCE_STATUS.SUCCESS,
      };
    case secretDetailsTypes.SECRET_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: RESOURCE_STATUS.ERROR,
      };
    case secretDetailsTypes.SECRET_DETAILS_RESET:
      return {
        ...secretDetailsInitialState,
      };
    default:
      return state;
  }
};
