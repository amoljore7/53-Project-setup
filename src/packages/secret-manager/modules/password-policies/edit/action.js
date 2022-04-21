import { EditPasswordPolicyTypes } from './constants';

export const requestEditPasswordPolicy = (id, passwordPolicyData, history) => {
  return {
    type: EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_REQUEST,
    payload: {
      id,
      passwordPolicyData,
      history,
    },
  };
};

export const loadingEditPasswordPolicy = () => {
  return { type: EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_LOADING };
};

export const successEditPasswordPolicy = () => {
  return { type: EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_SUCCESS };
};

export const failureEditPasswordPolicy = (error) => {
  return {
    type: EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_FAILURE,
    payload: error,
  };
};

export const resetEditPasswordPolicy = () => {
  return {
    type: EditPasswordPolicyTypes.EDIT_PASSWORD_POLICY_RESET,
    payload: {},
  };
};
