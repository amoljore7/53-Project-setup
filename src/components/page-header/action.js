import { HeaderConstants } from './constants';

export const setPageHeaderAction = (title, routeToNameList) => {
  return {
    type: HeaderConstants.HEADER_PROPS,
    payload: {
      title,
      routeToNameList,
    },
  };
};
