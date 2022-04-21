import { RESOURCE_STATUS } from '../../../../../utils/common-constants.js';
import { SecretViewDataTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const staticSecretTemplateView = (state = initialState, action) => {
  switch (action.type) {
    case SecretViewDataTypes.SECRET_VIEW_DATA_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case SecretViewDataTypes.SECRET_VIEW_DATA_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
      };
    case SecretViewDataTypes.SECRET_VIEW_DATA_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
        data: {},
      };
    case SecretViewDataTypes.SECRET_VIEW_DATA_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
