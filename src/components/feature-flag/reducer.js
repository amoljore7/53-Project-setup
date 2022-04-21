import { FEATURE_FLAG_REQUEST } from './constants';

const initialState = {
  flags: {},
};

const featureFlags = (state = initialState, action) => {
  switch (action.type) {
    case FEATURE_FLAG_REQUEST:
      return {
        ...state,
        flags: {
          ...state.flags,
          ...action?.payload?.flags,
        },
      };

    default:
      return state;
  }
};
export default featureFlags;
