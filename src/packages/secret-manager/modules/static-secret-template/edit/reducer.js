import { RESOURCE_STATUS } from '../../../../../utils/common-constants';
import { EditStaticSecretTypes } from './constants';

const editInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
};

export const editStaticSecretTemplate = (state = editInitialState, action) => {
  switch (action.type) {
    case EditStaticSecretTypes.EDIT_STATIC_SECRET_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
        error: null,
      };
    case EditStaticSecretTypes.EDIT_STATIC_SECRET_SUCCESS:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        error: null,
      };
    case EditStaticSecretTypes.EDIT_STATIC_SECRET_FAILURE:
      return {
        ...state,
        status: RESOURCE_STATUS.ERROR,
        error: action.payload,
      };
    case EditStaticSecretTypes.EDIT_STATIC_SECRET_RESET:
      return {
        ...editInitialState,
      };
    default:
      return state;
  }
};
