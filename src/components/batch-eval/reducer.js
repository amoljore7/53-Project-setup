import { RESOURCE_STATUS } from '../../utils/common-constants';
import { getBatchEvalTypes } from './constants';

const initialState = {
  status: RESOURCE_STATUS.INITIAL,
  result: {},
};

const batchEvalReducer = (state = initialState, action) => {
  switch (action.type) {
    case getBatchEvalTypes.GET_BATCH_EVAL_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case getBatchEvalTypes.GET_BATCH_EVAL_COMPLETE:
      return {
        ...state,
        status: RESOURCE_STATUS.SUCCESS,
        result: {
          ...state.result,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default batchEvalReducer;
