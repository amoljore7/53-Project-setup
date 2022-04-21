import {
  CreateVaultTypes,
  notificationMediumListConstants,
  UsersType,
  TagsType,
  ChannelType,
} from './constants';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export const createVault = (state = initialState, action) => {
  switch (action.type) {
    case CreateVaultTypes.CREATE_VAULT_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case CreateVaultTypes.CREATE_VAULT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CreateVaultTypes.CREATE_VAULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.errorStatus,
      };

    case CreateVaultTypes.CREATE_VAULT_FLUSH_DATA:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

const notificationMediumInitialState = {
  loading: false,
  error: null,
  result: [],
};

export const notificationMediumListReducer = (state = notificationMediumInitialState, action) => {
  switch (action.type) {
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_LOADING:
      return {
        ...state,
        loading: true,
        result: [],
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload?.result],
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        result: [],
        error: action.payload?.response?.data,
      };
    case notificationMediumListConstants.NOTIFICATION_MEDIUM_LIST_FLUSH:
      return {
        ...state,
        ...notificationMediumInitialState,
      };
    default:
      return state;
  }
};

const usersInitialState = {
  loading: false,
  error: null,
  data: {},
};

export const usersList = (state = usersInitialState, action) => {
  switch (action.type) {
    case UsersType.VAULT_USERS_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case UsersType.VAULT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { result: action.payload },
      };

    case UsersType.VAULT_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      };
    case UsersType.VAULT_USERS_FLUSH:
      return {
        ...state,
        ...usersInitialState,
      };

    default:
      return state;
  }
};

const tagsInitialState = {
  loading: false,
  error: null,
  data: {},
};

export const tagsList = (state = tagsInitialState, action) => {
  switch (action.type) {
    case TagsType.TAGS_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case TagsType.TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { result: action.payload },
      };

    case TagsType.TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      };
    case TagsType.TAGS_FLUSH:
      return {
        ...state,
        ...tagsInitialState,
      };

    default:
      return state;
  }
};

const channelInitialState = {
  loading: false,
  error: null,
  data: {},
};

export const channelList = (state = channelInitialState, action) => {
  switch (action.type) {
    case ChannelType.SLACK_CHANNEL_LOADING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    case ChannelType.SLACK_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ChannelType.SLACK_CHANNEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      };
    case ChannelType.SLACK_CHANNEL_FLUSH:
      return {
        ...state,
        ...channelInitialState,
      };

    default:
      return state;
  }
};
