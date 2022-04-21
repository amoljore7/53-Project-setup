import PermissionsImg from '../../../../assets/img_permissions.svg';
import RolesImg from '../../../../assets/img_roles.svg';
import PoliciesImg from '../../../../assets/img_policies.svg';
import { translate } from '../../externalization';
import {
  permissionActions,
  policyActions,
  roleActions,
} from '../../../../components/batch-eval/constants';

export const classes = {
  landingContainer: 'landing-container',
  cardRowWrapper: 'card-row-wrapper',
  cardWrapper: 'card-wrapper',
  backButton: 'back-to-system-administration-button',
  noAccessBanner: 'no-access-banner',
};

export const mainRole = 'main';
export const keyPrefix = 'card-';
export const pageTitle = translate('ROLE_&_POLICY_MANAGEMENT');
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('ROLE_&_POLICY_MANAGEMENT'),
    route: '/admin/policy-management',
  },
];

export const cardTitleWithImg = [
  {
    title: translate('PERMISSIONS'),
    img: PermissionsImg,
    link: '/permissions',
    allPermissions: [...Object.values(permissionActions)],
  },
  {
    title: translate('ROLES'),
    img: RolesImg,
    link: '/roles',
    allPermissions: [...Object.values(roleActions)],
  },
  {
    title: translate('POLICIES'),
    img: PoliciesImg,
    link: '/policies',
    allPermissions: [...Object.values(policyActions)],
  },
];

export const backToSysAdminBtnTxt = translate('BACK_TO_SYS_ADMIN_BUTTON');
export const noAccessOnPolicyAdminTxt = translate('NO_ACCESS_To_POLICY_ADMIN');
