import { MyApprovalsDetailsDataTypes } from './constants';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export const myApprovalsDetails = (state = initialState, action) => {
  switch (action.type) {
    case MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...action.payload },
        error: null,
      };

    case MyApprovalsDetailsDataTypes.MY_APPROVALS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
