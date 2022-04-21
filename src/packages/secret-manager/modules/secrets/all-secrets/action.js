import { tabIndexType } from './constants';

export const requestTabIndex = (payload) => {
  return {
    type: tabIndexType.TAB_INDEX_REQUEST,
    payload,
  };
};
