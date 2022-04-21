import { HeaderConstants } from './constants';

const initialState = {
  title: '',
  routeToNameList: [],
};

const pageHeader = (state = initialState, action) => {
  switch (action.type) {
    case HeaderConstants.HEADER_PROPS:
      return {
        ...state,
        title: action.payload.title,
        routeToNameList: action.payload.routeToNameList,
      };
    default:
      return state;
  }
};

export default pageHeader;
