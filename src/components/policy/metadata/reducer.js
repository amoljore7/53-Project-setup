import { GetMetadataType } from './constants';

const nodeSecretMetadataState = {
  loading: false,
  error: null,
  result: {},
};

const nodeSecretMetadata = (state = nodeSecretMetadataState, action) => {
  switch (action.type) {
    case GetMetadataType.GET_METADATA_LOADING:
      return {
        loading: true,
        ...state,
      };
    case GetMetadataType.GET_METADATA_COMPLETE:
      return {
        ...state,
        loading: false,
        result: {
          ...action.payload,
        },
        error: null,
      };
    case GetMetadataType.GET_METADATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        result: {},
      };
    default:
      return state;
  }
};

export default nodeSecretMetadata;
