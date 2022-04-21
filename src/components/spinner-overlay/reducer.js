import { INIT_SPINNER_OVERLAY } from './types';
const initialState = {
  open: false,
  size: 'medium',
  message: '',
};

const spinnerOverlay = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SPINNER_OVERLAY:
      return {
        ...state,
        ...action.payload,
        message: !action?.payload?.open ? '' : action?.payload?.message,
      };

    default:
      return state;
  }
};

export default spinnerOverlay;
