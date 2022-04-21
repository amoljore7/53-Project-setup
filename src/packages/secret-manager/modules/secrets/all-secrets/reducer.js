import { tabIndexType } from './constants';

const initialState = {
  tabIndex: 0,
};

export const secretPolicyTabIndex = (state = initialState, action) => {
  switch (action.type) {
    case tabIndexType.TAB_INDEX_REQUEST:
      return {
        ...state,
        tabIndex: action.payload,
      };
    default:
      return state;
  }
};
