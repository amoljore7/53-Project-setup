import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from './types';
const initialState = {
  open: false,
  type: 'general',
  title: '',
  duration: null,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default notification;
