import { ApplicationsListTypes } from './constants';

export const requestApplicationList = () => ({
  type: ApplicationsListTypes.APPLICATION_LIST_REQUEST,
});

export const loadingApplicationList = () => ({
  type: ApplicationsListTypes.APPLICATION_LIST_LOADING,
});

export const successApplicationList = (ApplicationsList) => ({
  type: ApplicationsListTypes.APPLICATION_LIST_SUCCESS,
  payload: ApplicationsList,
});

export const failureApplicationList = (reason) => ({
  type: ApplicationsListTypes.APPLICATION_LIST_FAILURE,
  payload: { error: reason },
});
