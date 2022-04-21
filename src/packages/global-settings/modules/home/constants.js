import { translate } from '../../externalization';
import RolesImg from '../../../../assets/img_roles.svg';

export const classes = {
  globalSettingsMainContainer: 'global-settings-main-container',
  cardRowWrapper: 'card-row-wrapper',
  cardWrapper: 'card-wrapper',
};

export const mainRole = 'main';
export const keyPrefix = 'card-';
export const pageTitle = translate('GLOBAL_SETTINGS');
export const routeToNameList = [
  {
    name: translate('SYSTEM_ADMINISTRATION'),
    route: '/admin',
  },
  {
    name: translate('GLOBAL_SETTINGS'),
    route: '/admin/global-settings',
  },
];

export const cardTitleWithImg = [
  {
    title: translate('NOTIFICATION_MEDIUMS'),
    img: RolesImg,
    link: '/notification-medium',
  },
];
