import { INIT_SPINNER_OVERLAY } from './types';

export const initSpinnerOverlay = ({ open, size, message }) => {
  return { type: INIT_SPINNER_OVERLAY, payload: { open, size, message } };
};
