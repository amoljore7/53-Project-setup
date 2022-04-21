import { GetMetadataType } from './constants';

export const getMetadataRequest = (actionsList = [], resource = '*') => {
  return {
    type: GetMetadataType.GET_METADATA_REQUEST,
    payload: {
      actionsList,
      resource,
    },
  };
};

export const getMetadataLoading = () => {
  return { type: GetMetadataType.GET_METADATA_LOADING };
};

export const getMetadataComplete = (batchEvalData) => {
  return {
    type: GetMetadataType.GET_METADATA_COMPLETE,
    payload: batchEvalData,
  };
};

export const getMetadataFailure = (reason) => {
  return {
    type: GetMetadataType.GET_METADATA_FAILURE,
    payload: reason,
  };
};
