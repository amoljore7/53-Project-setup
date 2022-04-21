import { OPEN_NOTIFICATION } from './types';

export const openNotification = (type, title, open, duration, outside = false) => {
  return { type: OPEN_NOTIFICATION, payload: { type, title, open, duration, outside } };
};
