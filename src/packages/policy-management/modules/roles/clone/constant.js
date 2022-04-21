import { translate } from '../../../externalization';

export const translatedStrings = {
  copyOf: (roleName) => translate('COPY_OF', { name: roleName }),
  invalidJsonValidation: translate('INVALID_JSON'),
  roleLoadingMessage: translate('ROLES_MODULE.ROLE_DETAILS_LOADING'),
};
