import { FEATURE_FLAG_REQUEST } from './constants';

export const setFeatureFlags = (flags) => ({
  type: FEATURE_FLAG_REQUEST,
  payload: { flags },
});
export const resetFeatureFlags = () => ({
  type: FEATURE_FLAG_REQUEST,
  payload: {
    flags: {},
  },
});
