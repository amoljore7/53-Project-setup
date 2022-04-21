import { ConsumerListTypes } from './constant';

export const consumerListRequest = () => ({ type: ConsumerListTypes.CONSUMER_LIST_REQUEST });

export const consumerListLoading = () => ({ type: ConsumerListTypes.CONSUMER_LIST_LOADING });

export const consumerListReset = () => ({ type: ConsumerListTypes.CONSUMER_LIST_RESET });

// payload is object with result as key for consumer list array
export const consumerListSuccess = (payload) => ({
  type: ConsumerListTypes.CONSUMER_LIST_SUCCESS,
  payload,
});

// payload is string of error message
export const consumerListFailure = (payload) => ({
  type: ConsumerListTypes.CONSUMER_LIST_FAILURE,
  payload,
});
