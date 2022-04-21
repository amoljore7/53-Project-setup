import isEmpty from 'lodash/isEmpty';

export const getPwdPolicyID = (policyName, pwdPoliciesList) => {
  if (!isEmpty(pwdPoliciesList)) {
    const policy = pwdPoliciesList.find((policy) => policy.name === policyName);
    return policy ? policy.id : null;
  } else {
    return null;
  }
};

export const getFieldMassagedData = (secretData) => {
  return secretData.map((secret) => {
    return {
      name: secret.name,
      description: secret.description,
      mask: secret.mask === 'Yes',
      required: secret.required === 'Yes',
      type: secret.type,
    };
  });
};
