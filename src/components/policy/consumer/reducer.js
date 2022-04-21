import { RESOURCE_STATUS } from '../../../utils/common-constants';
import { ConsumerListTypes } from './constant';

const consumerListInitialState = {
  status: RESOURCE_STATUS.INITIAL,
  error: null,
  data: {},
};

export const consumerList = (state = consumerListInitialState, action) => {
  switch (action.type) {
    case ConsumerListTypes.CONSUMER_LIST_LOADING:
      return {
        ...state,
        status: RESOURCE_STATUS.LOADING,
      };
    case ConsumerListTypes.CONSUMER_LIST_SUCCESS:
      return {
        status: RESOURCE_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case ConsumerListTypes.CONSUMER_LIST_FAILURE:
      return {
        status: RESOURCE_STATUS.ERROR,
        error: action.payload.error,
        data: {},
      };
    case ConsumerListTypes.CONSUMER_LIST_RESET:
      return {
        ...consumerListInitialState,
      };
    default:
      return state;
  }
};

export default consumerList;
