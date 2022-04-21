import { getBatchEvalTypes } from './constants';

export const getBatchEvalDataRequest = (actionsList = []) => {
  return {
    type: getBatchEvalTypes.GET_BATCH_EVAL_REQUEST,
    payload: {
      actionsList,
    },
  };
};

export const getBatchEvalDataLoading = () => {
  return { type: getBatchEvalTypes.GET_BATCH_EVAL_LOADING };
};

export const getBatchEvalDataComplete = (batchEvalData) => {
  return {
    type: getBatchEvalTypes.GET_BATCH_EVAL_COMPLETE,
    payload: batchEvalData,
  };
};
